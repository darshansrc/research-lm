"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChat } from "ai/react";
import { User } from "next-auth";

export function ChatInterface(props: { user: User | null }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <ScrollArea className="flex-grow mb-4 border rounded-md p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`flex items-start ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="w-8 h-8 mr-2">
                {message.role === "user" && (
                  <AvatarImage
                    src={props.user?.image || ""}
                    alt={props.user?.name || ""}
                  />
                )}
                <AvatarFallback>
                  {message.role === "user" ? "U" : "A"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-2 ${message.role === "user" ? "bg-blue-500 mr-4 px-4 text-white" : ""}`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex items-center">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSubmit} type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}
