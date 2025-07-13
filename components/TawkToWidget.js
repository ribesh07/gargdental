"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/ApiSafeCalls";
import Link from "next/link";
export default function TawkToWidget() {
  // const whatsappNumber = ""; //raw data
  const [settings, setSettings] = useState({
    whatsapp: "",
  });
  useEffect(() => {
    const fetchSettings = async () => {
      const response = await apiRequest("/settings", false);
      if (response.success) {
        // setSettings(response.settings);
        const { whatsapp } = response.settings;
        console.log("Fetched settings:", whatsapp?.value);

        setSettings({
          whatsapp: whatsapp?.value || "",
        });
      } else {
        console.log("Failed to fetch settings:", response.message);
      }
    };
    fetchSettings();
  }, []);
  const message = "Hello! I'm interested in your products.";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center justify-center">
      <Link
        href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
          message
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 hover:scale-110 transform text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 animate-bounce"
      >
        {/* <MessageCircle className="w-5 h-5" /> */}
        <img src="/assets/whatsapp.svg" alt="WhatsApp" className="w-10 h-10" />
      </Link>
      <span className="text-[18px] text-gray-700 font-bold">Contact Us</span>
    </div>
  );
}

//tawk to widget
// export default function TawkToWidget() {
//   // const [isTawkOpen, setIsTawkOpen] = useState(false);

//   useEffect(() => {
//     var Tawk_API = Tawk_API || {},
//       Tawk_LoadStart = new Date();
//     const s1 = document.createElement("script");
//     s1.async = true;
//     s1.src = "https://embed.tawk.to/686bb0dca86aec190ca6b4f4/1ivialoc3";
//     s1.charset = "UTF-8";
//     s1.setAttribute("crossorigin", "*");
//     document.body.appendChild(s1);

//     return () => {
//       // Remove existing Tawk.to iframe when component unmounts
//       const tawkIframe = document.querySelector("iframe[src*='tawk.to']");
//       if (tawkIframe) {
//         tawkIframe.remove();
//       }
//     };
//   }, []);

//   return null;
// }
