// app/contact/page.tsx
"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { CONTACT, LOCATIONS } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to send");
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="bg-slate-950 py-16">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <p className="font-mono text-xs text-sky-400 tracking-widest">GET IN TOUCH</p>
          <h1 className="font-display font-bold text-3xl lg:text-4xl text-white mt-3">Contact us</h1>
          <p className="font-body text-slate-400 mt-3">
            We're here Monday–Saturday, 9 AM–5 PM. Expect a response within a few hours.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-3 gap-10">

          {/* Contact info */}
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-display font-semibold text-slate-900 mb-4">Our locations</p>
              {LOCATIONS.map((loc) => (
                <div key={loc.city} className="flex gap-3 items-start mb-3 last:mb-0">
                  <MapPin className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body font-semibold text-sm text-slate-900">{loc.city}</p>
                    <p className="font-body text-xs text-slate-500">{loc.state}, {loc.country}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-display font-semibold text-slate-900 mb-4">Phone</p>
              {CONTACT.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 font-body text-sm text-slate-700 hover:text-blue-700 mb-2 last:mb-0"
                >
                  <Phone className="h-4 w-4 text-blue-700 shrink-0" />
                  {p}
                </a>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-display font-semibold text-slate-900 mb-3">Email</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-start gap-2 font-body text-sm text-slate-700 hover:text-blue-700 break-all"
              >
                <Mail className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                {CONTACT.email}
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="font-display font-semibold text-slate-900 mb-3">Opening hours</p>
              <div className="space-y-1 font-body text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-700 shrink-0" />
                  <span className="text-slate-700">Monday – Friday: 9 AM – 5 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-700 shrink-0" />
                  <span className="text-slate-700">Saturday: 10 AM – 4 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-300 shrink-0" />
                  <span className="text-slate-400">Sunday: Closed</span>
                </div>
              </div>
            </div>

            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-body font-semibold py-3 rounded-xl transition-colors w-full"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 lg:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="font-display font-bold text-xl text-slate-900">Message sent!</h2>
                <p className="font-body text-slate-500 mt-2 max-w-xs">
                  We've received your message and will get back to you within a few hours.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-display font-bold text-xl text-slate-900 mb-6">Send us a message</h2>
                {error && (
                  <p className="font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
                    {error}
                  </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-slate-500 block mb-1.5">Full name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs text-slate-500 block mb-1.5">Phone number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs text-slate-500 block mb-1.5">Email address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-slate-500 block mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      placeholder="e.g. Repair enquiry, Price quote, Business IT..."
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-slate-500 block mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us how we can help..."
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-blue-400 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-body font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {loading ? "Sending..." : "Send message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
