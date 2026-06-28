// components/home/Services.tsx
import Link from "next/link";
import { ChevronRight, Laptop, Monitor, HardDrive, Cpu, Network, Bug, type LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  price: string;
  href: string;
};

const SERVICES: Service[] = [
  { icon: Laptop, title: "Laptop Repair", desc: "Screens, keyboards, batteries, hinges.", price: "From ₦8,000", href: "/services/laptop-repair" },
  { icon: Monitor, title: "Desktop & Workstation", desc: "Power issues, upgrades, diagnostics.", price: "From ₦6,000", href: "/services/desktop-repair" },
  { icon: HardDrive, title: "Data Recovery", desc: "Recover files from failed drives.", price: "From ₦15,000", href: "/services/data-recovery" },
  { icon: Cpu, title: "Custom-Built PCs", desc: "Gaming and workstation builds.", price: "From ₦350,000", href: "/services/custom-pcs" },
  { icon: Network, title: "Networking & Business IT", desc: "Office setup, support contracts.", price: "Custom quote", href: "/services/it-solutions" },
  { icon: Bug, title: "Virus & Malware Removal", desc: "Deep clean and security hardening.", price: "From ₦7,000", href: "/services/virus-removal" },
];

export default function Services() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-xs text-blue-700 tracking-widest">WHAT WE DO</p>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 mt-2">Core services</h2>
          </div>
          <Link href="/services" className="hidden sm:flex items-center gap-1 text-blue-700 font-body font-semibold text-sm">
            View all services <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="h-11 w-11 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors">
                <s.icon className="h-5 w-5 text-blue-700 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-900">{s.title}</h3>
              <p className="font-body text-sm text-slate-500 mt-1.5">{s.desc}</p>
              <div className="flex items-center justify-between mt-5">
                <span className="font-mono text-xs text-slate-400">{s.price}</span>
                <Link href={s.href} className="text-orange-500 font-body font-semibold text-sm flex items-center gap-1">
                  Request <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
