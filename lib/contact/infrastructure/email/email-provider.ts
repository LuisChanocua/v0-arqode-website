export interface EmailMessage {
  from: string
  to: string
  replyTo: string
  subject: string
  html: string
  text?: string
}

export interface EmailSendResult {
  id?: string
  provider: string
}

export interface EmailProvider {
  send(message: EmailMessage): Promise<EmailSendResult>
}
