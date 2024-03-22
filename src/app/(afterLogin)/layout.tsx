import React from "react";
import MobileHeader from "./_component/MobileHeader";
import RQProvider from "./_component/RQProvider";

type Props = {
  children: React.ReactNode;
};

export default function AfterLoginLayout({ children }: Props) {
  console.log("home");
  return (
    <main className="relative">
      <RQProvider>
        <MobileHeader />
        {children}
        <div id="menu"></div>
      </RQProvider>
    </main>
  );
}
