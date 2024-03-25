"use client";
import { setCalendarArray } from "@/app/(afterLogin)/_lib/setCalendar";
import { Holiday, Post, WeekDay } from "@/model/calendar";
import { UseQueryOptions, UseQueryResult, useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getHoliday } from "./getHolidays";

interface MonthItem {
  year: number;
  month: number;
}

export default function useCalendar(posts: Post[], startDate: Date | null, endDate: Date | null) {
  const [calendar, setCalendar] = useState<{ monthTitle: number; month: WeekDay[][] }[]>([]);
  const sixRateMonth = dayjs().add(6, "month").month() + 1;
  const currentMonth = dayjs().month() + 1;

  const monthsToAdd = Array.from({ length: sixRateMonth - currentMonth + 1 }, (_, index) => currentMonth + index);

  const monthArray = monthsToAdd.map((month) => {
    const mon = month > 12 ? month - 12 : month;
    const year = month > 12 ? dayjs().year() + 1 : dayjs().year();
    return { year, month: mon };
  });

  const queries = monthArray.map<UseQueryOptions<Holiday[], Error>>((item) => {
    return {
      queryKey: ["holidays", item.year, item.month],
      queryFn: () => getHoliday(item.year, item.month),
      staleTime: 1000 * 60 * 60 * 5,
    };
  });
  const queryResults: UseQueryResult<Holiday[]>[] = useQueries({ queries });
  const queryResultStatus = queryResults.every((result) => !result.isLoading);
  const queryResultError = queryResults.some((result) => result.error);

  useEffect(() => {
    if (queryResultStatus && !queryResultError) {
      const holidaysArray = queryResults.map((item) => item.data || []);

      const updatedCalendar = holidaysArray.map((holidays, index) => {
        const month = currentMonth + index;
        const mon = month > 12 ? month - 12 : month;

        const year = month > 12 ? dayjs().year() + 1 : dayjs().year();

        const monthArray = setCalendarArray(year, mon, holidays, posts);
        return { monthTitle: month, month: monthArray };
      });

      setCalendar(updatedCalendar);
    } else {
      const holidaysArray = Array.from({ length }, () => []);

      const updatedCalendar = holidaysArray.map((holidays, index) => {
        const month = currentMonth + index;
        const mon = month > 12 ? month - 12 : month;

        const year = month > 12 ? dayjs().year() + 1 : dayjs().year();

        const monthArray = setCalendarArray(year, mon, holidays, posts);
        return { monthTitle: month, month: monthArray };
      });

      setCalendar(updatedCalendar);
    }
  }, [JSON.stringify(posts), startDate, endDate, queryResultStatus]);

  return calendar;
}
