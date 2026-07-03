import { z } from "zod"
import {
  type ContactMessage,
  contactProjectTypeValues,
} from "@/lib/contact/domain/contact-message"
import { ContactValidationError } from "@/lib/contact/domain/contact-errors"

const contactPayloadSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().min(1).email().max(254),
    phone: z
      .string()
      .trim()
      .max(30)
      .regex(/^[0-9+\-().\s]*$/)
      .optional()
      .default(""),
    company: z.string().trim().max(120).optional().default(""),
    projectType: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z.enum(contactProjectTypeValues).optional(),
    ),
    message: z.string().trim().min(1).max(2000),
    website: z.string().trim().max(200).optional().default(""),
  })
  .strict()

export type ContactPayload = z.input<typeof contactPayloadSchema>

export function parseContactMessage(payload: unknown): ContactMessage {
  const result = contactPayloadSchema.safeParse(payload)

  if (!result.success) {
    const fieldErrors = result.error.issues.reduce<Record<string, string>>((errors, issue) => {
      const field = issue.path[0]
      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message
      }
      return errors
    }, {})

    throw new ContactValidationError("Invalid contact payload", fieldErrors)
  }

  if (result.data.website) {
    throw new ContactValidationError("Spam protection triggered", {
      website: "Invalid field",
    })
  }

  return {
    name: result.data.name,
    email: result.data.email,
    phone: result.data.phone || undefined,
    company: result.data.company || undefined,
    projectType: result.data.projectType,
    message: result.data.message,
  }
}
