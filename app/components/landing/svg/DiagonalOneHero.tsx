const DiagonalOneHero: React.FC = () => {
  return (
    <svg
      className="w-full h-auto"
      viewBox="0 0 467 275"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bagian Pertama */}
      <path
        d="M-9.8584 -69.5L54.2676 41.5L-9.8584 152.5H-138.128L-202.269 41.5L-138.128 -69.5H-9.8584Z"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="3"
      />
      <foreignObject x="-78.8543" y="-30.7" width="418.709" height="384.4">
        <div
          style={{
            backdropFilter: "blur(39.35px)",
            clipPath: "url(#bgblur_0_8935_912_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>

      {/* Bagian Kedua */}
      <path
        data-figma-bg-blur-radius="78.7"
        d="M65.7566 274L1 161.5L65.7566 49H195.257L260 161.5L195.257 274H65.7566Z"
        fill="url(#paint0_linear_8935_912)"
        fillOpacity="0.1"
        stroke="url(#paint1_linear_8935_912)"
        strokeWidth="2"
      />
      <foreignObject x="-78.8543" y="-270.7" width="418.709" height="384.4">
        <div
          style={{
            backdropFilter: "blur(39.35px)",
            clipPath: "url(#bgblur_1_8935_912_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>

      {/* Bagian Ketiga */}
      <path
        data-figma-bg-blur-radius="78.7"
        d="M65.7566 34L1 -78.5L65.7566 -191H195.257L260 -78.5L195.257 34H65.7566Z"
        fill="white"
        fillOpacity="0.1"
        stroke="#8990F2"
        strokeWidth="2"
      />
      <foreignObject x="126.146" y="-150.7" width="418.709" height="384.4">
        <div
          style={{
            backdropFilter: "blur(39.35px)",
            clipPath: "url(#bgblur_2_8935_912_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>

      {/* Bagian Keempat */}
      <path
        data-figma-bg-blur-radius="78.7"
        d="M270.757 154L206 41.5L270.757 -71H400.257L465 41.5L400.257 154H270.757Z"
        fill="url(#paint2_linear_8935_912)"
        fillOpacity="0.1"
        stroke="url(#paint3_linear_8935_912)"
        strokeWidth="2"
      />

      {/* Definisi */}
      <defs>
        <clipPath
          id="bgblur_0_8935_912_clip_path"
          transform="translate(78.8543 30.7)"
        >
          <path d="M65.7566 274L1 161.5L65.7566 49H195.257L260 161.5L195.257 274H65.7566Z" />
        </clipPath>
        <clipPath
          id="bgblur_1_8935_912_clip_path"
          transform="translate(78.8543 270.7)"
        >
          <path d="M65.7566 34L1 -78.5L65.7566 -191H195.257L260 -78.5L195.257 34H65.7566Z" />
        </clipPath>
        <clipPath
          id="bgblur_2_8935_912_clip_path"
          transform="translate(-126.146 150.7)"
        >
          <path d="M270.757 154L206 41.5L270.757 -71H400.257L465 41.5L400.257 154H270.757Z" />
        </clipPath>

        <linearGradient
          id="paint0_linear_8935_912"
          x1="130.5"
          y1="49"
          x2="235.5"
          y2="181"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#1E2273" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_8935_912"
          x1="100.5"
          y1="37.5"
          x2="168"
          y2="221.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8990F2" />
          <stop offset="1" stopColor="#1E2373" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_8935_912"
          x1="335.5"
          y1="-71"
          x2="335.5"
          y2="154"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#1E2273" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_8935_912"
          x1="277.775"
          y1="-2.13609"
          x2="306.225"
          y2="138.636"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8990F2" />
          <stop offset="1" stopColor="#1E2373" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DiagonalOneHero;
