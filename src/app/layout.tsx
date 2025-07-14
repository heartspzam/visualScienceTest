import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visual Science",
  description:
    "Homepage of Visual Science, a website for learning science through simulations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
