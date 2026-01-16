import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";

interface CreditStore {
  credits: number | null;
  isLoading: boolean;
  fetchCredits: (userId: string) => Promise<void>;
}

export const useCreditStore = create<CreditStore>((set) => ({
  credits: null,
  isLoading: false,

  fetchCredits: async (userId) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("users")
        .select("credits")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching credits:", error);
        set({ isLoading: false });
        return;
      }

      set({ credits: data.credits, isLoading: false });
    } catch (err) {
      console.error("error loading credits", err);
      set({ isLoading: false });
    }
  },
}));
