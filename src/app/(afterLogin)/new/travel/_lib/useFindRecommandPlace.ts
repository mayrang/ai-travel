"use client";

import { DetailRecommandPlace, RecommandPlace } from "@/model/new";
import {
  UseQueryOptions,
  UseQueryResult,
  useQueries,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getFindPlace from "./getFindPlace";

export default function useFindRecommandPlace(data: RecommandPlace[] = []) {
  const [places, setPlaces] = useState<DetailRecommandPlace[]>([]);

  const queries = data.map<UseQueryOptions<DetailRecommandPlace, Error>>(
    (item) => {
      return {
        queryKey: ["holidays", item.place],
        queryFn: () => getFindPlace(item),
        staleTime: 1000 * 60 * 60 * 5,
      };
    }
  );
  const queryResults: UseQueryResult<DetailRecommandPlace>[] = useQueries({
    queries,
  });
  const queryResultStatus = queryResults.every((result) => !result.isLoading);
  const queryResultError = queryResults.some((result) => result.error);

  useEffect(() => {
    if (queryResultStatus && !queryResultError) {
      if (queryResults && queryResults.length > 0) {
        console.log("palce", queryResults);

        setPlaces(
          queryResults.map((data) => data.data as DetailRecommandPlace)
        );
      }
    }
  }, [queryResultError, queryResultStatus, queryResults.length]);
  return {
    data: places,
  };
}
