import { SearchCity } from "@/model/search";
import { QueryFunction } from "@tanstack/query-core";

interface RecommandPlace {
  place: string;
  lat: number;
  lng: number;
}
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
    console.log("reuslt", result.data);
    const data = JSON.parse(result.data);
    const test = data.place[0].place;
    const placeRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/place/detail?query=${test}`
    );
    const place = await placeRes.json();
    console.log("place", place.data);
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("fetch Failed Data!");
  }
};
