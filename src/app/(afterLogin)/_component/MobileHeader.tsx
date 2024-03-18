"use client";
import React from "react";
import styles from "./MobileHeader.module.css";
import BackButton from "@/app/_component/BackButton";
import MenuButton from "@/app/_component/MenuButton";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import { setCalendarArray, posts } from "../_lib/setCalendar";
export default function MobileHeader() {
  const pathname = usePathname();

  // console.log("header", setCalendarArray(2023 || dayjs().get("year"), 3 || dayjs().get("month") + 1, [], posts));

  return (
    <header className={styles.header}>
      <BackButton />
      {pathname === "/home" && <div>여행 목록</div>}
      <MenuButton />
    </header>
  );
}
