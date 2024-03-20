"use client";
import dayjs from "dayjs";
import React from "react";
import useCalendar from "../_lib/useCalendar";
import Calendar from "./Calendar";

export default function SelectDate() {
  const calendar = useCalendar();
  console.log("calendar", calendar);
  return (
    <>
      {calendar.map((month) => (
        <Calendar month={month} key={month.monthTitle} />
      ))}
    </>
  );
}
