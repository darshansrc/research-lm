"use client";

import { useState } from "react";

import { ResearchBookCard } from "@/components/research-book-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { FilterIcon } from "lucide-react";
import { NewResearchBook } from "./new-book";

export default function DashboardPage(props: { books: ResearchBook[] }) {
  const [sortBy, setSortBy] = useState("name");

  const sortedBooks = [...props.books].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "lastEdited") {
      return (
        new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()
      );
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex  relative flex-col items-center dark:bg-neutral-900 w-full">
      <main className="container px-6 md:px-16 md:pt-16 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl  font-semibold">
            Welcome to ResearchLM
          </h1>
          <div className="flex gap-2">
            <Select onValueChange={setSortBy} defaultValue={sortBy}>
              <SelectTrigger className="md:flex hidden  flex-row items-center gap-2 ">
                <FilterIcon size={16} />
                Filter
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="lastEdited">Sort by Last Edited</SelectItem>
              </SelectContent>
            </Select>
            <NewResearchBook />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
          {sortedBooks.map((book) => (
            <ResearchBookCard key={book.id} book={book} />
          ))}
        </div>
      </main>
    </div>
  );
}
