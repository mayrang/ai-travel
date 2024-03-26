"use client";
import React from "react";
import { createPortal } from "react-dom";

export default function MenuPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  // browser 환경일때만 ssr방지
  if (typeof window === "undefined") {
    return null;
  }
  const menuElement = document.querySelector("#bottom-modal");
  return createPortal(children, menuElement as Element);
}
