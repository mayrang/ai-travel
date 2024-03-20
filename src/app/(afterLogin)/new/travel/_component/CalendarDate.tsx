"use client";
import { WeekDay } from "@/model/calendar";
import React, { useEffect } from "react";
import styles from "./CalendarDate.module.css";
import cls from "classnames";
import { useDateStore } from "@/store/date";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
type Props = {
  date: WeekDay;
};

export default function CalendarDate({ date }: Props) {
  const { startDate, endDate, setStartDate, setEndDate, reset, setPost } =
    useDateStore();

  const handleDate = () => {
    // console.log("check", startDate, endDate );
    const dateFormat = dayjs(date.dayFormat, "YYYYMMDD").toDate();
    // startDate가 있으면서 endDate가 없을 때 : startDate보다 적으면 startDate를 새로 설정, 아니면 endDate설정
    // startDate가 없으면 : startDate 설정
    // endDate만 있으면 뭔가 잘못된거 : reset하고 startDate 설정
    // startDate, endDate 둘 다 존재하는 경우 : reset하고 startDate 설정
    if (startDate && endDate) {
      reset();
      setStartDate(dateFormat);
    } else if (!startDate && !endDate) {
      setStartDate(dateFormat);
    } else if (startDate && !endDate) {
      if (dayjs(dateFormat).isSameOrBefore(startDate)) {
        reset();
        setStartDate(dateFormat);
      } else {
        setEndDate(dateFormat);
      }
    } else {
      reset();
      setStartDate(dateFormat);
    }
  };

  useEffect(() => {
    // console.log(startDate, endDate);
    if (startDate && date.dayFormat) {
      if (endDate) {
        setPost([
          {
            calendarId: date.dayFormat,
            startTime: startDate,
            endTime: endDate,
          },
        ]);
      } else {
        setPost([
          {
            calendarId: date.dayFormat,
            startTime: startDate,
            endTime: startDate,
          },
        ]);
      }
    }
  }, [startDate, endDate]);

  return (
    <button
      disabled={
        date.type === "prev" ||
        date.type === "next" ||
        date.type === "prevDate" ||
        date.type === "nextDate"
      }
      onClick={handleDate}
      className={styles.date}
    >
      <div
        className={cls(
          date.holiday?.isHoliday && styles.holiday,
          (date.type === "prev" || date.type === "next") && styles.none,
          (date.type === "prevDate" || date.type === "nextDate") &&
            styles.disabled,
          date.posts && date.posts.length > 0 && styles.checked
        )}
      >
        {date.date}
      </div>
    </button>
  );
}
