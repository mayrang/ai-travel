import React from "react";
import styles from "./BottomFixedButton.module.css";
type Props = {
  handler: () => void;
  text: string;
};

export default function BottomFixedButton({ handler, text }: Props) {
  return (
    <button onClick={handler} className={styles.button}>
      {text}
    </button>
  );
}
