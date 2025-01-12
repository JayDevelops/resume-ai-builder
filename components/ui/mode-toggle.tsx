"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "./button";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
      aria-label="Toggle dark mode"
      variant="ghost"
    >
      {theme === "dark" ? (
        <Sun className="h-14 w-14 text-yellow-400" />
      ) : (
        <Moon className="h-14 w-14 text-secondary-foreground" />
      )}
    </Button>
  );
}
