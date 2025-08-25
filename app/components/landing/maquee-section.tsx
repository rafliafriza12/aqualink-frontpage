import Marquee from "react-fast-marquee";
interface IMarqueeSectionProps {
  emblemActive?: boolean;
  direction: string;
}
const MarqueeSection: React.FC<IMarqueeSectionProps> = ({
  emblemActive = true,
  direction,
}) => {
  return (
    <div className=" w-full bg-gradient-to-r from-[#1E2272] to-[#3940D8] py-3 md:py-7 lg:py-10 relative z-0 text-white">
      <Marquee
        direction={direction === "left" ? "left" : "right"}
        className="w-full overflow-hidden"
      >
        {Array.from({ length: 20 }).map((data: any, i: number) => {
          return (
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-nasalization ml-5">
              FLOWIN
            </h1>
          );
        })}
      </Marquee>

      {emblemActive && (
        <div className=" absolute z-[5] left-[50%] translate-x-[-50%] -bottom-[60%] bg-[#A7B1FF] rounded-full w-[70px] h-[70px] md:w-[120px] md:h-[120px] lg:w-[150px] lg:h-[150px] p-2 md:p-4 lg:p-5">
          <div className="w-full h-full rounded-full bg-[#1D266D] flex justify-center items-center">
            <svg
              className=" w-full h-auto mt-2"
              viewBox="0 0 171 156"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dddddd_8890_963)">
                <path
                  d="M85.4971 98.2588C84.789 98.2587 84.1131 97.9778 83.6934 97.4541L83.6133 97.3457L58.4883 61.0537C58.2526 60.7096 58.1145 60.3079 58.0898 59.8916C58.0651 59.4746 58.1546 59.0584 58.3486 58.6885C58.5427 58.3186 58.8343 58.0087 59.1914 57.792C59.5485 57.5753 59.9583 57.4594 60.376 57.458H110.625C111.043 57.4574 111.454 57.5718 111.812 57.7881C112.171 58.0043 112.462 58.315 112.656 58.6855C112.85 59.056 112.939 59.4723 112.913 59.8896C112.89 60.255 112.781 60.609 112.594 60.9219L112.509 61.0537L87.3838 97.3457C86.9719 97.939 86.2523 98.2588 85.4971 98.2588ZM85.9111 91.4219L105.709 62.8262L106.253 62.042H64.7471L65.29 62.8262L85.0889 91.4219L85.5 92.0156L85.9111 91.4219Z"
                  fill="#A7B1FF"
                  stroke="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dddddd_8890_963"
                  x="-4.7"
                  y="-13.7"
                  width="180.4"
                  height="180.4"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="0.675" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.662745 0 0 0 0 0.701961 0 0 0 0 1 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_8890_963"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="1.35" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.662745 0 0 0 0 0.701961 0 0 0 0 1 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_8890_963"
                    result="effect2_dropShadow_8890_963"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="4.725" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.662745 0 0 0 0 0.701961 0 0 0 0 1 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect2_dropShadow_8890_963"
                    result="effect3_dropShadow_8890_963"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="9.45" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.662745 0 0 0 0 0.701961 0 0 0 0 1 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect3_dropShadow_8890_963"
                    result="effect4_dropShadow_8890_963"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="16.2" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.662745 0 0 0 0 0.701961 0 0 0 0 1 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect4_dropShadow_8890_963"
                    result="effect5_dropShadow_8890_963"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="28.35" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.662745 0 0 0 0 0.701961 0 0 0 0 1 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect5_dropShadow_8890_963"
                    result="effect6_dropShadow_8890_963"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect6_dropShadow_8890_963"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarqueeSection;
