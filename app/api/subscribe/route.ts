import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // =========================
    // 🔴 ADMIN MAIL
    // =========================
    await resend.emails.send({
      from: "Arvian <no-reply@arvianstudio.com>",
      to: ["arvianstudio@gmail.com"],
      subject: "Signal Received",
      html: `
        <div style="background:#030303;padding:60px;font-family:sans-serif;color:#fff;">
          <div style="max-width:520px;margin:0 auto;">
            
            <div style="font-size:11px;letter-spacing:3px;color:#555;margin-bottom:30px;">
              ARVIAN SYSTEM
            </div>

            <div style="font-size:26px;margin-bottom:20px;">
              New signal registered.
            </div>

            <div style="font-size:14px;color:#8a8a8a;margin-bottom:30px;">
              A new presence has entered the intake layer.<br/>
              Awaiting scene alignment.
            </div>

            <!-- 🔥 EMAIL BLOCK (CLICKABLE + NOT BLUE) -->
            <div style="
              background:#0a0a0a;
              padding:20px;
              border:1px solid rgba(255,255,255,0.05);
              font-size:13px;
              margin-bottom:30px;
              font-family:monospace;
            ">
              <a href="mailto:${email}" style="
                color:#eaeaea !important;
                text-decoration:none !important;
              ">
                <span style="color:#eaeaea !important;">
                  ${email}
                </span>
              </a>
            </div>

            <div style="font-size:11px;color:#444;">
              ${new Date().toLocaleString()}
            </div>

          </div>
        </div>
      `,
    });

    // küçük delay (stabilite)
    await new Promise((r) => setTimeout(r, 500));

    // =========================
    // 🔴 USER MAIL
    // =========================
    await resend.emails.send({
      from: "Arvian <no-reply@arvianstudio.com>",
      to: email,
      subject: "You're in.",
      html: `
        <div style="margin:0;padding:0;background:#030303;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:80px 20px;">
            <tr>
              <td align="center">
                <table width="100%" style="max-width:520px;">
                  
                  <!-- BRAND -->
                  <tr>
                    <td align="center" style="padding-bottom:40px;">
                      <div style="font-size:11px;letter-spacing:3px;color:#555;">
                        ARVIAN
                      </div>
                    </td>
                  </tr>

                  <!-- TITLE -->
                  <tr>
                    <td align="center" style="padding-bottom:24px;">
                      <div style="font-size:34px;color:#fff;">
                        You're in.
                      </div>
                    </td>
                  </tr>

                  <!-- TEXT -->
                  <tr>
                    <td align="center" style="padding-bottom:30px;">
                      <div style="font-size:16px;color:#9a9a9a;line-height:1.8;max-width:420px;">
                        Your presence has been registered.<br/>
                        <span style="color:#ffffff;">Not as data — but as form.</span>
                        <br/><br/>
                        This is where your image leaves the surface<br/>
                        and enters the scene.
                      </div>
                    </td>
                  </tr>

                  <!-- DIVIDER -->
                  <tr>
                    <td align="center" style="padding:40px 0;">
                      <div style="width:40px;height:1px;background:rgba(255,255,255,0.15);"></div>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td align="center">
                      <div style="font-size:12px;color:#444;letter-spacing:1px;">
                        Quiet presence. Real scenes.
                      </div>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}