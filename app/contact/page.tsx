// app/contact/page.tsx
import { getAllSettings } from "@/lib/site-settings";
import ContactForm from "@/components/contact/ContactForm";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Alphatech Computer Engineering & Technologies",
};

export default async function ContactPage() {
  const s = await getAllSettings();

  const phone1 = s["contact.phone1"] ?? "";
  const phone2 = s["contact.phone2"] ?? "";
  const email = s["contact.email"] ?? "";
  const whatsapp = s["contact.whatsapp"] ?? "#";
  const location1 = s["contact.location1"] ?? "";
  const location2 = s["contact.location2"] ?? "";
  const hoursWeekday = s["contact.hours_weekday"] ?? "Monday – Friday: 9 AM – 5 PM";
  const hoursSaturday = s["contact.hours_saturday"] ?? "Saturday: 10 AM – 4 PM";

  return (
    <main>
      <section className="bg-slate-950 py-16">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <p className="font-mono text-xs text-sky-400 tracking-widest">GET IN TOUCH</p>
          <h1 className="font-display font-bold text-3xl lg:text-4xl text-white mt-3">Contact us</h1>
          <p className="font-body text-slate-400 mt-3">
            We're here Monday–Saturday. Expect a response within a few hours.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-3 gap-10">
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-display font-semibold text-slate-900 mb-4">Our locations</p>
              {location1 && (
                <div className="flex gap-3 items-start mb-3">
                  <MapPin className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-slate-600">{location1}</p>
                </div>
              )}
              {location2 && (
                <div className="flex gap-3 items-start">
                  <MapPin className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-slate-600">{location2}</p>
                </div>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-display font-semibold text-slate-900 mb-4">Phone</p>
              {phone1 && (
                <a href={`tel:${phone1.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 font-body text-sm text-slate-700 hover:text-blue-700 mb-2">
                  <Phone className="h-4 w-4 text-blue-700 shrink-0" />{phone1}
                </a>
              )}
              {phone2 && (
                <a href={`tel:${phone2.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 font-body text-sm text-slate-700 hover:text-blue-700">
                  <Phone className="h-4 w-4 text-blue-700 shrink-0" />{phone2}
                </a>
              )}
            </div>

            {email && (
              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <p className="font-display font-semibold text-slate-900 mb-3">Email</p>
                <a href={`mailto:${email}`}
                  className="flex items-start gap-2 font-body text-sm text-slate-700 hover:text-blue-700 break-all">
                  <Mail className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />{email}
                </a>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-display font-semibold text-slate-900 mb-3">Opening hours</p>
              <div className="space-y-1 font-body text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-700 shrink-0" />
                  <span className="text-slate-700">{hoursWeekday}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-700 shrink-0" />
                  <span className="text-slate-700">{hoursSaturday}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-300 shrink-0" />
                  <span className="text-slate-400">Sunday: Closed</span>
                </div>
              </div>
            </div>

            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-body font-semibold py-3 rounded-xl transition-colors w-full">
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
