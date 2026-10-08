// WebMCP (Model Context Protocol for Web / Agentic Browsing) Registration
// Exposes structured agency tools to browser-based AI agents and Lighthouse 13.5+ Agentic Browsing audits.

export function registerWebMCPTools(): void {
  if (typeof window === "undefined" || typeof navigator === "undefined") return;

  const nav = navigator as any;
  const mc = nav.modelContext || nav.modelContextTesting;
  if (!mc || typeof mc.registerTool !== "function") return;

  try {
    mc.registerTool({
      name: "submit_strategy_inquiry",
      description:
        "Submit a digital marketing, bespoke 3D website development, technical SEO, or Google/Meta Ads inquiry to Puhayt Digital.",
      inputSchema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Client full name",
          },
          email: {
            type: "string",
            description: "Client corporate or personal email address",
          },
          phone: {
            type: "string",
            description: "Client phone or WhatsApp number",
          },
          company: {
            type: "string",
            description: "Company or brand name",
          },
          service: {
            type: "string",
            description: "Primary digital capability needed",
          },
          budget: {
            type: "string",
            description: "Target monthly marketing or web budget",
          },
          message: {
            type: "string",
            description: "Project goals, timeline, and requirements",
          },
        },
        required: ["name", "email"],
      },
      async execute(input: Record<string, any>) {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        return await res.json();
      },
    });

    mc.registerTool({
      name: "subscribe_newsletter",
      description:
        "Subscribe an email address to the Puhayt Digital weekly growth and technical SEO strategy newsletter.",
      inputSchema: {
        type: "object",
        properties: {
          newsletterEmail: {
            type: "string",
            description: "Subscriber email address",
          },
        },
        required: ["newsletterEmail"],
      },
      async execute(input: { newsletterEmail: string }) {
        return {
          success: true,
          subscribedEmail: input.newsletterEmail,
          message: "Subscribed to Puhayt Digital weekly strategy teardowns.",
        };
      },
    });

    mc.registerTool({
      name: "query_puhayt_geo_knowledge",
      description:
        "Query verified Generative Engine Optimization (GEO) facts, quantitative ROI benchmarks, founders, and Kolkata hyper-local service corridors for Puhayt Digital.",
      inputSchema: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description:
              "Topic to query: 'summary', 'founders', 'benchmarks', 'kolkata_corridors', or 'case_studies'",
          },
        },
      },
      async execute() {
        const res = await fetch("/geo-knowledge-graph.json");
        return await res.json();
      },
    });
  } catch {
    // Ignore if browser WebMCP implementation restricts duplicate registration
  }
}
