import React, { useState, useEffect, lazy, Suspense } from "react";
import { AgencyProvider, useAgency } from "./context/AgencyContext";
import { SEOMeta } from "./components/SEO/SEOMeta";
import { PublicAdBanner } from "./components/PublicAdBanner";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { GeoPillarHubSection } from "./components/GeoPillarHubSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { DedicatedPageLayout } from "./components/DedicatedPageLayout";
import { ServicesSection } from "./components/ServicesSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { IndustriesSection } from "./components/IndustriesSection";
import { AISuiteSection } from "./components/AISuiteSection";
import { BlogSection } from "./components/BlogSection";
import { KolkataGeoSection } from "./components/KolkataGeoSection";
import { ReferralDiscountsSection } from "./components/ReferralDiscountsSection";
import { OffPageSeoSection } from "./components/OffPageSeoSection";

// Code-Split Authenticated & Interactive Views (Downloaded only when opened)
const ClientPortal = lazy(() =>
  import("./components/ClientPortal").then((m) => ({ default: m.ClientPortal }))
);

// Code-Split Interactive Modals & Drawers (Downloaded & mounted only when opened)
const MobileSlideDrawer = lazy(() =>
  import("./components/MobileSlideDrawer").then((m) => ({ default: m.MobileSlideDrawer }))
);
const GoogleStitchOptionsModal = lazy(() =>
  import("./components/GoogleStitchOptionsModal").then((m) => ({ default: m.GoogleStitchOptionsModal }))
);
const FreeAuditModal = lazy(() =>
  import("./components/FreeAuditModal").then((m) => ({ default: m.FreeAuditModal }))
);
const SearchModal = lazy(() =>
  import("./components/SearchModal").then((m) => ({ default: m.SearchModal }))
);
const DevModeModal = lazy(() =>
  import("./components/DevMode/DevModeModal").then((m) => ({ default: m.DevModeModal }))
);
const PaymentModal = lazy(() =>
  import("./components/PaymentModal").then((m) => ({ default: m.PaymentModal }))
);
const AuthModal = lazy(() =>
  import("./components/AuthModal").then((m) => ({ default: m.AuthModal }))
);
const ClientDashboard = lazy(() =>
  import("./components/ClientDashboard").then((m) => ({ default: m.ClientDashboard }))
);

const VALID_PUBLIC_AND_APP_PAGES = [
  "about",
  "services",
  "kolkata-geo",
  "portfolio",
  "referrals",
  "case-studies",
  "industries",
  "ai-suite",
  "pricing",
  "testimonials",
  "reviews",
  "blog",
  "contact",
  "client-portal",
  "off-page-seo",
  "backlinks",
];

