"use client";
import { useAddPageStore } from "@/store/AddPage";
import React from "react";

export default function AddPageHeaderButton() {
  const { setPage, page } = useAddPageStore();
  const handlePage = () => {
    if (page === "date") {
      setPage("event");
    } else if (page === "event") {
      setPage("detail");
    }
  };
  if (page === "detail") {
    return null;
  }
  return <button onClick={handlePage}>다음</button>;
}
