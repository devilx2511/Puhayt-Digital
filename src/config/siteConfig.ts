/**
 * PUHAYT DIGITAL — Central Brand, Technical SEO & Generative Engine Optimization (GEO) Configuration
 * Single source of truth for entity identity, search-intent metadata, structured data (JSON-LD), and canonical routing.
 */

export interface SocialProfile {
  name: string;
  url: string;
  handle: string;
}

export interface SiteConfig {
  brandName: string;
  legalName: string;
  tagline: string;
  brandDescription: string;
  siteUrl: string;
  logoUrl: string;
  ogImageUrl: string;
  faviconUrl: string;

  // Contacts
  contactEmail: string;
  supportEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  whatsappLink: string;

  // Office & Operational Base
  officeAddress: {
    street: string;
    locality: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    countryCode: string;
    latitude: number;
    longitude: number;
  };

  // Official Socials
  socialProfiles: SocialProfile[];

  // Core Services (6 Pillars)
  primaryServices: {
    id: string;
    name: string;
    slug: string;
    description: string;
    keywords: string[];
  }[];

  // Target Industries
  targetIndustries: string[];

  // Service Areas
  targetLocations: string[];
}

const RESOLVED_SITE_URL = (
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SITE_URL) ||
  (typeof process !== "undefined" && (process.env?.SITE_URL || process.env?.VITE_SITE_URL)) ||
  (typeof window !== "undefined" ? window.location.origin : "https://puhaytdigital.ai.studio")
).replace(/\/$/, "");

export const SITE_CONFIG: SiteConfig = {
  brandName: "Puhayt Digital",
  legalName: "Puhayt Digital Technologies",
  tagline: "Best SEO, Website Building, Web Design, Domain & Hosting, GEO Audit & Digital Marketing",
  brandDescription:
    "Puhayt Digital is a full-stack digital engineering and growth agency in Kolkata, India. Founded by Trishanjit Dalal and Co-Founder Aayush Ghosh, we specialize in Technical SEO, Generative Engine Optimization (GEO) Audits, Custom Website Building, 3D Web Design, Domain & Cloud Hosting with Authentication, and Google & Meta Digital Marketing.",
  siteUrl: RESOLVED_SITE_URL,
  logoUrl: "/favicon.svg",
  ogImageUrl: `${RESOLVED_SITE_URL}/hero.svg`,
  faviconUrl: "/favicon.svg",

  contactEmail: "contact@puhayt.digital",
  supportEmail: "aayushcps0907@gmail.com",
  contactPhone: "+91 7044811476",
  whatsappNumber: "+91 7044811476",
  whatsappLink:
    "https://wa.me/917044811476?text=Hello%20Puhayt%20Digital!%20I%20would%20like%20to%20inquire%20about%20SEO,%20website%20building,%20domain/hosting,%20or%20digital%20marketing.",

  officeAddress: {
    street: "Salt Lake Sector V, Bidhannagar",
    locality: "Salt Lake Sector V",
    city: "Kolkata",
    state: "West Bengal",
    postalCode: "700091",
    country: "India",
    countryCode: "IN",
    latitude: 22.5804,
    longitude: 88.4378,
  },

  socialProfiles: [
    {
      name: "Instagram (Founder — Trishanjit Dalal)",
      url: "https://www.instagram.com/itz___.unknown_13/",
      handle: "@itz___.unknown_13",
    },
    {
      name: "Instagram (Co-Founder — Aayush Ghosh)",
      url: "https://www.instagram.com/aayushg.dev/",
      handle: "@aayushg.dev",
    },
    {
      name: "WhatsApp Official Desk",
      url: "https://wa.me/917044811476",
      handle: "+91 7044811476",
    },
  ],

  primaryServices: [
    {
      id: "best-seo",
      name: "Technical, On-Page, Off-Page & Local SEO Services",
      slug: "seo-services",
      description:
        "Code-level technical SEO, semantic topic architecture, Schema.org JSON-LD entity graphs, Google Business Profile local SEO, and white-hat authority citations.",
      keywords: [
        "best seo",
        "technical seo services",
        "on-page and off-page seo",
        "local seo kolkata",
        "search engine optimization agency",
      ],
    },
    {
      id: "best-website-building",
      name: "Custom Website Building & Full-Stack Web Development",
      slug: "website-building",
      description:
        "Server-pre-rendered React 19 and TypeScript web applications, corporate digital profiles, and e-commerce stores engineered for 100/100 Core Web Vitals.",
      keywords: [
        "best website building",
        "custom website development",
        "react web development",
        "ecommerce website builder",
        "full stack website developer",
      ],
    },
    {
      id: "best-web-design",
      name: "Bespoke Web Design & Interactive 3D WebGL UI/UX",
      slug: "web-design",
      description:
        "Conversion-focused mobile-first UI/UX design systems and interaction-gated Three.js/WebGL 3D visual experiences.",
      keywords: [
        "best web design",
        "3d interactive web design",
        "responsive mobile web design",
        "ui ux design company",
        "conversion rate optimization design",
      ],
    },
    {
      id: "best-domain-hosting",
      name: "Domain Registration, Cloud Hosting, SSL & Authentication",
      slug: "domain-and-hosting",
      description:
        "Authoritative domain DNS configuration, containerized Cloud Run and Edge CDN hosting with Brotli compression, automated SSL/TLS, and Firebase Authentication.",
      keywords: [
        "best domain and hosting",
        "domain",
        "hosting",
        "cloud web hosting with ssl",
        "domain dns and authentication setup",
      ],
    },
    {
      id: "best-seo-geo-audit",
      name: "Comprehensive SEO & Generative Engine Optimization (GEO) Audit",
      slug: "seo-and-geo-audit",
      description:
        "25-point technical SEO and AI answer engine readiness audit covering Core Web Vitals, crawlability, Schema.org entities, LLMs.txt, and Speakable direct answers.",
      keywords: [
        "best seo and geo audit",
        "generative engine optimization geo",
        "technical seo website audit",
        "ai search visibility optimization",
        "core web vitals audit",
      ],
    },
    {
      id: "best-digital-marketing",
      name: "Digital Marketing, Google Search PPC & Meta Ads",
      slug: "digital-marketing",
      description:
        "High-intent Google Search PPC and Meta (Instagram & Facebook) performance ad funnels engineered for measurable buyer inquiries and 1.3X+ target ROAS.",
      keywords: [
        "best digital marketing",
        "digital marketing",
        "google search ads agency",
        "meta instagram facebook ads",
        "performance marketing company",
      ],
    },
  ],

  targetIndustries: [
    "E-Commerce & D2C Retail Brands",
    "Real Estate & Property Developers",
    "Healthcare Clinics & Diagnostic Centers",
    "Fintech, EdTech & B2B SaaS Startups",
    "Hospitality, Fine Dining & Lifestyle",
    "Professional, Legal & Financial Services",
    "Education & Coaching Academies",
  ],

  targetLocations: [
    "Kolkata, West Bengal (On-Premises Client Consultations)",
    "India (Nationwide Remote & Cloud Execution)",
    "International Global Clients",
  ],
};

