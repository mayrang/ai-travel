import { create } from "zustand";

type AddPageStore = {
  page: "title" | "date" | "event" | "detail";
  setPage: (page: "title" | "date" | "event" | "detail") => void;
  reset: () => void;
};

export const useAddPageStore = create<AddPageStore>((set) => ({
  page: "date",
  setPage: (page: "title" | "date" | "event" | "detail") => {
    set({ page });
  },
  reset: () => {
    set({ page: "title" });
  },
}));
