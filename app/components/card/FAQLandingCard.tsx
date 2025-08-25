"use client";
import { IFAQCardProps } from "@/app/types/faq.types";
import { useState } from "react";
const FAQLandingCard: React.FC<IFAQCardProps> = ({ data }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <div className=" w-full flex flex-col items-center text-white">
      <div className="w-full flex items-center justify-between py-3 px-5 lg:py-6 lg:px-16 rounded-2xl bg-[#2E35B1]">
        <h1 className=" w-[70%] text-left font-montserrat text-sm md:text-lg lg:text-2xl font-semibold ">
          {data.question}
        </h1>
        <div
          onClick={() => setIsActive(!isActive)}
          className={` w-[70px] h-[35px] lg:w-[120px] lg:h-[60px] relative border-[2px] border-[#A7ACF6] rounded-lg  duration-500 cursor-pointer ${
            isActive
              ? "shadow-[inset_12px_3px_10px_rgba(0,0,0,0.25)] bg-[#272B71]"
              : "shadow-[inset_-12px_-2px_10px_rgba(0,0,0,0.25)] bg-[#9096F5]"
          }`}
        >
          <div
            className={`w-[50%] h-full absolute p-1 lg:p-3 bg-[#D9D9D9] rounded-md duration-500 transition-all  ${
              isActive ? "translate-x-[100%]" : "translate-x-0"
            }`}
          >
            <svg
              className=" w-full h-auto"
              viewBox="0 0 41 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.8744 10.5H32.4577V26.25H10.2493V29.75C10.2493 30.7125 11.0181 31.5 11.9577 31.5H30.7493L37.5827 38.5V12.25C37.5827 11.2875 36.8139 10.5 35.8744 10.5ZM29.041 21V5.25C29.041 4.2875 28.2723 3.5 27.3327 3.5H5.12435C4.18477 3.5 3.41602 4.2875 3.41602 5.25V29.75L10.2493 22.75H27.3327C28.2723 22.75 29.041 21.9625 29.041 21Z"
                fill="#171C71"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`w-[90%] md:w-[95%] ${
          isActive ? "h-[150px] p-5" : "h-0"
        } duration-500  backdrop-blur-[5px] bg-white/15 rounded-b-2xl overflow-hidden`}
      >
        <p
          className={`${
            isActive ? "opacity-[1]" : "opacity-0"
          } duration-500 text-[#fff] text-xs md:text-base lg:text-xl font-semibold font-montserrat`}
        >
          {data.answer}
        </p>
      </div>
    </div>
  );
};

export default FAQLandingCard;
