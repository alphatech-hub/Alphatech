// components/home/Testimonials.tsx
import { Star } from "lucide-react";

type Review = { name: string; role: string; text: string };

const REVIEWS: Review[] = [
  {
    name: "Chiamaka O.",
    role: "Small business owner, Osogbo",
    text: "My office network was down for two days before I called Alphatech. They had it diagnosed within the hour and fully running by evening.",
  },
  {
    name: "Tunde A.",
    role: "Gaming PC customer",
    text: "Built my custom rig exactly to spec and walked me through every component. Runs flawlessly months later.",
  },
  {
    name: "Funmi B.",
    role: "Laptop repair customer, Akure",
    text: "Thought I'd lost three years of project files when my drive failed. They recovered everything in two days.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <p className="font-mono text-xs text-blue-700 tracking-widest text-center">CUSTOMERS</p>
        <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 mt-2 text-center">What people say</h2>

        <div className="grid lg:grid-cols-3 gap-6 mt-12">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                ))}
              </div>
              <p className="font-body text-sm text-slate-600 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <p className="font-body font-semibold text-sm text-slate-900 mt-4">{r.name}</p>
              <p className="font-body text-xs text-slate-400">{r.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
