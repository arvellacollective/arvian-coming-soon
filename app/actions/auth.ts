"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function unlockArvianCore(prevState: any, formData: FormData) {
  // Formdaki input isimlerinin name="accessCode" ve name="secretSeal" olduğundan emin ol
  const code = formData.get("accessCode") as string;
  const seal = formData.get("secretSeal") as string;

  // Güvenlik ve Kimlik Kontrolü (1:1 sistemi)
  if (code === "1" && seal === "1") {
    // 1 haftalık mühür izni
    const cookieStore = await cookies();
    
    cookieStore.set("arvian-muhur-auth", "açıldı", {
      httpOnly: true, // Güvenlik için sadece sunucu okuyabilsin
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 Gün
      path: "/",
      sameSite: "lax",
    });
    
    // Doğrudan Arvian Core ünitesine geçiş
    redirect("/production");
  }

  return { message: "Öz eşleşmedi. Sadece gerçek kimlikler geçebilir!" };
}