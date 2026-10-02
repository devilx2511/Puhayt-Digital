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

/**
 * Executes Google reCAPTCHA Enterprise with the registered site key.
 * Returns the assessment token string or null if unavailable.
 */
export async function executeRecaptcha(action: string = "submit"): Promise<string | null> {
  if (typeof window === "undefined") return null;

  return new Promise((resolve) => {
    const grecaptcha = window.grecaptcha;
    const client = grecaptcha?.enterprise || grecaptcha;

    if (!client || !client.execute) {
      console.warn("reCAPTCHA Enterprise script not loaded yet, proceeding gracefully.");
      resolve(null);
      return;
    }

    try {
      client.ready(() => {
        client
          .execute(RECAPTCHA_SITE_KEY, { action })
          .then((token: string) => {
            resolve(token);
          })
          .catch((err: unknown) => {
            console.warn("reCAPTCHA execution skipped or rejected:", err);
            resolve(null);
          });
      });
    } catch (e) {
      console.warn("reCAPTCHA ready call failed:", e);
      resolve(null);
    }
  });
}
