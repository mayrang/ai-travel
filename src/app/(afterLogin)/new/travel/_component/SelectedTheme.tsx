"use client";
import { useNewTravelStore } from "@/store/newTravel";
import React from "react";
import styles from "./SelectedTheme.module.css";
import cls from "classnames";

export default function SelectedTheme() {
  const { themes, removeThemes, resetThemes } = useNewTravelStore();

  const handleRemoveTheme = (
    _: React.MouseEvent<HTMLButtonElement>,
    theme: { item: string; color: string }
  ) => {
    removeThemes(theme);
  };
  const handleReset = () => {
    resetThemes();
  };
  return (
    <section className={styles.container}>
      <div className={styles.label}>추가한 테마</div>
      <div className={styles.box}>
        <ul className={styles.themeList}>
          {themes.map((theme) => (
            <li key={theme.item}>
              <button
                onClick={(e) => handleRemoveTheme(e, theme)}
                className={cls(
                  styles.theme,
                  theme.color === "blue" && styles.blue,
                  theme.color === "green" && styles.green
                )}
              >
                <span>{theme.item}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4L8 8M8 8L12 12M8 8L12 4M8 8L4 12"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <button style={{ color: "#FF5247" }} onClick={handleReset}>
          초기화
        </button>
      </div>
    </section>
  );
}
