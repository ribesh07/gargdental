"use client";
import { HelpCircle, X } from "lucide-react";
import useConfirmModalStore from "@/stores/confirmModalStore";

const ConfirmModal = () => {
  const { isOpen, title, message, onConfirm, onCancel, close } = useConfirmModalStore();

  if (!isOpen) return null;

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm">
      <div className="bg-[#7da3c7] rounded-t-xl rounded-b-lg shadow-xl mx-auto">
        <div className="flex flex-col items-center p-6 pb-0">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#7da3c7] mt-2">
            <HelpCircle className="w-16 h-16 text-white" />
          </div>
          <button onClick={close} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-white rounded-b-lg p-6 pt-4 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2 text-center">{title || "Confirm Title"}</h2>
          <p className="text-gray-600 mb-6 text-center">{message || "Confirm Message"}</p>
          <div className="flex gap-4 justify-center">
            <button
              className="bg-red-400 hover:bg-red-600 text-white px-8 py-2 rounded-full font-semibold"
              onClick={() => { onConfirm && onConfirm(); close(); }}
            >
              Okay
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-600 text-white px-8 py-2 rounded-full font-semibold"
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