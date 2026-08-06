import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  password: z.string().min(1, "Password is required"),
});

// TypeScript types (optional – remove if not using TypeScript)
// export type SignupFormData = z.infer<typeof signupSchema>;
// export type LoginFormData = z.infer<typeof loginSchema>;
