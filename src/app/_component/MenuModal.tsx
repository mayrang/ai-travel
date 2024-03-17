"use client";
import React from "react";
import styles from "./MenuModal.module.css";
import { motion } from "framer-motion";
import CloseButton from "./CloseButton";
import { auth } from "@/auth";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Props = {
  setClose: () => void;
};

export default function MenuModal({ setClose }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className={styles.background}>
      <motion.div
        className={styles.main}
        initial={{ translateX: "100%" }}
        animate={{ translateX: 0 }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%", // body 구역을 꽉 채우도록 설정
          height: "100%", // body 구역을 꽉 채우도록 설정
          overflow: "hidden", // 내용이 넘칠 경우를 방지하기 위해 overflow를 hidden으로 설정
        }}
      >
        <div className={styles.header}>
          <CloseButton onClick={setClose} width={27} />
        </div>
        <div className={styles.profile}>
          <img src={session?.user?.image || ""} alt={session?.user?.name || "user profile"} />
          <span className={styles.userName}>{session.user.name}</span>
        </div>
        <button className={styles.profileButton}>프로필 보기</button>
        <ul className={styles.routerList}>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.44444 7H20M8.44444 12.3333H20M8.44444 17.6667H20M4 7H4.00889M4 12.3333H4.00889M4 17.6667H4.00889"
                stroke="#131214"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            여행목록
          </li>
          <li>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.44444 7H20M8.44444 12.3333H20M8.44444 17.6667H20M4 7H4.00889M4 12.3333H4.00889M4 17.6667H4.00889"
                stroke="#131214"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            여행목록
          </li>
        </ul>
        <div className={styles.bar}></div>
        <ul className={styles.footer}>
          <li>About</li>
          <li>
            <button>Log out</button>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
