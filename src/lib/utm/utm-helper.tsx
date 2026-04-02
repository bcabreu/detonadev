"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const parseUTMs = (searchParams: URLSearchParams) => {
  return {
    utm_source: searchParams.get("utm_source") || "",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_content: searchParams.get("utm_content") || "",
    utm_term: searchParams.get("utm_term") || "",
    gclid: searchParams.get("gclid") || "",
    fbclid: searchParams.get("fbclid") || "",
  };
};

export const getSavedUTMs = () => {
  if (typeof window === "undefined") return {};
  const saved = sessionStorage.getItem("kp_utms");
  return saved ? JSON.parse(saved) : {};
};

/**
 * Componente Client para ser colocado no RootLayout e capturar UTMs no load
 */
export function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    const utms = parseUTMs(searchParams);
    
    // Salva apenas se houver pelo menos um parâmetro relevante
    if (Object.values(utms).some((val) => val !== "")) {
      // Usamos sessionStorage pela resiliência durante navegação
      sessionStorage.setItem("kp_utms", JSON.stringify(utms));
    }
  }, [searchParams]);

  return <></>; // renderless provider
}
