import type { APIRoute } from "astro";
import { Resend } from "resend";
import { mailBodyFormatter } from "./mail.body";
import { bussiness_name } from "../../../docs/bussiness-data.json"
import type { ShopItem } from "../../../types/shop";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const cartItems: ShopItem[] = body.items;

    if (!cartItems || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "El carrito está vacío" }), { status: 400 });
    }

    const emailContent = await mailBodyFormatter(cartItems);

    const { error } = await resend.emails.send({
      from: `${bussiness_name} <onboarding@resend.dev>`,
      to: "dgongar3112@gmail.com",
      replyTo: "dgongar3112@gmail.com",
      subject: `NUEVO PEDIDO - ${bussiness_name}`,
      html: emailContent
    });

    if (error) {
      console.error("❌ Error de Resend:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(
      JSON.stringify({ success: "Mensaje enviado correctamente" }), { status: 200 }
    );
  } catch (error) {
    console.error("💥 ERROR FATAL EN EL ENDPOINT:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }), { status: 500 }
    );
  }
};