import "server-only";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_DAYS, signSession, verifySession } from "./session";

/** Checks a password against `scrypt:<salt>:<hash>` from `npm run hash-password`. */
function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const expected = Buffer.from(hash, "base64url");
  if (expected.length === 0) return false;
  const actual = scryptSync(password, Buffer.from(salt, "base64url"), expected.length);
  return timingSafeEqual(actual, expected);
}

export function checkCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const stored = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!adminEmail || !stored) return false;
  // Hash even when the email is wrong, so a wrong email and a wrong password
  // take the same time to reject.
  const passwordOk = verifyPassword(password, stored);
  return email.trim().toLowerCase() === adminEmail && passwordOk;
}

export async function startSession(): Promise<void> {
  const token = await signSession();
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).set(SESSION_COOKIE, "", { path: "/admin", maxAge: 0 });
}

export async function isSignedIn(): Promise<boolean> {
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value);
}

/**
 * proxy.ts already turns away signed-out requests; this is the second lock,
 * for server actions and route handlers, which are reachable by direct POST.
 */
export async function requireOwner(): Promise<void> {
  if (!(await isSignedIn())) redirect("/admin/login");
}
