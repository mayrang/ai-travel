"use client";
import dayjs from "dayjs";
import React from "react";
import useCalendar from "../_lib/useCalendar";
import Calendar from "./Calendar";
import { useDateStore } from "@/store/date";
import styles from "./SelectDate.module.css";

export default function SelectDate() {
  const { post, startDate, endDate } = useDateStore();
  console.log("post", post);
  const calendar = useCalendar(post);
  console.log("calendar", calendar);
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>여행 날짜 선택</h2>
      {calendar.map((month) => (
        <Calendar month={month} key={month.monthTitle} />
      ))}
    </main>
  );
}
