import React, { useState } from "react";
import {
  Search,
  Code2,
  Palette,
  Server,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  BookOpen,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

interface GeoPillar {
  id: string;
  badge: string;
  title: string;
  primaryKeywords: string[];
  whatItIs: string;
  whoItIsFor: string;
  whyItMatters: string;
  howItWorks: string;
  whatIsIncluded: string[];
  howItDiffers: string;
  limitations: string;
  howToGetStarted: string;
  relatedPageHref: string;
  relatedPageId: string;
  relatedPageLabel: string;
  specialist: string;
}

const GEO_PILLARS: GeoPillar[] = [
  {
    id: "best-seo",
    badge: "Pillar 01 • Search Engine Optimization",
    title: "Best SEO Services: Technical, On-Page, Off-Page & Local Search Engineering",
    primaryKeywords: [
      "best SEO",
      "technical SEO services",
      "on-page and off-page SEO",
      "local SEO agency Kolkata",
      "search engine optimization company",
    ],
    whatItIs:
      "Search Engine Optimization (SEO) is the technical and editorial discipline of structuring a website's code, content hierarchy, Schema.org entities, and external citations so Google, Bing, and AI answer engines accurately crawl, index, and rank its pages for relevant commercial and informational queries.",
    whoItIsFor:
      "Local businesses, e-commerce stores, healthcare clinics, real estate developers, B2B SaaS companies, and professional service firms seeking sustainable, compounding inbound leads without relying exclusively on paid ad spend.",
    whyItMatters:
      "High-intent buyers actively search Google before purchasing. Proper technical and semantic SEO lowers customer acquisition cost (CAC) over time, establishes domain credibility, and captures organic demand 24/7.",
    howItWorks:
      "We execute a 4-stage engineering pipeline: (1) Crawlability & Core Web Vitals remediation (SSR pre-rendering, clean canonical URLs, XML sitemaps), (2) Search-intent mapping & semantic H1–H3 content architecture, (3) Consolidated JSON-LD entity graphs, and (4) White-hat Off-Page digital PR and standardized NAP citations.",
    whatIsIncluded: [
      "Full Technical SEO & Crawl Budget Optimization (sitemap.xml, robots.txt, canonicals)",
      "On-Page Semantic Content, Title/Meta & H1–H3 Hierarchy Engineering",
      "Schema.org JSON-LD Entity Graph (Organization, LocalBusiness, Service, FAQPage)",
      "Google Business Profile & Local Map Pack Optimization",
      "White-Hat Off-Page Authority Citations & Penguin-Safe Link Architecture",
    ],
    howItDiffers:
      "Unlike agencies that rely on automated keyword stuffing or spam backlink packages, Co-Founder Aayush Ghosh engineers code-level technical SEO directly into the React/SSR architecture alongside genuine topical authority.",
    limitations:
      "Organic SEO is a compounding medium-to-long-term investment. While technical indexing fixes take effect within days, competitive keyword rankings typically require 30 to 90+ days depending on domain history and market competition. No ethical agency can guarantee an overnight #1 Google ranking.",
    howToGetStarted:
      "Request a technical SEO & GEO audit or speak directly with Co-Founder Aayush Ghosh (+91 8583878622) to review your current search visibility.",
    relatedPageHref: "/off-page-seo",
    relatedPageId: "off-page-seo",
    relatedPageLabel: "Explore Off-Page SEO & Authority Hub",
    specialist: "Aayush Ghosh — Co-Founder & Technical SEO Expert",
  },
  {
    id: "best-website-building",
    badge: "Pillar 02 • Custom Website Building",
    title: "Best Website Building: Full-Stack React, Next.js & Custom Web Development",
    primaryKeywords: [
      "best website building",
      "custom website builder",
      "full-stack web development",
      "business website development",
      "e-commerce website building",
    ],
    whatItIs:
      "Custom website building is the end-to-end software engineering of fast, secure, and scalable web applications, corporate digital profiles, and e-commerce platforms tailored to a business's exact conversion workflow.",
    whoItIsFor:
      "Startups, growing SMBs, retail brands, clinics, coaching institutes, and enterprises that have outgrown slow, rigid drag-and-drop website builders and need a reliable production web platform.",
    whyItMatters:
      "Your website is your primary digital asset. A custom-engineered site eliminates plugin bloat, prevents security vulnerabilities, loads in under a second on mobile networks, and integrates directly with WhatsApp, UPI/payment gateways, and CRM pipelines.",
    howItWorks:
      "We architect every build from clean TypeScript, React 19, and server-side pre-rendering (SSR), pairing an instant-loading static shell with modular interactive components, secure Firebase/Node.js backend APIs, and automated CI/CD deployment.",
    whatIsIncluded: [
      "100% Custom In-House Code (React, TypeScript, Tailwind CSS, Node.js/Express)",
      "Server-Side Pre-Rendered HTML for Instant First Contentful Paint (FCP)",
      "Custom Lead Capture Forms, WhatsApp Automation & Booking Workflows",
      "Client Portal, Admin CMS & Real-Time Analytics Integration",
      "100/100 Mobile & Desktop Core Web Vitals Optimization",
    ],
    howItDiffers:
      "Instead of installing 30+ third-party WordPress plugins that degrade mobile PageSpeed to 45/100, we write clean, zero-bloat production code with a strict Zero-Subcontracting SLA.",
    limitations:
      "Bespoke full-stack website engineering requires 10 to 14 days for proper architecture, testing, and QA, whereas generic pre-made templates can be spun up in an afternoon but sacrifice speed and differentiation.",
    howToGetStarted:
      "Inspect our live interactive client websites in the Portfolio or book a technical scoping call to plan your website build.",
    relatedPageHref: "/portfolio",
    relatedPageId: "portfolio",
    relatedPageLabel: "Open Live Websites in Portfolio",
    specialist: "Aayush Ghosh — Co-Founder & Lead Website Developer",
  },
  {
    id: "best-web-design",
    badge: "Pillar 03 • Bespoke Web Design & 3D UI/UX",
    title: "Best Web Design: Conversion-First UI/UX & Interactive 3D WebGL Experiences",
    primaryKeywords: [
      "best web design",
      "web design company",
      "3D interactive web design",
      "responsive mobile web design",
      "UI UX design agency",
    ],
    whatItIs:
      "Web design encompasses visual brand architecture, typographic hierarchy, mobile-first user experience (UX), conversion rate optimization (CRO), and interactive 3D WebGL/Three.js motion systems.",
    whoItIsFor:
      "Luxury brands, D2C e-commerce stores, real estate showcases, hospitality venues, fintech platforms, and modern service businesses that need to command immediate trust and authority.",
    whyItMatters:
      "Users form an impression of a brand's credibility within milliseconds. Clear visual hierarchy, accessible contrast, frictionless mobile navigation, and purposeful micro-interactions directly increase inquiry and checkout conversion rates.",
    howItWorks:
      "We design mobile-first wireframes and high-contrast visual systems focused on primary user intent, embedding interaction-gated 3D WebGL visuals that enhance aesthetics without blocking initial page rendering.",
    whatIsIncluded: [
      "Bespoke Brand Visual System, Typography & Color Architecture",
      "Mobile-First Responsive Layouts (48px+ Ergonomic Touch Targets)",
      "Interaction-Gated Three.js / WebGL 3D Visuals (Zero LCP Penalty)",
      "Conversion-Engineered Above-the-Fold Hero & CTA Funnels",
      "WCAG AA Contrast & Keyboard Accessibility Compliance",
    ],
    howItDiffers:
      "Most 3D or animated websites suffer from severe mobile lag. Our interaction-gated architecture serves an instant vector backdrop first and loads WebGL only after user interaction—combining luxury design with 100/100 mobile speed.",
    limitations:
      "Heavy 3D WebGL scenes are automatically disabled on devices with Reduced Motion or Save-Data enabled to protect battery life and accessibility.",
    howToGetStarted:
      "Browse our Services & Portfolio to test live responsive viewports across Mobile, Tablet, and Desktop.",
    relatedPageHref: "/services",
    relatedPageId: "services",
    relatedPageLabel: "View Web Design & 3D Capabilities",
    specialist: "Aayush Ghosh & Trishanjit Dalal — Design & CRO Team",
  },
  {
    id: "best-domain-and-hosting",
    badge: "Pillar 04 • Domain, Cloud Hosting & Security",
    title: "Best Domain and Hosting: DNS Architecture, Cloud Edge Hosting, SSL & Authentication",
    primaryKeywords: [
      "best domain and hosting",
      "domain",
      "hosting",
      "domain registration and DNS setup",
      "cloud web hosting with SSL",
      "website authentication setup",
    ],
    whatItIs:
      "Domain and hosting infrastructure is the foundational network layer of a website—covering domain name registration (.com, .in, .ai, .io), authoritative DNS routing, global CDN edge hosting, TLS/SSL encryption, and user authentication.",
    whoItIsFor:
      "New businesses registering their first domain, companies migrating away from slow shared hosting, and web applications requiring secure Google/Email/Phone login and role-based access control.",
    whyItMatters:
      "Slow server Time to First Byte (TTFB), misconfigured DNS records, expired SSL certificates, or insecure login flows break both user trust and Google search rankings. Enterprise cloud hosting ensures 99.9%+ uptime and global Brotli/Gzip delivery.",
    howItWorks:
      "Co-Founder Aayush Ghosh configures your custom domain DNS (A, AAAA, CNAME, TXT, SPF/DKIM/DMARC), deploys containerized Cloud Run / Edge CDN hosting with automatic HTTPS/TLS certificates, and integrates Firebase Authentication with strict security rules.",
    whatIsIncluded: [
      "Custom Domain Selection, Registration Guidance & Full DNS Management",
      "High-Availability Cloud & Edge CDN Hosting with Brotli/Gzip Compression",
      "Automated HTTPS / TLS SSL Certificates & HSTS Security Headers",
      "Firebase Authentication (Google OAuth, Email/Password, OTP & Role RBAC)",
      "Professional Business Email DNS Setup (SPF, DKIM, DMARC Deliverability)",
    ],
    howItDiffers:
      "Clients retain 100% legal ownership of their domain name and cloud accounts. We never lock your domain hostage—we engineer and manage the infrastructure transparently on your behalf.",
    limitations:
      "Annual domain registrar renewals and high-volume cloud compute usage are billed based on actual registrar/cloud tier requirements, which we scope transparently upfront.",
    howToGetStarted:
      "Contact Co-Founder Aayush Ghosh (+91 8583878622) for domain, cloud hosting, SSL, and authentication setup.",
    relatedPageHref: "/contact",
    relatedPageId: "contact",
    relatedPageLabel: "Consult on Domain & Cloud Hosting",
    specialist: "Aayush Ghosh — Domain, Hosting & Authentication Lead",
  },
  {
    id: "best-seo-and-geo-audit",
    badge: "Pillar 05 • SEO & GEO Technical Audit",
    title: "Best SEO and GEO Audit: Core Web Vitals, Schema Entity & AI Answer Readiness",
    primaryKeywords: [
      "best SEO and GEO audit",
      "GEO audit",
      "Generative Engine Optimization audit",
      "technical SEO website audit",
      "AI search visibility audit",
    ],
    whatItIs:
      "An SEO and Generative Engine Optimization (GEO) Audit is a comprehensive diagnostic evaluation of how effectively a website is discovered, crawled, understood, and cited by both traditional search engines (Google, Bing) and AI answer engines (ChatGPT, Google AI Overviews, Perplexity, Gemini, Claude).",
    whoItIsFor:
      "Businesses experiencing stagnant organic traffic, poor mobile PageSpeed scores, missing rich snippets, or low citation visibility when prospects ask AI assistants for category recommendations.",
    whyItMatters:
      "Search behavior now spans both Google blue links and conversational AI synthesis. Auditing both Technical SEO and GEO ensures your brand's factual claims, pricing, services, and credentials are machine-readable and cite-ready.",
    howItWorks:
      "Our audit inspects 25+ technical signals: HTTP status codes, canonical consistency, sitemap/robots directives, LCP/INP/CLS telemetry, JSON-LD entity graphs, SpeakableSpecification selectors, and machine-readable `/llms.txt` & `/geo-knowledge-graph.json` endpoints.",
    whatIsIncluded: [
      "Core Web Vitals (LCP, INP, CLS) & Mobile PageSpeed Bottleneck Teardown",
      "Crawlability, Indexability, Canonical URL & Sitemap Verification",
      "Schema.org JSON-LD Validation (Zero Fake Ratings, Accurate Entity Graph)",
      "GEO & AI Citation Readiness Check (llms.txt, Speakable & Direct Answer Formatting)",
      "Prioritized Engineering Action Plan with Measurable Fixes",
    ],
    howItDiffers:
      "Instead of generic automated PDF exports, we combine an instant interactive AI SEO Auditor with a manual founder-led code and entity review.",
    limitations:
      "An audit identifies technical bottlenecks and strategic gaps; ranking improvements require implementing the recommended code, content, and authority changes on your production site.",
    howToGetStarted:
      "Run a free instant scan in our AI Marketing Suite or request a founder-verified SEO & GEO audit.",
    relatedPageHref: "/ai-suite",
    relatedPageId: "ai-suite",
    relatedPageLabel: "Launch Interactive SEO & GEO Audit",
    specialist: "Aayush Ghosh & Trishanjit Dalal — SEO & GEO Audit Desk",
  },
  {
    id: "best-digital-marketing",
    badge: "Pillar 06 • Full-Funnel Digital Marketing",
    title: "Best Digital Marketing: High-ROAS Google Search Ads, Meta Ads & Conversion Funnels",
    primaryKeywords: [
      "best digital marketing",
      "digital marketing agency",
      "Google Ads management",
      "Meta Facebook Instagram ads",
      "performance marketing agency",
    ],
    whatItIs:
      "Performance digital marketing is the data-driven acquisition of qualified leads and sales through targeted Google Search PPC, Meta (Instagram & Facebook) ad campaigns, conversion landing pages, and automated WhatsApp/CRM follow-up.",
    whoItIsFor:
      "Growth-focused businesses—local clinics, real estate builders, retail showrooms, coaching academies, D2C brands, and B2B companies—seeking immediate buyer inquiries alongside long-term SEO.",
    whyItMatters:
      "While SEO builds long-term organic equity, precision paid advertising generates qualified buyer inquiries within 24 to 48 hours of launch, allowing businesses to validate offers and scale revenue predictably.",
    howItWorks:
      "Founder Trishanjit Dalal structures high-intent keyword campaigns on Google Search and demographic/retargeting funnels on Meta, routing clicks to sub-second landing pages with server-side conversion tracking and instant WhatsApp lead alerts.",
    whatIsIncluded: [
      "Google Search, Display & Local Service Ads Setup & Bid Optimization",
      "Meta (Instagram & Facebook) Creative Testing & Retargeting Funnels",
      "Dedicated High-Speed Conversion Landing Pages",
      "Real-Time ROAS, Cost-Per-Lead (CPL) & Attribution Tracking",
      "Automated WhatsApp & AI Intake Follow-Up Sequences",
    ],
    howItDiffers:
      "We focus on verified Return on Ad Spend (ROAS — 1.3X minimum baseline) and actual qualified inquiries rather than vanity impressions or low-quality click traffic.",
    limitations:
      "Paid advertising requires a dedicated media ad spend budget paid directly to Google/Meta in addition to management retainers, and campaign efficiency depends on offer competitiveness and timely sales follow-up.",
    howToGetStarted:
      "Connect directly with Founder Trishanjit Dalal (+91 7044811476) on WhatsApp or view our transparent growth packages.",
    relatedPageHref: "/referrals",
    relatedPageId: "referrals",
    relatedPageLabel: "View Digital Marketing Packages & Offers",
    specialist: "Trishanjit Dalal — Founder & Performance Marketing Lead",
  },
];

const DIRECT_QA_ITEMS = [
  {
    question: "What is the difference between traditional SEO and Generative Engine Optimization (GEO)?",
    directAnswer:
      "Traditional SEO optimizes web pages to rank in Google and Bing search result links, while Generative Engine Optimization (GEO) structures entity data, factual definitions, and machine-readable files (/llms.txt, JSON-LD) so AI systems like ChatGPT, Google AI Overviews, Perplexity, and Gemini accurately summarize and cite your business.",
    explanation:
      "Modern buyers use both keyword searches ('best web design company') and conversational AI prompts ('compare custom React website building vs WordPress for an e-commerce store'). Implementing both SEO and GEO ensures your website satisfies classic ranking algorithms while providing clear, structured facts that LLMs can extract without hallucination.",
    supportingDetails: [
      "Traditional SEO relies on title tags, H1–H3 headings, internal links, Core Web Vitals, and backlinks.",
      "GEO adds SpeakableSpecification schema, concise WHAT/WHO/WHY/HOW definitions, comparison tables, and /llms-full.txt documentation.",
    ],
    relatedLinks: [
      { label: "Kolkata GEO & AI Authority Hub", href: "/kolkata-geo", pageId: "kolkata-geo" },
      { label: "Off-Page SEO & Citations", href: "/off-page-seo", pageId: "off-page-seo" },
    ],
  },
  {
    question: "How do domain registration, cloud hosting, SSL, and authentication impact SEO and website speed?",
    directAnswer:
      "Fast DNS resolution, edge cloud hosting with Brotli/Gzip compression, and valid HTTPS/TLS certificates directly improve Time to First Byte (TTFB), Core Web Vitals, and Google's HTTPS security ranking signal.",
    explanation:
      "Even a well-designed website will fail Core Web Vitals if hosted on overcrowded shared servers without edge caching. Proper DNS configuration (including SPF, DKIM, and DMARC) also protects domain reputation, while Firebase Authentication secures client portals without slowing down public pages.",
    supportingDetails: [
      "Sub-100ms server response time accelerates Largest Contentful Paint (LCP).",
      "Strict-Transport-Security (HSTS) and SSL encryption are mandatory trust signals for modern browsers and search crawlers.",
    ],
    relatedLinks: [
      { label: "Explore Web & Cloud Services", href: "/services", pageId: "services" },
      { label: "Contact Technical Desk", href: "/contact", pageId: "contact" },
    ],
  },
  {
    question: "Why choose custom website building (React/SSR) over generic drag-and-drop templates?",
    directAnswer:
      "Custom server-pre-rendered React websites eliminate third-party plugin bloat, achieve 100/100 mobile and desktop PageSpeed scores, and allow tailored conversion flows that generic templates cannot match.",
    explanation:
      "Template builders load megabytes of unused CSS and JavaScript on every page, causing high bounce rates on mobile networks. A custom-built architecture inlines critical CSS, defers non-essential scripts until user interaction, and structures semantic HTML specifically for your target search intents.",
    supportingDetails: [
      "0ms Total Blocking Time (TBT) and 0 Cumulative Layout Shift (CLS).",
      "Full ownership of source code, custom UI/UX, and seamless integration with WhatsApp, UPI, and CRM APIs.",
    ],
    relatedLinks: [
      { label: "Inspect Live Client Websites", href: "/portfolio", pageId: "portfolio" },
      { label: "Read Technical Blog Teardowns", href: "/blog", pageId: "blog" },
    ],
  },
  {
    question: "How should a business combine SEO, Web Design, and Digital Marketing Ads for maximum ROI?",
    directAnswer:
      "High-converting web design provides the foundation, paid Google and Meta ads generate immediate buyer leads within 48 hours, and technical SEO + GEO build compounding organic traffic over 30 to 90+ days.",
    explanation:
      "Running paid ads to a slow, poorly designed website wastes ad spend. Conversely, relying only on SEO takes time to ramp up. Combining a fast conversion website with targeted search/social ads and ongoing technical SEO creates both immediate cash flow and long-term search equity.",
    supportingDetails: [
      "Phase 1 (Days 1–14): Custom website build, domain/hosting setup, and technical SEO foundation.",
      "Phase 2 (48 Hours Post-Launch): High-intent Google Search & Meta ad funnels go live.",
      "Phase 3 (Days 30–90+): Topical authority, local map pack, and GEO citations compound organic inquiries.",
    ],
    relatedLinks: [
      { label: "View Growth Packages & Discounts", href: "/referrals", pageId: "referrals" },
      { label: "Book Free Strategy Consultation", href: "/contact", pageId: "contact" },
    ],
  },
];

interface GeoPillarHubSectionProps {
  onNavigate?: (pageId: string) => void;
}

export const GeoPillarHubSection: React.FC<GeoPillarHubSectionProps> = ({ onNavigate }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>("all");

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, pageId: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(pageId);
    }
  };

  const getPillarIcon = (id: string) => {
    switch (id) {
      case "best-seo":
        return <Search className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />;
      case "best-website-building":
        return <Code2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />;
      case "best-web-design":
        return <Palette className="w-4 h-4 text-[#FFDF73]" aria-hidden="true" />;
      case "best-domain-and-hosting":
        return <Server className="w-4 h-4 text-emerald-400" aria-hidden="true" />;
      case "best-seo-and-geo-audit":
        return <Sparkles className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />;
      case "best-digital-marketing":
        return <TrendingUp className="w-4 h-4 text-amber-400" aria-hidden="true" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />;
    }
  };

  const visiblePillars =
    selectedPillarId === "all"
      ? GEO_PILLARS
      : GEO_PILLARS.filter((p) => p.id === selectedPillarId);

  return (
    <section
      id="seo-geo-knowledge-hub"
      aria-labelledby="seo-geo-hub-heading"
      className="py-14 sm:py-20 bg-[#0B0B0B] relative overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <header className="text-center max-w-4xl mx-auto space-y-3.5">
          <div className="inline-flex items-center space-x-2 glass-card-gold px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 text-[11px] sm:text-xs font-bold text-[#FFDF73] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            <span>Search Intent &amp; Generative Engine Optimization (GEO) Architecture</span>
          </div>

          <h2
            id="seo-geo-hub-heading"
            className="font-serif responsive-section-title font-extrabold text-white tracking-tight leading-tight"
          >
            Complete Authority Across{" "}
            <span className="gold-gradient-text">
              SEO, Website Building, Web Design, Domain &amp; Hosting, GEO Audits &amp; Digital Marketing
            </span>
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto">
            Structured for immediate human clarity, Google Search topical authority, and AI Answer Engine citation. Explore what each core discipline is, who it serves, how we engineer it in-house, what is included, and realistic scope expectations.
          </p>
        </header>

        {/* Topic Filter Pills */}
        <nav
          aria-label="Filter Core Service Pillars"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => setSelectedPillarId("all")}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
              selectedPillarId === "all"
                ? "gold-gradient-bg text-black shadow-lg"
                : "bg-white/5 text-neutral-300 hover:text-white border border-white/10"
            }`}
          >
            All 6 Core Pillars
          </button>
          {GEO_PILLARS.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setSelectedPillarId(pillar.id)}
              className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                selectedPillarId === pillar.id
                  ? "gold-gradient-bg text-black font-bold shadow-lg"
                  : "bg-white/5 text-neutral-300 hover:text-white border border-white/10"
              }`}
            >
              {getPillarIcon(pillar.id)}
              <span>{pillar.primaryKeywords[0].replace(/\b\w/g, (c) => c.toUpperCase())}</span>
            </button>
          ))}
        </nav>

        {/* 6 Pillar Structured GEO Cards (WHAT / WHO / WHY / HOW / INCLUDED / DIFFERENCE / LIMITATIONS / START) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visiblePillars.map((pillar) => (
            <article
              key={pillar.id}
              id={pillar.id}
              className="glass-card p-5 sm:p-7 rounded-3xl border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between space-y-5 bg-gradient-to-b from-white/[0.02] to-transparent"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#FFDF73] border border-[#D4AF37]/30">
                    {getPillarIcon(pillar.id)}
                    <span>{pillar.badge}</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {pillar.specialist}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug">
                  {pillar.title}
                </h3>

                {/* Structured GEO Definition List */}
                <dl className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3 rounded-2xl bg-black/50 border border-white/5">
                    <dt className="font-mono font-bold text-[#FFDF73] uppercase text-[10px] tracking-wider mb-1">
                      1. What It Is &amp; Who It Is For
                    </dt>
                    <dd className="text-neutral-200">
                      <strong className="text-white">Definition:</strong> {pillar.whatItIs}{" "}
                      <strong className="text-white">Ideal Audience:</strong> {pillar.whoItIsFor}
                    </dd>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/50 border border-white/5">
                    <dt className="font-mono font-bold text-emerald-400 uppercase text-[10px] tracking-wider mb-1">
                      2. Why It Matters &amp; How It Works
                    </dt>
                    <dd className="text-neutral-200">
                      <strong className="text-white">Impact:</strong> {pillar.whyItMatters}{" "}
                      <strong className="text-white">Execution:</strong> {pillar.howItWorks}
                    </dd>
                  </div>

                  <div className="p-3 rounded-2xl bg-black/50 border border-white/5">
                    <dt className="font-mono font-bold text-cyan-300 uppercase text-[10px] tracking-wider mb-1.5">
                      3. What Is Included (Deliverables)
                    </dt>
                    <dd>
                      <ul className="grid grid-cols-1 gap-1.5 text-neutral-200">
                        {pillar.whatIsIncluded.map((item) => (
                          <li key={item} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                      <dt className="font-mono font-bold text-[#FFDF73] uppercase text-[10px] tracking-wider mb-1">
                        4. How It Differs
                      </dt>
                      <dd className="text-neutral-300 text-[11px]">{pillar.howItDiffers}</dd>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                      <dt className="font-mono font-bold text-amber-300 uppercase text-[10px] tracking-wider mb-1">
                        5. Realistic Scope &amp; Limitations
                      </dt>
                      <dd className="text-neutral-300 text-[11px]">{pillar.limitations}</dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* Footer Action & Semantic Internal Link */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <p className="text-[11px] text-neutral-300">
                  <strong className="text-[#FFDF73]">How to Get Started:</strong> {pillar.howToGetStarted}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {pillar.primaryKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] text-neutral-300 font-mono"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  <a
                    href={pillar.relatedPageHref}
                    onClick={(e) => handleLinkClick(e, pillar.relatedPageId)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs shadow-md hover:scale-[1.02] transition-transform shrink-0"
                  >
                    <span>{pillar.relatedPageLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* AI-Answer Optimization: Direct Question & Answer Synthesis Block */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono font-bold text-[#FFDF73] uppercase tracking-wider">
                <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
                <span>AI-Answer &amp; Search Snippet Optimization</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Direct Answers to Core SEO, GEO, Website Building &amp; Hosting Questions
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <a
                href="/llms-full.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#FFDF73] font-mono flex items-center space-x-1"
              >
                <span>/llms-full.txt</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a
                href="/geo-knowledge-graph.json"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-emerald-400 font-mono flex items-center space-x-1"
              >
                <span>/geo-knowledge-graph.json</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {DIRECT_QA_ITEMS.map((qa) => (
              <article
                key={qa.question}
                className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                    {qa.question}
                  </h4>
                  <p className="text-xs text-[#FFDF73] font-medium leading-relaxed bg-[#D4AF37]/10 p-3 rounded-xl border border-[#D4AF37]/25">
                    <strong>Direct Answer:</strong> {qa.directAnswer}
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {qa.explanation}
                  </p>
                  <ul className="space-y-1 text-[11px] text-neutral-300 pt-1">
                    {qa.supportingDetails.map((detail) => (
                      <li key={detail} className="flex items-start space-x-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-neutral-400">
                    Related Pages:
                  </span>
                  {qa.relatedLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.pageId)}
                      className="text-[11px] font-semibold text-[#FFDF73] hover:text-white underline underline-offset-4 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
