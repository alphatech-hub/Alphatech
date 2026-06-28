// app/book-repair/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Laptop, Monitor, Cpu, Gamepad2, Briefcase,
  ChevronRight, ChevronLeft, Check, Upload,
  Calendar, Clock, User, Mail, Phone, Wrench
} from "lucide-react";

// ── Step data ───────────────────────────────────────────────────

const DEVICE_TYPES = [
  { value: "Laptop", icon: Laptop, desc: "All laptop brands" },
  { value: "Desktop", icon: Monitor, desc: "Tower & all-in-one" },
  { value: "Workstation", icon: Cpu, desc: "High-performance PCs" },
  { value: "Gaming PC", icon: Gamepad2, desc: "Gaming rigs & builds" },
  { value: "Business Computer", icon: Briefcase, desc: "Office computers" },
];

const TIMES = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM",
];

const STEPS = ["Device", "Problem", "Schedule", "Contact", "Confirm"];

// ── Helper ──────────────────────────────────────────────────────

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

// ── Sub-components ──────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10 overflow-x-auto pb-2">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i < current ? "bg-green-500 text-white"
              : i === current ? "bg-blue-700 text-white"
              : "bg-slate-200 text-slate-500"
            }`}>
              {i < current ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-[10px] mt-1 font-body whitespace-nowrap ${
              i === current ? "text-blue-700 font-semibold" : "text-slate-400"
            }`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 w-8 sm:w-12 mx-1 mb-4 transition-colors ${i < current ? "bg-green-400" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────

export default function BookRepairPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");

  const [form, setForm] = useState({
    deviceType: "",
    brandModel: "",
    problemDescription: "",
    photos: [] as string[],
    preferredDate: "",
    preferredTime: "",
    name: "",
    email: "",
    phone: "",
  });

  function update(field: keyof typeof form, value: any) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function canNext() {
    if (step === 0) return !!form.deviceType;
    if (step === 1) return form.problemDescription.length >= 10;
    if (step === 2) return !!form.preferredDate && !!form.preferredTime;
    if (step === 3) return !!form.name && !!form.email && !!form.phone;
    return true;
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking failed");
      setTicketNumber(data.ticketNumber);
      setStep(5); // confirmation step
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Confirmation screen ──────────────────────────────────────
  if (step === 5) {
    return (
      <main className="bg-slate-950 min-h-screen flex items-center justify-center px-5 py-16">
        <div className="max-w-md w-full text-center">
          <div className="h-16 w-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-400" />
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Repair booked!</h1>
          <p className="font-body text-slate-400 mt-3">
            Your repair request has been received. Keep your ticket number safe — you'll need it to track your repair.
          </p>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 mt-8">
            <p className="font-mono text-xs text-slate-500 mb-2">YOUR TICKET NUMBER</p>
            <p className="font-mono text-2xl font-bold text-sky-400">{ticketNumber}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mt-4 text-left space-y-2.5">
            {[
              { label: "Device", value: form.deviceType },
              { label: "Brand/Model", value: form.brandModel || "Not specified" },
              { label: "Appointment", value: `${form.preferredDate} at ${form.preferredTime}` },
              { label: "Contact", value: form.name },
            ].map((r) => (
              <div key={r.label} className="flex justify-between font-body text-sm">
                <span className="text-slate-500">{r.label}</span>
                <span className="text-white font-medium">{r.value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => router.push(`/track-order?ticket=${ticketNumber}`)}
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-body font-semibold py-3 rounded-xl transition-colors"
            >
              Track this repair
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 border border-slate-700 text-slate-300 font-body font-semibold py-3 rounded-xl hover:border-slate-500 transition-colors"
            >
              Back to home
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── Main booking form ────────────────────────────────────────
  return (
    <main className="bg-slate-950 min-h-screen py-12 px-5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-700/20 flex items-center justify-center mx-auto mb-4">
            <Wrench className="h-6 w-6 text-sky-400" />
          </div>
          <h1 className="font-display font-bold text-2xl lg:text-3xl text-white">Book a repair</h1>
          <p className="font-body text-slate-400 mt-2">
            Takes 2 minutes. We'll confirm your appointment by phone.
          </p>
        </div>

        <StepIndicator current={step} />

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8">

          {/* Step 0 — Device type */}
          {step === 0 && (
            <div>
              <h2 className="font-display font-semibold text-white text-lg mb-5">What device needs repair?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DEVICE_TYPES.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => update("deviceType", d.value)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                      form.deviceType === d.value
                        ? "border-blue-500 bg-blue-950/50"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                      form.deviceType === d.value ? "bg-blue-700" : "bg-slate-800"
                    }`}>
                      <d.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-white text-sm">{d.value}</p>
                      <p className="font-body text-xs text-slate-400">{d.desc}</p>
                    </div>
                    {form.deviceType === d.value && (
                      <Check className="h-4 w-4 text-blue-400 ml-auto shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-5">
                <label className="font-body text-xs text-slate-400 block mb-1.5">Brand & model (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. HP Pavilion 15, Dell XPS 13"
                  value={form.brandModel}
                  onChange={(e) => update("brandModel", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400 placeholder-slate-600"
                />
              </div>
            </div>
          )}

          {/* Step 1 — Problem */}
          {step === 1 && (
            <div>
              <h2 className="font-display font-semibold text-white text-lg mb-2">Describe the problem</h2>
              <p className="font-body text-sm text-slate-400 mb-5">
                The more detail you give, the faster we can diagnose and quote.
              </p>
              <textarea
                rows={5}
                placeholder="e.g. My laptop won't turn on. When I press the power button I see a flash then nothing. It started after a power surge..."
                value={form.problemDescription}
                onChange={(e) => update("problemDescription", e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-sky-400 placeholder-slate-600 resize-none"
              />
              <p className={`font-body text-xs mt-1.5 ${form.problemDescription.length < 10 ? "text-slate-500" : "text-green-400"}`}>
                {form.problemDescription.length} characters {form.problemDescription.length < 10 ? `(${10 - form.problemDescription.length} more needed)` : "✓"}
              </p>

              <div className="mt-5">
                <label className="font-body text-xs text-slate-400 block mb-2">
                  Photos of the device (optional but helpful)
                </label>
                <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-slate-500 transition-colors cursor-pointer">
                  <Upload className="h-6 w-6 text-slate-500 mx-auto mb-2" />
                  <p className="font-body text-sm text-slate-400">
                    Photo upload coming soon
                  </p>
                  <p className="font-body text-xs text-slate-600 mt-1">
                    For now, bring photos on your phone when you drop off
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Schedule */}
          {step === 2 && (
            <div>
              <h2 className="font-display font-semibold text-white text-lg mb-2">Choose a drop-off time</h2>
              <p className="font-body text-sm text-slate-400 mb-5">
                We're open Monday–Saturday, 9 AM–5 PM. Choose a slot that works for you.
              </p>

              <div className="mb-5">
                <label className="font-body text-xs text-slate-400 flex items-center gap-1.5 mb-2">
                  <Calendar className="h-3.5 w-3.5" /> Preferred date
                </label>
                <input
                  type="date"
                  min={minDate()}
                  value={form.preferredDate}
                  onChange={(e) => update("preferredDate", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="font-body text-xs text-slate-400 flex items-center gap-1.5 mb-2">
                  <Clock className="h-3.5 w-3.5" /> Preferred time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => update("preferredTime", t)}
                      className={`py-2.5 rounded-lg font-mono text-xs transition-colors ${
                        form.preferredTime === t
                          ? "bg-blue-700 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Contact */}
          {step === 3 && (
            <div>
              <h2 className="font-display font-semibold text-white text-lg mb-2">Your contact details</h2>
              <p className="font-body text-sm text-slate-400 mb-5">
                We'll call to confirm your appointment and send updates.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <User className="h-3.5 w-3.5" /> Full name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <Mail className="h-3.5 w-3.5" /> Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-slate-400 flex items-center gap-1.5 mb-1.5">
                    <Phone className="h-3.5 w-3.5" /> Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="+234..."
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Review & confirm */}
          {step === 4 && (
            <div>
              <h2 className="font-display font-semibold text-white text-lg mb-5">Review your booking</h2>
              <div className="space-y-3">
                {[
                  { label: "Device", value: `${form.deviceType}${form.brandModel ? ` — ${form.brandModel}` : ""}` },
                  { label: "Problem", value: form.problemDescription },
                  { label: "Drop-off", value: `${form.preferredDate} at ${form.preferredTime}` },
                  { label: "Name", value: form.name },
                  { label: "Email", value: form.email },
                  { label: "Phone", value: form.phone },
                ].map((r) => (
                  <div key={r.label} className="bg-slate-950 rounded-xl px-4 py-3 border border-slate-800">
                    <p className="font-mono text-[10px] text-slate-500 mb-1">{r.label.toUpperCase()}</p>
                    <p className="font-body text-sm text-white">{r.value}</p>
                  </div>
                ))}
              </div>
              {error && (
                <p className="font-body text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2 mt-4">
                  {error}
                </p>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 border border-slate-700 text-slate-300 font-body font-semibold px-5 py-3 rounded-xl hover:border-slate-500 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
            )}
            <button
              onClick={step === 4 ? handleSubmit : () => setStep(step + 1)}
              disabled={!canNext() || loading}
              className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-body font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              {loading ? "Submitting..." : step === 4 ? "Confirm booking" : (
                <><span>Continue</span><ChevronRight className="h-4 w-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
