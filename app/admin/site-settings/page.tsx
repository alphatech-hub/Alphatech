// app/admin/site-settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Save, Loader, Check, Globe } from "lucide-react";
import ImageUploader from "@/components/admin/ImageUploader";

type Settings = Record<string, string>;

const SECTIONS = [
  {
    key: "brand",
    title: "Brand & Logo",
    desc: "Your company name, tagline and logo.",
    fields: [
      { key: "site.name", label: "Company name", type: "text" },
      { key: "site.tagline", label: "Tagline (shown in footer)", type: "text" },
    ],
  },
  {
    key: "hero",
    title: "Homepage Hero",
    desc: "The big headline and buttons at the top of the homepage.",
    fields: [
      { key: "hero.headline_line1", label: "Headline line 1", type: "text" },
      { key: "hero.headline_line2", label: "Headline line 2 (blue gradient text)", type: "text" },
      { key: "hero.subheadline", label: "Sub-headline paragraph", type: "textarea" },
      { key: "hero.cta_primary", label: "Primary button text", type: "text" },
      { key: "hero.cta_secondary", label: "Secondary button text", type: "text" },
    ],
  },
  {
    key: "trust",
    title: "Trust Statistics",
    desc: "The four stats shown below the hero (repairs, turnaround, warranty, rating).",
    fields: [
      { key: "trust.repairs", label: "Repairs completed", type: "text" },
      { key: "trust.turnaround", label: "Average turnaround", type: "text" },
      { key: "trust.warranty", label: "Repair warranty", type: "text" },
      { key: "trust.rating", label: "Customer rating", type: "text" },
    ],
  },
  {
    key: "why",
    title: "Why Choose Us",
    desc: "The four pillars section on the homepage.",
    fields: [
      { key: "why.title", label: "Section title", type: "text" },
      { key: "why.pillar1_title", label: "Pillar 1 title", type: "text" },
      { key: "why.pillar1_desc", label: "Pillar 1 description", type: "text" },
      { key: "why.pillar2_title", label: "Pillar 2 title", type: "text" },
      { key: "why.pillar2_desc", label: "Pillar 2 description", type: "text" },
      { key: "why.pillar3_title", label: "Pillar 3 title", type: "text" },
      { key: "why.pillar3_desc", label: "Pillar 3 description", type: "text" },
      { key: "why.pillar4_title", label: "Pillar 4 title", type: "text" },
      { key: "why.pillar4_desc", label: "Pillar 4 description", type: "text" },
    ],
  },
  {
    key: "about",
    title: "About Page",
    desc: "Text shown on the About Us page.",
    fields: [
      { key: "about.headline", label: "Page headline", type: "text" },
      { key: "about.intro", label: "Introduction paragraph", type: "textarea" },
      { key: "about.mission", label: "Mission statement", type: "textarea" },
      { key: "about.vision", label: "Vision statement", type: "textarea" },
    ],
  },
  {
    key: "contact",
    title: "Contact Information",
    desc: "Phone numbers, email, WhatsApp and locations shown in the footer and contact page.",
    fields: [
      { key: "contact.phone1", label: "Phone number 1", type: "text" },
      { key: "contact.phone2", label: "Phone number 2", type: "text" },
      { key: "contact.email", label: "Email address", type: "text" },
      { key: "contact.whatsapp", label: "WhatsApp link", type: "text" },
      { key: "contact.location1", label: "Location 1", type: "text" },
      { key: "contact.location2", label: "Location 2", type: "text" },
      { key: "contact.hours_weekday", label: "Weekday hours", type: "text" },
      { key: "contact.hours_saturday", label: "Saturday hours", type: "text" },
    ],
  },
  {
    key: "newsletter",
    title: "Newsletter Section",
    desc: "Text in the email signup section at the bottom of the homepage.",
    fields: [
      { key: "newsletter.headline", label: "Headline", type: "text" },
      { key: "newsletter.subtext", label: "Subtext", type: "text" },
    ],
  },
];

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [logoImages, setLogoImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("brand");

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        if (data["site.logo_url"]) setLogoImages([data["site.logo_url"]]);
        setLoading(false);
      });
  }, []);

  function update(key: string, value: string) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const payload = { ...settings };
    if (logoImages.length > 0) payload["site.logo_url"] = logoImages[0];
    else payload["site.logo_url"] = "";

    await fetch("/api/admin/site-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center gap-3 text-slate-400">
        <Loader className="h-5 w-5 animate-spin" /> Loading settings...
      </div>
    );
  }

  const inputClass = "w-full bg-slate-950 border border-slate-700 text-white rounded-lg px-4 py-2.5 font-body text-sm focus:outline-none focus:border-sky-400";
  const labelClass = "font-body text-xs text-slate-400 block mb-1.5";

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Site Settings</h1>
          <p className="font-body text-sm text-slate-400 mt-1">
            Edit any text, logo or contact info on your website — changes go live instantly.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 font-body font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors ${
            saved ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-60"
          }`}
        >
          {saving ? <Loader className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save all changes"}
        </button>
      </div>

      <div className="flex gap-6 items-start">
        {/* Section nav */}
        <aside className="w-44 shrink-0 sticky top-6">
          <nav className="space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-colors ${
                  activeSection === s.key
                    ? "bg-blue-700 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings form */}
        <div className="flex-1 min-w-0 space-y-5">
          {SECTIONS.filter((s) => s.key === activeSection).map((section) => (
            <div key={section.key} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="font-display font-semibold text-white mb-1">{section.title}</h2>
              <p className="font-body text-xs text-slate-500 mb-5">{section.desc}</p>

              {/* Logo uploader — only in brand section */}
              {section.key === "brand" && (
                <div className="mb-5 pb-5 border-b border-slate-800">
                  <ImageUploader
                    images={logoImages}
                    onImagesChange={(urls) => {
                      setLogoImages(urls);
                      if (urls.length > 0) update("site.logo_url", urls[0]);
                      else update("site.logo_url", "");
                    }}
                    maxImages={1}
                    label="Logo image — upload your PNG/SVG logo (shown in navbar and footer)"
                  />
                  {settings["site.logo_url"] && (
                    <div className="mt-3 flex items-center gap-3">
                      <Globe className="h-4 w-4 text-slate-500" />
                      <p className="font-mono text-xs text-slate-500 truncate">{settings["site.logo_url"]}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label className={labelClass}>{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={settings[field.key] ?? ""}
                        onChange={(e) => update(field.key, e.target.value)}
                        className={`${inputClass} resize-none`}
                      />
                    ) : (
                      <input
                        type="text"
                        value={settings[field.key] ?? ""}
                        onChange={(e) => update(field.key, e.target.value)}
                        className={inputClass}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center gap-2 font-body font-semibold px-6 py-3 rounded-xl transition-colors ${
                saved ? "bg-green-600 text-white" : "bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-60"
              }`}
            >
              {saving ? <Loader className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saving ? "Saving..." : saved ? "Saved!" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
