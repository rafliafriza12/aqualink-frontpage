import { SVGIconProps } from "@/app/types";
const TokenSVG: React.FC<SVGIconProps> = ({ size }) => {
  return (
    <svg
      width={size ?? 28}
      height={size ?? 28}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.70167 20.4987L14 25.667L23.2983 20.4987L17.3833 17.2203C16.5317 18.107 15.33 18.667 14 18.667C12.67 18.667 11.4683 18.107 10.6167 17.2203L4.70167 20.4987ZM16.3333 14.0003C16.3333 15.2837 15.2833 16.3337 14 16.3337C12.7167 16.3337 11.6667 15.2837 11.6667 14.0003C11.6667 12.717 12.7167 11.667 14 11.667C15.2833 11.667 16.3333 12.717 16.3333 14.0003ZM15.1667 2.98699L24.5 8.16699L24.5 18.5037L18.515 15.1787C18.62 14.8053 18.6667 14.4087 18.6667 14.0003C18.6667 11.8303 17.185 9.99866 15.1667 9.48533L15.1667 2.98699ZM12.8333 2.98699L12.8333 9.48533C10.815 9.99866 9.33333 11.8303 9.33333 14.0003C9.33333 14.4087 9.38 14.8053 9.485 15.1787L3.5 18.5037L3.5 8.16699L12.8333 2.98699Z"
        fill="#3640F0"
      />
    </svg>
  );
};

export default TokenSVG;
