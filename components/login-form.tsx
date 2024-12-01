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
import { BrainCircuit, Brain } from "lucide-react";

export default function LoginForm() {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleGithubSignIn = () => {
    signIn("github", { callbackUrl: "/" });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex flex-row items-center gap-2 pb-6">
          <BrainCircuit />
          ResearchLM
        </CardTitle>
        <CardTitle>Login / Signup</CardTitle>
        <CardDescription>
          Continue with your preferred login method.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className=" space-y-2">
          <Button
            variant="outline"
            className="w-full bg-muted/40"
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full  bg-muted/40"
            onClick={handleGithubSignIn}
          >
            <GithubIcon className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
