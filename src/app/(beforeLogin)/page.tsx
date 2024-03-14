import Link from "next/link";
import styles from "./Home.module.css"
import { auth } from "@/auth";
import LogoutButton from "../_component/LogoutButton";
export default async function BeforeLoginHomePage(){
    const session = await auth();
    console.log("session", session)
    return (
        <div className={styles.main}>
            <div className={styles.titleSection}>
                <h1 className={styles.mainTitle}>Travel Map</h1>
                <span className={styles.subTitle}>AI를 통해 쉽게 여행 계획을 짜보세요!</span>
            </div>
            <LogoutButton />
            <Link href={"/signin"} className={styles.startButton}>로그인</Link>
        </div>
    )
}