"use client";
import { useAddPageStore } from "@/store/addPage";
import React from "react";
import SelectDate from "./calendar/SelectDate";
import NewEvent from "./event/NewEvent";
import { notFound } from "next/navigation";
import NewTravelTitle from "./NewTravelTitle";

export default function NewTravel() {
  const { page } = useAddPageStore();
  console.log("page", page);
  if (page === "title") {
    return <NewTravelTitle />;
  }
  if (page === "date") {
    return <SelectDate />;
  }
  if (page === "event") {
    return <NewEvent />;
  }

  notFound();
}
