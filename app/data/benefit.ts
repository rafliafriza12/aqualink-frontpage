import { IBenefit } from "../types/benefit-card.types";

export const benefits: IBenefit[] = [
  {
    category: "PDAM",
    benefits: [
      "Pendapatan +40%",
      "Efisiensi +95%",
      "Akurasi Data 99%",
      "Respons Cepat",
      "Analitik Mendalam",
    ],
    style:
      "[transform:rotateY(35deg)_rotateX(10deg)_scale(1.15)] lg:group-hover:[transform:rotateY(0deg)_rotateX(0deg)_scale(1)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_scale(0.98)]",
  },
  {
    category: "USER",
    benefits: [
      "Hemat Waktu 75%",
      "Hemat Biaya 30%",
      "Akses 24/7",
      "Notifikasi Real-time",
      "Pembayaran Mudah",
    ],
    style:
      "[transform:rotateY(-30deg)_rotateX(10deg)_scale(1.1)] lg:group-hover:[transform:rotateY(0deg)_rotateX(0deg)_scale(1)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_scale(0.98)]",
  },
];
