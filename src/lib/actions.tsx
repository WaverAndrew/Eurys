"use server";

import { generateObject, generateText } from "ai";

import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { type } from "os";
import { NotificationsObject, Notification } from "./types";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { faL } from "@fortawesome/free-solid-svg-icons";

export async function getAIGeneration(input: string, context: string) {
  "use server";
  const prompt = `QUESTION : ${input}; PROFILES DATA: ${context}`;

  const { object: profiles } = await generateObject({
    model: openai("gpt-4o-mini"),
    temperature: 0.4,
    system: `You are an AI assistant specialized in analyzing profiles of different individuals to answer questions based on the provided data. Your goal is to be kind, helpful, and thorough in your responses. For each question, you will:
      - Select profiles that are with 100% certainty relevant to the question. Don't do assumptions if there is no direct link.
      - Provide a thoughtful and complete answer based solely on the information in the selected profiles.
      - Ensure that if no profiles are relevant, you respond with NO MATCH.
      - Your output should only include information from the relevant profiles and should strictly adhere to the provided data without using any external information.`,
    prompt: prompt,

    schema: z.object({
      profiles: z.array(
        z.object({
          name: z
            .string()
            .describe("Name of the relevant profile (only if relevant)"),
          image: z
            .string()
            .describe(
              "link to the image url in context, if not present write 'none'"
            ),
          reason: z
            .string()
            .describe(
              "Why and how the profile answers the question (only if relevant)"
            ),
        })
      ),
    }),
  });

  return { profiles };
}

export async function relevancyTest(query: string) {
  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    system: `You are a moderator for a search engine. Given a query, your task is to determine if it is appropriate or inappropriate based on the following criteria:
      Reject (N): If the query involves personal appearance, relationships, sex, or other non-professional and personal topics.
      Approve (Y): In the other cases.`,

    prompt: `QUERY: ${query}
    ANSWER (Y or N):`,
  });

  if (text == "Y") {
    return true;
  }
  if (text == "N") {
    return false;
  }
}

export const formatContextString = (data: any[]) => {
  return data
    .map((item) => {
      const { id, name, text, type, skills, languages, image } = item.metadata;
      return `{ID: ${id}, Name: ${name}, Data: ${text}, Type of data: ${type}${
        skills ? `, Skills: ${skills}` : ""
      }${languages ? `, Languages: ${languages}` : ""}${
        image ? `, Image: ${image}` : ""
      }}, `;
    })
    .join("\n");
};

export async function extractNamesAndTexts(obj: NotificationsObject): Promise<{
  names: string[];
  texts: string[];
  images: string[];
}> {
  // Initialize arrays for names and texts
  const names: string[] = [];
  const images: string[] = [];
  const texts: string[] = [];

  // Check if the object has the expected structure and contains profiles
  if (obj.profiles?.profiles?.length) {
    // Destructure to get the notifications array
    const {
      profiles: { profiles },
    } = obj;

    // Iterate over all notifications to extract name and reason
    profiles.forEach((profile: Notification) => {
      names.push(profile.name);
      images.push(profile.image);
      texts.push(profile.reason);
    });
  }

  // Return an object with two arrays
  return { names, images, texts };
}

//METADATA AND CREDITS SYSTEM

export async function DeductCredits(credits: number) {
  const user = await currentUser();
  if (user) {
    //const credits = Number(user.publicMetadata?.credits ?? 30)
    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: {
        credits: credits - 1,
      },
    });

    return { success: true, c: credits };
  } else {
    return { success: false };
  }
}

export async function CheckCredits() {
  const user = await currentUser();

  const credits = Number(user?.publicMetadata?.credits ?? 30);
  return credits;
}
