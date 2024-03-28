import { create } from "zustand";

type StepStore = {
  step: 1 | 2 | 3 | 4;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  reset: () => void;
};

export const useStepStore = create<StepStore>((set) => ({
  step: 1,
  setStep: (step: 1 | 2 | 3 | 4) => {
    set({ step });
  },
  reset: () => {
    set({ step: 1 });
  },
}));
