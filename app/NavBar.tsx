"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineStock } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Stocks", href: "/stocks" },
    { label: "Options", href: "/options" },
  ];

  return (
    <nav className="flex space-x-6 border-b h-14 items-center px-5">
      <Link href="/">
        <AiOutlineStock className="size-8 text-blue-500" />
      </Link>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "text-zinc-400": link.href !== currentPath,
              "text-zinc-100 font-bold": link.href === currentPath,
              "hover:text-zinc-50 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
