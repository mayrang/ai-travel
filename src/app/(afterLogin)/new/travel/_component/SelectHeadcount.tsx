"use client";
import React, { useState } from "react";
import Count from "./Count";
import styles from "./SelectHeadcount.module.css";
import { useStepStore } from "@/store/step";
import InvalidMessage from "@/app/_component/InvalidMessage";
import { useNewTravelStore } from "@/store/newTravel";

export default function SelectHeadcount() {
  const { setStep } = useStepStore();
  const { setHeadcount } = useNewTravelStore();
  const [headcount, setHeadCount] = useState<number>(1);

  const handleNextStep = () => {
    if (headcount > 1) {
      setStep(3);
      setHeadCount(headcount);
    }
    return;
  };
  return (
    <article className={styles.container}>
      <h2 className={styles.title}>여행 인원을 선택하세요!</h2>
      <div className={styles.description}>
        혼자 여행하는 경우 "1"을 선택하세요. 선택한 인원 수에 따라 여행지를
        추천해드릴게요.
      </div>
      <div className={styles.countContainer}>
        <label htmlFor="count" className={styles.countLabel}>
          여행 인원 수
        </label>
        <Count count={headcount} setCount={setHeadCount} />
        {headcount === 0 && (
          <InvalidMessage
            size={12}
            message={"최소 1명 이상의 여행 인원을 입력해주세요."}
          />
        )}
      </div>
      {headcount > 0 && (
        <button onClick={handleNextStep} className={styles.nextButton}>
          {headcount}명 &nbsp;&middot;&nbsp; 선택 완료
        </button>
      )}
    </article>
  );
}
