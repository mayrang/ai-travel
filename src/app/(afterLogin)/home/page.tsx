import Link from "next/link";
import React from "react";
import styles from "./home.module.css";
import axios from "axios";

export default async function page() {
  console.log("check home");
  const response = await axios.get(
    `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${2024}&solMonth=${"11"}&ServiceKey=${
      process.env.NEXT_PUBLIC_HOLIDAY_API_KEY
    }`
  );

  console.log(response.data.response?.body?.items?.item || []);

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
