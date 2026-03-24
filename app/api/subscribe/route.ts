import { NextResponse } from "next/server";
import { Resend } from "resend";
console.log("API HIT");

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // 1️⃣ SANA GELEN MAIL
    await resend.emails.send({
      from: "Arvian <onboarding@resend.dev>",
      to: "seninmailin@gmail.com",
      subject: "New Subscriber",
      html: `<p>New email: ${email}</p>`,
    });

    // 2️⃣ KULLANICIYA GİDEN MAIL
    await resend.emails.send({
      from: "Arvian <onboarding@resend.dev>",
      to: email,
      subject: "You're on the list",
      html: `
        <div style="background:black;color:white;padding:40px;text-align:center;font-family:sans-serif;">
          <h2 style="font-weight:300;">Arvian Studio</h2>
          <p style="opacity:0.7;margin-top:20px;">
            You're now on the list.
          </p>
          <p style="opacity:0.5;margin-top:10px;">
            We’ll notify you when everything is ready.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}