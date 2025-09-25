import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProviderLayout from "./layouts/ProviderLayout";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Flowin - Digitalisasi Pengelolaan Air PDAM Tirta Daroy",
    template: "%s | Flowin",
  },
  description:
    "Platform digitalisasi pengelolaan air hasil kolaborasi Flowin Technologies dengan PDAM Tirta Daroy. Pencatatan meteran digital, pembayaran online, monitoring penggunaan air real-time, dan pendaftaran pelanggan online.",
  keywords: [
    // Brand Keywords
    "Flowin",
    "Aqualink",
    "Flowin Technologies",
    "Aqualink platform",
    "Flowin app",
    "Aqualink system",
    "Flowin water management",
    "Aqualink digital solution",

    // Core Business Keywords
    "PDAM",
    "PERUMDAM",
    "PDAM Tirta Daroy",
    "PERUMDAM Aceh",
    "PERUMDAM Tirta Daroy",
    "digitalisasi PDAM",
    "digitalisasi PERUMDAM",
    "sistem informasi PDAM",
    "sistem informasi PERUMDAM",
    "transformasi digital PDAM",
    "transformasi digital PERUMDAM",

    // Water Management Keywords
    "pencatatan meteran air digital",
    "pembayaran air online",
    "monitoring penggunaan air",
    "pengelolaan air digital",
    "meteran air otomatis",
    "smart water meter",
    "IoT water monitoring",
    "water management system",

    // Service Keywords
    "pendaftaran PDAM online",
    "pendaftaran PERUMDAM online",
    "billing PDAM online",
    "billing PERUMDAM online",
    "customer service PDAM digital",
    "customer service PERUMDAM digital",
    "tagihan air online",
    "bayar air digital",
    "registrasi pelanggan PDAM",
    "registrasi pelanggan PERUMDAM",
    "layanan pelanggan PDAM",
    "layanan pelanggan PERUMDAM",

    // Technology Keywords
    "aplikasi PDAM",
    "aplikasi PERUMDAM",
    "platform digital PDAM",
    "platform digital PERUMDAM",
    "software pengelolaan air",
    "sistem billing air",
    "automasi PDAM",
    "automasi PERUMDAM",
    "digital water solutions",
    "water utility software",
    "Flowin platform",
    "Aqualink software",
    "Flowin digital platform",
    "Aqualink water utility",

    // Local/Regional Keywords
    "PDAM Aceh",
    "air bersih Aceh",
    "pelayanan air Tirta Daroy",
    "water services Aceh",

    // Industry Keywords
    "utilitas air",
    "perusahaan air minum",
    "water utility management",
    "municipal water services",
    "public water company",
    "water distribution system",

    // Innovation Keywords
    "inovasi PDAM",
    "inovasi PERUMDAM",
    "teknologi air bersih",
    "solusi digital air",
    "modernisasi PDAM",
    "modernisasi PERUMDAM",
    "efisiensi pengelolaan air",
    "optimalisasi layanan PDAM",
    "optimalisasi layanan PERUMDAM",
    "Flowin innovation",
    "Aqualink technology",
    "Flowin solutions",
    "Aqualink services",

    // Partnership Keywords
    "Flowin PDAM partnership",
    "Flowin PERUMDAM partnership",
    "Aqualink Tirta Daroy",
    "Aqualink PERUMDAM Tirta Daroy",
    "Flowin collaboration",
    "digital transformation partner",
    "water technology partner",
  ],
  authors: [{ name: "Flowin Technologies" }],
  creator: "Flowin Technologies",
  publisher: "Flowin Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aqualink.site"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://aqualink.site",
    title: "Flowin - Digitalisasi Pengelolaan Air PDAM Tirta Daroy",
    description:
      "Platform digitalisasi pengelolaan air hasil kolaborasi Flowin Technologies dengan PDAM Tirta Daroy. Pencatatan meteran digital, pembayaran online, monitoring penggunaan air real-time, dan pendaftaran pelanggan online.",
    siteName: "Flowin",
    images: [
      {
        url: "/assets/logo/Aqualink_2.png",
        width: 1200,
        height: 630,
        alt: "Flowin - Digitalisasi Pengelolaan Air PDAM Tirta Daroy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flowin - Digitalisasi Pengelolaan Air PDAM Tirta Daroy",
    description:
      "Platform digitalisasi pengelolaan air hasil kolaborasi Flowin Technologies dengan PDAM Tirta Daroy. Pencatatan meteran digital, pembayaran online, monitoring penggunaan air real-time, dan pendaftaran pelanggan online.",
    images: ["/assets/logo/Aqualink_2.png"],
    creator: "@flowin_tech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/logo/Aqualink_2.png",
    shortcut: "/assets/logo/Aqualink_2.png",
    apple: "/assets/logo/Aqualink_2.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/assets/logo/Aqualink_2.png",
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta
          name="google-site-verification"
          content="1WtH-OLRS9_BjPrjwFvjhEmsbkLYXW37xA3kt7MYcAI"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Head>
          <meta
            name="google-site-verification"
            content="1WtH-OLRS9_BjPrjwFvjhEmsbkLYXW37xA3kt7MYcAI"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
