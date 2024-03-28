"use client";
import React, { useEffect } from "react";
import styles from "./MobileHeader.module.css";
import BackButton from "@/app/_component/BackButton";
import MenuButton from "@/app/_component/MenuButton";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import { setCalendarArray, posts } from "../_lib/setCalendar";
import { useAddPageStore } from "@/store/addPage";
import AddPageHeaderButton from "./AddPageHeaderButton";
import AddPageBackButton from "./AddPageBackButton";
import NewHeaderTitle from "./NewHeaderTitle";
export default function MobileHeader() {
  const pathname = usePathname();
  const { page, reset } = useAddPageStore();
  console.log("page", page);
  // console.log("header", setCalendarArray(2023 || dayjs().get("year"), 3 || dayjs().get("month") + 1, [], posts));

  useEffect(() => {
    if (pathname !== "/add/travel") {
      reset();
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div>
        {pathname === "/new/travel" && <AddPageBackButton />}
        {pathname === "/home" && <BackButton />}
      </div>
      <div>
        {pathname === "/home" && <div>여행 목록</div>}
        {pathname === "/new/travel" && <NewHeaderTitle page={page} />}
      </div>
      <div>
        {pathname === "/home" && <MenuButton />}
        {pathname === "/new/travel" && <AddPageHeaderButton />}
      </div>
    </header>
  );
}
