import Link from "next/link";
import { AuthStatus } from "./AuthStatus";
import NavLinks from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { ModeToggle } from "../ui/mode-toggle";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <MobileNav />
          <div className="hidden md:flex">
            <Link
              href="/"
              className="md:ml-14 mr-6 flex items-center space-x-2"
            >
              <span className="hidden font-bold sm:inline-block text-lg">
                AI Resume Builder
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-end px-6 md:px-0 space-x-8">
          <ModeToggle />
          <AuthStatus />
          <div className="hidden md:inline">
            <NavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}
