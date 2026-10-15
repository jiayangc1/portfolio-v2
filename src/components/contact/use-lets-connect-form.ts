"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type LetsConnectFormValues,
  letsConnectSchema,
} from "@/components/contact/schema";

export const connectCopy = {
  title: "Let's connect",
  description:
    "Fill out the form below and I will get back to you as soon as possible.",
  menuDescription: "Find me around the web or send a message.",
} as const;

type UseLetsConnectFormOptions = {
  onSuccess?: () => void;
};

export type LetsConnectFormStatus = "idle" | "submitting" | "error";

export function useLetsConnectForm(options?: UseLetsConnectFormOptions) {
  const [status, setStatus] = React.useState<LetsConnectFormStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm<LetsConnectFormValues>({
    resolver: zodResolver(letsConnectSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<LetsConnectFormValues> = async (data) => {
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Failed to send message");
      }

      form.reset();
      setStatus("idle");
      options?.onSuccess?.();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message",
      );
    }
  };

  const reset = React.useCallback(() => {
    form.reset();
    setStatus("idle");
    setErrorMessage(null);
  }, [form]);

  return { form, onSubmit, status, errorMessage, reset };
}