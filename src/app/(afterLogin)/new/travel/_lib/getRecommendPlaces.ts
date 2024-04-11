import { SearchCity } from "@/model/search";
import { QueryFunction } from "@tanstack/query-core";
import {
  UseQueryOptions,
  UseQueryResult,
  useQueries,
} from "@tanstack/react-query";
import getFindPlace from "./getFindPlace";
import { RecommandPlace } from "@/model/new";

export const getRecommandPlaces: QueryFunction<
  RecommandPlace[],
  [
    _1: string,
    _2: string,
    data: { headcount: number; days: number; themes: string; city: string }
  ]
> = async ({ queryKey }) => {
  try {
    const [_1, _2, body] = queryKey;
    const { headcount, days, themes, city } = body;
    console.log(city);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/place/recommand`,

      {
        method: "POST",
        body: JSON.stringify({
          headcount,
          days,
          city,
          themes,
        }),
        cache: "no-cache",
        next: {
          tags: [
            "recommand",
            "place",
            headcount.toString(),
            days.toString(),
            themes,
          ],
        },
      }
    );
    const result = await response.json();
    console.log("check", result.data.place);
    const data = result.data.place;
    console.log("reuslt", data);

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("fetch Failed Data!");
  }
};
