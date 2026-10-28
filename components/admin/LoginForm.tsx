"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login, type LoginState } from "@/lib/billing/actions";
import { buttonClass, Card, ErrorNote, Field, inputClass } from "./ui";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card>
      <form action={action} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <Field label="Email">
          <input
            key={state?.email}
            name="email"
            type="email"
            autoComplete="username"
            defaultValue={state?.email}
            required
            className={inputClass}
          />
        </Field>
        <Field label="Password">
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className={inputClass + " pr-11"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-ink-subtle hover:text-ink focus-visible:text-accent focus-visible:outline-none"
            >
              {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
            </button>
          </div>
        </Field>
        {state?.error ? <ErrorNote>{state.error}</ErrorNote> : null}
        <button type="submit" disabled={pending} className={buttonClass("primary") + " w-full"}>
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </Card>
  );
}
