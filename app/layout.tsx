import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Berliner Hilfetelefon für Frauen | Dashboard",
  description:
    "Das Berliner Hilfetelefon für Frauen ist ein Anlaufpunkt für alle Frauen, die in Berlin leben und sich in Not befinden. Wir bieten professionelle Beratung und Unterstützung in allen Themenbereichen.",
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
