import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "@/components/layout/RootLayoutClient";
import { getSiteSettings } from "@/lib/db-server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: `${settings.companyName} | Premium Real Estate & Construction`,
      template: `%s | ${settings.companyName}`
    },
    description: settings.heroSubtitle,
    keywords: [
      "Bhimavaram Construction",
      "Real Estate Bhimavaram",
      "Apartments for sale Bhimavaram",
      "Rayalam Road Apartments",
      "Pile Foundation West Godavari",
      "2 BHK Apartment Bhimavaram",
      "3 BHK Apartment Bhimavaram"
    ],
    metadataBase: new URL("http://localhost:3000")
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-luxury-bg text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <RootLayoutClient settings={settings}>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  );
}
