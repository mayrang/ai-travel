"use client";
import React, { useState } from "react";
import Count from "./Count";
import styles from "./SelectHeadcount.module.css";
import { useStepStore } from "@/store/step";

export default function SelectHeadcount() {
  const { setStep } = useStepStore();
  const [headcount, setHeadCount] = useState<number>(1);
  return (
    <article className={styles.container}>
      <h2 className={styles.title}>여행 인원을 선택하세요!</h2>
      <div className={styles.description}>
        혼자 여행하는 경우 "1"을 선택하세요. 선택한 인원 수에 따라 여행지를
        추천해드릴게요.
      </div>
      <div className={styles.countContainer}>
        <label htmlFor="count">여행 인원 수</label>
        <Count count={headcount} setCount={setHeadCount} />
      </div>
    </article>
  );
}
