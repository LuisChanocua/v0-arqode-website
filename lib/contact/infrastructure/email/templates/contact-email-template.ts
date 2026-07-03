import {
  type ContactMessage,
  getContactProjectTypeLabel,
} from "@/lib/contact/domain/contact-message"

export interface ContactEmailTemplate {
  subject: string
  html: string
  text: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function formatValue(value?: string) {
  return value?.trim() ? value : "No especificado"
}

export function buildContactEmailTemplate(message: ContactMessage): ContactEmailTemplate {
  const projectTypeLabel = formatValue(getContactProjectTypeLabel(message.projectType))
  const company = formatValue(message.company)
  const phone = formatValue(message.phone)
  const subject = `Nuevo contacto desde ArQode - ${message.name}`

  const rows = [
    ["Nombre", message.name],
    ["Correo", message.email],
    ["Celular", phone],
    ["Empresa", company],
    ["Tipo de necesidad / proyecto", projectTypeLabel],
  ]

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; width: 220px;">${escapeHtml(label)}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("")

  const html = `
    <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="padding: 24px; background: #111827; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; line-height: 1.3;">Nuevo contacto desde ArQode</h1>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tbody>${htmlRows}</tbody>
          </table>
          <h2 style="font-size: 16px; color: #111827; margin: 0 0 12px;">Mensaje</h2>
          <div style="white-space: pre-wrap; color: #374151; line-height: 1.6; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px;">${escapeHtml(message.message)}</div>
        </div>
      </div>
    </div>`

  const text = [
    "Nuevo contacto desde ArQode",
    "",
    `Nombre: ${message.name}`,
    `Correo: ${message.email}`,
    `Celular: ${phone}`,
    `Empresa: ${company}`,
    `Tipo de necesidad / proyecto: ${projectTypeLabel}`,
    "",
    "Mensaje:",
    message.message,
  ].join("\n")

  return { subject, html, text }
}
