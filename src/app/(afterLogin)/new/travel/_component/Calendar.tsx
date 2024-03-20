"use client";
import { WeekDay } from "@/model/calendar";
import React, { Fragment } from "react";
import styles from "./Calendar.module.css";
import CalendarDate from "./CalendarDate";
type Props = {
  month: {
    monthTitle: number;
    month: WeekDay[][];
  };
};

export default function Calendar({ month }: Props) {
  console.log(month, "month");
  const dayArray = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <article className={styles.main}>
      <h3 className={styles.monthTitle}>{month.monthTitle}월</h3>
      <section className={styles.monthSection}>
        {dayArray.map((day) => (
          <div className={styles.day}>{day}</div>
        ))}
        {month.month.map((week, index) => (
          <Fragment key={`${month.monthTitle} ${index}`}>
            {week.map((date) => (
              <CalendarDate date={date} />
            ))}
          </Fragment>
        ))}
      </section>
    </article>
  );
}
