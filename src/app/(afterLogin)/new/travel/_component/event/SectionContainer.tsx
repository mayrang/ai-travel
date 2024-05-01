import { ReactNode } from "react";
import styles from "./SectionContainer.module.css";
import cls from "classnames";
type Props = {
  children: ReactNode;
};

export default function SectionContainer({ children }: Props) {
  return (
    <div className={cls(styles.container, styles.default)}>
      <div className={styles.bar}></div>
      {children}
    </div>
  );
}
