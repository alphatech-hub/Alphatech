// app/page.tsx
import { getAllSettings } from "@/lib/site-settings";
import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Services from "@/components/home/Services";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default async function HomePage() {
  const s = await getAllSettings();

  return (
    <main>
      <Hero
        headline1={s["hero.headline_line1"]}
        headline2={s["hero.headline_line2"]}
        subheadline={s["hero.subheadline"]}
        ctaPrimary={s["hero.cta_primary"]}
        ctaSecondary={s["hero.cta_secondary"]}
      />
      <TrustStrip
        repairs={s["trust.repairs"]}
        turnaround={s["trust.turnaround"]}
        warranty={s["trust.warranty"]}
        rating={s["trust.rating"]}
      />
      <Services />
      <FeaturedProducts />
      <WhyChooseUs
        title={s["why.title"]}
        pillars={[
          { title: s["why.pillar1_title"], desc: s["why.pillar1_desc"] },
          { title: s["why.pillar2_title"], desc: s["why.pillar2_desc"] },
          { title: s["why.pillar3_title"], desc: s["why.pillar3_desc"] },
          { title: s["why.pillar4_title"], desc: s["why.pillar4_desc"] },
        ]}
      />
      <HowItWorks />
      <Testimonials />
      <Newsletter
        headline={s["newsletter.headline"]}
        subtext={s["newsletter.subtext"]}
      />
    </main>
  );
}
