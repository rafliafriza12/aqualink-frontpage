"use client";
import { useAuth } from "@/app/hooks/UseAuth";
import { IsDesktop } from "@/app/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderMobile from "@/app/components/headers/HeaderMobile";
import FAQCard from "@/app/components/card/FAQCard";
const FAQ: React.FC = () => {
  const auth = useAuth();
  const isDesktop = IsDesktop();
  const navigation = useRouter();

  const FAQList: any = [
    {
      order: 1,
      question: "Apa itu AquaLink dan apa tujuannya ?",
      answer:
        "AquaLink adalah platform berbasis blockchain yang dirancang untuk memfasilitasi perdagangan kredit air, memberikan insentif konservasi, dan mendukung pengelolaan air yang efisien. Tujuannya adalah mengatasi kelangkaan air dengan menciptakan sistem yang adil, transparan, dan dinamis.",
    },
    {
      order: 2,
      question: "Bagaimana perdagangan kredit air  bekerja di AquaLink ?",
      answer:
        "Pengguna yang menghemat air dapat menjual kredit mereka melalui platform, sementara yang membutuhkan lebih banyak air dapat membeli kredit tersebut. Harga kredit ditentukan oleh mekanisme penawaran dan permintaan.",
    },
    {
      order: 3,
      question: "Apa manfaat AquaLink bagi pengguna besar, dan individu ?",
      answer:
        "Pengguna besar (industri/pertanian): Menjual kelebihan alokasi air atau membeli sesuai kebutuhan. Individu/bisnis kecil: Mendapat token insentif untuk konservasi air yang diverifikasi.",
    },
    {
      order: 4,
      question: "Bagaimana AquaLink memastikan transparansi dan keamanan ?",
      answer:
        "Semua transaksi dicatat di blockchain yang dapat diaudit, menggunakan smart contracts untuk memastikan kepatuhan. Platform ini juga memiliki protokol keamanan tinggi untuk melindungi data pengguna.",
    },
    {
      order: 5,
      question: "Bagaimana saya bisa mulai menggunakan AquaLink ?",
      answer:
        "Kunjungi situs resmi AquaLink, buat akun sesuai kategori pengguna Anda, dan ikuti panduan untuk mulai memanfaatkan fitur perdagangan kredit air dan insentif konservasi.",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 font-poppins">
      <HeaderMobile mode="dark" />
      <div>
        <h1 className=" font-inter font-medium text-[10px] text-[#060620]/50">
          Temukan jawaban cepat untuk pertanyaan umum di sini
        </h1>
      </div>
      {FAQList.map((faq: any, i: number) => {
        return (
          <FAQCard
            order={faq.order}
            question={faq.question}
            answer={faq.answer}
          />
        );
      })}
    </div>
  );
};

export default FAQ;
