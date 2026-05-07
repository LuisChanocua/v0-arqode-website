export interface ProjectSlide {
  title: string
  description: string
  image: string // URL or placeholder identifier
}

export interface PublicProject {
  id: string
  title: string
  category: string
  coverImage: string
  need: string
  value: string
  slides: ProjectSlide[]
}

const defaultSlides: ProjectSlide[] = [
  {
    title: "Vista general",
    description: "Vista inicial de la solución y navegación principal.",
    image: "placeholder-main",
  },
  {
    title: "Problema resuelto",
    description: "Centralización de información que antes podía estar dispersa en archivos o procesos manuales.",
    image: "placeholder-problem",
  },
  {
    title: "Flujo principal",
    description: "Flujo diseñado para registrar, consultar o administrar información de forma sencilla.",
    image: "placeholder-flow",
  },
  {
    title: "Panel de operación",
    description: "Herramientas internas para dar seguimiento y mantener control operativo.",
    image: "placeholder-panel",
  },
  {
    title: "Resultado",
    description: "Información más clara, operación más ordenada y mejor experiencia para los usuarios.",
    image: "placeholder-result",
  },
]

export const publicProjects: PublicProject[] = [
  {
    id: "gestion-deportiva",
    title: "Plataforma de gestión deportiva",
    category: "Plataforma Web",
    coverImage: "placeholder-sports",
    need: "Organizar ligas, equipos, calendarios, partidos y resultados desde un solo lugar.",
    value: "Mejor organización, consulta rápida de información y una experiencia más clara para jugadores, organizadores y público.",
    slides: defaultSlides,
  },
  {
    id: "sitio-negocio-local",
    title: "Sitio web para negocio local",
    category: "Sitio Web",
    coverImage: "placeholder-business",
    need: "Mejorar la presencia digital y facilitar el contacto con clientes potenciales.",
    value: "Mayor confianza, mejor presentación comercial y un canal digital disponible 24/7.",
    slides: defaultSlides,
  },
  {
    id: "prototipo-validacion",
    title: "Prototipo digital para validación",
    category: "Prototipo",
    coverImage: "placeholder-prototype",
    need: "Convertir una idea inicial en una experiencia visual navegable para validar concepto y flujo.",
    value: "Mayor claridad para tomar decisiones antes de invertir en una plataforma completa.",
    slides: defaultSlides,
  },
  {
    id: "dashboard-operativo",
    title: "Dashboard operativo para negocio",
    category: "Dashboard",
    coverImage: "placeholder-dashboard",
    need: "Centralizar métricas clave y operaciones diarias en una sola vista.",
    value: "Decisiones más rápidas basadas en datos reales y reducción de tiempo en tareas repetitivas.",
    slides: defaultSlides,
  },
  {
    id: "landing-activacion",
    title: "Landing para activación digital",
    category: "Landing Page",
    coverImage: "placeholder-landing",
    need: "Captar leads y comunicar una propuesta de valor de forma clara y atractiva.",
    value: "Conversiones más altas y una primera impresión profesional para el negocio.",
    slides: defaultSlides,
  },
  {
    id: "automatizacion-interna",
    title: "Automatización de proceso interno",
    category: "Automatización",
    coverImage: "placeholder-automation",
    need: "Eliminar tareas manuales repetitivas y reducir errores humanos.",
    value: "Ahorro de tiempo, menos errores y equipo enfocado en tareas de mayor valor.",
    slides: defaultSlides,
  },
]
