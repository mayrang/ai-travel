import Link from "next/link";
import React from "react";
import styles from "./home.module.css";
import axios from "axios";

export default async function page() {
  
  return (
    <div>
      home
      <Link href={"/new/travel"} className={styles.addButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L12 20M20 12L4 12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        여행 추가
      </Link>
    </div>
  );
}
