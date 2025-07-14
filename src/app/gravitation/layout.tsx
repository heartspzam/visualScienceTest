import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Visual Science | Gravitation",
  description:
    "Learn about the gravitation force using Visual Science's simulation.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
