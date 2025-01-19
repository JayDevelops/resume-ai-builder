"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";

export default function NavLinks({ className }: { className?: string }) {
  const currentPath = usePathname();
  const navigationLinks: {
    id: number;
    title: string;
    href: string;
    icon?: ReactElement;
  }[] = [
    {
      id: 1,
      title: "Dashboard",
      href: "/dashboard",
    },
  ];

  return (
    <>
      {navigationLinks.map((navLink) => (
        <li
          key={`link-${navLink.title}`}
          className={cn(
            className,
            "flex items-center text-md text-secondary-foreground font-medium transition-colors hover:text-primary",
            {
              "text-primary": navLink.href === currentPath,
            }
          )}
        >
          <Link href={navLink.href}>{navLink.title}</Link>
        </li>
      ))}
    </>
  );
}
