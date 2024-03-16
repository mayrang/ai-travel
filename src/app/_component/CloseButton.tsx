"use client";

import { useRouter } from "next/navigation";

type Props = {
  width?: number;
  onClick?: () => void;
};

export default function CloseButton({ width = 24, onClick }: Props) {
  const router = useRouter();

  const clickClose = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button onClick={clickClose}>
      <svg
        width={width}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
      >
        <g>
          <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
        </g>
      </svg>
    </button>
  );
}
