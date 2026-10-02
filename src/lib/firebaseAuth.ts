import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, handleFirestoreError, OperationType, cleanFirestoreData } from "./firebase";
import { UserProfile } from "../types";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Recaptcha Verifier instance reference
let recaptchaVerifierInstance: RecaptchaVerifier | null = null;

/**
 * Initialize or get ReCAPTCHA verifier for Phone Auth
 */
export function getOrCreateRecaptchaVerifier(containerId: string = "recaptcha-container"): RecaptchaVerifier {
  if (typeof window === "undefined") {
    throw new Error("Recaptcha can only be initialized in the browser.");
  }

  // Clear previous if DOM element changed
  if (recaptchaVerifierInstance) {
    try {
      recaptchaVerifierInstance.clear();
    } catch {
      // ignore
    }
  }

  recaptchaVerifierInstance = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {
      console.log("ReCAPTCHA verified successfully");
    },
    "expired-callback": () => {
      console.warn("ReCAPTCHA expired, please retry.");
    },
  });

  return recaptchaVerifierInstance;
}

/**
 * Helper to sync user profile into Firestore /users/{uid}
 */
export async function syncUserProfile(user: User, customDisplayName?: string): Promise<UserProfile> {
  const userRef = doc(db, "users", user.uid);
  let existingProfile: Partial<UserProfile> = {};

  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      existingProfile = snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn("Could not read user profile from Firestore, creating new one:", err);
  }

  const role: "client" | "vip" | "admin" | "guest" =
    existingProfile.role ||
    (user.email === "aayushcps0907@gmail.com" ? "admin" : user.isAnonymous ? "guest" : "client");

  let provider: "google" | "password" | "phone" | "anonymous" = "anonymous";
  if (user.isAnonymous) {
    provider = "anonymous";
  } else if (user.providerData && user.providerData.length > 0) {
    const pId = user.providerData[0].providerId;
    if (pId === "google.com") provider = "google";
    else if (pId === "phone") provider = "phone";
    else if (pId === "password") provider = "password";
  }

  const profile: UserProfile = {
    uid: user.uid,
    displayName:
      customDisplayName ||
      user.displayName ||
      existingProfile.displayName ||
      (user.isAnonymous ? "Guest Explorer" : user.email ? user.email.split("@")[0] : user.phoneNumber || "Client"),
    email: user.email || existingProfile.email || null,
    phoneNumber: user.phoneNumber || existingProfile.phoneNumber || null,
    photoURL: user.photoURL || existingProfile.photoURL || null,
    isAnonymous: user.isAnonymous,
    role,
    authProvider: provider,
    createdAt: existingProfile.createdAt || new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  try {
    await setDoc(userRef, cleanFirestoreData(profile), { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
  }

  return profile;
}

/**
 * 1. Google Popup Login
 */
export async function loginWithGoogle(): Promise<{ user: User; profile: UserProfile }> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const profile = await syncUserProfile(result.user);
    return { user: result.user, profile };
  } catch (error: any) {
    console.error("Google sign in failed:", error);
    throw new Error(error?.message || "Failed to sign in with Google.");
  }
}

/**
 * 2. Email & Password Login
 */
export async function loginWithEmail(email: string, pass: string): Promise<{ user: User; profile: UserProfile }> {
  try {
    const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
    const profile = await syncUserProfile(result.user);
    return { user: result.user, profile };
  } catch (error: any) {
    console.error("Email sign in failed:", error);
    let message = "Invalid email or password.";
    if (error.code === "auth/user-not-found") message = "No account found with this email.";
    else if (error.code === "auth/wrong-password") message = "Incorrect password.";
    else if (error.code === "auth/invalid-email") message = "Invalid email format.";
    else if (error.code === "auth/too-many-requests") message = "Too many attempts. Please wait a moment.";
    throw new Error(message);
  }
}

/**
 * 3. Email & Password Sign Up
 */
