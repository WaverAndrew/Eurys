"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandSparkles,
  faLightbulb,
  faMagic,
  faMagicWandSparkles,
  faMeteor,
  faWandSparkles,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className=" py-4 ">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-gray-300"
        >
          <FontAwesomeIcon icon={faMeteor} className="mr-2 text-white-400" />
          Eurys
        </Link>

        <nav className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                size="sm"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </div>
    </header>
  );
}
