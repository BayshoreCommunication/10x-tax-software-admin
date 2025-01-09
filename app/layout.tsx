import "@/styles/globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://10x-tax-software-admin.vercel.app"),
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
