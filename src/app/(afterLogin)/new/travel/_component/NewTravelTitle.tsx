"use client";
import React, { useState } from "react";
import styles from "./NewTravelTitle.module.css";
import cls from "classnames";
import { motion } from "framer-motion";
import SelectPlace from "./SelectPlace";
export default function NewTravelTitle() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <section className={styles.container}>
      <div className={styles.progressBar}>
        {step > 0 && <div className={cls(styles.progress, styles.step1)}></div>}
        {step > 1 && (
          <motion.div
            className={cls(styles.progress, styles.step2)}
            initial={{ translateX: "-100%" }}
            animate={{ translateX: 0 }}
            transition={{
              duration: 0.5,
              ease: "linear",
            }}
          ></motion.div>
        )}
        {step > 2 && (
          <motion.div
            initial={{ translateX: "-100%" }}
            animate={{ translateX: 0 }}
            transition={{
              duration: 0.5,
              ease: "linear",
            }}
            className={cls(styles.progress, styles.step3)}
          ></motion.div>
        )}
        {step > 3 && (
          <motion.div
            initial={{ translateX: "-100%" }}
            animate={{ translateX: 0 }}
            transition={{
              duration: 0.5,
              ease: "linear",
            }}
            className={cls(styles.progress, styles.step4)}
          ></motion.div>
        )}
      </div>
      {step === 1 && <SelectPlace setStep={setStep} />}
      <button
        onClick={() =>
          setStep((prev) => (prev === 4 ? 4 : ((prev + 1) as 1 | 2 | 3 | 4)))
        }
      >
        스텝 테스트
      </button>
    </section>
  );
}
