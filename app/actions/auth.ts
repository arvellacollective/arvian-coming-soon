"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ARVIAN_AUTH_COOKIE_NAME,
  ARVIAN_AUTH_COOKIE_VALUE,
  type UnlockState,
} from "@/app/lib/auth";

export async function unlockArvianCore(
  _prevState: UnlockState,
  formData: FormData
): Promise<UnlockState> {
  const code = formData.get("accessCode");
  const seal = formData.get("secretSeal");

  if (code === "1" && seal === "1") {
    const cookieStore = await cookies();

    cookieStore.set(ARVIAN_AUTH_COOKIE_NAME, ARVIAN_AUTH_COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });

    redirect("/production");
  }

  return { message: "Oz eslesmedi. Sadece gercek kimlikler gecebilir." };
}
