"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["RECEIVED","DIAGNOSING","AWAITING_PARTS","REPAIRING","READY","COMPLETED","CANCELLED"];

export default function RepairStatusUpdater({ ticketNumber, currentStatus }: { ticketNumber: string; currentStatus: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLoading(true);
    await fetch(`/api/repairs/${ticketNumber}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: e.target.value }),
    });
    router.refresh();
    setLoading(false);
  }

  return (
    <select defaultValue={currentStatus} onChange={handleChange} disabled={loading}
      className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2 py-1.5 font-mono text-xs focus:outline-none focus:border-sky-400 disabled:opacity-60 cursor-pointer">
      {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
    </select>
  );
}
