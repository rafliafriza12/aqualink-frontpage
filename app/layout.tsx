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
  title: "AquaLink",
  description: "Kredit Air dan Konservasi",
  icons: {
    icon: "/assets/logo/Aqualink_2.png",
    shortcut: "/assets/logo/Aqualink_2.png",
    apple: "/assets/logo/Aqualink_2.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/assets/logo/Aqualink_2.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>
        <ProviderLayout>{children}</ProviderLayout>
      </body>
    </html>
  );
}
