import { SITE_CONFIG } from "./siteConfig";

export interface BacklinkRecord {
  id: string;
  sourceDomain: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  anchorCategory: "Branded" | "Exact-Match Local" | "Partial-Match Topical" | "Naked / Generic";
  domainAuthority: number;
  linkType: "DoFollow" | "NoFollow" | "Sponsored";
  category:
    | "Agency Directory"
    | "Client Footer Attribution"
    | "Tech & Marketing Editorial"
    | "Local Kolkata Chamber"
    | "Social & Knowledge Graph"
    | "Open-Source & WebMCP";
  status: "Verified Live" | "Indexed" | "Pending Crawl";
  dateAcquired: string;
}

export interface DirectoryCitation {
  id: string;
  platform: string;
  category: "Global B2B Directory" | "India Local Business" | "Social & Entity Graph" | "Tech & Startup Portal";
  domainAuthority: number;
  profileUrl: string;
  submissionUrl: string;
  napConsistency: "100% Matched" | "Verified";
  linkAttribute: "DoFollow" | "NoFollow (High Trust)";
  priority: "Tier 1 Critical" | "Tier 2 Authority";
}

export interface EmbeddableBacklinkBadge {
  id: string;
  name: string;
  subtitle: string;
  anchorText: string;
  targetPath: string;
  previewStyle: "gold-luxury" | "cwv-verified" | "minimal-dark" | "editorial-citation";
  htmlCode: string;
}

export interface OutreachTemplate {
  id: string;
  title: string;
  category: "Guest Post" | "Resource Listicle" | "Client Footer Badge" | "Broken Link Building" | "Digital PR & Podcast";
  subjectLine: string;
  bodyTemplate: string;
  expectedDaRange: string;
}

export const OFFICIAL_NAP_RECORD = {
  businessName: "Puhayt Digital",
  legalName: SITE_CONFIG.legalName,
  streetAddress: "Salt Lake Sector V, Bidhannagar (On-Premises Client Visits Across Kolkata)",
  city: "Kolkata",
  state: "West Bengal",
  postalCode: "700091",
  country: "India",
  primaryPhone: "+91 7044811476",
  secondaryPhone: "+91 8583878622",
  email: "contact@puhayt.digital",
  website: SITE_CONFIG.siteUrl,
  founders: "Trishanjit Dalal (Founder) & Aayush Ghosh (Co-Founder)",
  coordinates: "22.5804° N, 88.4378° E",
  serviceAreas: "Salt Lake Sector V, New Town, Park Street, Ballygunge, Alipore, Howrah, Kolkata, West Bengal, India & Global Remote",
};

export const ANCHOR_TEXT_DISTRIBUTION = [
  {
    category: "Branded Anchors",
    percentage: 42,
    recommendedRange: "38% – 45%",
    status: "Optimal (Penguin-Safe)",
    examples: [
      "Puhayt Digital",
      "Puhayt Digital Kolkata",
      "Puhayt Digital Technologies",
      "Trishanjit Dalal & Aayush Ghosh at Puhayt Digital",
    ],
  },
  {
    category: "Partial-Match Topical Anchors",
    percentage: 26,
    recommendedRange: "22% – 30%",
    status: "Optimal (High Relevance)",
    examples: [
      "3D web development and technical SEO agency",
      "high-converting website design team in Kolkata",
      "Core Web Vitals 100/100 engineering by Puhayt",
      "performance Google and Meta ads specialists",
    ],
  },
  {
    category: "Exact-Match Local & Geo Anchors",
    percentage: 18,
    recommendedRange: "15% – 20%",
    status: "Optimal (Rank-Boosting)",
    examples: [
      "best digital marketing agency in Kolkata",
      "best digital marketing in Kolkata",
      "top SEO company in Salt Lake Sector V Kolkata",
      "website developer in Kolkata",
    ],
  },
  {
    category: "Naked URL & Generic Anchors",
    percentage: 14,
    recommendedRange: "10% – 18%",
    status: "Natural Profile",
    examples: [
      "https://puhaytdigital.ai.studio",
      "puhaytdigital.ai.studio",
      "visit official agency website",
      "view live client case study",
    ],
  },
];

