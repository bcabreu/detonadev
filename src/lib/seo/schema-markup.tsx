export function SchemaMarkup({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Helpers de Schema Prontos
export const getLocalBusinessSchema = (businessData: Record<string, unknown>) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  ...businessData
});

export const getOrganizationSchema = (orgData: Record<string, unknown>) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  ...orgData
});

export const getFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
