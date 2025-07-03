"use client";
import { AlertTriangle, X } from "lucide-react";
import useWarningModalStore from "@/stores/warningModalStore";

const WarningModal = () => {
  const { isOpen, title, message, onOkay, close } = useWarningModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm">
      <div className="bg-[#f7b7b7] rounded-t-xl rounded-b-lg shadow-xl mx-auto">
        <div className="flex flex-col items-center p-6 pb-0">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#f7b7b7] mt-2">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
          <button onClick={close} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-white rounded-b-lg p-6 pt-4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2 text-center">{title || "Warning Title"}</h2>
          <p className="text-gray-600 mb-6 text-center">{message || "Warning Message"}</p>
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-8 py-2 rounded-full font-semibold"
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