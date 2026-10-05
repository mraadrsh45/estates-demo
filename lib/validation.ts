import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  phone: z
    .string()
    .regex(
      /^[+]?[\d\s\-().]{7,15}$/,
      "Please enter a valid phone number"
    ),
  email: z.string().email("Please enter a valid email address"),
  requirement: z.string().min(1, "Please select a requirement"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
