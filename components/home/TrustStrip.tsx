// components/home/TrustStrip.tsx
type Props = {
  repairs?: string;
  turnaround?: string;
  warranty?: string;
  rating?: string;
};

export default function TrustStrip({
  repairs = "1,200+",
  turnaround = "48 hrs",
  warranty = "90 days",
  rating = "4.8 / 5",
}: Props) {
  const stats = [
    { value: repairs, label: "Repairs completed" },
    { value: turnaround, label: "Average turnaround" },
    { value: warranty, label: "Repair warranty" },
    { value: rating, label: "Customer rating" },
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center lg:text-left">
            <p className="font-display font-bold text-2xl lg:text-3xl text-white">{s.value}</p>
            <p className="font-body text-xs lg:text-sm text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
