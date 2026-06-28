// components/home/Newsletter.tsx
"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO (Phase 8): POST to /api/newsletter/subscribe once the API route exists.
    setSubmitted(true);
  }

  return (
    <section className="bg-gradient-to-r from-blue-900 to-slate-950 py-16">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <h2 className="font-display font-bold text-2xl lg:text-3xl text-white">
          Get repair tips & product drops in your inbox
        </h2>
        <p className="font-body text-slate-400 mt-3">
          No spam — just useful maintenance guides and early access to new stock.
        </p>

        {submitted ? (
          <p className="font-body text-sky-400 mt-6">Thanks — you're on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-sky-400"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
