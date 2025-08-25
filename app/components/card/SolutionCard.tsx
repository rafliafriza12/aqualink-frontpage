import { ISolutionCardProps } from "@/app/types/solution-card.types";

const SolutionCard: React.FC<ISolutionCardProps> = ({
  data,
  isActive = true,
}) => {
  return (
    <svg
      className="w-full h-auto"
      viewBox="0 0 1015 1099"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blur layer 1 */}
      <foreignObject x="0.2" y="1.2" width="1014.6" height="1096.6">
        <div
          style={{
            backdropFilter: "blur(7.65px)",
            clipPath: "url(#bgblur_0_8979_912_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>

      {/* Background with gradient */}
      <g data-figma-bg-blur-radius="15.3">
        {/* Gradient */}
        <path
          d="M219.261 17L16 232.987V1062C16 1073.05 
             24.9543 1082 36 1082H819.782L999 865.929V37
             C999 25.9543 990.046 17 979 17H219.261Z"
          fill="url(#paint0_linear_8979_912)"
        />
        {/* Overlay tipis supaya ada efek frosted */}
        <path
          d="M219.261 17L16 232.987V1062C16 1073.05 
             24.9543 1082 36 1082H819.782L999 865.929V37
             C999 25.9543 990.046 17 979 17H219.261Z"
          fill="white"
          fillOpacity="0.05"
        />
        {/* Border */}
        <path
          d="M219.261 17L16 232.987V1062C16 1073.05 
             24.9543 1082 36 1082H819.782L999 865.929V37
             C999 25.9543 990.046 17 979 17H219.261Z"
          stroke="#B5BAFF"
        />
      </g>

      {/* Blur layer 2 */}
      <foreignObject x="-39.1" y="-39.1" width="1093.2" height="1177.2">
        <div
          style={{
            backdropFilter: "blur(19.55px)",
            clipPath: "url(#bgblur_1_8979_912_clip_path)",
            height: "100%",
            width: "100%",
          }}
        />
      </foreignObject>

      {/* Outer border */}
      <path
        data-figma-bg-blur-radius="39.1"
        d="M211.05 2L2 224.071V1077C2 1088.05 
           10.9543 1097 22 1097H828.677L1013 874.843V22
           C1013 10.9543 1004.05 2 993 2H211.05Z"
        stroke="#B5BAFF"
        strokeWidth="4"
      />

      {/* Defs */}
      <defs>
        <clipPath
          id="bgblur_0_8979_912_clip_path"
          transform="translate(-0.2 -1.2)"
        >
          <path
            d="M219.261 17L16 232.987V1062C16 1073.05 
                   24.9543 1082 36 1082H819.782L999 865.929V37
                   C999 25.9543 990.046 17 979 17H219.261Z"
          />
        </clipPath>
        <clipPath
          id="bgblur_1_8979_912_clip_path"
          transform="translate(39.1 39.1)"
        >
          <path
            d="M211.05 2L2 224.071V1077C2 1088.05 
                   10.9543 1097 22 1097H828.677L1013 874.843V22
                   C1013 10.9543 1004.05 2 993 2H211.05Z"
          />
        </clipPath>
        <linearGradient
          id="paint0_linear_8979_912"
          x1="508"
          y1="0"
          x2="508"
          y2="1099"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5b62b1" />
          <stop offset="1" stopColor="#121562" />
        </linearGradient>
      </defs>

      {/* Content */}
      <foreignObject x="0" y="0" width="1015" height="1099">
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-12 gap-10">
          {/* ICON */}
          <div className="w-[40%]">
            <data.icon isActive={isActive} />
          </div>

          {/* TEXT + DESCRIPTION */}
          <div className={`transition-all duration-700 ease-in-out transform`}>
            <h2
              className={`w-full text-left font-semibold font-nasalization text-[60px] text-white pr-10  ${
                isActive ? "text-white" : "text-white/50"
              }`}
            >
              {data.title}
            </h2>
            <p
              className={`w-full text-left mt-2 font-montserrat font-bold pr-10 text-3xl md:text-3xl lg:text-2xl text-white/50 lg:text-white/90 duration-500 ${
                isActive ? "opacity-100 " : "opacity-0 "
              }`}
            >
              {data.description}
            </p>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

export default SolutionCard;
