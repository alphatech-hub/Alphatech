// app/about/page.tsx
import { ShieldCheck, Cpu, Users, Award } from "lucide-react";

export const metadata = {
  title: "About Us | Alphatech Computer Engineering & Technologies",
  description:
    "Learn about Alphatech — our story, mission, values and the expert team behind Osun and Ondo's most trusted computer engineering company.",
};

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", desc: "We give honest diagnoses and fair prices. No hidden charges, no unnecessary repairs." },
  { icon: Cpu, title: "Technical Excellence", desc: "Our engineers stay current with the latest hardware, software and networking technologies." },
  { icon: Users, title: "Customer First", desc: "Every decision we make starts with what's best for the customer — not the bottom line." },
  { icon: Award, title: "Quality Assurance", desc: "Every repair is tested before handover. Every product sold carries a warranty." },
];

const TIMELINE = [
  { year: "2019", event: "Alphatech founded in Osogbo, Osun State with a focus on laptop and desktop repair." },
  { year: "2021", event: "Expanded services to include custom PC builds, networking and business IT support." },
  { year: "2022", event: "Opened second service point in Akure, Ondo State to serve more customers." },
  { year: "2023", event: "Launched computer sales — new, refurbished and custom-built systems." },
  { year: "2024", event: "Passed 1,000 successful repairs. Grew team of certified engineers." },
  { year: "2026", event: "Launched this website to serve customers across Southwest Nigeria." },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <p className="font-mono text-xs text-sky-400 tracking-widest">ABOUT US</p>
          <h1 className="font-display font-bold text-3xl lg:text-5xl text-white mt-3 leading-tight">
            Southwest Nigeria's trusted<br />computer engineering company
          </h1>
          <p className="font-body text-slate-400 text-lg mt-5 max-w-2xl mx-auto">
            Since 2019, Alphatech has been diagnosing, repairing and building computers for
            individuals, students and businesses across Osun and Ondo states — with certified
            engineers, genuine parts and a commitment to doing it right.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-10">
          <div className="bg-blue-700 rounded-2xl p-8 text-white">
            <p className="font-mono text-xs tracking-widest opacity-70 mb-3">OUR MISSION</p>
            <h2 className="font-display font-bold text-2xl mb-4">Reliable solutions. Technology that works.</h2>
            <p className="font-body text-blue-100 leading-relaxed">
              To provide every customer — from a student with a broken laptop to a business
              with a full office network — with fast, honest, high-quality technology services
              at fair prices. We believe technology should work for everyone.
            </p>
          </div>
          <div className="bg-slate-950 rounded-2xl p-8 text-white">
            <p className="font-mono text-xs tracking-widest text-slate-400 mb-3">OUR VISION</p>
            <h2 className="font-display font-bold text-2xl mb-4">The go-to tech partner for Southwest Nigeria.</h2>
            <p className="font-body text-slate-300 leading-relaxed">
              To build the most trusted computer engineering brand in Nigeria — known for
              technical excellence, transparent service and a team that customers can call
              any time something goes wrong with their technology.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8">
          <p className="font-mono text-xs text-blue-700 tracking-widest text-center">WHAT DRIVES US</p>
          <h2 className="font-display font-bold text-3xl text-slate-900 mt-2 text-center">Our values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <v.icon className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="font-display font-semibold text-slate-900">{v.title}</h3>
                <p className="font-body text-sm text-slate-500 mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <p className="font-mono text-xs text-blue-700 tracking-widest text-center">OUR JOURNEY</p>
          <h2 className="font-display font-bold text-3xl text-slate-900 mt-2 text-center mb-12">How we got here</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              {TIMELINE.map((t) => (
                <div key={t.year} className="flex gap-6 items-start">
                  <div className="w-12 shrink-0 text-right">
                    <span className="font-mono text-xs font-bold text-blue-700">{t.year}</span>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-blue-700 shrink-0 mt-0.5 relative z-10" />
                  <p className="font-body text-sm text-slate-600 leading-relaxed">{t.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-16">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display font-bold text-2xl lg:text-3xl text-white">Ready to work with us?</h2>
          <p className="font-body text-slate-400 mt-3">Book a repair, shop our store, or get in touch — we're always happy to help.</p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <a href="/book-repair" className="bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold px-6 py-3 rounded-xl transition-colors">
              Book a repair
            </a>
            <a href="/contact" className="border border-slate-700 hover:border-slate-500 text-white font-body font-semibold px-6 py-3 rounded-xl transition-colors">
              Contact us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
