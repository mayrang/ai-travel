"use client";

import { RecommandPlace } from "@/model/new";
import {
  UseQueryOptions,
  UseQueryResult,
  useQueries,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getFindPlace from "./getFindPlace";

export default function useFindRecommandPlace(data: RecommandPlace[] = []) {
  const [places, setPlaces] = useState<any[]>([]);

  const queries = data.map<UseQueryOptions<any[], Error>>((item) => {
    return {
      queryKey: ["holidays", item.place],
      queryFn: () => getFindPlace(item.place),
      staleTime: 1000 * 60 * 60 * 5,
    };
  });
  const queryResults: UseQueryResult<any[]>[] = useQueries({ queries });
  const queryResultStatus = queryResults.every((result) => !result.isLoading);
  const queryResultError = queryResults.some((result) => result.error);

  useEffect(() => {
    if (queryResultStatus && !queryResultError) {
      if (queryResults.length > 0) {
        console.log("palce", queryResults);
        setPlaces(
          queryResults.map((item: any) => item.data.candidates[0] || [])
        );
      }
    }
  }, [queryResultError, queryResultStatus, queryResults.length]);
  return {
    data: places,
  };
}
