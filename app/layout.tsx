// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { getAllSettings } from "@/lib/site-settings";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-space-grotesk",
});
const inter = Inter({
  subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"], weight: ["500"], variable: "--font-jetbrains-mono",
});

export async function generateMetadata(): Promise<Metadata> {
  const s = await getAllSettings();
  return {
    title: `${s["site.name"]} | Computer Repairs, Sales & IT Solutions in Nigeria`,
    description: `${s["site.name"]} offers professional computer repair, sales and IT solutions in ${s["contact.location1"]} and ${s["contact.location2"]}.`,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getAllSettings();

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body">
        <AuthProvider>
          <Navbar
            logoUrl={settings["site.logo_url"] || undefined}
            siteName={settings["site.name"]?.split(" ")[0] ?? "ALPHATECH"}
          />
          {children}
          <Footer settings={settings} />
        </AuthProvider>
      </body>
    </html>
  );
}
