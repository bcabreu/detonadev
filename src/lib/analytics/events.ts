export const trackEvent = (eventName: string, data: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...data,
    });
  }
};

export const trackLead = (source: string, leadData: Record<string, unknown> = {}) => {
  trackEvent("generate_lead", { lead_source: source, ...leadData });
};

export const trackFormSubmit = (formId: string) => {
  trackEvent("form_submit", { form_id: formId });
};

export const trackCTA = (ctaName: string, type: "primary" | "secondary" = "primary") => {
  trackEvent(`click_cta_${type}`, { cta_name: ctaName });
};

export const trackWhatsAppClick = (intent?: string) => {
  trackEvent("click_whatsapp", { intent });
};

export const trackPhoneClick = () => {
  trackEvent("click_phone");
};

export const trackSectionView = (sectionName: string) => {
  trackEvent("view_section", { section_name: sectionName });
};
