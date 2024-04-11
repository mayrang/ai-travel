"use client";
import { useEventStore } from "@/store/event";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRecommandPlaces } from "../_lib/getRecommendPlaces";
import { useNewTravelStore } from "@/store/newTravel";
import dayjs from "dayjs";
import useFindRecommandPlace from "../_lib/useFindRecommandPlace";
import { MarkerF } from "@react-google-maps/api";
import marker from "../../../../../../public/marker.svg";

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

  const { data } = useFindRecommandPlace(recommandPlaces);
  console.log(data);

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <MarkerF
            key={item.place_id}
            icon={{
              url: "/location-dot-solid.png",
              scaledSize: new google.maps.Size(31, 43),
            }}
            position={item.geometry.location}
          />
        ))}
    </>
  );
}
