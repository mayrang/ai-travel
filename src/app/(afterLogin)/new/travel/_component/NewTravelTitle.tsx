"use client";
import React, { useState } from "react";
import styles from "./NewTravelTitle.module.css";
import cls from "classnames";
import { motion } from "framer-motion";
import SelectPlace from "./city/SelectPlace";
import SelectHeadcount from "./headcount/SelectHeadcount";
import { useStepStore } from "@/store/step";
import SelectTheme from "./theme/SelectTheme";
import { useAddPageStore } from "@/store/addPage";
import NewTitle from "./title/NewTitle";
export default function NewTravelTitle() {
  const { step, setStep } = useStepStore();
  const { setPage } = useAddPageStore();
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
      {step === 1 && <SelectPlace />}
      {step === 2 && <SelectHeadcount />}
      {step === 3 && <SelectTheme />}
      {step === 4 && <NewTitle />}
    </section>
  );
}
