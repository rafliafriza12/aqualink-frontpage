import { ISolution } from "../types/solution-card.types";
import RegisterIcon from "../components/landing/svg/monitoring-icon";
import PayIcon from "../components/landing/svg/PayIcon";
import ReportIcon from "../components/landing/svg/report-icon";
import AnalyticsIcon from "../components/landing/svg/analytics-icon";
export const solutions: ISolution[] = [
  {
    icon: RegisterIcon,
    title: "PENDAFTARAN & VERIFIKASI",
    description:
      "Proses pendaftaran digital yang mengubah cara konsumen mendaftar layanan PDAM dari rumah dengan verifikasi otomatis. Konsumen daftar online melalui aplikasi mobile Upload dokumen (KTP, bukti kepemilikan, foto rumah) Verifikasi OTP untuk keamanan PDAM melakukan verifikasi dokumen secara otomatis Status pendaftaran dapat dipantau real-time",
    style: " -translate-y-[58%] md:translate-x-[60%] lg:translate-x-[85%]",
  },
  {
    icon: PayIcon,
    title: "MONITORING & PEMBAYARAN",
    description:
      "Proses pendaftaran digital yang mengubah cara konsumen mendaftar layanan PDAM dari rumah dengan verifikasi otomatis. Konsumen daftar online melalui aplikasi mobile Upload dokumen (KTP, bukti kepemilikan, foto rumah) Verifikasi OTP untuk keamanan PDAM melakukan verifikasi dokumen secara otomatis Status pendaftaran dapat dipantau real-time",
    style: " -translate-y-[58%] md:translate-x-[20%] lg:translate-x-[30%]",
  },
  {
    icon: ReportIcon,
    title: "PENGADUAN & NOTIFIKASI",
    description:
      "Platform pengaduan berbasis lokasi dengan sistem notifikasi otomatis untuk respons cepat terhadap keluhan pelanggan. Konsumen laporkan masalah dengan foto dan lokasi GPS Kategorisasi otomatis jenis pengaduan PDAM terima notifikasi dan assign petugas lapangan Tracking status pengaduan real-time, notifikasi tagihan, pengingat jatuh tempo otomatis",
    style: " -translate-y-[58%] md:translate-x-[-25%] lg:translate-x-[-25%] ",
  },
  {
    icon: AnalyticsIcon,
    title: "ANALYTICS & LAPORAN",
    description:
      "Dashboard analitik komprehensif yang memberikan insight mendalam untuk pengambilan keputusan berbasis data. PDAM dapat visualisasi data penggunaan per area Deteksi anomali untuk identifikasi kebocoran/pencurian Laporan pendapatan otomatis (harian, mingguan, bulanan), Analisis pola pengaduan untuk perbaikan sistem, Dashboard manajemen pelanggan yang komprehensif",
    style: " -translate-y-[58%] md:translate-x-[-60%] lg:translate-x-[-85%]",
  },
];
