import { ServiceCategory, PortfolioProject, CaseStudy, PricingPlan, Testimonial, BlogPost, ClientPortalData } from "../types";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "web-dev",
    title: "Website Development",
    description: "High-performance, 3D interactive, ultra-fast websites designed to convert visitors into loyal high-value clients.",
    iconName: "Globe",
    items: [
      {
        id: "corp-web",
        name: "Corporate & Luxury Brand Websites",
        tagline: "Apple & Stripe Level Craftsmanship",
        description: "Bespoke digital experiences with custom 3D WebGL visuals, fluid micro-interactions, and instant page speed.",
        features: ["Custom 3D Animations & WebGL", "Sub-second Load Times", "Conversion-Focused UX", "Headless CMS Integration"],
        popular: true
      },
      {
        id: "ecom-web",
        name: "High-Converting E-Commerce",
        tagline: "Shopify & Custom Headless Stores",
        description: "Custom e-commerce architectures engineered for maximum checkout conversion, upsells, and global scale.",
        features: ["Sub-second Checkout Flow", "Dynamic Upsells & Bundling", "Global Currency & Multi-Language", "AI Product Recommendations"]
      },
      {
        id: "web-apps",
        name: "Custom Web Applications & PWAs",
        tagline: "Scalable Full-Stack Engineering",
        description: "React/Next.js client portals, SaaS web apps, and progressive web apps built with robust backends.",
        features: ["Real-Time Client Dashboards", "Role-Based Access Control", "API First Architecture", "Offline PWA Support"]
      }
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing & Growth",
    description: "Data-driven SEO, hyper-targeted Google & Meta ads, and omnichannel performance marketing engines.",
    iconName: "TrendingUp",
    items: [
      {
        id: "seo-domination",
        name: "Omnichannel SEO & Search Domination",
        tagline: "Rank #1 for Transactional Keywords",
        description: "Technical SEO, local maps optimization, content clustering, and authoritative backlink acquisition.",
        features: ["Technical Core Web Vitals Audit", "Programmatic Keyword Engine", "Local Maps 3-Pack Supremacy", "High-Authority Link Building"],
        popular: true
      },
      {
        id: "ppc-scaling",
        name: "Performance PPC & Social Ads",
        tagline: "Google, Meta, TikTok & LinkedIn",
        description: "Precision-targeted ad campaigns with real-time ROAS optimization, AI creative testing, and retargeting loops.",
        features: ["Multi-Channel Ad Setup", "AI Creative Split Testing", "High-Converting Landing Pages", "ROAS & Attribution Tracking"]
      },
      {
        id: "lead-gen",
        name: "High-Intent Lead Generation",
        tagline: "Exclusive Qualified B2B/B2C Leads",
        description: "Automated funnels that attract, nurture, and filter high-value decision makers into your calendar.",
        features: ["Interactive Lead Calculators", "Automated Email Sequences", "SMS & WhatsApp Nurturing", "CRM Synchronization"]
      }
    ]
  },
  {
    id: "branding",
    title: "Branding & Visual Identity",
    description: "Luxurious visual identities, iconic logos, brand guidelines, and UI/UX systems that command market authority.",
    iconName: "Palette",
    items: [
      {
        id: "brand-identity",
        name: "Complete Brand Identity & Guidelines",
        tagline: "Stand Out as the Industry Leader",
        description: "Typography, color science, metallic foil packaging guidelines, and brand positioning books.",
        features: ["Logo Suite & Monograms", "Typography & Color Matrix", "3D Brand Mockups & Guidelines", "Business Stationery & Deck Design"],
        popular: true
      },
      {
        id: "uiux-design",
        name: "UI/UX & Product Design",
        tagline: "Intuitive & Elegant User Interfaces",
        description: "Figma design systems, interactive prototypes, user journey mapping, and conversion rate optimization.",
        features: ["Figma Design System", "Interactive Wireframes", "User Testing & Heuristics", "Micro-interaction Specifications"]
      }
    ]
  },
  {
    id: "ai-services",
    title: "AI Services & Automation",
    description: "Automated AI chatbots, intelligent CRM workflows, appointment booking agents, and AI marketing pipelines.",
    iconName: "Bot",
    items: [
      {
        id: "ai-chatbots",
        name: "Custom AI Booking & Sales Agents",
        tagline: "24/7 Intelligent Client Conversion",
        description: "Trained on your company knowledge base to answer questions, pre-qualify leads, and book calendar appointments.",
        features: ["Custom Knowledge Base Training", "Multi-Language Conversational AI", "Direct Google Calendar Booking", "CRM Lead Auto-Sync"],
        popular: true
      },
      {
        id: "crm-workflow",
        name: "Automated Marketing & CRM Workflows",
        tagline: "Zero Manual Repetitive Tasks",
        description: "Seamless automation connecting Zapier, Make, HubSpot, Salesforce, and email marketing platforms.",
        features: ["Automated Proposal Generation", "Instant Follow-up Triggers", "Invoice Auto-Reminders", "Lead Scoring Intelligence"]
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

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    clientName: "Marcus Vance",
    role: "Managing Director",
    company: "Apex Luxury Group",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    platform: "Google",
    content: "Puhayt Digital completely revolutionized our luxury real estate business. Their 3D web platform and hyper-targeted ad strategy generated $42M in closed sales in just one quarter. Absolute craftsmanship!",
    resultsAchieved: "$42M Revenue Generated"
  },
  {
    id: "t2",
    clientName: "Dr. Elena Rostova",
    role: "Chief Executive Officer",
    company: "Lumina Health AI",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    platform: "Clutch",
    content: "The AI booking assistant Puhayt built for us reduced patient no-shows by 60% while our organic Google traffic jumped by 280%. The ROI has been phenomenal.",
    resultsAchieved: "+280% Organic Search Traffic"
  },
  {
    id: "t3",
    clientName: "Julian Sterling",
    role: "Founder & CMO",
    company: "Sterling Private Wealth",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    platform: "Trustpilot",
    content: "Working with Puhayt feels like having Apple's design team and Stripe's engineering team handling your digital marketing. Highly recommended for any serious brand.",
    resultsAchieved: "6.8x ROAS on PPC"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "How 3D Interactive Web Design Increases Landing Page Conversions by 310%",
    slug: "3d-web-design-conversion-boost",
    excerpt: "Discover why static websites are losing leads to immersive 3D WebGL experiences and how Apple-level micro-interactions build instant brand trust.",
    content: "In 2026, user attention spans are under 3 seconds. Static text and stock photo templates no longer convert high-value buyers...",
    author: {
      name: "Tariq Puhayt",
      role: "Founder & Head of Brand",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    category: "Web Design",
    publishedAt: "Aug 2, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "blog-2",
    title: "The 2026 Google Search Algorithm Shift: How Generative AI & Schema Dominate SEO",
    slug: "2026-google-seo-ai-schema",
    excerpt: "Learn how to optimize your business for AI Search Overviews, voice search, and schema markup to capture top-of-funnel search traffic.",
    content: "SEO is no longer just about keyword density; it's about semantic entity graph optimization and programmatic Schema LD structure...",
    author: {
      name: "Sarah Chen",
      role: "Director of SEO",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    category: "SEO",
    publishedAt: "Jul 28, 2026",
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
  { city: "New York", address: "55 Hudson Yards, 34th Floor, NY 10001", phone: "+1 (212) 890-4300" },
  { city: "Dubai", address: "DIFC Gate Precinct Building 4, Level 6, UAE", phone: "+971 4 450 8200" },
  { city: "London", address: "100 Bishopsgate, City of London, EC2N 4AG", phone: "+44 20 7946 0912" },
  { city: "Singapore", address: "Marina Bay Financial Centre Tower 1, Singapore", phone: "+65 6823 1100" }
];