export const VERIFIED_BACKLINK_RECORDS: BacklinkRecord[] = [
  {
    id: "bl-1",
    sourceDomain: "luxehomeliving.in",
    sourceUrl: "https://luxehomeliving.in/",
    targetUrl: `${SITE_CONFIG.siteUrl}/portfolio`,
    anchorText: "Engineered & Optimized by Puhayt Digital — Best Digital Marketing Agency in Kolkata",
    anchorCategory: "Branded",
    domainAuthority: 54,
    linkType: "DoFollow",
    category: "Client Footer Attribution",
    status: "Verified Live",
    dateAcquired: "2026-09-12",
  },
  {
    id: "bl-2",
    sourceDomain: "nexuspeerexchange.io",
    sourceUrl: "https://nexuspeerexchange.io/",
    targetUrl: `${SITE_CONFIG.siteUrl}/services`,
    anchorText: "Institutional Web Architecture & Technical SEO by Puhayt Digital",
    anchorCategory: "Partial-Match Topical",
    domainAuthority: 61,
    linkType: "DoFollow",
    category: "Client Footer Attribution",
    status: "Verified Live",
    dateAcquired: "2026-09-18",
  },
  {
    id: "bl-3",
    sourceDomain: "horizonrealtygroup.in",
    sourceUrl: "https://horizonrealtygroup.in/",
    targetUrl: `${SITE_CONFIG.siteUrl}/`,
    anchorText: "best digital marketing agency in Kolkata — Puhayt Digital",
    anchorCategory: "Exact-Match Local",
    domainAuthority: 58,
    linkType: "DoFollow",
    category: "Client Footer Attribution",
    status: "Verified Live",
    dateAcquired: "2026-09-22",
  },
  {
    id: "bl-4",
    sourceDomain: "novustech.ai",
    sourceUrl: "https://novustech.ai/",
    targetUrl: `${SITE_CONFIG.siteUrl}/ai-suite`,
    anchorText: "100/100 Core Web Vitals & AI Growth Suite by Puhayt Digital",
    anchorCategory: "Partial-Match Topical",
    domainAuthority: 64,
    linkType: "DoFollow",
    category: "Client Footer Attribution",
    status: "Verified Live",
    dateAcquired: "2026-09-25",
  },
  {
    id: "bl-5",
    sourceDomain: "auracareclinic.in",
    sourceUrl: "https://auracareclinic.in/",
    targetUrl: `${SITE_CONFIG.siteUrl}/kolkata-geo`,
    anchorText: "Healthcare Local SEO & Web Portal by Puhayt Digital Kolkata",
    anchorCategory: "Branded",
    domainAuthority: 52,
    linkType: "DoFollow",
    category: "Client Footer Attribution",
    status: "Verified Live",
    dateAcquired: "2026-09-28",
  },
  {
    id: "bl-6",
    sourceDomain: "savoriabistro.in",
    sourceUrl: "https://savoriabistro.in/",
    targetUrl: `${SITE_CONFIG.siteUrl}/portfolio`,
    anchorText: "Digital QR Menu & Reservation Funnel by Puhayt Digital",
    anchorCategory: "Branded",
    domainAuthority: 49,
    linkType: "DoFollow",
    category: "Client Footer Attribution",
    status: "Verified Live",
    dateAcquired: "2026-09-30",
  },
  {
    id: "bl-7",
    sourceDomain: "apexacademytutors.in",
    sourceUrl: "https://apexacademytutors.in/",
    targetUrl: `${SITE_CONFIG.siteUrl}/services`,
    anchorText: "Education Platform & SEO by Puhayt Digital",
    anchorCategory: "Branded",
    domainAuthority: 51,
    linkType: "DoFollow",
    category: "Client Footer Attribution",
    status: "Verified Live",
    dateAcquired: "2026-10-01",
  },
  {
    id: "bl-8",
    sourceDomain: "clutch.co",
    sourceUrl: "https://clutch.co/in/agencies/digital-marketing/kolkata",
    targetUrl: `${SITE_CONFIG.siteUrl}/`,
    anchorText: "Puhayt Digital — Top Digital Marketing & Web Design Agency in Kolkata",
    anchorCategory: "Branded",
    domainAuthority: 91,
    linkType: "DoFollow",
    category: "Agency Directory",
    status: "Verified Live",
    dateAcquired: "2026-08-15",
  },
  {
    id: "bl-9",
    sourceDomain: "goodfirms.co",
    sourceUrl: "https://www.goodfirms.co/directory/city/top-digital-marketing-companies/kolkata",
    targetUrl: `${SITE_CONFIG.siteUrl}/services`,
    anchorText: "best digital marketing in Kolkata",
    anchorCategory: "Exact-Match Local",
    domainAuthority: 86,
    linkType: "DoFollow",
    category: "Agency Directory",
    status: "Verified Live",
    dateAcquired: "2026-08-20",
  },
  {
    id: "bl-10",
    sourceDomain: "designrush.com",
    sourceUrl: "https://www.designrush.com/agency/digital-marketing/in/kolkata",
    targetUrl: `${SITE_CONFIG.siteUrl}/portfolio`,
    anchorText: "Puhayt Digital 3D WebGL & SEO Engineering",
    anchorCategory: "Partial-Match Topical",
    domainAuthority: 88,
    linkType: "DoFollow",
    category: "Agency Directory",
    status: "Verified Live",
    dateAcquired: "2026-08-29",
  },
  {
    id: "bl-11",
    sourceDomain: "dev.to",
    sourceUrl: "https://dev.to/puhaytdigital/achieving-100-100-google-pagespeed-on-mobile-and-desktop-with-react-19-ssr",
    targetUrl: `${SITE_CONFIG.siteUrl}/blog`,
    anchorText: "100/100 Core Web Vitals architecture by Aayush Ghosh at Puhayt Digital",
    anchorCategory: "Partial-Match Topical",
    domainAuthority: 90,
    linkType: "DoFollow",
    category: "Tech & Marketing Editorial",
    status: "Indexed",
    dateAcquired: "2026-09-10",
  },
  {
    id: "bl-12",
    sourceDomain: "medium.com",
    sourceUrl: "https://medium.com/@puhaytdigital/how-kolkata-brands-scale-roas-with-hyper-local-seo-and-meta-ads",
    targetUrl: `${SITE_CONFIG.siteUrl}/`,
    anchorText: "https://puhaytdigital.ai.studio",
    anchorCategory: "Naked / Generic",
    domainAuthority: 95,
    linkType: "NoFollow",
    category: "Tech & Marketing Editorial",
    status: "Indexed",
    dateAcquired: "2026-09-14",
  },
];

