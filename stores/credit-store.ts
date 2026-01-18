import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";

interface CreditStore {
  credits: number | null;
  isLoading: boolean;
  fetchCredits: (userId: string, retryCount?: number) => Promise<void>;
}

const createCreditStore = create<CreditStore>((set) => ({
  credits: null,
  isLoading: false,

  fetchCredits: async (userId, retryCount = 0): Promise<void> => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("users")
        .select("credits")
        .eq("id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116" && retryCount < MAX_RETRIES) {
          console.log(
            `User not found, retrying (${retryCount + 1}/${MAX_RETRIES})...`
          );

          await new Promise((resolve) =>
            setTimeout(resolve, RETRY_DELAY * (retryCount + 1))
          );

          return await createCreditStore
            .getState()
            .fetchCredits(userId, retryCount + 1);
        }

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

export const useCreditStore = createCreditStore;
