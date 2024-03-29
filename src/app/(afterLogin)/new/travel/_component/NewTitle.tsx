"use client";
import React, { ChangeEventHandler } from "react";
import styles from "./NewTitle.module.css";
import TextAreaAutoSize from "react-textarea-autosize";
import BottomFixedButton from "@/app/(afterLogin)/_component/BottomFixedButton";
import { useAddPageStore } from "@/store/addPage";
import { useNewTravelStore } from "@/store/newTravel";
export default function NewTitle() {
  const { setPage } = useAddPageStore();
  const { title, setTitle } = useNewTravelStore();

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTitle(e.target.value);
  };

  const handleNextPage = () => {
    setPage("date");
    return;
  };
  return (
    <article className={styles.container}>
      <h2 className={styles.title}>나만의 여행 제목을 만들어보세요!</h2>
      <div className={styles.description}>
        이번 여행에 이름을 붙이고 싶다면 자유롭게 제목을 입력해주세요. 입력하지 않을 경우, 우리가 임의로 제목을 정할
        거에요.
      </div>
      <TextAreaAutoSize className={styles.input} value={title} onChange={handleChange} />
      <BottomFixedButton handler={handleNextPage} text={"다음"} />
    </article>
  );
}
