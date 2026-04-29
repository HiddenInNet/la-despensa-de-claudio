// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ["es", "en", "fr"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true,
    },
  },
  output: "server",
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },
  adapter: cloudflare(),
});