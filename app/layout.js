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

  openGraph: {
    title: "Dental Nepal | Garg Dental - Total Dental Solution Provider",
    description:
      "Your trusted source for dental equipment and materials in Nepal. Explore quality, reliability, and innovation.",
    url: "https://www.dentalnepal.com",
    siteName: "Dental Nepal",
    images: [
      {
        url: "https://www.dentalnepal.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dental Nepal - Trusted Dental Supplier",
      },
    ],
    locale: "en_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Nepal | Garg Dental - Total Dental Solution Provider",
    description:
      "Buy top-quality dental tools and materials online in Nepal. Trusted by dentists across the country.",
    images: ["https://www.dentalnepal.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" />
        <link rel="sitemap" type="application/xml" href="https://www.dentalnepal.com/sitemap.xml" />
<link rel="robots" href="https://www.dentalnepal.com/robots.txt" />


        <link rel="canonical" href="https://www.dentalnepal.com" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Garg Dental Nepal" />
        <meta name="geo.region" content="NP" />
        <meta name="geo.placename" content="Kathmandu, Nepal" />
        <meta name="geo.position" content="27.7172;85.3240" />
        <meta name="ICBM" content="27.7172, 85.3240" />
        <meta name="google-site-verification" content="18gb-WHx3STw9vdNBb02jAvlH9HqYrePDKl-RkW5ipg" />

        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Garg Dental Nepal",
      url: "https://www.dentalnepal.com",
      logo: "https://www.dentalnepal.com/logo.ico",
      sameAs: [
        "https://www.facebook.com/gargdentalnepal",
        "https://www.instagram.com/gargdentalnepal",
        "https://www.linkedin.com/company/gargdentalnepal",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+977-9812345678",
        contactType: "customer service",
        areaServed: "NP",
        availableLanguage: ["English", "Nepali"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Putalisadak",
        addressLocality: "Kathmandu",
        addressRegion: "Bagmati",
        postalCode: "44600",
        addressCountry: "NP",
      },
    }),
  }}
/>

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
