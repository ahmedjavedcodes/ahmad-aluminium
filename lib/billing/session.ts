import { SignJWT, jwtVerify } from "jose";

/* Session tokens for the single owner login.
 *
 * Deliberately free of `server-only` and `next/headers`: proxy.ts imports this
 * to gate /admin before any page renders, and it must run there as well as in
 * server actions. */

export const SESSION_COOKIE = "aag_admin";
export const SESSION_DAYS = 30;

function signingKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

export async function signSession(): Promise<string> {
  const key = signingKey();
  if (!key) throw new Error("AUTH_SECRET in .env.local must be at least 32 characters.");
  return new SignJWT({ role: "owner" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("owner")
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(key);
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  const key = signingKey();
  if (!token || !key) return false;
  try {
    await jwtVerify(token, key, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}
