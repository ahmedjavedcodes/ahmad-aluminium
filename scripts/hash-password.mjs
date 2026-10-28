// Sets the /admin password:  npm run hash-password
//
// Asks for the password twice (hidden) and writes its hash into .env.local as
// ADMIN_PASSWORD_HASH. Prompting instead of taking it as an argument matters on
// Windows: PowerShell expands "$" and cmd.exe eats "^ & %", so a password typed
// on the command line can be hashed as something other than what you typed.
//
// scrypt from Node's standard library: no native module to install, and the
// output uses ":" as its separator because Next.js expands "$" in .env files.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes, scryptSync } from "node:crypto";

const ENV_FILE = ".env.local";

/** Reads a line from the terminal without echoing it. */
function askHidden(question) {
  const { stdin, stdout } = process;
  return new Promise((resolve) => {
    stdout.write(question);
    stdin.setRawMode(true);
    stdin.setEncoding("utf8");
    stdin.resume();
    let value = "";
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === "\r" || ch === "\n") {
          stdin.off("data", onData);
          stdin.setRawMode(false);
          stdin.pause();
          stdout.write("\n");
          resolve(value);
          return;
        }
        if (ch === "\u0003") {
          stdout.write("\n");
          process.exit(130); // Ctrl+C
        }
        if (ch === "\u007f" || ch === "\b") value = value.slice(0, -1);
        else value += ch;
      }
    };
    stdin.on("data", onData);
  });
}

if (!process.stdin.isTTY) {
  console.error("Run this in a terminal: npm run hash-password");
  process.exit(1);
}

const password = await askHidden("New admin password: ");
if (password.length < 8) {
  console.error("Use at least 8 characters.");
  process.exit(1);
}
if ((await askHidden("Type it again: ")) !== password) {
  console.error("The two passwords don't match. Nothing was changed.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
const line = `ADMIN_PASSWORD_HASH=scrypt:${salt.toString("base64url")}:${hash.toString("base64url")}`;

if (!existsSync(ENV_FILE)) {
  console.log(`\nNo ${ENV_FILE} here. Add this line to it:\n${line}`);
  process.exit(0);
}

const env = readFileSync(ENV_FILE, "utf8");
const pattern = /^ADMIN_PASSWORD_HASH=.*$/m;
writeFileSync(ENV_FILE, pattern.test(env) ? env.replace(pattern, line) : `${env.trimEnd()}\n${line}\n`);
console.log(`\nSaved to ${ENV_FILE}. Restart "npm run dev", then sign in with this password.`);
