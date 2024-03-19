"use client";
import { WeekDay, setCalendarArray } from "@/app/(afterLogin)/_lib/setCalendar";
import dayjs from "dayjs";
import Raect, { useEffect, useState } from "react";

export default function useCalendar() {
    const [calendar, setCalendar] = useState<{monthTitle: number; month: WeekDay[][]}[]>([]); // 불필요한 배열 초기화 제거
 
    useEffect(() => {
        const sixRateMonth = dayjs().add(6, "month").month() + 1;
        const currentMonth = dayjs().month() + 1;
        const monthsToAdd = Array.from({ length: sixRateMonth - currentMonth + 1 }, (_, index) => currentMonth + index); // 누락된 월을 계산하는 방법 수정

        monthsToAdd.forEach(month => {
            const monthArray = setCalendarArray(2024, month, [], []);
            setCalendar(prev => ([...prev, {monthTitle: month, month: monthArray}])); // 의존성 배열 수정
        });
    }, []);
  
    return calendar;
}