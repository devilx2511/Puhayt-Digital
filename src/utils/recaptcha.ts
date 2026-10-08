export const RECAPTCHA_SITE_KEY = "6LePj9UtAAAAAC1nRT_ORs0b94_h2LDouwAP53nL";

declare global {
  interface Window {
    grecaptcha?: {
      enterprise?: {
        ready: (cb: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
      ready?: (cb: () => void) => void;
      execute?: (siteKey: string, options: { action: string }) => Promise<string>;
    };
    onSubmit?: (token: string) => void;
  }
}

let recaptchaLoadPromise: Promise<void> | null = null;

/**
 * Dynamically loads Google reCAPTCHA Enterprise on user interaction rather than blocking initial page load.
 */
export function loadRecaptchaScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha?.enterprise || window.grecaptcha?.execute) {
    return Promise.resolve();
  }
  if (recaptchaLoadPromise) return recaptchaLoadPromise;

  recaptchaLoadPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[src*="recaptcha/enterprise.js"]');
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });

  return recaptchaLoadPromise;
}

/**
 * Executes Google reCAPTCHA Enterprise with the registered site key.
 * Returns the assessment token string or null if unavailable.
 */
export async function executeRecaptcha(action: string = "submit"): Promise<string | null> {
  if (typeof window === "undefined") return null;

  await loadRecaptchaScript();

  return new Promise((resolve) => {
    const grecaptcha = window.grecaptcha;
    const client = grecaptcha?.enterprise || grecaptcha;

    if (!client || !client.execute) {
      resolve(null);
      return;
    }

    const timeoutId = setTimeout(() => resolve(null), 2500);

    try {
      client.ready(() => {
        client
          .execute(RECAPTCHA_SITE_KEY, { action })
          .then((token: string) => {
            clearTimeout(timeoutId);
            resolve(token);
          })
          .catch(() => {
            clearTimeout(timeoutId);
            resolve(null);
          });
      });
    } catch {
      clearTimeout(timeoutId);
      resolve(null);
    }
  });
}
