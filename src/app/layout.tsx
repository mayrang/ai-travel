import { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./_component/AuthProvider";

// export const metadata: Metadata = {
//   title: {
//     default: "outstagram",
//     template: "outstagram | %s",
//   },
//   description: "아싸들을 위한 SNS",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="desktop">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
