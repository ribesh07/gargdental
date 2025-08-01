"use client";
import { HelpCircle, X } from "lucide-react";
import useConfirmModalStore from "@/stores/confirmModalStore";

const ConfirmModal = () => {
  const { isOpen, title, message, onConfirm, onCancel, close } = useConfirmModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-2">
      <div className="bg-[#7da3c7] rounded-t-xl rounded-b-lg shadow-xl mx-auto max-w-xs sm:max-w-sm w-full">
        <div className="flex flex-col items-center p-4 sm:p-6 pb-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-[#7da3c7] mt-2">
            <HelpCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
          </div>
          <button onClick={close} className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="bg-gray-50 rounded-b-lg p-4 sm:p-6 pt-3 sm:pt-4 flex flex-col items-center">
          <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-center">{title || "Confirm Title"}</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-center text-sm sm:text-base">{message || "Confirm Message"}</p>
          <div className="flex gap-2 sm:gap-4 justify-center">
            <button
              className="bg-red-400 hover:bg-red-600 text-white px-6 sm:px-8 py-2 rounded-full font-semibold text-base sm:text-lg cursor-pointer"
              onClick={() => { onConfirm && onConfirm(); close(); }}
            >
              Okay
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-600 text-white px-6 sm:px-8 py-2 rounded-full font-semibold text-base sm:text-lg cursor-pointer"
              onClick={() => { onCancel && onCancel(); close(); }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal; 