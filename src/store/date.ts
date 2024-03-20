import { create } from "zustand";

type DateStore = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  reset: () => void;
};

export const useDateStore = create((set) => ({
  startDate: null,
  endDate: null,
  setStartDate: (date: Date) => {
    set({ startDate: date });
  },
  setEndDate: (date: Date) => {
    set({ endDate: date });
  },
  reset: () => {
    set({ startDate: null, endDate: null });
  },
}));
