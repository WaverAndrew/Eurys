"use server";
import { Index, Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embeddings";

export async function getClient() {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_KEY!,
  });

  return pc;
}

export async function PineRetrival(query: string) {
  const pc = await getClient();

  const indexname = "linky-index";
  const index = pc.Index(indexname);

  const emb_query = await getEmbeddings(query);
  const response = await index.query({
    topK: 3,
    vector: emb_query,
    includeMetadata: true,
  });
  return response.matches || [];
}
