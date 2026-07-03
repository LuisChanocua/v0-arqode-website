export const contactProjectTypeValues = [
  "experiencia-digital",
  "sitio-web",
  "plataforma-web",
  "automatizacion",
  "dashboard",
  "campana",
  "otro",
] as const

export type ContactProjectType = (typeof contactProjectTypeValues)[number]

export const contactProjectTypes: readonly {
  value: ContactProjectType
  label: string
}[] = [
  { value: "experiencia-digital", label: "Experiencia digital" },
  { value: "sitio-web", label: "Sitio web o landing page" },
  { value: "plataforma-web", label: "Plataforma web" },
  { value: "automatizacion", label: "Automatización o integración" },
  { value: "dashboard", label: "Dashboard o análisis de datos" },
  { value: "campana", label: "Campaña digital" },
  { value: "otro", label: "Otro" },
]

export interface ContactMessage {
  name: string
  email: string
  phone?: string
  company?: string
  projectType?: ContactProjectType
  message: string
}

export function getContactProjectTypeLabel(projectType?: ContactProjectType) {
  return contactProjectTypes.find((type) => type.value === projectType)?.label
}
