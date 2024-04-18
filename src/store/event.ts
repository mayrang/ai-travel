import { create } from "zustand";

type EventStore = {
  currentCity: { city: string; country: string; lat: number; lng: number };
  section: "new" | "recommand" | "search";
  setSection: (value: "new" | "recommand" | "search") => void;
  setCurrentCity: (city: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  }) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  currentCity: {
    city: "대전",
    country: "대한민국",
    lat: 36.3396448,
    lng: 127.3939223,
  },
  section: "new",
  setSection: (value) => {
    set({ section: value });
  },
  setCurrentCity: (city) => {
    set({ currentCity: city });
  },
}));
