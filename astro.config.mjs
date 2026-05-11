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
        resolve: {
            dedupe: ["preact", "preact/hooks", "@nanostores/preact"],
        },
        optimizeDeps: {
            include: ["preact", "preact/hooks", "preact/compat"],
        },
        ssr: {
            noExternal: ["preact", "@astrojs/preact"],
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
