import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Inter } from "next/font/google";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://tampa-motion-website.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("antialiased", inter.className)}>
        <Providers themeProps={{ attribute: "class" }}>
          <div className="overflow-x-hidden">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
