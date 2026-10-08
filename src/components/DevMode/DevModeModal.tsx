import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useAgency, UpiAccountConfig, CardAccountConfig } from "../../context/AgencyContext";
import { ALL_INDIAN_BANKS, ALL_UPI_APPS } from "../../data/indianBanksAndUpi";
import {
  validateIfscCode,
  validateBankAccountNumber,
  validateIndianMobile,
  validatePanNumber,
  validateAadhaarNumber,
  validateUpiVpa,
} from "../../utils/paymentValidation";
import { PricingPlan, PortfolioProject } from "../../types";
import { TeamProfilesManager } from "./TeamProfilesManager";
import { DiscountsOffersManager } from "./DiscountsOffersManager";
import { BlogArticlesManager } from "./BlogArticlesManager";
import { MarketingAdsManager } from "./MarketingAdsManager";
import { WebsiteAnalysisManager } from "./WebsiteAnalysisManager";
import { SeoAuditManager } from "./SeoAuditManager";
import { BrandLogoManager } from "./BrandLogoManager";
import { PortfolioManager } from "./PortfolioManager";
import { ClientWebsitesManager } from "./ClientWebsitesManager";
import { DevModeChatManager } from "./DevModeChatManager";
import { ProjectProgressManager } from "./ProjectProgressManager";
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  CreditCard,
  QrCode,
  MapPin,
  Building2,
  Mail,
  Phone,
  Instagram,
  Plus,
  Trash2,
  Edit2,
  Check,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ExternalLink,
  Layers,
  Search,
  Bell,
  RefreshCw,
  SearchCode,
  UserCheck,
  FileCheck,
  User,
  Megaphone,
  Globe,
  Zap,
  Palette,
  BookOpen,
} from "lucide-react";

