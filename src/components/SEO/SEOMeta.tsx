import React, { useEffect } from "react";
import { SITE_CONFIG, generateSchemaJsonLd, getPageSEOConfig } from "../../config/siteConfig";
import { JsonLdFAQSchema, FAQItem, generateFaqSchemaData } from "./JsonLdFAQSchema";

export { JsonLdFAQSchema, generateFaqSchemaData };
export type { FAQItem };

interface SEOMetaProps {
  pageId?: string;
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
  pageId = "home",
  title,
  description,
  canonicalUrl,
  ogImage = SITE_CONFIG.ogImageUrl,
  keywords,
  type,
  lang = "en",
  customFaqs = [],
  serviceCategory,
  includeFaqSchema = true,
}) => {
  const pageConfig = getPageSEOConfig(pageId);
  const resolvedTitle = title || pageConfig.title;
  const resolvedDescription = description || pageConfig.description;
  const resolvedKeywords = keywords || pageConfig.keywords;
  const resolvedType = type || pageConfig.ogType;
  const baseSiteUrl = SITE_CONFIG.siteUrl.replace(/\/$/, "");
  const resolvedCanonical =
    canonicalUrl ||
    (pageConfig.canonicalPath === "/"
      ? `${baseSiteUrl}/`
      : `${baseSiteUrl}${pageConfig.canonicalPath}`);
  const keywordsStr = resolvedKeywords.join(", ");

  useEffect(() => {
    // 1. Update Document Title and Root Lang
    document.title = resolvedTitle;
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

    // Standard & Crawler SEO Meta Tags
    const robotsDirective = pageConfig.noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    setMetaTag("name", "description", resolvedDescription);
    setMetaTag("name", "keywords", keywordsStr);
    setMetaTag("name", "author", `${SITE_CONFIG.brandName} — Trishanjit Dalal & Aayush Ghosh`);
    setMetaTag("name", "google-site-verification", "googleaed00bfdb63f9280");
    setMetaTag("name", "robots", robotsDirective);
    setMetaTag("name", "googlebot", robotsDirective);
    setMetaTag("name", "bingbot", robotsDirective);
    setLinkTag("canonical", resolvedCanonical);

    // Geographic / Local GEO Meta Tags (Kolkata, West Bengal, India)
    setMetaTag("name", "geo.region", "IN-WB");
    setMetaTag("name", "geo.placename", "Kolkata, Salt Lake Sector V, West Bengal, India");
    setMetaTag("name", "geo.position", "22.5804;88.4378");
    setMetaTag("name", "ICBM", "22.5804, 88.4378");

    // Multilingual alternate hreflang links
    setLinkTag("alternate", `${baseSiteUrl}/`, { name: "hreflang", value: "en" });
    setLinkTag("alternate", `${baseSiteUrl}/?lang=hi`, { name: "hreflang", value: "hi" });
    setLinkTag("alternate", `${baseSiteUrl}/?lang=bn`, { name: "hreflang", value: "bn" });
    setLinkTag("alternate", `${baseSiteUrl}/`, { name: "hreflang", value: "x-default" });

    // OpenGraph Social Metadata
    setMetaTag("property", "og:type", resolvedType);
    setMetaTag("property", "og:site_name", SITE_CONFIG.brandName);
    setMetaTag("property", "og:title", resolvedTitle);
    setMetaTag("property", "og:description", resolvedDescription);
    setMetaTag("property", "og:url", resolvedCanonical);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:image:alt", resolvedTitle);
    setMetaTag("property", "og:locale", lang === "hi" ? "hi_IN" : lang === "bn" ? "bn_IN" : "en_US");

    // Twitter / X Cards
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", resolvedTitle);
    setMetaTag("name", "twitter:description", resolvedDescription);
    setMetaTag("name", "twitter:image", ogImage);
    setMetaTag("name", "twitter:image:alt", resolvedTitle);
    setMetaTag("name", "twitter:site", "@puhaytdigital");

    // JSON-LD Structured Data Injection (Page-Specific + Organization + LocalBusiness + FAQ + BreadcrumbList)
    const schemas = generateSchemaJsonLd(SITE_CONFIG, pageConfig.pageId);
    let schemaScript = document.getElementById("puhayt-schema-jsonld") as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "puhayt-schema-jsonld";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": schemas.map(({ "@context": _ctx, ...rest }) => rest),
    });
  }, [resolvedTitle, resolvedDescription, resolvedCanonical, ogImage, keywordsStr, resolvedType, lang, pageConfig.pageId, baseSiteUrl]);

  return includeFaqSchema && customFaqs.length > 0 ? (
    <JsonLdFAQSchema
      customFaqs={customFaqs}
      serviceCategory={serviceCategory}
      includeAgencyFaqs={false}
      includeServiceFaqs={false}
    />
  ) : null;
};
