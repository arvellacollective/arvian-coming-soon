import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { referenceImage, prompt, epochTheme } = body;
    const hfToken = process.env.HUGGINGFACE_TOKEN;

    if (!hfToken) return NextResponse.json({ error: 'Mühür Eksik: Token bulunamadı.' }, { status: 500 });

    const finalPrompt = `Professional cinematic portrait, identical face features to reference image, Theme: ${epochTheme}, ${prompt}, 8k ultra realism, masterpiece.`;

    // 🔴 410 HATASINI ÖLDÜREN KESİN URL (Cache kırmak için fetch parametresi eklendi)
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: { 
          Authorization: `Bearer ${hfToken}`, 
          "Content-Type": "application/json",
          "x-use-cache": "0" 
        },
        method: "POST",
        cache: "no-store", // Cache kırmak için modern Next.js yöntemi
        body: JSON.stringify({ 
          inputs: finalPrompt,
          options: { wait_for_model: true } // Modelin yüklenmesini bekler
        }),
      }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Hugging Face Motoru: ${response.status} - ${errorData.error || 'Uyanıyor...'}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const generatedBase64 = buffer.toString('base64');

    return NextResponse.json({ 
        success: true, 
        image: `data:image/png;base64,${generatedBase64}` 
    });

  } catch (error: any) {
    console.error('ARVIAN MOTOR HATASI:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}