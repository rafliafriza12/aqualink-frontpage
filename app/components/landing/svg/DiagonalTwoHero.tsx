const DiagonalTwoHero: React.FC = () => {
  return (
    <svg
      className="w-full h-auto"
      width="354"
      height="386"
      viewBox="0 0 354 386"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bagian Pertama */}
      <foreignObject x="-77.8543" y="41.3" width="419.709" height="384.4">
        <div
          style={{
            backdropFilter: "blur(39.35px)",
            clipPath: "url(#bgblur_0_8935_914_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="78.7"
        d="M67.0066 346L2 233.5L67.0066 121H197.007L262 233.5L197.007 346H67.0066Z"
        fill="url(#paint0_linear_8935_914)"
        fillOpacity="0.1"
        stroke="url(#paint1_linear_8935_914)"
        strokeWidth="2"
      />

      {/* Bagian Kedua */}
      <foreignObject x="130.146" y="161.3" width="418.709" height="384.4">
        <div
          style={{
            backdropFilter: "blur(39.35px)",
            clipPath: "url(#bgblur_1_8935_914_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="78.7"
        d="M274.757 466L210 353.5L274.757 241H404.257L469 353.5L404.257 466H274.757Z"
        fill="white"
        fillOpacity="0.1"
        stroke="#8990F2"
        strokeWidth="2"
      />

      {/* Bagian Ketiga */}
      <foreignObject x="129.146" y="-78.7" width="418.709" height="384.4">
        <div
          style={{
            backdropFilter: "blur(39.35px)",
            clipPath: "url(#bgblur_2_8935_914_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>
      <path
        data-figma-bg-blur-radius="78.7"
        d="M273.757 226L209 113.5L273.757 1H403.257L468 113.5L403.257 226H273.757Z"
        fill="url(#paint2_linear_8935_914)"
        fillOpacity="0.1"
        stroke="url(#paint3_linear_8935_914)"
        strokeWidth="2"
      />

      {/* Definisi */}
      <defs>
        <clipPath
          id="bgblur_0_8935_914_clip_path"
          transform="translate(77.8543 -41.3)"
        >
          <path d="M67.0066 346L2 233.5L67.0066 121H197.007L262 233.5L197.007 346H67.0066Z" />
        </clipPath>
        <clipPath
          id="bgblur_1_8935_914_clip_path"
          transform="translate(-130.146 -161.3)"
        >
          <path d="M274.757 466L210 353.5L274.757 241H404.257L469 353.5L404.257 466H274.757Z" />
        </clipPath>
        <clipPath
          id="bgblur_2_8935_914_clip_path"
          transform="translate(-129.146 78.7)"
        >
          <path d="M273.757 226L209 113.5L273.757 1H403.257L468 113.5L403.257 226H273.757Z" />
        </clipPath>

        <linearGradient
          id="paint0_linear_8935_914"
          x1="12.5"
          y1="160.5"
          x2="132"
          y2="346"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4851FC" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_8935_914"
          x1="27"
          y1="209"
          x2="132"
          y2="346"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8990F2" stopOpacity="0" />
          <stop offset="1" stopColor="#8990F2" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_8935_914"
          x1="209"
          y1="55"
          x2="339.098"
          y2="225.543"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4851FC" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_8935_914"
          x1="223"
          y1="96.5"
          x2="359.964"
          y2="86.5011"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8990F2" stopOpacity="0" />
          <stop offset="1" stopColor="#8990F2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default DiagonalTwoHero;
