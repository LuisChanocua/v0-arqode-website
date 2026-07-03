import { z } from "zod"
import { EmailConfigurationError } from "@/lib/contact/domain/contact-errors"

const serverEnvSchema = z.object({
  EMAIL_PROVIDER: z.enum(["resend"]).default("resend"),
  RESEND_API_KEY: z.string().trim().min(1),
  CONTACT_FROM_EMAIL: z.string().trim().email(),
  CONTACT_TO_EMAIL: z.string().trim().email(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

export function getServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse(process.env)

  if (!result.success) {
    const invalidKeys = result.error.issues
      .map((issue) => issue.path.join("."))
      .filter(Boolean)
      .join(", ")

    throw new EmailConfigurationError(
      `Invalid server email configuration: ${invalidKeys || "unknown key"}`,
    )
  }

  return result.data
}
