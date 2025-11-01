import { create } from "zustand";

interface StoreState {
  step: number;
  incStep: (step: number) => void;
  decStep: (step: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  step: 1,
  incStep: () => set((state) => ({ step: state.step + 1 })),
  decStep: () => set((state) => ({ step: state.step - 1 })),
}));
