export const ARVIAN_AUTH_COOKIE_NAME = "arvian-muhur-auth";
export const ARVIAN_AUTH_COOKIE_VALUE = "acildi";

export type UnlockState = {
  message: string;
};

export function hasValidArvianCookie(cookieValue: string | undefined): boolean {
  return cookieValue === ARVIAN_AUTH_COOKIE_VALUE;
}
