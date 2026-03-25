import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // 🔴 IMPORTANT: SEND TO YOURSELF FIRST
    const adminRes = await resend.emails.send({
      from: "Arvian <onboarding@resend.dev>",
      to: "arvianstudio@gmail.com",
      subject: "New Subscriber",
      html: `<p>New email: ${email}</p>`,
    });

    if (adminRes.error) {
      console.error("ADMIN MAIL ERROR:", adminRes.error);
      return NextResponse.json({ error: "Mail failed" }, { status: 500 });
    }

    // 🔴 USER MAIL (SAFE VERSION)
    // Sandbox'ta çalışması için geçici olarak kapatıyoruz
    // çünkü resend sandbox dış maili bloklayabilir

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}