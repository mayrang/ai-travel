"use client";
import { useAddPageStore } from "@/store/addPage";
import React from "react";
import SelectDate from "./SelectDate";
import NewEvent from "./NewEvent";
import { notFound } from "next/navigation";
import NewTravelTitle from "./NewTravelTitle";

export default function NewTravel() {
  const { page } = useAddPageStore();
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
