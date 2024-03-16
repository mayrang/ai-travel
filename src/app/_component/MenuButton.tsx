"use client";
import React, { useState } from "react";
import MenuPortal from "./MenuPortal";
import MenuModal from "./MenuModal";

export default function MenuButton() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpen = () => {
    setOpenMenu(true);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };
  return (
    <>
      <button onClick={handleOpen}>
        <svg width="27" height="27" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 11.6667H4M20 5H4M20 18.3333H4" stroke="#131214" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {openMenu && (
        <MenuPortal>
          <MenuModal setClose={handleClose} />
        </MenuPortal>
      )}
    </>
  );
}
