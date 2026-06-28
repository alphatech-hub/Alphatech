// components/home/Hero.tsx
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const TICKET_STEPS = [
  { label: "Device received", done: true },
  { label: "Diagnosis complete", done: true },
  { label: "Repairing", done: false, active: true },
  { label: "Ready for pickup", done: false },
];

export default function Hero() {
  return (
    <section className="relative bg-slate-950 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="80" x2="220" y2="80" stroke="#1e3a8a" strokeWidth="1.5" className="trace-line" />
        <circle cx="0" cy="80" r="3" fill="#38bdf8" />
        <line x1="0" y1="160" x2="160" y2="160" stroke="#1e3a8a" strokeWidth="1.5" className="trace-line" />
        <circle cx="0" cy="160" r="3" fill="#38bdf8" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 text-sky-400 text-xs font-mono px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 bg-sky-400 rounded-full animate-pulse" /> CERTIFIED ENGINEERS · OSUN & ONDO
          </span>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mt-6 leading-[1.05]">
            Technology that works.
            <br />
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Engineered to last.
            </span>
          </h1>

          <p className="font-body text-slate-400 text-lg mt-6 max-w-lg">
            From a cracked laptop screen to a full office network — our engineers diagnose fast,
            repair it right, and back every job with a warranty.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/book-repair"
              className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold px-6 py-3.5 rounded-lg flex items-center gap-2 transition-colors"
            >
              Book a Repair <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/store"
              className="border border-slate-700 hover:border-slate-500 text-white font-body font-semibold px-6 py-3.5 rounded-lg transition-colors"
            >
              Shop Computers
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-xs text-slate-500">REPAIR TICKET</p>
              <p className="font-mono text-xs text-sky-400">ALP-RP-2026-0341</p>
            </div>
            <div className="space-y-3">
              {TICKET_STEPS.map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                      s.done ? "bg-sky-500" : s.active ? "bg-orange-500" : "bg-slate-800 border border-slate-700"
                    }`}
                  >
                    {s.done && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <p className={`font-body text-sm ${s.done || s.active ? "text-white" : "text-slate-500"}`}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
