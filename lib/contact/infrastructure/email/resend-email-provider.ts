import { Resend } from "resend"
import { EmailDeliveryError } from "@/lib/contact/domain/contact-errors"
import type {
  EmailMessage,
  EmailProvider,
  EmailSendResult,
} from "@/lib/contact/infrastructure/email/email-provider"

export class ResendEmailProvider implements EmailProvider {
  private readonly resend: Resend

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey)
  }

  async send(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const { data, error } = await this.resend.emails.send({
        from: message.from,
        to: message.to,
        replyTo: message.replyTo,
        subject: message.subject,
        html: message.html,
        text: message.text,
      })

      if (error) {
        throw new EmailDeliveryError("Resend rejected the email", error)
      }

      return {
        id: data?.id,
        provider: "resend",
      }
    } catch (error) {
      if (error instanceof EmailDeliveryError) {
        throw error
      }

      throw new EmailDeliveryError("Resend email delivery failed", error)
    }
  }
}
