import "@/styles/globals.css";
import { Metadata } from "next";

import clsx from "clsx";
import { Providers } from "../providers";

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
          <div className="overflow-x-hidden">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
