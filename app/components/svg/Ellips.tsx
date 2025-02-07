import { SVGIconProps } from "@/app/types";
const Ellips: React.FC<SVGIconProps> = ({ size }) => {
  return (
    <svg
      width={size ? size + 184 : 404}
      height={size ?? 220}
      viewBox="0 0 404 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.03"
        cx="106.5"
        cy="-89.5"
        r="309.5"
        fill="url(#paint0_linear_8006_257)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_8006_257"
          x1="327"
          y1="124.5"
          x2="97.5"
          y2="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopOpacity="0.38" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Ellips;
