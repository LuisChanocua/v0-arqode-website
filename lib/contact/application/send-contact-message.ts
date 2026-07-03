import type { ContactEmailSettings } from "@/lib/contact/infrastructure/email/email-provider-factory"
import type { EmailProvider } from "@/lib/contact/infrastructure/email/email-provider"
import { buildContactEmailTemplate } from "@/lib/contact/infrastructure/email/templates/contact-email-template"
import { parseContactMessage } from "@/lib/contact/validation/contact-schema"

export class SendContactMessageUseCase {
  constructor(
    private readonly emailProvider: EmailProvider,
    private readonly emailSettings: ContactEmailSettings,
  ) {}

  async execute(payload: unknown): Promise<void> {
    const contactMessage = parseContactMessage(payload)
    const template = buildContactEmailTemplate(contactMessage)

    await this.emailProvider.send({
      from: this.emailSettings.from,
      to: this.emailSettings.to,
      replyTo: contactMessage.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  }
}
