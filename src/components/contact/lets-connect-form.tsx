"use client";

import { Loader2 } from "lucide-react";
import {
  Controller,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import type { LetsConnectFormValues } from "@/components/contact/schema";
import type { LetsConnectFormStatus } from "@/components/contact/use-lets-connect-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type LetsConnectFormProps = {
  form: UseFormReturn<LetsConnectFormValues>;
  onSubmit: SubmitHandler<LetsConnectFormValues>;
  status?: LetsConnectFormStatus;
  errorMessage?: string | null;
  className?: string;
};

export const LetsConnectForm = ({
  form,
  onSubmit,
  status = "idle",
  errorMessage,
  className,
}: LetsConnectFormProps) => {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("grid items-start gap-6", className)}
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Your email address</FieldLabel>
            <Input
              {...field}
              id="email"
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="anita@gmail.com"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="message"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="message">Your message</FieldLabel>
            <Textarea
              {...field}
              id="message"
              aria-invalid={fieldState.invalid}
              placeholder="Let's connect..."
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {errorMessage ? (
        <p className="text-destructive text-sm">{errorMessage}</p>
      ) : null}
      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="animate-spin" data-icon="inline-start" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
};
