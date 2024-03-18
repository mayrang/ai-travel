import { create } from "zustand";

type AddPageStore = {
  page: "date" | "event" | "detail";
  setPage: (page: "date" | "event" | "detail") => void;
  reset: () => void;
};

export const useAddPageStore = create<AddPageStore>((set) => ({
  page: "date",
  setPage: (page: "date" | "event" | "detail") => {
    set({ page });
  },
  reset: () => {
    set({ page: "date" });
  },
}));
