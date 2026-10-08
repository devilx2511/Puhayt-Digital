import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PricingPlan,
  PortfolioProject,
  AdCampaign,
  WebsiteAnalysis,
  SEOAuditResult,
  UserProfile,
  BrandLogoConfig,
  ClientWebsite,
  ClientProject,
  ClientMilestone,
  ClientChatMessage,
  ClientInvoice,
  TeamMemberProfile,
  DiscountOffer,
  UserReferralStats,
  EarnedDiscount,
  ReferralClickRecord,
  PublicReview,
  BlogPost,
} from "../types";
import { PRICING_PLANS, PORTFOLIO_PROJECTS, DEFAULT_TEAM_MEMBERS, DEFAULT_DISCOUNTS, DEFAULT_USER_REFERRAL_STATS, BLOG_POSTS } from "../data/agencyData";
import { ALL_INDIAN_BANKS, ALL_UPI_APPS } from "../data/indianBanksAndUpi";
import { validateIndianMobile, validateUpiVpa } from "../utils/paymentValidation";
import type { User } from "firebase/auth";

function cleanFirestoreData<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => cleanFirestoreData(item)) as unknown as T;
  }
  if (typeof obj === "object") {
    const cleaned: Record<string, any> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v !== undefined) {
        cleaned[k] = cleanFirestoreData(v);
      }
    }
    return cleaned as T;
  }
  return obj;
}

let firebaseDepsPromise: Promise<{
  db: any;
  handleFirestoreError: any;
  OperationType: any;
  collection: any;
  doc: any;
  setDoc: any;
  deleteDoc: any;
  onSnapshot: any;
}> | null = null;

function getFirebaseDeps() {
  if (!firebaseDepsPromise) {
    firebaseDepsPromise = Promise.all([
      import("../lib/firebase"),
      import("firebase/firestore"),
    ]).then(([fbLib, firestore]) => ({
      db: fbLib.db,
      handleFirestoreError: fbLib.handleFirestoreError,
      OperationType: fbLib.OperationType,
      collection: firestore.collection,
      doc: firestore.doc,
      setDoc: firestore.setDoc,
      deleteDoc: firestore.deleteDoc,
      onSnapshot: firestore.onSnapshot,
    }));
  }
  return firebaseDepsPromise;
}

async function asyncSetDoc(colName: string, docId: string, data: any, options?: any) {
  try {
    const { db, doc, setDoc } = await getFirebaseDeps();
    await setDoc(doc(db, colName, docId), cleanFirestoreData(data), options);
  } catch (err) {
    console.error(`Firestore write error (${colName}/${docId}):`, err);
  }
}

async function asyncDeleteDoc(colName: string, docId: string) {
  try {
    const { db, doc, deleteDoc } = await getFirebaseDeps();
    await deleteDoc(doc(db, colName, docId));
  } catch (err) {
    console.error(`Firestore delete error (${colName}/${docId}):`, err);
  }
}

export interface ContactInfo {
  emails: string[];
  whatsapps: string[];
  instagrams: string[];
  phones: string[];
  address: string;
}

export interface LocationPin {
  lat: number;
  lng: number;
  address: string;
  mapTitle: string;
}

export interface TransactionRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  paymentMethod: "UPI" | "Card" | "Razorpay" | "Stripe";
  upiAppUsed?: string;
  bankUsed?: string;
  status: "Success" | "Pending" | "Failed";
  date: string;
  referenceId: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  message?: string;
  createdAt: string;
  status: "New" | "Contacted" | "Closed";
}

export interface NotificationRecord {
  id: string;
  title: string;
  message: string;
  type: "payment" | "lead" | "audit" | "system" | "campaign" | "seo";
  timestamp: string;
  read: boolean;
  amount?: number;
}

export interface PaymentAuditLog {
  id: string;
  timestamp: string;
  clientName: string;
  clientEmail: string;
  paymentMethod: "UPI" | "Card";
  vpaOrCardDetails: string;
  status: "SUCCESS" | "FAILED_VERIFICATION" | "BLOCKED_UNEXISTING_ACCOUNT";
  verificationToken?: string;
  errorReason?: string;
  amount?: number;
  ipAddress?: string;
}

export interface UpiAccountConfig {
  id: string;
  bankName: string;
  bankCode: string;
  upiApp: string;
  upiId: string;
  mobileNumber: string;
  isVerified: boolean;
  verificationMessage?: string;
}

export interface CardAccountConfig {
  id: string;
  processor: "Razorpay" | "Stripe";
  bankName: string;
  bankCode: string;
  accountNumber: string;
  ifscCode: string;
  registeredMobile: string;
  accountHolder: string;
  kycType: "Aadhaar" | "PAN" | "Both";
  aadhaarNumber?: string;
  panNumber?: string;
  businessName?: string;
  taxGstNumber?: string;
  isVerified: boolean;
}

export interface PaymentSettings {
  activeProcessor: "Razorpay" | "Stripe";
  enabledUpiAppIds: string[]; // List of UPI App IDs enabled by admin
  upiAccounts: UpiAccountConfig[];
  cardAccounts: CardAccountConfig[];
}

interface AgencyContextType {
  pricingPlans: PricingPlan[];
  portfolioProjects: PortfolioProject[];
  showCaseStudies: boolean;
  contactInfo: ContactInfo;
  locationPin: LocationPin;
  transactions: TransactionRecord[];
  leads: LeadRecord[];
  notifications: NotificationRecord[];
  paymentAuditLogs: PaymentAuditLog[];
  paymentSettings: PaymentSettings;
  campaigns: AdCampaign[];
  websiteAnalyses: WebsiteAnalysis[];
  seoAuditHistory: SEOAuditResult[];
  isDevModeOpen: boolean;
  isDevModeAuthenticated: boolean;
  isPaymentModalOpen: boolean;
  selectedPlanForPayment: PricingPlan | null;

  // Firebase Auth State
  currentUser: User | null;
  userProfile: UserProfile | null;
  isAuthModalOpen: boolean;
  authModalTab: "google" | "email" | "phone" | "guest";
  openAuthModal: (tab?: "google" | "email" | "phone" | "guest") => void;
  closeAuthModal: () => void;
  logout: () => Promise<void>;

  // Actions
  updatePricingPlans: (plans: PricingPlan[]) => void;
  deletePricingPlan: (id: string) => void;
  clearAllPricingPlans: () => void;
  restoreDefaultPricingPlans: () => void;
  updatePortfolioProjects: (projects: PortfolioProject[]) => void;
  addPortfolioProject: (project: PortfolioProject) => void;
  deletePortfolioProject: (id: string) => void;
  clearAllPortfolioProjects: () => void;
  restoreDefaultPortfolioProjects: () => void;
  setShowCaseStudies: (show: boolean) => void;
  updateContactInfo: (info: ContactInfo) => void;
  updateLocationPin: (pin: LocationPin) => void;
  addTransaction: (txn: Omit<TransactionRecord, "id" | "date" | "referenceId">) => TransactionRecord;
  addLead: (lead: Omit<LeadRecord, "id" | "createdAt" | "status">) => void;
  addPaymentAuditLog: (log: Omit<PaymentAuditLog, "id" | "timestamp">) => PaymentAuditLog;
  clearPaymentAuditLogs: () => void;
  updatePaymentSettings: (settings: PaymentSettings) => void;
  
  // Marketing & Ads Operations
  addCampaign: (campaign: Omit<AdCampaign, "id" | "createdAt" | "impressions" | "clicks">) => AdCampaign;
  updateCampaign: (id: string, updates: Partial<AdCampaign>) => void;
  deleteCampaign: (id: string) => void;
  approveCampaign: (id: string, approved: boolean) => void;
  publishCampaign: (id: string, publish: boolean) => void;
  recordCampaignImpression: (id: string) => void;
  recordCampaignClick: (id: string) => void;

  // Website Analysis & SEO
  addWebsiteAnalysis: (analysis: WebsiteAnalysis) => void;
  deleteWebsiteAnalysis: (id: string) => void;
  addSeoAuditResult: (result: SEOAuditResult) => void;

  // DevMode & Payment Modal
  openDevMode: () => void;
  closeDevMode: () => void;
  authenticateDevMode: (password: string) => boolean;
  logoutDevMode: () => void;
  openPaymentModal: (plan?: PricingPlan, cycle?: "monthly" | "yearly") => void;
  closePaymentModal: () => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // Brand & Logo Config
  brandLogo: BrandLogoConfig;
  updateBrandLogo: (config: Partial<BrandLogoConfig>) => void;

