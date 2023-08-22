import { create } from "zustand";

interface ModalState {
    isOpen: boolean;
    openModel: () => void;
    closeModel: () => void;
}

export const useModelStore = create<ModalState>()((set) => ({
    isOpen: false,
    openModel: () => set({ isOpen: true }),
    closeModel: () => set({ isOpen: false }),
}));
