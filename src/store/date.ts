import { Post } from "@/model/calendar";
import { create } from "zustand";

type DateStore = {
  startDate: Date | null;
  endDate: Date | null;
  post: Post[] | [];
  setPost: (post: Post[]) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  reset: () => void;
};

export const useDateStore = create<DateStore>((set) => ({
  startDate: null,
  endDate: null,
  post: [],
  setPost: (post) => {
    set({ post });
  },
  setStartDate: (date: Date) => {
    set({ startDate: date });
  },
  setEndDate: (date: Date) => {
    set({ endDate: date });
  },
  reset: () => {
    set({ startDate: null, endDate: null, post: [] });
  },
}));
