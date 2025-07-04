"use client";
import { AlertTriangle, X } from "lucide-react";
import useWarningModalStore from "@/stores/warningModalStore";

const WarningModal = () => {
  const { isOpen, title, message, onOkay, close } = useWarningModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-2">
      <div className="bg-[#f7b7b7] rounded-t-xl rounded-b-lg shadow-xl mx-auto max-w-xs sm:max-w-sm w-full">
        <div className="flex flex-col items-center p-4 sm:p-6 pb-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-[#f7b7b7] mt-2">
            <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
          <button onClick={close} className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="bg-white rounded-b-lg p-4 sm:p-6 pt-3 sm:pt-4 flex flex-col items-center">
          <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-center">{title || "Warning Title"}</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">{message || "Warning Message"}</p>
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-6 sm:px-8 py-2 rounded-full font-semibold text-base sm:text-lg"
            onClick={() => { onOkay && onOkay(); close(); }}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};
export default WarningModal; 