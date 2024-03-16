import React from "react";
import styles from "./layout.module.css";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function BeforeLoginLayout({ children, modal }: Props) {
  return (
    <main className={styles.main}>
      {children}
      {modal}
    </main>
  );
}
