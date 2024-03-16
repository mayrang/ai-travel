"use client";
import React from "react";
import styles from "./MobileHeader.module.css";
import BackButton from "@/app/_component/BackButton";
import MenuButton from "@/app/_component/MenuButton";

export default function MobileHeader() {
  return (
    <header className={styles.header}>
      <BackButton />
      <div>타이틀</div>
      <MenuButton />
    </header>
  );
}
