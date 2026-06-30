// components/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
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

  if (submitted) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
        <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Send className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="font-display font-bold text-xl text-slate-900">Message sent!</h2>
        <p className="font-body text-slate-500 mt-2 max-w-xs">
          We've received your message and will get back to you within a few hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8">
      <h2 className="font-display font-bold text-xl text-slate-900 mb-6">Send us a message</h2>
      {error && (
        <p className="font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-body text-xs text-slate-500 block mb-1.5">Full name *</label>
            <input required type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="font-body text-xs text-slate-500 block mb-1.5">Phone number</label>
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        <div>
          <label className="font-body text-xs text-slate-500 block mb-1.5">Email address *</label>
          <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="font-body text-xs text-slate-500 block mb-1.5">Subject</label>
          <input type="text" value={form.subject} onChange={(e) => update("subject", e.target.value)}
            placeholder="e.g. Repair enquiry, Price quote, Business IT..."
            className="w-full border border-slate-200 rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-blue-400" />
        </div>
        <div>
          <label className="font-body text-xs text-slate-500 block mb-1.5">Message *</label>
          <textarea required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us how we can help..."
            className="w-full border border-slate-200 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-blue-400 resize-none" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-body font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
          <Send className="h-4 w-4" />
          {loading ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}