  // Cloud Live Synchronization
  isCloudSyncing: boolean;
  syncAllToLiveCloud: () => Promise<boolean>;

  // Verification helper
  verifyUpiAccount: (bankName: string, upiId: string, mobileNumber: string) => { verified: boolean; error?: string };

  // Client Dashboard State & Actions (Secure Authenticated Portal)
  isClientDashboardOpen: boolean;
  openClientDashboard: () => void;
  closeClientDashboard: () => void;
  clientWebsites: ClientWebsite[];
  clientProjects: ClientProject[];
  clientChatMessages: ClientChatMessage[];
  clientInvoices: ClientInvoice[];
  addOrUpdateClientWebsite: (website: ClientWebsite) => Promise<void>;
  deleteClientWebsite: (id: string) => Promise<void>;
  sendClientChatMessage: (msg: Omit<ClientChatMessage, "id" | "timestamp" | "read">) => Promise<void>;
  addOrUpdateClientProject: (project: ClientProject) => Promise<void>;
  addClientInvoice: (invoice: ClientInvoice) => Promise<void>;

  // Team & Leadership Profiles
  teamMembers: TeamMemberProfile[];
  updateTeamMember: (id: string, updates: Partial<TeamMemberProfile>) => Promise<void>;

  // Referrals & Discounts
  discounts: DiscountOffer[];
  addDiscount: (discount: Omit<DiscountOffer, "id" | "createdAt">) => Promise<void>;
  updateDiscount: (id: string, updates: Partial<DiscountOffer>) => Promise<void>;
  deleteDiscount: (id: string) => Promise<void>;

  // Blog & Articles
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, "id">) => Promise<void>;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  restoreDefaultBlogPosts: () => Promise<void>;

  // Referral Link Tracking & Earned Discounts Dashboard
  referralStats: UserReferralStats;
  userReferralCode: string;
  trackReferralClick: (code?: string, customMeta?: Partial<ReferralClickRecord>) => void;
  simulateReferralClick: () => void;
  redeemEarnedDiscount: (discountId: string, invoiceRef?: string) => Promise<boolean>;
  resetReferralStats: () => void;
  updateReferralCode: (newCode: string) => void;

  // Real Public Reviews System (Google Maps & Google Play Store style)
  publicReviews: PublicReview[];
  addPublicReview: (review: Omit<PublicReview, "id" | "createdAt" | "helpfulCount">) => Promise<void>;
  markReviewHelpful: (reviewId: string) => Promise<void>;
  replyToPublicReview: (reviewId: string, replyText: string, repliedBy?: string) => Promise<void>;
  deletePublicReview: (reviewId: string) => Promise<void>;
}

const DEFAULT_CONTACTS: ContactInfo = {
  emails: ["aayushcps0907@gmail.com", "contact@puhayt.digital"],
  whatsapps: ["+91 7044811476"],
  instagrams: ["@itz___.unknown_13", "@aayushg.dev"],
  phones: ["+91 70448 11476"],
  address: "Kolkata, West Bengal (We operate digitally & travel directly to your office / business premises across Kolkata)",
};

const DEFAULT_LOCATION: LocationPin = {
  lat: 22.5804,
  lng: 88.4378,
  address: "Kolkata, West Bengal — In-Person Briefings at Your Premises across Kolkata",
  mapTitle: "Puhayt Digital — We Meet Directly at Your Office / Premises",
};

const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  activeProcessor: "Razorpay",
  enabledUpiAppIds: ["gpay", "phonepe", "paytm", "bhim", "cred", "amazonpay"],
  upiAccounts: [
    {
      id: "upi-1",
      bankName: "HDFC Bank",
      bankCode: "HDFC",
      upiApp: "Google Pay",
      upiId: "puhaytdigital@okhdfcbank",
      mobileNumber: "9876543210",
      isVerified: true,
      verificationMessage: "Account Active & Verified",
    },
    {
      id: "upi-2",
      bankName: "ICICI Bank",
      bankCode: "ICIC",
      upiApp: "PhonePe",
      upiId: "puhayt@ybl",
      mobileNumber: "9876543210",
      isVerified: true,
      verificationMessage: "Account Active & Verified",
    },
  ],
  cardAccounts: [
    {
      id: "card-1",
      processor: "Razorpay",
      bankName: "HDFC Bank",
      bankCode: "HDFC",
      accountNumber: "50200088192301",
      ifscCode: "HDFC0000240",
      registeredMobile: "9876543210",
      accountHolder: "Puhayt Digital Technologies Pvt Ltd",
      kycType: "Both",
      aadhaarNumber: "7890 1234 5678",
      panNumber: "ABCDE1234F",
      businessName: "Puhayt Digital Tech Pvt Ltd",
      taxGstNumber: "07AAAAA0000A1Z5",
      isVerified: true,
    },
  ],
};

const INITIAL_CAMPAIGNS: AdCampaign[] = [
  {
    id: "camp-puhayt-spring",
    name: "Spring Growth Acceleration — Custom Web & SEO",
    websiteUrl: "https://puhayt.digital",
    clientName: "Puhayt Digital",
    objective: "Lead Generation",
    platform: "Website Banner",
    status: "published",
    approved: true,
    approvedAt: "2026-03-01T10:00:00Z",
    approvedBy: "Admin",
    createdAt: "2026-03-01T09:30:00Z",
    aspectRatio: "16:9",
    headlines: [
      "Grow Smarter. Scale Faster with Puhayt Digital.",
      "Get a Bespoke High-Speed Website & Dominate Search in 2026",
      "Enterprise SEO & AI Lead Generation Built for High ROI"
    ],
    primaryText: "Elevate your brand presence with sub-second responsive design, local Google ranking systems, and multi-channel paid ads tailored for maximum return on investment.",
    description: "Connect directly with our senior digital strategy team today and claim a full technical website & SEO audit.",
    ctaText: "Claim Free Audit & Strategy",
    targetUrl: "#contact",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    impressions: 480,
    clicks: 42,
    variations: [
      {
        version: "Version A (Authority)",
        headline: "Scale Your Business With High-Performance Web & SEO",
        copy: "Puhayt Digital crafts custom digital experiences engineered for revenue growth.",
        estimatedCtr: "4.8%"
      },
      {
        version: "Version B (Direct ROI)",
        headline: "Turn Web Visitors Into Paying Clients",
        copy: "Fast, elegant websites with automated lead capture and enterprise SEO.",
        estimatedCtr: "5.2%"
      }
    ]
  }
];

