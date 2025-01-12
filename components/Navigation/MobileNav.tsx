"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import NavLinks from "./NavLinks";
import { VisuallyHidden } from "../ui/visually-hidden";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="ml-6 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-12 w-12" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetTitle>
          <VisuallyHidden>Navigation Menu</VisuallyHidden>
        </SheetTitle>
        <div className="flex flex-col space-y-3">
          <Link href="/" className="mb-4 flex items-center space-x-2">
            <span className="font-bold">AI Resume Builder</span>
          </Link>
          <NavLinks />
        </div>
      </SheetContent>
    </Sheet>
  );
}
