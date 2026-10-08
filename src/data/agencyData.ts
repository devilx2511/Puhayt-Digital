import { ServiceCategory, PortfolioProject, CaseStudy, PricingPlan, Testimonial, BlogPost, ClientPortalData, TeamMemberProfile, DiscountOffer, UserReferralStats } from "../types";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "web-dev",
    title: "Website Building & 3D Web Design",
    description: "Custom server-pre-rendered React websites, interactive 3D WebGL experiences, and mobile-first UI/UX engineered to convert visitors into clients.",
    iconName: "Globe",
    items: [
      {
        id: "corp-web",
        name: "Custom Website Building & 3D Web Design",
        tagline: "Sub-Second Speed & Interactive 3D UX",
        description: "Bespoke websites built from clean React & TypeScript code with interaction-gated 3D WebGL visuals, fluid micro-interactions, and 100/100 Core Web Vitals.",
        features: ["Custom React 19 & SSR Pre-Rendering", "Interaction-Gated 3D WebGL Visuals", "Mobile-First Conversion UI/UX", "Direct WhatsApp & Lead CRM Integration"],
        popular: true
      },
      {
        id: "ecom-web",
        name: "High-Converting E-Commerce Stores",
        tagline: "Custom Catalogs & Fast Checkout",
        description: "Custom e-commerce architectures engineered for mobile product discovery, instant filtering, UPI/card checkout flows, and automated order inquiries.",
        features: ["Sub-Second Catalog Filtering", "UPI & Payment Gateway Integration", "Product Schema.org Markup", "Automated WhatsApp Cart Recovery"]
      },
      {
        id: "web-apps",
        name: "Full-Stack Web Applications & Portals",
        tagline: "Scalable Client Dashboards & PWAs",
        description: "React and Node.js client portals, booking platforms, and progressive web apps with real-time Firestore databases and role-based access.",
        features: ["Real-Time Client Dashboards", "Role-Based Access Control (RBAC)", "REST API & Webhook Architecture", "Installable PWA Support"]
      }
    ]
  },
  {
    id: "digital-marketing",
    title: "SEO, GEO Audits & Digital Marketing",
    description: "Technical On-Page & Off-Page SEO, Generative Engine Optimization (GEO) audits, and conversion-tracked Google Search & Meta ad funnels.",
    iconName: "TrendingUp",
    items: [
      {
        id: "seo-domination",
        name: "Technical, On-Page, Off-Page & Local SEO",
        tagline: "Sustainable Google Search Visibility",
        description: "Code-level technical SEO, semantic topic clusters, consolidated Schema.org JSON-LD graphs, Local Map Pack optimization, and white-hat digital PR citations.",
        features: ["Core Web Vitals & Crawlability Fixes", "Search-Intent Content & H1–H3 Architecture", "Google Business Profile & Local SEO", "White-Hat Off-Page Citations & Backlinks"],
        popular: true
      },
      {
        id: "geo-audit",
        name: "Comprehensive SEO & GEO Technical Audit",
        tagline: "Google + AI Answer Engine Readiness",
        description: "25-point diagnostic audit covering Google Search Console indexability, Core Web Vitals, JSON-LD entity accuracy, and AI citation readiness (ChatGPT, Perplexity, Gemini).",
        features: ["LCP, INP & CLS Performance Teardown", "Canonical, Sitemap & Robots.txt Audit", "LLMs.txt & Speakable Schema Setup", "Prioritized Engineering Fix Roadmap"]
      },
      {
        id: "ppc-scaling",
        name: "Google Search Ads & Meta Performance Marketing",
        tagline: "High-Intent Buyer Lead Acquisition",
        description: "Precision-targeted Google Search PPC and Instagram/Facebook ad campaigns with dedicated landing pages and real-time ROAS tracking.",
        features: ["High-Intent Google Search PPC", "Meta (Instagram & Facebook) Retargeting", "Conversion Landing Page Funnels", "Real-Time 1.3X+ Target ROAS Tracking"]
      }
    ]
  },
  {
    id: "domain-hosting",
    title: "Domain, Cloud Hosting & Security",
    description: "End-to-end custom domain DNS architecture, global edge cloud hosting, automated SSL/TLS encryption, and Firebase user authentication.",
    iconName: "Shield",
    items: [
      {
        id: "domain-dns",
        name: "Custom Domain Registration & DNS Setup",
        tagline: "100% Client Domain Ownership",
        description: "Strategic domain selection (.com, .in, .ai, .io), authoritative DNS record configuration, and email authentication records for maximum deliverability.",
        features: ["A, AAAA, CNAME & TXT Record Setup", "SPF, DKIM & DMARC Email Security", "Clean www / non-www 301 Redirects", "100% Client Registrar Ownership"],
        popular: true
      },
      {
        id: "cloud-hosting",
        name: "Cloud Run & Edge CDN Web Hosting",
        tagline: "Sub-100ms TTFB & Auto-Scaling",
        description: "Containerized cloud hosting with global CDN caching, Brotli/Gzip compression, automated HTTPS/SSL certificates, and enterprise security headers.",
        features: ["Global Edge CDN & Brotli Compression", "Automated TLS/SSL & HSTS Headers", "Zero-Downtime CI/CD Deployments", "24/7 Health Probes & Uptime Monitoring"]
      },
      {
        id: "auth-security",
        name: "Website Authentication & Database Security",
        tagline: "Firebase Auth, OAuth & RBAC Rules",
        description: "Secure user sign-in systems supporting Google OAuth, Email/Password, Phone OTP, and strict Firestore security rules with reCAPTCHA Enterprise.",
        features: ["Google OAuth & Email/Phone Login", "Strict Database Security Rules", "Google reCAPTCHA Enterprise Protection", "Protected Client & Admin Portals"]
      }
    ]
  },
  {
    id: "branding",
    title: "Branding & Visual Identity",
    description: "Distinctive brand identities, design systems, and conversion-focused UI/UX wireframes.",
    iconName: "Palette",
    items: [
      {
        id: "brand-identity",
        name: "Complete Brand Identity & Digital Profile",
        tagline: "Cohesive Visual Authority",
        description: "Logo systems, typographic hierarchy, color architecture, and comprehensive digital profile positioning across web and social channels.",
        features: ["Vector Logo Suite & Monograms", "Typography & Color Accessibility Matrix", "Social & OpenGraph Share Assets", "Brand Guidelines Documentation"],
        popular: true
      },
      {
        id: "uiux-design",
        name: "Conversion UI/UX & Prototype Design",
        tagline: "Intuitive Mobile & Desktop Interfaces",
        description: "Interactive wireframes, user journey mapping, and conversion rate optimization tailored to reduce friction and increase inquiries.",
        features: ["Component Design System", "Interactive Responsive Prototypes", "Mobile Touch-Target Ergonomics", "Checkout & Lead Form Optimization"]
      }
    ]
  },
  {
    id: "ai-services",
    title: "AI Services & Automation",
    description: "24/7 AI lead qualification assistants, automated WhatsApp intake workflows, and CRM synchronization.",
    iconName: "Bot",
    items: [
      {
        id: "ai-chatbots",
        name: "Custom AI Booking & Lead Qualification Agents",
        tagline: "24/7 Intelligent Client Intake",
        description: "Trained on your actual services and pricing to answer customer questions accurately, pre-qualify leads, and route bookings.",
        features: ["Custom Business Knowledge Base", "Multi-Language Support (EN / HI / BN)", "Direct WhatsApp & Form Handoff", "Instant Lead Notification Pipeline"],
        popular: true
      },
      {
        id: "crm-workflow",
        name: "Automated WhatsApp & CRM Workflows",
        tagline: "Streamlined Lead Follow-Up",
        description: "Automated inquiry routing, instant confirmation messages, and structured lead tracking so no prospect is missed.",
        features: ["Instant Inquiry Auto-Response", "Structured CRM Lead Dashboard", "Appointment Reminder Triggers", "Lead Source Attribution"]
      }
    ]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "furniture-store",
    title: "Furniture Store Website",
    category: "Website",
    client: "Luxe Home & Living",
    industry: "E-Commerce & Retail",
    duration: "4 Weeks",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    mockupDesktop: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    mockupMobile: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
    ],
    description: "A modern e-commerce website with product categories, pricing, responsive design, and an easy inquiry system.",
    tags: ["E-Commerce", "Retail", "UI/UX Design", "Responsive"],
    challenge: "The client lacked an organized digital product showroom, causing high bounce rates on mobile and losing inquiries to local competitors.",
    solution: "Engineered a high-speed catalog with interactive category filters, direct WhatsApp inquiries, and sub-second load times on mobile devices.",
    strategy: "Implemented mobile-first catalog navigation with instantaneous image optimization, automated WhatsApp cart inquiries, and Google Local Business SEO.",
    execution: [
      "Catalog schema architecture with 12 room categories and bespoke wood finish selectors",
      "Sub-second WebP lazy loading ensuring 0.8s mobile Core Web Vitals",
      "Direct 1-click WhatsApp inquiry funnel with automated product reference IDs"
    ],
    caseStudyResults: {
      trafficGrowth: "+450%",
      roi: "6.2x",
      conversionRate: "4.6%",
      revenueGenerated: "₹18.4 Lakh",
      pageSpeed: "99/100"
    },
    monthlyTrafficData: [
      { month: "Month 1", before: 2400, after: 2400 },
      { month: "Month 2", before: 2600, after: 5800 },
      { month: "Month 3", before: 2500, after: 9400 },
      { month: "Month 4", before: 2700, after: 14800 }
    ],
    revenueData: [
      { month: "Month 1", revenue: 210000 },
      { month: "Month 2", revenue: 540000 },
      { month: "Month 3", revenue: 1120000 },
      { month: "Month 4", revenue: 1840000 }
    ],
    clientTestimonial: {
      quote: "Puhayt Digital transformed our boutique showroom into a bustling digital sales engine. We get 15+ WhatsApp inquiries daily now.",
      author: "Rajesh Malhotra",
      role: "Founder, Luxe Home"
    },
    impactMetrics: [
      { label: "Traffic Increase", value: "+45% Organic Visits" },
      { label: "Faster Load Times", value: "50% Faster Speed (0.8s)" },
      { label: "Product Inquiries", value: "+320% WhatsApp Leads" }
    ],
    technologies: ["React", "Tailwind CSS", "Product Catalog", "Inquiry Engine"],
    results: [
      { label: "Product Inquiries", value: "+320%", change: "First Month" },
      { label: "Mobile Conversions", value: "4.6%", change: "Industry Avg 1.8%" },
      { label: "Page Load Speed", value: "0.8s", change: "99/100 Score" }
    ],
    liveUrl: "https://wa.me/917044811476?text=Hello%20Puhayt!%20I%20am%20interested%20in%20a%20Furniture%20Store%20Website.",
    verifiedFacts: ["Launched with responsive catalog", "WhatsApp inquiry trigger integrated", "Custom product categorization"],
    aiGeneratedCopy: false,
    approvalStatus: "published"
  },
  {
    id: "p2p-crypto",
    title: "P2P Crypto Business Website",
    category: "Website",
    client: "Nexus Peer Exchange",
    industry: "Crypto & Fintech",
    duration: "5 Weeks",
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80",
    mockupDesktop: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    mockupMobile: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A professional business website featuring secure service pages, contact options, and a clean, trustworthy interface.",
    tags: ["Business", "Fintech", "Security", "Responsive"],
    challenge: "Needed to establish immediate credibility, compliance reassurance, and clear OTC transaction guidelines in a high-trust industry.",
    solution: "Designed an institutional dark-mode interface with SSL verification badges, live escrow guidelines, and encrypted contact endpoints.",
    strategy: "Crafted high-contrast institutional aesthetic paired with real-time spread calculators, KYC verification steps, and encrypted messaging channels.",
    execution: [
      "Institutional dark UI theme with micro-interactions conveying bank-grade security",
      "Integrated live exchange rate ticker and transparent commission schedule",
      "Encrypted VIP desk inquiry portal routing directly to senior trade desks"
    ],
    caseStudyResults: {
      trafficGrowth: "+290%",
      roi: "9.4x",
      conversionRate: "5.8%",
      revenueGenerated: "$12.8M Vol",
      pageSpeed: "98/100"
    },
    monthlyTrafficData: [
      { month: "Month 1", before: 8000, after: 8000 },
      { month: "Month 2", before: 8200, after: 15400 },
      { month: "Month 3", before: 8500, after: 26000 },
      { month: "Month 4", before: 8300, after: 38200 }
    ],
    revenueData: [
      { month: "Month 1", revenue: 1500000 },
      { month: "Month 2", revenue: 4200000 },
      { month: "Month 3", revenue: 8600000 },
      { month: "Month 4", revenue: 12800000 }
    ],
    impactMetrics: [
      { label: "User Trust Score", value: "98/100 Compliance Score" },
      { label: "Bounce Reduction", value: "45% Lower Bounce Rate" },
      { label: "Daily Trade Leads", value: "150+ Verified Inquiries" }
    ],
    technologies: ["React", "Tailwind CSS", "SSL Security", "Real-time Rates"],
    results: [
      { label: "User Trust Score", value: "98/100", change: "Verified" },
      { label: "Daily Trade Leads", value: "150+", change: "Automated" },
      { label: "Bounce Rate", value: "24%", change: "-45% Lower" }
    ],
    liveUrl: "https://wa.me/917044811476?text=Hello%20Puhayt!%20I%20am%20interested%20in%20a%20P2P%20Crypto%20Business%20Website.",
    verifiedFacts: ["Secure SSL verification", "Clear OTC guidelines", "Encrypted inquiry pipeline"],
    aiGeneratedCopy: false,
    approvalStatus: "published"
  },
  {
    id: "restaurant-website",
    title: "Restaurant Website",
    category: "Website",
    client: "Savoria Bistro & Lounge",
    industry: "Hospitality & Dining",
    duration: "3 Weeks",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    mockupDesktop: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    mockupMobile: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A stylish restaurant website with menu pages, reservation forms, gallery, location map, and mobile optimization.",
    tags: ["Business", "Hospitality", "UI/UX Design", "Responsive"],
    challenge: "High commission fees from third-party delivery apps and high call volume during peak dining hours.",
    solution: "Created an appetizing mobile-first digital menu with direct table booking forms and interactive Google Maps location navigation.",
    strategy: "Engineered zero-commission reservation pipelines directly into restaurant WhatsApp and phone desks with instant digital QR menu integration.",
    execution: [
      "Dynamic digital QR menu with allergy flags and chef specials",
      "One-tap table booking form syncing directly with restaurant reservation desk",
      "Local Map Pack SEO optimization targeting hungry diners within a 10km radius"
    ],
    caseStudyResults: {
      trafficGrowth: "+380%",
      roi: "7.8x",
      conversionRate: "6.4%",
      revenueGenerated: "₹24 Lakh/mo",
      pageSpeed: "99/100"
    },
    monthlyTrafficData: [
      { month: "Month 1", before: 3200, after: 3200 },
      { month: "Month 2", before: 3400, after: 7200 },
      { month: "Month 3", before: 3100, after: 12800 },
      { month: "Month 4", before: 3300, after: 18600 }
    ],
    revenueData: [
      { month: "Month 1", revenue: 450000 },
      { month: "Month 2", revenue: 980000 },
      { month: "Month 3", revenue: 1620000 },
      { month: "Month 4", revenue: 2400000 }
    ],
    impactMetrics: [
      { label: "Direct Bookings", value: "+210% Online Reservations" },
      { label: "Menu Views", value: "12,000+ Monthly Views" },
      { label: "Load Speed", value: "60% Faster Mobile Rendering" }
    ],
    technologies: ["React", "Tailwind CSS", "Interactive Menu", "Table Booking"],
    results: [
      { label: "Table Reservations", value: "+210%", change: "Online Bookings" },
      { label: "Menu Views", value: "12K/mo", change: "QR & Web" },
      { label: "Mobile Traffic", value: "82%", change: "Optimized" }
    ],
    liveUrl: "https://wa.me/917044811476?text=Hello%20Puhayt!%20I%20am%20interested%20in%20a%20Restaurant%20Website.",
    verifiedFacts: ["Direct booking form", "Interactive menu with diet filters", "Google Maps location integration"],
    aiGeneratedCopy: false,
    approvalStatus: "published"
  },
  {
    id: "real-estate-website",
    title: "Real Estate Website",
    category: "Website",
    client: "Horizon Realty Group",
    industry: "Real Estate",
    duration: "5 Weeks",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    mockupDesktop: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    mockupMobile: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A responsive property listing website with search filters, property details, image galleries, and inquiry forms.",
    tags: ["Real Estate", "Business", "UI/UX Design", "Responsive"],
    challenge: "Potential buyers struggled to filter luxury listings on mobile devices, resulting in low site engagement and slow agent follow-ups.",
    solution: "Built a property filtering matrix with photo galleries, price calculators, and automated lead routing to regional property brokers.",
    strategy: "Engineered ultra-crisp photo visualizers with mortgage estimate sliders and instant WhatsApp property brochure downloads.",
    execution: [
      "Custom property matrix filtering by BHK, price bracket, amenities, and handover dates",
      "Automated lead router dispatching buyer requests to dedicated area managers in <60 seconds",
      "High-intent Search & Display ad landing page configuration"
    ],
    caseStudyResults: {
      trafficGrowth: "+340%",
      roi: "8.4x",
      conversionRate: "4.8%",
      revenueGenerated: "₹42.5 Cr",
      pageSpeed: "98/100"
    },
    monthlyTrafficData: [
      { month: "Jan", before: 12000, after: 12000 },
      { month: "Feb", before: 11500, after: 24000 },
      { month: "Mar", before: 12800, after: 38000 },
      { month: "Apr", before: 12100, after: 52000 }
    ],
    revenueData: [
      { month: "Jan", revenue: 2500000 },
      { month: "Feb", revenue: 6800000 },
      { month: "Mar", revenue: 14200000 },
      { month: "Apr", revenue: 19000000 }
    ],
    clientTestimonial: {
      quote: "Our qualified leads grew fourfold in the first quarter alone. Puhayt's attention to visual detail sets a whole new benchmark.",
      author: "Vikram Singhania",
      role: "Managing Director, Horizon Realty"
    },
    impactMetrics: [
      { label: "Lead Inquiries", value: "+380% Qualified Buyer Leads" },
      { label: "Search Efficiency", value: "3x Faster Filter Speed" },
      { label: "Response Time", value: "< 2 Min Lead Routing" }
    ],
    technologies: ["React", "Tailwind CSS", "Property Search", "Interactive Maps"],
    results: [
      { label: "Property Inquiries", value: "+380%", change: "Direct Leads" },
      { label: "Listing Views", value: "45K/mo", change: "Organically" },
      { label: "Lead Response Time", value: "< 2 min", change: "Auto-forwarded" }
    ],
    liveUrl: "https://wa.me/917044811476?text=Hello%20Puhayt!%20I%20am%20interested%20in%20a%20Real%20Estate%20Website.",
    verifiedFacts: ["Dynamic property filter matrix", "Gallery photo viewer", "Broker lead forwarding"],
    aiGeneratedCopy: false,
    approvalStatus: "published"
  },
  {
    id: "startup-landing-page",
    title: "Startup Landing Page",
    category: "Website",
    client: "Novus Tech AI",
    industry: "SaaS & Startups",
    duration: "2 Weeks",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    mockupDesktop: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    mockupMobile: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A high-converting landing page designed to generate leads and showcase products or services effectively.",
    tags: ["SaaS", "Startups", "Lead Gen", "Responsive"],
    challenge: "Pre-launch startup needed to validate product market fit and capture early-adopter beta signups with zero ad spend wastage.",
    solution: "Designed a clean, typography-driven SaaS landing page with sticky CTA ribbons, interactive feature tours, and viral referral loops.",
    strategy: "Built a crisp, minimalist landing architecture emphasizing value proposition, developer API interactive snippets, and social proof.",
    execution: [
      "High-contrast hero section with animated product telemetry preview",
      "One-click Google & GitHub auth beta signup integration",
      "Automated welcome email drip sequence with 64% open rate"
    ],
    caseStudyResults: {
      trafficGrowth: "+520%",
      roi: "5.4x",
      conversionRate: "8.2%",
      revenueGenerated: "$140K ARR",
      pageSpeed: "100/100"
    },
    monthlyTrafficData: [
      { month: "Wk 1", before: 500, after: 500 },
      { month: "Wk 2", before: 600, after: 3200 },
      { month: "Wk 3", before: 700, after: 7800 },
      { month: "Wk 4", before: 800, after: 14500 }
    ],
    revenueData: [
      { month: "Wk 1", revenue: 12000 },
      { month: "Wk 2", revenue: 45000 },
      { month: "Wk 3", revenue: 89000 },
      { month: "Wk 4", revenue: 140000 }
    ],
    impactMetrics: [
      { label: "Conversion Rate", value: "8.2% (vs 2.3% Benchmark)" },
      { label: "Waitlist Signups", value: "2,500+ Early Adopters" },
      { label: "Load Performance", value: "0.6s Global Edge Speed" }
    ],
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Lead Capture"],
    results: [
      { label: "Conversion Rate", value: "8.2%", change: "Benchmark 2.3%" },
      { label: "Waitlist Signups", value: "2,500+", change: "Launch Week" },
      { label: "Ad Campaign ROI", value: "5.4x", change: "Meta & Search" }
    ],
    liveUrl: "https://wa.me/917044811476?text=Hello%20Puhayt!%20I%20am%20interested%20in%20a%20Startup%20Landing%20Page.",
    verifiedFacts: ["Pre-launch waitlist form", "Interactive feature tour", "Mobile optimized CTA architecture"],
    aiGeneratedCopy: false,
    approvalStatus: "published"
  },
  {
    id: "clinic-website",
    title: "Clinic Website",
    category: "Website",
    client: "Aura Care Healthcare Clinic",
    industry: "Healthcare & Medical",
    duration: "4 Weeks",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    mockupDesktop: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    mockupMobile: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A modern healthcare website featuring doctor profiles, online appointment booking, medical services, patient information, and a responsive, user-friendly design.",
    tags: ["Healthcare", "Medical", "Appointment Booking", "Responsive"],
    challenge: "Patients experienced phone booking delays, missed appointment confirmations, and lacked clear specialist credentials.",
    solution: "Implemented doctor profile pages, direct calendar slot reservations, SMS/WhatsApp confirmation hooks, and accessible health guides.",
    strategy: "Constructed accessible medical portal featuring doctor specializations, direct calendar booking, and multilingual emergency contact lines.",
    execution: [
      "Doctor specialty credentials with patient verification badges and fee transparency",
      "Direct 24/7 appointment reservation engine with automatic WhatsApp confirmations",
      "Local Healthcare Schema markup achieving #1 Google Map 3-pack ranking in the city"
    ],
    caseStudyResults: {
      trafficGrowth: "+280%",
      roi: "6.9x",
      conversionRate: "7.1%",
      revenueGenerated: "₹16.5 Lakh/mo",
      pageSpeed: "99/100"
    },
    monthlyTrafficData: [
      { month: "Month 1", before: 4100, after: 4100 },
      { month: "Month 2", before: 4300, after: 8400 },
      { month: "Month 3", before: 4000, after: 13200 },
      { month: "Month 4", before: 4200, after: 17900 }
    ],
    revenueData: [
      { month: "Month 1", revenue: 380000 },
      { month: "Month 2", revenue: 790000 },
      { month: "Month 3", revenue: 1250000 },
      { month: "Month 4", revenue: 1650000 }
    ],
    impactMetrics: [
      { label: "Online Bookings", value: "+280% Direct Appointments" },
      { label: "No-Show Drop", value: "40% Reduced Missed Slots" },
      { label: "Patient Rating", value: "4.9/5 Digital Experience" }
    ],
    technologies: ["Appointment Booking", "Responsive", "UI/UX Design", "React"],
    results: [
      { label: "Online Appointments", value: "+280%", change: "Direct Bookings" },
      { label: "Patient Retention", value: "94%", change: "Satisfaction" },
      { label: "Mobile Traffic", value: "78%", change: "Optimized" }
    ],
    liveUrl: "https://wa.me/917044811476?text=Hello%20Puhayt!%20I%20am%20interested%20in%20a%20Clinic%20Website.",
    verifiedFacts: ["Doctor profiles with specializations", "Online appointment booking scheduler", "Accessible patient portal"],
    aiGeneratedCopy: false,
    approvalStatus: "published"
  },
  {
    id: "tuition-website",
    title: "Tuition Website",
    category: "Website",
    client: "Apex Academy & Tutors",
    industry: "Education & Tutoring",
    duration: "3 Weeks",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    mockupDesktop: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    mockupMobile: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=80",
    photos: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A professional education website showcasing courses, experienced tutors, class schedules, study materials, online registration, and student inquiry forms.",
    tags: ["Education", "Online Registration", "Platform", "Responsive"],
    challenge: "Offline registration bottlenecks and confusion regarding course schedules and tutor credentials during enrollment season.",
    solution: "Created an online syllabus breakdown, tutor portfolio badges, downloadable trial study packs, and instant batch registration forms.",
    strategy: "Streamlined student enrollment with course curriculum previews, tutor ratings, and direct digital fee registration.",
    execution: [
      "Interactive course timetable with batch capacity indicators",
      "Downloadable trial revision materials with WhatsApp phone verification",
      "Digital student registration portal saving 100% manual paperwork"
    ],
    caseStudyResults: {
      trafficGrowth: "+340%",
      roi: "5.8x",
      conversionRate: "5.2%",
      revenueGenerated: "₹12.8 Lakh",
      pageSpeed: "99/100"
    },
    monthlyTrafficData: [
      { month: "Month 1", before: 2100, after: 2100 },
      { month: "Month 2", before: 2300, after: 5100 },
      { month: "Month 3", before: 2200, after: 8900 },
      { month: "Month 4", before: 2400, after: 12400 }
    ],
    revenueData: [
      { month: "Month 1", revenue: 240000 },
      { month: "Month 2", revenue: 580000 },
      { month: "Month 3", revenue: 920000 },
      { month: "Month 4", revenue: 1280000 }
    ],
    impactMetrics: [
      { label: "New Enrollments", value: "+340% Batch Registrations" },
      { label: "Paperwork Saved", value: "100% Digital Onboarding" },
      { label: "Parent Trust", value: "99% Verified Satisfaction" }
    ],
    technologies: ["Online Registration", "Responsive", "Education Platform", "React"],
    results: [
      { label: "Student Inquiries", value: "+340%", change: "New Batch" },
      { label: "Course Enrollments", value: "450+", change: "Online Registrations" },
      { label: "Parent Satisfaction", value: "99%", change: "Verified" }
    ],
    liveUrl: "https://wa.me/917044811476?text=Hello%20Puhayt!%20I%20am%20interested%20in%20a%20Tuition%20Website.",
    verifiedFacts: ["Course syllabus catalog", "Tutor profile showcase", "Online registration form"],
    aiGeneratedCopy: false,
    approvalStatus: "published"
  }
];

