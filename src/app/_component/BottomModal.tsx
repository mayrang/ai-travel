"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./BottomModal.module.css";

type Props = {
  children: React.ReactNode;
  handleClose: (e: React.MouseEvent<HTMLDivElement>) => void;
  height: number | string;
};

export default function BottomModal({ children, handleClose, height }: Props) {
  return (
    <div className={styles.background} onClick={handleClose}>
      <motion.div
        className={styles.main}
        style={{ height: height }}
        initial={{ translateY: "100%" }}
        animate={{ translateY: 0 }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
