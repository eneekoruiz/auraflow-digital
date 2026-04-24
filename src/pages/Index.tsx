import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SmoothScrollProvider } from "@/components/effects/SmoothScrollProvider";
import { AuraBackground } from "@/components/effects/AuraBackground";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Manifesto } from "@/components/landing/Manifesto";
import { BentoServices } from "@/components/landing/BentoServices";
import { Process } from "@/components/landing/Process";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { WhatsAppFAB } from "@/components/landing/WhatsAppFAB";

const Index = () => {
  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
          <AuraBackground />
          <CustomCursor />
          <Nav />
          <Hero />
          <Manifesto />
          <BentoServices />
          <Process />
          <FAQ />
          <FinalCTA />
          <Footer />
          <WhatsAppFAB />
        </main>
      </SmoothScrollProvider>
    </LanguageProvider>
  );
};

export default Index;
