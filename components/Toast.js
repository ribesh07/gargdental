"use client";
import useToastStore from "@/stores/toastStore";

const Toast = () => {
  const toast = useToastStore((state) => state.toast);

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
        {toast}
      </div>
    </div>
  );
};

export default Toast;
