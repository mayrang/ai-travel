import { useEventStore } from "@/store/event";
import { useNewTravelStore } from "@/store/newTravel";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getRecommandPlaces } from "./getRecommendPlaces";
import useSearchDetailPlaces from "./useSearchDetailPlaces";

export default function useRecommand() {
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
    staleTime: 60 * 1000 * 5,
    retry: 3,
  });

  const { data } = useSearchDetailPlaces(recommandPlaces);

  return { data };
}
