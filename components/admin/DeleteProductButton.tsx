"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button onClick={handleDelete} disabled={loading}
          className="h-8 px-2.5 text-xs font-body font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-60">
          {loading ? "..." : "Delete"}
        </button>
        <button onClick={() => setConfirming(false)}
          className="h-8 px-2.5 text-xs font-body rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors">
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => setConfirming(true)}
      className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-400 transition-colors"
      title={`Delete ${name}`}>
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}
