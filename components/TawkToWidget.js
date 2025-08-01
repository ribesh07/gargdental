"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/ApiSafeCalls";

export default function TawkToWidget() {
  const [settings, setSettings] = useState({
    whatsapp: "",
    viber: "",
  });

  const [showSelection, setShowSelection] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await apiRequest("/settings", false);
      if (response.success) {
        const { whatsapp, viber } = response.settings;
        console.log("Fetched settings:", whatsapp?.value, viber?.value);
        setSettings({
          whatsapp: whatsapp?.value || "",
          viber: viber?.value || "",
        });
      } else {
        console.log("Failed to fetch settings:", response.message);
      }
    };
    fetchSettings();
  }, []);

  const message = "Hello! I'm interested in your products.";

  const handleChatIconClick = (e) => {
    e.preventDefault();
    console.log("Chat icon clicked");
    setShowSelection(true); // only show popup, no redirect
  };

  const handleWhatsAppClick = () => {
    if (settings.whatsapp) {
      window.open(
        `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );
      setShowSelection(false);
    }
  };

  const handleViberClick = () => {
    if (settings.viber) {
      window.open(
        `viber://chat?number=${settings.viber}&text=${encodeURIComponent(message)}`,
        "_blank",
        "noopener,noreferrer"
      );
      setShowSelection(false);
    }
  };

  const closeSelection = () => {
    setShowSelection(false);
  };

  return (
    <>
      {/* Chat Icon */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center justify-center">
        <button
          onClick={handleChatIconClick}
          className="hover:scale-110 transform text-white p-3 rounded-full flex items-center justify-center transition-all duration-300 animate-bounce"
        >
          <img
            src="/assets/chatboticon.webp"
            alt="ChatApp"
            className="w-16 h-16 pointer-events-none"
          />
        </button>
        <span className="text-[18px] text-gray-700 font-bold">Contact Us</span>
      </div>

      {/* Selection Modal */}
      {showSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Choose Platform</h3>
              <button
                onClick={closeSelection}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {settings.whatsapp && (
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    {/* WhatsApp SVG */}
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382...z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800">WhatsApp</div>
                    <div className="text-sm text-gray-600">Chat via WhatsApp</div>
                  </div>
                </button>
              )}

              {settings.viber && (
                <button
                  onClick={handleViberClick}
                  className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    {/* Viber SVG */}
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.398.002...z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-800">Viber</div>
                    <div className="text-sm text-gray-600">Chat via Viber</div>
                  </div>
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Choose your preferred messaging platform</p>
            </div>
          </div>
        </div>
      )}
    </>
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
