import * as z from "zod";

export const letsConnectSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  message: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(1000, "Message cannot exceed 1000 characters."),
});

export type LetsConnectFormValues = z.infer<typeof letsConnectSchema>;
