import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

const subscribeSchema = z.object({
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),
});

type SubscribeRequestBody = z.infer<typeof subscribeSchema>;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildAdminEmail(email: string): string {
  return `
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

        <div style="background:#0a0a0a;padding:20px;border:1px solid rgba(255,255,255,0.05);font-size:13px;margin-bottom:30px;font-family:monospace;">
          <a href="mailto:${email}" style="color:#eaeaea !important;text-decoration:none !important;">
            <span style="color:#eaeaea !important;">${email}</span>
          </a>
        </div>

        <div style="font-size:11px;color:#444;">
          ${new Date().toLocaleString()}
        </div>
      </div>
    </div>
  `;
}

function buildUserEmail(): string {
  return `
    <div style="margin:0;padding:0;background:#030303;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:80px 20px;">
        <tr>
          <td align="center">
            <table width="100%" style="max-width:520px;">
              <tr>
                <td align="center" style="padding-bottom:40px;">
                  <div style="font-size:11px;letter-spacing:3px;color:#555;">
                    ARVIAN
                  </div>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <div style="font-size:34px;color:#fff;">
                    You&apos;re in.
                  </div>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding-bottom:30px;">
                  <div style="font-size:16px;color:#9a9a9a;line-height:1.8;max-width:420px;">
                    Your presence has been registered.<br/>
                    <span style="color:#ffffff;">Not as data, but as form.</span>
                    <br/><br/>
                    This is where your image leaves the surface<br/>
                    and enters the scene.
                  </div>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding:40px 0;">
                  <div style="width:40px;height:1px;background:rgba(255,255,255,0.15);"></div>
                </td>
              </tr>

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
  `;
}

function getFailureMessage(status: number): string {
  if (status === 400) {
    return "Iz kabul edilmedi. E-posta adresini kontrol edip yeniden dene.";
  }

  return "Katman simdilik sessiz. Birazdan yeniden dene.";
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Kayit katmani henuz yapilandirilmadi." },
      { status: 500 }
    );
  }

  try {
    const rawBody = (await req.json()) as unknown;
    const parsedBody = subscribeSchema.safeParse(rawBody);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: getFailureMessage(400) },
        { status: 400 }
      );
    }

    const { email }: SubscribeRequestBody = parsedBody.data;
    const safeEmail = escapeHtml(email);

    await resend.emails.send({
      from: "Arvian <no-reply@arvianstudio.com>",
      to: ["arvianstudio@gmail.com"],
      subject: "Signal Received",
      html: buildAdminEmail(safeEmail),
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    await resend.emails.send({
      from: "Arvian <no-reply@arvianstudio.com>",
      to: email,
      subject: "You're in.",
      html: buildUserEmail(),
    });

    return NextResponse.json({
      success: true,
      message: "Izin secili katmana alindi.",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Katman simdilik sessiz. Birazdan yeniden dene.";

    console.error("ARVIAN_SUBSCRIBE_ERROR", message);

    return NextResponse.json(
      { error: "Katman simdilik sessiz. Birazdan yeniden dene." },
      { status: 500 }
    );
  }
}