export const DevModeModal: React.FC = () => {
  const {
    isDevModeOpen,
    closeDevMode,
    isDevModeAuthenticated,
    authenticateDevMode,
    logoutDevMode,
    pricingPlans,
    updatePricingPlans,
    deletePricingPlan,
    clearAllPricingPlans,
    restoreDefaultPricingPlans,
    portfolioProjects,
    updatePortfolioProjects,
    showCaseStudies,
    setShowCaseStudies,
    contactInfo,
    updateContactInfo,
    locationPin,
    updateLocationPin,
    transactions,
    leads,
    notifications,
    dismissNotification,
    clearAllNotifications,
    paymentSettings,
    updatePaymentSettings,
    verifyUpiAccount,
    paymentAuditLogs,
    clearPaymentAuditLogs,
    campaigns,
    isCloudSyncing,
    syncAllToLiveCloud,
    clientWebsites,
    clientChatMessages,
    teamMembers,
    discounts,
    blogPosts,
  } = useAgency();

  // Password Input state
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // DevMode Tabs
  const [activeTab, setActiveTab] = useState<
    "overview" | "team-profiles" | "discounts-offers" | "blog-articles" | "brand-logo" | "project-progress" | "client-websites" | "client-chats" | "client-portal" | "marketing-ads" | "website-analysis" | "seo-audit" | "pricing" | "portfolio" | "contacts" | "location" | "sections"
  >("overview");

  // Search filters inside settings
  const [bankSearch, setBankSearch] = useState("");
  const [upiAppSearch, setUpiAppSearch] = useState("");

  // New Plan State
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [newPlan, setNewPlan] = useState<Partial<PricingPlan>>({
    name: "",
    subtitle: "",
    priceMonthly: 5000,
    priceYearly: 4000,
    popular: false,
    features: ["Custom Web Engineering", "Dedicated SEO Setup", "24/7 Priority Support"],
    ctaText: "Select Plan",
  });
  const [planFeatureInput, setPlanFeatureInput] = useState("");

  // New Portfolio State
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  const [tagsInput, setTagsInput] = useState("E-Commerce, Responsive, UI/UX");
  const [impactMetric1, setImpactMetric1] = useState("30% Traffic Increase");
  const [impactMetric2, setImpactMetric2] = useState("50% Faster Load Times");
  const [newPortfolio, setNewPortfolio] = useState<Partial<PortfolioProject>>({
    title: "",
    client: "",
    industry: "E-Commerce",
    category: "Website",
    duration: "3 Weeks",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    description: "",
    challenge: "The client faced low mobile engagement and slow initial server response times affecting conversion rates.",
    solution: "Puhayt Digital designed a bespoke edge-rendered architecture with sub-second asset delivery and streamlined WhatsApp checkout.",
    technologies: ["React", "Tailwind CSS", "TypeScript"],
    results: [
      { label: "Leads Generated", value: "+250%", change: "Q1 Campaign" },
      { label: "Page Speed", value: "99/100", change: "Sub-second" },
    ],
  });

  // Contact inputs
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newWhatsapp, setNewWhatsapp] = useState("");
  const [newInstagram, setNewInstagram] = useState("");

  // Contact Inline Edit States
  const [editingEmailIndex, setEditingEmailIndex] = useState<number | null>(null);
  const [editingEmailValue, setEditingEmailValue] = useState("");

  const [editingPhoneIndex, setEditingPhoneIndex] = useState<number | null>(null);
  const [editingPhoneValue, setEditingPhoneValue] = useState("");

  const [editingWhatsappIndex, setEditingWhatsappIndex] = useState<number | null>(null);
  const [editingWhatsappValue, setEditingWhatsappValue] = useState("");

  const [editingInstagramIndex, setEditingInstagramIndex] = useState<number | null>(null);
  const [editingInstagramValue, setEditingInstagramValue] = useState("");

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddressValue, setEditingAddressValue] = useState(contactInfo.address || "");
  const [contactSuccessMsg, setContactSuccessMsg] = useState("");

  // New UPI Account State
  const [isAddingUpi, setIsAddingUpi] = useState(false);
  const [newUpiBank, setNewUpiBank] = useState(ALL_INDIAN_BANKS[0].name);
  const [newUpiApp, setNewUpiApp] = useState(ALL_UPI_APPS[0].name);
  const [newUpiId, setNewUpiId] = useState("");
  const [newUpiMobile, setNewUpiMobile] = useState("");
  const [upiErrorMsg, setUpiErrorMsg] = useState("");

  // New Card/Bank Settlement State
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardBank, setNewCardBank] = useState(ALL_INDIAN_BANKS[0].name);
  const [newCardAccNum, setNewCardAccNum] = useState("");
  const [newCardIfsc, setNewCardIfsc] = useState("");
  const [newCardMobile, setNewCardMobile] = useState("");
  const [newCardHolder, setNewCardHolder] = useState("");
  const [newKycType, setNewKycType] = useState<"Aadhaar" | "PAN" | "Both">("Both");
  const [newAadhaar, setNewAadhaar] = useState("");
  const [newPan, setNewPan] = useState("");
  const [newBusinessName, setNewBusinessName] = useState("");
  const [newGst, setNewGst] = useState("");
  const [cardErrorMsg, setCardErrorMsg] = useState("");

  if (!isDevModeOpen) return null;

  // Handle Password Submit
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = authenticateDevMode(passwordInput);
    if (success) {
      setPasswordError(false);
      setPasswordInput("");
    } else {
      setPasswordError(true);
    }
  };

  // Stats Calculations (Starting strictly from 0!)
  const totalRevenue = transactions.reduce((sum, t) => sum + (t.status === "Success" ? t.amount : 0), 0);
  const totalTransactionsCount = transactions.length;
  const activeLeadsCount = leads.length;
  const conversionRate = totalTransactionsCount > 0 ? ((totalTransactionsCount / (totalTransactionsCount + activeLeadsCount)) * 100).toFixed(1) : "0.0";

  // Filtered Banks and UPI Apps for Admin selection
  const filteredBanks = ALL_INDIAN_BANKS.filter((b) =>
    b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
    b.code.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const filteredUpiApps = ALL_UPI_APPS.filter((u) =>
    u.name.toLowerCase().includes(upiAppSearch.toLowerCase())
  );

  // Toggle UPI App enabled state
  const handleToggleUpiApp = (appId: string) => {
    const isCurrentlyEnabled = paymentSettings.enabledUpiAppIds.includes(appId);
    let updated: string[];
    if (isCurrentlyEnabled) {
      updated = paymentSettings.enabledUpiAppIds.filter((id) => id !== appId);
    } else {
      updated = [...paymentSettings.enabledUpiAppIds, appId];
    }
    updatePaymentSettings({
      ...paymentSettings,
      enabledUpiAppIds: updated,
    });
  };

  const handleSelectAllUpiApps = () => {
    updatePaymentSettings({
      ...paymentSettings,
      enabledUpiAppIds: ALL_UPI_APPS.map((a) => a.id),
    });
  };

  const handleDeselectAllUpiApps = () => {
    updatePaymentSettings({
      ...paymentSettings,
      enabledUpiAppIds: [],
    });
  };

  // Add UPI Account Handler
  const handleAddUpiAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setUpiErrorMsg("");

    const bankObj = ALL_INDIAN_BANKS.find((b) => b.name === newUpiBank) || ALL_INDIAN_BANKS[0];
    const verification = verifyUpiAccount(newUpiBank, newUpiId, newUpiMobile);

    if (!verification.verified) {
      setUpiErrorMsg(verification.error || "Account Not Found");
      return;
    }

    const newAcc: UpiAccountConfig = {
      id: `upi-${Date.now()}`,
      bankName: bankObj.name,
      bankCode: bankObj.code,
      upiApp: newUpiApp,
      upiId: newUpiId,
      mobileNumber: newUpiMobile,
      isVerified: true,
      verificationMessage: "Verified Active Bank Account",
    };

    updatePaymentSettings({
      ...paymentSettings,
      upiAccounts: [...paymentSettings.upiAccounts, newAcc],
    });

    setIsAddingUpi(false);
    setNewUpiId("");
    setNewUpiMobile("");
    setUpiErrorMsg("");
  };

  const handleRemoveUpiAccount = (id: string) => {
    updatePaymentSettings({
      ...paymentSettings,
      upiAccounts: paymentSettings.upiAccounts.filter((a) => a.id !== id),
    });
  };

  // Add Bank Settlement Account Handler
  const handleAddCardAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setCardErrorMsg("");

    const bankObj = ALL_INDIAN_BANKS.find((b) => b.name === newCardBank) || ALL_INDIAN_BANKS[0];

    // Check Account Number
    const accCheck = validateBankAccountNumber(newCardAccNum);
    if (!accCheck.valid) {
      setCardErrorMsg(accCheck.error || "Account Verification Failed");
      return;
    }

    // Check IFSC Code
    const ifscCheck = validateIfscCode(newCardIfsc, bankObj.code);
    if (!ifscCheck.valid) {
      setCardErrorMsg(ifscCheck.error || "IFSC Verification Failed");
      return;
    }

    // Check Mobile Number
    const mobCheck = validateIndianMobile(newCardMobile);
    if (!mobCheck.valid) {
      setCardErrorMsg(mobCheck.error || "Mobile Verification Failed");
      return;
    }

    // Check Account Holder Name
    if (!newCardHolder.trim() || newCardHolder.trim().length < 3) {
      setCardErrorMsg("Please enter the full legal name of the Account Holder.");
      return;
    }

    // Check KYC PAN
    if (newPan) {
      const panCheck = validatePanNumber(newPan);
      if (!panCheck.valid) {
        setCardErrorMsg(panCheck.error || "PAN Verification Failed");
        return;
      }
    }

    // Check KYC Aadhaar
    if (newAadhaar) {
      const aadhCheck = validateAadhaarNumber(newAadhaar);
      if (!aadhCheck.valid) {
        setCardErrorMsg(aadhCheck.error || "Aadhaar Verification Failed");
        return;
      }
    }

    const cleanAccNum = newCardAccNum.replace(/\s+/g, "");
    const cleanIfsc = newCardIfsc.trim().toUpperCase();
    const cleanMobile = newCardMobile.replace(/\D/g, "");

    const newAcc: CardAccountConfig = {
      id: `card-${Date.now()}`,
      processor: paymentSettings.activeProcessor,
      bankName: bankObj.name,
      bankCode: bankObj.code,
      accountNumber: cleanAccNum,
      ifscCode: cleanIfsc,
      registeredMobile: cleanMobile,
      accountHolder: newCardHolder.trim(),
      kycType: newKycType,
      aadhaarNumber: newAadhaar.replace(/\D/g, ""),
      panNumber: newPan.trim().toUpperCase(),
      businessName: newBusinessName.trim(),
      taxGstNumber: newGst.trim().toUpperCase(),
      isVerified: true,
    };

    updatePaymentSettings({
      ...paymentSettings,
      cardAccounts: [...paymentSettings.cardAccounts, newAcc],
    });

    setIsAddingCard(false);
    setNewCardAccNum("");
    setNewCardIfsc("");
    setNewCardMobile("");
    setNewCardHolder("");
    setCardErrorMsg("");
  };

  const handleRemoveCardAccount = (id: string) => {
    updatePaymentSettings({
      ...paymentSettings,
      cardAccounts: paymentSettings.cardAccounts.filter((a) => a.id !== id),
    });
  };

  // Pricing Plan Actions
  const handleSavePlanEdit = (id: string, field: string, val: any) => {
    const updated = pricingPlans.map((p) => (p.id === id ? { ...p, [field]: val } : p));
    updatePricingPlans(updated);
  };

  const handleRemovePlan = (id: string) => {
    deletePricingPlan(id);
  };

  const handleClearAllPlans = () => {
    if (window.confirm("Are you sure you want to delete ALL pricing plans? This will remove all pricing cards from the public website.")) {
      clearAllPricingPlans();
    }
  };

  const handleRestoreDefaultPlans = () => {
    if (window.confirm("Restore sample default pricing plans?")) {
      restoreDefaultPricingPlans();
    }
  };

  const handleAddFeatureToPlan = (planId: string, featureText: string) => {
    if (!featureText.trim()) return;
    const plan = pricingPlans.find((p) => p.id === planId);
    if (!plan) return;
    const updatedFeatures = [...plan.features, featureText.trim()];
    handleSavePlanEdit(planId, "features", updatedFeatures);
  };

  const handleRemoveFeatureFromPlan = (planId: string, featureIndex: number) => {
    const plan = pricingPlans.find((p) => p.id === planId);
    if (!plan) return;
    const updatedFeatures = plan.features.filter((_, idx) => idx !== featureIndex);
    handleSavePlanEdit(planId, "features", updatedFeatures);
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlan.name || !newPlan.priceMonthly) return;
    const planObj: PricingPlan = {
      id: `plan-${Date.now()}`,
      name: newPlan.name.trim(),
      subtitle: newPlan.subtitle?.trim() || "Tailored Agency Package",
      priceMonthly: Number(newPlan.priceMonthly),
      priceYearly: Number(newPlan.priceYearly || Math.round(Number(newPlan.priceMonthly) * 0.8)),
      popular: Boolean(newPlan.popular),
      features: newPlan.features && newPlan.features.length > 0 ? newPlan.features : ["Custom Web Engineering", "Technical SEO Engine", "Dedicated Account Manager"],
      ctaText: newPlan.ctaText?.trim() || "Select Plan via WhatsApp",
    };
    updatePricingPlans([...pricingPlans, planObj]);
    setIsAddingPlan(false);
    setNewPlan({
      name: "",
      subtitle: "",
      priceMonthly: 5000,
      priceYearly: 4000,
      popular: false,
      features: ["Custom Web Engineering", "Dedicated SEO Setup", "24/7 Priority Support"],
      ctaText: "Select Plan via WhatsApp",
    });
    setPlanFeatureInput("");
  };

  // Portfolio Actions
  const handleRemovePortfolio = (id: string) => {
    updatePortfolioProjects(portfolioProjects.filter((p) => p.id !== id));
  };

  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolio.title) return;

    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const metrics = [];
    if (impactMetric1) metrics.push({ label: "Impact", value: impactMetric1 });
    if (impactMetric2) metrics.push({ label: "Performance", value: impactMetric2 });

    const proj: PortfolioProject = {
      id: `proj-${Date.now()}`,
      title: newPortfolio.title,
      category: (newPortfolio.category as any) || "Website",
      client: newPortfolio.client || "Client Brand",
      industry: newPortfolio.industry || "E-Commerce",
      duration: newPortfolio.duration || "3 Weeks",
      image: newPortfolio.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      mockupDesktop: newPortfolio.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      mockupMobile: newPortfolio.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      description: newPortfolio.description || "High-converting modern digital architecture crafted with sub-second speeds.",
      challenge: newPortfolio.challenge || "The client required a bespoke online experience with top speed and mobile checkout.",
      solution: newPortfolio.solution || "Puhayt Digital designed a lightweight Next-gen interface with full SEO schema and instant checkout.",
      impactMetrics: metrics.length > 0 ? metrics : [{ label: "Impact", value: "30% Traffic Increase" }],
      tags: parsedTags.length > 0 ? parsedTags : ["Responsive", "UI/UX Design"],
      technologies: newPortfolio.technologies || ["React", "Tailwind CSS", "TypeScript"],
      results: newPortfolio.results || [{ label: "Conversions", value: "+300%", change: "Measured" }],
      liveUrl: newPortfolio.liveUrl,
    };
    updatePortfolioProjects([...portfolioProjects, proj]);
    setIsAddingPortfolio(false);
    setNewPortfolio({
      title: "",
      client: "",
      industry: "E-Commerce",
      category: "Website",
      duration: "3 Weeks",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      description: "",
      challenge: "The client faced low mobile engagement and slow initial server response times affecting conversion rates.",
      solution: "Puhayt Digital designed a bespoke edge-rendered architecture with sub-second asset delivery and streamlined WhatsApp checkout.",
      technologies: ["React", "Tailwind CSS", "TypeScript"],
      results: [{ label: "Leads", value: "+200%", change: "Growth" }],
    });
  };

  // Contact Actions (Add, Edit, Remove, Reset)
  const handleAddEmail = () => {
    if (newEmail.trim()) {
      updateContactInfo({ ...contactInfo, emails: [...contactInfo.emails, newEmail.trim()] });
      setNewEmail("");
      setContactSuccessMsg("Email added successfully!");
      setTimeout(() => setContactSuccessMsg(""), 3000);
    }
  };

  const handleStartEditEmail = (idx: number, currentVal: string) => {
    setEditingEmailIndex(idx);
    setEditingEmailValue(currentVal);
  };

  const handleSaveEditEmail = (idx: number) => {
    if (!editingEmailValue.trim()) return;
    const next = [...contactInfo.emails];
    next[idx] = editingEmailValue.trim();
    updateContactInfo({ ...contactInfo, emails: next });
    setEditingEmailIndex(null);
    setContactSuccessMsg("Email updated successfully!");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleRemoveEmail = (idx: number) => {
    updateContactInfo({ ...contactInfo, emails: contactInfo.emails.filter((_, i) => i !== idx) });
    setContactSuccessMsg("Email removed.");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleCancelEditEmail = () => {
    setEditingEmailIndex(null);
  };

  const handleAddPhone = () => {
    if (newPhone.trim()) {
      updateContactInfo({ ...contactInfo, phones: [...contactInfo.phones, newPhone.trim()] });
      setNewPhone("");
      setContactSuccessMsg("Phone number added successfully!");
      setTimeout(() => setContactSuccessMsg(""), 3000);
    }
  };

  const handleStartEditPhone = (idx: number, currentVal: string) => {
    setEditingPhoneIndex(idx);
    setEditingPhoneValue(currentVal);
  };

  const handleSaveEditPhone = (idx: number) => {
    if (!editingPhoneValue.trim()) return;
    const next = [...contactInfo.phones];
    next[idx] = editingPhoneValue.trim();
    updateContactInfo({ ...contactInfo, phones: next });
    setEditingPhoneIndex(null);
    setContactSuccessMsg("Phone number updated successfully!");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleRemovePhone = (idx: number) => {
    updateContactInfo({ ...contactInfo, phones: contactInfo.phones.filter((_, i) => i !== idx) });
    setContactSuccessMsg("Phone number removed.");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleCancelEditPhone = () => {
    setEditingPhoneIndex(null);
  };

  const handleAddWhatsapp = () => {
    if (newWhatsapp.trim()) {
      updateContactInfo({ ...contactInfo, whatsapps: [...contactInfo.whatsapps, newWhatsapp.trim()] });
      setNewWhatsapp("");
      setContactSuccessMsg("WhatsApp number added successfully!");
      setTimeout(() => setContactSuccessMsg(""), 3000);
    }
  };

  const handleStartEditWhatsapp = (idx: number, currentVal: string) => {
    setEditingWhatsappIndex(idx);
    setEditingWhatsappValue(currentVal);
  };

  const handleSaveEditWhatsapp = (idx: number) => {
    if (!editingWhatsappValue.trim()) return;
    const next = [...contactInfo.whatsapps];
    next[idx] = editingWhatsappValue.trim();
    updateContactInfo({ ...contactInfo, whatsapps: next });
    setEditingWhatsappIndex(null);
    setContactSuccessMsg("WhatsApp number updated successfully!");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleRemoveWhatsapp = (idx: number) => {
    updateContactInfo({ ...contactInfo, whatsapps: contactInfo.whatsapps.filter((_, i) => i !== idx) });
    setContactSuccessMsg("WhatsApp number removed.");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleCancelEditWhatsapp = () => {
    setEditingWhatsappIndex(null);
  };

  const handleAddInstagram = () => {
    if (newInstagram.trim()) {
      updateContactInfo({ ...contactInfo, instagrams: [...contactInfo.instagrams, newInstagram.trim()] });
      setNewInstagram("");
      setContactSuccessMsg("Instagram handle added successfully!");
      setTimeout(() => setContactSuccessMsg(""), 3000);
    }
  };

  const handleStartEditInstagram = (idx: number, currentVal: string) => {
    setEditingInstagramIndex(idx);
    setEditingInstagramValue(currentVal);
  };

  const handleSaveEditInstagram = (idx: number) => {
    if (!editingInstagramValue.trim()) return;
    const next = [...contactInfo.instagrams];
    next[idx] = editingInstagramValue.trim();
    updateContactInfo({ ...contactInfo, instagrams: next });
    setEditingInstagramIndex(null);
    setContactSuccessMsg("Instagram handle updated successfully!");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleRemoveInstagram = (idx: number) => {
    updateContactInfo({ ...contactInfo, instagrams: contactInfo.instagrams.filter((_, i) => i !== idx) });
    setContactSuccessMsg("Instagram handle removed.");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleCancelEditInstagram = () => {
    setEditingInstagramIndex(null);
  };

  const handleStartEditAddress = () => {
    setEditingAddressValue(contactInfo.address || "");
    setIsEditingAddress(true);
  };

  const handleSaveAddress = () => {
    updateContactInfo({ ...contactInfo, address: editingAddressValue.trim() });
    setIsEditingAddress(false);
    setContactSuccessMsg("Headquarters address updated successfully!");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleRemoveAddress = () => {
    updateContactInfo({ ...contactInfo, address: "" });
    setEditingAddressValue("");
    setIsEditingAddress(false);
    setContactSuccessMsg("Headquarters address cleared.");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  const handleResetDefaultContacts = () => {
    updateContactInfo({
      emails: ["aayushcps0907@gmail.com", "contact@puhayt.digital"],
      whatsapps: ["+91 7044811476"],
      instagrams: ["@itz___.unknown_13", "@aayushg.dev"],
      phones: ["+91 70448 11476"],
      address: "Trishanjit's Location, Kolkata Metro Area — We still lack our first commercial office, but we travel directly to your premises anywhere in Kolkata for in-person meetings!",
    });
    setEditingAddressValue("Trishanjit's Location, Kolkata Metro Area — We still lack our first commercial office, but we travel directly to your premises anywhere in Kolkata for in-person meetings!");
    setContactSuccessMsg("Reset all contact details to official agency defaults!");
    setTimeout(() => setContactSuccessMsg(""), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-6xl glass-card rounded-3xl border border-[#D4AF37]/40 shadow-2xl p-4 sm:p-8 bg-[#0B0B0B] text-white my-auto max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl gold-gradient-bg flex items-center justify-center text-[#0B0B0B] font-bold shadow-lg">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">DevMode Master Suite</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Protected
                </span>
                <span className="hidden md:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-[10px] font-mono border border-sky-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                  <span>Live Cloud Sync Active</span>
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">Agency Control Console</h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isDevModeAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={() => syncAllToLiveCloud()}
                  disabled={isCloudSyncing}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#D4AF37] border border-[#D4AF37]/30 transition-all flex items-center space-x-1.5 disabled:opacity-50"
                  title="Push all changes immediately to Firestore live database for all users"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">{isCloudSyncing ? "Broadcasting..." : "Sync Live Cloud"}</span>
                </button>

                <button
                  onClick={logoutDevMode}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 transition-all flex items-center space-x-1"
                >
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Lock DevMode</span>
                </button>
              </>
            )}

            <button
              onClick={closeDevMode}
              className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AUTHENTICATION PROMPT */}
        {!isDevModeAuthenticated ? (
          <div className="py-12 sm:py-16 px-4 text-center max-w-md mx-auto space-y-6 my-auto">
            <div className="w-16 h-16 rounded-3xl glass-card-gold flex items-center justify-center mx-auto text-[#D4AF37] border border-[#D4AF37]/50 shadow-xl">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white">Enter DevMode Password</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Access master settings, edit pricing plans, manage portfolio items, contact information, and agency configuration.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter DevMode Master Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-center text-white text-sm font-mono focus:outline-none transition-all ${
                    passwordError ? "border-red-500 ring-2 ring-red-500/30" : "border-white/15 focus:border-[#D4AF37]"
                  }`}
                />
                {passwordError && (
                  <p className="text-xs text-red-400 mt-2 font-medium flex items-center justify-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5 inline mr-1" />
                    <span>Incorrect Password. Access Denied.</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-bold text-xs text-[#0B0B0B] gold-gradient-bg shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                Unlock DevMode Console
              </button>
            </form>
          </div>
        ) : (
          /* DEVMODE DASHBOARD CONTENT */
          <div className="flex-1 flex flex-col min-h-0 pt-4 space-y-4 overflow-hidden">
            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-white/10 shrink-0">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "overview"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Live Analytics ({transactions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("brand-logo")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "brand-logo"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Palette className="w-3.5 h-3.5 text-[#FFDF73]" />
                <span>Website Logo &amp; Brand</span>
              </button>

              <button
                onClick={() => setActiveTab("team-profiles")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "team-profiles"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Founders &amp; Team Images ({teamMembers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("discounts-offers")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "discounts-offers"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFDF73]" />
                <span>Referral, Discount &amp; Offer ({discounts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("blog-articles")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "blog-articles"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-300" />
                <span>Blog &amp; Articles ({blogPosts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("project-progress")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "project-progress"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Real Project Progress</span>
              </button>

              <button
                onClick={() => setActiveTab("client-websites")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "client-websites"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>Subscribed Websites ({clientWebsites.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("client-chats")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "client-chats"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Megaphone className="w-3.5 h-3.5 text-[#FFDF73]" />
                <span>Client DevMode Chat ({clientChatMessages.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("marketing-ads")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "marketing-ads"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>Marketing & Ads ({campaigns.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("website-analysis")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "website-analysis"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Website Analysis</span>
              </button>

              <button
                onClick={() => setActiveTab("seo-audit")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "seo-audit"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <SearchCode className="w-3.5 h-3.5" />
                <span>SEO & Structured Data</span>
              </button>

              <button
                onClick={() => setActiveTab("pricing")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "pricing"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Pricing Plans ({pricingPlans.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("portfolio")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "portfolio"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Portfolio ({portfolioProjects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("contacts")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "contacts"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Channels</span>
              </button>

              <button
                onClick={() => setActiveTab("location")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "location"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Google Map Pin</span>
              </button>

              <button
                onClick={() => setActiveTab("sections")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 ${
                  activeTab === "sections"
                    ? "bg-[#D4AF37] text-[#0B0B0B] shadow-lg"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Section Controls</span>
              </button>
            </div>

            {/* TAB PANELS */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-6 text-xs">
              {/* TAB: BRAND LOGO & IDENTITY */}
              {activeTab === "brand-logo" && (
                <BrandLogoManager />
              )}

              {/* TAB: FOUNDERS & TEAM PROFILES / CUSTOM PORTRAIT IMAGES */}
              {activeTab === "team-profiles" && (
                <TeamProfilesManager />
              )}

              {/* TAB: REFERRALS & DISCOUNT PACKAGES */}
              {activeTab === "discounts-offers" && (
                <DiscountsOffersManager />
              )}

              {/* TAB: BLOG & ARTICLES MANAGER */}
              {activeTab === "blog-articles" && (
                <BlogArticlesManager />
              )}

              {/* TAB: REAL PROJECT PROGRESS & SPRINTS */}
              {activeTab === "project-progress" && (
                <ProjectProgressManager />
              )}

              {/* TAB: SUBSCRIBED CLIENT WEBSITES */}
              {activeTab === "client-websites" && (
                <ClientWebsitesManager />
              )}

              {/* TAB: CLIENT DEVMODE CHAT */}
              {activeTab === "client-chats" && (
                <DevModeChatManager />
              )}

              {/* TAB: MARKETING & ADS OPERATIONS */}
              {activeTab === "marketing-ads" && (
                <MarketingAdsManager />
              )}

              {/* TAB: WEBSITE FACTUAL KNOWLEDGE & ANALYSIS */}
              {activeTab === "website-analysis" && (
                <WebsiteAnalysisManager />
              )}

              {/* TAB: SEO & STRUCTURED DATA AUDIT */}
              {activeTab === "seo-audit" && (
                <SeoAuditManager />
              )}

              {/* TAB 1: OVERVIEW & LIVE ANALYTICS */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Realtime Key Metrics (Starts strictly at 0!) */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
                      <div className="text-[11px] text-neutral-400 uppercase font-semibold">Total Revenue</div>
                      <div className="font-serif text-2xl font-extrabold text-emerald-400">
                        ₹{totalRevenue.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-neutral-400">Real transaction sum (Starts at 0)</div>
                    </div>

                    <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
                      <div className="text-[11px] text-neutral-400 uppercase font-semibold">Total Payments</div>
                      <div className="font-serif text-2xl font-extrabold text-white">
                        {totalTransactionsCount}
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">Completed Transactions</div>
                    </div>

                    <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
                      <div className="text-[11px] text-neutral-400 uppercase font-semibold">Active Leads</div>
                      <div className="font-serif text-2xl font-extrabold text-[#D4AF37]">
                        {activeLeadsCount}
                      </div>
                      <div className="text-[10px] text-neutral-400">Inbound inquiries</div>
                    </div>

                    <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-1">
                      <div className="text-[11px] text-neutral-400 uppercase font-semibold">Conversion Rate</div>
                      <div className="font-serif text-2xl font-extrabold text-blue-400">
                        {conversionRate}%
                      </div>
                      <div className="text-[10px] text-neutral-400">Lead to Payment ratio</div>
                    </div>
                  </div>

                  {/* Realtime Transaction Feed */}
                  <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                        <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                        <span>Live Transaction History</span>
                      </h3>
                      <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        ● Real-time Sync Active
                      </span>
                    </div>

                    {transactions.length === 0 ? (
                      <div className="py-12 text-center text-neutral-400 space-y-2">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-neutral-400">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <p className="font-semibold text-white text-sm">No Transactions Yet</p>
                        <p className="text-xs font-light max-w-sm mx-auto text-neutral-400">
                          History starts at 0. Whenever a client purchases a plan using UPI or Card, the transaction will immediately appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-white/10">
                        {transactions.map((t) => (
                          <div key={t.id} className="py-3 flex items-center justify-between font-mono">
                            <div>
                              <div className="font-bold text-white text-xs">{t.clientName} ({t.clientEmail})</div>
                              <div className="text-[11px] text-neutral-400">
                                {t.planName} • Ref: <span className="text-[#D4AF37]">{t.referenceId}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-emerald-400 text-sm">₹{t.amount.toLocaleString("en-IN")}</div>
                              <div className="text-[10px] text-neutral-400">{t.paymentMethod} • {t.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Notifications Feed */}
                  <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-[#D4AF37]" />
                        <span>System Notifications ({notifications.length})</span>
                      </h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={clearAllNotifications}
                          className="text-[10px] text-neutral-400 hover:text-white"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {notifications.length === 0 ? (
                      <p className="text-xs text-neutral-400 text-center py-4">No unread notifications.</p>
                    ) : (
                      <div className="space-y-2">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between"
                          >
                            <div className="space-y-0.5">
                              <div className="font-bold text-white text-xs">{n.title}</div>
                              <div className="text-neutral-300 text-xs">{n.message}</div>
                              <div className="text-[10px] text-neutral-400">{n.timestamp}</div>
                            </div>
                            <button
                              onClick={() => dismissNotification(n.id)}
                              className="text-neutral-400 hover:text-white"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: GROWTH RETAINERS & PLANS MANAGER */}
              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                        <span>Growth Retainers &amp; Plans</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-sans font-semibold">
                          {pricingPlans.length} Plans Active
                        </span>
                      </h3>
                      <p className="text-neutral-400 text-xs font-light mt-0.5">
                        Manage Monthly & Yearly pricing tiers, discount rates, feature checklists, and highlight badges. Syncs instantly across all devices!
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {pricingPlans.length > 0 ? (
                        <button
                          type="button"
                          onClick={handleClearAllPlans}
                          className="px-3 py-1.5 rounded-full font-bold text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 flex items-center space-x-1.5 transition-colors"
                          title="Delete all pricing plans"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear All</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleRestoreDefaultPlans}
                          className="px-3 py-1.5 rounded-full font-bold text-xs bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 border border-white/10 flex items-center space-x-1.5 transition-colors"
                          title="Restore default pricing plans"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Restore Defaults</span>
                        </button>
                      )}

                      <button
                        onClick={() => setIsAddingPlan(!isAddingPlan)}
                        className="px-4 py-2 rounded-full font-bold text-xs text-[#0B0B0B] gold-gradient-bg flex items-center justify-center space-x-1.5 shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isAddingPlan ? "Close Creator" : "Add Plan"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Add Plan Form */}
                  {isAddingPlan && (
                    <form onSubmit={handleCreatePlan} className="bg-[#14100B] p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/40 shadow-2xl space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="font-bold text-[#D4AF37] text-sm flex items-center space-x-2">
                          <Sparkles className="w-4 h-4" />
                          <span>Create Custom Monthly & Yearly Plan</span>
                        </div>
                        <span className="text-[11px] text-neutral-400">Live on Desktop & Mobile</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Plan Title *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Growth Acceleration Tier"
                            value={newPlan.name}
                            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-300 mb-1">Subtitle / Target Segment</label>
                          <input
                            type="text"
                            placeholder="e.g. High-velocity expansion for brands scaling past ₹50L/mo"
                            value={newPlan.subtitle}
                            onChange={(e) => setNewPlan({ ...newPlan, subtitle: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      {/* Pricing Dual Row (Monthly + Yearly) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/10">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-200 mb-1">
                            Monthly Rate (₹ INR / mo) *
                          </label>
                          <input
                            type="number"
                            required
                            min="0"
                            placeholder="e.g. 5000"
                            value={newPlan.priceMonthly}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setNewPlan({
                                ...newPlan,
                                priceMonthly: val,
                                priceYearly: Math.round(val * 0.8),
                              });
                            }}
                            className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/15 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-[#D4AF37]"
                          />
                          <span className="text-[10px] text-neutral-400 mt-1 block">Billed month-to-month</span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-[11px] font-semibold text-neutral-200">
                              Yearly Rate (₹ INR / mo equivalent) *
                            </label>
                            {/* Discount presets */}
                            <div className="flex items-center space-x-1">
                              {[15, 20, 25].map((pct) => (
                                <button
                                  key={pct}
                                  type="button"
                                  onClick={() => {
                                    const base = Number(newPlan.priceMonthly || 5000);
                                    setNewPlan({
                                      ...newPlan,
                                      priceYearly: Math.round(base * (1 - pct / 100)),
                                    });
                                  }}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                                >
                                  -{pct}%
                                </button>
                              ))}
                            </div>
                          </div>
                          <input
                            type="number"
                            required
                            min="0"
                            placeholder="e.g. 4000"
                            value={newPlan.priceYearly}
                            onChange={(e) => setNewPlan({ ...newPlan, priceYearly: Number(e.target.value) })}
                            className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/15 text-[#FFDF73] font-mono font-bold text-sm focus:outline-none focus:border-[#D4AF37]"
                          />
                          <span className="text-[10px] text-neutral-400 mt-1 block">
                            Annual savings: {newPlan.priceMonthly && newPlan.priceYearly ? Math.round(((newPlan.priceMonthly - newPlan.priceYearly) / newPlan.priceMonthly) * 100) : 20}% off
                          </span>
                        </div>
                      </div>

                      {/* Options: Highlight & CTA */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-300 mb-1">CTA Button Text</label>
                          <input
                            type="text"
                            placeholder="e.g. Select Plan via WhatsApp"
                            value={newPlan.ctaText}
                            onChange={(e) => setNewPlan({ ...newPlan, ctaText: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="pt-2 sm:pt-4">
                          <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={newPlan.popular || false}
                              onChange={(e) => setNewPlan({ ...newPlan, popular: e.target.checked })}
                              className="w-4 h-4 rounded text-[#D4AF37] bg-black border-white/20 focus:ring-0"
                            />
                            <span className="text-xs font-semibold text-white flex items-center space-x-1.5">
                              <span>★ Highlight as "Most Popular Choice"</span>
                              <span className="text-[10px] text-[#D4AF37] font-normal">(Gold Border)</span>
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Feature Bullet List Manager */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <label className="block text-[11px] font-semibold text-neutral-200">
                          Included Deliverables & Features ({newPlan.features?.length || 0})
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. 3D WebGL Interface, Google Ads Management, 24/7 Slack Portal"
                            value={planFeatureInput}
                            onChange={(e) => setPlanFeatureInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                if (planFeatureInput.trim()) {
                                  setNewPlan({
                                    ...newPlan,
                                    features: [...(newPlan.features || []), planFeatureInput.trim()],
                                  });
                                  setPlanFeatureInput("");
                                }
                              }
                            }}
                            className="flex-1 px-3.5 py-2 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (planFeatureInput.trim()) {
                                setNewPlan({
                                  ...newPlan,
                                  features: [...(newPlan.features || []), planFeatureInput.trim()],
                                });
                                setPlanFeatureInput("");
                              }
                            }}
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-semibold shrink-0"
                          >
                            + Add Feature
                          </button>
                        </div>

                        {/* Chips of added features */}
                        <div className="flex flex-wrap gap-1.5 pt-1 max-h-36 overflow-y-auto">
                          {newPlan.features?.map((feat, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300"
                            >
                              <span>{feat}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewPlan({
                                    ...newPlan,
                                    features: newPlan.features?.filter((_, i) => i !== idx),
                                  });
                                }}
                                className="text-neutral-400 hover:text-red-400 ml-1"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Submission Buttons */}
                      <div className="flex justify-end space-x-2.5 pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setIsAddingPlan(false)}
                          className="px-4 py-2 rounded-xl bg-white/5 text-neutral-400 hover:text-white text-xs transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg shadow-lg hover:scale-105 transition-transform"
                        >
                          Publish Live Plan
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Pricing Plans Grid Editor */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {pricingPlans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`glass-card p-5 rounded-2xl border space-y-4 relative transition-all ${
                          plan.popular ? "border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] bg-[#120E0A]" : "border-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`pop-${plan.id}`}
                              checked={plan.popular || false}
                              onChange={(e) => handleSavePlanEdit(plan.id, "popular", e.target.checked)}
                              className="w-3.5 h-3.5 rounded text-[#D4AF37] bg-black border-white/20"
                            />
                            <label htmlFor={`pop-${plan.id}`} className="text-[11px] font-semibold text-[#D4AF37] cursor-pointer">
                              {plan.popular ? "★ Popular Choice" : "Standard Plan"}
                            </label>
                          </div>

                          <button
                            onClick={() => handleRemovePlan(plan.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                            title="Remove Plan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="space-y-2">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">Plan Title</label>
                            <input
                              type="text"
                              value={plan.name}
                              onChange={(e) => handleSavePlanEdit(plan.id, "name", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/15 text-white font-bold text-sm focus:outline-none focus:border-[#D4AF37]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">Subtitle</label>
                            <textarea
                              rows={2}
                              value={plan.subtitle}
                              onChange={(e) => handleSavePlanEdit(plan.id, "subtitle", e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/15 text-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>

                        {/* Dual Rates: Monthly + Yearly */}
                        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/50 border border-white/10">
                          <div>
                            <label className="block text-[9px] uppercase font-bold text-neutral-400 mb-1">Monthly (₹)</label>
                            <input
                              type="number"
                              value={plan.priceMonthly}
                              onChange={(e) => handleSavePlanEdit(plan.id, "priceMonthly", Number(e.target.value))}
                              className="w-full px-2.5 py-1.5 rounded bg-black border border-white/15 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-[#D4AF37]"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-bold text-[#FFDF73] mb-1">Yearly / Mo (₹)</label>
                            <input
                              type="number"
                              value={plan.priceYearly}
                              onChange={(e) => handleSavePlanEdit(plan.id, "priceYearly", Number(e.target.value))}
                              className="w-full px-2.5 py-1.5 rounded bg-black border border-white/15 text-[#FFDF73] font-mono font-bold text-sm focus:outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>

                        {/* Feature List & Inline Adder */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="block text-[10px] uppercase font-bold text-neutral-400">
                              Features ({plan.features.length})
                            </label>
                          </div>

                          {/* Quick add feature to this specific plan */}
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              id={`add-feat-input-${plan.id}`}
                              placeholder="+ Add feature..."
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const target = e.currentTarget;
                                  if (target.value.trim()) {
                                    handleAddFeatureToPlan(plan.id, target.value);
                                    target.value = "";
                                  }
                                }
                              }}
                              className="flex-1 px-2.5 py-1 rounded bg-black border border-white/15 text-white text-[11px] focus:outline-none focus:border-[#D4AF37]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const input = document.getElementById(`add-feat-input-${plan.id}`) as HTMLInputElement;
                                if (input && input.value.trim()) {
                                  handleAddFeatureToPlan(plan.id, input.value);
                                  input.value = "";
                                }
                              }}
                              className="px-2.5 py-1 rounded bg-white/10 text-[#D4AF37] text-[11px] font-bold hover:bg-white/20 transition-colors"
                            >
                              Add
                            </button>
                          </div>

                          <ul className="space-y-1.5 text-[11px] text-neutral-300 font-light max-h-36 overflow-y-auto pr-1">
                            {plan.features.map((feat, idx) => (
                              <li key={idx} className="flex items-center justify-between group bg-white/5 px-2 py-1 rounded border border-white/5">
                                <span className="flex items-center space-x-1.5 truncate">
                                  <Check className="w-3 h-3 text-[#D4AF37] shrink-0" />
                                  <span className="truncate">{feat}</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFeatureFromPlan(plan.id, idx)}
                                  className="text-neutral-500 hover:text-red-400 opacity-80 group-hover:opacity-100 p-0.5"
                                  title="Delete feature"
                                >
                                  &times;
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA Text */}
                        <div>
                          <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">CTA Label</label>
                          <input
                            type="text"
                            value={plan.ctaText || "Select Plan via WhatsApp"}
                            onChange={(e) => handleSavePlanEdit(plan.id, "ctaText", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/15 text-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: FEATURED PORTFOLIO & INTERNAL CASE STUDIES MANAGER */}
              {activeTab === "portfolio" && (
                <PortfolioManager />
              )}

              {/* TAB 5: CONTACT CHANNELS */}
              {activeTab === "contacts" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                        <Mail className="w-5 h-5 text-[#D4AF37]" />
                        <span>Agency Contact Channels Manager</span>
                      </h3>
                      <p className="text-neutral-400 text-xs font-light mt-0.5">
                        Change, inline-edit, add, or remove emails, phone numbers, WhatsApp, Instagram handles, and headquarters address. Updates in real-time across the entire site!
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleResetDefaultContacts}
                        className="px-3 py-1.5 rounded-xl border border-white/20 hover:border-[#D4AF37]/50 text-neutral-300 hover:text-white text-xs font-medium transition-all"
                      >
                        Reset to Defaults
                      </button>
                      <button
                        type="button"
                        onClick={syncAllToLiveCloud}
                        disabled={isCloudSyncing}
                        className="px-3.5 py-1.5 rounded-xl gold-gradient-bg text-[#0B0B0B] font-bold text-xs shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-1.5"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? "animate-spin" : ""}`} />
                        <span>{isCloudSyncing ? "Syncing..." : "Sync Live Cloud"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Feedback toast */}
                  {contactSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{contactSuccessMsg}</span>
                    </div>
                  )}

                  {/* 1. Official Email Addresses */}
                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-[#D4AF37] flex items-center space-x-1.5">
                        <Mail className="w-4 h-4" />
                        <span>Official Email Addresses ({contactInfo.emails.length})</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">Used for inquiries &amp; footer</span>
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="email"
                        placeholder="Add new email address (e.g. contact@puhayt.digital)..."
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddEmail()}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        onClick={handleAddEmail}
                        className="px-4 py-2.5 rounded-xl font-bold text-xs text-[#0B0B0B] gold-gradient-bg hover:opacity-90 transition-opacity"
                      >
                        Add Email
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {contactInfo.emails.length === 0 ? (
                        <div className="text-xs text-neutral-500 italic p-3 text-center bg-white/5 rounded-xl">
                          No email addresses configured. Add one above.
                        </div>
                      ) : (
                        contactInfo.emails.map((em, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 gap-2"
                          >
                            {editingEmailIndex === idx ? (
                              <div className="flex items-center space-x-2 flex-1 w-full">
                                <input
                                  type="email"
                                  autoFocus
                                  value={editingEmailValue}
                                  onChange={(e) => setEditingEmailValue(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSaveEditEmail(idx);
                                    if (e.key === "Escape") handleCancelEditEmail();
                                  }}
                                  className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-[#D4AF37] text-white text-xs font-mono focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSaveEditEmail(idx)}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Save</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelEditEmail}
                                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 text-xs"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center space-x-2 font-mono text-xs text-white">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                                  <span>{em}</span>
                                  {idx === 0 && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#FFDF73] font-sans font-bold">
                                      Primary
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditEmail(idx, em)}
                                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-medium flex items-center space-x-1 transition-colors"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveEmail(idx)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                    title="Remove this email"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* 2. WhatsApp Numbers */}
                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                        <Phone className="w-4 h-4" />
                        <span>WhatsApp Numbers ({contactInfo.whatsapps.length})</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">Powers 1-click WhatsApp buttons</span>
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="+91 7044811476"
                        value={newWhatsapp}
                        onChange={(e) => setNewWhatsapp(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddWhatsapp()}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-emerald-400"
                      />
                      <button
                        onClick={handleAddWhatsapp}
                        className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                      >
                        Add WhatsApp
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {contactInfo.whatsapps.length === 0 ? (
                        <div className="text-xs text-neutral-500 italic p-3 text-center bg-white/5 rounded-xl">
                          No WhatsApp numbers configured. Add one above.
                        </div>
                      ) : (
                        contactInfo.whatsapps.map((wa, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 gap-2"
                          >
                            {editingWhatsappIndex === idx ? (
                              <div className="flex items-center space-x-2 flex-1 w-full">
                                <input
                                  type="text"
                                  autoFocus
                                  value={editingWhatsappValue}
                                  onChange={(e) => setEditingWhatsappValue(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSaveEditWhatsapp(idx);
                                    if (e.key === "Escape") handleCancelEditWhatsapp();
                                  }}
                                  className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-emerald-400 text-white text-xs font-mono focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSaveEditWhatsapp(idx)}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Save</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelEditWhatsapp}
                                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 text-xs"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center space-x-2 font-mono text-xs text-white">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                  <span>{wa}</span>
                                  {idx === 0 && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-sans font-bold">
                                      Primary
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                                  <a
                                    href={`https://wa.me/${wa.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs font-medium flex items-center space-x-1 border border-emerald-500/30"
                                    title="Test WhatsApp chat"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    <span>Test</span>
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditWhatsapp(idx, wa)}
                                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 text-xs font-medium flex items-center space-x-1 transition-colors"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveWhatsapp(idx)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                    title="Remove this WhatsApp number"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* 3. Direct Phone Numbers */}
                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-sky-400 flex items-center space-x-1.5">
                        <Phone className="w-4 h-4" />
                        <span>Direct Calling Phone Numbers ({contactInfo.phones.length})</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">Powers direct tel: dialing links</span>
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="+91 7044811476"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddPhone()}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-sky-400"
                      />
                      <button
                        onClick={handleAddPhone}
                        className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-sky-600 hover:bg-sky-500 transition-colors"
                      >
                        Add Phone
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {contactInfo.phones.length === 0 ? (
                        <div className="text-xs text-neutral-500 italic p-3 text-center bg-white/5 rounded-xl">
                          No direct phone numbers configured. Add one above.
                        </div>
                      ) : (
                        contactInfo.phones.map((ph, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 gap-2"
                          >
                            {editingPhoneIndex === idx ? (
                              <div className="flex items-center space-x-2 flex-1 w-full">
                                <input
                                  type="text"
                                  autoFocus
                                  value={editingPhoneValue}
                                  onChange={(e) => setEditingPhoneValue(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSaveEditPhone(idx);
                                    if (e.key === "Escape") handleCancelEditPhone();
                                  }}
                                  className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-sky-400 text-white text-xs font-mono focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSaveEditPhone(idx)}
                                  className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center space-x-1"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Save</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelEditPhone}
                                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 text-xs"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center space-x-2 font-mono text-xs text-white">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                  <span>{ph}</span>
                                  {idx === 0 && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-sans font-bold">
                                      Primary
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditPhone(idx, ph)}
                                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sky-300 text-xs font-medium flex items-center space-x-1 transition-colors"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhone(idx)}
                                    className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                    title="Remove this phone number"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* 4. Instagram Handles */}
                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-pink-400 flex items-center space-x-1.5">
                        <Instagram className="w-4 h-4" />
                        <span>Instagram Handles ({contactInfo.instagrams.length})</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">Click to test profile links</span>
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="@puhayt.digital or https://instagram.com/puhayt.digital"
                        value={newInstagram}
                        onChange={(e) => setNewInstagram(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddInstagram()}
                        className="flex-1 px-3.5 py-2.5 rounded-xl bg-black border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-pink-400"
                      />
                      <button
                        onClick={handleAddInstagram}
                        className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-pink-600 hover:bg-pink-500 transition-colors"
                      >
                        Add Instagram
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {contactInfo.instagrams.length === 0 ? (
                        <div className="text-xs text-neutral-500 italic p-3 text-center bg-white/5 rounded-xl">
                          No Instagram profiles configured. Add one above.
                        </div>
                      ) : (
                        contactInfo.instagrams.map((insta, idx) => {
                          const cleanHandle = insta.replace("@", "").trim();
                          const instaUrl = insta.startsWith("http") ? insta : `https://instagram.com/${cleanHandle}`;
                          return (
                            <div
                              key={idx}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 gap-2"
                            >
                              {editingInstagramIndex === idx ? (
                                <div className="flex items-center space-x-2 flex-1 w-full">
                                  <input
                                    type="text"
                                    autoFocus
                                    value={editingInstagramValue}
                                    onChange={(e) => setEditingInstagramValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") handleSaveEditInstagram(idx);
                                      if (e.key === "Escape") handleCancelEditInstagram();
                                    }}
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-pink-400 text-white text-xs font-mono focus:outline-none"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleSaveEditInstagram(idx)}
                                    className="px-2.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center space-x-1"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Save</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleCancelEditInstagram}
                                    className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 text-xs"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center space-x-2 font-mono text-xs text-white">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                                    <a
                                      href={instaUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-pink-300 hover:text-pink-200 flex items-center space-x-1 underline decoration-pink-500/30"
                                      title="Click to view Instagram profile"
                                    >
                                      <span>{insta}</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                    {idx === 0 && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-sans font-bold">
                                        Primary
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                                    <button
                                      type="button"
                                      onClick={() => handleStartEditInstagram(idx, insta)}
                                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-pink-300 text-xs font-medium flex items-center space-x-1 transition-colors"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                      <span>Edit</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveInstagram(idx)}
                                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                                      title="Remove this Instagram handle"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* 5. Headquarters Physical Address */}
                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-[#FFDF73] flex items-center space-x-1.5">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span>Agency Headquarters Address</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">Displayed in Footer &amp; Contact Desk</span>
                    </div>

                    {isEditingAddress ? (
                      <div className="space-y-3">
                        <textarea
                          rows={3}
                          autoFocus
                          value={editingAddressValue}
                          onChange={(e) => setEditingAddressValue(e.target.value)}
                          placeholder="Enter physical agency address..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-[#D4AF37] text-white text-xs leading-relaxed focus:outline-none"
                        />
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={handleSaveAddress}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                          >
                            <Check className="w-4 h-4" />
                            <span>Save Address</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditingAddress(false);
                              setEditingAddressValue(contactInfo.address || "");
                            }}
                            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-xs text-neutral-200 leading-relaxed font-light">
                          {contactInfo.address ? (
                            <span>{contactInfo.address}</span>
                          ) : (
                            <span className="italic text-neutral-500">No address currently set.</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            type="button"
                            onClick={handleStartEditAddress}
                            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-medium flex items-center space-x-1.5 transition-colors"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Edit Address</span>
                          </button>
                          {contactInfo.address && (
                            <button
                              type="button"
                              onClick={handleRemoveAddress}
                              className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                              title="Clear address"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 6: GOOGLE MAP PIN LOCATION */}
              {activeTab === "location" && (
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-[#D4AF37]" />
                      <span>Interactive Google Map Location Pin</span>
                    </h3>
                    <p className="text-neutral-400 text-xs font-light">
                      Set latitude & longitude or select address with a pin to update agency HQ location on the interactive map.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
                      <label className="block text-[11px] font-semibold text-[#D4AF37]">HQ Map Title</label>
                      <input
                        type="text"
                        value={locationPin.mapTitle}
                        onChange={(e) => updateLocationPin({ ...locationPin, mapTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs"
                      />

                      <label className="block text-[11px] font-semibold text-neutral-400">Formatted Address</label>
                      <textarea
                        rows={2}
                        value={locationPin.address}
                        onChange={(e) => updateLocationPin({ ...locationPin, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black border border-white/15 text-white text-xs"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-neutral-400">Latitude</label>
                          <input
                            type="number"
                            step="0.0001"
                            value={locationPin.lat}
                            onChange={(e) => updateLocationPin({ ...locationPin, lat: Number(e.target.value) })}
                            className="w-full px-3 py-1.5 rounded-xl bg-black border border-white/15 text-white font-mono text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-neutral-400">Longitude</label>
                          <input
                            type="number"
                            step="0.0001"
                            value={locationPin.lng}
                            onChange={(e) => updateLocationPin({ ...locationPin, lng: Number(e.target.value) })}
                            className="w-full px-3 py-1.5 rounded-xl bg-black border border-white/15 text-white font-mono text-xs"
                          />
                        </div>
                      </div>

                      <div className="text-[11px] text-neutral-400 pt-2 border-t border-white/10 space-y-1">
                        <div className="font-bold text-white">Preset Indian Metro Hubs Pin:</div>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            onClick={() =>
                              updateLocationPin({
                                lat: 28.4950,
                                lng: 77.0890,
                                address: "Cyber City, Sector 24, Gurugram, Delhi NCR, India",
                                mapTitle: "Puhayt Digital Cyber City HQ",
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px]"
                          >
                            Delhi NCR (Gurugram)
                          </button>
                          <button
                            onClick={() =>
                              updateLocationPin({
                                lat: 19.0760,
                                lng: 72.8777,
                                address: "Bandra Kurla Complex (BKC), Mumbai, Maharashtra, India",
                                mapTitle: "Puhayt Digital Mumbai Hub",
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px]"
                          >
                            Mumbai BKC
                          </button>
                          <button
                            onClick={() =>
                              updateLocationPin({
                                lat: 12.9716,
                                lng: 77.5946,
                                address: "Indiranagar 100ft Road, Bengaluru, Karnataka, India",
                                mapTitle: "Puhayt Digital Bengaluru Tech Park",
                              })
                            }
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px]"
                          >
                            Bengaluru
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Preview Map */}
                    <div className="glass-card rounded-2xl overflow-hidden border border border-[#D4AF37]/40 h-64 relative">
                      <iframe
                        title="DevMode Pin Preview"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://maps.google.com/maps?q=${locationPin.lat},${locationPin.lng}&z=14&output=embed`}
                        className="w-full h-full filter grayscale contrast-125 brightness-90"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 px-2.5 py-1 rounded-lg border border-[#D4AF37]/50 text-[10px] text-[#D4AF37] font-mono">
                        Pin Active: {locationPin.lat.toFixed(4)}, {locationPin.lng.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: SECTION VISIBILITY CONTROLS */}
              {activeTab === "sections" && (
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-3">
                    <h3 className="font-serif text-lg font-bold text-white">Homepage Section Controls</h3>
                    <p className="text-neutral-400 text-xs font-light">
                      Enable or disable major agency sections. Case Studies are currently disabled per request.
                    </p>
                  </div>

                  <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-serif text-base font-bold text-white">Client Case Studies Section</div>
                        <div className="text-neutral-400 text-xs font-light">
                          Toggle visibility of ROI case studies and charts section on the main landing page.
                        </div>
                      </div>

                      <button
                        onClick={() => setShowCaseStudies(!showCaseStudies)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                          showCaseStudies
                            ? "bg-emerald-500 text-black shadow-lg"
                            : "bg-white/10 text-neutral-400 hover:text-white"
                        }`}
                      >
                        {showCaseStudies ? (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>Section Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4 text-amber-400" />
                            <span>Hidden (Removed for now)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

               {/* TAB 8: PAYMENT GATEWAY SECURITY AUDIT LOGS */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
