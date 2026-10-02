import React, { useEffect } from "react";
import { SITE_CONFIG, generateSchemaJsonLd } from "../../config/siteConfig";
import { JsonLdFAQSchema, FAQItem, generateFaqSchemaData } from "./JsonLdFAQSchema";

export { JsonLdFAQSchema, generateFaqSchemaData };
export type { FAQItem };

const DEFAULT_KEYWORDS = [
  "best digital marketing in kolkata",
  "best digital marketing agency in kolkata",
  "top digital marketing company in kolkata",
  "digital marketing agency salt lake sector v",
  "best seo agency in kolkata",
  "google ads agency kolkata",
  "web design company in kolkata",
  "performance marketing kolkata",
  "social media marketing agency kolkata",
  "ai digital marketing kolkata",
  "Puhayt Digital Kolkata"
];

interface SEOMetaProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
  lang?: string;
  customFaqs?: FAQItem[];
  serviceCategory?: string;
  includeFaqSchema?: boolean;
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title = `${SITE_CONFIG.brandName} — ${SITE_CONFIG.tagline}`,
  description = SITE_CONFIG.brandDescription,
  canonicalUrl = SITE_CONFIG.siteUrl,
  ogImage = SITE_CONFIG.ogImageUrl,
  keywords = DEFAULT_KEYWORDS,
  type = "website",
  lang = "en",
  customFaqs = [],
  serviceCategory,
  includeFaqSchema = true,
}) => {
  const keywordsStr = keywords.join(", ");

  useEffect(() => {
    // 1. Update Document Title and Root Lang
    document.title = title;
    document.documentElement.lang = lang;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: "name" | "property", attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to set link tag
    const setLinkTag = (rel: string, href: string, extraAttr?: { name: string; value: string }) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttr) {
        selector += `[${extraAttr.name}="${extraAttr.value}"]`;
      }
      let element = document.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        if (extraAttr) {
          element.setAttribute(extraAttr.name, extraAttr.value);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Standard SEO Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywordsStr);
    setMetaTag("name", "author", SITE_CONFIG.brandName);
    setMetaTag("name", "google-site-verification", "googleaed00bfdb63f9280");
    setMetaTag("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setLinkTag("canonical", canonicalUrl);

    // Geographic / Local GEO Meta Tags (Kolkata, West Bengal, India)
    setMetaTag("name", "geo.region", "IN-WB");
    setMetaTag("name", "geo.placename", "Kolkata, Salt Lake Sector V");
    setMetaTag("name", "geo.position", "22.5804;88.4378");
    setMetaTag("name", "ICBM", "22.5804, 88.4378");

    // Multilingual alternate hreflang links
    const baseUrl = canonicalUrl.replace(/\/$/, "");
    setLinkTag("alternate", `${baseUrl}/`, { name: "hreflang", value: "en" });
    setLinkTag("alternate", `${baseUrl}/hi`, { name: "hreflang", value: "hi" });
    setLinkTag("alternate", `${baseUrl}/bn`, { name: "hreflang", value: "bn" });
    setLinkTag("alternate", `${baseUrl}/`, { name: "hreflang", value: "x-default" });

    // OpenGraph
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:site_name", SITE_CONFIG.brandName);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:locale", lang === "hi" ? "hi_IN" : lang === "bn" ? "bn_IN" : "en_US");

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);
    setMetaTag("name", "twitter:site", "@puhaytdigital");

    // JSON-LD Structured Data Injection
    const schemas = generateSchemaJsonLd();
    let schemaScript = document.getElementById("puhayt-schema-jsonld") as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "puhayt-schema-jsonld";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.text = JSON.stringify(schemas);
  }, [title, description, canonicalUrl, ogImage, keywordsStr, type, lang]);

  return includeFaqSchema ? (
    <JsonLdFAQSchema
      customFaqs={customFaqs}
      serviceCategory={serviceCategory}
      includeAgencyFaqs={true}
      includeServiceFaqs={true}
    />
  ) : null;
};
