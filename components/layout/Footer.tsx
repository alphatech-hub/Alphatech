// components/layout/Footer.tsx
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import AlphaMark from "./AlphaMark";
import { SITE, CONTACT, LOCATIONS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <AlphaMark className="h-10 w-10" />
            <p className="font-display font-bold text-white">ALPHATECH</p>
          </div>
          <p className="font-body text-sm text-slate-400">{SITE.tagline}</p>
        </div>

        <div>
          <p className="font-display font-semibold text-white text-sm mb-4">Company</p>
          <ul className="space-y-2.5 font-body text-sm text-slate-400">
            <li><Link href="/about" className="hover:text-sky-400">About Us</Link></li>
            <li><Link href="/services" className="hover:text-sky-400">Services</Link></li>
            <li><Link href="/store" className="hover:text-sky-400">Store</Link></li>
            <li><Link href="/blog" className="hover:text-sky-400">Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-white text-sm mb-4">Support</p>
          <ul className="space-y-2.5 font-body text-sm text-slate-400">
            <li><Link href="/book-repair" className="hover:text-sky-400">Book a Repair</Link></li>
            <li><Link href="/track-order" className="hover:text-sky-400">Track Order/Repair</Link></li>
            <li><Link href="/faq" className="hover:text-sky-400">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-sky-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display font-semibold text-white text-sm mb-4">Contact</p>
          <ul className="space-y-3 font-body text-sm text-slate-400">
            {LOCATIONS.map((loc) => (
              <li key={loc.city} className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                {loc.city}, {loc.state}, {loc.country}
              </li>
            ))}
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                {CONTACT.phones.map((p) => (
                  <span key={p} className="block">{p}</span>
                ))}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="break-all">{CONTACT.email}</span>
            </li>
          </ul>
          <a
            href={CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg mt-4 transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-slate-500">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500">
          <span className="border border-slate-700 rounded px-2 py-1">PAYSTACK</span>
          <span className="border border-slate-700 rounded px-2 py-1">FLUTTERWAVE</span>
          <span className="border border-slate-700 rounded px-2 py-1">BANK TRANSFER</span>
        </div>
      </div>
    </footer>
  );
}