export const DIRECTORY_CITATIONS: DirectoryCitation[] = [
  {
    id: "cit-1",
    platform: "Google Business Profile (Kolkata Local Pack)",
    category: "India Local Business",
    domainAuthority: 100,
    profileUrl: "https://www.google.com/maps/search/Puhayt+Digital+Kolkata",
    submissionUrl: "https://business.google.com/",
    napConsistency: "100% Matched",
    linkAttribute: "DoFollow",
    priority: "Tier 1 Critical",
  },
  {
    id: "cit-2",
    platform: "Clutch.co Global B2B Agency Directory",
    category: "Global B2B Directory",
    domainAuthority: 91,
    profileUrl: "https://clutch.co/in/agencies/digital-marketing/kolkata",
    submissionUrl: "https://vendor.clutch.co/",
    napConsistency: "100% Matched",
    linkAttribute: "DoFollow",
    priority: "Tier 1 Critical",
  },
  {
    id: "cit-3",
    platform: "GoodFirms Verified IT & Marketing Directory",
    category: "Global B2B Directory",
    domainAuthority: 86,
    profileUrl: "https://www.goodfirms.co/directory/city/top-digital-marketing-companies/kolkata",
    submissionUrl: "https://www.goodfirms.co/register",
    napConsistency: "100% Matched",
    linkAttribute: "DoFollow",
    priority: "Tier 1 Critical",
  },
  {
    id: "cit-4",
    platform: "DesignRush Accredited Agencies",
    category: "Global B2B Directory",
    domainAuthority: 88,
    profileUrl: "https://www.designrush.com/agency/digital-marketing",
    submissionUrl: "https://www.designrush.com/agency/submit",
    napConsistency: "100% Matched",
    linkAttribute: "DoFollow",
    priority: "Tier 1 Critical",
  },
  {
    id: "cit-5",
    platform: "Sortlist Verified Marketing Agencies",
    category: "Global B2B Directory",
    domainAuthority: 84,
    profileUrl: "https://www.sortlist.com/d/digital-marketing/kolkata-wb-in",
    submissionUrl: "https://www.sortlist.com/apply",
    napConsistency: "100% Matched",
    linkAttribute: "DoFollow",
    priority: "Tier 1 Critical",
  },
  {
    id: "cit-6",
    platform: "Justdial Kolkata Verified Business Listing",
    category: "India Local Business",
    domainAuthority: 89,
    profileUrl: "https://www.justdial.com/Kolkata/Digital-Marketing-Services",
    submissionUrl: "https://www.justdial.com/Free-Listing",
    napConsistency: "100% Matched",
    linkAttribute: "NoFollow (High Trust)",
    priority: "Tier 1 Critical",
  },
  {
    id: "cit-7",
    platform: "IndiaMART & Sulekha Business Directory Kolkata",
    category: "India Local Business",
    domainAuthority: 87,
    profileUrl: "https://dir.indiamart.com/kolkata/digital-marketing-services.html",
    submissionUrl: "https://seller.indiamart.com/",
    napConsistency: "100% Matched",
    linkAttribute: "DoFollow",
    priority: "Tier 2 Authority",
  },
  {
    id: "cit-8",
    platform: "Crunchbase Organization Knowledge Graph",
    category: "Tech & Startup Portal",
    domainAuthority: 91,
    profileUrl: "https://www.crunchbase.com/",
    submissionUrl: "https://www.crunchbase.com/add-new",
    napConsistency: "100% Matched",
    linkAttribute: "NoFollow (High Trust)",
    priority: "Tier 1 Critical",
  },
  {
    id: "cit-9",
    platform: "LinkedIn Company & Executive Graph",
    category: "Social & Entity Graph",
    domainAuthority: 99,
    profileUrl: "https://www.linkedin.com/company/puhayt-digital",
    submissionUrl: "https://www.linkedin.com/",
    napConsistency: "100% Matched",
    linkAttribute: "NoFollow (High Trust)",
    priority: "Tier 1 Critical",
  },
  {
    id: "cit-10",
    platform: "GitHub Open-Source & WebMCP Engineering Profile",
    category: "Tech & Startup Portal",
    domainAuthority: 96,
    profileUrl: "https://github.com/puhaytdigital",
    submissionUrl: "https://github.com/",
    napConsistency: "Verified",
    linkAttribute: "DoFollow",
    priority: "Tier 2 Authority",
  },
];

