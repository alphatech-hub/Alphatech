// app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { UserPlus } from "lucide-react";
import PasswordInput from "@/components/ui/PasswordInput";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Something went wrong."); setLoading(false); return; }
    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    setLoading(false);
    router.push("/account");
    router.refresh();
  }

  return (
    <main className="min-h-[70vh] bg-slate-950 flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <div className="h-11 w-11 rounded-lg bg-blue-700/20 flex items-center justify-center mb-5">
          <UserPlus className="h-5 w-5 text-sky-400" />
        </div>
        <h1 className="font-display font-bold text-2xl text-white">Create your account</h1>
        <p className="font-body text-sm text-slate-400 mt-1.5">Book repairs, shop, and track everything in one place.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <p className="font-body text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">{error}</p>
          )}
          <div>
            <label className="font-body text-xs text-slate-400 block mb-1.5">Full name</label>
            <input type="text" required value={form.name} onChange={(e) => update("name", e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400" />
          </div>
          <div>
            <label className="font-body text-xs text-slate-400 block mb-1.5">Email</label>
            <input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400" />
          </div>
          <div>
            <label className="font-body text-xs text-slate-400 block mb-1.5">Phone (optional)</label>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400" />
          </div>
          <div>
            <label className="font-body text-xs text-slate-400 block mb-1.5">Password</label>
            <PasswordInput value={form.password} onChange={(v) => update("password", v)} required minLength={8} />
            <p className="font-body text-xs text-slate-500 mt-1">At least 8 characters.</p>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-body font-semibold px-4 py-3 rounded-lg transition-colors">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="font-body text-sm text-slate-400 mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-400 hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  );
}
