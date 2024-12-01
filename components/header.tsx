"use client";
import Link from "next/link";
import { UserNav } from "./user-nav";
import { BrainCircuit } from "lucide-react";
import { User } from "next-auth";

export function Header(props: { user: User | null }) {
  return (
    <header className=" w-full flex  px-6 h-16 dark:bg-neutral-900 items-center justify-between">
      <Link
        href="/"
        className="text-2xl flex flex-row items-center justify-center gap-1 font-bold text-primary"
      >
        <BrainCircuit className="mr-2 h-6 w-6" />
        <p className="text-lg">ResearchLM</p>
      </Link>
      <div>
        <UserNav user={props.user} />
      </div>
    </header>
  );
}
