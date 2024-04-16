import Link from "next/link";
import React from "react";
import styles from "./home.module.css";
import axios from "axios";

export default async function page() {
  return (
    <div>
      home
      <svg
        style={{ marginTop: 100 }}
        xmlns="http://www.w3.org/2000/svg"
        height="30"
        width="22.5"
        viewBox="0 0 384 512"
      >
        <path
          fill="#7DDE86"
          d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"
        />
      </svg>
      <Link href={"/new/travel"} className={styles.addButton}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L12 20M20 12L4 12"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        여행 추가
      </Link>
    </div>
  );
}
