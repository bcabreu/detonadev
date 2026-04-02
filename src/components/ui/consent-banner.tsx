"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";

// Optamos por ConsentBanner isolado sem Provider Global pra não englobar a tag <body> nem o <main> em Client Boundary.
export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kp_consent");
    if (!saved) {
      setShow(true);
    } else {
      const data = JSON.parse(saved);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "consent_update",
        ad_storage: data.marketing,
        analytics_storage: data.analytics
      });
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("kp_consent", JSON.stringify({ analytics: "granted", marketing: "granted" }));
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "consent_update",
        ad_storage: "granted",
        analytics_storage: "granted"
      });
    }
    setShow(false);
  };

  const declineAll = () => {
    localStorage.setItem("kp_consent", JSON.stringify({ analytics: "denied", marketing: "denied" }));
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "consent_update",
        ad_storage: "denied",
        analytics_storage: "denied"
      });
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div 
      role="dialog" 
      aria-label="Aviso de Privacidade e Cookies"
      className="fixed bottom-0 left-0 right-0 bg-popover border-t p-4 flex flex-col sm:flex-row items-center justify-between gap-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
    >
      <p className="text-sm font-medium text-popover-foreground">
        Usamos cookies e rastreadores analíticos estritamente de acordo com a LGPD para otimizar sua experiência de navegação. 
      </p>
      <div className="flex gap-3">
         <Button variant="outline" size="sm" onClick={declineAll} onKeyDown={declineAll}>
           Apenas Essenciais
         </Button>
         <Button size="sm" onClick={acceptAll} onKeyDown={acceptAll}>
           Aceitar e Continuar
         </Button>
      </div>
    </div>
  );
}
