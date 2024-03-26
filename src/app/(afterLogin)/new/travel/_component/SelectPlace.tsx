"use client";
import React, { MouseEventHandler, useState } from "react";
import styles from "./SelectPlace.module.css";
import BottomModal from "@/app/_component/BottomModal";
import SearchInput from "@/app/_component/SearchInput";
export default function SelectPlace() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) return;
    setOpenModal(false);
  };
  //   const handleText = async () => {
  //     const result = await fetch(
  //       `http://localhost:3000/api/search/city?query=${"나고야"}`
  //     );
  //     const data = await result.json();
  //     console.log("result", JSON.parse(data.data));
  //   };
  return (
    <>
      <article className={styles.container}>
        <h3 className={styles.title}>여행지 추가</h3>
        <div className={styles.description}>
          이번 여행에서 가고 싶은 여행지를 추가해 주세요!
        </div>
        <button onClick={handleOpenModal} className={styles.newButton}>
          +
        </button>
      </article>
      {openModal && (
        <BottomModal handleClose={handleClose}>
          <SearchInput />
        </BottomModal>
      )}
    </>
  );
}
