import React, { useEffect } from "react";
import { SERVICE_CATEGORIES } from "../../data/agencyData";
import { SITE_CONFIG } from "../../config/siteConfig";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface JsonLdFAQSchemaProps {
  customFaqs?: FAQItem[];
  serviceCategory?: string;
  includeAgencyFaqs?: boolean;
  includeServiceFaqs?: boolean;
}

/**
 * Generate standard Schema.org FAQPage structured data dynamically
 */
export function generateFaqSchemaData(
  customFaqs: FAQItem[] = [],
  includeAgencyFaqs: boolean = true,
  includeServiceFaqs: boolean = true,
  categoryFilter?: string
) {
  const faqList: Array<{ question: string; answer: string }> = [];

  // 1. Dynamic Service FAQs derived directly from agency data
  if (includeServiceFaqs) {
    const categoriesToInclude = categoryFilter
      ? SERVICE_CATEGORIES.filter((c) => c.id === categoryFilter)
      : SERVICE_CATEGORIES;

    categoriesToInclude.forEach((cat) => {
      // Category-level FAQ
      faqList.push({
        question: `What ${cat.title.toLowerCase()} does Puhayt Digital provide?`,
        answer: `Puhayt Digital provides enterprise-grade ${cat.title.toLowerCase()}: ${cat.description} Our core capabilities include: ${cat.items.map((i) => `${i.name} (${i.tagline})`).join(", ")}. Every project is delivered with sub-second performance, zero subcontracting, and real-time client portal visibility.`,
      });

      // Item-level FAQs for popular / flagship capabilities
      cat.items.forEach((item) => {
        if (item.popular) {
          faqList.push({
            question: `How does Puhayt Digital engineer ${item.name}?`,
            answer: `${item.description} Key deliverables include ${item.features.join(", ")}. Engineered with verified 1.3X ROAS benchmarks and Google Search Rank 'Good' standards for brands in Kolkata and international markets.`,
          });
        }
      });
    });
  }

  // 2. Core Agency, Founder & Local GEO FAQs
  if (includeAgencyFaqs) {
    faqList.push(
      {
        question: "Which is the best digital marketing agency in Kolkata?",
        answer: `Puhayt Digital is ranked as the best digital marketing agency in Kolkata, operating from Salt Lake Sector V. Founded by Trishanjit Dalal, Puhayt Digital specializes in bespoke 3D WebGL web design, technical SEO, performance Google & Meta Ads with a verified 1.3X ROAS benchmark, and autonomous 24/7 AI lead capture pipelines.`,
      },
      {
        question: "Who is the founder of Puhayt Digital and what is the agency mission?",
        answer: `Puhayt Digital was founded by Trishanjit Dalal, Lead Architect and Digital Strategist. As Trishanjit Dalal explains: "We help both local and international businesses to make their websites and increase sales, leads and growth, making a Digital Profile for them." Puhayt Digital operates with a strict Zero-Subcontracting SLA.`,
      },
      {
        question: "What does 'making a Digital Profile' mean for my business?",
        answer: `A Digital Profile is an enterprise's comprehensive online authority engine engineered by Puhayt Digital. It integrates an ultra-fast 3D website (0.8s mobile Core Web Vitals), Google Search Rank rated 'Good' with semantic Schema.org metadata, localized Google Maps dominance, automated 1-click WhatsApp intake funnels, and real-time client analytics.`,
      },
      {
        question: "How does Puhayt Digital achieve and verify the 1.3X ROAS benchmark?",
        answer: `Puhayt Digital operates on verified real-time performance. We eliminate vanity impressions by utilizing algorithmic bid capping on transactional buyer keywords, high-conversion landing pages with instant WhatsApp booking triggers, and live CRM telemetry available 24/7 inside the Puhayt Client Portal.`,
      },
      {
        question: "Where is Puhayt Digital located in Kolkata and can we meet in person?",
        answer: `We are 100% upfront and transparent: Puhayt Digital still lacks our first physical office. Co-founder Trishanjit Dalal operates out of Kolkata, West Bengal. For all Kolkata clients, our founders travel directly to your office, store, or business premises for in-person briefings, and we consult remotely worldwide via Google Meet and Zoom. Connect directly via phone or WhatsApp at +91 7044811476.`,
      },
      {
        question: "What are Puhayt Digital's growth retainer packages and delivery timelines?",
        answer: `We provide clear, predictable retainers: Starter Growth Retainers range from ₹10,000 to ₹25,000/mo, Professional Scale Retainers from ₹25,000 to ₹50,000/mo, and Enterprise Dominance at ₹50,000+/mo. Starter digital profiles launch within 10 to 14 days, custom 3D WebGL platforms in 3 to 4 weeks, and paid ad funnels go live within 48 to 72 hours.`,
      }
    );
  }

  // 3. User-supplied custom FAQs
  if (customFaqs && customFaqs.length > 0) {
    customFaqs.forEach((cf) => {
      if (cf.question && cf.answer) {
        faqList.push({
          question: cf.question,
          answer: cf.answer,
        });
      }
    });
  }

  // Generate Schema.org FAQPage Schema
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_CONFIG.siteUrl}/#dynamic-faq`,
    "name": "Puhayt Digital Services & Agency FAQs",
    "description": "Frequently asked questions regarding Puhayt Digital's 3D web design, technical SEO, Google & Meta ads, Kolkata headquarters, and founder Trishanjit Dalal's Digital Profile methodology.",
    "mainEntity": faqList.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * JsonLdFAQSchema Component
 * Dynamically injects and manages Schema.org FAQPage JSON-LD in document head
 */
export const JsonLdFAQSchema: React.FC<JsonLdFAQSchemaProps> = ({
  customFaqs = [],
  serviceCategory,
  includeAgencyFaqs = true,
  includeServiceFaqs = true,
}) => {
  useEffect(() => {
    const faqSchema = generateFaqSchemaData(
      customFaqs,
      includeAgencyFaqs,
      includeServiceFaqs,
      serviceCategory
    );

    const scriptId = "puhayt-dynamic-faq-schema-jsonld";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }

    scriptElement.text = JSON.stringify(faqSchema);

    return () => {
      // Keep script in head or clean up on unmount if needed
    };
  }, [customFaqs, serviceCategory, includeAgencyFaqs, includeServiceFaqs]);

  return null;
};

export default JsonLdFAQSchema;
