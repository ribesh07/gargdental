import { Geist, Geist_Mono } from "next/font/google";
import Toast from "@/components/Toast";
import { Toaster } from "react-hot-toast";
import FooterBar from "@/components/FooterBar";
import "./globals.css";
import HeaderBarNew from "@/components/HeaderBarNew";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Garg Dental",
  description: "Dental services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderBarNew />
        <div className="origin-top scale-[0.98] w-full">{children}</div>

        <FooterBar />
        <Toaster position="bottom-right" />
        <Toast />
      </body>
    </html>
  );
}
