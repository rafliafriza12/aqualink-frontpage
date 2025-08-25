import BenefitSection from "./components/landing/benefit-section";
import FAQLandingSection from "./components/landing/faq-section";
import FeatureSection from "./components/landing/feature-section";
import HeroSection from "./components/landing/hero-section";
import MarqueeSection from "./components/landing/maquee-section";
import SolutionSection from "./components/landing/solution-section";
const LandingPage: React.FC = () => {
  return (
    <div className=" w-full flex flex-col items-center">
      <HeroSection />
      <MarqueeSection direction="left" />
      <SolutionSection />
      <BenefitSection />
      <MarqueeSection direction="right" emblemActive={false} />
      <FAQLandingSection />
      <MarqueeSection direction="left" emblemActive={false} />
      <FeatureSection />
    </div>
  );
};

export default LandingPage;
