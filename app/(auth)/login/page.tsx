// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Lock } from "lucide-react";
import PasswordInput from "@/components/ui/PasswordInput";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) { setError("Incorrect email or password."); return; }
    router.push("/account");
    router.refresh();
  }

  return (
    <main className="min-h-[70vh] bg-slate-950 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div className="h-11 w-11 rounded-lg bg-blue-700/20 flex items-center justify-center mb-5">
          <Lock className="h-5 w-5 text-sky-400" />
        </div>
        <h1 className="font-display font-bold text-2xl text-white">Log in to your account</h1>
        <p className="font-body text-sm text-slate-400 mt-1.5">Track repairs, view orders, and manage your details.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <p className="font-body text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">{error}</p>
          )}
          <div>
            <label className="font-body text-xs text-slate-400 block mb-1.5">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400" />
          </div>
          <div>
            <label className="font-body text-xs text-slate-400 block mb-1.5">Password</label>
            <PasswordInput value={password} onChange={setPassword} required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-body font-semibold px-4 py-3 rounded-lg transition-colors">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="font-body text-sm text-slate-400 mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-sky-400 hover:underline">Create one</Link>
        </p>
      </div>
    </main>
  );
}
