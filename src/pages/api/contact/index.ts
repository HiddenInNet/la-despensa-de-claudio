// src/pages/api/contacto.ts
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { mailHTML } from "./mail-body";
import BUS_DATA from "../../../docs/bussiness-data.json";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const email = data.get("email");
  const subject = data.get("subject");
  const message = data.get("message");

  if (!name || !email || !message || !subject) {
    return new Response(
      JSON.stringify({ error: "Faltan campos obligatorios" }),
      { status: 400 },
    );
  }

  const emailHtml = mailHTML(
    name.toString(),
    email.toString(),
    subject.toString(),
    message.toString(),
  );

  try {
    const { error } = await resend.emails.send({
      from: "La Despensa de Claudio <onboarding@resend.dev>",
      to: BUS_DATA.email,
      replyTo: email.toString(),
      subject: `CONTACTO: ${subject} - ${name}`,
      html: emailHtml,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ success: "Mensaje enviado correctamente" }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 },
    );
  }
};
