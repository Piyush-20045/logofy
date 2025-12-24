import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CreateFormData {
  title?: string;
  desc?: string;
  palette?: string;
  design?: {
    image: string;
    prompt: string;
    title: string;
  };
}

interface StoreState {
  step: number;
  incStep: (step: number) => void;
  decStep: (step: number) => void;
  clearStep: () => void;
  formData: CreateFormData;
  setFormData: (field: string, value: string | object) => void;
  clearFormData: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      step: 1,
      incStep: () => set((state) => ({ step: state.step + 1 })),
      decStep: () => set((state) => ({ step: state.step - 1 })),
      clearStep: () => set({ step: 1 }),
      formData: {},
      setFormData: (field: string, value: string | object) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),
      clearFormData: () => set({ formData: {} }),
    }),
    {
      name: "formData",
      partialize: (state) => ({
        formData: state.formData,
      }),
    }
  )
);
