export class ContactValidationError extends Error {
  constructor(
    message = "Invalid contact message",
    readonly fieldErrors: Record<string, string> = {},
  ) {
    super(message)
    this.name = "ContactValidationError"
  }
}

export class EmailConfigurationError extends Error {
  constructor(message = "Invalid email configuration") {
    super(message)
    this.name = "EmailConfigurationError"
  }
}

export class EmailDeliveryError extends Error {
  constructor(message = "Email delivery failed", readonly cause?: unknown) {
    super(message)
    this.name = "EmailDeliveryError"
  }
}
