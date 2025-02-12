"use client"
import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div
        className={cn(
          "h-screen w-64 bg-gray-900 text-white p-4 fixed top-0 left-0 transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <nav className="space-y-4">
          <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-800">Dashboard</Link>
          <Link href="/settings" className="block p-2 rounded hover:bg-gray-800">Settings</Link>
        </nav>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden m-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
}
