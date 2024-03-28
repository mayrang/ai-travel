"use clinet";
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import styles from "./Count.module.css";
import cls from "classnames";
type Props = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};
export default function Count({ count, setCount }: Props) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === "") {
      setCount(0);
      return;
    }
    if (parseInt(e.target.value) === 0) {
      setCount(0);
      return;
    }
    setCount(parseInt(e.target.value));
  };

  const handleCountButton = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: "add" | "substract"
  ) => {
    if (value === "add") {
      setCount((prev) => prev + 1);
    } else if (value === "substract") {
      if (count === 0) {
        return;
      }
      setCount((prev) => prev - 1);
    }
  };
  return (
    <div className={styles.container}>
      <button
        onClick={(e) => handleCountButton(e, "substract")}
        disabled={count === 0}
        className={cls(count === 0 ? styles.disabled : styles.substract)}
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
        value={count.toString()}
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
