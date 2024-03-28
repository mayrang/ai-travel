"use client";
import { useAddPageStore } from "@/store/addPage";
import { useDateStore } from "@/store/date";
import React from "react";

export default function AddPageHeaderButton() {
  const { setPage, page } = useAddPageStore();
  const { setDate, setPost } = useDateStore();
  const handlePage = () => {
    if (page === "date") {
      setDate(null, null);
      setPost([]);
    } else if (page === "event") {
      setPage("detail");
    }
  };
  if (page === "detail") {
    return null;
  }
  if (page === "title") {
    return null;
  }
  if (page === "date") {
    return <button onClick={handlePage}>초기화</button>;
  }
  if (page === "event") {
    return <button onClick={handlePage}>다음</button>;
  }
  return null;
}
