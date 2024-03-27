import { Post } from "@/model/calendar";
import { create } from "zustand";

type NewTravelStore = {
  cities: string[];
  headcount: number | null;
  tags: string[] | null;
  appendCities: (city: string) => void;
  removeCities: (city: string) => void;
  setHeadcount: (headcount: number) => void;
  setTags: (tags: string[]) => void;
  reset: () => void;
};

export const useNewTravelStore = create<NewTravelStore>((set) => ({
  cities: [],
  headcount: null,
  tags: null,
  appendCities: (city) => {
    set((state) => ({ ...state, cities: [...state.cities, city] }));
  },
  removeCities: (city) => {
    set((state) => ({
      ...state,
      cities: [...state.cities].filter((item) => item !== city),
    }));
  },
  setHeadcount: (headcount) => {
    set({ headcount });
  },
  setTags: (tags) => {
    set({ tags });
  },
  reset: () => {
    set({ cities: [], headcount: null, tags: null });
  },
}));
