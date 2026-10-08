export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: "Website" | "Marketing" | "Branding" | "AI Automation" | "Software";
  client: string;
  industry: string;
  duration: string;
  image: string;
  logoUrl?: string; // Client / Website Brand Logo
  photos?: string[]; // Gallery of device / cloud photos
  videos?: string[]; // Video showcase URLs / uploads
  mockupDesktop?: string;
  mockupMobile?: string;
  description: string;
  technologies: string[];
  tags: string[];
  challenge?: string;
  solution?: string;
  problem?: string;
  strategy?: string;
  execution?: string[];
  impactMetrics?: {
    label: string;
    value: string;
  }[];
  results?: {
    label: string;
    value: string;
    change: string;
  }[];
  caseStudyResults?: {
    trafficGrowth?: string;
    roi?: string;
    conversionRate?: string;
    revenueGenerated?: string;
    pageSpeed?: string;
  };
  monthlyTrafficData?: {
    month: string;
    before: number;
    after: number;
  }[];
  revenueData?: {
    month: string;
    revenue: number;
  }[];
  clientTestimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  liveUrl?: string;
  verifiedFacts?: string[];
  aiGeneratedCopy?: boolean;
  approvalStatus?: "draft" | "pending" | "approved" | "published" | "archived";
}

export interface WebsiteAnalysis {
  id: string;
  url: string;
  analyzedAt: string;
  businessName: string;
  businessCategory: string;
  industry?: string;
  services: string[];
  targetAudience: string;
  valueProposition: string;
  valuePropositions?: string[];
  keyDifferentiators?: string[];
  suggestedHeadlines?: string[];
  extractedKeywords?: string[];
  callToAction?: string;
  brandStyle: string;
  visualStyle: string;
  colorStyle: string[];
  contentStyle: string;
  callsToAction: string[];
  publicContacts: {
    email?: string;
    phone?: string;
    address?: string;
    socialLinks?: string[];
  };
  seoObservations: string[];
  technicalObservations: string[];
  marketingOpportunities: string[];
  verifiedFacts: string[];
  generatedByAI: boolean;
}

export interface AdCampaign {
  id: string;
  name: string;
  websiteUrl: string;
  clientName: string;
  objective: "Lead Generation" | "Brand Awareness" | "Conversions" | "Traffic" | "Sales Conversion" | "Website Traffic";
  platform: "Google Search" | "Google Display" | "Meta / Instagram" | "LinkedIn" | "YouTube" | "Website Banner" | "Meta Ads";
  status: "draft" | "pending" | "approved" | "published" | "archived" | "rejected";
  approved: boolean;
  approvedAt?: string;
  approvedBy?: string;
  createdAt: string;
  aspectRatio?: "1:1" | "4:5" | "9:16" | "16:9" | "1.91:1";
  headlines: string[];
  primaryText: string;
  description: string;
  ctaText: string;
  targetUrl: string;
  imageUrl?: string;
  videoConcept?: {
    duration: string;
    hook: string;
    scenes: {
      sceneNumber: number;
      title: string;
      voiceover: string;
      onScreenText: string;
      shotDescription: string;
    }[];
    audioDirection: string;
    cta: string;
  };
  impressions: number;
  clicks: number;
  variations?: {
    version: string;
    headline: string;
    copy: string;
    estimatedCtr: string;
  }[];
}

export interface SEOAuditResult {
  id?: string;
  url?: string;
  timestamp: string;
  overallScore: number;
  technicalScore: number;
  onPageScore: number;
  contentScore?: number;
  localScore?: number;
  performanceScore?: number;
  mobileScore?: number;
  accessibilityScore?: number;
  structuredDataScore: number;
  indexabilityScore?: number;
  securityScore?: number;
  criticalIssues?: string[];
  highIssues?: string[];
  mediumIssues?: string[];
  passedChecks?: string[];
  coreWebVitals?: {
    lcp: string;
    fid: string;
    cls: string;
    status: "good" | "needs-improvement" | "poor";
  };
  issues?: {
    type: "passed" | "warning" | "error";
    category: string;
    message: string;
    recommendation?: string;
  }[];
  structuredDataValid?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  heroImage: string;
  problem: string;
  strategy: string;
  execution: string[];
  results: {
    trafficGrowth: string;
    roi: string;
    conversionRate: string;
    revenueGenerated: string;
  };
  monthlyTrafficData: { month: string; before: number; after: number }[];
  revenueData: { month: string; revenue: number }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  notIncluded?: string[];
  popular?: boolean;
  ctaText: string;
  whatsappMessage?: string;
  whatsappNumber?: string;
}

export interface ContactInfo {
  emails: string[];
  whatsapps: string[];
  whatsappTemplates?: Record<string, string>;
  instagrams: string[];
  linkedins?: string[];
  twitters?: string[];
  youtubes?: string[];
  telegrams?: string[];
  facebooks?: string[];
  phones: string[];
  address?: string;
  mapTitle?: string;
}

export interface LocationPin {
  address: string;
  mapTitle: string;
  latitude?: number;
  longitude?: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  videoUrl?: string;
  platform: "Google" | "Trustpilot" | "Clutch" | "Direct";
  resultsAchieved: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  publishedAt: string;
  readTime: string;
  image: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message?: string;
  createdAt: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Closed";
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
  role: "client" | "vip" | "admin" | "guest";
  authProvider: "google" | "password" | "phone" | "anonymous";
  createdAt?: string;
  lastLoginAt?: string;
}

