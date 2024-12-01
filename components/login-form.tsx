"use client";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { GithubIcon, GoogleIcon } from "./icons";
import { BrainCircuit, Loader } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);

    signIn("google", { callbackUrl: "/" })
  };

  const handleGithubSignIn = () => {
    setIsGithubLoading(true);

    signIn("github", { callbackUrl: "/" })

  };

  return (
    <Card className="w-[350px] z-[500] bg-transparent border-none shadow-none">
      <CardHeader>
        <div>
        <CardTitle className="flex pb-2 flex-row items-center gap-2 ">
          <BrainCircuit />
          ResearchLM
        </CardTitle>
        <CardDescription>
        Your AI-powered research assistant for analyzing data, taking notes, and creating diagrams from various sources including CSV, PDF, and more.
        </CardDescription>

        </div>

      </CardHeader>
      <CardContent>
        <div className=" space-y-2">
          <Button
            variant="outline"
            disabled={isGoogleLoading}
            className="w-full bg-neutral-50 dark:bg-neutral-900"
            onClick={handleGoogleSignIn}
          >
            {
              isGoogleLoading ? (
                  <Loader className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon className="mr-1 h-4 w-4" />
              )
            }
            Continue with Google
          </Button>
          <Button
            variant="outline"
            disabled={isGithubLoading}
            className="w-full  bg-neutral-50 dark:bg-neutral-900"
            onClick={handleGithubSignIn}
          >
            {
              isGithubLoading ? (
                  <Loader className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <GithubIcon className="mr-1 h-4 w-4" />
              )
            }
            Continue with GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
