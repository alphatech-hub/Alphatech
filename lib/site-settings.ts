// lib/site-settings.ts
// Helper functions for reading and writing site settings from the database.
// Admin can edit all of these from /admin/site-settings.

import { prisma } from "@/lib/prisma";

export const SETTING_DEFAULTS: Record<string, string> = {
  // Brand
  "site.name": "Alphatech Computer Engineering & Technologies",
  "site.tagline": "Reliable solutions. Technology that works.",
  "site.logo_url": "", // URL of uploaded logo image

  // Hero section
  "hero.headline_line1": "Technology that works.",
  "hero.headline_line2": "Engineered to last.",
  "hero.subheadline": "From a cracked laptop screen to a full office network — our engineers diagnose fast, repair it right, and back every job with a warranty.",
  "hero.cta_primary": "Book a Repair",
  "hero.cta_secondary": "Shop Computers",

  // Trust strip
  "trust.repairs": "1,200+",
  "trust.turnaround": "48 hrs",
  "trust.warranty": "90 days",
  "trust.rating": "4.8 / 5",

  // Why choose us
  "why.title": "Built on trust, backed by skill",
  "why.pillar1_title": "Certified engineers",
  "why.pillar1_desc": "Trained, vetted technicians — not guesswork.",
  "why.pillar2_title": "Genuine parts only",
  "why.pillar2_desc": "No counterfeits. Every component sourced and verified.",
  "why.pillar3_title": "Fast turnaround",
  "why.pillar3_desc": "Most repairs diagnosed same-day, completed in 48 hours.",
  "why.pillar4_title": "Warranty on every repair",
  "why.pillar4_desc": "90 days covered, no questions asked.",

  // About page
  "about.headline": "Southwest Nigeria's trusted computer engineering company",
  "about.intro": "Since 2019, Alphatech has been diagnosing, repairing and building computers for individuals, students and businesses across Osun and Ondo states.",
  "about.mission": "To provide every customer with fast, honest, high-quality technology services at fair prices.",
  "about.vision": "To build the most trusted computer engineering brand in Nigeria.",

  // Contact
  "contact.phone1": "+234 903 651 8714",
  "contact.phone2": "+234 905 458 1363",
  "contact.email": "supportatalphatechcomputer@gmail.com",
  "contact.whatsapp": "https://wa.link/3yo0c2",
  "contact.location1": "Osogbo, Osun State, Nigeria",
  "contact.location2": "Akure, Ondo State, Nigeria",
  "contact.hours_weekday": "Monday – Friday: 9 AM – 5 PM",
  "contact.hours_saturday": "Saturday: 10 AM – 4 PM",

  // Newsletter
  "newsletter.headline": "Get repair tips & product drops in your inbox",
  "newsletter.subtext": "No spam — just useful maintenance guides and early access to new stock.",
};

// Get all settings, falling back to defaults for missing keys
export async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await prisma.siteSetting.findMany();
  const db: Record<string, string> = {};
  rows.forEach((r) => { db[r.key] = r.value; });
  return { ...SETTING_DEFAULTS, ...db };
}

// Get a single setting value
export async function getSetting(key: string): Promise<string> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  return row?.value ?? SETTING_DEFAULTS[key] ?? "";
}

// Update one or many settings
export async function updateSettings(data: Record<string, string>) {
  await Promise.all(
    Object.entries(data).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    )
  );
}
