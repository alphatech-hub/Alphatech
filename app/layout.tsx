// app/layout.tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/providers/AuthProvider";
import { SITE } from "@/lib/constants";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: `${SITE.shortName} | Computer Repairs, Sales & IT Solutions in Nigeria`,
  description:
    "Alphatech Computer Engineering & Technologies offers professional computer repair, sales of new and refurbished computers, accessories, and business IT solutions in Osogbo and Akure, Nigeria.",
  keywords: [
    "computer repair Nigeria",
    "laptop repair Osogbo",
    "computer repair Akure",
    "buy laptops Nigeria",
    "IT solutions Nigeria",
    "Alphatech",
  ],
  openGraph: {
    title: `${SITE.shortName} | Computer Repairs, Sales & IT Solutions`,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.shortName,
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
