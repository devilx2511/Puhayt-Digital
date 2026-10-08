import fs from "fs";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";
import { SITE_CONFIG, PAGE_SEO_MAP, generateSchemaJsonLd } from "../src/config/siteConfig";

async function prerender() {
  const distDir = path.resolve(process.cwd(), "dist");
  const indexHtmlPath = path.join(distDir, "index.html");
  const assetsDir = path.join(distDir, "assets");

  if (!fs.existsSync(indexHtmlPath)) {
    console.error("dist/index.html not found, skipping prerender.");
    process.exit(1);
  }

  let baseShellHtml = fs.readFileSync(indexHtmlPath, "utf-8");

  // 1. Inline compiled CSS asset into <head> and remove render-blocking <link rel="stylesheet">
  const cssLinkRegex = /<link\s+rel="stylesheet"[^>]*href="\/assets\/(index-[^"]+\.css)"[^>]*>/i;
  const cssMatch = baseShellHtml.match(cssLinkRegex);
  if (cssMatch) {
    const cssFileName = cssMatch[1];
    const cssFilePath = path.join(assetsDir, cssFileName);
    if (fs.existsSync(cssFilePath)) {
      const cssContent = fs.readFileSync(cssFilePath, "utf-8");
      baseShellHtml = baseShellHtml.replace(
        cssMatch[0],
        `<style id="inline-app-css">${cssContent}</style>`
      );
      console.log(`✅ Inlined ${cssFileName} (${cssContent.length} bytes) into HTML shell`);
    }
  }

  // 2. Remove <link rel="modulepreload"> tags so deferred chunks are not fetched on cold load
  baseShellHtml = baseShellHtml.replace(/<link\s+rel="modulepreload"[^>]*>\s*/gi, "");

  // 3. Inline the tiny entry script (dist/assets/index-*.js) at the end of <body> after #root
  const scriptRegex = /<script\s+type="module"\s+crossorigin\s+src="\/assets\/(index-[^"]+\.js)"><\/script>\s*/i;
  const scriptMatch = baseShellHtml.match(scriptRegex);
  if (scriptMatch) {
    const jsFileName = scriptMatch[1];
    const jsFilePath = path.join(assetsDir, jsFileName);
    if (fs.existsSync(jsFilePath)) {
      let jsContent = fs.readFileSync(jsFilePath, "utf-8");
      jsContent = jsContent.replace(/\/\/# sourceMappingURL=.*$/gm, "").trim();
      jsContent = jsContent
        .replace(/from\s*["']\.\/([^"']+)["']/g, 'from"/assets/$1"')
        .replace(/import\(["']\.\/([^"']+)["']\)/g, 'import("/assets/$1")');

      baseShellHtml = baseShellHtml.replace(scriptMatch[0], "");
      baseShellHtml = baseShellHtml.replace(
        /<\/body>/i,
        `<script type="module">${jsContent}</script></body>`
      );
      console.log(`✅ Inlined ${jsFileName} (${jsContent.length} bytes) at end of <body>`);
    }
  }

  // 4. Render Home route of <App initialPage="home" /> via react-dom/server and inject full Home JSON-LD
  const homeSsrHtml = renderToString(
    <React.StrictMode>
      <App initialPage="home" />
    </React.StrictMode>
  );
  const homeSchemas = generateSchemaJsonLd(SITE_CONFIG, "home");
  const homeJsonLd = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": homeSchemas.map(({ "@context": _ctx, ...rest }: any) => rest),
    },
    null,
    2
  );

  const homeHtml = baseShellHtml
    .replace(/<div id="root"><\/div>/, `<div id="root">${homeSsrHtml}</div>`)
    .replace(
      /<script id="puhayt-schema-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script id="puhayt-schema-jsonld" type="application/ld+json">\n${homeJsonLd}\n    </script>`
    );

  fs.writeFileSync(indexHtmlPath, homeHtml, "utf-8");
  console.log(`🚀 Pre-rendered dist/index.html (${homeHtml.length} bytes total)`);

  // 5. Generate dedicated pre-rendered static HTML files with route-specific SSR body HTML, meta tags & JSON-LD for every SEO route
  for (const [routeKey, pageSeo] of Object.entries(PAGE_SEO_MAP)) {
    if (routeKey === "home" || routeKey === "not-found") continue;
    const routeDir = path.join(distDir, routeKey);
    fs.mkdirSync(routeDir, { recursive: true });

    const routeSsrHtml = renderToString(
      <React.StrictMode>
        <App initialPage={routeKey} />
      </React.StrictMode>
    );

    const canonicalUrl = `${SITE_CONFIG.siteUrl}/${routeKey}`;
    const keywordsStr = pageSeo.keywords.join(", ");
    const robotsDirective = pageSeo.noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
    const routeSchemas = generateSchemaJsonLd(SITE_CONFIG, routeKey);
    const routeJsonLd = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@graph": routeSchemas.map(({ "@context": _ctx, ...rest }: any) => rest),
      },
      null,
      2
    );

    const routeHtml = baseShellHtml
      .replace(/<div id="root"><\/div>/, `<div id="root">${routeSsrHtml}</div>`)
      .replace(/<title>[\s\S]*?<\/title>/i, `<title>${pageSeo.title}</title>`)
      .replace(
        /<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="title" content="${pageSeo.title}" />`
      )
      .replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="description" content="${pageSeo.description}" />`
      )
      .replace(
        /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="keywords" content="${keywordsStr}" />`
      )
      .replace(
        /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="robots" content="${robotsDirective}" />`
      )
      .replace(
        /<meta\s+name="googlebot"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="googlebot" content="${robotsDirective}" />`
      )
      .replace(
        /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
        `<link rel="canonical" href="${canonicalUrl}" />`
      )
      .replace(
        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:title" content="${pageSeo.title}" />`
      )
      .replace(
        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:description" content="${pageSeo.description}" />`
      )
      .replace(
        /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
        `<meta property="og:url" content="${canonicalUrl}" />`
      )
      .replace(
        /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:title" content="${pageSeo.title}" />`
      )
      .replace(
        /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
        `<meta name="twitter:description" content="${pageSeo.description}" />`
      )
      .replace(
        /<script id="puhayt-schema-jsonld" type="application\/ld\+json">[\s\S]*?<\/script>/i,
        `<script id="puhayt-schema-jsonld" type="application/ld+json">\n${routeJsonLd}\n    </script>`
      );

    fs.writeFileSync(path.join(routeDir, "index.html"), routeHtml, "utf-8");
    console.log(`✅ Pre-rendered route dist/${routeKey}/index.html (${routeHtml.length} bytes)`);
  }
}

prerender().catch((err) => {
  console.error("Prerender error:", err);
  process.exit(1);
});
