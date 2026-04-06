import { Buffer } from "node:buffer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ARVIAN_AUTH_COOKIE_NAME,
  hasValidArvianCookie,
} from "@/app/lib/auth";

export const runtime = "nodejs";

type ManifestRequestBody = {
  image?: string;
  prompt?: string;
  epochTheme?: string;
};

type HuggingFaceErrorPayload = {
  error?: string;
  estimated_time?: number;
};

type CandidateEndpoint = {
  label: string;
  url: string;
};

function getDataUrlPayload(dataUrl: string): { mimeType: string; base64: string } | null {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);

  if (!match) {
    return null;
  }

  const [, mimeType, base64] = match;
  return { mimeType, base64 };
}

async function readHuggingFaceError(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const payload = (await response.json().catch(() => null)) as HuggingFaceErrorPayload | null;
    if (payload?.error) {
      return payload.error;
    }
  }

  const text = await response.text().catch(() => "");
  return text || "Unknown Hugging Face error";
}

function getCandidateEndpoints(): CandidateEndpoint[] {
  const configured = [
    process.env.HUGGINGFACE_COMFYUI_API_URL,
    process.env.HUGGINGFACE_IMAGE_TO_IMAGE_URL,
    process.env.HUGGINGFACE_SPACE_API_URL,
  ]
    .filter((value): value is string => Boolean(value))
    .map((value, index) => ({
      label: `configured-${index + 1}`,
      url: value,
    }));

  const defaults: CandidateEndpoint[] = [
    {
      label: "qwen-image-edit",
      url: "https://api-inference.huggingface.co/models/Qwen/Qwen-Image-Edit",
    },
    {
      label: "firered-image-edit",
      url: "https://api-inference.huggingface.co/models/FireRedTeam/FireRed-Image-Edit-1.0",
    },
  ];

  return [...configured, ...defaults];
}

export async function POST(req: Request) {
  const authCookieValue = (await cookies()).get(ARVIAN_AUTH_COOKIE_NAME)?.value;

  if (!hasValidArvianCookie(authCookieValue)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as ManifestRequestBody;
    const image = body.image?.trim();
    const prompt = body.prompt?.trim();
    const epochTheme = body.epochTheme?.trim();

    if (!image || !prompt || !epochTheme) {
      return NextResponse.json(
        { error: "Gorsel, prompt ve donem temasi zorunlu." },
        { status: 400 }
      );
    }

    const parsedImage = getDataUrlPayload(image);
    if (!parsedImage) {
      return NextResponse.json(
        { error: "Gorsel gecerli bir base64 veri URL'i olmali." },
        { status: 400 }
      );
    }

    const hfToken = process.env.HUGGINGFACE_TOKEN;
    if (!hfToken) {
      return NextResponse.json(
        { error: "HUGGINGFACE_TOKEN tanimli degil." },
        { status: 500 }
      );
    }

    const finalPrompt = [
      "Professional cinematic portrait",
      "preserve the uploaded subject identity",
      `theme: ${epochTheme}`,
      prompt,
      "high detail",
      "photorealistic lighting",
    ].join(", ");

    const candidateEndpoints = getCandidateEndpoints();
    let response: Response | null = null;
    let lastError = "Bilinmeyen Hugging Face hatasi.";

    for (const endpoint of candidateEndpoints) {
      response = await fetch(endpoint.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          inputs: parsedImage.base64,
          parameters: {
            prompt: finalPrompt,
            guidance_scale: 7.5,
            num_inference_steps: 28,
            target_size: {
              width: 1024,
              height: 1024,
            },
          },
          options: {
            wait_for_model: true,
            use_cache: false,
          },
        }),
      });

      if (response.ok) {
        break;
      }

      const hfError = await readHuggingFaceError(response);
      lastError = `${endpoint.label}: ${hfError}`;

      if (response.status !== 404 && response.status !== 503) {
        return NextResponse.json(
          {
            error: `Hugging Face istegi basarisiz oldu (${response.status}). ${hfError}`,
          },
          { status: response.status }
        );
      }
    }

    if (!response || !response.ok) {
      return NextResponse.json(
        {
          error:
            "Gorsel motoruna ulasilamadi. Gecerli bir Hugging Face image-edit endpoint'i tanimla ya da token/model erisimini kontrol et. Son durum: " +
            lastError,
        },
        { status: 502 }
      );
    }

    const contentType = response.headers.get("content-type") ?? parsedImage.mimeType ?? "image/png";
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bilinmeyen sunucu hatasi.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
