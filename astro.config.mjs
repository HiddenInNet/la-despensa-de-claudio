// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
    site: "https://www.ladespensadeclaudio.com",
    output: "server",
    build: {
        inlineStylesheets: "always",
    },
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            dedupe: ["preact", "preact/hooks", "@nanostores/preact"],
        },
        optimizeDeps: {
            include: ["preact", "preact/hooks", "preact/compat"],
            exclude: [
                "astro/assets/services/noop",
                "astro/virtual-modules/transitions.js",
            ],
        },
        ssr: {
            noExternal: ["preact", "@astrojs/preact"],
            external: ["node:buffer"],
        },
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
        //     enabled: true,
        // },
        imageService: "passthrough",
    }),
});
