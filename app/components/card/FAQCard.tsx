"use client";
import FAQButtonIcon from "../svg/FAQButtonIcon";
import { useState } from "react";
interface FAQProps {
  order: number;
  question: string;
  answer: string;
}
const FAQCard: React.FC<FAQProps> = ({ order, question, answer }) => {
  const [indexIconActive, setIndexIconActive] = useState<number | null>(null);

  const handleClick = (i: number) => {
    indexIconActive !== null ? setIndexIconActive(null) : setIndexIconActive(i);
  };

  return (
    <div className="w-full border-[1px] border-[#414BF1] rounded-2xl p-2 flex flex-col gap-2">
      <div className=" w-full flex justify-end items-center relative z-0">
        <div className=" py-5 px-5 rounded-xl bg-[#B7BBFB] font-montserrat font-extrabold text-[30px] text-[#414BF1] absolute z-[-2] w-[20%] left-0">
          {order}.
        </div>
        <div className=" w-[85%] p-3 py-6 bg-[#414BF1] rounded-xl flex justify-between items-center">
          <h1 className=" text-left w-[80%] font-montserrat font-bold text-[15px] text-white">
            {question}
          </h1>
          <button
            onClick={() => handleClick(order)}
            className={`${
              order === indexIconActive ? "rotate-[135deg]" : ""
            } duration-300`}
          >
            <FAQButtonIcon
              color={order === indexIconActive ? "#303476" : "#414BF1"}
            />
          </button>
        </div>
      </div>
      <div className=" w-full flex justify-end">
        <div
          className={`w-[85%] duration-500 ${
            order === indexIconActive ? "h-auto py-2" : "h-0"
          } overflow-hidden`}
        >
          <p className=" w-full text-left font-inter text-sm text-[#060620]/60">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQCard;
