import { Resend } from "resend";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;

  // Honeypot field. Real visitors leave this empty.
  website?: unknown;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO;
  const contactFrom =
    process.env.CONTACT_FROM ??
    "Birdbrain IT <onboarding@resend.dev>";

  if (!apiKey || !contactTo) {
    console.error("Missing RESEND_API_KEY or CONTACT_TO.");

    return Response.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as ContactPayload;

    // Silently accept likely bot submissions.
    if (
      typeof body.website === "string" &&
      body.website.trim().length > 0
    ) {
      return Response.json({ success: true });
    }

    if (
      typeof body.name !== "string" ||
      typeof body.email !== "string" ||
      typeof body.message !== "string"
    ) {
      return Response.json(
        { error: "Invalid form data." },
        { status: 400 },
      );
    }

    const name = body.name.replace(/[\r\n]/g, " ").trim();
    const email = body.email.trim().toLowerCase();
    const message = body.message.trim();

    if (
      name.length < 2 ||
      name.length > 100 ||
      email.length > 254 ||
      !emailPattern.test(email) ||
      message.length < 10 ||
      message.length > 5000
    ) {
      return Response.json(
        { error: "Please check the entered information." },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: contactFrom,
      to: [contactTo],

      // Clicking Reply will reply to the visitor.
      replyTo: email,

      subject: `Ny Birdbrain IT-förfrågan från ${name}`,

      text: [
        "Ny förfrågan via birdbrain.it",
        "",
        `Namn: ${name}`,
        `E-post: ${email}`,
        "",
        "Meddelande:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        { error: "The email could not be sent." },
        { status: 502 },
      );
    }

    return Response.json({
      success: true,
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}