// app/track-order/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Search, Check, Clock, Wrench, Package, AlertCircle } from "lucide-react";

const STATUSES = [
  { key: "RECEIVED", label: "Device received", icon: Package, desc: "We have your device and it's in the queue." },
  { key: "DIAGNOSING", label: "Diagnosing", icon: Search, desc: "Our engineers are identifying the fault." },
  { key: "AWAITING_PARTS", label: "Awaiting parts", icon: Clock, desc: "We've ordered the parts needed for your repair." },
  { key: "REPAIRING", label: "Repairing", icon: Wrench, desc: "Active repair in progress." },
  { key: "READY", label: "Ready for pickup", icon: Check, desc: "Your device is repaired and ready to collect!" },
  { key: "COMPLETED", label: "Completed", icon: Check, desc: "Repair complete. Thank you for choosing Alphatech." },
];

function formatPrice(n: number) {
  return "₦" + n.toLocaleString("en-NG");
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
}

type Repair = {
  ticketNumber: string;
  deviceType: string;
  brandModel: string | null;
  problemDescription: string;
  status: string;
  estimatedCost: number | null;
  finalCost: number | null;
  createdAt: string;
  updatedAt: string;
};

function TrackingContent() {
  const searchParams = useSearchParams();
  const [ticket, setTicket] = useState(searchParams.get("ticket") ?? "");
  const [repair, setRepair] = useState<Repair | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-search if ticket is in URL
  useEffect(() => {
    const t = searchParams.get("ticket");
    if (t) fetchRepair(t);
  }, []);

  async function fetchRepair(ticketNum: string) {
    if (!ticketNum.trim()) return;
    setLoading(true);
    setError("");
    setRepair(null);
    try {
      const res = await fetch(`/api/repairs/${ticketNum.trim().toUpperCase()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Ticket not found");
      setRepair(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const currentStatusIndex = repair
    ? STATUSES.findIndex((s) => s.key === repair.status)
    : -1;

  return (
    <main className="bg-slate-950 min-h-screen py-12 px-5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-xs text-sky-400 tracking-widest">REPAIR TRACKER</p>
          <h1 className="font-display font-bold text-2xl lg:text-3xl text-white mt-2">
            Track your repair
          </h1>
          <p className="font-body text-slate-400 mt-2">
            Enter your ticket number to see the current status of your device.
          </p>
        </div>

        {/* Search input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="e.g. ALP-RP-2026-3412ABC"
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchRepair(ticket)}
            className="flex-1 bg-slate-900 border border-slate-700 text-white placeholder-slate-600 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:border-sky-400"
          />
          <button
            onClick={() => fetchRepair(ticket)}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-body font-semibold px-5 py-3 rounded-xl transition-colors flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            {loading ? "..." : "Track"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-950/40 border border-red-900 rounded-xl px-4 py-3 flex items-start gap-3 mb-6">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <p className="font-body text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Result */}
        {repair && (
          <div className="space-y-5">
            {/* Ticket header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <p className="font-mono text-xs text-slate-500">TICKET</p>
                  <p className="font-mono text-lg font-bold text-sky-400">{repair.ticketNumber}</p>
                </div>
                <span className={`font-mono text-xs px-3 py-1.5 rounded-full font-semibold ${
                  repair.status === "COMPLETED" ? "bg-green-900/50 text-green-400 border border-green-800"
                  : repair.status === "READY" ? "bg-blue-900/50 text-blue-400 border border-blue-800"
                  : repair.status === "CANCELLED" ? "bg-red-900/50 text-red-400 border border-red-800"
                  : "bg-orange-900/50 text-orange-400 border border-orange-800"
                }`}>
                  {repair.status.replace("_", " ")}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-5 font-body text-sm">
                <div>
                  <p className="text-slate-500 text-xs mb-0.5">Device</p>
                  <p className="text-white">{repair.deviceType}{repair.brandModel ? ` — ${repair.brandModel}` : ""}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-0.5">Booked on</p>
                  <p className="text-white">{formatDate(repair.createdAt)}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-0.5">Last updated</p>
                  <p className="text-white">{formatDate(repair.updatedAt)}</p>
                </div>
                {repair.estimatedCost && (
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Estimated cost</p>
                    <p className="text-white">{formatPrice(repair.estimatedCost)}</p>
                  </div>
                )}
                {repair.finalCost && (
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">Final cost</p>
                    <p className="text-green-400 font-semibold">{formatPrice(repair.finalCost)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status timeline */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="font-display font-semibold text-white mb-5">Repair progress</h2>
              <div className="space-y-4">
                {STATUSES.filter(s => s.key !== "COMPLETED" || repair.status === "COMPLETED").map((s, i) => {
                  const done = i < currentStatusIndex;
                  const active = i === currentStatusIndex;
                  const upcoming = i > currentStatusIndex;
                  return (
                    <div key={s.key} className="flex gap-4 items-start">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        done ? "bg-green-500" : active ? "bg-orange-500" : "bg-slate-800 border border-slate-700"
                      }`}>
                        {done
                          ? <Check className="h-4 w-4 text-white" />
                          : <s.icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-600"}`} />
                        }
                      </div>
                      <div className="flex-1 pb-4 border-b border-slate-800 last:border-0">
                        <p className={`font-body font-semibold text-sm ${
                          done ? "text-green-400" : active ? "text-white" : "text-slate-500"
                        }`}>{s.label}</p>
                        {(done || active) && (
                          <p className="font-body text-xs text-slate-400 mt-0.5">{s.desc}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Problem description */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <p className="font-mono text-xs text-slate-500 mb-2">REPORTED PROBLEM</p>
              <p className="font-body text-sm text-slate-300 leading-relaxed">{repair.problemDescription}</p>
            </div>

            {/* Need help */}
            <div className="bg-blue-950/30 border border-blue-900/50 rounded-2xl p-5 text-center">
              <p className="font-body text-sm text-slate-300">Have questions about your repair?</p>
              <a
                href="https://wa.link/3yo0c2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-sm px-5 py-2.5 rounded-lg mt-3 transition-colors"
              >
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense>
      <TrackingContent />
    </Suspense>
  );
}
