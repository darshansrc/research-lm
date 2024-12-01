"use server";

import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { researchBooks } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";

const openai = new OpenAI();

export async function getCurrentUser(): Promise<User | null> {
  const session = await auth();

  if (!session) {
    return null;
  }

  return session.user;
}

export async function createNewResearchBook(props: {
  name: string;
  description: string;
}) {
  const { name, description } = props;
  const user = await getCurrentUser();

  if (!user.id) {
    return null;
  }

  const assistant = await openai.beta.assistants.create({
    name,
    description,
    instructions:
      "You are a research assistant. You will be given files and a question. Answer the question using the information in context. If you don't know the answer, say that you don't know.",
    tools: [{ type: "file_search" }, { type: "code_interpreter" }],
    model: "gpt-4o-mini",
  });

  if (assistant.id) {
    await db.insert(researchBooks).values({
      name,
      description,
      lastEdited: new Date(),
      openAIAssistantId: assistant.id,
      userId: user.id,
    });

    revalidatePath("/");

    return assistant.id;
  } else {
    return null;
  }
}

export async function getResearchBooks() {
  const user = await getCurrentUser();

  if (!user.id) {
    return null;
  }

  const books = await db
    .select()
    .from(researchBooks)
    .where(eq(researchBooks.userId, user.id));

  return books;
}

export async function deleteResearchBook(id: string) {
  const user = await getCurrentUser();

  if (!user.id) {
    return {
      success: false,
      message: "You must be logged in to delete a research book.",
    };
  }

  await db.delete(researchBooks).where(eq(researchBooks.id, id));

  revalidatePath("/");

  return {
    success: true,
    message: "Research book deleted successfully.",
  };
}

export async function updateResearchBook(
  id: string,
  name: string,
  description: string,
) {
  const user = await getCurrentUser();

  if (!user.id) {
    return {
      success: false,
      message: "You must be logged in to update a research book.",
    };
  }

  await db
    .update(researchBooks)
    .set({
      name,
      description,
      lastEdited: new Date(),
    })
    .where(eq(researchBooks.id, id));

  revalidatePath("/");

  return {
    success: true,
    message: "Research book updated successfully.",
  };
}
