// app/admin/messages/page.tsx
import { prisma } from "@/lib/prisma";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Messages</h1>
        <p className="font-body text-sm text-slate-400 mt-1">
          {messages.filter((m) => m.status === "OPEN").length} open · {messages.length} total
        </p>
      </div>

      <div className="space-y-3">
        {messages.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-10 text-center">
            <p className="font-body text-sm text-slate-500">No messages yet</p>
          </div>
        ) : messages.map((m) => (
          <div key={m.id} className={`bg-slate-900 border rounded-xl p-5 ${m.status === "OPEN" ? "border-sky-900" : "border-slate-800"}`}>
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-body font-semibold text-sm text-white">{m.name}</p>
                  {m.status === "OPEN" && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-sky-900/60 text-sky-300">NEW</span>
                  )}
                </div>
                <p className="font-body text-xs text-slate-400">{m.email}</p>
              </div>
              <p className="font-body text-xs text-slate-500">{formatDate(m.createdAt)}</p>
            </div>
            {m.subject && (
              <p className="font-body font-semibold text-sm text-slate-300 mt-3">{m.subject}</p>
            )}
            <p className="font-body text-sm text-slate-400 mt-2 leading-relaxed">{m.message}</p>
            <div className="flex gap-3 mt-4">
              <a
                href={`mailto:${m.email}?subject=Re: ${m.subject ?? "Your enquiry"}`}
                className="font-body text-xs font-semibold text-sky-400 hover:underline"
              >
                Reply by email
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
