/**
 * Puhayt Digital — Intelligent Semantic AI Problem Solver & Knowledge Engine
 * Understands what the user says, extracts industry, goals, constraints, and constructs
 * comprehensive, tailored, actionable business solutions.
 */

export interface SolvedAnalysis {
  userIntent: string;
  industry: string;
  detectedGoals: string[];
  recommendedSolution: string;
  timelineEstimate: string;
  budgetEstimate: string;
  roasBenchmark: string;
  followUpSuggestions: string[];
}

export function solveUserQuery(userQuery: string): {
  markdownResponse: string;
  analysis: SolvedAnalysis;
  suggestedFollowUps: string[];
} {
  const query = userQuery.trim();
  const lower = query.toLowerCase();

  // 1. Identify Industry / Business Vertical
  let industry = "Ambitious Enterprise";
  if (lower.includes("gym") || lower.includes("fitness") || lower.includes("trainer") || lower.includes("workout")) {
    industry = "Fitness & Gym Center";
  } else if (lower.includes("dentist") || lower.includes("dental") || lower.includes("clinic") || lower.includes("doctor") || lower.includes("health") || lower.includes("hospital")) {
    industry = "Healthcare & Medical Practice";
  } else if (lower.includes("real estate") || lower.includes("property") || lower.includes("builder") || lower.includes("broker") || lower.includes("flat") || lower.includes("apartment")) {
    industry = "Real Estate & Luxury Properties";
  } else if (lower.includes("bakery") || lower.includes("restaurant") || lower.includes("cafe") || lower.includes("food") || lower.includes("dining")) {
    industry = "Food & Hospitality / F&B";
  } else if (lower.includes("ecom") || lower.includes("ecommerce") || lower.includes("shop") || lower.includes("shoe") || lower.includes("cloth") || lower.includes("apparel") || lower.includes("jewelry") || lower.includes("product")) {
    industry = "E-Commerce & D2C Brand";
  } else if (lower.includes("saas") || lower.includes("software") || lower.includes("app") || lower.includes("startup") || lower.includes("tech")) {
    industry = "SaaS & Tech Startup";
  } else if (lower.includes("law") || lower.includes("legal") || lower.includes("attorney") || lower.includes("advocate") || lower.includes("ca") || lower.includes("accounting")) {
    industry = "Professional & Legal Services";
  } else if (lower.includes("education") || lower.includes("coaching") || lower.includes("institute") || lower.includes("tutor") || lower.includes("school")) {
    industry = "Education & Coaching Academy";
  } else if (lower.includes("salon") || lower.includes("spa") || lower.includes("beauty") || lower.includes("makeup")) {
    industry = "Beauty & Wellness";
  }

  // 2. Identify Core Challenges & Objectives
  const isLeadGen = lower.includes("lead") || lower.includes("client") || lower.includes("patient") || lower.includes("member") || lower.includes("customer") || lower.includes("sale") || lower.includes("growth");
  const isWebDesign = lower.includes("website") || lower.includes("3d") || lower.includes("webgl") || lower.includes("design") || lower.includes("build") || lower.includes("develop") || lower.includes("wordpress") || lower.includes("shopify");
  const isSEO = lower.includes("seo") || lower.includes("rank") || lower.includes("search") || lower.includes("google") || lower.includes("good") || lower.includes("map");
  const isAds = lower.includes("ad") || lower.includes("roas") || lower.includes("meta") || lower.includes("facebook") || lower.includes("instagram") || lower.includes("ppc") || lower.includes("roi");
  const isPricing = lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("budget") || lower.includes("retainer") || lower.includes("cheap") || lower.includes("expensive") || lower.includes("₹") || lower.includes("rupee");
  const isTimeline = lower.includes("fast") || lower.includes("how long") || lower.includes("timeline") || lower.includes("duration") || lower.includes("days") || lower.includes("week") || lower.includes("month");
  const isFounder = lower.includes("trishanjit") || lower.includes("dalal") || lower.includes("founder") || lower.includes("who are you") || lower.includes("team") || lower.includes("motto") || lower.includes("manifesto");
  const isKolkata = lower.includes("kolkata") || lower.includes("sector v") || lower.includes("salt lake") || lower.includes("meet") || lower.includes("office") || lower.includes("address");
  const isProfile = lower.includes("digital profile") || lower.includes("profile");

  // 3. Extract Specific Numbers if present (e.g. 50 members, 15000 budget, 7 days, 10m to 42m)
  const numbersMatch = query.match(/\d+[\w%+]*/g) || [];
  const mentionedDetails = numbersMatch.length > 0 ? `including specific metrics (${numbersMatch.join(", ")})` : "";

  // 4. Construct Tailored Solution
  let intentSummary = "";
  let solutionSteps: string[] = [];
  let timeline = "10 to 14 business days";
  let budget = "₹10,000 – ₹25,000 / mo (Starter) to ₹50,000+ / mo (Enterprise)";
  let roas = "1.3X Verified Ad Spend Return Benchmark";
  let followUps: string[] = [];

  if (isFounder || isProfile) {
    intentSummary = `You asked about **Founder Trishanjit Dalal** and our signature **Digital Profile** framework.`;
    solutionSteps = [
      `**Founder's Executive Motto**: *"We help both local and international businesses to make their websites and increase sales, leads and growth, making a Digital Profile for them"* ~ **Trishanjit Dalal**`,
      `**Zero Subcontracting SLA**: Trishanjit and our senior architects manage your digital architecture directly from our Salt Lake Sector V headquarters.`,
      `**Digital Profile Core Components**: We construct an ultra-fast 3D website (0.8s mobile Core Web Vitals), Google Search Rank 'Good' semantic schema, localized map-pack dominance, and 1-click WhatsApp customer conversion funnels.`,
      `**Proven Track Record**: Scaled enterprise revenue from $10M to $42M in 90 days and consistently deliver our verified 1.3X ROAS benchmark.`,
    ];
    timeline = "10–14 days for Digital Profile rollout";
    followUps = [
      "How do we schedule a meeting with Trishanjit Dalal?",
      "What is the first step to create my Digital Profile?",
      "Can we meet in person at Salt Lake Sector V?",
    ];
  } else if (isWebDesign) {
    intentSummary = `You asked about **building a custom website / online platform** for your ${industry} ${mentionedDetails}.`;
    solutionSteps = [
      `**Bespoke Architecture**: Engineered without templates, WordPress bloat, or slow plugins. Built using modern React and Three.js for interactive visual excellence.`,
      `**Sub-Second Speed (0.8s)**: Rapid Core Web Vitals and zero layout shift ensure shoppers and prospects never drop off during checkout or inquiries.`,
      `**Seamless eCommerce / Lead Conversion**: Complete catalog/product showcase with 1-click WhatsApp checkout funnels and UPI payment gateway integration.`,
      `**Cross-Device Responsiveness**: Handcrafted to adapt seamlessly across mobile phones, tablets, and 4K desktop screens.`,
    ];
    timeline = "10 to 14 days (Starter / Digital Profile) to 3–4 weeks (Full 3D Platform)";
    budget = "₹10,000 – ₹25,000 (Digital Profile / eCommerce Starter) or custom scope";
    followUps = [
      "Can you show live e-commerce portfolio examples?",
      "Can we integrate UPI and credit card checkout?",
      "How fast can we launch the first product catalog?",
    ];
  } else if (isAds || isLeadGen) {
    intentSummary = `You asked how to **generate qualified buyer leads, get new customers/members, and achieve our verified 1.3X ROAS** for your ${industry} ${mentionedDetails}.`;
    solutionSteps = [
      `**Hyper-Targeted Acquisition Funnel**: For ${industry}, we build geofenced Google Search (intent-driven) and Meta (Instagram/Facebook) campaigns optimized for local radius conversions.`,
      `**Verified 1.3X ROAS Baseline**: Zero wasted ad spend. Every rupee goes towards high-intent buyer clicks with negative keyword exclusions to filter unqualified leads.`,
      `**Instant WhatsApp Conversion Hook**: Direct 1-click WhatsApp consultation booking on a sub-second (0.8s) landing page so incoming prospects can book visits or purchases immediately.`,
      `**24/7 AI Lead Nurturing & CRM**: An automated conversational assistant that qualifies prospects, collects requirements, and notifies your sales team in real time.`,
    ];
    roas = "1.3X Verified Baseline ROAS";
    timeline = "Ad campaigns live within 48 to 72 hours";
    followUps = [
      `What monthly ad budget is recommended for ${industry}?`,
      "How fast can we launch the lead acquisition campaign?",
      "How do we track lead conversion in the Client Portal?",
    ];
  } else if (isPricing) {
    intentSummary = `You asked about **pricing, investment tiers, and budget options** for your ${industry}.`;
    solutionSteps = [
      `**Starter Growth Retainer (₹10,000 – ₹25,000/mo)**: Ideal for emerging businesses looking to launch their Digital Profile, secure Google Search Rank 'Good' local SEO, and capture WhatsApp leads.`,
      `**Professional Scale Retainer (₹25,000 – ₹50,000/mo)**: Comprehensive 3D WebGL web engineering, Google & Meta Ads management with our verified **1.3X ROAS** target, and weekly telemetry.`,
      `**Enterprise Dominance (₹50,000+/mo)**: Custom web apps, programmatic SEO, and bespoke 24/7 AI lead pipelines.`,
      `**Guaranteed Terms**: Month-to-month flexibility with zero lock-in contracts, 100% transparent reporting, and invoice generation.`,
    ];
    budget = "Transparent tiers from ₹10,000/mo";
    followUps = [
      "Can I start with a ₹10,000 monthly retainer?",
      "What is the expected ROI for my budget?",
      "How do we process online invoice payment?",
    ];
  } else if (isTimeline) {
    intentSummary = `You asked about **delivery timelines and how fast** we can launch your project.`;
    solutionSteps = [
      `**Phase 1: Discovery & Strategy (Days 1–3)**: Requirements intake, competitor gap analysis, and 3D wireframe sign-off.`,
      `**Phase 2: High-Velocity Engineering (Days 4–10)**: Clean React/TypeScript development with 0.8s Core Web Vitals, JSON-LD Schema, and conversion tracking.`,
      `**Phase 3: Quality Assurance & Launch (Days 11–14)**: Cross-device testing on laptops, tablets, and mobile viewports, followed by live deployment.`,
      `**Ad Campaigns Live in 48–72 Hours**: If you need buyer leads immediately, our Google Search & Meta PPC campaigns can be activated within 2 to 3 days!`,
    ];
    timeline = "10 to 14 days (Emergency 7-day sprint available upon request)";
    followUps = [
      "Can we do an emergency 7-day website sprint?",
      "How fast can Google Ads start generating leads?",
      "How will I track live milestones in the Client Portal?",
    ];
  } else if (isSEO) {
    intentSummary = `You asked about **technical SEO, Google Search Rank 'Good', and search engine domination** for your ${industry}.`;
    solutionSteps = [
      `**Semantic Schema.org JSON-LD**: We inject dynamic Organization, LocalBusiness, Service, and FAQPage structured data to trigger rich snippet accordions in Google search results.`,
      `**Local Google Maps 3-Pack Supremacy**: Comprehensive geotargeting across Salt Lake Sector V, New Town, Park Street, Kolkata, and nationwide high-intent buyer searches.`,
      `**Core Web Vitals Engineering**: Sub-second load times that give you an unfair algorithmic ranking advantage over slow competitors.`,
      `**High-Intent Keyword Clustering**: Target commercial phrases like "best ${industry.toLowerCase()} in kolkata" that drive paying inquiries, not vanity traffic.`,
    ];
    roas = "Google Search Rank 'Good' with 40%+ organic lead growth";
    followUps = [
      "Can you run a free SEO audit on my current website?",
      "How long before we rank on Google's first page?",
      "How does FAQPage schema help Google AI Overviews?",
    ];
  } else if (isKolkata) {
    intentSummary = `You asked about our **Salt Lake Sector V, Kolkata headquarters and in-person executive briefings**.`;
    solutionSteps = [
      `**Prime Headquarters**: Salt Lake Sector V, Bidhannagar, Kolkata, West Bengal 700091, India (near College More).`,
      `**In-Person Strategy Meetings**: Founder Trishanjit Dalal and our technical directors host face-to-face executive briefings Monday through Saturday.`,
      `**Direct Contact**: Phone & WhatsApp: **+91 7044811476** | Email: **contact@puhayt.digital**.`,
      `**Local & Global Scale**: We serve Kolkata leaders across Sector V, New Town, Park Street, Ballygunge, as well as enterprise clients in the US, UK, and UAE.`,
    ];
    followUps = [
      "Can we schedule an in-person meeting this week?",
      "What should I bring to our executive briefing?",
      "Where exactly in Sector V is the office located?",
    ];
  } else {
    // Dynamic Intelligent General Query Resolution
    intentSummary = `You asked: **"${query}"**. Here is Puhayt Digital's structured diagnosis and solution for your ${industry}.`;
    solutionSteps = [
      `**Founder Trishanjit Dalal's Blueprint**: *"We help both local and international businesses to make their websites and increase sales, leads and growth, making a Digital Profile for them"*.`,
      `**Tailored Architecture for ${industry}**: We eliminate generic agency fluff and deploy a bespoke 3D responsive website, Google Search Rank 'Good' technical SEO, and verified 1.3X ROAS paid advertising funnels.`,
      `**Rapid Execution**: Initial digital profile launch in 10 to 14 days with zero subcontracting — all code and campaigns are managed directly by our senior team in Salt Lake Sector V, Kolkata.`,
      `**Dedicated Client Portal**: Real-time project telemetry, sprint milestone tracking, invoices, and direct messaging with our engineering desk.`,
    ];
    followUps = [
      `What is the best digital marketing plan for ${industry}?`,
      "How does Puhayt Digital compare to other Kolkata agencies?",
      "Can we hop on a quick 10-minute discovery call?",
    ];
  }

  // Construct Markdown formatted response
  const markdown = `### 🎯 Solution & Strategic Diagnosis: ${industry}

> **Regarding your inquiry:** *"${query}"*

Hello! I am **Puhayt AI Assistant**, speaking directly on behalf of Founder & Lead Architect **Trishanjit Dalal** at **Puhayt Digital**.

Here is how we specifically understand and solve this for you:

#### 1. Strategic Roadmap & Execution
${solutionSteps.map((step, idx) => `${idx + 1}. ${step}`).join("\n")}

#### 2. Key Performance Indicators & Guarantees
- ⏱️ **Estimated Turnaround**: **${timeline}**
- 💰 **Investment Scope**: **${budget}**
- 📈 **Performance Target**: **${roas}**
- 🛡️ **Execution Standard**: **Zero Subcontracting SLA** — 100% in-house engineering at Salt Lake Sector V, Kolkata.

#### 3. Immediate Next Step
Founder **Trishanjit Dalal** is available directly to review your project specs:
- 📲 **Direct WhatsApp**: [**+91 7044811476**](https://wa.me/917044811476?text=${encodeURIComponent(`Hi Trishanjit! I asked your AI assistant: "${query}". Can we discuss the next steps for my business?`)})
- 📍 **Kolkata HQ**: Salt Lake Sector V, Bidhannagar (Near College More)
- 💼 **Free Consultation**: You can also click below to request a tailored strategy proposal!`;

  return {
    markdownResponse: markdown,
    analysis: {
      userIntent: intentSummary,
      industry,
      detectedGoals: [intentSummary],
      recommendedSolution: solutionSteps.join(" | "),
      timelineEstimate: timeline,
      budgetEstimate: budget,
      roasBenchmark: roas,
      followUpSuggestions: followUps,
    },
    suggestedFollowUps: followUps,
  };
}
