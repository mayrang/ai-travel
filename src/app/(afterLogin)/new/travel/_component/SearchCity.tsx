"use client";
import SearchInput from "@/app/_component/SearchInput";
import useDebounce from "@/app/_lib/useDebounce";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { getSearchCity } from "../_lib/getSearchCity";
import styles from "./SearchCity.module.css";
import { useNewTravelStore } from "@/store/newTravel";
import { SyncLoader } from "react-spinners";
type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchCity({ setOpenModal }: Props) {
  const [value, setValue] = useState("");
  const { appendCities } = useNewTravelStore();
  const debouncedValue = useDebounce(value, 2000);
  const { data, isFetching, isLoading, isPending } = useQuery({
    queryKey: ["search", "city", debouncedValue],
    queryFn: getSearchCity,
    staleTime: 60 * 1000 * 60 * 5,
  });
  const changeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleAddCity = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: { city: string; country: string }
  ) => {
    appendCities(`${item.city},${item.country}`);
    setOpenModal(false);
  };

  console.log(isFetching, isPending, isLoading);

  return (
    <div className={styles.container}>
      <SearchInput value={value} changeValue={changeValue} />
      {isLoading ? (
        <div className={styles.loader}>
          <SyncLoader
            color="#23C16B"
            style={{ zIndex: 200 }}
            size={10}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
        <>
          {data && data.city && <h4 className={styles.title}>검색 결과</h4>}
          <ul className={styles.list}>
            {data && data.city && (
              <li
                onClick={(e) => handleAddCity(e, data)}
                className={styles.item}
                key={data.city}
              >
                <span className={styles.city}>{data.city}</span>
                <span className={styles.country}>{data.country}</span>
              </li>
            )}
            {data && data.result && (
              <div className={styles.subTitle}>이런 여행지는 어떠신가요? </div>
            )}
            {data &&
              data.result &&
              data?.result.map((item) => (
                <li
                  onClick={(e) => handleAddCity(e, item)}
                  className={styles.item}
                  key={item.city}
                >
                  <span className={styles.city}>{item.city}</span>
                  <span className={styles.country}>{item.country}</span>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
