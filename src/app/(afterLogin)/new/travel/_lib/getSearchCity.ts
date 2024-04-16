import { SearchCity } from "@/model/search";
import { QueryFunction } from "@tanstack/query-core";
import { revalidatePath, revalidateTag } from "next/cache";

export const getSearchCity: QueryFunction<
  SearchCity,
  [_1: string, _2: string, value: string]
> = async ({ queryKey }) => {
  //   const handleText = async () => {
  //     const result = await fetch(
  //       `http://localhost:3000/api/search/city?query=${"나고야"}`
  //     );
  //     const data = await result.json();
  //     console.log("result", JSON.parse(data.data));
  //   };
  try {
    const [_1, _2, value] = queryKey;
    if (value === "") {
      return {};
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/city?query=${value}`,
      {
        next: {
          tags: ["search", "city", value],
        },
      }
    );
    const result = await response.json();

    const data = result.data;

    return data;
  } catch (err) {
    console.log(err);
    throw new Error("fetch Failed Data!");
  }
  return;
};
