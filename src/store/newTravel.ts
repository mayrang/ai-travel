import { Post } from "@/model/calendar";
import { create } from "zustand";

type NewTravelStore = {
  cities: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  }[];
  headcount: number;
  themes: {
    item: string;
    color: string;
  }[];
  title: string;
  date: { startDate: Date; endDate: Date } | null;
  setTitle: (title: string) => void;
  appendCities: (city: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  }) => void;
  removeCities: (city: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  }) => void;
  setDate: (date: { startDate: Date; endDate: Date }) => void;
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
  title: "",
  date: null,
  setDate: (date: { startDate: Date; endDate: Date }) => {
    set({ date });
  },
  setTitle: (value: string) => {
    set({ title: value });
  },
  appendCities: (city) => {
    set((state) => ({ ...state, cities: [...state.cities, city] }));
  },
  removeCities: (city) => {
    set((state) => ({
      ...state,
      cities: [...state.cities].filter((item) => item.city !== city.city),
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
    set({ cities: [], headcount: 1, themes: [], title: "" });
  },
}));
