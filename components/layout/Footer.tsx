// components/layout/Footer.tsx
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import AlphaMark from "./AlphaMark";

type Props = { settings: Record<string, string> };

export default function Footer({ settings }: Props) {
  const s = settings;
  const logoUrl = s["site.logo_url"];
  const siteName = s["site.name"] ?? "Alphatech";
  const tagline = s["site.tagline"] ?? "Reliable solutions. Technology that works.";
  const phone1 = s["contact.phone1"] ?? "";
  const phone2 = s["contact.phone2"] ?? "";
  const email = s["contact.email"] ?? "";
  const whatsapp = s["contact.whatsapp"] ?? "#";
  const location1 = s["contact.location1"] ?? "";
  const location2 = s["contact.location2"] ?? "";

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            {logoUrl ? (
              <img src={logoUrl} alt={siteName} className="h-10 w-auto object-contain" />
            ) : (
              <>
                <AlphaMark className="h-10 w-10" />
                <p className="font-display font-bold text-white">ALPHATECH</p>
              </>
            )}
          </div>
          <p className="font-body text-sm text-slate-400">{tagline}</p>
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
            {location1 && (
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />{location1}
              </li>
            )}
            {location2 && (
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />{location2}
              </li>
            )}
            {(phone1 || phone2) && (
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  {phone1 && <span className="block">{phone1}</span>}
                  {phone2 && <span className="block">{phone2}</span>}
                </span>
              </li>
            )}
            {email && (
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="break-all">{email}</span>
              </li>
            )}
          </ul>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg mt-4 transition-colors">
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs text-slate-500">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
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