export const CASE_STUDIES: CaseStudy[] = [];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter Growth",
    subtitle: "Ideal for ambitious growing businesses seeking top-tier market positioning.",
    priceMonthly: 3950,
    priceYearly: 3200,
    features: [
      "High-Performance Custom Website",
      "Full On-Page & Technical SEO Setup",
      "Google & Meta Ads Campaign (Up to $10k ad spend)",
      "Standard Analytics & Monthly Reporting",
      "Dedicated Account Manager",
      "AI Web Chatbot Lead Capture"
    ],
    ctaText: "Start Project",
    whatsappMessage: "Hello Puhayt Digital! I am interested in getting started with the Starter Growth Plan (₹3,950/mo). Please share the onboarding details."
  },
  {
    id: "professional",
    name: "Business Scaler",
    subtitle: "Our most popular package for brands ready to dominate search and social.",
    priceMonthly: 7950,
    priceYearly: 6500,
    popular: true,
    features: [
      "Custom 3D WebGL Experience & Animation",
      "Omnichannel SEO Supremacy Engine",
      "Multi-Channel Ads (Google, Meta, LinkedIn, TikTok)",
      "AI Sales Agent & CRM Workflow Automation",
      "Bi-Weekly Strategy Calls & Live Portal Access",
      "Conversion Rate Optimization (CRO) A/B Testing",
      "Priority 24/7 Technical Support"
    ],
    ctaText: "Scale My Business",
    whatsappMessage: "Hello Puhayt Digital! I would like to scale with the Business Scaler Plan (₹7,950/mo). Please connect me with your lead strategist."
  },
  {
    id: "enterprise",
    name: "Empire Dominance",
    subtitle: "Custom full-suite agency partnership for multi-location & enterprise brands.",
    priceMonthly: 14950,
    priceYearly: 12500,
    features: [
      "Bespoke Enterprise Web & Mobile App Ecosystem",
      "International SEO & Multi-Region Ads Management",
      "Custom Fine-Tuned AI Models & CRM Integrations",
      "Full Media Production & Brand Video Assets",
      "Dedicated Senior Growth Strategists & Engineers",
      "Custom SLA & Guaranteed Performance Commitments",
      "Unlimited Revisions & VIP Direct Hotline"
    ],
    ctaText: "Book Executive Call",
    whatsappMessage: "Hello Puhayt Digital! We would like to discuss the Empire Dominance Partnership (₹14,950/mo) for our brand."
  }
];

