// app/services/page.tsx
import Link from "next/link";
import {
  Laptop, Monitor, HardDrive, Cpu, Network,
  Bug, Shield, Settings, Wifi, Database,
  ChevronRight
} from "lucide-react";

export const metadata = {
  title: "Services | Alphatech Computer Engineering & Technologies",
  description:
    "Professional computer repair, IT support, networking, virus removal, data recovery and custom PC builds in Osogbo and Akure, Nigeria.",
};

const REPAIR_SERVICES = [
  {
    icon: Laptop,
    title: "Laptop Repair",
    desc: "Screen replacement, keyboard repair, battery replacement, hinge repair, charging port fix, motherboard diagnosis and repair.",
    price: "From ₦8,000",
    turnaround: "24–48 hours",
  },
  {
    icon: Monitor,
    title: "Desktop & Workstation Repair",
    desc: "Power supply replacement, boot issues, overheating, RAM and GPU faults, BIOS recovery and full hardware diagnostics.",
    price: "From ₦6,000",
    turnaround: "24–48 hours",
  },
  {
    icon: HardDrive,
    title: "Data Recovery",
    desc: "Recovery from failed HDDs, SSDs, USB drives and memory cards. We handle logical failures, accidental deletion and physical damage.",
    price: "From ₦15,000",
    turnaround: "2–5 days",
  },
  {
    icon: Bug,
    title: "Virus & Malware Removal",
    desc: "Deep system scan, complete malware removal, security hardening and Windows repair. Your data is preserved throughout.",
    price: "From ₦7,000",
    turnaround: "Same day",
  },
  {
    icon: Settings,
    title: "Software & OS Installation",
    desc: "Windows 10/11 installation, driver setup, software configuration, Office installation and system optimization.",
    price: "From ₦5,000",
    turnaround: "Same day",
  },
  {
    icon: Cpu,
    title: "Hardware Upgrades",
    desc: "RAM upgrades, HDD-to-SSD migration, GPU installation, CPU thermal paste replacement and cooling system upgrades.",
    price: "From ₦4,000 + parts",
    turnaround: "Same day",
  },
];

const IT_SERVICES = [
  {
    icon: Network,
    title: "Networking & LAN Setup",
    desc: "Home and office network setup, router configuration, LAN cabling, Wi-Fi optimization and network troubleshooting.",
    price: "Custom quote",
    turnaround: "1–2 days",
  },
  {
    icon: Wifi,
    title: "Business IT Support",
    desc: "Monthly IT support contracts for SMEs. We handle your computers, printers, network and software so you can focus on business.",
    price: "Monthly contract",
    turnaround: "Ongoing",
  },
  {
    icon: Shield,
    title: "Cybersecurity & Antivirus",
    desc: "Business antivirus setup, firewall configuration, staff security training and regular security audits.",
    price: "Custom quote",
    turnaround: "1–3 days",
  },
  {
    icon: Database,
    title: "System Maintenance",
    desc: "Scheduled maintenance contracts — cleaning, updates, backups and performance tuning to keep your computers running optimally.",
    price: "From ₦15,000/quarter",
    turnaround: "Ongoing",
  },
];

function ServiceCard({
  icon: Icon, title, desc, price, turnaround
}: {
  icon: any; title: string; desc: string; price: string; turnaround: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all group flex flex-col">
      <div className="h-11 w-11 rounded-lg bg-blue-50 group-hover:bg-blue-700 flex items-center justify-center mb-4 transition-colors">
        <Icon className="h-5 w-5 text-blue-700 group-hover:text-white transition-colors" />
      </div>
      <h3 className="font-display font-semibold text-lg text-slate-900">{title}</h3>
      <p className="font-body text-sm text-slate-500 mt-2 leading-relaxed flex-1">{desc}</p>
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs text-slate-400">Starting price</p>
          <p className="font-display font-bold text-blue-800 text-sm">{price}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-slate-400">Turnaround</p>
          <p className="font-body text-xs font-semibold text-slate-700">{turnaround}</p>
        </div>
      </div>
      <Link
        href="/book-repair"
        className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold text-sm py-2.5 rounded-lg transition-colors"
      >
        Request this service <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main>
      <section className="bg-slate-950 py-20">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <p className="font-mono text-xs text-sky-400 tracking-widest">WHAT WE OFFER</p>
          <h1 className="font-display font-bold text-3xl lg:text-5xl text-white mt-3">
            Professional computer services
          </h1>
          <p className="font-body text-slate-400 text-lg mt-4 max-w-2xl mx-auto">
            From a single laptop repair to a full business IT setup — certified engineers, genuine parts,
            and a warranty on every job.
          </p>
          <Link
            href="/book-repair"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold px-6 py-3.5 rounded-xl mt-6 transition-colors"
          >
            Book a repair now
          </Link>
        </div>
      </section>

      {/* Repair services */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="font-mono text-xs text-blue-700 tracking-widest">REPAIR SERVICES</p>
          <h2 className="font-display font-bold text-3xl text-slate-900 mt-2 mb-8">Computer repairs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REPAIR_SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* IT services */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <p className="font-mono text-xs text-blue-700 tracking-widest">IT SOLUTIONS</p>
          <h2 className="font-display font-bold text-3xl text-slate-900 mt-2 mb-8">Business & IT services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {IT_SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom PC */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-5xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-mono text-xs text-sky-400 tracking-widest">CUSTOM BUILDS</p>
            <h2 className="font-display font-bold text-3xl text-white mt-2">Custom-built PCs</h2>
            <p className="font-body text-slate-400 mt-4 leading-relaxed">
              Want a gaming rig, a video editing workstation or a reliable office machine? Tell us
              your budget and use case and our engineers will spec, source and build the perfect
              system — with full warranty and after-build support.
            </p>
            <ul className="mt-5 space-y-2">
              {["Gaming PCs", "Workstations", "Office computers", "Budget builds", "High-performance rigs"].map((i) => (
                <li key={i} className="flex items-center gap-2 font-body text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />{i}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-body font-semibold px-6 py-3 rounded-xl mt-6 transition-colors"
            >
              Get a custom quote
            </Link>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <p className="font-mono text-xs text-slate-500 mb-4">SAMPLE BUILDS</p>
            {[
              { name: "Budget Office PC", spec: "Core i3, 8GB RAM, 256GB SSD", price: "From ₦180,000" },
              { name: "Mid-range Gaming PC", spec: "Ryzen 5, 16GB RAM, GTX 1660", price: "From ₦650,000" },
              { name: "High-end Workstation", spec: "Ryzen 9, 32GB RAM, RTX 3060", price: "From ₦1,200,000" },
            ].map((b) => (
              <div key={b.name} className="py-3 border-b border-slate-800 last:border-0">
                <p className="font-body font-semibold text-sm text-white">{b.name}</p>
                <p className="font-body text-xs text-slate-400 mt-0.5">{b.spec}</p>
                <p className="font-mono text-xs text-sky-400 mt-1">{b.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
