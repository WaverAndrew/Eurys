"use client";
import { Person } from "@/lib/types";
import ChatPage from "@/app/components/chatpage";

interface QueryResult {
  persons: Person[];
  rendered_answer: string[];
}

export default function CompanyChatPage({
  params,
}: {
  params: { company: string };
}) {
  return <ChatPage company={params.company} />;
}