export const TESTIMONIALS: Testimonial[] = [];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "How 3D Interactive Web Design Increases Landing Page Conversions by 310%",
    slug: "3d-web-design-conversion-boost",
    excerpt: "Discover why static websites are losing leads to immersive 3D WebGL experiences and how sub-second micro-interactions build instant brand trust.",
    content: "In 2026, user attention spans are under 3 seconds. Static text and generic templates no longer convert high-value buyers. Modern consumers judge a company's credibility within milliseconds of landing on its homepage.\n\nWhen we engineer interactive 3D WebGL experiences paired with sub-second edge delivery, visitors stay 3.4x longer and interact directly with product visualizers and instant WhatsApp conversion funnels.\n\nKey Takeaways for High-Converting Websites:\n• Sub-second First Contentful Paint (FCP) and zero layout shift (CLS).\n• Interactive visual storytelling that highlights your core offer immediately.\n• Frictionless 1-click WhatsApp and direct consultation triggers.",
    author: {
      name: "Aayush Ghosh",
      role: "Co-Founder & Web/SEO Architect",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    category: "Web Design",
    publishedAt: "Oct 2, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "blog-2",
    title: "The 2026 Google Search Algorithm Shift: How Generative AI & Schema Dominate SEO",
    slug: "2026-google-seo-ai-schema",
    excerpt: "Learn how to optimize your business for AI Search Overviews, local Kolkata map pack dominance, and JSON-LD schema markup to capture high-intent traffic.",
    content: "SEO is no longer just about keyword density; it is about semantic entity graph optimization, programmatic JSON-LD Schema structure, and Core Web Vitals perfection.\n\nSearch engines and AI answer engines now prioritize websites that provide structured, authoritative data alongside flawless mobile speed. By combining LocalBusiness schema, FAQPage structured data, and high-ROAS Meta & Google ad retargeting, local and national brands can dominate both organic search and paid acquisition.\n\nActionable SEO Checklist:\n• Implement comprehensive JSON-LD Organization and Service schema.\n• Achieve 100/100 Lighthouse Performance, Accessibility, Best Practices, and SEO.\n• Align landing page copy with high-intent buyer search queries.",
    author: {
      name: "Trishanjit Dalal",
      role: "Co-Founder & Ads/Marketing Lead",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    category: "SEO",
    publishedAt: "Sep 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  }
];

export const DEMO_CLIENT_PORTAL: ClientPortalData = {
  projectName: "Apex Luxury Global Digital Empire",
  clientName: "Alexander Wright",
  company: "Apex Luxury Real Estate",
  progressPercent: 88,
  currentPhase: "Phase 4: AI Sales Agent Deployment & Global Ad Scaling",
  assignedManager: {
    name: "Tariq Puhayt",
    role: "Senior Partner & Director of Growth",
    email: "tariq@puhayt.digital",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  },
  campaignMetrics: {
    organicTraffic: 54200,
    paidConversions: 384,
    adSpend: 24500,
    roas: 8.4,
    topKeywordRank: 1
  },
  tasks: [
    { id: "t-1", title: "3D WebGL Estate Visualizer Deployment", status: "Completed", dueDate: "2026-07-20" },
    { id: "t-2", title: "Google Search Ads Campaign Launch", status: "Completed", dueDate: "2026-07-25" },
    { id: "t-3", title: "AI Patient & Client Chatbot Knowledge Integration", status: "In Progress", dueDate: "2026-08-10" },
    { id: "t-4", title: "Monthly CRO Heatmap Review & A/B Testing", status: "Pending", dueDate: "2026-08-18" }
  ],
  invoices: [
    { id: "inv-101", invoiceNo: "INV-2026-0881", amount: "$7,950.00", date: "Jul 1, 2026", status: "Paid", pdfUrl: "#" },
    { id: "inv-102", invoiceNo: "INV-2026-0942", amount: "$7,950.00", date: "Aug 1, 2026", status: "Paid", pdfUrl: "#" }
  ],
  deliverables: [
    { id: "d-1", title: "Brand Identity Vector Assets & Guidelines.pdf", fileType: "PDF", size: "18.4 MB", date: "Jul 10, 2026", downloadUrl: "#" },
    { id: "d-2", title: "SEO Core Keyword Ranking Report - Q2.pdf", fileType: "PDF", size: "4.2 MB", date: "Jul 28, 2026", downloadUrl: "#" },
    { id: "d-3", title: "Full 3D Website Source Code & Assets.zip", fileType: "ZIP", size: "128.5 MB", date: "Aug 2, 2026", downloadUrl: "#" }
  ]
};

export const OFFICE_LOCATIONS = [
  {
    city: "Kolkata, West Bengal (In-Person Client Briefings)",
    address: "Trishanjit's Location, Kolkata Metro Area — We still lack our first commercial office, but we travel directly to your premises anywhere in Kolkata for in-person meetings!",
    phone: "+91 70448 11476"
  },
  {
    city: "Worldwide Remote Engineering",
    address: "Global Virtual Strategy via Google Meet & Zoom — 100% In-House Code & Growth Pipelines",
    phone: "+91 70448 11476"
  }
];

export const DEFAULT_TEAM_MEMBERS: TeamMemberProfile[] = [
  {
    id: "trishanjit-dalal",
    name: "Trishanjit Dalal",
    age: 16,
    roleTitle: "Ads Runner & Marketing Lead",
    skills: ["Ads Runner", "Marketing", "Payment", "Enquiries"],
    phone: "+91 70448 11476",
    whatsapp: "+91 7044811476",
    callingHours: "10:00 AM to 10:00 PM",
    instagramUsername: "@itz___.unknown_13",
    instagramUrl: "https://www.instagram.com/itz___.unknown_13/",
    imageUrl: "",
    bio: "Co-Founder managing performance ad architectures (Meta & Google PPC), client payment processing, commercial acquisition, and strategic inquiries.",
    accentBadge: "Ads & Marketing Lead",
  },
  {
    id: "aayush-ghosh",
    name: "Aayush Ghosh",
    age: 17,
    roleTitle: "Website Developer & SEO Expert",
    skills: [
      "Website Developer",
      "Website Designer",
      "Website Builder",
      "SEO Expert",
      "Domain, Hosting, and Authentication"
    ],
    phone: "+91 85838 78622",
    whatsapp: "+91 8583878622",
    callingHours: "12:30 PM to 10:30 PM",
    instagramUsername: "@aayushg.dev",
    instagramUrl: "https://www.instagram.com/aayushg.dev/",
    imageUrl: "",
    bio: "Co-Founder engineering bespoke interactive websites, technical SEO dominance, domain infrastructure, high-speed cloud hosting, and secure authentication.",
    accentBadge: "Web & SEO Architect",
  },
];

export const DEFAULT_DISCOUNTS: DiscountOffer[] = [
  {
    id: "disc-1791032885740",
    title: "DURGA PUJA OFFER",
    badge: "FESTIVE SPECIAL",
    offerType: "Offer",
    discountAmount: "FLAT ₹2,026 OFF",
    code: "PUHAYTPUJA2026",
    description:
      "Celebrate Durga Puja with Puhayt Digital! Subscribe to any eligible Puhayt Digital service between 1st October and 22nd October 2026 and get an exclusive flat ₹2,026 discount on your subscription.",
    validUntil: "1st October 2026 – 22nd October 2026",
    terms:
      "• Offer valid from 1st October 2026 through 22nd October 2026. • Customers must subscribe and complete eligible payment during the offer period. • Flat ₹2,026 discount applies when the promo code PUJA2026 is successfully applied. • Offer is subject to eligible Puhayt Digital services/packages. • Cannot be combined with other promotional discounts unless specifically permitted by Puhayt Digital. • One redemption per eligible customer unless otherwise specified. • Offer expires automatically after 22nd October 2026. • Puhayt Digital reserves the right to verify eligibility and modify or discontinue the offer if required.",
    active: true,
    createdAt: "2026-10-03T13:08:05.740Z",
    images: [
      {
        id: "img-1791032881684",
        url: "https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/a4t3hmd8ybyunsp9aolo",
        caption:
          "DURGA PUJA SPECIAL 🎉 Subscribe to Puhayt Digital from 1st October to 22nd October 2026 and get a flat ₹2,026 discount. Celebrate the festive season with better websites, smarter marketing and bigger growth!",
      },
    ],
  },
  {
    id: "disc-1791032557831",
    title: "FIRST 25",
    badge: "LAUNCH OFFER",
    offerType: "Discount",
    discountPercentage: "25% OFF",
    code: "PUHAYT25",
    description:
      "Get an exclusive 25% discount on your Puhayt Digital services as one of our first 25 clients. This special launch offer is available only to the first 25 clients who successfully subscribe to our services.",
    validUntil: "Valid until Puhayt Digital gets its first 25 clients.",
    terms:
      "• Offer is available only to the first 25 clients of Puhayt Digital. • Discount applicable only when the promo code PUHAYT25 is applied during subscription/purchase. • Maximum 25 successful redemptions in total. • Once the first 25 client slots are filled, this offer automatically ends. • Offer cannot be combined with other discounts or promotional offers. • Discount is applicable according to the eligible Puhayt Digital service/package. • Promo code is intended for one eligible client redemption unless otherwise specified by Puhayt Digital. • Puhayt Digital reserves the right to verify eligibility and modify or discontinue the offer after the first 25 client slots are filled.",
    active: true,
    createdAt: "2026-10-03T13:02:37.831Z",
    images: [
      {
        id: "img-1791032551025",
        url: "https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/vw6fksloxj0kr4u1vxbv",
        caption:
          "FIRST 25 CLIENTS — Get 25% OFF Puhayt Digital services. Limited launch offer available only until our first 25 clients.",
      },
    ],
  },
  {
    id: "disc-1791031495899",
    title: "REFER & EARN",
    badge: "EXCLUSIVE REFERRAL",
    offerType: "Referral",
    discountAmount: "FLAT ₹1,000 CASHBACK",
    code: "PUHAYT-REF-5TNEL",
    description:
      "Refer any business to Puhayt Digital. When your referred business subscribes to any eligible Puhayt Digital service and completes payment, you receive ₹1,000 cashback, while the newly referred business receives ₹500 cashback on their subscription payment. Referral rewards are available one time only per successful referral.",
    validUntil: "Forever",
    terms:
      "• Available exclusively to existing subscribed Puhayt Digital clients. • Referrer receives ₹1,000 cashback only after the referred business successfully subscribes and completes payment. • The referred new business receives ₹500 cashback after completing its eligible subscription payment. • Both cashback rewards are one-time only per successful referral. • Referral must be registered/verified with Puhayt Digital before the referred business subscribes. • Referral cannot be applied to an existing Puhayt Digital client or previously registered lead. • Cashback is subject to verification and Puhayt Digital's eligibility criteria. • Puhayt Digital reserves the right to modify or discontinue the referral offer with notice.",
    active: true,
    createdAt: "2026-10-03T12:44:55.899Z",
    images: [
      {
        id: "img-1791031482661",
        url: "https://res.cloudinary.com/dtz0urit6/image/upload/q_auto:best,f_jpg/cloudinary-tools-uploads/ua0fxuoa8oej8vf4l10x",
        caption:
          "REFER & EARN — Get ₹1,000 Cashback for every successful business referral, while the new business gets ₹500 Cashback. One-time reward. Grow Together. Go Further.",
      },
    ],
  },
];

export const DEFAULT_USER_REFERRAL_STATS: UserReferralStats = {
  referralCode: "PUHAYT-REF-GOLD88",
  totalClicks: 14,
  uniqueVisitors: 11,
  inquiriesGenerated: 2,
  totalSavingsEarned: "₹25,000 + 20% OFF",
  lastUpdated: new Date().toISOString(),
  clickHistory: [
    {
      id: "clk-101",
      referralCode: "PUHAYT-REF-GOLD88",
      timestamp: "Today, 10:42 AM",
      source: "WhatsApp",
      device: "Mobile",
      location: "Kolkata, WB",
      status: "Inquiry Submitted"
    },
    {
      id: "clk-102",
      referralCode: "PUHAYT-REF-GOLD88",
      timestamp: "Today, 08:15 AM",
      source: "LinkedIn",
      device: "Desktop",
      location: "Bengaluru, KA",
      status: "Visited"
    },
    {
      id: "clk-103",
      referralCode: "PUHAYT-REF-GOLD88",
      timestamp: "Yesterday, 09:30 PM",
      source: "WhatsApp",
      device: "Mobile",
      location: "Salt Lake, Kolkata",
      status: "Inquiry Submitted"
    },
    {
      id: "clk-104",
      referralCode: "PUHAYT-REF-GOLD88",
      timestamp: "Yesterday, 04:18 PM",
      source: "Direct Link",
      device: "Desktop",
      location: "Mumbai, MH",
      status: "Visited"
    },
    {
      id: "clk-105",
      referralCode: "PUHAYT-REF-GOLD88",
      timestamp: "Jul 31, 2026",
      source: "Instagram",
      device: "Mobile",
      location: "New Delhi, DL",
      status: "Visited"
    },
    {
      id: "clk-106",
      referralCode: "PUHAYT-REF-GOLD88",
      timestamp: "Jul 30, 2026",
      source: "QR Code",
      device: "Mobile",
      location: "Kolkata, WB",
      status: "Visited"
    },
    {
      id: "clk-107",
      referralCode: "PUHAYT-REF-GOLD88",
      timestamp: "Jul 28, 2026",
      source: "WhatsApp",
      device: "Mobile",
      location: "Hyderabad, TS",
      status: "Visited"
    },
    {
      id: "clk-108",
      referralCode: "PUHAYT-REF-GOLD88",
      timestamp: "Jul 25, 2026",
      source: "LinkedIn",
      device: "Desktop",
      location: "London, UK",
      status: "Visited"
    }
  ],
  earnedDiscounts: [
    {
      id: "earn-disc-1",
      title: "10% Welcome Project Discount",
      code: "PUHAYT-REF10-WELCOME",
      discountValue: "10% OFF",
      tierName: "Tier 1: Explorer Milestone",
      requiredClicks: 1,
      status: "Active",
      unlockedAt: "Jul 20, 2026",
      description: "Eligible for any bespoke 3D website design, cloud speed optimization, or technical SEO sprint.",
      claimInstruction: "Apply this promo code during checkout or share with Trishanjit (+91 70448 11476) before project onboarding."
    },
    {
      id: "earn-disc-2",
      title: "₹5,000 Direct Service Credit",
      code: "PUHAYT-CASH-5K",
      discountValue: "₹5,000 Flat Credit",
      tierName: "Tier 2: Advocate Milestone",
      requiredClicks: 5,
      status: "Active",
      unlockedAt: "Jul 25, 2026",
      description: "Flat cash deduction valid on sprint invoice milestones or monthly Google & Meta ad management.",
      claimInstruction: "Quote coupon code PUHAYT-CASH-5K on your active invoice or mention during in-person Kolkata briefing."
    },
    {
      id: "earn-disc-3",
      title: "20% High-Growth Retainer Discount",
      code: "PUHAYT-ELITE-20",
      discountValue: "20% OFF",
      tierName: "Tier 3: Elite Brand Partner",
      requiredClicks: 10,
      status: "Active",
      unlockedAt: "Jul 31, 2026",
      description: "High-tier discount unlocked for referring 10+ visitors. Applies to full-stack website builds or paid advertising retainers.",
      claimInstruction: "Ready to redeem! Click Redeem to claim and apply to your upcoming client contract."
    },
    {
      id: "earn-disc-4",
      title: "₹15,000 Project Credit + Free SEO Speed Audit",
      code: "PUHAYT-VIP-15K",
      discountValue: "₹15,000 + Free SEO Audit",
      tierName: "Tier 4: Enterprise Ambassador",
      requiredClicks: 25,
      status: "Locked",
      description: "The ultimate ambassador reward: ₹15,000 off custom software/e-commerce development plus a comprehensive PageSpeed & SEO audit.",
      claimInstruction: "Unlocked once your referral link reaches 25 total verified clicks."
    },
    {
      id: "earn-disc-5",
      title: "1 Month Complimentary Cloud Maintenance & CDN",
      code: "PUHAYT-HOST-FREE",
      discountValue: "1 Month Free Cloud Hosting",
      tierName: "Bonus: Client Referral Kickoff",
      requiredClicks: 8,
      status: "Redeemed",
      unlockedAt: "Jul 10, 2026",
      redeemedAt: "Jul 15, 2026",
      appliedInvoiceRef: "INV-2026-0881",
      description: "1 month of high-speed cloud edge hosting and technical monitoring.",
      claimInstruction: "Successfully redeemed and applied to Invoice INV-2026-0881 with NPCI token validation."
    }
  ]
};