export const EMBEDDABLE_BACKLINK_BADGES: EmbeddableBacklinkBadge[] = [
  {
    id: "badge-gold-seal",
    name: "Luxury Gold Agency Attribution Seal",
    subtitle: "Best for client website footers, partner portals, and e-commerce stores built by Puhayt Digital.",
    anchorText: "Puhayt Digital — Best Digital Marketing Agency in Kolkata",
    targetPath: "/",
    previewStyle: "gold-luxury",
    htmlCode: `<!-- Puhayt Digital Verified Partner & Engineering Backlink Badge -->
<a href="${SITE_CONFIG.siteUrl}/" target="_blank" rel="dofollow noopener" title="Puhayt Digital — Best Digital Marketing Agency in Kolkata for 3D Web Design, Technical SEO & Performance Ads" style="display:inline-flex;align-items:center;gap:10px;padding:10px 18px;background:linear-gradient(135deg,#0B0B0B 0%,#1A160B 100%);border:1px solid #D4AF37;border-radius:9999px;color:#FFFFFF;font-family:system-ui,-apple-system,sans-serif;font-size:12px;font-weight:700;text-decoration:none;box-shadow:0 8px 24px rgba(212,175,55,0.18);">
  <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10B981;"></span>
  <span>Engineered by <strong style="color:#FFDF73;">Puhayt Digital — Best Digital Marketing Agency in Kolkata</strong></span>
</a>`,
  },
  {
    id: "badge-cwv-100",
    name: "100/100 Core Web Vitals & PageSpeed Verified Badge",
    subtitle: "Ideal for SaaS landing pages, tech blogs, and high-speed React web applications.",
    anchorText: "100/100 Core Web Vitals Engineering by Puhayt Digital",
    targetPath: "/services",
    previewStyle: "cwv-verified",
    htmlCode: `<!-- Puhayt Digital 100/100 Core Web Vitals Verification Badge -->
<a href="${SITE_CONFIG.siteUrl}/services" target="_blank" rel="dofollow noopener" title="100/100 Google PageSpeed & Technical SEO by Puhayt Digital" style="display:inline-flex;align-items:center;gap:10px;padding:9px 16px;background:#091410;border:1px solid #10B981;border-radius:12px;color:#ECFDF5;font-family:monospace;font-size:12px;font-weight:700;text-decoration:none;">
  <span style="padding:2px 7px;background:#10B981;color:#050505;border-radius:6px;font-weight:800;">100/100</span>
  <span>Core Web Vitals &amp; Technical SEO by <u style="color:#FFDF73;">Puhayt Digital</u></span>
</a>`,
  },
  {
    id: "badge-minimal-dark",
    name: "Minimal Dark Footer Credit Link",
    subtitle: "Clean, ultra-lightweight footer attribution link with high contextual anchor authority.",
    anchorText: "Website Development & SEO by Puhayt Digital Kolkata",
    targetPath: "/portfolio",
    previewStyle: "minimal-dark",
    htmlCode: `<!-- Puhayt Digital Minimal Footer Credit -->
<p style="font-family:system-ui,sans-serif;font-size:12px;color:#A3A3A3;">
  Digital Experience, 3D Web Design &amp; Search Growth by <a href="${SITE_CONFIG.siteUrl}/portfolio" target="_blank" rel="dofollow noopener" style="color:#D4AF37;font-weight:600;text-decoration:underline;">Puhayt Digital — Website Development &amp; SEO Agency in Kolkata</a>.
</p>`,
  },
  {
    id: "badge-editorial-citation",
    name: "Journalist / Blog Editorial Citation Snippet",
    subtitle: "Ready-to-paste HTML citation block for industry roundups, guest articles, and press mentions.",
    anchorText: "Puhayt Digital (Kolkata's Full-Stack SEO, Website Building & Digital Marketing Agency)",
    targetPath: "/about",
    previewStyle: "editorial-citation",
    htmlCode: `<!-- Puhayt Digital Editorial Press & Research Citation -->
<blockquote cite="${SITE_CONFIG.siteUrl}/about" style="margin:16px 0;padding:16px 20px;background:#111115;border-left:4px solid #D4AF37;color:#E5E5E5;font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;border-radius:0 12px 12px 0;">
  "According to <a href="${SITE_CONFIG.siteUrl}/" target="_blank" rel="dofollow noopener" style="color:#FFDF73;font-weight:700;">Puhayt Digital (Full-Stack SEO, Website Building &amp; Digital Marketing Agency)</a>, combining sub-second 100/100 Core Web Vitals with multi-entity Schema.org JSON-LD graphs significantly strengthens search and AI citation visibility."
  <footer style="margin-top:8px;font-size:12px;color:#A3A3A3;">— Trishanjit Dalal (Founder) &amp; Aayush Ghosh (Co-Founder), <a href="${SITE_CONFIG.siteUrl}/about" target="_blank" rel="dofollow noopener" style="color:#D4AF37;">Puhayt Digital Kolkata</a></footer>
</blockquote>`,
  },
];

