import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { SITE_URL } from "./src/lib/languages";

// Social crawlers need absolute image URLs and do not run JS, so the origin is
// injected into index.html at build time (same VITE_SITE_URL as the sitemap).
const siteUrl = (process.env.VITE_SITE_URL || SITE_URL).replace(/\/$/, "");
const siteUrlPlugin = () => ({
  name: "site-url-html",
  transformIndexHtml: (html: string) => html.replaceAll("__SITE_URL__", siteUrl),
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), siteUrlPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
