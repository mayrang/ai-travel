import { WeekDay } from "@/model/calendar";
import React from "react";
import styles from "./CalendarDate.module.css";
type Props = {
  date: WeekDay;
};

export default function CalendarDate({ date }: Props) {
  return <div className={styles.date}>{date.date}</div>;
}
