import { create } from "zustand";

const useInfoModalStore = create((set) => ({
  isOpen: false,
  title: "",
  message: "",
  onOkay: null,
  open: (options) => set({ ...options, isOpen: true }),
  close: () => set({ isOpen: false, title: "", message: "", onOkay: null }),
}));

export default useInfoModalStore; 