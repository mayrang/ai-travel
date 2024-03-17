import React from "react";
import styles from "./about.module.css";
export default function AboutPage() {
  return (
    <div className={styles.main}>
      <h2 className={styles.title}> 저작권 정보</h2>
      <div className={styles.content}>
        Nucleus UI는 Nucleus UI가 제작하였으며 CC BY 4.0 라이센스에 따라 사용되었습니다.
        <br />
        저작권 © 2023 Nucleus UI. 모든 권리 보호됨.
      </div>
      <div className={styles.bar}></div>
      <h2 className={styles.title2}>Copyright Information</h2>
      <div className={styles.content}>
        Nucleus UI is created by Nucleus UI and used under the CC BY 4.0 license.
        <br /> Copyright © 2023 Nucleus UI. All rights reserv
      </div>
    </div>
  );
}
