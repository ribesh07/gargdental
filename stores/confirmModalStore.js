import { create } from "zustand";

const useConfirmModalStore = create((set) => ({
  isOpen: false,
  title: "",
  message: "",
  onConfirm: null,
  onCancel: null,
  open: (options) => set({ ...options, isOpen: true }),
  close: () => set({ isOpen: false, title: "", message: "", onConfirm: null, onCancel: null }),
}));

export default useConfirmModalStore; 