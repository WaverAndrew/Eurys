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
  relevancyTest,
} from "@/lib/actions";
import { PineRetrival } from "@/lib/pinecone";

interface ChatPageProps {
  company?: string;
}

interface QueryResult {
  persons: Person[];
  rendered_answer: string[];
}

export default function ChatPage({ company }: ChatPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [userQuery, setUserQuery] = useState(query || "");
  const isFirstRender = useRef(true);

  const fetchUsers = async (q: string): Promise<QueryResult> => {
    const approved = await relevancyTest(q);
    if (approved) {
      const credits = await CheckCredits();
      if (Number(credits) > 0) {
        const suc = await DeductCredits(credits!);
        // Get the relevant context
        const context = await PineRetrival(q, company);
        console.log(context);

        // Check if context is empty or undefined
        if (!context || context.length === 0) {
          return { persons: [], rendered_answer: ["NO USERS"] };
        }

        // Parse the context
        const finalcontext = await formatContextString(context);
        // Get the AI generation
        const generatedobject = await getAIGeneration(q, finalcontext);
        console.log(generatedobject);
        // Parse the AI response
        const {
          names: final_users,
          texts: final_reasons,
          images,
        } = await extractNamesAndTexts(generatedobject);
        // Create Person objects from final_users
        const persons: Person[] = final_users.map((name, index) => ({
          id: index.toString(),
          name: name,
          img: images[index] !== "none" ? images[index] : "",
          // Add other required fields for Person type if necessary
        }));
        // Join final_reasons into a single string for rendering
        return { persons, rendered_answer: final_reasons };
      } else {
        return { persons: [], rendered_answer: ["EMPTY CREDITS"] };
      }
    } else {
      return { persons: [], rendered_answer: ["INAPPROPRIATE REQUEST"] };
    }
  };

  const { data: queryResult, isLoading } = useQuery<QueryResult>({
    queryKey: ["get_users", userQuery, company],
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
