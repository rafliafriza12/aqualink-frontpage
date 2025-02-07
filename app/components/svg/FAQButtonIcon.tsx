interface FAQButtonIconProps {
  color?: string;
}
const FAQButtonIcon: React.FC<FAQButtonIconProps> = ({ color }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_8079_646)">
        <rect x="4" width="40" height="40" rx="20" fill={color ?? "#414BF1"} />
        <rect x="4.5" y="0.5" width="39" height="39" rx="19.5" stroke="white" />
      </g>
      <g clip-path="url(#clip0_8079_646)" filter="url(#filter1_d_8079_646)">
        <path
          d="M28.4664 13.3888L18.1957 13.3888L18.1957 10.9967H32.5504L32.5504 12.1927L32.5504 25.3513L30.1582 25.3513L30.1582 15.0806L16.4786 28.7602L14.7868 27.0685L28.4664 13.3888Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_8079_646"
          x="0"
          y="0"
          width="48"
          height="48"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_8079_646"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8079_646"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_8079_646"
          x="3.17383"
          y="2.5376"
          width="41.8359"
          height="41.8354"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_8079_646"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_8079_646"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_8079_646">
          <rect
            width="23.9252"
            height="23.9252"
            fill="white"
            transform="translate(24.0918 2.5376) rotate(45)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FAQButtonIcon;
