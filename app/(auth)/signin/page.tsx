
import LoginForm from "@/components/login-form";
import { ModeToggle } from "@/components/theme-toggle";
import { ShootingStars } from "@/components/shooting-stars";
import { StarsBackground } from "@/components/stars-background";

export default function Page() {

  return (
    <div className="h-screen  rounded-md bg-muted/40 flex flex-col items-center justify-center relative w-full">
      <div className="absolute z-[500] top-4 right-4">
        <ModeToggle className="border-none bg-transparent  shadow-none" />
      </div>
     <LoginForm />
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}
