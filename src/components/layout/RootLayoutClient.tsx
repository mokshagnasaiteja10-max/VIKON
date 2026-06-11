"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "./WhatsAppWidget";
import { SiteSettings } from "@/types";

interface RootLayoutClientProps {
  children: React.ReactNode;
  settings: SiteSettings;
}

export default function RootLayoutClient({ children, settings }: RootLayoutClientProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header settings={settings} />
      <main className="flex-grow">{children}</main>
      <Footer settings={settings} />
      <WhatsAppWidget settings={settings} />
    </>
  );
}
