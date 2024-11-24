import "@/styles/globals.css";
import { Metadata } from "next";

import clsx from "clsx";
import { Providers } from "../providers";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://tampa-motion-website.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={clsx("antialiased")}>
        <Providers themeProps={{ attribute: "class" }}>
          <div className="flex items-start">
            <div className="2xl:w-[15%] xl:w-[22%] lg:w-[30%]">
              <Sidebar />
            </div>
            <div className="overflow-x-hidden 2xl:w-[85%] xl:w-[78%] lg:w-[70%]">
              <TopNavbar />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
