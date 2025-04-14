import type { Metadata } from "next";
import "./ui/globals.css";

export const metadata: Metadata = {
  title: "real nextjs project",
  description: "first next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        {children}
      </body>
    </html>
  );
}
