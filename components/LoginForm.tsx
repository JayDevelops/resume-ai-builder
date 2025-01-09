import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/auth";
import { AuthError } from "next-auth";

export default async function LoginForm({
  className,
  searchParams,
  ...props
}: {
  className?: string;
  searchParams?: {
    callbackUrl: string | undefined;
  };
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Login with any of the providers below...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              {Object.values(providerMap).map((provider) => (
                <form
                  key={provider.name}
                  action={async () => {
                    "use server";
                    try {
                      const callbackUrl = searchParams?.callbackUrl || "/"; // Default to home page
                      await signIn(provider.id, {
                        redirectTo: callbackUrl,
                      });
                    } catch (error) {
                      if (error instanceof AuthError) {
                        return redirect(
                          `${SIGNIN_ERROR_URL}?error=${error.type}`
                        );
                      }
                      throw error;
                    }
                  }}
                >
                  <Button type="submit" className="w-full">
                    <span>Sign in with {provider.name}</span>
                  </Button>
                </form>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
