import { WeekDay } from "@/model/calendar";
import React from "react";
import styles from "./CalendarDate.module.css";
import cls from "classnames";
type Props = {
  date: WeekDay;
};

export default function CalendarDate({ date }: Props) {
  return (
    <div className={styles.date}>
      <div
        className={cls(
          date.holiday?.isHoliday && styles.holiday,
          (date.type === "prev" || date.type === "next") && styles.none,
          date.type === "prevDate" && styles.disabled
        )}
      >
        {date.date}
      </div>
    </div>
  );
}
