import Link from "next/link";
import { User } from "@auth/core/types";
import UserAvatarDropDown from "@/components/UserAvatarDropdown";
import { auth } from "@/auth";

export async function AuthStatus() {
  const session = await auth();
  const user: User | undefined | null = session?.user;

  if (!user) {
    return (
      <li className="flex items-center text-md text-secondary-foreground font-medium transition-colors hover:text-primary">
        <Link href="/signIn">Log In</Link>
      </li>
    );
  }

  return <UserAvatarDropDown user={session?.user} />;
}
