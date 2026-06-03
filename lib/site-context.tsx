"use client";

import { createContext, useContext } from "react";
import { mockSiteSettings } from "@/lib/sanity/mock-data";
import type { SiteSettings } from "@/lib/sanity/types";

const SiteSettingsContext = createContext<SiteSettings>(mockSiteSettings);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
