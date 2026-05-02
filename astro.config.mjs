// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [preact()],
  i18n: {
    locales: ["es", "en", "fr"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true,
    },
  },

  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
    ],
  },

  adapter: cloudflare({
    // platformProxy: {
    //   enabled: true
    // },
    imageService: "passthrough",
  }),
});
