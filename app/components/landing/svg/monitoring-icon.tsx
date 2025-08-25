import { ISolutionIconProps } from "@/app/types/solution-card.types";
const RegisterIcon: React.FC<ISolutionIconProps> = ({ isActive = true }) => {
  return (
    <svg
      className={`w-full h-auto ${
        isActive ? "drop-shadow-[0px_0px_10px_#ffffff]" : ""
      }`}
      viewBox="0 0 148 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M61.666 24.667H86.3327V49.3337H61.666V24.667ZM24.666 98.667H49.3327V123.334H24.666V98.667ZM24.666 61.667H49.3327V86.3337H24.666V61.667ZM24.666 24.667H49.3327V49.3337H24.666V24.667ZM98.666 24.667H123.333V49.3337H98.666V24.667ZM67.8327 110.137V123.334H80.7827L117.659 86.5187L104.586 73.4453L67.8327 110.137ZM86.3327 74.1853V61.667H61.666V86.3337H74.1843L86.3327 74.1853ZM108.971 69.104L117.696 60.3843L130.77 73.4577L122.056 82.1835L108.971 69.104Z"
        fill="white"
        fill-opacity={isActive ? "1" : "0.5"}
      />
    </svg>
  );
};

export default RegisterIcon;
