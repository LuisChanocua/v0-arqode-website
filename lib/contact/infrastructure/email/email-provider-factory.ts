import { EmailConfigurationError } from "@/lib/contact/domain/contact-errors"
import { getServerEnv } from "@/lib/config/server-env"
import type { EmailProvider } from "@/lib/contact/infrastructure/email/email-provider"
import { ResendEmailProvider } from "@/lib/contact/infrastructure/email/resend-email-provider"

export interface ContactEmailSettings {
  from: string
  to: string
}

let cachedEmailProvider: EmailProvider | null = null

export function createEmailProvider(): EmailProvider {
  const env = getServerEnv()

  if (cachedEmailProvider) {
    return cachedEmailProvider
  }

  if (env.EMAIL_PROVIDER !== "resend") {
    throw new EmailConfigurationError("Unsupported email provider")
  }

  cachedEmailProvider = new ResendEmailProvider(env.RESEND_API_KEY)
  return cachedEmailProvider
}

export function getContactEmailSettings(): ContactEmailSettings {
  const env = getServerEnv()

  return {
    from: `ArQode Website <${env.CONTACT_FROM_EMAIL}>`,
    to: env.CONTACT_TO_EMAIL,
  }
}
