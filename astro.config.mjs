// @ts-check
import { defineConfig } from "astro/config";

// SITE and BASE_PATH are set automatically by the GitHub Pages workflow.
export default defineConfig({
  site: process.env.SITE || "https://example.com",
  base: process.env.BASE_PATH || "/",
  trailingSlash: "ignore",
});
