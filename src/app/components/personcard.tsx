"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/cardd";
import Link from "next/link";
import { Person } from "@/lib/types";

interface CardProps {
  person: Person;
}

export function CardUI({ person }: CardProps) {
  const fallbackImages = [
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1657128344786-360c3f8e57e5?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517598024396-46c53fb391a1?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const getRandomFallbackImage = (name: string) => {
    if (name === "Janice Hosenstein") {
      return "https://images.unsplash.com/photo-1657128344786-360c3f8e57e5?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
    if (name === "Rahul Mehta") {
      return "https://images.unsplash.com/photo-1695033328827-0713c71475dc?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
    if (name === "Alex Chen") {
      return "https://images.unsplash.com/photo-1697667602907-3d6ff0dfbf01?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
    if (name === "Richard Burke") {
      return "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
    if (name === "Marcus Johnson") {
      return "https://plus.unsplash.com/premium_photo-1675130119373-61ada6685d63?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    } else {
      return "https://images.unsplash.com/photo-1508835277982-1c1b0e205603?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
  };

  return (
    <CardContainer
      className="inter-var min-w-[180px] grow
    max-w-[12vw] px-2 "
    >
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-2 sm:p-4 border">
        <CardItem
          translateZ="50"
          className="text-l font-bold text-neutral-600 dark:text-white"
        >
          {person.name}
        </CardItem>
        <CardItem
          translateZ="100"
          className="w-full mt-2"
          rotateX={15}
          rotateZ={5}
        >
          <Image
            src={person.img ? person.img : getRandomFallbackImage(person.name)}
            height="600"
            width="400"
            className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-5">
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="px-3 py-1 rounded-md bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Tell me more
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
