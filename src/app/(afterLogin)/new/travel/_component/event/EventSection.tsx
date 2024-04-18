"use client";

import { useState } from "react";
import SectionTab from "./SectionTab";
import SectionContainer from "./SectionContainer";

export default function EventSection() {
  const [section, setSection] = useState<"new" | "recommand" | "search">("new");

  const toggleSection = (value: "new" | "recommand" | "search") => {
    setSection(value);
  };

  return (
    <SectionContainer>
      <SectionTab onClick={toggleSection} section={section} />
    </SectionContainer>
  );
}
