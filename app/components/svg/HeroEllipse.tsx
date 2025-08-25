const HeroEllipse: React.FC = () => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1440 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_8890_1001)">
        <ellipse
          cx="1324.5"
          cy="1328.5"
          rx="1324.5"
          ry="912.5"
          fill="url(#paint0_linear_8890_1001)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_8890_1001"
          x="-436"
          y="-20"
          width="3521"
          height="2697"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="218"
            result="effect1_foregroundBlur_8890_1001"
          />
        </filter>
        <linearGradient
          id="paint0_linear_8890_1001"
          x1="1324.5"
          y1="416"
          x2="1324.72"
          y2="1973.05"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.75357" stop-color="#4952FE" />
          <stop offset="1" stop-color="#B76BC6" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HeroEllipse;
