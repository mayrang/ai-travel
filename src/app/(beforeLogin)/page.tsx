import Link from "next/link";
import styles from "./Home.module.css"
export default function BeforeLoginHomePage(){
    return (
        <div className={styles.main}>
            <div className={styles.titleSection}>
                <h1 className={styles.mainTitle}>Travel Map</h1>
                <span className={styles.subTitle}>AI를 통해 쉽게 여행 계획을 짜보세요!</span>
            </div>

            <Link href={"/signin"} className={styles.startButton}>로그인</Link>
        </div>
    )
}