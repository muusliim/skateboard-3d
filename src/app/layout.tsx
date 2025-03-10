import type { Metadata } from "next";
import { Neucha, Cormorant_Infant } from "next/font/google";
import "./globals.css";
import { SVGFilters } from "@/components/SVGFilters";

const neucha = Neucha({
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-neucha",
  weight: "400",
});

const cormorant = Cormorant_Infant({
  subsets: ["cyrillic"],
  display: "swap",
  variable: "--font-cormorant",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${neucha.variable} ${cormorant.variable} font-mono font-medium text-zinc-800 antialiased`}
      >
        <main>{children}</main>
        <SVGFilters />
      </body>
    </html>
  );
}
