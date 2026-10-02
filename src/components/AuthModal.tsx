import React, { useState, useEffect, useRef } from "react";
import { useAgency } from "../context/AgencyContext";
import {
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  sendPasswordReset,
  loginAsGuest,
  requestPhoneOtp,
  confirmPhoneOtp,
} from "../lib/firebaseAuth";
import { ConfirmationResult } from "firebase/auth";
import {
  X,
  Lock,
  Mail,
  Phone,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  RotateCw,
  Eye,
  EyeOff,
  Globe,
  LogIn,
  UserCheck,
} from "lucide-react";

const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA / Canada", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
];

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalTab, closeAuthModal, currentUser, userProfile } = useAgency();

  const [activeTab, setActiveTab] = useState<"google" | "email" | "phone" | "guest">("google");
  const [emailMode, setEmailMode] = useState<"signin" | "signup" | "forgot">("signin");

  // Email form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Phone form state
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [rawPhone, setRawPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [phoneStep, setPhoneStep] = useState<"enter-phone" | "enter-otp">("enter-phone");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  // Guest form state
  const [guestName, setGuestName] = useState("");

  // Loading & Error states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  // Sync tab with context trigger
  useEffect(() => {
    if (authModalTab) {
      setActiveTab(authModalTab);
    }
  }, [authModalTab]);

  // Reset errors when switching tab
  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [activeTab, emailMode, phoneStep]);

  // Timer for OTP resend countdown
  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  if (!isAuthModalOpen) return null;

  // 1. Handle Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { profile } = await loginWithGoogle();
      setSuccessMessage(`Welcome back, ${profile.displayName || "Client"}! 🎉`);
      setTimeout(() => {
        closeAuthModal();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Email Login / Signup / Forgot
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (emailMode === "forgot") {
      setLoading(true);
      try {
        await sendPasswordReset(email);
        setSuccessMessage("Password reset link sent to your email! Please check your inbox.");
      } catch (err: any) {
        setErrorMessage(err.message || "Could not send reset email.");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      if (emailMode === "signup") {
        const { profile } = await registerWithEmail(name, email, password);
        setSuccessMessage(`Account created! Welcome to Puhayt Digital, ${profile.displayName || "Client"} 🌟`);
      } else {
        const { profile } = await loginWithEmail(email, password);
        setSuccessMessage(`Welcome back, ${profile.displayName || "Client"}! 🚀`);
      }
      setTimeout(() => {
        closeAuthModal();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Phone Auth Request
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanNumber = rawPhone.replace(/[^0-9]/g, "");
    if (cleanNumber.length < 8) {
      setErrorMessage("Please enter a valid mobile phone number.");
      return;
    }

    const fullPhoneNumber = `${selectedCountryCode}${cleanNumber}`;
    setLoading(true);

    try {
      const confirmation = await requestPhoneOtp(fullPhoneNumber, "recaptcha-verifier-container");
      setConfirmationResult(confirmation);
      setPhoneStep("enter-otp");
      setResendTimer(60);
      setSuccessMessage(`SMS OTP verification code dispatched to ${fullPhoneNumber}`);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to send SMS code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Phone OTP Confirmation
  const handleConfirmOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!confirmationResult) {
      setErrorMessage("Session expired. Please request a new verification code.");
      setPhoneStep("enter-phone");
      return;
    }

    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMessage("Please enter the 6-digit verification code sent via SMS.");
      return;
    }

    setLoading(true);
    try {
      const { profile } = await confirmPhoneOtp(confirmationResult, otpCode.trim());
      setSuccessMessage(`Phone verified successfully! Logged in as ${profile.displayName || profile.phoneNumber}`);
      setTimeout(() => {
        closeAuthModal();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid OTP code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 5. Handle Guest Login
  const handleGuestLogin = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { profile } = await loginAsGuest(guestName.trim() || undefined);
      setSuccessMessage(`Guest session initialized as ${profile.displayName}! 🌟`);
      setTimeout(() => {
        closeAuthModal();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to start guest session.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="firebase-auth-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) closeAuthModal();
      }}
    >
      {/* Invisible container for Firebase Phone Auth reCAPTCHA */}
      <div id="recaptcha-verifier-container" ref={recaptchaContainerRef} className="hidden" />

      <div className="relative w-full max-w-lg bg-[#0E0C0A] border border-[#D4AF37]/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Glowing Top Ambient Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#8B6508]" />

        {/* Modal Header */}
        <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-white/10 bg-black/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#8B6508] p-[1.5px] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <div className="w-full h-full bg-[#0E0C0A] rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#FFDF73]" />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span>Client & Partner Sign-In</span>
                <span className="text-[10px] bg-[#FFDF73]/20 text-[#FFDF73] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  Firebase Auth
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Secure unified login for agency services, audits & account management
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            disabled={loading}
            aria-label="Close Authentication Modal"
            className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Method Navigation Tabs */}
        <div className="px-6 pt-4 pb-2 bg-[#120F0C] border-b border-white/5">
          <div className="grid grid-cols-4 gap-1 p-1 bg-black/60 rounded-2xl border border-white/10">
            
            {/* Google Tab */}
            <button
              onClick={() => setActiveTab("google")}
              disabled={loading}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "google"
                  ? "bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-sm">🌐</span>
              <span>Google</span>
            </button>

            {/* Email Tab */}
            <button
              onClick={() => setActiveTab("email")}
              disabled={loading}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "email"
                  ? "bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </button>

            {/* Phone Tab */}
            <button
              onClick={() => setActiveTab("phone")}
              disabled={loading}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "phone"
                  ? "bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phone</span>
            </button>

            {/* Guest Tab */}
            <button
              onClick={() => setActiveTab("guest")}
              disabled={loading}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "guest"
                  ? "bg-gradient-to-r from-[#FFDF73] to-[#D4AF37] text-black shadow-md font-bold"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Guest</span>
            </button>

          </div>
        </div>

        {/* Modal Body / Active Method Screen */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Notification / Feedback Alerts */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: GOOGLE ONE-CLICK SIGN IN */}
          {activeTab === "google" && (
            <div className="space-y-5 text-center py-3">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.9.7 5.5 1.9 7.9l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                  />
                </svg>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif text-lg font-bold text-white">
                  Continue with Google
                </h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Instant secure single sign-on with your Google Workspace or personal Gmail account.
                </p>
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-98 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <RotateCw className="w-4 h-4 animate-spin text-neutral-900" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.9.7 5.5 1.9 7.9l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                    />
                  </svg>
                )}
                <span>Sign in with Google</span>
              </button>

              <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFDF73]" />
                <span>Protected by Firebase Enterprise OAuth 2.0</span>
              </div>
            </div>
          )}

          {/* TAB 2: EMAIL & PASSWORD */}
          {activeTab === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {/* Toggle Sign In / Create Account */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setEmailMode("signin")}
                    className={`text-xs font-bold pb-1 transition-all ${
                      emailMode === "signin"
                        ? "text-[#FFDF73] border-b-2 border-[#FFDF73]"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailMode("signup")}
                    className={`text-xs font-bold pb-1 transition-all ${
                      emailMode === "signup"
                        ? "text-[#FFDF73] border-b-2 border-[#FFDF73]"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setEmailMode("forgot")}
                  className={`text-[11px] transition-all ${
                    emailMode === "forgot" ? "text-[#FFDF73] font-bold" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Full Name for Signup */}
              {emailMode === "signup" && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Full Name / Company Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alexander Wright"
                      required
                      className="w-full bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Work or Personal Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@luxurybrand.com"
                    required
                    className="w-full bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password Input (Hidden for Forgot Mode) */}
              {emailMode !== "forgot" && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-neutral-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {emailMode === "signup" && (
                    <p className="text-[10px] text-neutral-500">Minimum 6 characters with numbers & letters</p>
                  )}
                </div>
              )}

              {/* Action Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#8B6508] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <RotateCw className="w-4 h-4 animate-spin text-black" />
                ) : (
                  <LogIn className="w-4 h-4 text-black" />
                )}
                <span>
                  {emailMode === "signup"
                    ? "Create Account"
                    : emailMode === "forgot"
                    ? "Send Reset Link"
                    : "Sign In to Account"}
                </span>
              </button>
            </form>
          )}

          {/* TAB 3: PHONE NUMBER & OTP */}
          {activeTab === "phone" && (
            <div className="space-y-4">
              {phoneStep === "enter-phone" ? (
                <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      Mobile Phone Number
                    </label>
                    <div className="flex gap-2">
                      {/* Country Code Selector */}
                      <div className="relative shrink-0">
                        <select
                          value={selectedCountryCode}
                          onChange={(e) => setSelectedCountryCode(e.target.value)}
                          className="bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none appearance-none pr-7 cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code} className="bg-[#0E0C0A] text-white">
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <Globe className="w-3 h-3 text-neutral-400 absolute right-2 top-3.5 pointer-events-none" />
                      </div>

                      {/* Phone Digits Input */}
                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          value={rawPhone}
                          onChange={(e) => setRawPhone(e.target.value)}
                          placeholder="98765 43210"
                          required
                          className="w-full bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors font-mono"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-neutral-400">
                      We will send a 6-digit SMS verification code to your phone.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#8B6508] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <RotateCw className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-black" />
                    )}
                    <span>Send SMS Verification Code</span>
                  </button>
                </form>
              ) : (
                /* STEP 2: ENTER OTP */
                <form onSubmit={handleConfirmOtp} className="space-y-4">
                  <div className="p-3 rounded-2xl bg-[#FFDF73]/10 border border-[#FFDF73]/30 text-center space-y-1">
                    <span className="text-[11px] text-[#FFDF73] font-bold">SMS Code Sent To</span>
                    <p className="text-xs font-mono text-white font-bold">
                      {selectedCountryCode} {rawPhone}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-center">
                    <label className="text-xs font-semibold text-neutral-300">
                      Enter 6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="123456"
                      autoFocus
                      required
                      className="w-full text-center bg-black/80 border border-[#D4AF37] rounded-2xl py-3 text-lg font-mono tracking-[0.5em] text-[#FFDF73] focus:outline-none shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => setPhoneStep("enter-phone")}
                      className="text-neutral-400 hover:text-white underline"
                    >
                      Change Phone Number
                    </button>

                    {resendTimer > 0 ? (
                      <span className="text-neutral-500 text-[11px]">Resend in {resendTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendPhoneOtp}
                        className="text-[#FFDF73] hover:underline font-semibold text-[11px]"
                      >
                        Resend SMS Code
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.length < 6}
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FFDF73] via-[#D4AF37] to-[#8B6508] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <RotateCw className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-black" />
                    )}
                    <span>Verify & Access Account</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: GUEST / ANONYMOUS INSTANT ACCESS */}
          {activeTab === "guest" && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-[#FFDF73]/10 border border-[#FFDF73]/30 flex items-center justify-center mx-auto">
                <UserCheck className="w-7 h-7 text-[#FFDF73]" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-white">Instant Guest Preview</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  Explore full client dashboard, real-time website analyzers, and live ROI calculators without entering a password.
                </p>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-neutral-300">
                  Your Name or Brand Alias (Optional)
                </label>
                <div className="relative">
                  <Sparkles className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Skyline Ventures"
                    className="w-full bg-black/60 border border-white/15 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-[#1A140E] hover:bg-[#2A2015] border border-[#D4AF37]/50 text-[#FFDF73] font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <RotateCw className="w-4 h-4 animate-spin text-[#FFDF73]" />
                ) : (
                  <Sparkles className="w-4 h-4 text-[#FFDF73]" />
                )}
                <span>Launch Instant Guest Session</span>
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Security Badge */}
        <div className="px-6 py-3 bg-black/60 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-[#FFDF73]" />
            <span>256-bit TLS Encrypted Session</span>
          </div>
          <span className="font-mono text-[10px] text-neutral-400">Puhayt Auth v2.4</span>
        </div>

      </div>
    </div>
  );
};
