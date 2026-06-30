// components/home/WhyChooseUs.tsx
import { ShieldCheck, Check, Wrench, Star } from "lucide-react";

type Pillar = { title: string; desc: string };
type Props = { title?: string; pillars?: Pillar[] };

const DEFAULT_PILLARS: Pillar[] = [
  { title: "Certified engineers", desc: "Trained, vetted technicians — not guesswork." },
  { title: "Genuine parts only", desc: "No counterfeits. Every component sourced and verified." },
  { title: "Fast turnaround", desc: "Most repairs diagnosed same-day, completed in 48 hours." },
  { title: "Warranty on every repair", desc: "90 days covered, no questions asked." },
];

const ICONS = [ShieldCheck, Check, Wrench, Star];

export default function WhyChooseUs({
  title = "Built on trust, backed by skill",
  pillars = DEFAULT_PILLARS,
}: Props) {
  return (
    <section className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <p className="font-mono text-xs text-sky-400 tracking-widest text-center">WHY ALPHATECH</p>
        <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mt-2 text-center">{title}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {pillars.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={i} className="text-center">
                <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-5 w-5 text-sky-400" />
                </div>
                <h3 className="font-display font-semibold text-white">{p.title}</h3>
                <p className="font-body text-sm text-slate-400 mt-2">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
