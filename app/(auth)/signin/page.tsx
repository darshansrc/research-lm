import LoginForm from "@/components/login-form";
import { ModeToggle } from "@/components/theme-toggle";

export default function Page() {
  return (
    <div className="flex relative h-screen w-full items-center bg-muted/40 justify-center px-4">
      <div className="absolute top-4 right-4">
        <ModeToggle className="border-none bg-transparent shadow-none" />
      </div>
      <LoginForm />
    </div>
  );
}
