// "use client";
// import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Toast from "@/components/Toast";
import { Toaster } from "react-hot-toast";
import FooterBar from "@/components/FooterBar";
import "./globals.css";
import HeaderBarNew from "@/components/HeaderBarNew";
import TawkToWidget from "@/components/TawkToWidget";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import ClientLayout from "./ClientLayout";
// import { useProductStore } from "@/stores/InitdataFetch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Garg Dental - Total Solution Provider",
  description:
    "Buy high-quality dental products and equipment online. Trusted by dentists and dental professionals across Nepal.",
  keywords: [
    "dental products",
    "dental tools",
    "oral care",
    "dental equipment Nepal",
    "dental clinic supplies",
    "tooth care products",
    "dentist store online",
    "buy dental instruments",
    "Garg Dental",
    "dental implants Nepal",
    "teeth whitening kits",
    "Invisalign accessories",
    "orthodontic supplies",
    "dental instruments wholesale",
    "emergency dental tools",
    "dentist chair equipment",
    "dental consumables",
    "best dental supplier Nepal",
    "dental products",
    "dental tools",
    "oral care",
    "dental equipment Nepal",
    "dental clinic supplies",
    "tooth care products",
    "dentist store online",
    "buy dental instruments",
    "Garg Dental",
    "dental implants Nepal",
    "teeth whitening kits",
    "Invisalign accessories",
    "orthodontic supplies",
    "dental instruments wholesale",
    "emergency dental tools",
    "dentist chair equipment",
    "dental consumables",
    "best dental supplier Nepal",

    // Additional e-commerce & local SEO keywords
    "buy dental products online Nepal",
    "dental material suppliers Nepal",
    "best dental tools for clinics",
    "affordable dental supplies Nepal",
    "dental chair suppliers Nepal",
    "dental x-ray machine Nepal",
    "endodontic instruments Nepal",
    "dental burs and handpieces",
    "sterilization equipment for dentists",
    "dental suction unit suppliers",
    "online dental marketplace Nepal",
    "dental PPE kits online",
    "surgical dental instruments Nepal",
    "orthodontic brackets and wires",
    "dental scaler and curettes",
    "buy dental cements online",
    "high speed dental handpiece Nepal",
    "composite filling kits online",
    "dental exam gloves Nepal",
    "top dental brands Nepal",
  ],
  icons: {
    icon: "logo.ico",
  },
};

export default function RootLayout({ children }) {

   

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" />
       
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <HeaderBarNew />
           <ClientLayout>{children}</ClientLayout>
     
        <CookieConsentBanner />
        <FooterBar />
        <TawkToWidget />
        <Toaster position="top-right" />
        <Toast />
      </body>
    </html>
  );
}
