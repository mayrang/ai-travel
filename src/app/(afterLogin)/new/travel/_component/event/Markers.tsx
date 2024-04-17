"use client";
import React from "react";
import { MarkerF } from "@react-google-maps/api";
import useRecommand from "../../_lib/useRecommand";

export default function Markers() {
  const { data } = useRecommand(); // 얘는 전역 상태에서 가져오는걸로 변경

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <MarkerF key={item.place_id} position={item.geometry.location} />
        ))}
    </>
  );
}
