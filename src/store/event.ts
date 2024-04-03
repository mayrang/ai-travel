import { create } from "zustand";

type EventStore = {
  currentCity: { city: string; lat: number; lng: number };
  setCurrentCity: (city: { city: string; lat: number; lng: number }) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  currentCity: { city: "Daejeon", lat: 36.3396448, lng: 127.3939223 },
  setCurrentCity: (city) => {
    set({ currentCity: city });
  },
}));
