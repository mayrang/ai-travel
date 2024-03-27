"use client";
import React, { useState } from "react";
import styles from "./NewTravelTitle.module.css";
import cls from "classnames";
import SelectPlace from "./SelectPlace";
export default function NewTravelTitle() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <section className={styles.container}>
      <div className={styles.progressBar}>
        <div
          className={cls(
            styles.progress,
            step === 1 && styles.step1,
            step === 2 && styles.step2,
            step === 3 && styles.step3,
            step === 4 && styles.step4
          )}
        ></div>
      </div>
      {step === 1 && <SelectPlace setStep={setStep} />}
    </section>
  );
}
