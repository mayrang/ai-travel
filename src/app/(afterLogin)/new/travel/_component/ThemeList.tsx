"use client";
import React from "react";
import styles from "./ThemeList.module.css";
import { THEME_LIST } from "@/app/_lib/themeList";
import cls from "classnames";
import { useNewTravelStore } from "@/store/newTravel";
export default function ThemeList() {
  const { appendThemes, themes } = useNewTravelStore();
  const filteredThemeList = THEME_LIST.filter(
    ({ item }) => !themes.some((theme) => theme.item === item)
  );
  const handleAppendTheme = (
    _: React.MouseEvent<HTMLButtonElement>,
    theme: { item: string; color: string; english: string }
  ) => {
    appendThemes(theme);
  };
  return (
    <section className={styles.container}>
      <label className={styles.label}>테마 목록</label>
      <ul className={styles.themeList}>
        {filteredThemeList.map((theme) => (
          <li key={theme.item}>
            <button
              onClick={(e) => handleAppendTheme(e, theme)}
              className={cls(
                styles.theme,
                theme.color === "blue" && styles.blue,
                theme.color === "green" && styles.green
              )}
            >
              {theme.item}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
