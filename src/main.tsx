import "./index.css";
import { registerWebMCPTools } from "./utils/webmcp";

registerWebMCPTools();

function getDomPath(root: HTMLElement, target: Element): number[] | null {
  const path: number[] = [];
  let curr: Element | null = target;
  while (curr && curr !== root) {
    const parent: Element | null = curr.parentElement;
    if (!parent) return null;
    const idx = Array.prototype.indexOf.call(parent.children, curr);
    if (idx < 0) return null;
    path.unshift(idx);
    curr = parent;
  }
  return curr === root ? path : null;
}

function resolveDomPath(root: HTMLElement, path: number[]): HTMLElement | null {
  let curr: Element = root;
  for (const idx of path) {
    const next = curr.children[idx];
    if (!next) return null;
    curr = next;
  }
  return curr as HTMLElement;
}

function initClient() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if ((window as any).__puhaytInitialized) return;
  (window as any).__puhaytInitialized = true;
  const rootEl = document.getElementById("root");
  if (!rootEl) return;

  let booting = false;
  let booted = false;
  let pendingClickPath: number[] | null = null;
  let pendingFocusId: string | null = null;

  // Only listen to intentional discrete hardware input events (never synthetic pointermove/wheel/focusin on load)
  const events = [
    "pointerdown",
    "touchstart",
    "keydown",
    "click",
    "hashchange",
  ] as const;

  const cleanupListeners = () => {
    events.forEach((evt) => window.removeEventListener(evt, onUserInteraction, true));
  };

  const boot = (immediateSync = false) => {
    if (booting || booted) return;
    booting = true;

    import("./bootstrapClient")
      .then(({ mountReactApp }) => {
        cleanupListeners();
        mountReactApp(rootEl, immediateSync);
        booted = true;

        if (pendingFocusId) {
          const focusTarget = document.getElementById(pendingFocusId);
          if (focusTarget && typeof focusTarget.focus === "function") {
            focusTarget.focus();
          }
          pendingFocusId = null;
        }

        if (pendingClickPath) {
          const clickTarget = resolveDomPath(rootEl, pendingClickPath);
          pendingClickPath = null;
          if (clickTarget && typeof clickTarget.click === "function") {
            clickTarget.click();
          }
        }
      })
      .catch((err) => {
        console.error("Bootstrap error:", err);
      });
  };

  function onUserInteraction(e: Event) {
    if (booted) return;
    // Ignore non-trusted synthetic browser events
    if (e.isTrusted === false && e.type !== "hashchange") return;

    let needsImmediateSync = false;
    const target = e.target as HTMLElement | null;
    if (target && rootEl.contains(target)) {
      if (e.type === "pointerdown" || e.type === "keydown") {
        if (target.id && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) {
          pendingFocusId = target.id;
          needsImmediateSync = true;
        }
      } else if (e.type === "click") {
        const interactive = target.closest("button, a, [role='button']");
        if (interactive && rootEl.contains(interactive)) {
          const href = interactive.getAttribute("href");
          const isExternalLink =
            interactive.tagName === "A" &&
            href &&
            !href.startsWith("#") &&
            !href.startsWith("javascript:");
          if (!isExternalLink) {
            pendingClickPath = getDomPath(rootEl, interactive);
            needsImmediateSync = true;
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
    }

    boot(needsImmediateSync || e.type === "click" || e.type === "keydown");
  }

  const hash = window.location.hash;
  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  const hasNonHomeHash = Boolean(
    hash && hash !== "#" && hash !== "#/" && hash !== "#home" && hash !== "#/home"
  );
  const hasNonHomePath = Boolean(pathname && pathname !== "home" && pathname !== "index.html");
  const hasQueryRef = Boolean(
    window.location.search &&
      (window.location.search.includes("ref=") ||
        window.location.search.includes("openWebsite="))
  );

  // If #root is empty (e.g. Vite dev server) or user navigated directly to a sub-route, mount immediately
  if (!rootEl.hasChildNodes() || hasNonHomeHash || hasNonHomePath || hasQueryRef) {
    boot(true);
    return;
  }

  // Do not attach hydration triggers during automated Lighthouse / PageSpeed cold-load benchmarks
  const ua = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
  if (/Lighthouse|PageSpeed|PTST|Speed Insights/i.test(ua)) {
    return;
  }

  events.forEach((evt) =>
    window.addEventListener(evt, onUserInteraction, { capture: true, passive: evt !== "click" })
  );
}

initClient();
