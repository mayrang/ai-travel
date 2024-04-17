"use client";
import React, { MouseEventHandler, useState } from "react";
import styles from "./SelectPlace.module.css";
import BottomModal from "@/app/_component/BottomModal";
import SearchCity from "./SearchCity";
import { useNewTravelStore } from "@/store/newTravel";
import { useStepStore } from "@/store/step";
import BottomFixedButton from "@/app/(afterLogin)/_component/BottomFixedButton";
import { City } from "@/model/search";
export default function SelectPlace() {
  const { setStep } = useStepStore();
  const [openModal, setOpenModal] = useState(false);
  const { cities, removeCities } = useNewTravelStore();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleNextStep = () => {
    if (cities.length === 0) {
      alert("가시고 싶은 도시를 하나 이상 추가해주세요!");
      return;
    }
    setOpenModal(false);

    setStep(2);
  };

  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (e.target !== e.currentTarget) return;
    setOpenModal(false);
  };

  const handleRemoveCity = (_: React.MouseEvent<HTMLLIElement>, city: City) => {
    removeCities(city);
  };

  return (
    <>
      <article className={styles.container}>
        <h3 className={styles.title}>어디로 떠나시나요?</h3>
        <div className={styles.description}>
          이번 여행에서 가고 싶은 도시를 추가해 주세요!
        </div>
        <button onClick={handleOpenModal} className={styles.newButton}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7292 10.8148C18.7292 14.4197 15.577 17.6744 13.5603 19.3877C12.5993 20.2041 11.2295 20.2041 10.2686 19.3877C8.25185 17.6743 5.09961 14.4197 5.09961 10.8148C5.09961 9.00741 5.8176 7.27404 7.09562 5.99601C8.37365 4.71799 10.107 4 11.9144 4C13.7218 4 15.4552 4.71799 16.7332 5.99601C18.0112 7.27404 18.7292 9.00741 18.7292 10.8148Z"
              stroke="#131214"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.9144 13.0864C13.169 13.0864 14.186 12.0694 14.186 10.8148C14.186 9.56024 13.169 8.54321 11.9144 8.54321C10.6598 8.54321 9.64282 9.56024 9.64282 10.8148C9.64282 12.0694 10.6598 13.0864 11.9144 13.0864Z"
              stroke="#131214"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          도시 추가하기
        </button>

        {cities.length > 0 && (
          <>
            <h4 className={styles.selectedTitle}>추가한 도시</h4>

            <ul className={styles.list}>
              {cities.map((city) => (
                <li
                  onClick={(e) => handleRemoveCity(e, city)}
                  className={styles.item}
                  key={city.city}
                >
                  <span className={styles.city}>{city.city}</span>
                  <span className={styles.country}>{city.country}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {cities.length > 0 && (
          <BottomFixedButton
            handler={handleNextStep}
            text={`${cities.length}개 도시 선택 · 다음`}
          />
        )}
      </article>
      {openModal && (
        <BottomModal height={"66%"} handleClose={handleClose}>
          <SearchCity setOpenModal={setOpenModal} />
        </BottomModal>
      )}
    </>
  );
}
