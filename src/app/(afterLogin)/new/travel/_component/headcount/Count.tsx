"use clinet";
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import styles from "./Count.module.css";
import cls from "classnames";
import { useNewTravelStore } from "@/store/newTravel";

export default function Count() {
  const { headcount, setHeadcount } = useNewTravelStore();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === "") {
      setHeadcount(0);
      return;
    }
    if (parseInt(e.target.value) === 0) {
      setHeadcount(0);
      return;
    }
    setHeadcount(parseInt(e.target.value));
  };

  const handleCountButton = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: "add" | "substract"
  ) => {
    if (value === "add") {
      setHeadcount(headcount + 1);
    } else if (value === "substract") {
      if (headcount === 0) {
        return;
      }
      setHeadcount(headcount - 1);
    }
  };
  return (
    <div className={styles.container}>
      <button
        onClick={(e) => handleCountButton(e, "substract")}
        disabled={headcount === 0}
        className={cls(headcount === 0 ? styles.disabled : styles.substract)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 12L4 12" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <input
        id="count"
        type="text"
        className={styles.countInput}
        value={headcount.toString()}
        onChange={handleChange}
      />
      <button
        onClick={(e) => handleCountButton(e, "add")}
        className={styles.add}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L12 20M20 12L4 12"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