export async function registerWithEmail(name: string, email: string, pass: string): Promise<{ user: User; profile: UserProfile }> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (name.trim()) {
      await updateProfile(result.user, { displayName: name.trim() });
    }
    const profile = await syncUserProfile(result.user, name.trim());
    return { user: result.user, profile };
  } catch (error: any) {
    console.error("Registration failed:", error);
    let message = "Could not create account.";
    if (error.code === "auth/email-already-in-use") message = "An account with this email already exists.";
    else if (error.code === "auth/weak-password") message = "Password must be at least 6 characters.";
    else if (error.code === "auth/invalid-email") message = "Invalid email format.";
    throw new Error(message);
  }
}

/**
 * 4. Password Reset Email
 */
export async function sendPasswordReset(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email.trim());
  } catch (error: any) {
    console.error("Password reset failed:", error);
    throw new Error(error?.message || "Failed to send password reset email.");
  }
}

/**
 * 5. Instant Guest / Anonymous Login
 */
export async function loginAsGuest(guestName?: string): Promise<{ user: User; profile: UserProfile }> {
  try {
    const result = await signInAnonymously(auth);
    const name = guestName || `Guest_${Math.floor(1000 + Math.random() * 9000)}`;
    await updateProfile(result.user, { displayName: name });
    const profile = await syncUserProfile(result.user, name);
    return { user: result.user, profile };
  } catch (error: any) {
    console.error("Guest login failed:", error);
    throw new Error(error?.message || "Failed to log in as Guest.");
  }
}

/**
 * 6. Request Phone OTP Code
 */
export async function requestPhoneOtp(
  phoneNumber: string,
  containerId: string = "recaptcha-container"
): Promise<ConfirmationResult> {
  try {
    const verifier = getOrCreateRecaptchaVerifier(containerId);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber.trim(), verifier);
    return confirmationResult;
  } catch (error: any) {
    console.error("Phone OTP request failed:", error);
    if (recaptchaVerifierInstance) {
      try {
        recaptchaVerifierInstance.clear();
      } catch {
        // ignore
      }
      recaptchaVerifierInstance = null;
    }
    let message = "Failed to send SMS verification code.";
    if (error.code === "auth/invalid-phone-number") message = "Invalid phone number format. Please include country code (e.g. +91 9876543210).";
    else if (error.code === "auth/quota-exceeded") message = "SMS quota exceeded for today. Please try Email or Google login.";
    else if (error.code === "auth/captcha-check-failed") message = "ReCAPTCHA verification failed. Please try again.";
    throw new Error(message);
  }
}

/**
 * 7. Confirm Phone OTP Code
 */
export async function confirmPhoneOtp(
  confirmationResult: ConfirmationResult,
  otpCode: string
): Promise<{ user: User; profile: UserProfile }> {
  try {
    const result = await confirmationResult.confirm(otpCode.trim());
    const profile = await syncUserProfile(result.user);
    return { user: result.user, profile };
  } catch (error: any) {
    console.error("OTP confirmation failed:", error);
    let message = "Invalid verification code.";
    if (error.code === "auth/invalid-verification-code") message = "The entered OTP is incorrect. Please check and retry.";
    else if (error.code === "auth/code-expired") message = "This OTP code has expired. Please request a new one.";
    throw new Error(message);
  }
}

/**
 * 8. Log Out
 */
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Sign out failed:", error);
    throw new Error(error?.message || "Failed to sign out.");
  }
}

/**
 * Subscribe to Auth State Changes
 */
export function subscribeToAuth(callback: (user: User | null, profile: UserProfile | null) => void) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        let profile: UserProfile;
        if (userDoc.exists()) {
          profile = userDoc.data() as UserProfile;
        } else {
          profile = await syncUserProfile(firebaseUser);
        }
        callback(firebaseUser, profile);
      } catch {
        const fallbackProfile: UserProfile = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || (firebaseUser.isAnonymous ? "Guest Client" : "Client"),
          email: firebaseUser.email,
          phoneNumber: firebaseUser.phoneNumber,
          photoURL: firebaseUser.photoURL,
          isAnonymous: firebaseUser.isAnonymous,
          role: firebaseUser.email === "aayushcps0907@gmail.com" ? "admin" : firebaseUser.isAnonymous ? "guest" : "client",
          authProvider: firebaseUser.isAnonymous ? "anonymous" : "password",
        };
        callback(firebaseUser, fallbackProfile);
      }
    } else {
      callback(null, null);
    }
  });
}
