"use client";
import React, { ChangeEvent } from "react";
import styles from "./SearchInput.module.css";

type Props = {
  value: string;
  changeValue: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({ value, changeValue }: Props) {
  return (
    <div className={styles.container}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3333 13.3334L10.7555 10.7556M12.1481 7.40749C12.1481 10.0257 10.0256 12.1482 7.40739 12.1482C4.78916 12.1482 2.66666 10.0257 2.66666 7.40749C2.66666 4.78925 4.78916 2.66675 7.40739 2.66675C10.0256 2.66675 12.1481 4.78925 12.1481 7.40749Z"
          stroke="#131214"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        value={value}
        onChange={changeValue}
        type="text"
        placeholder="도시를 검색해 보세요"
        className={styles.input}
      />
    </div>
  );
}
