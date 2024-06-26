"use client";
import dayjs from "dayjs";
import React from "react";
import useCalendar from "../../_lib/useCalendar";
import Calendar from "./Calendar";
import { useDateStore } from "@/store/date";
import styles from "./SelectDate.module.css";
import "dayjs/locale/ko";
import { useAddPageStore } from "@/store/addPage";
import { useNewTravelStore } from "@/store/newTravel";

dayjs.locale("ko");

export default function SelectDate() {
  const dayArray = ["일", "월", "화", "수", "목", "금", "토"];
  const { post, startDate, endDate } = useDateStore();
  const { setPage } = useAddPageStore();
  const { setDate, cities } = useNewTravelStore();
  const calendar = useCalendar(post, startDate, endDate);
  console.log("cities", cities);
  const clickNext = () => {
    if (startDate && endDate) {
      setDate({ startDate, endDate });
      setPage("event");
    }
    return;
  };

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
      {startDate && endDate && (
        <div className={styles.buttonContainer}>
          <button onClick={clickNext} className={styles.nextButton}>
            {dayjs(startDate).format("YYYY.MM.DD (dd)")} ~{" "}
            {dayjs(endDate).format("YYYY.MM.DD (dd)")}
            &nbsp;&middot;&nbsp;
            {dayjs(endDate).diff(startDate, "day")}박
          </button>
        </div>
      )}
    </main>
  );
}
