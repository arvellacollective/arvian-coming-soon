import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    // ✅ Email validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // ✅ 1. ADMIN MAIL (SANA GELEN)
    await resend.emails.send({
      from: "Arvian <no-reply@arvianstudio.com>",
      to: "arvianstudio@gmail.com",
      subject: "New Subscriber",
      html: `<p>New email: ${email}</p>`,
    });

    // ✅ 2. USER MAIL (KULLANICIYA GİDEN)
    await resend.emails.send({
      from: "Arvian <no-reply@arvianstudio.com>",
      to: email,
      subject: "You're in.",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>You're on the list.</h2>
          <p>We’ll notify you when we launch.</p>
          <br/>
          <p style="opacity:0.6;">Arvian Studio</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}