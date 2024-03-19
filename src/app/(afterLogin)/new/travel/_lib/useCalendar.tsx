"use client";
import { setCalendarArray } from "@/app/(afterLogin)/_lib/setCalendar";
import { Holiday, WeekDay } from "@/model/calendar";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function useCalendar() {
  const [calendar, setCalendar] = useState<
    { monthTitle: number; month: WeekDay[][] }[]
  >([]);

  useEffect(() => {
    const sixRateMonth = dayjs().add(6, "month").month() + 1;
    const currentMonth = dayjs().month() + 1;

    async function getHoliday(year: number, month: number): Promise<Holiday[]> {
      const response = await axios.get(
        `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&solMonth=${month
          .toString()
          .padStart(2, "0")}&ServiceKey=${
          process.env.NEXT_PUBLIC_HOLIDAY_API_KEY
        }`
      );
      let result = response.data.response?.body?.items?.item || [];
      if (typeof result === "object") {
        result = Object.values(result);
      }
      return result;
    }

    async function fetchData() {
      const monthsToAdd = Array.from(
        { length: sixRateMonth - currentMonth + 1 },
        (_, index) => currentMonth + index
      );

      const promises = monthsToAdd.map((month) => {
        const mon = month > 12 ? month - 12 : month;
        const year = month > 12 ? dayjs().year() + 1 : dayjs().year();
        return getHoliday(year, mon);
      });
      const holidaysArray = await Promise.all(promises);

      const updatedCalendar = holidaysArray.map((holidays, index) => {
        const month = currentMonth + index;
        const mon = month > 12 ? month - 12 : month;
        const year = month > 12 ? dayjs().year() + 1 : dayjs().year();
        console.log(holidays, "holidays");
        const monthArray = setCalendarArray(year, mon, holidays, []);
        return { monthTitle: month, month: monthArray };
      });

      setCalendar(updatedCalendar);
    }

    fetchData();
  }, []);

  return calendar;
}
