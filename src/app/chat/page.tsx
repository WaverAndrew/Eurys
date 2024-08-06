"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Person } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import QueryInterface from "@/app/components/queryinterface-chat";
import {
  extractNamesAndTexts,
  formatContextString,
  getAIGeneration,
} from "@/lib/actions";
import { PineRetrival } from "@/lib/pinecone";

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

  const fetchUsers = async (q: string): Promise<QueryResult> => {
    //Get the relevant context
    const context = await PineRetrival(q);

    console.log(context);

    //Parse the context
    const finalcontext = await formatContextString(context);

    //get the Ai generation
    const generatedobject = await getAIGeneration(q, finalcontext);

    //Parse the ai response
    const { names: final_users, texts: final_reasons } =
      await extractNamesAndTexts(generatedobject);

    console.log(final_users);

    // Create Person objects from final_users
    const persons: Person[] = final_users.map((name, index) => ({
      id: index.toString(),
      name: name,
      // Add other required fields for Person type if necessary
    }));

    // Join final_reasons into a single string for rendering
    console.log("FUNCTION CALL ENTERED");
    return { persons, rendered_answer: final_reasons };
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
