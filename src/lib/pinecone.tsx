"use server";
import { Index, Pinecone, RecordMetadata } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embeddings";

export async function getClient() {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_KEY!,
  });

  return pc;
}

export async function PineRetrival(query: string, company?: string) {
  const pc = await getClient();
  const indexname = "linky-index";
  const index = pc.Index(indexname);
  const emb_query = await getEmbeddings(query);

  let queryParams = {
    topK: 3,
    vector: emb_query,
    includeMetadata: true,
  };

  let response;

  // If a company is provided, use it as a namespace
  if (company) {
    response = await index.namespace(company).query(queryParams);
  } else {
    response = await index.query(queryParams);
  }

  return response.matches || [];
}
