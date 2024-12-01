import { getCurrentUser, getResearchBooks } from "@/actions";
import DashboardPage from "@/components/dashboard";
import { Header } from "@/components/header";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/signin");
  }

  const books = await getResearchBooks();

  console.log("books", books);
  return (
    <>
      <Header user={user} />
      <DashboardPage books={books} />
    </>
  );
}
