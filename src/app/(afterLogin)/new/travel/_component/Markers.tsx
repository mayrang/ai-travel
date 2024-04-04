"use client";
import { useEventStore } from "@/store/event";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRecommandPlaces } from "../_lib/getRecommendPlaces";
import { useNewTravelStore } from "@/store/newTravel";
import dayjs from "dayjs";

export default function Markers() {
  const {
    currentCity: { city },
  } = useEventStore();
  const { headcount, date, themes } = useNewTravelStore();
  const days = dayjs(date?.endDate as Date).diff(
    date?.startDate as Date,
    "days"
  );
  const toStringThemes = themes.map((item) => item.english).join(",");
  const { data: recommandPlaces } = useQuery({
    queryKey: [
      "search",
      "places",
      { city, headcount, days, themes: toStringThemes },
    ],
    queryFn: getRecommandPlaces,
    staleTime: 0,
  });
  console.log("recommandPlaces", recommandPlaces);
  return <></>;
}
