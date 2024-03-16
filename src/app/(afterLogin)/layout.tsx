import React from "react";
import MobileHeader from "./_component/MobileHeader";

type Props = {
  children: React.ReactNode;
};

export default function AfterLoginLayout({ children }: Props) {
  console.log("home");
  return (
    <main>
      <MobileHeader />
      {children}
      <div id="menu"></div>
    </main>
  );
}
