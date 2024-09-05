import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import Providers from "./components/Providers";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Header from "./components/header";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Linkify",
  description: "Find your future business partner, investor or employee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <>
        <html lang="en">
          <body
            className={cn(
              "font-sans antialiased",
              fontSans.variable,
              "overflow-hidden"
            )}
          >
            <Providers>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex flex-col min-h-screen relative">
                  <header className="relative z-10">
                    <Header />
                  </header>
                  <main className="flex-grow overflow-hidden">
                    <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                      {children}
                    </div>
                  </main>
                </div>
              </ThemeProvider>
            </Providers>
          </body>
        </html>
      </>
    </ClerkProvider>
  );
}
