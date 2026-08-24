import { Resend } from "resend";

import { getWebsitePackage } from "../../lib/packages";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  packageId?: unknown;

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
  const missingEnvironmentVariables = [
    !apiKey ? "RESEND_API_KEY" : null,
    !contactTo ? "CONTACT_TO" : null,
  ].filter((name): name is string => name !== null);

  if (!apiKey || !contactTo) {
    console.error(
      "Contact form is missing required environment variables:",
      missingEnvironmentVariables,
    );

    return Response.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch (error) {
    console.warn("Contact form received malformed JSON.", {
      errorType: error instanceof Error ? error.name : typeof error,
    });

    return Response.json(
      { error: "Invalid form data." },
      { status: 400 },
    );
  }

  try {

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
    const selectedPackage = getWebsitePackage(body.packageId);

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

      subject: selectedPackage
        ? `Ny ${selectedPackage.name.sv}-förfrågan från ${name}`
        : `Ny Birdbrain IT-förfrågan från ${name}`,

      text: [
        "Ny förfrågan via birdbrain.it",
        "",
        `Namn: ${name}`,
        `E-post: ${email}`,
        ...(selectedPackage ? [`Gäller: ${selectedPackage.name.sv}`] : []),
        "",
        "Meddelande:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend rejected a contact email.", {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });

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
    console.error("Unexpected contact form error.", {
      name: error instanceof Error ? error.name : typeof error,
      message: error instanceof Error ? error.message : "Unknown error",
    });

    return Response.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
