// components/account/SignOutButton.tsx
"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 font-body font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
    >
      <LogOut className="h-4 w-4" /> Sign out
    </button>
  );
}