export interface BrandLogoConfig {
  logoUrl?: string; // Optional custom image URL or Base64 Data URL
  logoType: "custom_image" | "emblem_letter" | "emblem_icon";
  brandName: string; // e.g. "PUHAYT"
  brandSuffix: string; // e.g. "DIGITAL"
  tagline: string; // e.g. "Digital Growth Agency"
  emblemLetter: string; // e.g. "P"
  emblemIcon?: "sparkles" | "crown" | "shield" | "flame" | "gem" | "zap" | "globe";
  emblemGradient: "gold" | "cyber" | "ruby" | "emerald" | "platinum";
  showDot: boolean;
  faviconUrl?: string;
  updatedAt?: string;
}

export interface ClientPortalData {
  projectName: string;
  clientName: string;
  company: string;
  progressPercent: number;
  currentPhase: string;
  assignedManager: {
    name: string;
    role: string;
    email: string;
    avatar: string;
  };
  campaignMetrics: {
    organicTraffic: number;
    paidConversions: number;
    adSpend: number;
    roas: number;
    topKeywordRank: number;
  };
  tasks: { id: string; title: string; status: "Completed" | "In Progress" | "Pending"; dueDate: string }[];
  invoices: { id: string; invoiceNo: string; amount: string; date: string; status: "Paid" | "Pending" | "Overdue"; pdfUrl: string }[];
  deliverables: { id: string; title: string; fileType: string; size: string; date: string; downloadUrl: string }[];
}

export interface ClientWebsite {
  id: string;
  userId?: string;
  userEmail: string;
  clientName: string;
  websiteName: string;
  liveUrl: string;
  previewUrl?: string;
  adminPortalUrl?: string;
  planName: string;
  subscriptionStatus: "Active" | "VIP" | "Trial" | "Expired";
  techStack: string[];
  deploymentStatus: "Live" | "Staging" | "Deploying" | "Maintenance";
  credentialsNote?: string;
  deliveryDate: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ClientMilestone {
  id: string;
  title: string;
  phase: string;
  status: "Completed" | "In Progress" | "Upcoming";
  dueDate: string;
  deliverableUrl?: string;
  notes?: string;
}

export interface ClientProject {
  id: string;
  userId?: string;
  userEmail: string;
  projectName: string;
  company?: string;
  progressPercent: number;
  currentPhase: string;
  targetCompletionDate: string;
  assignedManager?: {
    name: string;
    role: string;
    email: string;
    avatar: string;
  };
  milestones: ClientMilestone[];
  updatedAt: string;
}

export interface ClientChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  recipientEmail?: string; // target client email if sent from DevMode, or "devmode" if sent from client
  isFromDevMode: boolean;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ClientInvoice {
  id: string;
  invoiceNo: string;
  userId?: string;
  userEmail: string;
  clientName: string;
  planName: string;
  amount: number;
  currency: string;
  date: string;
  dueDate?: string;
  status: "Paid" | "Pending" | "Overdue";
  paymentMethod?: string;
  transactionRef?: string;
  pdfUrl?: string;
  items?: { description: string; amount: number }[];
}

export interface TeamMemberProfile {
  id: string;
  name: string;
  age: number;
  roleTitle: string;
  skills: string[];
  phone: string;
  whatsapp: string;
  callingHours: string;
  instagramUsername: string;
  instagramUrl: string;
  imageUrl?: string;
  bio?: string;
  accentBadge?: string;
}

export interface DiscountOfferImage {
  id: string;
  url: string;
  caption: string;
}

export type OfferType = "Referral" | "Discount" | "Offer";

export interface DiscountOffer {
  id: string;
  title: string;
  badge: string;
  offerType?: OfferType;
  discountPercentage?: string;
  discountAmount?: string;
  code: string;
  description: string;
  images: DiscountOfferImage[];
  validUntil?: string;
  terms?: string;
  active: boolean;
  whatsappReferralMessageTemplate?: string;
  createdAt: string;
}

export type EarnedDiscountStatus = "Active" | "Pending" | "Redeemed" | "Locked";

export interface ReferralClickRecord {
  id: string;
  referralCode: string;
  timestamp: string;
  source: "WhatsApp" | "Direct Link" | "LinkedIn" | "Twitter / X" | "Instagram" | "QR Code" | "Email";
  device: "Mobile" | "Desktop" | "Tablet";
  location: string;
  ipMasked?: string;
  status: "Visited" | "Inquiry Submitted" | "Project Kickoff";
}

export interface EarnedDiscount {
  id: string;
  title: string;
  code: string;
  discountValue: string;
  tierName: string;
  description: string;
  requiredClicks: number;
  status: EarnedDiscountStatus;
  unlockedAt?: string;
  redeemedAt?: string;
  appliedInvoiceRef?: string;
  claimInstruction: string;
}

export interface UserReferralStats {
  referralCode: string;
  totalClicks: number;
  uniqueVisitors: number;
  inquiriesGenerated: number;
  totalSavingsEarned: string;
  clickHistory: ReferralClickRecord[];
  earnedDiscounts: EarnedDiscount[];
  lastUpdated: string;
}

export interface PublicReview {
  id: string;
  reviewerName: string;
  reviewerRole?: string;
  companyName?: string;
  reviewerEmail?: string;
  avatarUrl?: string;
  rating: number; // 1 to 5
  platformStyle: "Google Maps" | "Google Play Store" | "Verified Client";
  serviceUsed: string;
  title?: string;
  comment: string;
  photos?: string[];
  subRatings?: {
    quality: number;
    communication: number;
    value: number;
    speed: number;
  };
  helpfulCount: number;
  helpfulVoterIds?: string[];
  ownerReply?: {
    text: string;
    repliedBy: string;
    repliedAt: string;
  };
  isLocalGuide?: boolean;
  createdAt: string;
}



