"use client";
import React from "react";
import styles from "./SelectTheme.module.css";
import SelectedTheme from "./SelectedTheme";
import ThemeList from "./ThemeList";
import { useNewTravelStore } from "@/store/newTravel";
import { useStepStore } from "@/store/step";
export default function SelectTheme() {
  const { themes } = useNewTravelStore();
  const { setStep } = useStepStore();
  const handleNextStep = () => {
    if (themes.length === 0) {
      alert("여행 테마를 하나 이상 추가해주세요!");
      return;
    }

    setStep(4);
  };

  return (
    <article className={styles.container}>
      <h2 className={styles.title}>여행 테마를 선택하세요!</h2>
      <div className={styles.description}>
        계획 중인 여행의 테마들을 모두 선택해 주세요. 선택한 테마에 맞춰
        여행지를 추천해드릴게요.
      </div>
      <SelectedTheme />
      <ThemeList />
      {themes.length > 0 && (
        <button onClick={handleNextStep} className={styles.nextButton}>
          {themes.length}개 테마 선택&nbsp;&middot;&nbsp;다음
        </button>
      )}
    </article>
  );
}
