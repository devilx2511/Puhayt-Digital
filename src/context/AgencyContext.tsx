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
} from "../types";
import { PRICING_PLANS, PORTFOLIO_PROJECTS } from "../data/agencyData";
import { ALL_INDIAN_BANKS, ALL_UPI_APPS } from "../data/indianBanksAndUpi";
import { validateIndianMobile, validateUpiVpa } from "../utils/paymentValidation";
import { db, handleFirestoreError, OperationType, cleanFirestoreData } from "../lib/firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, getDoc, getDocs } from "firebase/firestore";
import { User } from "firebase/auth";
import { subscribeToAuth, logoutUser } from "../lib/firebaseAuth";

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
}

const DEFAULT_CONTACTS: ContactInfo = {
  emails: ["aayushcps0907@gmail.com", "contact@puhayt.digital"],
  whatsapps: ["+91 7044811476"],
  instagrams: ["@puhayt.digital", "@puhayt_agency"],
  phones: ["+91 7044811476"],
  address: "Salt Lake Sector V, Bidhannagar, Kolkata, West Bengal 700091, India",
};

const DEFAULT_LOCATION: LocationPin = {
  lat: 22.5804,
  lng: 88.4378,
  address: "Salt Lake Sector V, Bidhannagar, Kolkata, West Bengal 700091",
  mapTitle: "Puhayt Digital — Best Digital Marketing Agency in Kolkata",
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

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export const AgencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Brand Logo Config
  const [brandLogo, setBrandLogoState] = useState<BrandLogoConfig>(() => {
    const saved = localStorage.getItem("puhayt_brand_logo");
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
    const saved = localStorage.getItem("puhayt_pricing_plans");
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
    const saved = localStorage.getItem("puhayt_portfolio_projects");
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
    const saved = localStorage.getItem("puhayt_show_case_studies");
    return saved ? JSON.parse(saved) : false;
  });

  // Contact info
  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem("puhayt_contact_info");
    return saved ? JSON.parse(saved) : DEFAULT_CONTACTS;
  });

  // Location pin
  const [locationPin, setLocationPin] = useState<LocationPin>(() => {
    const saved = localStorage.getItem("puhayt_location_pin");
    return saved ? JSON.parse(saved) : DEFAULT_LOCATION;
  });

  // REAL TRANSACTIONS
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => {
    const saved = localStorage.getItem("puhayt_transactions");
    return saved ? JSON.parse(saved) : [];
  });

  // REAL LEADS
  const [leads, setLeads] = useState<LeadRecord[]>(() => {
    const saved = localStorage.getItem("puhayt_leads");
    return saved ? JSON.parse(saved) : [];
  });

  // NOTIFICATIONS
  const [notifications, setNotifications] = useState<NotificationRecord[]>(() => {
    const saved = localStorage.getItem("puhayt_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  // PAYMENT AUDIT LOGS
  const [paymentAuditLogs, setPaymentAuditLogs] = useState<PaymentAuditLog[]>(() => {
    const saved = localStorage.getItem("puhayt_payment_audit_logs");
    return saved ? JSON.parse(saved) : [];
  });

  // PAYMENT SETTINGS
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(() => {
    const saved = localStorage.getItem("puhayt_payment_settings");
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_SETTINGS;
  });

  // CAMPAIGNS STATE
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(() => {
    const saved = localStorage.getItem("puhayt_ad_campaigns");
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  // WEBSITE ANALYSES STATE
  const [websiteAnalyses, setWebsiteAnalyses] = useState<WebsiteAnalysis[]>(() => {
    const saved = localStorage.getItem("puhayt_website_analyses");
    return saved ? JSON.parse(saved) : [];
  });

  // SEO AUDIT HISTORY
  const [seoAuditHistory, setSeoAuditHistory] = useState<SEOAuditResult[]>(() => {
    const saved = localStorage.getItem("puhayt_seo_audit_history");
    return saved ? JSON.parse(saved) : [];
  });

  // DEV MODE STATE
  const [isDevModeOpen, setIsDevModeOpen] = useState(false);
  const [isDevModeAuthenticated, setIsDevModeAuthenticated] = useState(() => {
    return localStorage.getItem("puhayt_devmode_authed") === "true";
  });

  // FIREBASE AUTH STATE
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"google" | "email" | "phone" | "guest">("google");

  useEffect(() => {
    const unsub = subscribeToAuth((user, profile) => {
      setCurrentUser(user);
      setUserProfile(profile);
    });
    return () => unsub();
  }, []);

  const openAuthModal = (tab: "google" | "email" | "phone" | "guest" = "google") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    await logoutUser();
  };

  // PAYMENT MODAL STATE
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PricingPlan | null>(null);

  // CLIENT DASHBOARD STATE (Secure Authenticated Portal)
  const [isClientDashboardOpen, setIsClientDashboardOpen] = useState(false);
  const openClientDashboard = () => setIsClientDashboardOpen(true);
  const closeClientDashboard = () => setIsClientDashboardOpen(false);

  const [clientWebsites, setClientWebsites] = useState<ClientWebsite[]>(() => {
    const saved = localStorage.getItem("puhayt_client_websites");
    return saved ? JSON.parse(saved) : DEFAULT_CLIENT_WEBSITES;
  });

  const [clientProjects, setClientProjects] = useState<ClientProject[]>(() => {
    const saved = localStorage.getItem("puhayt_client_projects");
    return saved ? JSON.parse(saved) : [DEFAULT_CLIENT_PROJECT];
  });

  const [clientChatMessages, setClientChatMessages] = useState<ClientChatMessage[]>(() => {
    const saved = localStorage.getItem("puhayt_client_chats");
    return saved ? JSON.parse(saved) : DEFAULT_CHAT_MESSAGES;
  });

  const [clientInvoices, setClientInvoices] = useState<ClientInvoice[]>(() => {
    const saved = localStorage.getItem("puhayt_client_invoices");
    return saved ? JSON.parse(saved) : DEFAULT_CLIENT_INVOICES;
  });

  useEffect(() => {
    localStorage.setItem("puhayt_client_websites", JSON.stringify(clientWebsites));
  }, [clientWebsites]);

  useEffect(() => {
    localStorage.setItem("puhayt_client_projects", JSON.stringify(clientProjects));
  }, [clientProjects]);

  useEffect(() => {
    localStorage.setItem("puhayt_client_chats", JSON.stringify(clientChatMessages));
  }, [clientChatMessages]);

  useEffect(() => {
    localStorage.setItem("puhayt_client_invoices", JSON.stringify(clientInvoices));
  }, [clientInvoices]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem("puhayt_pricing_plans", JSON.stringify(pricingPlans));
  }, [pricingPlans]);

  useEffect(() => {
    localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(portfolioProjects));
  }, [portfolioProjects]);

  useEffect(() => {
    localStorage.setItem("puhayt_show_case_studies", JSON.stringify(showCaseStudies));
  }, [showCaseStudies]);

  useEffect(() => {
    localStorage.setItem("puhayt_contact_info", JSON.stringify(contactInfo));
  }, [contactInfo]);

  useEffect(() => {
    localStorage.setItem("puhayt_location_pin", JSON.stringify(locationPin));
  }, [locationPin]);

  useEffect(() => {
    localStorage.setItem("puhayt_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("puhayt_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("puhayt_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("puhayt_payment_audit_logs", JSON.stringify(paymentAuditLogs));
  }, [paymentAuditLogs]);

  useEffect(() => {
    localStorage.setItem("puhayt_payment_settings", JSON.stringify(paymentSettings));
  }, [paymentSettings]);

  useEffect(() => {
    localStorage.setItem("puhayt_ad_campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem("puhayt_website_analyses", JSON.stringify(websiteAnalyses));
  }, [websiteAnalyses]);

  useEffect(() => {
    localStorage.setItem("puhayt_seo_audit_history", JSON.stringify(seoAuditHistory));
  }, [seoAuditHistory]);

  // Cloud Syncing indicator state
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);

  // Master Sync to Cloud
  const syncAllToLiveCloud = async (): Promise<boolean> => {
    setIsCloudSyncing(true);
    try {
      // 1. Sync Portfolio Projects
      for (const p of portfolioProjects) {
        await setDoc(doc(db, "portfolio_projects", p.id), cleanFirestoreData(p));
      }

      // 2. Sync Pricing Plans
      for (const plan of pricingPlans) {
        await setDoc(doc(db, "pricing_plans", plan.id), cleanFirestoreData(plan));
      }

      // 3. Sync Settings
      await setDoc(doc(db, "settings", "contact_info"), cleanFirestoreData(contactInfo));
      await setDoc(doc(db, "settings", "location_pin"), cleanFirestoreData(locationPin));
      await setDoc(doc(db, "settings", "payment_settings"), cleanFirestoreData(paymentSettings));
      await setDoc(doc(db, "settings", "brand_logo"), cleanFirestoreData(brandLogo));
      await setDoc(doc(db, "settings", "site_config"), cleanFirestoreData({ showCaseStudies }));

      // 4. Sync Campaigns
      for (const c of campaigns) {
        await setDoc(doc(db, "campaigns", c.id), cleanFirestoreData(c));
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
      await setDoc(doc(db, "notifications", syncNotif.id), cleanFirestoreData(syncNotif));

      setIsCloudSyncing(false);
      return true;
    } catch (error) {
      console.error("Cloud master sync error:", error);
      setIsCloudSyncing(false);
      return false;
    }
  };

  // Firestore Real-Time Listeners
  useEffect(() => {
    // 1. Leads Listener
    let unsubLeads = () => {};
    try {
      unsubLeads = onSnapshot(
        collection(db, "leads"),
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedLeads = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as LeadRecord));
            setLeads(fetchedLeads);
          }
        },
        (error) => {
          console.warn("Firestore leads sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore leads sync initialized", e);
    }

    // 2. Notifications Listener
    let unsubNotifs = () => {};
    try {
      unsubNotifs = onSnapshot(
        collection(db, "notifications"),
        (snapshot) => {
          if (!snapshot.empty) {
            const fetched = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as NotificationRecord));
            setNotifications(fetched);
          }
        },
        (error) => {
          console.warn("Firestore notifs sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore notifs sync initialized", e);
    }

    // One-time initial seeding for brand new Firestore database setup (runs once only)
    const initializeDatabaseOnce = async () => {
      try {
        const metaDocRef = doc(db, "system_metadata", "init_status");
        const metaSnap = await getDoc(metaDocRef);
        if (!metaSnap.exists()) {
          // Record initialization flag immediately so it never triggers again
          await setDoc(metaDocRef, { initialized: true, timestamp: Date.now() });

          // Seed default pricing plans only if collection is empty
          const pricingSnap = await getDocs(collection(db, "pricing_plans"));
          if (pricingSnap.empty) {
            for (const p of PRICING_PLANS) {
              await setDoc(doc(db, "pricing_plans", p.id), cleanFirestoreData(p)).catch(() => {});
            }
          }

          // Seed default portfolio projects only if collection is empty
          const portSnap = await getDocs(collection(db, "portfolio_projects"));
          if (portSnap.empty) {
            for (const p of PORTFOLIO_PROJECTS) {
              await setDoc(doc(db, "portfolio_projects", p.id), cleanFirestoreData(p)).catch(() => {});
            }
          }

          // Seed default campaigns only if collection is empty
          const campSnap = await getDocs(collection(db, "campaigns"));
          if (campSnap.empty) {
            for (const c of INITIAL_CAMPAIGNS) {
              await setDoc(doc(db, "campaigns", c.id), cleanFirestoreData(c)).catch(() => {});
            }
          }
        }
      } catch (err) {
        console.warn("One-time seed check note:", err);
      }
    };
    initializeDatabaseOnce();

    // 3. Pricing Plans Listener (Real-Time Live Sync)
    let unsubPricing = () => {};
    try {
      unsubPricing = onSnapshot(
        collection(db, "pricing_plans"),
        (snapshot) => {
          if (!snapshot.empty) {
            const plans = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as PricingPlan));
            setPricingPlans(plans);
            localStorage.setItem("puhayt_pricing_plans", JSON.stringify(plans));
          } else {
            // Seed Firestore with default plans so collection is created and permanently stored in Cloud
            for (const p of PRICING_PLANS) {
              setDoc(doc(db, "pricing_plans", p.id), cleanFirestoreData(p)).catch(() => {});
            }
          }
        },
        (error) => {
          console.warn("Firestore pricing sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore pricing sync initialized", e);
    }

    // 4. Portfolio Projects Listener (Real-Time Live Sync)
    let unsubPortfolio = () => {};
    try {
      unsubPortfolio = onSnapshot(
        collection(db, "portfolio_projects"),
        (snapshot) => {
          if (!snapshot.empty) {
            const projects = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as PortfolioProject));
            setPortfolioProjects(projects);
            localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(projects));
          } else {
            // Seed Firestore with default projects so collection is created and permanently stored in Cloud
            for (const p of PORTFOLIO_PROJECTS) {
              setDoc(doc(db, "portfolio_projects", p.id), cleanFirestoreData(p)).catch(() => {});
            }
          }
        },
        (error) => {
          console.warn("Firestore portfolio sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore portfolio sync initialized", e);
    }

    // 5. Campaigns Listener
    let unsubCampaigns = () => {};
    try {
      unsubCampaigns = onSnapshot(
        collection(db, "campaigns"),
        (snapshot) => {
          if (!snapshot.empty) {
            const camps = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as AdCampaign));
            setCampaigns(camps);
            localStorage.setItem("puhayt_ad_campaigns", JSON.stringify(camps));
          } else {
            for (const c of INITIAL_CAMPAIGNS) {
              setDoc(doc(db, "campaigns", c.id), cleanFirestoreData(c)).catch(() => {});
            }
          }
        },
        (error) => {
          console.warn("Firestore campaigns sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore campaigns sync initialized", e);
    }

    // 6. SEO Audits Listener
    let unsubSeo = () => {};
    try {
      unsubSeo = onSnapshot(
        collection(db, "seo_audits"),
        (snapshot) => {
          if (!snapshot.empty) {
            const audits = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as SEOAuditResult));
            setSeoAuditHistory(audits);
          }
        },
        (error) => {
          console.warn("Firestore seo sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore seo sync initialized", e);
    }

    // 7. Brand & Logo Settings Listener (Real-Time Live Sync)
    let unsubBrandLogo = () => {};
    try {
      unsubBrandLogo = onSnapshot(
        doc(db, "settings", "brand_logo"),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as BrandLogoConfig;
            setBrandLogoState((prev) => ({ ...prev, ...data }));
            localStorage.setItem("puhayt_brand_logo", JSON.stringify(data));
          }
        },
        (error) => {
          console.warn("Firestore brand logo sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore brand logo sync initialized", e);
    }

    // 8. Contact Info & Socials Listener (Real-Time Live Sync)
    let unsubContactInfo = () => {};
    try {
      unsubContactInfo = onSnapshot(
        doc(db, "settings", "contact_info"),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as ContactInfo;
            setContactInfo(data);
            localStorage.setItem("puhayt_contact_info", JSON.stringify(data));
          }
        },
        (error) => {
          console.warn("Firestore contact info sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore contact info sync initialized", e);
    }

    // 9. Location Pin Listener (Real-Time Live Sync)
    let unsubLocation = () => {};
    try {
      unsubLocation = onSnapshot(
        doc(db, "settings", "location_pin"),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as LocationPin;
            setLocationPin(data);
            localStorage.setItem("puhayt_location_pin", JSON.stringify(data));
          }
        },
        (error) => {
          console.warn("Firestore location sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore location sync initialized", e);
    }

    // 10. Payment Settings Listener
    let unsubPaymentSettings = () => {};
    try {
      unsubPaymentSettings = onSnapshot(
        doc(db, "settings", "payment_settings"),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as PaymentSettings;
            setPaymentSettings(data);
          }
        },
        (error) => {
          console.warn("Firestore payment settings sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore payment settings sync initialized", e);
    }

    // 11. Site Config Listener (Show case studies, features)
    let unsubSiteConfig = () => {};
    try {
      unsubSiteConfig = onSnapshot(
        doc(db, "settings", "site_config"),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (typeof data?.showCaseStudies === "boolean") {
              setShowCaseStudiesState(data.showCaseStudies);
            }
          }
        },
        (error) => {
          console.warn("Firestore site config sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore site config sync initialized", e);
    }

    // 12. Client Websites Listener (Live Firestore sync for assigned websites)
    let unsubClientWebsites = () => {};
    try {
      unsubClientWebsites = onSnapshot(
        collection(db, "client_websites"),
        (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ClientWebsite));
            setClientWebsites(list);
            localStorage.setItem("puhayt_client_websites", JSON.stringify(list));
          }
        },
        (error) => {
          console.warn("Firestore client websites sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore client websites sync init:", e);
    }

    // 13. Client Projects Listener (Live project progress & milestones)
    let unsubClientProjects = () => {};
    try {
      unsubClientProjects = onSnapshot(
        collection(db, "client_projects"),
        (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ClientProject));
            setClientProjects(list);
            localStorage.setItem("puhayt_client_projects", JSON.stringify(list));
          }
        },
        (error) => {
          console.warn("Firestore client projects sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore client projects sync init:", e);
    }

    // 14. Client Direct Chat Listener
    let unsubClientChats = () => {};
    try {
      unsubClientChats = onSnapshot(
        collection(db, "client_chats"),
        (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ClientChatMessage));
            setClientChatMessages(list);
            localStorage.setItem("puhayt_client_chats", JSON.stringify(list));
          }
        },
        (error) => {
          console.warn("Firestore client chats sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore client chats sync init:", e);
    }

    // 15. Client Invoices Listener
    let unsubClientInvoices = () => {};
    try {
      unsubClientInvoices = onSnapshot(
        collection(db, "client_invoices"),
        (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as ClientInvoice));
            setClientInvoices(list);
            localStorage.setItem("puhayt_client_invoices", JSON.stringify(list));
          }
        },
        (error) => {
          console.warn("Firestore client invoices sync warning:", error);
        }
      );
    } catch (e) {
      console.warn("Firestore client invoices sync init:", e);
    }

    return () => {
      unsubLeads();
      unsubNotifs();
      unsubPricing();
      unsubPortfolio();
      unsubCampaigns();
      unsubSeo();
      unsubBrandLogo();
      unsubContactInfo();
      unsubLocation();
      unsubPaymentSettings();
      unsubSiteConfig();
      unsubClientWebsites();
      unsubClientProjects();
      unsubClientChats();
      unsubClientInvoices();
    };
  }, []);

  // Actions
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
      setDoc(doc(db, "settings", "brand_logo"), cleanFirestoreData(updated)).catch((err) =>
        console.error("Firestore brand logo write error:", err)
      );
      return updated;
    });
  };

  const updatePricingPlans = (plans: PricingPlan[]) => {
    // Delete removed plans from Firestore
    const newIds = new Set(plans.map((p) => p.id));
    pricingPlans.forEach((p) => {
      if (!newIds.has(p.id)) {
        deleteDoc(doc(db, "pricing_plans", p.id)).catch(() => {});
      }
    });

    setPricingPlans(plans);
    localStorage.setItem("puhayt_pricing_plans", JSON.stringify(plans));

    // Persist all plans to Firestore
    plans.forEach((p) => {
      setDoc(doc(db, "pricing_plans", p.id), cleanFirestoreData(p)).catch((err) =>
        console.error("Firestore pricing plan write error:", err)
      );
    });
  };

  const deletePricingPlan = (id: string) => {
    setPricingPlans((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("puhayt_pricing_plans", JSON.stringify(updated));
      return updated;
    });
    deleteDoc(doc(db, "pricing_plans", id)).catch((err) =>
      console.error(`Firestore pricing plan delete error for ${id}:`, err)
    );
  };

  const clearAllPricingPlans = () => {
    pricingPlans.forEach((p) => {
      deleteDoc(doc(db, "pricing_plans", p.id)).catch(() => {});
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
        deleteDoc(doc(db, "portfolio_projects", p.id)).catch((err) =>
          console.warn("Firestore project delete error:", err)
        );
      }
    });

    // 2. Set local state and localStorage immediately
    setPortfolioProjects(projects);
    localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(projects));

    // 3. Write each project to Cloud Firestore (Real-time live persistence!)
    projects.forEach((project) => {
      setDoc(doc(db, "portfolio_projects", project.id), cleanFirestoreData(project)).catch((err) =>
        console.error(`Firestore project write error for ${project.id}:`, err)
      );
    });
  };

  const addPortfolioProject = (project: PortfolioProject) => {
    setPortfolioProjects((prev) => {
      const updated = [project, ...prev.filter((p) => p.id !== project.id)];
      localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(updated));
      return updated;
    });
    // Persist immediately to Cloud Firestore
    setDoc(doc(db, "portfolio_projects", project.id), cleanFirestoreData(project)).catch((err) =>
      console.error(`Firestore project add error:`, err)
    );

    const newNotif: NotificationRecord = {
      id: `notif-port-${Date.now()}`,
      title: `🎨 New Portfolio Project Added!`,
      message: `"${project.title}" (${project.category}) was published to live portfolio.`,
      type: "system",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setDoc(doc(db, "notifications", newNotif.id), cleanFirestoreData(newNotif)).catch(() => {});
  };

  const deletePortfolioProject = (id: string) => {
    setPortfolioProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("puhayt_portfolio_projects", JSON.stringify(updated));
      return updated;
    });
    deleteDoc(doc(db, "portfolio_projects", id)).catch((err) =>
      console.error(`Firestore project delete error for ${id}:`, err)
    );
  };

  const clearAllPortfolioProjects = () => {
    portfolioProjects.forEach((p) => {
      deleteDoc(doc(db, "portfolio_projects", p.id)).catch(() => {});
    });
    setPortfolioProjects([]);
    localStorage.setItem("puhayt_portfolio_projects", JSON.stringify([]));
  };

  const restoreDefaultPortfolioProjects = () => {
    updatePortfolioProjects(PORTFOLIO_PROJECTS);
  };

  const setShowCaseStudies = (show: boolean) => {
    setShowCaseStudiesState(show);
    setDoc(doc(db, "settings", "site_config"), cleanFirestoreData({ showCaseStudies: show }), { merge: true }).catch(() => {});
  };

  const updateContactInfo = (info: ContactInfo) => {
    setContactInfo(info);
    localStorage.setItem("puhayt_contact_info", JSON.stringify(info));
    setDoc(doc(db, "settings", "contact_info"), cleanFirestoreData(info), { merge: true }).catch((err) => {
      console.error("Firestore contact info save error:", err);
    });
  };

  const updateLocationPin = (pin: LocationPin) => {
    setLocationPin(pin);
    localStorage.setItem("puhayt_location_pin", JSON.stringify(pin));
    setDoc(doc(db, "settings", "location_pin"), cleanFirestoreData(pin), { merge: true }).catch((err) => {
      console.error("Firestore location pin save error:", err);
    });
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
    setDoc(doc(db, "notifications", newNotif.id), cleanFirestoreData(newNotif)).catch(() => {});

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
    setDoc(doc(db, "leads", newLead.id), cleanFirestoreData(newLead)).catch((err) =>
      console.error("Firestore lead save error:", err)
    );

    const newNotif: NotificationRecord = {
      id: `notif-${Date.now()}`,
      title: `📩 New Lead Inquiry Received!`,
      message: `${newLead.name} (${newLead.email}) requested for ${newLead.service}`,
      type: "lead",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setDoc(doc(db, "notifications", newNotif.id), cleanFirestoreData(newNotif)).catch(() => {});
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
      setDoc(doc(db, "notifications", securityNotif.id), cleanFirestoreData(securityNotif)).catch(() => {});
    }

    return newLog;
  };

  const clearPaymentAuditLogs = () => {
    setPaymentAuditLogs([]);
  };

  const updatePaymentSettings = (settings: PaymentSettings) => {
    setPaymentSettings(settings);
    setDoc(doc(db, "settings", "payment_settings"), cleanFirestoreData(settings)).catch(() => {});
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
    setDoc(doc(db, "campaigns", newCamp.id), cleanFirestoreData(newCamp)).catch((err) =>
      console.error("Firestore campaign save error:", err)
    );

    const notif: NotificationRecord = {
      id: `notif-camp-${Date.now()}`,
      title: `📢 New Ad Campaign Created (${newCamp.status.toUpperCase()})`,
      message: `Campaign "${newCamp.name}" created for ${newCamp.clientName} on ${newCamp.platform}.`,
      type: "campaign",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
    setDoc(doc(db, "notifications", notif.id), cleanFirestoreData(notif)).catch(() => {});
    return newCamp;
  };

  const updateCampaign = (id: string, updates: Partial<AdCampaign>) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      const target = updated.find((c) => c.id === id);
      if (target) {
        setDoc(doc(db, "campaigns", id), cleanFirestoreData(target)).catch((err) =>
          console.error("Firestore campaign update error:", err)
        );
      }
      return updated;
    });
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    deleteDoc(doc(db, "campaigns", id)).catch((err) =>
      console.error("Firestore campaign delete error:", err)
    );
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
        setDoc(doc(db, "campaigns", id), cleanFirestoreData(target)).catch(() => {});
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
        setDoc(doc(db, "campaigns", id), cleanFirestoreData(target)).catch(() => {});
      }
      return updated;
    });
  };

  const recordCampaignImpression = (id: string) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, impressions: (c.impressions || 0) + 1 } : c));
      const target = updated.find((c) => c.id === id);
      if (target) {
        setDoc(doc(db, "campaigns", id), cleanFirestoreData(target)).catch(() => {});
      }
      return updated;
    });
  };

  const recordCampaignClick = (id: string) => {
    setCampaigns((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, clicks: (c.clicks || 0) + 1 } : c));
      const target = updated.find((c) => c.id === id);
      if (target) {
        setDoc(doc(db, "campaigns", id), cleanFirestoreData(target)).catch(() => {});
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
    setDoc(doc(db, "seo_audits", result.id), cleanFirestoreData(result)).catch((err) =>
      handleFirestoreError(err, OperationType.CREATE, `seo_audits/${result.id}`)
    );

    const notif: NotificationRecord = {
      id: `notif-seo-${Date.now()}`,
      title: `⚡ SEO Audit Score: ${result.overallScore}/100`,
      message: `Technical: ${result.technicalScore}/100, On-Page: ${result.onPageScore}/100, Structured Data: ${result.structuredDataScore}/100`,
      type: "seo",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: false
    };
    setNotifications((prev) => [notif, ...prev]);
    setDoc(doc(db, "notifications", notif.id), cleanFirestoreData(notif)).catch(() => {});
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
    deleteDoc(doc(db, "notifications", id)).catch(() => {});
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
      await setDoc(doc(db, "client_websites", website.id), cleanFirestoreData(website));
      const notif: NotificationRecord = {
        id: `notif-web-${Date.now()}`,
        title: `🌐 Client Website Deployed!`,
        message: `Website "${website.websiteName}" assigned to ${website.userEmail} under ${website.subscriptionStatus} plan.`,
        type: "system",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      };
      setNotifications((prev) => [notif, ...prev]);
      await setDoc(doc(db, "notifications", notif.id), cleanFirestoreData(notif)).catch(() => {});
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
    try {
      await deleteDoc(doc(db, "client_websites", id));
    } catch (err) {
      console.error("Firestore client website delete error:", err);
    }
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
    try {
      await setDoc(doc(db, "client_chats", newMsg.id), cleanFirestoreData(newMsg));
    } catch (err) {
      console.error("Firestore chat send error:", err);
    }
  };

  const addOrUpdateClientProject = async (project: ClientProject) => {
    setClientProjects((prev) => {
      const filtered = prev.filter((p) => p.id !== project.id);
      const updated = [project, ...filtered];
      localStorage.setItem("puhayt_client_projects", JSON.stringify(updated));
      return updated;
    });
    try {
      await setDoc(doc(db, "client_projects", project.id), cleanFirestoreData(project));
    } catch (err) {
      console.error("Firestore client project write error:", err);
    }
  };

  const addClientInvoice = async (invoice: ClientInvoice) => {
    setClientInvoices((prev) => {
      const filtered = prev.filter((i) => i.id !== invoice.id);
      const updated = [invoice, ...filtered];
      localStorage.setItem("puhayt_client_invoices", JSON.stringify(updated));
      return updated;
    });
    try {
      await setDoc(doc(db, "client_invoices", invoice.id), cleanFirestoreData(invoice));
    } catch (err) {
      console.error("Firestore client invoice write error:", err);
    }
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

