import { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./_component/AuthProvider";
import Head from "next/head";

const icon = {
  path: "M 100 100 L 300 100 L 200 300 z",
  fillColor: "red",
  strokeColor: "blue",
  strokeWidth: 3,
};

// export const metadata: Metadata = {
//   title: {
//     default: "outstagram",
//     template: "outstagram | %s",
//   },
//   description: "아싸들을 위한 SNS",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="desktop">
          <AuthProvider>{children}</AuthProvider>
        </div>
        <div className="rightSection"></div>
        <div className="leftSection"></div>
      </body>
    </html>
  );
}
