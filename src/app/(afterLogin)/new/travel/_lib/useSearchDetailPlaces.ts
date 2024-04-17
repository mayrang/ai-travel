"use client";

import { DetailPlace, SimplePlace } from "@/model/new";
import {
  UseQueryOptions,
  UseQueryResult,
  useQueries,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getFindPlace from "./getFindPlace";

export default function useSearchDetailPlaces(data: SimplePlace[] = []) {
  const [places, setPlaces] = useState<DetailPlace[]>([]);

  const queries = data.map<UseQueryOptions<DetailPlace, Error>>((item) => {
    return {
      queryKey: ["places", item.place],
      queryFn: () => getFindPlace(item),
      staleTime: 1000 * 60 * 60 * 5,
    };
  });
  const queryResults: UseQueryResult<DetailPlace>[] = useQueries({
    queries,
  });
  const queryResultStatus = queryResults.every((result) => !result.isLoading);
  const queryResultError = queryResults.some((result) => result.error);

  useEffect(() => {
    if (queryResultStatus && !queryResultError) {
      if (queryResults && queryResults.length > 0) {
        console.log("palce", queryResults);

        setPlaces(queryResults.map((data) => data.data as DetailPlace));
      }
    }
  }, [queryResultError, queryResultStatus, queryResults.length]);
  return {
    data: places,
  };
}
