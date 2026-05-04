import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SEO } from "@/seo/SEO";
import { MotionPreferenceProvider } from "@/components/effects/MotionPreferenceProvider";
import { SmoothScrollProvider } from "@/components/effects/SmoothScrollProvider";
import { AuraBackground } from "@/components/effects/AuraBackground";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { PreLoader } from "@/components/effects/PreLoader";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Manifesto } from "@/components/landing/Manifesto";
import { BentoServices } from "@/components/landing/BentoServices";
import { Process } from "@/components/landing/Process";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppFAB } from "@/components/landing/WhatsAppFAB";
import { CookieBanner } from "@/components/landing/CookieBanner";

const Index = () => {
  return (
    <LanguageProvider>
      <SEO />
      <SmoothScrollProvider>
        <PreLoader />
        <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
          <AuraBackground />
          <CustomCursor />
          <Nav />
          <Hero />
          <Marquee />
          <Manifesto />
          <BentoServices />
          <Process />
          <FAQ />
          <FinalCTA />
          <Footer />
          <WhatsAppFAB />
          <CookieBanner />
        </main>
      </SmoothScrollProvider>
    </LanguageProvider>
  );
};

export default Index;
