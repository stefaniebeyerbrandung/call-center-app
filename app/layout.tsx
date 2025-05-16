import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

const base = localFont({
  src: [
    {
      path: "./fonts/Overpass-SemiBold.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Overpass-ExtraBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-base",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${base.variable}`}>
      <body className="font-base">{children}</body>
    </html>
  );
}
