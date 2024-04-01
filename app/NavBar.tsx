import Link from "next/link";
import React from "react";
import { AiOutlineStock } from "react-icons/ai";


const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Stocks", href: "/stocks" },
  ];
  return (
    <div className="flex space-x-6 border-b h-14 items-center px-5">
      <Link href="/"><AiOutlineStock className="size-8 text-blue-500"/></Link>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li className="text-zinc-500 hover:text-zinc-800 transition-colors">
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
