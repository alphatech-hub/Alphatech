// components/home/HowItWorks.tsx
type Step = { n: string; title: string; desc: string };

const STEPS: Step[] = [
  { n: "01", title: "Tell us what's wrong", desc: "Book online or visit us — describe the issue and upload photos." },
  { n: "02", title: "We diagnose & quote", desc: "Get a clear price before any work begins. No surprises." },
  { n: "03", title: "We repair it", desc: "Genuine parts, certified engineers, tracked status updates." },
  { n: "04", title: "Collect your device", desc: "Pick up or arrange delivery — covered by our warranty." },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <p className="font-mono text-xs text-blue-700 tracking-widest text-center">THE PROCESS</p>
        <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 mt-2 text-center">
          How repair booking works
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {STEPS.map((s) => (
            <div key={s.n} className="relative pl-2">
              <p className="font-display font-bold text-4xl text-slate-200">{s.n}</p>
              <h3 className="font-display font-semibold text-lg text-slate-900 mt-2">{s.title}</h3>
              <p className="font-body text-sm text-slate-500 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
