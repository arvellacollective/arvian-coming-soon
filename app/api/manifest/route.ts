import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { referenceImage, prompt, epochTheme } = body;
    
    const hfToken = process.env.HUGGINGFACE_TOKEN;

    if (!hfToken) {
      console.warn("HUGGINGFACE_TOKEN bulunamadı. Lütfen varolan .env.local içine ekleyin.");
      return NextResponse.json({ error: 'Sistem Mührü Kapalı: HUGGINGFACE_TOKEN eksik.' }, { status: 500 });
    }

    if (!referenceImage) {
      return NextResponse.json({ error: 'Kimlik DNA\'sı (Referans görsel) zorunludur.' }, { status: 400 });
    }

    // Hugging Face standardı için base64 ayıklama
    const base64Data = referenceImage.split(',')[1];
    if (!base64Data) {
       return NextResponse.json({ error: 'Geçersiz Kimlik DNA veri formatı.' }, { status: 400 });
    }
    
    // SDXL odaklı ultra-detaylı, kimlik korumalı prompt (Vizyon)
    const apiPrompt = `Portrait photography, 99.9% identical face features to the provided DNA reference image. Concept Atmosphere: ${epochTheme}. Scene Details: ${prompt}. Cinematic lighting, 8k ultra realism, masterpiece, highly detailed face, sharp focus.`;

    // 🔴 HUGGING FACE INFERENCE API YAPILANDIRMASI
    // Kullanıcı talebi: SDXL veya FLUX.1. En stabil görsel döngüsü için SDXL Base 1.0 kullanıyoruz.
    const REPO_ID = "stabilityai/stable-diffusion-xl-base-1.0";

    // Hugging Face JSON Payload. Image-to-Image protokolü için bazı modeller base64 'image' alırken,
    // SDXL Base çoğunlukla Text-To-Image okur. Kimlik DNA'sını her iki protokole de şans tanıyacak biçimde gömüyoruz.
    const requestBody = {
      inputs: apiPrompt,
      image: referenceImage, // Image-to-image desteği açık olan HF nodları için
      parameters: {
         negative_prompt: "deformed, blurry, bad anatomy, bad facial features, ugly, cartoon, fake, text, watermark",
         guidance_scale: 7.5,
      }
    };

    // Hugging Face Sunucusuna Ateşleme
    const response = await fetch(`https://api-inference.huggingface.co/models/${REPO_ID}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${hfToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.warn("Arvian HF API Hatası: ", errorText);
        throw new Error(`Hugging Face Motoru reddetti: ${response.status} - Lütfen Modelin Loading (Yükleniyor) durumunda olmadığını ve Token kotanızı kontrol edin.`);
    }

    // Hugging Face API'den dönen veri JSON değil, direkt BLOB (Görsel Buffer) olarak gelir. Asıl büyülü tarafı bu:
    const arrayBuffer = await response.arrayBuffer();
    
    // Gelen byte verisini UI'da anında göstermek üzere Base64'e çeviriyoruz
    const buffer = Buffer.from(arrayBuffer);
    const generatedBase64 = buffer.toString('base64');

    if (!generatedBase64 || generatedBase64.length < 100) {
        throw new Error("Görsel byte formatına başarıyla dönüştürülemedi veya HF bir hata JSON'u döndürdü.");
    }

    // Arvian Core UI motoruna sorunsuz Base64 formatlı yansımayı aktarıyoruz:
    return NextResponse.json({ 
        success: true, 
        image: `data:image/png;base64,${generatedBase64}` 
    });

  } catch (error: any) {
    console.error('Arvian Core Tezahür Manifest Hatası:', error);
    return NextResponse.json({ error: error.message || 'Hugging Face Tezahür Bağlantısı Koptu.' }, { status: 500 });
  }
}
