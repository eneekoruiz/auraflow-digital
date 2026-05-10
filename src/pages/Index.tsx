import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SEO } from "@/seo/SEO";
import { StructuredData } from "@/seo/StructuredData";
import { MotionPreferenceProvider } from "@/components/effects/MotionPreferenceProvider";
import { SmoothScrollProvider } from "@/components/effects/SmoothScrollProvider";
import { AuraBackground } from "@/components/effects/AuraBackground";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { PreLoader } from "@/components/effects/PreLoader";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";

import { BentoServices } from "@/components/landing/BentoServices";
import { Process } from "@/components/landing/Process";
import { FAQ } from "@/components/landing/FAQ";
import { Pricing } from "@/components/landing/Pricing";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppFAB } from "@/components/landing/WhatsAppFAB";
import { CookieBanner } from "@/components/landing/CookieBanner";
import { ExitIntent } from "@/components/landing/ExitIntent";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { FounderNote } from "@/components/landing/FounderNote";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { ScrollDepthTracker } from "@/components/effects/ScrollDepthTracker";
import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics";

const Index = () => {
  useEffect(() => { initAnalytics(); }, []);
  return (
    <LanguageProvider>
      <MotionPreferenceProvider>
        <SEO />
        <StructuredData />
        <SmoothScrollProvider>
          <PreLoader />
          <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
            <AuraBackground />
            <CustomCursor />
            <Nav />
            <Hero />
            <Marquee />
            <Stats />
            <BentoServices />
            <Process />
            <Pricing />
            <Testimonials />
            <FounderNote />
            <FAQ />
            <FinalCTA />
            <Footer />
            <WhatsAppFAB />
            <CookieBanner />
            <ExitIntent />
            <StickyMobileCTA />
            <ScrollDepthTracker />
          </main>
        </SmoothScrollProvider>
      </MotionPreferenceProvider>
    </LanguageProvider>
  );
};

export default Index;
