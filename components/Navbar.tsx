"use client";

import React, { useState } from "react";
import { Logo, MobileLogo } from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const items = [
  { label: "Dashboard", href: "/" },
  { label: "Transactions", href: "/transactions" },
  { label: "Manage", href: "/manage" },
];

export const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex h-16 items-center justify-between">
        <Logo />
        <ul className="flex gap-x-4">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                className={cn(
                  pathname === item.href
                    ? "text-black dark:text-white"
                    : "text-gray-600 transition ease-in-out hover:text-black dark:text-gray-400 dark:hover:text-white",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-x-4">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav>
    </div>
  );
}

function MobileNavbar() {
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="border-separate border-b bg-background md:hidden">
      <nav className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Sheet open={showMenu} onOpenChange={setShowMenu}>
            <SheetTrigger>
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="W-[400PX] sm:[540px]">
              <div className="">
                <MobileLogo className="mb-4" />
                <div className="flex flex-col gap-y-2">
                  {items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "text-lg",
                        pathname === item.href
                          ? "text-black dark:text-white"
                          : "text-gray-600 dark:text-gray-400",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-x-2">
            <MobileLogo />
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav>
    </div>
  );
}
