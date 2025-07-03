import { create } from "zustand";

const useWarningModalStore = create((set) => ({
  isOpen: false,
  title: "",
  message: "",
  onOkay: null,
  open: (options) => set({ ...options, isOpen: true }),
  close: () => set({ isOpen: false, title: "", message: "", onOkay: null }),
}));

export default useWarningModalStore; 