function resolveInitialPage(initialPageProp?: string): string {
  if (initialPageProp) {
    const clean = initialPageProp.replace(/^#?\/+|\/+$/g, "").toLowerCase();
    if (!clean || clean === "home" || clean === "index.html") return "home";
    if (clean === "reviews") return "testimonials";
    if (clean === "case-studies") return "portfolio";
    if (clean === "pricing") return "referrals";
    if (clean === "backlinks") return "off-page-seo";
    if (VALID_PUBLIC_AND_APP_PAGES.includes(clean)) return clean;
    return "not-found";
  }

  if (typeof window !== "undefined") {
    const hash = window.location.hash.replace(/^#\/?/, "").toLowerCase();
    const pathname = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("openWebsite")) {
      return "portfolio";
    }
    const target = hash || pathname;
    if (!target || target === "home" || target === "index.html") {
      return "home";
    }
    if (VALID_PUBLIC_AND_APP_PAGES.includes(target)) {
      if (target === "reviews") return "testimonials";
      if (target === "case-studies") return "portfolio";
      if (target === "pricing") return "referrals";
      if (target === "backlinks") return "off-page-seo";
      return target;
    }
    return "not-found";
  }

  return "home";
}

function MainAppContent({ initialPage }: { initialPage?: string }) {
  const {
    currentUser,
    openAuthModal,
    openDevMode,
    isDevModeOpen,
    isPaymentModalOpen,
    isAuthModalOpen,
    isClientDashboardOpen,
    closeClientDashboard,
  } = useAgency();

  // Secret DevMode Keyboard Shortcut (Ctrl+Shift+D or Cmd+Shift+D)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        openDevMode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openDevMode]);

  const [appStage, setAppStage] = useState<"opening" | "loading" | "auth" | "homepage">("homepage");

  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>(() => resolveInitialPage(initialPage));
  const [selectedServiceForContact, setSelectedServiceForContact] = useState("");

  // Hash & Pathname router sync across all devices and search crawlers
  useEffect(() => {
    const syncRouteWithPage = () => {
      setCurrentPage(resolveInitialPage());
    };

    syncRouteWithPage();
    window.addEventListener("hashchange", syncRouteWithPage);
    window.addEventListener("popstate", syncRouteWithPage);
    return () => {
      window.removeEventListener("hashchange", syncRouteWithPage);
      window.removeEventListener("popstate", syncRouteWithPage);
    };
  }, []);

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
      if (typeof window !== "undefined") {
        window.history.pushState({}, "", "/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const cleanTarget =
      target === "reviews"
        ? "testimonials"
        : target === "case-studies"
        ? "portfolio"
        : target === "pricing"
        ? "referrals"
        : target === "backlinks"
        ? "off-page-seo"
        : target;
    setCurrentPage(cleanTarget);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `/${cleanTarget}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForContact(serviceName);
    navigateToPage("contact");
  };

  return (
    <div className="min-h-[100dvh] w-full max-w-[100vw] bg-[#0B0B0B] text-white font-sans selection:bg-[#D4AF37] selection:text-[#0B0B0B] relative overflow-x-clip">
      {/* Keyboard Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-[#D4AF37] focus:text-black focus:font-bold focus:text-xs"
      >
        Skip to main content
      </a>

      {/* Dynamic Per-Page SEO Meta & JSON-LD Structured Data */}
      <SEOMeta pageId={currentPage} />

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

      {/* Main Content */}
      <main id="main-content" className="relative z-10 min-h-[calc(100dvh-76px)] w-full overflow-x-clip">
        {currentPage === "home" && (
          <div className="space-y-0">
            {/* 1. Hero Experience (Home) */}
            <HeroSection
              onOpenAudit={() => setIsAuditOpen(true)}
              onExploreServices={() => navigateToPage("services")}
              onViewPortfolio={() => navigateToPage("portfolio")}
              onStartProject={() => navigateToPage("contact")}
              onBookConsultation={() => navigateToPage("contact")}
              onNavigate={navigateToPage}
            />

            {/* 2. About Section */}
            <AboutSection />

            {/* 3. Comprehensive 6-Pillar SEO & GEO Topical Authority Hub */}
            <GeoPillarHubSection onNavigate={navigateToPage} />

            {/* 4. Real Public Client Reviews (Google Maps & Play Store Style) */}
            <TestimonialsSection />

            {/* 5. Direct Contact Desk */}
            <ContactSection initialService={selectedServiceForContact} />
          </div>
        )}

        {currentPage !== "home" && (
          <Suspense fallback={<div className="min-h-[60vh] bg-[#0B0B0B]" aria-hidden="true" />}>
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

            {/* DEDICATED KOLKATA BASE & CLIENT PREMISES PAGE */}
            {currentPage === "kolkata-geo" && (
              <DedicatedPageLayout
                pageId="kolkata-geo"
                pageTitle="Kolkata Operations & Client Premises Meetings"
                pageSubtitle="We still lack our first commercial office, so we travel directly to your premises across Kolkata for in-person strategy sessions."
                badgeText="#1 Ranked in Kolkata"
                onNavigateHome={() => navigateToPage("home")}
                onNavigateToContact={() => navigateToPage("contact")}
                onOpenAudit={() => setIsAuditOpen(true)}
                onNavigate={navigateToPage}
              >
                <KolkataGeoSection onNavigateToContact={() => navigateToPage("contact")} />
              </DedicatedPageLayout>
            )}

            {/* DEDICATED REFERRALS & SPECIAL OFFERS PAGE */}
            {currentPage === "referrals" && (
              <DedicatedPageLayout
                pageId="referrals"
                pageTitle="Special Discounts & Dynamic Referrals"
                pageSubtitle="Claim active promotional discounts or share your unique WhatsApp referral code to unlock mutual growth rewards."
                badgeText="Discounts & Rewards"
                onNavigateHome={() => navigateToPage("home")}
                onNavigateToContact={() => navigateToPage("contact")}
                onOpenAudit={() => setIsAuditOpen(true)}
                onNavigate={navigateToPage}
              >
                <ReferralDiscountsSection onNavigateToContact={() => navigateToPage("contact")} />
              </DedicatedPageLayout>
            )}

            {/* DEDICATED PORTFOLIO PAGE */}
            {(currentPage === "portfolio" || currentPage === "case-studies") && (
              <DedicatedPageLayout
                pageId="portfolio"
                pageTitle="Verified Client Portfolio"
                pageSubtitle="Real client work, live production websites, performance metrics, and measured business growth."
                badgeText="Verified Work"
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

            {/* REDIRECT PRICING TO REFERRALS & DISCOUNTS */}
            {currentPage === "pricing" && (
              <DedicatedPageLayout
                pageId="referrals"
                pageTitle="Special Discounts & Referral Rewards"
                pageSubtitle="Active promotional packages for custom 3D web design and technical SEO, plus shareable referral rewards."
                badgeText="Promotional Offers"
                onNavigateHome={() => navigateToPage("home")}
                onNavigateToContact={() => navigateToPage("contact")}
                onOpenAudit={() => setIsAuditOpen(true)}
                onNavigate={navigateToPage}
              >
                <ReferralDiscountsSection onNavigateToContact={() => navigateToPage("contact")} />
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

            {/* DEDICATED OFF-PAGE SEO & BACKLINK AUTHORITY PAGE */}
            {(currentPage === "off-page-seo" || currentPage === "backlinks") && (
              <DedicatedPageLayout
                pageId="off-page-seo"
                pageTitle="Off-Page SEO, High-DA Backlinks & Digital PR Hub"
                pageSubtitle="Verified DoFollow referring domains, embeddable partner attribution badges, 100% standardized NAP citations, and Penguin-safe anchor text profiles."
                badgeText="Off-Page Authority & Backlinks"
                onNavigateHome={() => navigateToPage("home")}
                onNavigateToContact={() => navigateToPage("contact")}
                onOpenAudit={() => setIsAuditOpen(true)}
                onNavigate={navigateToPage}
              >
                <OffPageSeoSection />
              </DedicatedPageLayout>
            )}

            {/* 404 NOT FOUND VIEW */}
            {currentPage === "not-found" && (
              <div className="pt-28 pb-20 max-w-4xl mx-auto px-4 text-center space-y-6">
                <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-wider">
                  HTTP 404 • Page Not Found
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
                  The Requested Page Could Not Be Found
                </h1>
                <p className="text-neutral-300 text-sm max-w-xl mx-auto leading-relaxed">
                  The URL you visited does not match an active page on Puhayt Digital. Use the links below to explore our SEO, GEO, Website Building, Web Design, Domain &amp; Hosting, or Digital Marketing services.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage("home");
                    }}
                    className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs"
                  >
                    Return to Home
                  </a>
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage("services");
                    }}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-xs"
                  >
                    Explore All Services
                  </a>
                  <a
                    href="/kolkata-geo"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage("kolkata-geo");
                    }}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#FFDF73] border border-[#D4AF37]/30 font-semibold text-xs"
                  >
                    SEO &amp; GEO Authority Hub
                  </a>
                  <a
                    href="/portfolio"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage("portfolio");
                    }}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-xs"
                  >
                    Live Client Portfolio
                  </a>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage("contact");
                    }}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-xs"
                  >
                    Contact Founders
                  </a>
                </div>
              </div>
            )}
          </Suspense>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateToPage} />

      {/* On-Demand Code-Split Modals & Drawers */}
      <Suspense fallback={null}>
        {isDrawerOpen && (
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
        )}

        {isOptionsOpen && (
          <GoogleStitchOptionsModal
            isOpen={isOptionsOpen}
            onClose={() => setIsOptionsOpen(false)}
            onNavigate={navigateToPage}
            onOpenAudit={() => setIsAuditOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {isAuditOpen && (
          <FreeAuditModal
            isOpen={isAuditOpen}
            onClose={() => setIsAuditOpen(false)}
          />
        )}

        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onNavigate={navigateToPage}
          />
        )}

        {isDevModeOpen && <DevModeModal />}

        {isPaymentModalOpen && <PaymentModal />}

        {isAuthModalOpen && <AuthModal />}

        {isClientDashboardOpen && (
          <ClientDashboard
            isOpen={isClientDashboardOpen}
            onClose={closeClientDashboard}
          />
        )}
      </Suspense>
    </div>
  );
}

export function App({ initialPage }: { initialPage?: string } = {}) {
  return (
    <AgencyProvider>
      <MainAppContent initialPage={initialPage} />
    </AgencyProvider>
  );
}

export default App;
