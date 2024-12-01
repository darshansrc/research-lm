import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Monitor, Moon, Settings, User2 } from "lucide-react";
import { Sun, SunMoon } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

export function UserNav(props: { user: User | null }) {
  const { theme, setTheme } = useTheme();
  const { user } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative  h-8 w-8 rounded-full">
          <Avatar className="h-8 border-2 w-8">
            <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 dark:bg-neutral-900"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col py-1 space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-center gap-2">
            <User2 size={16} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Settings size={16} />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            {<SunMoon size={16} />}
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent
            className="dark:bg-neutral-900"
            sideOffset={12}
          >
            <DropdownMenuItem
              onClick={() => {
                setTheme("light");
              }}
              className={`flex items-center gap-2 ${
                theme === "light" ? "dark:bg-muted/90 bg-neutral-100" : ""
              }`}
            >
              <Sun size={16} />

              <span>Light</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setTheme("dark");
              }}
              className={`flex items-center gap-2 ${
                theme === "dark" ? "dark:bg-muted/90 bg-neutral-100" : ""
              }`}
            >
              <Moon size={16} />

              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("system");
              }}
              className={`flex items-center gap-2 ${
                theme === "system" ? "dark:bg-muted/90 bg-neutral-100" : ""
              }`}
            >
              <Monitor size={16} />

              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`flex items-center gap-2`}
          onClick={() => signOut()}
        >
          <LogOut size={16} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
