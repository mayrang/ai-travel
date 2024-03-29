import { Post } from "@/model/calendar";
import { create } from "zustand";

type NewTravelStore = {
  cities: string[];
  headcount: number;
  themes: {
    item: string;
    color: string;
  }[];
  appendCities: (city: string) => void;
  removeCities: (city: string) => void;
  setHeadcount: (headcount: number) => void;
  appendThemes: (themes: { item: string; color: string }) => void;
  resetThemes: () => void;
  removeThemes: (theme: { item: string; color: string }) => void;
  reset: () => void;
};

export const useNewTravelStore = create<NewTravelStore>((set) => ({
  cities: [],
  headcount: 1,
  themes: [],
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
  appendThemes: (theme: { item: string; color: string }) => {
    set((state) => ({ ...state, themes: [...state.themes, theme] }));
  },
  removeThemes: (theme: { item: string; color: string }) => {
    set((state) => ({
      ...state,
      themes: [...state.themes].filter((item) => item.item !== theme.item),
    }));
  },
  resetThemes: () => {
    set({ themes: [] });
  },
  reset: () => {
    set({ cities: [], headcount: 1, themes: [] });
  },
}));