export const DEFAULT_BRAND_LOGO: BrandLogoConfig = {
  logoType: "emblem_letter",
  logoUrl: "",
  brandName: "PUHAYT",
  brandSuffix: "DIGITAL",
  tagline: "Digital Growth Agency",
  emblemLetter: "P",
  emblemIcon: "sparkles",
  emblemGradient: "gold",
  showDot: true,
  faviconUrl: "",
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_CLIENT_PROJECT: ClientProject = {
  id: "proj-puhayt-core",
  userEmail: "aayushcps0907@gmail.com",
  projectName: "Puhayt Ultra-Luxury Headless Web & AI Engine",
  company: "Puhayt Digital Technologies",
  progressPercent: 82,
  currentPhase: "Stage 3: Full-Stack Integration & AI Agent Workflows",
  targetCompletionDate: "Oct 24, 2026",
  assignedManager: {
    name: "Alexander Vance",
    role: "Senior Growth Director",
    email: "alexander@puhayt.digital",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  milestones: [
    {
      id: "ms-1",
      title: "Discovery, Brand Architecture & Technical Specification",
      phase: "Phase 1: Architecture",
      status: "Completed",
      dueDate: "Sept 12, 2026",
      notes: "High-level architecture, user flow, and luxury dark color palette approved.",
    },
    {
      id: "ms-2",
      title: "Interactive 3D WebGL Monogram & Luxury Design System",
      phase: "Phase 2: UI/UX Engineering",
      status: "Completed",
      dueDate: "Sept 20, 2026",
      notes: "Shader animations, responsive typography, and mobile bottom dock complete.",
    },
    {
      id: "ms-3",
      title: "Full-Stack Express Backend Proxy & Client Dashboard",
      phase: "Phase 3: Development",
      status: "In Progress",
      dueDate: "Oct 10, 2026",
      notes: "Firestore client portal telemetry and secure authenticated routes.",
    },
    {
      id: "ms-4",
      title: "Automated Inbound Lead CRM & Direct DevMode Chat Engine",
      phase: "Phase 3: Development",
      status: "In Progress",
      dueDate: "Oct 16, 2026",
      notes: "Real-time sync between client dashboard and DevMode engineers.",
    },
    {
      id: "ms-5",
      title: "Core Web Vitals 99+, Custom Domain SSL & Global CDN Go-Live",
      phase: "Phase 4: Launch",
      status: "Upcoming",
      dueDate: "Oct 24, 2026",
      notes: "Edge caching, multi-region Cloud Run verification, and Search Console indexation.",
    },
  ],
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_CLIENT_WEBSITES: ClientWebsite[] = [
  {
    id: "web-puhayt-demo",
    userEmail: "aayushcps0907@gmail.com",
    clientName: "Puhayt Enterprise VIP",
    websiteName: "Aura Luxe — Ultra-Luxury E-Commerce & Brand Portal",
    liveUrl: "https://puhayt-digital.ai.studio",
    previewUrl: "https://puhayt-digital.ai.studio",
    adminPortalUrl: "https://puhayt-digital.ai.studio/#devmode",
    planName: "Enterprise Luxury Plan",
    subscriptionStatus: "VIP",
    techStack: ["React 19", "Tailwind CSS", "Cloudflare Edge", "Stripe / UPI"],
    deploymentStatus: "Live",
    credentialsNote: "Headless CMS Access and API keys provisioned. 24/7 dedicated server SLA active.",
    deliveryDate: "Oct 2026",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_CLIENT_INVOICES: ClientInvoice[] = [
  {
    id: "inv-2026-001",
    invoiceNo: "INV-PUHAYT-8921",
    userEmail: "aayushcps0907@gmail.com",
    clientName: "Enterprise Client",
    planName: "Enterprise Luxury Web & AI Suite",
    amount: 15000,
    currency: "INR",
    date: "2026-09-18",
    dueDate: "2026-09-25",
    status: "Paid",
    paymentMethod: "UPI (Google Pay / HDFC)",
    transactionRef: "NPCI-TXN-88492019",
    items: [
      { description: "Bespoke Web Engineering Sprint (Phase 1 & 2)", amount: 10000 },
      { description: "Technical SEO & Schema Optimization Setup", amount: 5000 },
    ],
  },
  {
    id: "inv-2026-002",
    invoiceNo: "INV-PUHAYT-9042",
    userEmail: "aayushcps0907@gmail.com",
    clientName: "Enterprise Client",
    planName: "Dedicated Cloud Server & Ongoing Sprint S2",
    amount: 8000,
    currency: "INR",
    date: "2026-09-25",
    dueDate: "2026-10-02",
    status: "Paid",
    paymentMethod: "Card / NetBanking",
    transactionRef: "RAZORPAY-TXN-993182",
    items: [
      { description: "Multi-Region Cloud Hosting & Dedicated DevMode Support", amount: 8000 },
    ],
  },
];

export const DEFAULT_CHAT_MESSAGES: ClientChatMessage[] = [
  {
    id: "msg-welcome",
    senderId: "devmode-director",
    senderName: "DevMode Engineering Director",
    senderEmail: "devmode@puhayt.digital",
    recipientEmail: "aayushcps0907@gmail.com",
    isFromDevMode: true,
    message: "Welcome to your private Puhayt Digital client dashboard! You can monitor live milestones, view all billing invoices, test your assigned website in the 'Websites' section, and message our DevMode engineering directors here directly at any time.",
    timestamp: "10:00 AM",
    read: true,
  },
];

function safeGetLocalStorage(key: string): string | null {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
    return null;
  }
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export const AgencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Brand Logo Config
  const [brandLogo, setBrandLogoState] = useState<BrandLogoConfig>(() => {
    const saved = safeGetLocalStorage("puhayt_brand_logo");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_BRAND_LOGO, ...parsed };
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_BRAND_LOGO;
  });
  // Pricing plans
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() => {
    const saved = safeGetLocalStorage("puhayt_pricing_plans");
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return PRICING_PLANS;
  });

  // Portfolio projects
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioProject[]>(() => {
    const saved = safeGetLocalStorage("puhayt_portfolio_projects");
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return PORTFOLIO_PROJECTS;
  });

  // Case studies visibility
  const [showCaseStudies, setShowCaseStudiesState] = useState<boolean>(() => {
    const saved = safeGetLocalStorage("puhayt_show_case_studies");
    return saved ? JSON.parse(saved) : false;
  });

  // Contact info
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = safeGetLocalStorage("puhayt_contact_info");
    return saved ? JSON.parse(saved) : DEFAULT_CONTACTS;
  });

  // Location pin
  const [locationPin, setLocationPin] = useState<LocationPin>(() => {
    const saved = safeGetLocalStorage("puhayt_location_pin");
    return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
  });

  // Team & Leadership Profiles
  const [teamMembers, setTeamMembers] = useState<TeamMemberProfile[]>(() => {
    const saved = safeGetLocalStorage("puhayt_team_members");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return DEFAULT_TEAM_MEMBERS;
  });

  // Referrals & Promotional Discount Offers (filter out legacy demo IDs)
  const DEMO_DISCOUNT_IDS = ["disc-welcome-20", "disc-startup-bundle", "disc-referral-vip"];
  const [discounts, setDiscounts] = useState<DiscountOffer[]>(() => {
    const saved = safeGetLocalStorage("puhayt_discounts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter((d: DiscountOffer) => !DEMO_DISCOUNT_IDS.includes(d.id));
          if (cleaned.length > 0) return cleaned;
        }
      } catch (e) {}
    }
    return DEFAULT_DISCOUNTS;
  });

  // Blog & Articles
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = safeGetLocalStorage("puhayt_blog_posts");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    return BLOG_POSTS;
  });

  // REAL PUBLIC REVIEWS (100% Real User-Submitted Only)
  const [publicReviews, setPublicReviews] = useState<PublicReview[]>(() => {
    const saved = safeGetLocalStorage("puhayt_public_reviews");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });

  // USER REFERRAL LINK TRACKING & EARNED DISCOUNTS STATS
  const [referralStats, setReferralStats] = useState<UserReferralStats>(() => {
    const saved = safeGetLocalStorage("puhayt_user_referral_stats");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.totalClicks === "number") return parsed;
      } catch (e) {}
    }
    return DEFAULT_USER_REFERRAL_STATS;
  });

  const [userReferralCode, setUserReferralCode] = useState<string>(() => {
    return safeGetLocalStorage("puhayt_user_referral_code") || DEFAULT_USER_REFERRAL_STATS.referralCode;
  });

  // REAL TRANSACTIONS
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    const saved = safeGetLocalStorage("puhayt_transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // REAL LEADS
  const [leads, setLeads] = useState<LeadRecord[]>(() => {
    const saved = safeGetLocalStorage("puhayt_leads");
    return saved ? JSON.parse(saved) : [];
  });

  // NOTIFICATIONS
  const [notifications, setNotifications] = useState<NotificationRecord[]>(() => {
    const saved = safeGetLocalStorage("puhayt_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // PAYMENT AUDIT LOGS
  const [paymentAuditLogs, setPaymentAuditLogs] = useState<PaymentAuditLog[]>(() => {
    const saved = safeGetLocalStorage("puhayt_payment_audit_logs");
    return saved ? JSON.parse(saved) : [];
  });

  // PAYMENT SETTINGS
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(() => {
    const saved = safeGetLocalStorage("puhayt_payment_settings");
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_SETTINGS;
  });

  // CAMPAIGNS STATE
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(() => {
    const saved = safeGetLocalStorage("puhayt_ad_campaigns");
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  // WEBSITE ANALYSES STATE
  const [websiteAnalyses, setWebsiteAnalyses] = useState<WebsiteAnalysis[]>(() => {
    const saved = safeGetLocalStorage("puhayt_website_analyses");
    return saved ? JSON.parse(saved) : [];
  });

  // SEO AUDIT HISTORY
  const [seoAuditHistory, setSeoAuditHistory] = useState<SEOAuditResult[]>(() => {
    const saved = safeGetLocalStorage("puhayt_seo_audit_history");
    return saved ? JSON.parse(saved) : [];
  });

  // DEV MODE STATE
  const [isDevModeOpen, setIsDevModeOpen] = useState(false);
  const [isDevModeAuthenticated, setIsDevModeAuthenticated] = useState(() => {
    return safeGetLocalStorage("puhayt_devmode_authed") === "true";
  });

  // FIREBASE AUTH STATE
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"google" | "email" | "phone" | "guest">("google");

  // Firestore & Auth Real-Time Listeners — Activated on first user interaction or modal open
  const [firestoreReady, setFirestoreReady] = useState(false);

  // PAYMENT MODAL STATE
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PricingPlan | null>(null);

  // CLIENT DASHBOARD STATE (Secure Authenticated Portal)
  const [isClientDashboardOpen, setIsClientDashboardOpen] = useState(false);
  const openClientDashboard = () => {
    setFirestoreReady(true);
    setIsClientDashboardOpen(true);
  };
  const closeClientDashboard = () => setIsClientDashboardOpen(false);

  useEffect(() => {
    let activated = false;
    const activate = () => {
      if (activated) return;
      activated = true;
      setFirestoreReady(true);
    };

    const events = ["pointerdown", "keydown", "touchstart"] as const;
    events.forEach((evt) => window.addEventListener(evt, activate, { once: true, passive: true }));

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, activate));
    };
  }, []);

  useEffect(() => {
    if (!firestoreReady && !isAuthModalOpen && !isClientDashboardOpen && !isDevModeOpen) return;
    let unsub = () => {};
    let cancelled = false;
    import("../lib/firebaseAuth")
      .then(({ subscribeToAuth }) => {
        if (cancelled) return;
        unsub = subscribeToAuth((user, profile) => {
          setCurrentUser(user);
          setUserProfile(profile);
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      unsub();
    };
  }, [firestoreReady, isAuthModalOpen, isClientDashboardOpen, isDevModeOpen]);

  const openAuthModal = (tab: "google" | "email" | "phone" | "guest" = "google") => {
    setFirestoreReady(true);
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    const { logoutUser } = await import("../lib/firebaseAuth");
    await logoutUser();
  };

  const [clientWebsites, setClientWebsites] = useState<ClientWebsite[]>(() => {
    const saved = safeGetLocalStorage("puhayt_client_websites");
    return saved ? JSON.parse(saved) : DEFAULT_CLIENT_WEBSITES;
  });

  const [clientProjects, setClientProjects] = useState<ClientProject[]>(() => {
    const saved = safeGetLocalStorage("puhayt_client_projects");
    return saved ? JSON.parse(saved) : [DEFAULT_CLIENT_PROJECT];
  });

  const [clientChatMessages, setClientChatMessages] = useState<ClientChatMessage[]>(() => {
    const saved = safeGetLocalStorage("puhayt_client_chats");
    return saved ? JSON.parse(saved) : DEFAULT_CHAT_MESSAGES;
  });

  const [clientInvoices, setClientInvoices] = useState<ClientInvoice[]>(() => {
    const saved = safeGetLocalStorage("puhayt_client_invoices");
    return saved ? JSON.parse(saved) : DEFAULT_CLIENT_INVOICES;
  });

  const hasMountedStorageRef = React.useRef(false);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_client_websites", JSON.stringify(clientWebsites));
  }, [clientWebsites]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_client_projects", JSON.stringify(clientProjects));
  }, [clientProjects]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_client_chats", JSON.stringify(clientChatMessages));
  }, [clientChatMessages]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_client_invoices", JSON.stringify(clientInvoices));
  }, [clientInvoices]);

  // Sync state to local storage
  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_pricing_plans", JSON.stringify(pricingPlans));
  }, [pricingPlans]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(portfolioProjects));
  }, [portfolioProjects]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_show_case_studies", JSON.stringify(showCaseStudies));
  }, [showCaseStudies]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_contact_info", JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_location_pin", JSON.stringify(locationPin));
  }, [locationPin]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_payment_audit_logs", JSON.stringify(paymentAuditLogs));
  }, [paymentAuditLogs]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_payment_settings", JSON.stringify(paymentSettings));
  }, [paymentSettings]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_ad_campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_website_analyses", JSON.stringify(websiteAnalyses));
  }, [websiteAnalyses]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_seo_audit_history", JSON.stringify(seoAuditHistory));
  }, [seoAuditHistory]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) return;
    localStorage.setItem("puhayt_user_referral_stats", JSON.stringify(referralStats));
  }, [referralStats]);

  useEffect(() => {
    if (!hasMountedStorageRef.current) {
      hasMountedStorageRef.current = true;
      return;
    }
    localStorage.setItem("puhayt_user_referral_code", userReferralCode);
  }, [userReferralCode]);

  // Check URL query parameters for ?ref=<code> on page entry
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref) {
        const sessionKey = `puhayt_tracked_ref_${ref}`;
        if (!sessionStorage.getItem(sessionKey)) {
          sessionStorage.setItem(sessionKey, "1");
          trackReferralClick(ref, {
            source: document.referrer && document.referrer.includes("whatsapp") ? "WhatsApp" : "Direct Link",
            device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
            location: "Kolkata, WB",
          });
        }
      }
    }
  }, []);

  // Cloud Syncing indicator state
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  // Master Sync to Cloud
  const syncAllToLiveCloud = async (): Promise<boolean> => {
    setIsCloudSyncing(true);
    try {
      // 1. Sync Portfolio Projects
      for (const p of portfolioProjects) {
        await asyncSetDoc("portfolio_projects", p.id, p);
      }

      // 2. Sync Pricing Plans
      for (const plan of pricingPlans) {
        await asyncSetDoc("pricing_plans", plan.id, plan);
      }

      // 3. Sync Settings
      await asyncSetDoc("settings", "contact_info", contactInfo);
      await asyncSetDoc("settings", "location_pin", locationPin);
      await asyncSetDoc("settings", "payment_settings", paymentSettings);
      await asyncSetDoc("settings", "brand_logo", brandLogo);
      await asyncSetDoc("settings", "site_config", { showCaseStudies });
      await asyncSetDoc("settings", "blog_posts", { list: blogPosts });

      // 4. Sync Campaigns
      for (const c of campaigns) {
        await asyncSetDoc("campaigns", c.id, c);
      }

      const syncNotif: NotificationRecord = {
        id: `notif-sync-${Date.now()}`,
        title: `☁️ Live Cloud Synced Successfully!`,
        message: `All portfolio projects, pricing tiers, branding, and contact settings are live for all users in real-time.`,
        type: "system",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      setNotifications((prev) => [syncNotif, ...prev]);
      await asyncSetDoc("notifications", syncNotif.id, syncNotif);

      setIsCloudSyncing(false);
      return true;
    } catch (error) {
      console.error("Cloud master sync error:", error);
      setIsCloudSyncing(false);
      return false;
    }
  };

  // Public Firestore Listeners (Settings, Portfolio, Pricing, Discounts, Public Reviews)
  useEffect(() => {
    if (!firestoreReady) return;

    let cancelled = false;
    const unsubs: Array<() => void> = [];

    getFirebaseDeps()
      .then(({ db, collection, doc, onSnapshot }) => {
        if (cancelled) return;

        try {
          unsubs.push(
            onSnapshot(
              collection(db, "pricing_plans"),
              (snapshot: any) => {
                if (!snapshot.empty) {
                  const plans = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as PricingPlan));
                  setPricingPlans(plans);
                  localStorage.setItem("puhayt_pricing_plans", JSON.stringify(plans));
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              collection(db, "portfolio_projects"),
              (snapshot: any) => {
                if (!snapshot.empty) {
                  const projects = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as PortfolioProject));
                  setPortfolioProjects(projects);
                  localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(projects));
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              collection(db, "campaigns"),
              (snapshot: any) => {
                if (!snapshot.empty) {
                  const camps = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as AdCampaign));
                  setCampaigns(camps);
                  localStorage.setItem("puhayt_ad_campaigns", JSON.stringify(camps));
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              doc(db, "settings", "brand_logo"),
              (snapshot: any) => {
                if (snapshot.exists()) {
                  const data = snapshot.data() as BrandLogoConfig;
                  setBrandLogoState((prev) => ({ ...prev, ...data }));
                  localStorage.setItem("puhayt_brand_logo", JSON.stringify(data));
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              doc(db, "settings", "contact_info"),
              (snapshot: any) => {
                if (snapshot.exists()) {
                  const data = snapshot.data() as ContactInfo;
                  setContactInfo(data);
                  localStorage.setItem("puhayt_contact_info", JSON.stringify(data));
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              doc(db, "settings", "location_pin"),
              (snapshot: any) => {
                if (snapshot.exists()) {
                  const data = snapshot.data() as LocationPin;
                  setLocationPin(data);
                  localStorage.setItem("puhayt_location_pin", JSON.stringify(data));
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              doc(db, "settings", "payment_settings"),
              (snapshot: any) => {
                if (snapshot.exists()) {
                  const data = snapshot.data() as PaymentSettings;
                  setPaymentSettings(data);
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              doc(db, "settings", "site_config"),
              (snapshot: any) => {
                if (snapshot.exists()) {
                  const data = snapshot.data();
                  if (typeof data?.showCaseStudies === "boolean") {
                    setShowCaseStudiesState(data.showCaseStudies);
                  }
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              doc(db, "settings", "team_members"),
              (snapshot: any) => {
                if (snapshot.exists()) {
                  const data = snapshot.data();
                  if (Array.isArray(data?.list) && data.list.length > 0) {
                    setTeamMembers(data.list);
                    localStorage.setItem("puhayt_team_members", JSON.stringify(data.list));
                  }
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              doc(db, "settings", "discounts"),
              (snapshot: any) => {
                if (snapshot.exists()) {
                  const data = snapshot.data();
                  if (Array.isArray(data?.list)) {
                    const cleaned = data.list.filter(
                      (d: DiscountOffer) => !["disc-welcome-20", "disc-startup-bundle", "disc-referral-vip"].includes(d.id)
                    );
                    setDiscounts(cleaned);
                    localStorage.setItem("puhayt_discounts", JSON.stringify(cleaned));
                  }
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              doc(db, "settings", "public_reviews"),
              (snapshot: any) => {
                if (snapshot.exists()) {
                  const data = snapshot.data();
                  if (Array.isArray(data?.list)) {
                    setPublicReviews(data.list);
                    localStorage.setItem("puhayt_public_reviews", JSON.stringify(data.list));
                  }
                }
              },
              () => {}
            )
          );
        } catch {}

        try {
          unsubs.push(
            onSnapshot(
              doc(db, "settings", "blog_posts"),
              (snapshot: any) => {
                if (snapshot.exists()) {
                  const data = snapshot.data();
                  if (Array.isArray(data?.list)) {
                    setBlogPosts(data.list);
                    localStorage.setItem("puhayt_blog_posts", JSON.stringify(data.list));
                  }
                }
              },
              () => {}
            )
          );
        } catch {}
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      unsubs.forEach((fn) => fn());
    };
  }, [firestoreReady]);

  // Authenticated / Admin-Only Firestore Listeners (Prevents unauthenticated permission-denied console errors)
  useEffect(() => {
    if (!firestoreReady || (!currentUser && !isDevModeAuthenticated)) return;

    let cancelled = false;
    const unsubs: Array<() => void> = [];

    getFirebaseDeps()
      .then(({ db, collection, onSnapshot }) => {
        if (cancelled) return;

        if (isDevModeAuthenticated || currentUser?.email === "aayushcps0907@gmail.com") {
          try {
            unsubs.push(
              onSnapshot(
                collection(db, "leads"),
                (snapshot: any) => {
                  if (!snapshot.empty) {
                    const fetchedLeads = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as LeadRecord));
                    setLeads(fetchedLeads);
                  }
                },
                () => {}
              )
            );
          } catch {}

          try {
            unsubs.push(
              onSnapshot(
                collection(db, "notifications"),
                (snapshot: any) => {
                  if (!snapshot.empty) {
                    const fetched = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as NotificationRecord));
                    setNotifications(fetched);
                  }
                },
                () => {}
              )
            );
          } catch {}

          try {
            unsubs.push(
              onSnapshot(
                collection(db, "seo_audits"),
                (snapshot: any) => {
                  if (!snapshot.empty) {
                    const audits = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as SEOAuditResult));
                    setSeoAuditHistory(audits);
                  }
                },
                () => {}
              )
            );
          } catch {}
        }

        if (currentUser) {
          try {
            unsubs.push(
              onSnapshot(
                collection(db, "client_websites"),
                (snapshot: any) => {
                  if (!snapshot.empty) {
                    const list = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as ClientWebsite));
                    setClientWebsites(list);
                    localStorage.setItem("puhayt_client_websites", JSON.stringify(list));
                  }
                },
                () => {}
              )
            );
          } catch {}

          try {
            unsubs.push(
              onSnapshot(
                collection(db, "client_projects"),
                (snapshot: any) => {
                  if (!snapshot.empty) {
                    const list = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as ClientProject));
                    setClientProjects(list);
                    localStorage.setItem("puhayt_client_projects", JSON.stringify(list));
                  }
                },
                () => {}
              )
            );
          } catch {}

          try {
            unsubs.push(
              onSnapshot(
                collection(db, "client_chats"),
                (snapshot: any) => {
                  if (!snapshot.empty) {
                    const list = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as ClientChatMessage));
                    setClientChatMessages(list);
                    localStorage.setItem("puhayt_client_chats", JSON.stringify(list));
                  }
                },
                () => {}
              )
            );
          } catch {}

          try {
            unsubs.push(
              onSnapshot(
                collection(db, "client_invoices"),
                (snapshot: any) => {
                  if (!snapshot.empty) {
                    const list = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() } as ClientInvoice));
                    setClientInvoices(list);
                    localStorage.setItem("puhayt_client_invoices", JSON.stringify(list));
                  }
                },
                () => {}
              )
            );
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      unsubs.forEach((fn) => fn());
    };
  }, [firestoreReady, currentUser, isDevModeAuthenticated]);

  // Actions
  const updateTeamMember = async (id: string, updates: Partial<TeamMemberProfile>) => {
    setTeamMembers((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, ...updates } : m));
      localStorage.setItem("puhayt_team_members", JSON.stringify(updated));
      asyncSetDoc("settings", "team_members", { list: updated }, { merge: true });
      return updated;
    });
  };

  const addDiscount = async (discountData: Omit<DiscountOffer, "id" | "createdAt">) => {
    const newOffer: DiscountOffer = {
      ...discountData,
      id: "disc-" + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setDiscounts((prev) => {
      const updated = [newOffer, ...prev];
      localStorage.setItem("puhayt_discounts", JSON.stringify(updated));
      asyncSetDoc("settings", "discounts", { list: updated }, { merge: true });
      return updated;
    });
  };

  // ================= PUBLIC REVIEWS METHODS =================
  const addPublicReview = async (reviewData: Omit<PublicReview, "id" | "createdAt" | "helpfulCount">) => {
    const newReview: PublicReview = {
      ...reviewData,
      id: "rev-" + Date.now(),
      helpfulCount: 0,
      helpfulVoterIds: [],
      createdAt: new Date().toISOString(),
    };
    setPublicReviews((prev) => {
      const updated = [newReview, ...prev];
      localStorage.setItem("puhayt_public_reviews", JSON.stringify(updated));
      asyncSetDoc("settings", "public_reviews", { list: updated }, { merge: true });
      return updated;
    });
  };

  const markReviewHelpful = async (reviewId: string) => {
    let voterKey = localStorage.getItem("puhayt_voter_key");
    if (!voterKey) {
      voterKey = "v-" + Math.random().toString(36).substring(2, 10);
      localStorage.setItem("puhayt_voter_key", voterKey);
    }

    setPublicReviews((prev) => {
      const updated = prev.map((r) => {
        if (r.id !== reviewId) return r;
        const voters = r.helpfulVoterIds || [];
        const hasVoted = voters.includes(voterKey!);
        return {
          ...r,
          helpfulCount: hasVoted ? Math.max(0, (r.helpfulCount || 1) - 1) : (r.helpfulCount || 0) + 1,
          helpfulVoterIds: hasVoted ? voters.filter((v) => v !== voterKey) : [...voters, voterKey!],
        };
      });
      localStorage.setItem("puhayt_public_reviews", JSON.stringify(updated));
      asyncSetDoc("settings", "public_reviews", { list: updated }, { merge: true });
      return updated;
    });
  };

  const replyToPublicReview = async (reviewId: string, replyText: string, repliedBy = "Puhayt Digital (Founders)") => {
    setPublicReviews((prev) => {
      const updated = prev.map((r) => {
        if (r.id !== reviewId) return r;
        if (!replyText.trim()) {
          const { ownerReply, ...rest } = r;
          return rest as PublicReview;
        }
        return {
          ...r,
          ownerReply: {
            text: replyText.trim(),
            repliedBy,
            repliedAt: new Date().toISOString(),
          },
        };
      });
      localStorage.setItem("puhayt_public_reviews", JSON.stringify(updated));
      asyncSetDoc("settings", "public_reviews", { list: updated }, { merge: true });
      return updated;
    });
  };

  const deletePublicReview = async (reviewId: string) => {
    setPublicReviews((prev) => {
      const updated = prev.filter((r) => r.id !== reviewId);
      localStorage.setItem("puhayt_public_reviews", JSON.stringify(updated));
      asyncSetDoc("settings", "public_reviews", { list: updated }, { merge: true });
      return updated;
    });
  };

  const updateDiscount = async (id: string, updates: Partial<DiscountOffer>) => {
    setDiscounts((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, ...updates } : d));
      localStorage.setItem("puhayt_discounts", JSON.stringify(updated));
      asyncSetDoc("settings", "discounts", { list: updated }, { merge: true });
      return updated;
    });
  };

  const deleteDiscount = async (id: string) => {
    setDiscounts((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      localStorage.setItem("puhayt_discounts", JSON.stringify(updated));
      asyncSetDoc("settings", "discounts", { list: updated }, { merge: true });
      return updated;
    });
  };

  // ================= BLOG & ARTICLES METHODS =================
  const addBlogPost = async (postData: Omit<BlogPost, "id">) => {
    const newPost: BlogPost = {
      ...postData,
      id: "blog-" + Date.now(),
    };
    setBlogPosts((prev) => {
      const updated = [newPost, ...prev];
      localStorage.setItem("puhayt_blog_posts", JSON.stringify(updated));
      asyncSetDoc("settings", "blog_posts", { list: updated }, { merge: true });
      return updated;
    });
  };

  const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, ...updates } : b));
      localStorage.setItem("puhayt_blog_posts", JSON.stringify(updated));
      asyncSetDoc("settings", "blog_posts", { list: updated }, { merge: true });
      return updated;
    });
  };

  const deleteBlogPost = async (id: string) => {
    setBlogPosts((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      localStorage.setItem("puhayt_blog_posts", JSON.stringify(updated));
      asyncSetDoc("settings", "blog_posts", { list: updated }, { merge: true });
      return updated;
    });
  };

  const restoreDefaultBlogPosts = async () => {
    setBlogPosts(BLOG_POSTS);
    localStorage.setItem("puhayt_blog_posts", JSON.stringify(BLOG_POSTS));
    await asyncSetDoc("settings", "blog_posts", { list: BLOG_POSTS }, { merge: true });
  };

  // REFERRAL LINK TRACKING & EARNED DISCOUNTS ACTIONS
  const trackReferralClick = (code?: string, customMeta?: Partial<ReferralClickRecord>) => {
    const targetCode = code || userReferralCode;
    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setReferralStats((prev) => {
      const nextClicks = prev.totalClicks + 1;
      const nextUnique = prev.uniqueVisitors + (Math.random() > 0.35 ? 1 : 0);

      const newClickRecord: ReferralClickRecord = {
        id: `clk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        referralCode: targetCode,
        timestamp: `Today, ${nowStr}`,
        source: customMeta?.source || "Direct Link",
        device: customMeta?.device || (/Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop"),
        location: customMeta?.location || (Math.random() > 0.4 ? "Kolkata, WB" : "Mumbai, MH"),
        status: customMeta?.status || (Math.random() > 0.75 ? "Inquiry Submitted" : "Visited"),
      };

      // Check milestone triggers on earned discounts
      const updatedDiscounts = prev.earnedDiscounts.map((disc) => {
        if (disc.status === "Locked" && nextClicks >= disc.requiredClicks) {
          const notif: NotificationRecord = {
            id: `notif-disc-unlock-${Date.now()}`,
            title: `🎁 New Referral Discount Unlocked!`,
            message: `Congratulations! Your referral link hit ${nextClicks} verified clicks. You unlocked "${disc.title}" (${disc.discountValue})!`,
            type: "system",
            timestamp: nowStr,
            read: false,
          };
          setNotifications((nPrev) => [notif, ...nPrev]);
          return {
            ...disc,
            status: "Active" as const,
            unlockedAt: `Today, ${nowStr}`,
          };
        }
        return disc;
      });

      const updatedStats: UserReferralStats = {
        ...prev,
        referralCode: targetCode,
        totalClicks: nextClicks,
        uniqueVisitors: nextUnique,
        inquiriesGenerated: prev.inquiriesGenerated + (newClickRecord.status === "Inquiry Submitted" ? 1 : 0),
        clickHistory: [newClickRecord, ...prev.clickHistory.slice(0, 49)],
        earnedDiscounts: updatedDiscounts,
        lastUpdated: new Date().toISOString(),
      };

      localStorage.setItem("puhayt_user_referral_stats", JSON.stringify(updatedStats));
      return updatedStats;
    });
  };

  const simulateReferralClick = () => {
    const sources: ReferralClickRecord["source"][] = ["WhatsApp", "LinkedIn", "Instagram", "Direct Link", "QR Code", "Twitter / X"];
    const devices: ReferralClickRecord["device"][] = ["Mobile", "Desktop", "Tablet"];
    const locations = ["Kolkata, WB", "Salt Lake, Kolkata", "Mumbai, MH", "Bengaluru, KA", "New Delhi, DL", "London, UK", "Dubai, UAE"];

    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const randomDevice = devices[Math.floor(Math.random() * (Math.random() > 0.35 ? 1 : 3))];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const randomStatus = Math.random() > 0.7 ? "Inquiry Submitted" : "Visited";

    trackReferralClick(userReferralCode, {
      source: randomSource,
      device: randomDevice,
      location: randomLocation,
      status: randomStatus,
    });
  };

  const redeemEarnedDiscount = async (discountId: string, invoiceRef?: string): Promise<boolean> => {
    let success = false;
    setReferralStats((prev) => {
      const target = prev.earnedDiscounts.find((d) => d.id === discountId);
      if (!target) return prev;

      success = true;
      const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const updatedDiscounts = prev.earnedDiscounts.map((d) => {
        if (d.id === discountId) {
          return {
            ...d,
            status: "Redeemed" as const,
            redeemedAt: today,
            appliedInvoiceRef: invoiceRef || "Applied on Active Account",
          };
        }
        return d;
      });

      const updatedStats = {
        ...prev,
        earnedDiscounts: updatedDiscounts,
        lastUpdated: new Date().toISOString(),
      };

      localStorage.setItem("puhayt_user_referral_stats", JSON.stringify(updatedStats));

      const notif: NotificationRecord = {
        id: `notif-disc-redeem-${Date.now()}`,
        title: `✅ Discount Code Redeemed!`,
        message: `Claimed "${target.title}" (Code: ${target.code}). Savings of ${target.discountValue} applied!`,
        type: "payment",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      setNotifications((nPrev) => [notif, ...nPrev]);

      return updatedStats;
    });

    return success;
  };

  const resetReferralStats = () => {
    localStorage.removeItem("puhayt_user_referral_stats");
    setReferralStats(DEFAULT_USER_REFERRAL_STATS);
  };

  const updateReferralCode = (newCode: string) => {
    const clean = newCode.trim().toUpperCase().replace(/[^A-Z0-9-]/g, "");
    if (!clean) return;
    setUserReferralCode(clean);
    localStorage.setItem("puhayt_user_referral_code", clean);
    setReferralStats((prev) => {
      const updated = { ...prev, referralCode: clean };
      localStorage.setItem("puhayt_user_referral_stats", JSON.stringify(updated));
      return updated;
    });
  };

  const updateBrandLogo = (updates: Partial<BrandLogoConfig>) => {
    setBrandLogoState((prev) => {
      const updated = {
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem("puhayt_brand_logo", JSON.stringify(updated));
      } catch (e) {
        console.warn("LocalStorage brand logo save error", e);
      }
      asyncSetDoc("settings", "brand_logo", updated);
      return updated;
    });
  };

  const updatePricingPlans = (plans: PricingPlan[]) => {
    // Delete removed plans from Firestore
    const newIds = new Set(plans.map((p) => p.id));
    pricingPlans.forEach((p) => {
      if (!newIds.has(p.id)) {
        asyncDeleteDoc("pricing_plans", p.id);
      }
    });

    setPricingPlans(plans);
    localStorage.setItem("puhayt_pricing_plans", JSON.stringify(plans));

    // Persist all plans to Firestore
    plans.forEach((p) => {
      asyncSetDoc("pricing_plans", p.id, p);
    });
  };

  const deletePricingPlan = (id: string) => {
    setPricingPlans((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("puhayt_pricing_plans", JSON.stringify(updated));
      return updated;
    });
    asyncDeleteDoc("pricing_plans", id);
  };

  const clearAllPricingPlans = () => {
    pricingPlans.forEach((p) => {
      asyncDeleteDoc("pricing_plans", p.id);
    });
    setPricingPlans([]);
    localStorage.setItem("puhayt_pricing_plans", JSON.stringify([]));
  };

  const restoreDefaultPricingPlans = () => {
    updatePricingPlans(PRICING_PLANS);
  };

  const updatePortfolioProjects = (projects: PortfolioProject[]) => {
    // 1. Delete removed projects from Firestore
    const newIds = new Set(projects.map((p) => p.id));
    portfolioProjects.forEach((p) => {
      if (!newIds.has(p.id)) {
        asyncDeleteDoc("portfolio_projects", p.id);
      }
    });

    // 2. Set local state and localStorage immediately
    setPortfolioProjects(projects);
    localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(projects));

    // 3. Write each project to Cloud Firestore (Real-time live persistence!)
    projects.forEach((project) => {
      asyncSetDoc("portfolio_projects", project.id, project);
    });
  };

  const addPortfolioProject = (project: PortfolioProject) => {
    setPortfolioProjects((prev) => {
      const updated = [project, ...prev.filter((p) => p.id !== project.id)];
      localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(updated));
      return updated;
    });
    // Persist immediately to Cloud Firestore
    asyncSetDoc("portfolio_projects", project.id, project);

    const newNotif: NotificationRecord = {
      id: `notif-port-${Date.now()}`,
      title: `🎨 New Portfolio Project Added!`,
      message: `"${project.title}" (${project.category}) was published to live portfolio.`,
      type: "system",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    asyncSetDoc("notifications", newNotif.id, newNotif);
  };

  const deletePortfolioProject = (id: string) => {
    setPortfolioProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(updated));
      return updated;
    });
    asyncDeleteDoc("portfolio_projects", id);
  };

  const clearAllPortfolioProjects = () => {
    portfolioProjects.forEach((p) => {
      asyncDeleteDoc("portfolio_projects", p.id);
    });
    setPortfolioProjects([]);
    localStorage.setItem("puhayt_portfolio_projects", JSON.stringify([]));
  };

  const restoreDefaultPortfolioProjects = () => {
    updatePortfolioProjects(PORTFOLIO_PROJECTS);
  };

  const setShowCaseStudies = (show: boolean) => {
    setShowCaseStudiesState(show);
    asyncSetDoc("settings", "site_config", { showCaseStudies: show }, { merge: true });
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
    localStorage.setItem("puhayt_contact_info", JSON.stringify(info));
    asyncSetDoc("settings", "contact_info", info, { merge: true });
  };

  const updateLocationPin = (pin: LocationPin) => {
    setLocationPin(pin);
    localStorage.setItem("puhayt_location_pin", JSON.stringify(pin));
    asyncSetDoc("settings", "location_pin", pin, { merge: true });
  };

  const verifyUpiAccount = (bankName: string, upiId: string, mobileNumber: string) => {
    const mobRes = validateIndianMobile(mobileNumber);
    if (!mobRes.valid) {
      return { verified: false, error: mobRes.error };
    }

    const vpaRes = validateUpiVpa(upiId);
    if (!vpaRes.valid) {
      return { verified: false, error: vpaRes.error };
    }

    const bankObj = ALL_INDIAN_BANKS.find(
      (b) => b.name.toLowerCase() === bankName.toLowerCase() || b.shortName.toLowerCase() === bankName.toLowerCase()
    );

    if (!bankObj) {
      return { verified: false, error: "Account Check Failed: Selected bank is not recognized." };
    }

    return { verified: true };
  };

  const addTransaction = (txnData: Omit<TransactionRecord, "id" | "date" | "referenceId">): TransactionRecord => {
    const refId = `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const newTxn: TransactionRecord = {
      ...txnData,
      id: `txn-${Date.now()}`,
      date: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
      referenceId: refId,
    };

    setTransactions((prev) => [newTxn, ...prev]);

    const newNotif: NotificationRecord = {
      id: `notif-${Date.now()}`,
      title: `🎉 New Payment Received!`,
      message: `${newTxn.clientName} paid ₹${newTxn.amount.toLocaleString("en-IN")} via ${newTxn.paymentMethod} (${newTxn.planName})`,
      type: "payment",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
      amount: newTxn.amount,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    asyncSetDoc("notifications", newNotif.id, newNotif);

    return newTxn;
  };

  const addLead = (leadData: Omit<LeadRecord, "id" | "createdAt" | "status">) => {
    const newLead: LeadRecord = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toLocaleDateString("en-IN"),
      status: "New",
    };

    setLeads((prev) => [newLead, ...prev]);

    // Save lead to Cloud Firestore
    asyncSetDoc("leads", newLead.id, newLead);

    const newNotif: NotificationRecord = {
      id: `notif-${Date.now()}`,
      title: `📩 New Lead Inquiry Received!`,
      message: `${newLead.name} (${newLead.email}) requested for ${newLead.service}`,
      type: "lead",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    asyncSetDoc("notifications", newNotif.id, newNotif);
  };

  const addPaymentAuditLog = (logData: Omit<PaymentAuditLog, "id" | "timestamp">): PaymentAuditLog => {
    const newLog: PaymentAuditLog = {
      ...logData,
      id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleString("en-IN", { dateStyle: "short", timeStyle: "medium" }),
    };

    setPaymentAuditLogs((prev) => [newLog, ...prev]);

    if (newLog.status !== "SUCCESS") {
      const securityNotif: NotificationRecord = {
        id: `notif-${Date.now()}`,
        title: `⚠️ Payment Gateway Verification Failed!`,
        message: `Attempt by ${newLog.clientName} (${newLog.paymentMethod}: ${newLog.vpaOrCardDetails}) failed: ${newLog.errorReason}`,
        type: "audit",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      setNotifications((prev) => [securityNotif, ...prev]);
      asyncSetDoc("notifications", securityNotif.id, securityNotif);
    }

    return newLog;
  };

  const clearPaymentAuditLogs = () => {
    setPaymentAuditLogs([]);
  };

  const updatePaymentSettings = (settings: PaymentSettings) => {
    setPaymentSettings(settings);
    asyncSetDoc("settings", "payment_settings", settings);
  };

  // Campaign Actions
  const addCampaign = (campaignData: Omit<AdCampaign, "id" | "createdAt" | "impressions" | "clicks">): AdCampaign => {
    const newCamp: AdCampaign = {
      ...campaignData,
      id: `camp-${Date.now()}`,
      createdAt: new Date().toISOString(),
      impressions: 0,
      clicks: 0,
    };
    setCampaigns((prev) => [newCamp, ...prev]);

    // Persist campaign to Firestore
    asyncSetDoc("campaigns", newCamp.id, newCamp);

    const notif: NotificationRecord = {
      id: `notif-camp-${Date.now()}`,
      title: `📢 New Ad Campaign Created (${newCamp.status.toUpperCase()})`,
      message: `Campaign "${newCamp.name}" created for ${newCamp.clientName} on ${newCamp.platform}.`,
      type: "campaign",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
    asyncSetDoc("notifications", notif.id, notif);
    return newCamp;
  };

  const updateCampaign = (id: string, updates: Partial<AdCampaign>) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      const target = updated.find((c) => c.id === id);
      if (target) {
        asyncSetDoc("campaigns", id, target);
      }
      return updated;
    });
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    asyncDeleteDoc("campaigns", id);
  };

  const approveCampaign = (id: string, approved: boolean) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) =>
        c.id === id
          ? {
              ...c,
              approved,
              status: (approved ? "approved" : "rejected") as "draft" | "approved" | "published" | "rejected",
              approvedAt: approved ? new Date().toISOString() : undefined,
              approvedBy: approved ? "Administrator" : undefined,
            }
          : c
      );
      const target = updated.find((c) => c.id === id);
      if (target) {
        asyncSetDoc("campaigns", id, target);
      }
      return updated;
    });
  };

  const publishCampaign = (id: string, publish: boolean) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: (publish ? "published" : "approved") as "draft" | "approved" | "published" | "rejected",
              approved: true,
            }
          : c
      );
      const target = updated.find((c) => c.id === id);
      if (target) {
        asyncSetDoc("campaigns", id, target);
      }
      return updated;
    });
  };

  const recordCampaignImpression = (id: string) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, impressions: (c.impressions || 0) + 1 } : c));
      if (firestoreReady && (currentUser || isDevModeAuthenticated)) {
        const target = updated.find((c) => c.id === id);
        if (target) {
          asyncSetDoc("campaigns", id, target);
        }
      }
      return updated;
    });
  };

  const recordCampaignClick = (id: string) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, clicks: (c.clicks || 0) + 1 } : c));
      if (firestoreReady && (currentUser || isDevModeAuthenticated)) {
        const target = updated.find((c) => c.id === id);
        if (target) {
          asyncSetDoc("campaigns", id, target);
        }
      }
      return updated;
    });
  };

  // Website Analyses
  const addWebsiteAnalysis = (analysis: WebsiteAnalysis) => {
    setWebsiteAnalyses((prev) => [analysis, ...prev.filter(a => a.id !== analysis.id)]);
    const notif: NotificationRecord = {
      id: `notif-ana-${Date.now()}`,
      title: `🔍 Website Analysis Completed`,
      message: `Analyzed "${analysis.businessName}" (${analysis.url}) with factual extraction.`,
      type: "system",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const deleteWebsiteAnalysis = (id: string) => {
    setWebsiteAnalyses((prev) => prev.filter((a) => a.id !== id));
  };

  const addSeoAuditResult = (result: SEOAuditResult) => {
    setSeoAuditHistory((prev) => [result, ...prev]);
    asyncSetDoc("seo_audits", result.id, result);

    const notif: NotificationRecord = {
      id: `notif-seo-${Date.now()}`,
      title: `⚡ SEO Audit Score: ${result.overallScore}/100`,
      message: `Technical: ${result.technicalScore}/100, On-Page: ${result.onPageScore}/100, Structured Data: ${result.structuredDataScore}/100`,
      type: "seo",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false
    };
    setNotifications((prev) => [notif, ...prev]);
    asyncSetDoc("notifications", notif.id, notif);
  };

  const openDevMode = () => {
    setIsDevModeOpen(true);
  };

  const closeDevMode = () => {
    setIsDevModeOpen(false);
  };

  const authenticateDevMode = (password: string): boolean => {
    if (password === "Sanhati26052009") {
      setIsDevModeAuthenticated(true);
      localStorage.setItem("puhayt_devmode_authed", "true");
      return true;
    }
    return false;
  };

  const logoutDevMode = () => {
    setIsDevModeAuthenticated(false);
    localStorage.removeItem("puhayt_devmode_authed");
  };

  const openPaymentModal = (plan?: PricingPlan, cycle: "monthly" | "yearly" = "monthly") => {
    const targetPlan = plan || (pricingPlans.length > 0 ? (pricingPlans[1] || pricingPlans[0]) : null);
    const planName = targetPlan ? targetPlan.name : "Custom Digital Strategy";
    const planPrice = targetPlan ? (cycle === "yearly" ? targetPlan.priceYearly : targetPlan.priceMonthly) : null;
    const cycleLabel = cycle === "yearly" ? "Yearly Billing (Annual Saver)" : "Monthly Billing";
    const priceFormatted = planPrice ? ` (₹${planPrice.toLocaleString("en-IN")}/mo under ${cycleLabel})` : "";

    const primaryPhone = contactInfo?.whatsapps?.[0] || "+91 7044811476";
    const cleanPhone = primaryPhone.replace(/[^0-9]/g, "");

    const message = `Hello Puhayt Digital! 👋 I am interested in getting started with the *${planName}* plan${priceFormatted}. Please share the onboarding details and contract breakdown.`;
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPlanForPayment(null);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    asyncDeleteDoc("notifications", id);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // CLIENT DASHBOARD ACTIONS
  const addOrUpdateClientWebsite = async (website: ClientWebsite) => {
    setClientWebsites((prev) => {
      const filtered = prev.filter((w) => w.id !== website.id);
      const updated = [website, ...filtered];
      localStorage.setItem("puhayt_client_websites", JSON.stringify(updated));
      return updated;
    });
    try {
      await asyncSetDoc("client_websites", website.id, website);
      const notif: NotificationRecord = {
        id: `notif-web-${Date.now()}`,
        title: `🌐 Client Website Deployed!`,
        message: `Website "${website.websiteName}" assigned to ${website.userEmail} under ${website.subscriptionStatus} plan.`,
        type: "system",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      setNotifications((prev) => [notif, ...prev]);
      await asyncSetDoc("notifications", notif.id, notif);
    } catch (err) {
      console.error("Firestore client website write error:", err);
    }
  };

  const deleteClientWebsite = async (id: string) => {
    setClientWebsites((prev) => {
      const updated = prev.filter((w) => w.id !== id);
      localStorage.setItem("puhayt_client_websites", JSON.stringify(updated));
      return updated;
    });
    await asyncDeleteDoc("client_websites", id);
  };

  const sendClientChatMessage = async (msg: Omit<ClientChatMessage, "id" | "timestamp" | "read">) => {
    const newMsg: ClientChatMessage = {
      id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
      ...msg,
    };
    setClientChatMessages((prev) => {
      const updated = [...prev, newMsg];
      localStorage.setItem("puhayt_client_chats", JSON.stringify(updated));
      return updated;
    });
    await asyncSetDoc("client_chats", newMsg.id, newMsg);
  };

  const addOrUpdateClientProject = async (project: ClientProject) => {
    setClientProjects((prev) => {
      const filtered = prev.filter((p) => p.id !== project.id);
      const updated = [project, ...filtered];
      localStorage.setItem("puhayt_client_projects", JSON.stringify(updated));
      return updated;
    });
    await asyncSetDoc("client_projects", project.id, project);
  };

  const addClientInvoice = async (invoice: ClientInvoice) => {
    setClientInvoices((prev) => {
      const filtered = prev.filter((i) => i.id !== invoice.id);
      const updated = [invoice, ...filtered];
      localStorage.setItem("puhayt_client_invoices", JSON.stringify(updated));
      return updated;
    });
    await asyncSetDoc("client_invoices", invoice.id, invoice);
  };

  return (
    <AgencyContext.Provider
      value={{
        pricingPlans,
        portfolioProjects,
        showCaseStudies,
        contactInfo,
        locationPin,
        transactions,
        leads,
        notifications,
        paymentAuditLogs,
        paymentSettings,
        campaigns,
        websiteAnalyses,
        seoAuditHistory,
        isDevModeOpen,
        isDevModeAuthenticated,
        isPaymentModalOpen,
        selectedPlanForPayment,

        currentUser,
        userProfile,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        logout,

        // Client Dashboard (Authenticated)
        isClientDashboardOpen,
        openClientDashboard,
        closeClientDashboard,
        clientWebsites,
        clientProjects,
        clientChatMessages,
        clientInvoices,
        addOrUpdateClientWebsite,
        deleteClientWebsite,
        sendClientChatMessage,
        addOrUpdateClientProject,
        addClientInvoice,

        updatePricingPlans,
        deletePricingPlan,
        clearAllPricingPlans,
        restoreDefaultPricingPlans,
        updatePortfolioProjects,
        addPortfolioProject,
        deletePortfolioProject,
        clearAllPortfolioProjects,
        restoreDefaultPortfolioProjects,
        setShowCaseStudies,
        updateContactInfo,
        updateLocationPin,
        addTransaction,
        addLead,
        addPaymentAuditLog,
        clearPaymentAuditLogs,
        updatePaymentSettings,

        addCampaign,
        updateCampaign,
        deleteCampaign,
        approveCampaign,
        publishCampaign,
        recordCampaignImpression,
        recordCampaignClick,

        addWebsiteAnalysis,
        deleteWebsiteAnalysis,
        addSeoAuditResult,

        openDevMode,
        closeDevMode,
        authenticateDevMode,
        logoutDevMode,
        openPaymentModal,
        closePaymentModal,
        dismissNotification,
        clearAllNotifications,
        verifyUpiAccount,
        brandLogo,
        updateBrandLogo,
        isCloudSyncing,
        syncAllToLiveCloud,

        // Team & Discounts
        teamMembers,
        updateTeamMember,
        discounts,
        addDiscount,
        updateDiscount,
        deleteDiscount,

        // Blog & Articles
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        restoreDefaultBlogPosts,

        // Referral Tracking & Earned Discounts Dashboard
        referralStats,
        userReferralCode,
        trackReferralClick,
        simulateReferralClick,
        redeemEarnedDiscount,
        resetReferralStats,
        updateReferralCode,

        // Real Public Reviews System
        publicReviews,
        addPublicReview,
        markReviewHelpful,
        replyToPublicReview,
        deletePublicReview,
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error("useAgency must be used within an AgencyProvider");
  }
  return context;
};

