"use client";
import { WeekDay } from "@/model/calendar";
import React, { Fragment } from "react";
import styles from "./Calendar.module.css";
import CalendarDate from "./CalendarDate";
import dayjs from "dayjs";
type Props = {
  month: {
    monthTitle: number;
    month: WeekDay[][];
  };
};

export default function Calendar({ month }: Props) {
  // console.log(month, "month");
  const year = month.monthTitle > 12 ? dayjs().get("year") + 1 : dayjs().get("year");
  return (
    <article className={styles.main}>
      <h3 className={styles.monthTitle}>
        {year}년 {month.monthTitle}월
      </h3>
      <section className={styles.monthSection}>
        {month.month.map((week, index) => (
          <div className={styles.weekSection} key={`${month.monthTitle} ${index}`}>
            {week.map((date) => (
              <CalendarDate date={date} />
            ))}
          </div>
        ))}
      </section>
    </article>
  );
}
