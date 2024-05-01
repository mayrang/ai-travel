"use client";

import { useState } from "react";
import SectionContainer from "./SectionContainer";
import SelectedPlaces from "./SelectedPlaces";

export default function EventSection() {
  const [section, setSection] = useState<"new" | "recommand" | "search">("new");

  const toggleSection = (value: "new" | "recommand" | "search") => {
    setSection(value);
  };

  return (
    <SectionContainer>
      <SelectedPlaces />
    </SectionContainer>
  );
}
