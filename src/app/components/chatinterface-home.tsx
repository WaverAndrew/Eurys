"use client";

import Textarea from "react-textarea-autosize";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyScreen } from "./preset-questions-home";
import { cn } from "@/lib/utils";
import Amichetto from "./amichetto";
import QueryInterface from "./queryinterface-chat";
import { useRouter } from "next/navigation";
import { FlipWords } from "@/components/ui/flipping-words";
import { Person } from "@/lib/types";
import { Spotlight } from "@/components/ui/spotlight";
import { useClerk, useUser } from "@clerk/nextjs";

export default function ChatInterface() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { openSignIn, session } = useClerk();
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [timetoquery, setTimetoQuery] = useState(true);
  const [showEmptyScreen, setShowEmptyScreen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const words = ["business\xa0partner", "friend", "investor", "co-founder"];

  useEffect(() => {
    // Focus on input when the page loads
    inputRef.current?.focus();
  }, [timetoquery]);

  const handleClear = () => {
    console.log("Clearing input and resetting state");
    setInput("");
    setTimetoQuery(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with input:", input);
    // Perform your submit logic here
    if (input.trim()) {
      router.push(`/chat?query=${encodeURIComponent(input)}`);
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSignedIn) {
      handleSubmit(e);
    } else {
      openSignIn();
    }
  }

  return (
    <>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-4 ">find your next</h1>
          {/* Assuming FlipWords is rendering correctly */}
          <FlipWords words={words} className="text-4xl font-bold  " />
        </div>

        <form
          className="max-w-2xl w-full px-6 flex flex-col items-center"
          onSubmit={onSubmit}
        >
          <div className="relative w-full">
            <Textarea
              ref={inputRef}
              name="input"
              rows={1}
              maxRows={5}
              tabIndex={0}
              placeholder="Ask a question..."
              spellCheck={false}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="resize-none w-full min-h-12 rounded-full bg-muted border border-input pl-4 pr-10 pt-3 pb-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing
                ) {
                  if (input.trim().length === 0) {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault();
                  const textarea = e.target as HTMLTextAreaElement;
                  textarea.form?.requestSubmit();
                }
              }}
              onHeightChange={(height) => {
                if (!inputRef.current) return;
                const initialHeight = 70;
                const initialBorder = 32;
                const multiple = (height - initialHeight) / 20;
                const newBorder = initialBorder - 4 * multiple;
                inputRef.current.style.borderRadius =
                  Math.max(8, newBorder) + "px";
              }}
              onFocus={() => setShowEmptyScreen(true)}
              onBlur={() => setShowEmptyScreen(false)}
            />
            <Button
              type="submit"
              size={"icon"}
              variant={"ghost"}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              disabled={input.length === 0}
            >
              <ArrowRight size={20} />
            </Button>
          </div>
          <EmptyScreen
            submitMessage={(message) => {
              setInput(message);
            }}
            className={cn(showEmptyScreen ? "visible" : "invisible")}
          />
        </form>
      </div>
    </>
  );
}
