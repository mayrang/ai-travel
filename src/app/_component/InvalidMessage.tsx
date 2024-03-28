import React from "react";
import styles from "./InvalidMessage.module.css";
type Props = {
  message: string;
  size?: number;
};

export default function InvalidMessage({ message, size = 14 }: Props) {
  return (
    <div className={styles.message} style={{ fontSize: size }}>
      {message}
    </div>
  );
}