export interface PageSEOConfig {
  pageId: string;
  title: string;
  description: string;
  canonicalPath: string;
  ogType: "website" | "article" | "profile";
  schemaPageType: "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage" | "FAQPage";
  noindex?: boolean;
  keywords: string[];
  topicClusterTitle: string;
  topicClusterDescription: string;
  searchIntentTags: string[];
  faqs: { question: string; answer: string }[];
}

export const PAGE_SEO_MAP: Record<string, PageSEOConfig> = {
  home: {
    pageId: "home",
    title: "Puhayt Digital — Best SEO, Website Building, Web Design, Domain/Hosting & GEO",
    description:
      "Full-stack SEO, Generative Engine Optimization (GEO) Audits, Custom Website Building, 3D Web Design, Domain & Cloud Hosting, and Digital Marketing by Puhayt Digital.",
    canonicalPath: "/",
    ogType: "website",
    schemaPageType: "WebPage",
    keywords: [
      "best seo",
      "best website building",
      "best web design",
      "best domain and hosting",
      "best seo and geo audit",
      "best digital marketing",
      "domain",
      "hosting",
      "digital marketing",
      "3D web development Kolkata",
      "custom CRM integration agency",
      "generative engine optimization GEO consulting Kolkata",
      "custom React website development Salt Lake Sector V",
      "enterprise SaaS web engineering agency India",
      "e-commerce SEO and conversion optimization Kolkata",
      "real estate and healthcare digital marketing agency West Bengal",
      "B2B lead generation Google and Meta ads agency",
      "managed cloud web hosting and Firebase authentication setup Kolkata",
      "technical SEO and Core Web Vitals optimization agency",
      "WebGL Three.js interactive web design studio India",
      "domain registration DNS and SSL provisioning service",
      "puhayt digital",
      "trishanjit dalal",
      "aayush ghosh",
    ],
    topicClusterTitle:
      "Full-Stack SEO, Generative Engine Optimization (GEO), Custom Website Building, 3D Web Design, Domain/Hosting & Digital Marketing",
    topicClusterDescription:
      "Puhayt Digital engineers sub-second 100/100 Core Web Vitals websites, custom domain DNS & cloud edge hosting, Firebase authentication, On-Page/Off-Page/Technical SEO, GEO AI citation systems, and conversion-tracked Google & Meta ad campaigns.",
    searchIntentTags: [
      "Best SEO & Technical Search Engineering",
      "Best Website Building (React 19 SSR)",
      "Best Web Design & 3D WebGL UI/UX",
      "Best Domain, Cloud Hosting, SSL & Auth",
      "Best SEO & GEO Technical Audit",
      "Best Digital Marketing (Google & Meta Ads)",
    ],
    faqs: [
      {
        question: "What core services does Puhayt Digital provide?",
        answer:
          "Puhayt Digital provides six integrated capabilities in-house: (1) Technical, On-Page, Off-Page & Local SEO, (2) Custom Website Building (React/TypeScript SSR), (3) Mobile-First & 3D WebGL Web Design, (4) Domain Registration, DNS, Cloud Hosting, SSL & Firebase Authentication, (5) Comprehensive SEO & GEO Audits, and (6) Google Search & Meta Performance Digital Marketing.",
      },
      {
        question: "How does Puhayt Digital optimize websites for both Google SEO and AI Answer Engines (GEO)?",
        answer:
          "We pair server-pre-rendered HTML, 100/100 Core Web Vitals, and clean canonical URLs with consolidated Schema.org JSON-LD entity graphs, SpeakableSpecification selectors, structured WHAT/WHO/WHY/HOW topical answers, and machine-readable /llms.txt and /geo-knowledge-graph.json files.",
      },
    ],
  },

  about: {
    pageId: "about",
    title: "About Puhayt Digital | Founders Trishanjit Dalal & Aayush Ghosh",
    description:
      "Meet Puhayt Digital's founders Trishanjit Dalal (Ads & Digital Marketing Lead) and Aayush Ghosh (Website Developer, Domain/Hosting & SEO Expert) in Kolkata.",
    canonicalPath: "/about",
    ogType: "profile",
    schemaPageType: "AboutPage",
    keywords: [
      "about puhayt digital",
      "trishanjit dalal puhayt digital",
      "aayush ghosh web developer seo expert",
      "domain hosting and authentication expert",
      "zero subcontracting digital agency",
      "website builder and seo founders kolkata",
    ],
    topicClusterTitle: "Executive Leadership, In-House Engineering & Zero-Subcontracting SLA",
    topicClusterDescription:
      "Founded by Trishanjit Dalal (Ads Runner & Performance Marketing Lead) and Co-Founder Aayush Ghosh (Full-Stack Website Developer, Domain/Hosting Architect & Technical SEO Expert), Puhayt Digital executes every project 100% in-house.",
    searchIntentTags: [
      "Founder Trishanjit Dalal (+91 7044811476)",
      "Co-Founder Aayush Ghosh (+91 8583878622)",
      "Zero-Subcontracting In-House Code",
      "Domain, Hosting & Auth Architecture",
      "On-Premises Kolkata Consultations",
    ],
    faqs: [
      {
        question: "Who are the founders of Puhayt Digital and what are their roles?",
        answer:
          "Trishanjit Dalal is the Founder leading Paid Ads, Performance Digital Marketing, Client Inquiries, and Payments (+91 7044811476). Aayush Ghosh is the Co-Founder leading Website Building, Web Design, Technical SEO & GEO, and Domain, Cloud Hosting & Authentication (+91 8583878622).",
      },
      {
        question: "What is Puhayt Digital's Zero-Subcontracting SLA?",
        answer:
          "Every website build, domain/hosting setup, technical SEO audit, and Google/Meta ad campaign is executed directly by our founders in-house—never outsourced to third-party vendors.",
      },
    ],
  },

  services: {
    pageId: "services",
    title: "Website Building, 3D Web Design, Domain/Hosting, SEO & Digital Marketing Services",
    description:
      "Explore Puhayt Digital's full-stack services: Custom Website Building, 3D Web Design, Domain DNS & Cloud Hosting, Technical SEO, GEO Audits, and Google/Meta Ads.",
    canonicalPath: "/services",
    ogType: "website",
    schemaPageType: "CollectionPage",
    keywords: [
      "best website building services",
      "best web design services",
      "best domain and hosting setup",
      "best seo and geo audit services",
      "best digital marketing services",
      "custom react website development",
      "cloud hosting ssl firebase authentication",
      "google search ads and meta ppc management",
    ],
    topicClusterTitle:
      "Integrated Website Building, 3D Web Design, Domain & Cloud Hosting, Technical SEO, GEO Audits & Paid Ads",
    topicClusterDescription:
      "From custom domain DNS, SSL encryption, and edge cloud hosting to server-pre-rendered 3D React websites, Schema.org technical SEO, GEO AI readiness audits, and high-intent Google/Meta ad funnels.",
    searchIntentTags: [
      "Custom Website Building & E-Commerce",
      "Bespoke 3D WebGL & Mobile-First Web Design",
      "Domain DNS, Cloud Hosting, SSL & Auth",
      "Technical, On-Page & Off-Page SEO",
      "Comprehensive SEO & GEO Audits",
      "Google Search PPC & Meta Retargeting",
    ],
    faqs: [
      {
        question: "Can Puhayt Digital handle my domain, cloud hosting, SSL certificate, and website build together?",
        answer:
          "Yes. Co-Founder Aayush Ghosh configures your domain DNS, edge cloud hosting with Brotli compression, automatic HTTPS/SSL certificates, and Firebase Authentication alongside your custom website build and technical SEO.",
      },
      {
        question: "Do your website building packages include On-Page SEO and GEO optimization?",
        answer:
          "Yes. Every website we engineer includes clean canonical URLs, XML sitemaps, Schema.org JSON-LD structured data, OpenGraph social cards, and 100/100 Core Web Vitals optimization.",
      },
    ],
  },

  portfolio: {
    pageId: "portfolio",
    title: "Live Client Websites, Web Design Portfolio & SEO Case Studies | Puhayt Digital",
    description:
      "Open and test live interactive websites built by Puhayt Digital across E-Commerce, FinTech, Hospitality, Real Estate, SaaS, Healthcare, and Education.",
    canonicalPath: "/portfolio",
    ogType: "website",
    schemaPageType: "CollectionPage",
    keywords: [
      "website building portfolio",
      "web design portfolio and live websites",
      "seo case studies and results",
      "interactive client websites",
      "ecommerce and real estate website examples",
      "puhayt digital portfolio",
    ],
    topicClusterTitle: "Interactive Client Website Builds, Responsive Viewport Previews & Case Studies",
    topicClusterDescription:
      "Open and interact with live client web architectures across desktop, tablet, and mobile viewports—complete with documented engineering solutions and conversion workflows.",
    searchIntentTags: [
      "Interactive Live Website Previews",
      "Desktop, Tablet & Mobile Viewports",
      "E-Commerce, FinTech & Real Estate Builds",
      "Healthcare, SaaS & Education Portals",
      "Documented Technical Case Studies",
    ],
    faqs: [
      {
        question: "Can I open and test the websites in the Puhayt Digital portfolio?",
        answer:
          "Yes. Every project card in our Portfolio includes an 'Open Website' interactive browser viewer with desktop, tablet, and mobile viewport toggles as well as direct new-tab launch links.",
      },
    ],
  },

  referrals: {
    pageId: "referrals",
    title: "Website, SEO, Domain/Hosting & Digital Marketing Packages & Referral Offers",
    description:
      "View transparent pricing packages and active promotional discounts for Website Building, SEO, Domain/Hosting, and Digital Marketing, or join our referral program.",
    canonicalPath: "/referrals",
    ogType: "website",
    schemaPageType: "CollectionPage",
    keywords: [
      "website building packages price",
      "seo and digital marketing cost",
      "domain and hosting package price",
      "digital marketing promotional offers",
      "partner referral program web design",
    ],
    topicClusterTitle: "Transparent Growth Packages, Promotional Discounts & Partner Referral Rewards",
    topicClusterDescription:
      "Explore clear deliverables and pricing for custom websites, technical SEO retainers, domain/hosting setup, and ad campaigns, or generate a unique WhatsApp referral code.",
    searchIntentTags: [
      "Transparent Website & SEO Pricing",
      "Startup & Seasonal Discount Codes",
      "1-Click WhatsApp Offer Claiming",
      "Partner Referral Rewards Program",
    ],
    faqs: [
      {
        question: "How do I claim an active discount or use the referral program?",
        answer:
          "Select any active offer to claim the promo code directly via WhatsApp with our founding team, or generate your personal referral link to earn rewards when referred businesses launch a project.",
      },
    ],
  },

  industries: {
    pageId: "industries",
    title: "Industries We Serve: E-Commerce, Real Estate, Healthcare, SaaS & Hospitality",
    description:
      "Tailored website building, technical SEO, domain/hosting, and digital marketing solutions for E-Commerce, Real Estate, Healthcare Clinics, SaaS, and Hospitality.",
    canonicalPath: "/industries",
    ogType: "website",
    schemaPageType: "CollectionPage",
    keywords: [
      "ecommerce website and seo agency",
      "real estate digital marketing and web design",
      "healthcare clinic website and local seo",
      "saas web application and seo agency",
      "restaurant hospitality website design",
    ],
    topicClusterTitle: "Industry-Specific Web Design, SEO, Hosting & Digital Marketing Playbooks",
    topicClusterDescription:
      "Specialized conversion architectures and search-intent strategies tailored for Retail E-Commerce, Real Estate, Healthcare Clinics, FinTech/SaaS, Hospitality, and Education.",
    searchIntentTags: [
      "E-Commerce & D2C Conversion Stores",
      "Real Estate Project Showcases & Lead Gen",
      "Healthcare Clinic Appointment & Local SEO",
      "B2B SaaS & FinTech Web Platforms",
      "Hospitality & Coaching Portals",
    ],
    faqs: [
      {
        question: "Which industries does Puhayt Digital specialize in?",
        answer:
          "We build custom websites, manage domain/cloud hosting, and execute SEO and paid marketing for E-Commerce brands, Real Estate developers, Healthcare clinics, FinTech/SaaS startups, Restaurants, and Educational institutes.",
      },
    ],
  },

  "ai-suite": {
    pageId: "ai-suite",
    title: "Best SEO & GEO Audit Tool, AI Proposal Generator & 24/7 Lead Assistant | Puhayt Digital",
    description:
      "Run an instant SEO & Generative Engine Optimization (GEO) website audit, generate a custom growth proposal, or consult our 24/7 AI strategist.",
    canonicalPath: "/ai-suite",
    ogType: "website",
    schemaPageType: "WebPage",
    keywords: [
      "best seo and geo audit",
      "free seo audit tool",
      "geo audit generative engine optimization",
      "website performance and seo analyzer",
      "ai digital marketing consultant",
    ],
    topicClusterTitle: "Interactive SEO & GEO Website Auditor, Proposal Engine & 24/7 AI Growth Strategist",
    topicClusterDescription:
      "Analyze any website URL for Core Web Vitals, On-Page SEO, JSON-LD structured data, and Generative Engine Optimization (GEO) readiness, or generate a tailored strategy roadmap.",
    searchIntentTags: [
      "Instant SEO & GEO Website Audit",
      "Core Web Vitals & Schema Check",
      "Tailored Growth Proposal Generator",
      "24/7 AI Strategy & Lead Assistant",
    ],
    faqs: [
      {
        question: "How does the Puhayt Digital SEO and GEO Audit tool work?",
        answer:
          "Enter your website URL and industry to receive an immediate diagnostic score covering SEO, performance, conversion readiness, key technical issues, and a prioritized action plan.",
      },
    ],
  },

  testimonials: {
    pageId: "testimonials",
    title: "Public Client Reviews & Project Feedback | Puhayt Digital",
    description:
      "Read and submit public client reviews and feedback on Puhayt Digital's website building, web design, domain/hosting setup, technical SEO, and digital marketing.",
    canonicalPath: "/testimonials",
    ogType: "website",
    schemaPageType: "CollectionPage",
    keywords: [
      "puhayt digital reviews",
      "client testimonials web design seo",
      "trishanjit dalal reviews",
      "aayush ghosh web developer feedback",
    ],
    topicClusterTitle: "Transparent Public Client Reviews & Project Experience Feedback",
    topicClusterDescription:
      "Browse public client feedback or sign in to share your experience working with Puhayt Digital across website development, domain/hosting, SEO, and paid advertising.",
    searchIntentTags: [
      "Public Client Review Board",
      "Service-Specific Feedback",
      "Direct Founder Responses",
    ],
    faqs: [
      {
        question: "Can clients submit their own review on the website?",
        answer:
          "Yes. Clients can click 'Write a Review' on the Reviews page to rate quality, communication, value, and speed, and share feedback on the specific service they used.",
      },
    ],
  },

  blog: {
    pageId: "blog",
    title: "SEO, GEO, Website Building, Domain/Hosting & Digital Marketing Blog | Puhayt Digital",
    description:
      "Technical guides and actionable articles on SEO, Generative Engine Optimization (GEO), React 3D Website Building, Domain & Cloud Hosting, and Google/Meta Ads.",
    canonicalPath: "/blog",
    ogType: "article",
    schemaPageType: "CollectionPage",
    keywords: [
      "seo and geo strategy blog",
      "website building and web design guides",
      "domain and cloud hosting optimization guide",
      "core web vitals 100 pagespeed engineering",
      "google ads and meta ads roas guide",
    ],
    topicClusterTitle: "Educational Engineering Guides on SEO, GEO, Web Development, Cloud Hosting & Paid Ads",
    topicClusterDescription:
      "Original technical articles authored by Trishanjit Dalal and Aayush Ghosh explaining how to achieve 100/100 Core Web Vitals, structure Schema.org & GEO entities, configure domain/hosting, and scale ad ROAS.",
    searchIntentTags: [
      "Technical SEO & GEO Guides",
      "100/100 Core Web Vitals Engineering",
      "3D Web Design & Conversion UX",
      "Domain, DNS & Cloud Hosting Setup",
      "Google & Meta Ads Strategy",
    ],
    faqs: [
      {
        question: "Who writes the technical and marketing guides on the Puhayt Digital Blog?",
        answer:
          "All guides are written by Founder Trishanjit Dalal (Performance Ads & Digital Marketing) and Co-Founder Aayush Ghosh (Full-Stack Web Engineering, Domain/Hosting & Technical SEO).",
      },
    ],
  },

  "kolkata-geo": {
    pageId: "kolkata-geo",
    title: "Generative Engine Optimization (GEO), Best SEO & Web Engineering Hub | Puhayt Digital",
    description:
      "Complete GEO & SEO Authority Hub: structured WHAT/WHO/WHY/HOW guides for Best SEO, Website Building, Web Design, Domain & Hosting, GEO Audits, and Digital Marketing.",
    canonicalPath: "/kolkata-geo",
    ogType: "website",
    schemaPageType: "WebPage",
    keywords: [
      "generative engine optimization geo",
      "best seo and geo audit",
      "best website building and web design",
      "best domain and hosting",
      "best digital marketing kolkata",
      "ai search visibility chatgpt perplexity gemini",
      "llms.txt and schema.org entity seo",
    ],
    topicClusterTitle:
      "Generative Engine Optimization (GEO), Entity SEO & 6-Pillar Search Visibility Architecture",
    topicClusterDescription:
      "Structured for Google Search and AI Answer Engines (ChatGPT, Google AI Overviews, Perplexity, Gemini) with cite-ready summaries, quantitative comparison tables, and 8-point topical breakdowns.",
    searchIntentTags: [
      "Generative Engine Optimization (GEO)",
      "Speakable AI Answer Blocks & LLMs.txt",
      "Best SEO & Technical Search Audit",
      "Best Website Building & 3D Web Design",
      "Best Domain, Cloud Hosting & Auth",
      "On-Premises Kolkata & Global Consultations",
    ],
    faqs: [
      {
        question: "How does Puhayt Digital implement Generative Engine Optimization (GEO)?",
        answer:
          "We structure every core topic with clear WHAT, WHO, WHY, HOW, INCLUDED, DIFFERENCES, and LIMITATIONS sections in semantic HTML, backed by consolidated Schema.org JSON-LD, SpeakableSpecification selectors, /llms-full.txt, and /geo-knowledge-graph.json.",
      },
    ],
  },

  contact: {
    pageId: "contact",
    title: "Contact Puhayt Digital | Book Free SEO, Website, Domain/Hosting or Ads Consultation",
    description:
      "Speak directly with Founder Trishanjit Dalal (+91 7044811476) or Co-Founder Aayush Ghosh (+91 8583878622) for SEO, GEO Audits, Website Building, Domain/Hosting, or Ads.",
    canonicalPath: "/contact",
    ogType: "website",
    schemaPageType: "ContactPage",
    keywords: [
      "contact puhayt digital",
      "book seo and website consultation",
      "hire website developer and seo expert",
      "domain and hosting setup consultation",
      "digital marketing agency contact kolkata",
    ],
    topicClusterTitle: "Direct Founder Consultation Desk — Under 2-Hour Response SLA via WhatsApp, Phone & Form",
    topicClusterDescription:
      "Connect directly with Trishanjit Dalal (+91 7044811476) or Aayush Ghosh (+91 8583878622) to scope your website build, domain/cloud hosting, technical SEO & GEO audit, or paid ad campaign.",
    searchIntentTags: [
      "WhatsApp & Phone: +91 7044811476",
      "Technical & SEO Desk: +91 8583878622",
      "Under 2-Hour Founder Response SLA",
      "In-Person Kolkata Premises or Google Meet",
    ],
    faqs: [
      {
        question: "How quickly does Puhayt Digital respond to project inquiries?",
        answer:
          "Our founders respond to all WhatsApp, phone, and strategy form inquiries within 2 hours with a tailored initial assessment.",
      },
    ],
  },

  "off-page-seo": {
    pageId: "off-page-seo",
    title: "Off-Page SEO, White-Hat Backlinks, NAP Citations & Syndication Hub | Puhayt Digital",
    description:
      "Explore Puhayt Digital's Off-Page SEO & Authority Hub: standardized NAP citations, embeddable partner badges, RSS 2.0 & JSON citation feeds, and white-hat PR outreach.",
    canonicalPath: "/off-page-seo",
    ogType: "website",
    schemaPageType: "CollectionPage",
    keywords: [
      "off page seo services",
      "white hat link building and digital pr",
      "standardized nap citations",
      "anchor text distribution seo",
      "rss and json citation syndication",
    ],
    topicClusterTitle: "White-Hat Off-Page SEO Readiness, Standardized NAP Citations & Partner Attribution",
    topicClusterDescription:
      "Earn legitimate external mentions and authority through verifiable case studies, standardized NAP business identity, embeddable partner attribution badges, and machine-readable RSS/JSON feeds.",
    searchIntentTags: [
      "White-Hat Off-Page SEO Readiness",
      "100% Standardized NAP Citations",
      "Embeddable Partner Attribution Badges",
      "Natural Anchor Text Guidelines",
      "RSS 2.0 & JSON Citation Feeds",
    ],
    faqs: [
      {
        question: "How does Puhayt Digital approach Off-Page SEO ethically?",
        answer:
          "We never buy spam backlinks or fabricate directories. Instead, we build linkable technical assets, verified client case studies, standardized NAP citations, RSS/JSON syndication feeds, and genuine partner attribution badges.",
      },
    ],
  },

  "client-portal": {
    pageId: "client-portal",
    title: "Private Client Portal & Deliverables | Puhayt Digital",
    description:
      "Authenticated client portal for tracking website milestones, domain/hosting status, SEO deliverables, and campaign reports.",
    canonicalPath: "/client-portal",
    ogType: "website",
    schemaPageType: "WebPage",
    noindex: true,
    keywords: ["puhayt digital client portal"],
    topicClusterTitle: "Private Client Deliverables & Milestone Portal",
    topicClusterDescription: "Secure workspace for active Puhayt Digital clients.",
    searchIntentTags: ["Private Client Workspace"],
    faqs: [],
  },

  "not-found": {
    pageId: "not-found",
    title: "404 Page Not Found | Puhayt Digital",
    description:
      "The requested page could not be found on Puhayt Digital. Explore our SEO, GEO, Website Building, Web Design, Domain/Hosting, and Digital Marketing services.",
    canonicalPath: "/",
    ogType: "website",
    schemaPageType: "WebPage",
    noindex: true,
    keywords: ["404 page not found"],
    topicClusterTitle: "Page Not Found — Explore Puhayt Digital Core Services",
    topicClusterDescription: "Navigate back to our main pages using the links above.",
    searchIntentTags: [],
    faqs: [],
  },
};

