"use client"
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar() {
  //state to handle the toggle for opening and closing the side menu could be updated to use resuable hook for toggling state 
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={cn(
          "h-screen bg-gray-200 text-black p-4 fixed top-0 left-0 transition-all duration-300",
          isOpen ? "w-64" : "w-16",
          "relative"
        )}
      >
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white text-black rounded-full shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Sidebar Navigation */}
        <nav className="mt-10 space-y-4">
          <Link href="/" className="block p-2 rounded font-semibold  hover:bg-gray-500 duration-300 hover:text-white">
            {isOpen ? "Dashboard" : "🏠"}
          </Link>
          <Link href="/orders" className="block p-2 rounded font-semibold  hover:bg-gray-500 duration-300 hover:text-white">
            {isOpen ? "Orders" : "📦"}
          </Link>
        </nav>
      </div>
    </div>
  );
}
