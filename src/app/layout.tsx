import type { Metadata } from "next";
import { Neucha, Cormorant_Infant } from "next/font/google";
import "./globals.css";
import { SVGFilters } from "@/components/SVGFilters";
import { createClient } from "@/prismicio";

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

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return {
    title: settings.data.site_title,
    description: settings.data.meta_description,
    openGraph: {
      images: settings.data.fallback_og_image.url || undefined,
    },
  };
}

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