export function getPageSEOConfig(pageId?: string): PageSEOConfig {
  if (!pageId) return PAGE_SEO_MAP.home;
  const cleanId = pageId.replace(/^#?\/?/, "").toLowerCase() || "home";
  if (cleanId === "reviews") return PAGE_SEO_MAP.testimonials;
  if (cleanId === "case-studies") return PAGE_SEO_MAP.portfolio;
  if (cleanId === "pricing") return PAGE_SEO_MAP.referrals;
  if (cleanId === "backlinks") return PAGE_SEO_MAP["off-page-seo"];
  return PAGE_SEO_MAP[cleanId] || PAGE_SEO_MAP["not-found"];
}

/**
 * Generate Clean, Valid, Non-Fabricated Schema.org JSON-LD Graph
 */
export function generateSchemaJsonLd(config: SiteConfig = SITE_CONFIG, pageId: string = "home") {
  const pageSeo = getPageSEOConfig(pageId);
  const baseUrl = config.siteUrl.replace(/\/$/, "");
  const fullPageUrl =
    pageSeo.canonicalPath === "/" ? `${baseUrl}/` : `${baseUrl}${pageSeo.canonicalPath}`;

  const combinedFaqs = [
    ...pageSeo.faqs,
    {
      question: "What services does Puhayt Digital specialize in?",
      answer:
        "Puhayt Digital specializes in Technical, On-Page & Off-Page SEO, Generative Engine Optimization (GEO) Audits, Custom Website Building (React 19 SSR), 3D Interactive Web Design, Domain DNS & Cloud Edge Hosting with Firebase Authentication, and Google Search & Meta Performance Marketing.",
    },
    {
      question: "How can I contact Puhayt Digital for a website, domain/hosting, SEO, or digital marketing project?",
      answer:
        "You can call or WhatsApp Founder Trishanjit Dalal at +91 7044811476 or Co-Founder Aayush Ghosh at +91 8583878622, or book a strategy consultation at https://puhaytdigital.ai.studio/contact. For clients in Kolkata, our founders travel directly to your business premises for in-person consultations.",
    },
  ];

  return [
    // 1. Organization Schema with Verified Founders & Official Profiles Only
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": config.brandName,
      "legalName": config.legalName,
      "url": `${baseUrl}/`,
      "logo": `${baseUrl}${config.logoUrl}`,
      "description": config.brandDescription,
      "email": config.contactEmail,
      "telephone": config.contactPhone,
      "founders": [
        {
          "@type": "Person",
          "name": "Trishanjit Dalal",
          "jobTitle": "Founder — Ads Runner & Performance Marketing Lead",
          "telephone": "+91 7044811476",
          "url": "https://www.instagram.com/itz___.unknown_13/",
        },
        {
          "@type": "Person",
          "name": "Aayush Ghosh",
          "jobTitle": "Co-Founder — Website Developer, Domain/Hosting Architect & SEO Expert",
          "telephone": "+91 8583878622",
          "url": "https://www.instagram.com/aayushg.dev/",
        },
      ],
      "sameAs": config.socialProfiles.map((s) => s.url),
      "knowsAbout": [
        "Search Engine Optimization (Technical, On-Page, Off-Page & Local SEO)",
        "Generative Engine Optimization (GEO) & AI Answer Engine Visibility",
        "Custom Website Building & Full-Stack React/TypeScript Development",
        "3D WebGL Interactive Web Design & Mobile-First Conversion UI/UX",
        "Domain Registration, Authoritative DNS, Cloud Edge Hosting, SSL & Firebase Authentication",
        "Technical SEO & Core Web Vitals Audits",
        "Google Search PPC & Meta (Instagram/Facebook) Performance Digital Marketing",
      ],
      "publishingPrinciples": `${baseUrl}/llms.txt`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": config.officeAddress.street,
        "addressLocality": config.officeAddress.city,
        "addressRegion": config.officeAddress.state,
        "postalCode": config.officeAddress.postalCode,
        "addressCountry": config.officeAddress.countryCode,
      },
    },

    // 2. ProfessionalService / LocalBusiness Schema (Accurate Service Area, No Fabricated AggregateRating)
    {
      "@context": "https://schema.org",
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${baseUrl}/#localbusiness`,
      "name": "Puhayt Digital",
      "image": config.ogImageUrl,
      "url": `${baseUrl}/`,
      "telephone": config.contactPhone,
      "email": config.contactEmail,
      "priceRange": "₹₹",
      "currenciesAccepted": "INR, USD",
      "paymentAccepted": "UPI, Bank Transfer, Card",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": config.officeAddress.street,
        "addressLocality": config.officeAddress.city,
        "addressRegion": config.officeAddress.state,
        "postalCode": config.officeAddress.postalCode,
        "addressCountry": config.officeAddress.countryCode,
      },
      "areaServed": [
        { "@type": "City", "name": "Kolkata" },
        { "@type": "AdministrativeArea", "name": "West Bengal" },
        { "@type": "Country", "name": "India" },
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "opens": "10:00",
          "closes": "22:00",
        },
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Puhayt Digital — Full-Stack SEO, GEO, Web Engineering, Domain/Hosting & Performance Ads Catalog",
        "itemListElement": config.primaryServices.map((service, idx) => ({
          "@type": "Offer",
          "position": idx + 1,
          "itemOffered": {
            "@type": "Service",
            "@id": `${baseUrl}/#service-${service.id}`,
            "name": service.name,
            "description": service.description,
            "url": `${baseUrl}/services#${service.slug}`,
          },
          "priceSpecification": {
            "@type": "PriceSpecification",
            "price": "10000",
            "minPrice": "10000",
            "priceCurrency": "INR",
            "description": "Custom retainers & project packages starting at ₹10,000",
          },
        })),
      },
      "sameAs": config.socialProfiles.map((s) => s.url),
    },

    // 3. Active Page Schema with SpeakableSpecification for GEO & Voice/AI Assistants
    {
      "@context": "https://schema.org",
      "@type": pageSeo.schemaPageType,
      "@id": `${fullPageUrl}#webpage`,
      "url": fullPageUrl,
      "name": pageSeo.title,
      "description": pageSeo.description,
      "keywords": pageSeo.keywords.join(", "),
      "isPartOf": {
        "@id": `${baseUrl}/#website`,
      },
      "about": {
        "@id": `${baseUrl}/#organization`,
      },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", "#geo-direct-answer", "#seo-geo-knowledge-hub"],
      },
      "inLanguage": "en-US",
    },

    // 4. FAQPage Schema
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${fullPageUrl}#faq`,
      "mainEntity": combinedFaqs.map((f) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer,
        },
      })),
    },

    // 5. WebSite Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": `${baseUrl}/`,
      "name": "Puhayt Digital — SEO, Website Building, Web Design, Domain/Hosting & Digital Marketing",
      "description": config.brandDescription,
      "publisher": {
        "@id": `${baseUrl}/#organization`,
      },
      "inLanguage": ["en-US", "hi-IN", "bn-IN"],
    },

    // 6. Clean Canonical BreadcrumbList Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${baseUrl}/`,
        },
        ...(pageSeo.pageId !== "home"
          ? [
              {
                "@type": "ListItem",
                "position": 2,
                "name": pageSeo.title.split("|")[0].trim(),
                "item": fullPageUrl,
              },
            ]
          : [
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services (Website Building, Web Design, Domain/Hosting, SEO & Ads)",
                "item": `${baseUrl}/services`,
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "GEO & SEO Authority Hub",
                "item": `${baseUrl}/kolkata-geo`,
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Live Client Portfolio",
                "item": `${baseUrl}/portfolio`,
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "SEO & GEO Audit Suite",
                "item": `${baseUrl}/ai-suite`,
              },
              {
                "@type": "ListItem",
                "position": 6,
                "name": "Contact",
                "item": `${baseUrl}/contact`,
              },
            ]),
      ],
    },

    // 7. 6 Core Service Schemas (SEO, Website Building, Web Design, Domain & Hosting, SEO/GEO Audit, Digital Marketing)
    ...config.primaryServices.map((service) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}/#service-${service.id}`,
      "name": service.name,
      "serviceType": service.name,
      "provider": {
        "@id": `${baseUrl}/#organization`,
      },
      "description": service.description,
      "areaServed": ["Kolkata", "West Bengal", "India", "Global"],
    })),

    // 8. Blog & Editorial Schema when on /blog route
    ...(pageSeo.pageId === "blog"
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${baseUrl}/blog#blog-entity`,
            "name": "Puhayt Digital Technical SEO, GEO & Web Engineering Blog",
            "url": `${baseUrl}/blog`,
            "description": pageSeo.description,
            "publisher": {
              "@id": `${baseUrl}/#organization`,
            },
            "author": [
              {
                "@type": "Person",
                "name": "Aayush Ghosh",
                "jobTitle": "Co-Founder — Website Developer & Technical SEO Architect",
              },
              {
                "@type": "Person",
                "name": "Trishanjit Dalal",
                "jobTitle": "Founder — Performance Marketing & Ads Lead",
              },
            ],
          },
        ]
      : []),
  ];
}
