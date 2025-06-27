"use client";
export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full slow-spin"></div>
    </div>
  );
}
