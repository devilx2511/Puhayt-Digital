import { startTransition } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import App from "./App.tsx";

let hasMounted = false;

function injectGoogleFonts() {
  if (typeof document === "undefined") return;
  if (document.getElementById("puhayt-google-fonts")) return;

  const link = document.createElement("link");
  link.id = "puhayt-google-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&display=optional";
  document.head.appendChild(link);
}

export function mountReactApp(rootEl: HTMLElement, immediateSync = false): void {
  if (hasMounted) return;
  hasMounted = true;

  injectGoogleFonts();

  if (immediateSync) {
    try {
      flushSync(() => {
        createRoot(rootEl).render(<App />);
      });
      return;
    } catch {
      // Fallback to concurrent render
    }
  }

  startTransition(() => {
    createRoot(rootEl).render(<App />);
  });
}
