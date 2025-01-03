import { signIn } from "@/auth";
import { Button } from "./ui/button";

export function SignInButton({ text }: { text: string }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" variant="default">
        {text}
      </Button>
    </form>
  );
}
