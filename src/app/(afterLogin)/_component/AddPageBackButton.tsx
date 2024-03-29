"use client";

import { useAddPageStore } from "@/store/addPage";
import { useStepStore } from "@/store/step";
import { useRouter } from "next/navigation";
import React from "react";

export default function AddPageBackButton() {
  const { page, setPage } = useAddPageStore();
  const { step, setStep } = useStepStore();
  const router = useRouter();
  const handleBack = () => {
    if (page === "title") {
      switch (step) {
        case 1:
          router.back();
          break;
        case 2:
          setStep(1);
          break;
        case 3:
          setStep(2);
          break;
        case 4:
          setStep(3);
      }

      return;
    } else if (page === "date") {
      setPage("title");
    } else if (page === "event") {
      setPage("date");
    } else if (page === "detail") {
      setPage("event");
    }
    return;
  };
  return (
    <button onClick={handleBack}>
      <svg
        width="27"
        height="27"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9.31461 12.7071C8.89513 12.3166 8.89513 11.6834 9.31461 11.2929L15 5.99998"
          stroke="#131214"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
