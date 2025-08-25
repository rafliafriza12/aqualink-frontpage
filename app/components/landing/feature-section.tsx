import HexagonalElementSection from "./svg/HexagonalElementSection";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
const FeatureSection: React.FC = () => {
  return (
    <>
      <div className=" w-full min-h-screen hidden lg:block bg-[#1E2272] relative z-0 overflow-hidden">
        {/* <div className="hidden md:block w-[150vw] h-[80vw] rounded-full bg-[#4952FE] blur-[300px] absolute z-[-4] top-[20%] -left-[70%]"></div> */}
        <FlickeringGrid
          className="absolute inset-0 z-[-3] [mask-image:radial-gradient(1100px_circle_at_center,white,transparent)] h-full w-full"
          squareSize={4}
          gridGap={10}
          color="#60A5FA"
          maxOpacity={0.5}
          flickerChance={0.1}
          //   height={1800}
          //   width={1800}
        />
        <HexagonalElementSection />
      </div>
      <div className=" w-full h-screen block lg:hidden bg-gradient-to-bl from-[#1f2375] to-[#4952FE] relative z-0 overflow-hidden">
        <FlickeringGrid
          className="absolute -right-[1%] z-[-3] [mask-image:radial-gradient(400px_circle_at_center,white,transparent)] h-full w-full"
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.5}
          flickerChance={0.1}
          //   height={1800}
          //   width={1800}
        />
        <HexagonalElementSection />
      </div>
    </>
  );
};

export default FeatureSection;
