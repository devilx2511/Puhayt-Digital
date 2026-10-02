import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgencyProvider, useAgency } from "./context/AgencyContext";
import { SEOMeta } from "./components/SEO/SEOMeta";
import { PublicAdBanner } from "./components/PublicAdBanner";
import { Navbar } from "./components/Navbar";
import { MobileSlideDrawer } from "./components/MobileSlideDrawer";
import { ThreeBackground } from "./components/ThreeBackground";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { IndustriesSection } from "./components/IndustriesSection";
import { AISuiteSection } from "./components/AISuiteSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { PricingSection } from "./components/PricingSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FreeAuditModal } from "./components/FreeAuditModal";
import { SearchModal } from "./components/SearchModal";
import { DevModeModal } from "./components/DevMode/DevModeModal";
import { PaymentModal } from "./components/PaymentModal";
import { AuthModal } from "./components/AuthModal";
import { ClientDashboard } from "./components/ClientDashboard";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { KolkataGeoSection } from "./components/KolkataGeoSection";
import { GoogleStitchOptionsModal } from "./components/GoogleStitchOptionsModal";
import { DedicatedPageLayout } from "./components/DedicatedPageLayout";
import { ClientPortal } from "./components/ClientPortal";

function MainAppContent() {
  const {
    showCaseStudies,
    currentUser,
    openAuthModal,
    isClientDashboardOpen,
    closeClientDashboard,
  } = useAgency();
  
  // App sequence state: defaults directly to "homepage" for instant mobile & desktop access
  const [appStage, setAppStage] = useState<"opening" | "loading" | "auth" | "homepage">("homepage");

  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedServiceForContact, setSelectedServiceForContact] = useState("");

  // Hash router sync across all devices
  useEffect(() => {
    const syncHashWithPage = () => {
      const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase();
      if (!hash || hash === "home") {
        setCurrentPage("home");
      } else if (
        [
          "about",
          "services",
          "kolkata-geo",
          "portfolio",
          "case-studies",
          "industries",
          "ai-suite",
          "pricing",
          "testimonials",
          "reviews",
          "blog",
          "contact",
          "client-portal",
        ].includes(hash)
      ) {
        setCurrentPage(hash === "reviews" ? "testimonials" : hash);
      }
    };

    syncHashWithPage();
    window.addEventListener("hashchange", syncHashWithPage);
    return () => window.removeEventListener("hashchange", syncHashWithPage);
  }, []);

  // When stage reaches "auth", trigger the Auth modal if not logged in
  useEffect(() => {
    if (appStage === "auth") {
      if (currentUser) {
        setAppStage("homepage");
      } else {
        openAuthModal("google");
      }
    }
  }, [appStage, currentUser, openAuthModal]);

  const navigateToPage = (target: string) => {
    if (target === "home") {
      setCurrentPage("home");
      window.location.hash = "/";
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const cleanTarget = target === "reviews" ? "testimonials" : target;
    setCurrentPage(cleanTarget);
    window.location.hash = `/${cleanTarget}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForContact(serviceName);
    navigateToPage("contact");
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#D4AF37] selection:text-[#0B0B0B] relative overflow-x-hidden">
      
      {/* Dynamic SEO Meta & JSON-LD Structured Data */}
      <SEOMeta />

      {/* Subtle Gold Horizontal Scroll Progress Bar */}
      <ScrollProgressBar isVisible={true} />

      {/* Public Advertisement Announcement Bar (Only visible when approved & published) */}
      <PublicAdBanner />

      {/* Main Sticky Navbar (Desktop + Mobile Header) */}
      <Navbar
        currentSection={currentPage}
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={navigateToPage}
        onToggleDrawer={() => setIsDrawerOpen(true)}
        onOpenOptions={() => setIsOptionsOpen(true)}
      />

      {/* 3D WebGL Canvas Interactive Background */}
      <ThreeBackground />

      {/* Main Content: Homepage contains ONLY Home, About, and Contact. Other sections are on distinct pages! */}
      <main className="relative z-10 min-h-[calc(100vh-80px)] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.96, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.025, y: -12, filter: "blur(3px)" }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full transform-gpu origin-top"
          >
            {currentPage === "home" && (
              <div className="space-y-0">
                {/* 1. Hero Experience (Home) */}
            <HeroSection
              onOpenAudit={() => setIsAuditOpen(true)}
              onExploreServices={() => navigateToPage("services")}
              onViewPortfolio={() => navigateToPage("portfolio")}
              onStartProject={() => navigateToPage("contact")}
              onBookConsultation={() => navigateToPage("contact")}
            />

            {/* 2. About Section */}
            <AboutSection />

            {/* 3. Direct Contact Desk */}
            <ContactSection initialService={selectedServiceForContact} />
          </div>
        )}

        {/* DEDICATED ABOUT PAGE */}
        {currentPage === "about" && (
          <DedicatedPageLayout
            pageId="about"
            pageTitle="About Puhayt Digital"
            pageSubtitle="Elite team of senior digital architects, brand designers, SEO directors, and AI engineers crafting high-performing digital engines."
            badgeText="Executive Team & Mission"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <AboutSection />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED SERVICES PAGE */}
        {currentPage === "services" && (
          <DedicatedPageLayout
            pageId="services"
            pageTitle="Digital Services & Engineering"
            pageSubtitle="High-performance 3D interactive web development, technical SEO, and algorithmic ad campaigns."
            badgeText="12 Core Capabilities"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <ServicesSection onSelectService={handleSelectService} />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED KOLKATA HQ PAGE */}
        {currentPage === "kolkata-geo" && (
          <DedicatedPageLayout
            pageId="kolkata-geo"
            pageTitle="Kolkata Headquarters & Local Dominance"
            pageSubtitle="Salt Lake Sector V technology hub commanding search engine visibility and high-ROI client acquisitions."
            badgeText="#1 Ranked in Kolkata"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <KolkataGeoSection onNavigateToContact={() => navigateToPage("contact")} />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED PORTFOLIO PAGE */}
        {currentPage === "portfolio" && (
          <DedicatedPageLayout
            pageId="portfolio"
            pageTitle="Verified Client Portfolio"
            pageSubtitle="Real client case studies, live production websites, performance metrics, and measured business growth."
            badgeText="Measured Projects"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <PortfolioSection />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED CASE STUDIES PAGE */}
        {currentPage === "case-studies" && (
          <DedicatedPageLayout
            pageId="case-studies"
            pageTitle="Client Case Studies & Verified Metrics"
            pageSubtitle="Measured business transformations, sub-second web engineering, conversion spikes, and programmatic growth."
            badgeText="Verified ROI Data"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <PortfolioSection />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED INDUSTRIES PAGE */}
        {currentPage === "industries" && (
          <DedicatedPageLayout
            pageId="industries"
            pageTitle="Industries & Sectors We Scale"
            pageSubtitle="Specialized digital solutions for E-Commerce, Real Estate, Healthcare Clinics, SaaS, and Hospitality."
            badgeText="Sector Solutions"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <IndustriesSection />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED AI SUITE PAGE */}
        {currentPage === "ai-suite" && (
          <DedicatedPageLayout
            pageId="ai-suite"
            pageTitle="Puhayt AI Marketing Suite"
            pageSubtitle="Autonomous lead qualification, 24/7 calendar booking agents, and AI marketing pipelines."
            badgeText="Gemini Powered"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <AISuiteSection />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED PRICING PAGE */}
        {currentPage === "pricing" && (
          <DedicatedPageLayout
            pageId="pricing"
            pageTitle="Transparent Pricing & Retainers"
            pageSubtitle="Predictable monthly and annual growth retainers with zero hidden fees and clear ROI targets."
            badgeText="ROI Guarantee"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <PricingSection onSelectPlan={(planName) => handleSelectService("Pricing Plan: " + planName)} />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED TESTIMONIALS / REVIEWS PAGE */}
        {currentPage === "testimonials" && (
          <DedicatedPageLayout
            pageId="testimonials"
            pageTitle="Client Reviews & Trust"
            pageSubtitle="Verified 5.0 star reviews and testimonials from business owners, managing directors, and founders."
            badgeText="5.0 Star Ratings"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <TestimonialsSection />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED BLOG PAGE */}
        {currentPage === "blog" && (
          <DedicatedPageLayout
            pageId="blog"
            pageTitle="Tech & Growth Insights"
            pageSubtitle="Actionable insights on technical SEO, high-converting web engineering, and digital growth."
            badgeText="Strategy Dispatch"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <BlogSection />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED DIRECT CONTACT PAGE */}
        {currentPage === "contact" && (
          <DedicatedPageLayout
            pageId="contact"
            pageTitle="Contact & Strategy Consultation"
            pageSubtitle="Connect directly with our agency leaders in Salt Lake Sector V, Kolkata or book a digital strategy session."
            badgeText="Direct Inquiries"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <ContactSection initialService={selectedServiceForContact} />
          </DedicatedPageLayout>
        )}

        {/* DEDICATED CLIENT PORTAL PAGE */}
        {currentPage === "client-portal" && (
          <DedicatedPageLayout
            pageId="client-portal"
            pageTitle="Client Portal & Deliverables"
            pageSubtitle="Real-time access to production builds, live sprint deliverables, invoices, and direct messaging with your project manager."
            badgeText="Secure Client Access"
            onNavigateHome={() => navigateToPage("home")}
            onNavigateToContact={() => navigateToPage("contact")}
            onOpenAudit={() => setIsAuditOpen(true)}
            onNavigate={navigateToPage}
          >
            <ClientPortal embedded={true} />
          </DedicatedPageLayout>
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateToPage} />

      {/* Luxury Slide-over Drawer Panel */}
      <MobileSlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentSection={currentPage}
        onNavigate={navigateToPage}
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAISuite={() => navigateToPage("ai-suite")}
        onOpenOptions={() => setIsOptionsOpen(true)}
      />

      {/* Google Stitch Quick Options & Visual Hierarchical Sitemap Modal */}
      <GoogleStitchOptionsModal
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        onNavigate={navigateToPage}
        onOpenAudit={() => setIsAuditOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Interactive Modals */}
      <FreeAuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={navigateToPage}
      />

      {/* DevMode Settings Control Center */}
      <DevModeModal />

      {/* Client Checkout Payment Modal */}
      <PaymentModal />

      {/* Firebase Authentication Modal (Google, Email, Phone, Guest) */}
      <AuthModal />

      {/* Secure Client Dashboard (Shows after authentication) */}
      <ClientDashboard
        isOpen={isClientDashboardOpen}
        onClose={closeClientDashboard}
      />

    </div>
  );
}

export function App() {
  return (
    <AgencyProvider>
      <MainAppContent />
    </AgencyProvider>
  );
}

export default App;

