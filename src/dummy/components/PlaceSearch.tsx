"use client";
import React, { useState, useEffect } from "react";
import styles from "./PlaceSearch.module.css"
const PlaceSearch = () => {
  const [places, setPlaces] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

  useEffect(() => {
    if (query) {
      fetch(`/api/search?query=${query}`)
        .then((response) => response.json()) // JSON 데이터 파싱
        .then((data) => {
          console.log(data.data); // 파싱된 데이터 출력
          setPlaces(data.data);
        })
        .catch((error) => {
          console.error("Error fetching places:", error);
        });
    }
  }, [query]);
  console.log()
  return (
    <form className={styles.main}>
      <h1>장소 검색</h1>
      <input type="text" placeholder="장소 검색" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {places && places?.map((place) => (
          <li key={place.place_id}>{place.name}</li>
        ))}
      </ul>
    </form>
  );
};

export default PlaceSearch;
