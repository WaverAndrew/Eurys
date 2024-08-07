"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Person } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import QueryInterface from "@/app/components/queryinterface-chat";
import {
  CheckCredits,
  DeductCredits,
  extractNamesAndTexts,
  formatContextString,
  getAIGeneration,
} from "@/lib/actions";
import { PineRetrival } from "@/lib/pinecone";
import { useClerk, useUser } from "@clerk/nextjs";

interface QueryResult {
  persons: Person[];
  rendered_answer: string[];
}

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [userQuery, setUserQuery] = useState(query || "");
  const isFirstRender = useRef(true);
  // Set default credits to 30 if undefined

  const fetchUsers = async (q: string): Promise<QueryResult> => {
    const credits = await CheckCredits();
    if (Number(credits) > 0) {
      const suc = await DeductCredits(credits!);

      // Get the relevant context
      const context = await PineRetrival(q);

      // Parse the context
      const finalcontext = await formatContextString(context);

      // Get the AI generation
      const generatedobject = await getAIGeneration(q, finalcontext);

      // Parse the AI response
      const { names: final_users, texts: final_reasons } =
        await extractNamesAndTexts(generatedobject);

      // Create Person objects from final_users
      const persons: Person[] = final_users.map((name, index) => ({
        id: index.toString(),
        name: name,
        // Add other required fields for Person type if necessary
      }));

      // Join final_reasons into a single string for rendering

      return { persons, rendered_answer: final_reasons };
    } else {
      const persons: Person[] = [];
      const rendered_answer: string[] = ["EMPTY CREDITS"];

      return { persons, rendered_answer };
    }
  };

  const { data: queryResult, isLoading } = useQuery<QueryResult>({
    queryKey: ["get_users", userQuery],
    queryFn: () => fetchUsers(userQuery),
    enabled: !!userQuery && isFirstRender.current,
  });

  useEffect(() => {
    if (query && query !== userQuery) {
      setUserQuery(query);
    }
    isFirstRender.current = false;
  }, [query]);

  return (
    <QueryInterface
      query={userQuery}
      users={queryResult?.persons || []}
      isLoading={isLoading}
      rendered_answer={queryResult?.rendered_answer || [""]}
    />
  );
}
