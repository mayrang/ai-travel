"use client";
import SearchInput from "@/app/_component/SearchInput";
import useDebounce from "@/app/_lib/useDebounce";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
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
  const debouncedValue = useDebounce(value, 1000);
  const { data, isFetching, isLoading, isPending } = useQuery({
    queryKey: ["search", "city", debouncedValue],
    queryFn: getSearchCity,
    staleTime: 60 * 1000 * 60 * 5,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data === null && !isLoading) {
      queryClient.removeQueries({
        queryKey: ["search", "city", debouncedValue],
      });
    }
  }, [data]);
  const changeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleAddCity = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: { city: string; country: string; lat: number; lng: number }
  ) => {
    appendCities({
      city: item.city,
      country: item.country,
      lat: typeof item.lat === "number" ? item.lat : parseFloat(item.lat),
      lng: typeof item.lng === "number" ? item.lng : parseFloat(item.lng),
    });
    setOpenModal(false);
  };

  console.log("check data", data);

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
            {data && data.city && (
              <div className={styles.subTitle}>
                {data.city} 근처 도시는 어떠신가요?{" "}
              </div>
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
