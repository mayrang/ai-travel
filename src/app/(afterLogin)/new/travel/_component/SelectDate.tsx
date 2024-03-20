"use client";
import dayjs from "dayjs";
import React from "react";
import useCalendar from "../_lib/useCalendar";
import Calendar from "./Calendar";
import { useDateStore } from "@/store/date";

export default function SelectDate() {
  const { post, startDate, endDate } = useDateStore();
  console.log("post", post);
  const calendar = useCalendar(post);
  console.log("calendar", calendar);
  return (
    <>
      {calendar.map((month) => (
        <Calendar month={month} key={month.monthTitle} />
      ))}
    </>
  );
}
