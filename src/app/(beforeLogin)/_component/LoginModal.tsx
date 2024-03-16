"use client";
import { useRouter } from "next/navigation";
import styles from "./LoginModal.module.css";
import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import CloseButton from "@/app/_component/CloseButton";
import { signIn } from "next-auth/react";
export default function LoginModal() {
  const router = useRouter();
  const clickBack: MouseEventHandler<HTMLDivElement> = (e) => {
    router.back();
  };

  const clickChild: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const clickKakaoLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    try {
      await signIn("kakao", {
        redirect: true,
        callbackUrl: "/home",
      });
    } catch (err) {
      console.error(err);
      alert("로그인 과정에서 에러가 발생했습니다.");
    }
  };

  return (
    <div onClick={clickBack} className={styles.background}>
      <motion.div
        onClick={clickChild}
        initial={{ translateY: "100%" }}
        animate={{ translateY: 0 }}
        transition={{
          duration: 0.5,
          ease: "linear",
        }}
        className={styles.main}
      >
        <div className={styles.header}>
          <CloseButton />
        </div>
        <h1 className={styles.title}>로그인</h1>
        <button onClick={clickKakaoLogin} className={styles.kakaoButton}>
          <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              opacity="0.902"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.5343 0.30545C6.7424 0.30545 0.556152 5.76493 0.556152 10.3837C0.556152 13.8445 2.80281 16.8973 6.22472 18.7114L4.78559 23.9978C4.65725 24.4664 5.18935 24.8385 5.59744 24.5688L11.9092 20.3798C12.4413 20.4317 12.9835 20.462 13.5343 20.462C20.7011 20.462 26.5125 15.9499 26.5125 10.3837C26.5125 5.76493 20.7011 0.30545 13.5343 0.30545Z"
              fill="black"
            />
          </svg>
          카카오로 로그인 하기
        </button>
      </motion.div>
    </div>
  );
}
