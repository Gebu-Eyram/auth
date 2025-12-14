"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isAuthenticated, user, accessToken, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16  dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/logo.webp"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            This is the home page for the auth example app.
          </h1>
          
          {isAuthenticated ? (
            <div className="flex flex-col gap-4 max-w-md">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                  ✓ Authenticated
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>Email:</strong> {user?.email}
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  <strong>User ID:</strong> {user?.userId}
                </p>
                <p className="text-sm text-green-700 dark:text-green-300 break-all">
                  <strong>Access Token:</strong> {accessToken?.substring(0, 30)}...
                </p>
              </div>
              <Button 
                onClick={handleLogout}
                variant="destructive"
                className="w-full"
              >
                Logout
              </Button>
            </div>
          ) : (
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Link to sign in or up pages{" "}
              <Link
                href="/signin"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Sign In
              </Link>{" "}
              or the{" "}
              <Link
                href="/signup"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Sign Up
              </Link>{" "}
              pages
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
