"use client";
import React, { useState } from "react";
import Count from "./Count";
import styles from "./SelectHeadcount.module.css";
import { useStepStore } from "@/store/step";
import InvalidMessage from "@/app/_component/InvalidMessage";
import { useNewTravelStore } from "@/store/newTravel";
import BottomFixedButton from "@/app/(afterLogin)/_component/BottomFixedButton";

export default function SelectHeadcount() {
  const { setStep } = useStepStore();
  const { headcount, setHeadcount } = useNewTravelStore();
  const handleNextStep = () => {
    if (headcount > 0) {
      setStep(3);
      setHeadcount(headcount);
    }
    return;
  };

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>여행 인원을 선택하세요!</h2>
      <div className={styles.description}>
        혼자 여행하는 경우 "1"을 선택하세요. 선택한 인원 수에 따라 여행지를 추천해드릴게요.
      </div>
      <div className={styles.countContainer}>
        <label htmlFor="count" className={styles.countLabel}>
          여행 인원 수
        </label>
        <Count />
        {headcount === 0 && <InvalidMessage size={12} message={"최소 1명 이상의 여행 인원을 입력해주세요."} />}
      </div>
      {headcount > 0 && <BottomFixedButton handler={handleNextStep} text={`${headcount}명 · 다음`} />}
    </article>
  );
}
