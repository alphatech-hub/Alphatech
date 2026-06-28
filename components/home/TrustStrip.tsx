// components/home/TrustStrip.tsx
const STATS = [
  { value: "1,200+", label: "Repairs completed" },
  { value: "48 hrs", label: "Average turnaround" },
  { value: "90 days", label: "Repair warranty" },
  { value: "4.8 / 5", label: "Customer rating" },
];

export default function TrustStrip() {
  return (
    <section className="bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="font-display font-bold text-2xl lg:text-3xl text-white">{s.value}</p>
            <p className="font-body text-xs lg:text-sm text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
