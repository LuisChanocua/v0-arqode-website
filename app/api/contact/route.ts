import { NextResponse } from "next/server"
import { SendContactMessageUseCase } from "@/lib/contact/application/send-contact-message"
import {
  ContactValidationError,
  EmailConfigurationError,
  EmailDeliveryError,
} from "@/lib/contact/domain/contact-errors"
import {
  createEmailProvider,
  getContactEmailSettings,
} from "@/lib/contact/infrastructure/email/email-provider-factory"
import {
  checkContactRequestLimit,
  createContactSubmissionFingerprint,
  getContactClientKey,
  rememberContactSubmission,
} from "@/lib/contact/infrastructure/rate-limit/contact-request-limit"

export const runtime = "nodejs"

const MAX_PAYLOAD_BYTES = 10_000

function jsonResponse(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status })
}

function methodNotAllowed() {
  return NextResponse.json(
    { ok: false, message: "Metodo no permitido" },
    { status: 405, headers: { Allow: "POST" } },
  )
}

function isJsonContentType(contentType: string | null) {
  return contentType?.toLowerCase().includes("application/json") ?? false
}

function logContactApiError(error: unknown) {
  if (error instanceof Error) {
    console.error("[contact-api]", {
      name: error.name,
      message: error.message,
    })
    return
  }

  console.error("[contact-api]", { name: "UnknownError" })
}

export async function POST(request: Request) {
  if (!isJsonContentType(request.headers.get("content-type"))) {
    return jsonResponse("Tipo de contenido no soportado", 415)
  }

  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return jsonResponse("La solicitud es demasiado grande", 413)
  }

  let payload: unknown
  let rawBody = ""

  try {
    rawBody = await request.text()
    const bodySize = new TextEncoder().encode(rawBody).length

    if (bodySize > MAX_PAYLOAD_BYTES) {
      return jsonResponse("La solicitud es demasiado grande", 413)
    }

    payload = JSON.parse(rawBody)
  } catch {
    return jsonResponse("JSON invalido", 400)
  }

  const clientKey = getContactClientKey(request.headers)
  const submissionFingerprint = createContactSubmissionFingerprint(clientKey, rawBody)
  const limitResult = checkContactRequestLimit(clientKey, submissionFingerprint)

  if (!limitResult.allowed) {
    if (limitResult.reason === "duplicate") {
      return NextResponse.json({ ok: true, duplicate: true })
    }

    return NextResponse.json(
      {
        ok: false,
        message: "Demasiados intentos. Intenta de nuevo en unos minutos.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(limitResult.retryAfterSeconds),
        },
      },
    )
  }

  try {
    const sendContactMessage = new SendContactMessageUseCase(
      createEmailProvider(),
      getContactEmailSettings(),
    )

    await sendContactMessage.execute(payload)
    rememberContactSubmission(submissionFingerprint)
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof ContactValidationError) {
      return jsonResponse("Revisa los datos del formulario", 400)
    }

    logContactApiError(error)

    if (error instanceof EmailDeliveryError) {
      return jsonResponse("No pudimos enviar el mensaje en este momento", 502)
    }

    if (error instanceof EmailConfigurationError) {
      return jsonResponse("El servicio de contacto no esta disponible", 500)
    }

    return jsonResponse("Ocurrio un error inesperado", 500)
  }
}

export const GET = methodNotAllowed
export const PUT = methodNotAllowed
export const PATCH = methodNotAllowed
export const DELETE = methodNotAllowed
