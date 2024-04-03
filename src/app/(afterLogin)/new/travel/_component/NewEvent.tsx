"use client";
import React, { useEffect } from "react";
import MapContainer from "./MapContainer";
import { useNewTravelStore } from "@/store/newTravel";
import { useEventStore } from "@/store/event";

export default function NewEvent() {
  const { cities } = useNewTravelStore();
  const { setCurrentCity } = useEventStore();
  useEffect(() => {
    setCurrentCity(cities[0]);
  }, []);
  return <MapContainer />;
}
