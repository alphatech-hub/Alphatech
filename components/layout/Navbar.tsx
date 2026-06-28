// components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Menu, X, Search, User } from "lucide-react";
import AlphaMark from "./AlphaMark";
import CartIcon from "./CartIcon";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <AlphaMark className="h-11 w-11" />
          <div className="leading-none">
            <p className="font-display font-bold text-white text-lg tracking-tight">ALPHATECH</p>
            <p className="text-[10px] text-slate-400 tracking-widest font-body">
              COMPUTER ENGINEERING & TECHNOLOGIES
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 font-body text-sm">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="text-slate-300 hover:text-sky-400 transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button aria-label="Search" className="text-slate-300 hover:text-white">
            <Search className="h-5 w-5" />
          </button>
          <CartIcon />
          <Link
            href={session ? "/account" : "/login"}
            aria-label={session ? "My account" : "Log in"}
            className="text-slate-300 hover:text-white"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/book-repair"
            className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Book a Repair
          </Link>
        </div>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 px-5 py-4 flex flex-col gap-4 font-body text-sm">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="text-slate-300" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link
            href={session ? "/account" : "/login"}
            className="text-slate-300"
            onClick={() => setOpen(false)}
          >
            {session ? "My Account" : "Log in"}
          </Link>
          <Link
            href="/book-repair"
            className="bg-orange-500 text-white font-semibold text-center px-4 py-2.5 rounded-lg"
            onClick={() => setOpen(false)}
          >
            Book a Repair
          </Link>
        </div>
      )}
    </header>
  );
}
