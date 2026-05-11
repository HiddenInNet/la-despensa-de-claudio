// src/pages/sitemap.xml.ts
import type { APIRoute } from "astro";
import { supabase } from "../db/supabase";
import type { ProductDetail } from "../types/products";

export const GET: APIRoute = async ({ site }) => {
    const { data: products, error } = await supabase
        .from("products")
        .select("*");

    if (error || !products) {
        return new Response("Error recuperando datos", { status: 500 });
    }

    // 2. Generar el XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${site}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${products
          .map(
              (p: ProductDetail) => `
        <url>
          <loc>${site}/es/products/${p.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `,
          )
          .join("")}
    </urlset>`.trim();

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
        },
    });
};
