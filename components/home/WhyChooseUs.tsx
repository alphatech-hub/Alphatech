// components/home/WhyChooseUs.tsx
import { ShieldCheck, Check, Wrench, Star, type LucideIcon } from "lucide-react";

type Pillar = { icon: LucideIcon; title: string; desc: string };

const PILLARS: Pillar[] = [
  { icon: ShieldCheck, title: "Certified engineers", desc: "Trained, vetted technicians — not guesswork." },
  { icon: Check, title: "Genuine parts only", desc: "No counterfeits. Every component sourced and verified." },
  { icon: Wrench, title: "Fast turnaround", desc: "Most repairs diagnosed same-day, completed in 48 hours." },
  { icon: Star, title: "Warranty on every repair", desc: "90 days covered, no questions asked." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <p className="font-mono text-xs text-sky-400 tracking-widest text-center">WHY ALPHATECH</p>
        <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mt-2 text-center">
          Built on trust, backed by skill
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {PILLARS.map((i) => (
            <div key={i.title} className="text-center">
              <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto mb-4">
                <i.icon className="h-5 w-5 text-sky-400" />
              </div>
              <h3 className="font-display font-semibold text-white">{i.title}</h3>
              <p className="font-body text-sm text-slate-400 mt-2">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