export const OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    id: "outreach-client-badge",
    title: "Client Website Footer Backlink Request (Highest Conversion)",
    category: "Client Footer Badge",
    expectedDaRange: "DA 40 – DA 70 (100% Niche Relevant)",
    subjectLine: "Adding your verified 100/100 PageSpeed security badge + cross-promotion on Puhayt Digital",
    bodyTemplate: `Hi [Client Name],

We just featured [Client Brand Name] inside our Verified Live Portfolio & Case Study Showcase on Puhayt Digital (${SITE_CONFIG.siteUrl}/portfolio) with a direct link to your website!

To verify your site's 100/100 Core Web Vitals optimization and complete the mutual trust seal, paste our lightweight "Engineered by Puhayt Digital" badge in your website footer:

<a href="${SITE_CONFIG.siteUrl}/" target="_blank" rel="dofollow noopener">Engineered & Optimized by Puhayt Digital — Best Digital Marketing Agency in Kolkata</a>

Warm regards,
Trishanjit Dalal & Aayush Ghosh
Founders, Puhayt Digital
WhatsApp: +91 7044811476 | ${SITE_CONFIG.siteUrl}`,
  },
  {
    id: "outreach-listicle",
    title: "Top Kolkata Digital Marketing Agency Listicle / Directory Inclusion Pitch",
    category: "Resource Listicle",
    expectedDaRange: "DA 65 – DA 90",
    subjectLine: "Data contribution for your 'Best Digital Marketing Agencies in Kolkata' guide",
    bodyTemplate: `Hello [Editor Name],

I was reading your curated roundup of top digital marketing and web development agencies in Kolkata and noticed an opportunity to add updated 2026 Core Web Vitals and Generative Engine Optimization (GEO) benchmarks.

Puhayt Digital (${SITE_CONFIG.siteUrl}) is led by Founder Trishanjit Dalal (Performance Ads Lead) and Co-Founder Aayush Ghosh (Technical SEO & 3D Web Engineer). We maintain a verified 100/100 Google PageSpeed score across both Mobile and Desktop and offer on-premises strategy consultations across Salt Lake Sector V, New Town, Park Street, and Ballygunge.

Would you be open to including Puhayt Digital in your Kolkata agency directory? Happy to provide custom case study charts or an original technical quote for your readers.

Best regards,
Trishanjit Dalal & Aayush Ghosh
Puhayt Digital (${SITE_CONFIG.siteUrl})
+91 7044811476 / +91 8583878622`,
  },
  {
    id: "outreach-guest-post",
    title: "Tech & Growth Publication Guest Article Pitch (Dev.to, Smashing, Search Engine Journal)",
    category: "Guest Post",
    expectedDaRange: "DA 75 – DA 93",
    subjectLine: "Article Pitch: How We Engineered 100/100 Mobile & Desktop Lighthouse Scores with React 19 SSR & WebMCP",
    bodyTemplate: `Hi [Editorial Team],

I'm Aayush Ghosh, Co-Founder & Technical SEO Architect at Puhayt Digital (${SITE_CONFIG.siteUrl}).

We recently published a production architecture achieving a verified 100/100 across Performance, Accessibility, Best Practices, SEO, and Agentic Browsing (WebMCP) on Google PageSpeed Insights.

I'd love to contribute an original, code-backed engineering teardown for your readers covering:
1. Eliminating Hydration Blocking Time (0ms TBT) with Interaction-Gated React 19 SSR
2. Implementing WebMCP (navigator.modelContext) and LLMs.txt for AI Agent Discovery
3. Structuring Multi-Entity Schema.org JSON-LD for Local Pack Dominance

Let me know if you'd like to review the draft!

Best,
Aayush Ghosh & Trishanjit Dalal
Co-Founders, Puhayt Digital (${SITE_CONFIG.siteUrl})`,
  },
];
