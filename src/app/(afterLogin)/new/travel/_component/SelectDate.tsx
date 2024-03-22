"use client";
import dayjs from "dayjs";
import React from "react";
import useCalendar from "../_lib/useCalendar";
import Calendar from "./Calendar";
import { useDateStore } from "@/store/date";
import styles from "./SelectDate.module.css";

export default function SelectDate() {
  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];
  const { post, startDate, endDate } = useDateStore();
  console.log("post", post);
  const calendar = useCalendar(post, startDate, endDate);
  console.log("calendar", calendar);
  return (
    <main className={styles.main}>
      <div className={styles.dayContainer}>
        {dayArray.map((day) => (
          <div className={styles.day} key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.bar}></div>
      <div className={styles.monthsContainer}>
        {calendar.map((month) => (
          <Calendar month={month} key={month.monthTitle} />
        ))}
      </div>
    </main>
  );
}
