import { Button } from "./ui/button";
import Link from "next/link";
import { User } from "@auth/core/types";
import UserAvatarDropDown from "@/components/UserAvatarDropdown";
import { auth } from "@/auth";

export async function AuthStatus() {
  const session = await auth();
  const user: User | undefined | null = session?.user;

  if (!user) {
    return (
      <Button asChild>
        <Link href="/signIn">Sign In</Link>
      </Button>
    );
  }

  return <UserAvatarDropDown user={session?.user} />;
}
