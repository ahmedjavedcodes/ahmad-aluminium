import "server-only";

/** Without these the billing area cannot start; /admin shows a setup screen. */
const CORE = ["MONGODB_URI", "ADMIN_EMAIL", "ADMIN_PASSWORD_HASH", "AUTH_SECRET"] as const;
/** Only uploads need these; everything else works without a logo or stamp. */
const CLOUDINARY = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"] as const;

type Key = (typeof CORE)[number] | (typeof CLOUDINARY)[number];

const read = (key: string) => process.env[key]?.trim() ?? "";

export function env(key: Key): string {
  const value = read(key);
  if (!value) throw new Error(`${key} is not set in .env.local.`);
  return value;
}

export const dbName = () => read("MONGODB_DB") || "ahmad_billing";
export const cloudinaryFolder = () => read("CLOUDINARY_FOLDER") || "ahmad-billing";

export const missingCoreEnv = (): string[] => CORE.filter((key) => !read(key));
export const missingCloudinaryEnv = (): string[] => CLOUDINARY.filter((key) => !read(key));
