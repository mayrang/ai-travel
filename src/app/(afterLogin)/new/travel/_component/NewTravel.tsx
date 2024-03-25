"use client";
import { useAddPageStore } from "@/store/AddPage";
import React from "react";
import SelectDate from "./SelectDate";
import NewEvent from "./NewEvent";
import { notFound } from "next/navigation";

export default function NewTravel() {
  const { page } = useAddPageStore();
  if (page === "date") {
    return <SelectDate />;
  }
  if (page === "event") {
    return <NewEvent />;
  }

  notFound();
}
