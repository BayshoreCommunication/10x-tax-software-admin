import "@/styles/globals.css";
import { Metadata } from "next";

import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import GlobalToast from "@/components/shared/GlobalToast";
import clsx from "clsx";
import { Providers } from "../providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://10x-tax-software-admin.vercel.app"),
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
        <Providers themeProps={{ attribute: "className" }}>
          <div className="flex items-start">
            <GlobalToast />
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
