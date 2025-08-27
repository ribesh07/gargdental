"use client";
import { useState } from "react";
import { Clock, X } from "lucide-react";

export default function MobileAppDownload() {
  const [showModal, setShowModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState("");

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStore("");
  };

  return (
    <div className="flex gap-2 justify-center sm:justify-start">
      {/* Google Play Button */}
      <button
        onClick={() => handleStoreClick("Google Play")}
        className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs transition-all cursor-pointer"
      >
        <svg viewBox="30 336.7 120.9 129.2" className="w-4 h-4">
          <path fill="#FFD400" d="M90.5 401.5L34.5 432c-1.5.9-3.4.9-4.9 0-1.5-.9-2.5-2.5-2.5-4.2v-83.6c0-1.7 1-3.3 2.5-4.2 1.5-.9 3.4-.9 4.9 0l56 30.5 28.6 15.6-28.6 15.4z"/>
          <path fill="#FF3333" d="M90.5 401.5L61.9 386.1 90.5 370.7l28.6 15.6-28.6 15.2z"/>
          <path fill="#48FF48" d="M34.5 432c-1.5-.9-2.5-2.5-2.5-4.2v-83.6c0-1.7 1-3.3 2.5-4.2l56 30.5-56 61.5z"/>
          <path fill="#3BCCFF" d="M90.5 401.5L34.5 432l56-61.5 28.6 15.6-28.6 15.4z"/>
        </svg>
        <span className="typewriter">Google Play</span>
      </button>

      {/* Apple Store Button */}
      <button
        onClick={() => handleStoreClick("Apple Store")}
        className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs transition-all cursor-pointer"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <span className="typewriter">Apple Store</span>
      </button>

      {/* Coming Soon Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <div className="text-center">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-white animate-spin" />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Coming Soon!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Our {selectedStore} app is under development. Stay tuned for the
                launch 🚀
              </p>

              <button
                onClick={closeModal}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Typewriter CSS */}
      <style jsx>{`
        .typewriter {
          display: inline-block;
          overflow: hidden;
          border-right: 2px solid white;
          white-space: nowrap;
          animation: typing 2s steps(12) infinite alternate, blink 0.7s step-end infinite;
        }
        @keyframes typing {
          0% { width: 0; }
          50% { width: 100%; }
          100% { width: 0; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
      `}</style>
    </div>
  );
}
