"use client";

import { Button } from "@/components/ui/button";
import { CardUI } from "./personcard";
import React from "react";
import ArrowButton from "@/components/ui/arrow";
import { TypewriterEffect } from "@/components/ui/self-gen-text";
import { Person } from "@/lib/types";
import { useRouter } from "next/navigation";
import LoadingPage from "./loading";

interface Queryprops {
  query: string;
  users: Person[];
  isLoading: boolean;
  rendered_answer: string[];
  //CREATE USERS CLASS
}

function QueryInterface({
  query,
  users,
  isLoading,
  rendered_answer,
}: Queryprops) {
  const router = useRouter();
  const convertSentenceToWords = (sentence: string) => {
    return sentence.split(" ").map((word) => ({
      text: word,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-start justify-start pt-10 pl-[5vw]">
      <div className="w-full max-w-screen-lg mx-auto mt-4">
        <div className="flex items-center">
          <ArrowButton onClick={() => router.push("/")} />
          <div className="pb-3">
            <TypewriterEffect
              words={convertSentenceToWords(query)}
              className="text-4xl ml-2"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="pt-20">
            <LoadingPage />
          </div>
        ) : (
          <>
            <div className="flex overflow-x-scroll">
              {users.map((item) => (
                <CardUI key={item.id} person={item} />
              ))}
            </div>
            <div className="pt-10">
              <div className="pb-5">
                {rendered_answer.map((item, index) => (
                  <h1 className="text-gray-200 text-lg leading-relaxed max-w-3xl mx-auto mt-6 mb-8 px-4 sm:px-6 lg:px-4">
                    {item}
                  </h1>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QueryInterface;
