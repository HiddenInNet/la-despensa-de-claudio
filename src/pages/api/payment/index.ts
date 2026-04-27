import type { APIRoute } from "astro";
import { Resend } from "resend";
import { mailHTML } from "./mail.body";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const cartItems = body.items;

    if (!cartItems || cartItems.length === 0) {
        return new Response(JSON.stringify({ error: "El carrito está vacío" }), { status: 400 });
    }

    const emailContent = mailHTML(cartItems);

    const { error } = await resend.emails.send({
      from: "La Despensa de Claudio <onboarding@resend.dev>",
      to: "dgongar3112@gmail.com",
      replyTo: "dgongar3112@gmail.com",
      subject: `NUEVO PEDIDO - La Despensa de Claudio`,
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