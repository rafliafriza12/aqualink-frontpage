import Footer from "./components/footer";
import BenefitSection from "./components/landing/benefit-section";
import CTA from "./components/landing/cta";
import { DockBar } from "./components/landing/dock-bar";
import FAQLandingSection from "./components/landing/faq-section";
import FeatureSection from "./components/landing/feature-section";
import HeroSection from "./components/landing/hero-section";
import MarqueeSection from "./components/landing/maquee-section";
import SolutionSection from "./components/landing/solution-section";
const LandingPage: React.FC = () => {
  return (
    <>
      <DockBar />
      <div className=" w-full flex flex-col items-center !scroll-smooth">
        <HeroSection />
        <MarqueeSection direction="left" />
        <SolutionSection />
        <BenefitSection />
        <MarqueeSection direction="right" emblemActive={false} />
        <FAQLandingSection />
        <CTA />
        <MarqueeSection direction="left" emblemActive={false} />
        <FeatureSection />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
