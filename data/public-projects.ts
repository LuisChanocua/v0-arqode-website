export interface ProjectSlide {
  title: string
  description: string
  image: string
  alt?: string
}

export interface PublicProject {
  id: string
  title: string
  category: string
  coverImage: string
  coverAlt?: string
  need: string
  value: string
  slides: ProjectSlide[]
}

// Helper to check if an image is a placeholder
export const isPlaceholderImage = (image?: string): boolean =>
  !image || image.startsWith("placeholder")

export const publicProjects: PublicProject[] = [
  {
    id: "gestion-deportiva",
    title: "Plataforma de gestión deportiva",
    category: "Plataforma Web",
    coverImage: "/projects/gestion-deportiva/cover.webp",
    coverAlt: "Vista principal de la plataforma de gestión deportiva",
    need: "Centralizar la consulta de deportes, ligas, calendarios, partidos, resultados y clasificaciones en una plataforma pública organizada.",
    value: "Mejor acceso a la información deportiva, consulta rápida de partidos y resultados, y una experiencia más clara para jugadores, organizadores y público.",
    slides: [
      {
        title: "Vista general",
        description: "Página principal con acceso rápido a deportes, calendario, resultados y estadísticas generales de la plataforma.",
        image: "/projects/gestion-deportiva/slide-1.webp",
        alt: "Página principal de la plataforma de gestión deportiva",
      },
      {
        title: "Deportes y ligas activas",
        description: "Vista para explorar disciplinas deportivas, ligas activas y competencias disponibles dentro del municipio.",
        image: "/projects/gestion-deportiva/slide-2.webp",
        alt: "Sección de deportes y ligas activas",
      },
      {
        title: "Próximos partidos y resultados",
        description: "Secciones organizadas para consultar encuentros programados y resultados recientes de forma rápida.",
        image: "/projects/gestion-deportiva/slide-3.webp",
        alt: "Próximos partidos y últimos resultados deportivos",
      },
      {
        title: "Detalle de partido",
        description: "Vista detallada de un encuentro con marcador, equipos, fecha, sede, cronología, oficiales y clasificación.",
        image: "/projects/gestion-deportiva/slide-4.webp",
        alt: "Detalle de partido con marcador y estadísticas",
      },
      {
        title: "Calendario y filtros",
        description: "Listado de partidos con filtros por jornada y estado para facilitar la búsqueda de encuentros programados o finalizados.",
        image: "/projects/gestion-deportiva/slide-5.webp",
        alt: "Calendario de partidos con filtros",
      },
    ],
  },
  {
    id: "la-esmeralda",
    title: "Experiencia digital para restaurante",
    category: "Sitio Web",
    coverImage: "/projects/la-esmeralda/cover.webp",
    coverAlt: "Vista principal del sitio web de restaurante La Esmeralda",
    need: "Presentar el restaurante, mostrar el menú de forma atractiva y facilitar pedidos o consultas desde una experiencia digital sencilla.",
    value: "Mejor presentación del negocio, menú digital organizado, flujo de carrito para pedidos y acceso rápido a ubicación y contacto.",
    slides: [
      {
        title: "Vista principal",
        description: "Hero de bienvenida con propuesta gastronómica, llamadas a la acción y una composición visual enfocada en tradición local.",
        image: "/projects/la-esmeralda/slide-1.webp",
        alt: "Vista principal del sitio web de La Esmeralda",
      },
      {
        title: "Menú digital",
        description: "Catálogo de platillos organizado por categorías, con imágenes, descripciones, precios y acción para agregar al pedido.",
        image: "/projects/la-esmeralda/slide-2.webp",
        alt: "Menú digital del restaurante La Esmeralda",
      },
      {
        title: "Ubicación",
        description: "Sección con mapa, dirección y botón para abrir la ubicación en Google Maps, facilitando la llegada al negocio.",
        image: "/projects/la-esmeralda/slide-3.webp",
        alt: "Sección de ubicación de La Esmeralda",
      },
      {
        title: "Contacto",
        description: "Bloques de contacto con teléfono, WhatsApp, dirección y horario para que los clientes encuentren la información clave rápidamente.",
        image: "/projects/la-esmeralda/slide-4.webp",
        alt: "Sección de contacto del restaurante La Esmeralda",
      },
      {
        title: "Carrito de pedido",
        description: "Modal de pedido con productos agregados, cantidades, total, datos del cliente y opción para confirmar por WhatsApp.",
        image: "/projects/la-esmeralda/slide-5.webp",
        alt: "Carrito de pedido del restaurante La Esmeralda",
      },
      {
        title: "Detalle de producto",
        description: "Vista detallada de cada platillo con imagen, descripción, ingredientes, observaciones y acción para agregar al carrito.",
        image: "/projects/la-esmeralda/slide-6.webp",
        alt: "Detalle de producto del menú digital",
      },
    ],
  },
  {
    id: "huaraches-huetamo",
    title: "Sitio web para negocio artesanal",
    category: "Sitio Web",
    coverImage: "/projects/huaraches-huetamo/cover.webp",
    coverAlt: "Vista principal del sitio web de Huaraches Huetamo",
    need: "Crear una presencia digital para mostrar productos artesanales, comunicar la historia del negocio y facilitar pedidos personalizados.",
    value: "Mayor visibilidad para el negocio, presentación profesional del catálogo y un canal directo para que clientes interesados puedan solicitar información o realizar pedidos.",
    slides: [
      {
        title: "Vista principal",
        description: "Hero visual con identidad artesanal, mensaje de valor y llamada directa para iniciar un pedido por WhatsApp.",
        image: "/projects/huaraches-huetamo/slide-1.webp",
        alt: "Vista principal del sitio web de Huaraches Huetamo",
      },
      {
        title: "Historia del negocio",
        description: "Sección enfocada en comunicar la tradición, experiencia y valor artesanal detrás de los productos.",
        image: "/projects/huaraches-huetamo/slide-2.webp",
        alt: "Sección sobre la historia y tradición de Huaraches Huetamo",
      },
      {
        title: "Catálogo de productos",
        description: "Galería de productos con descripción, precio y opción para solicitar más información sobre cada modelo.",
        image: "/projects/huaraches-huetamo/slide-3.webp",
        alt: "Catálogo de productos artesanales de Huaraches Huetamo",
      },
      {
        title: "Proceso artesanal",
        description: "Timeline visual que explica las etapas de fabricación, desde la selección de materiales hasta el armado del producto.",
        image: "/projects/huaraches-huetamo/slide-4.webp",
        alt: "Proceso artesanal de fabricación de huaraches",
      },
      {
        title: "Contacto y ubicación",
        description: "Sección de contacto con WhatsApp, correo, ubicación, redes sociales y mapa para facilitar la comunicación con clientes.",
        image: "/projects/huaraches-huetamo/slide-5.webp",
        alt: "Sección de contacto y ubicación de Huaraches Huetamo",
      },
    ],
  },
  {
    id: "gestion-deportiva-example",
    title: "Plataforma de gestión deportiva",
    category: "Plataforma Web",
    coverImage: "/projects/gestion-deportiva/cover.webp",
    coverAlt: "Vista principal de la plataforma de gestión deportiva",
    need: "Organizar ligas, equipos, calendarios, partidos y resultados desde un solo lugar.",
    value: "Mejor organización, consulta rápida de información y una experiencia más clara para jugadores, organizadores y público.",
    slides: [
      {
        title: "Vista general",
        description: "Dashboard principal con navegación a ligas, equipos y calendario de partidos.",
        image: "/projects/gestion-deportiva/slide-1.webp",
        alt: "Dashboard principal de la plataforma deportiva",
      },
      {
        title: "Gestión de ligas",
        description: "Panel para crear y administrar ligas con configuración de temporadas y categorías.",
        image: "/projects/gestion-deportiva/slide-2.webp",
        alt: "Panel de gestión de ligas",
      },
      {
        title: "Calendario de partidos",
        description: "Vista de calendario con próximos encuentros, horarios y ubicaciones.",
        image: "/projects/gestion-deportiva/slide-3.webp",
        alt: "Calendario de partidos deportivos",
      },
      {
        title: "Tabla de posiciones",
        description: "Posiciones actualizadas en tiempo real con estadísticas por equipo.",
        image: "/projects/gestion-deportiva/slide-4.webp",
        alt: "Tabla de posiciones de la liga",
      },
      {
        title: "Resultados y estadísticas",
        description: "Registro de resultados con estadísticas detalladas por jugador y equipo.",
        image: "/projects/gestion-deportiva/slide-5.webp",
        alt: "Panel de resultados y estadísticas",
      },
    ],
  },
  {
    id: "sitio-negocio-local",
    title: "Sitio web para negocio local",
    category: "Sitio Web",
    coverImage: "/projects/sitio-negocio-local/cover.webp",
    coverAlt: "Vista principal del sitio web para negocio local",
    need: "Mejorar la presencia digital y facilitar el contacto con clientes potenciales.",
    value: "Mayor confianza, mejor presentación comercial y un canal digital disponible 24/7.",
    slides: [
      {
        title: "Página de inicio",
        description: "Vista inicial del sitio con navegación principal y propuesta de valor clara.",
        image: "/projects/sitio-negocio-local/slide-1.webp",
        alt: "Home del sitio web para negocio local",
      },
      {
        title: "Sección de servicios",
        description: "Presentación de servicios diseñada para comunicar beneficios de forma clara.",
        image: "/projects/sitio-negocio-local/slide-2.webp",
        alt: "Sección de servicios del sitio web",
      },
      {
        title: "Galería de trabajos",
        description: "Portfolio visual con proyectos realizados y casos de éxito.",
        image: "/projects/sitio-negocio-local/slide-3.webp",
        alt: "Galería de trabajos realizados",
      },
      {
        title: "Contacto",
        description: "Llamada a la acción con formulario y datos de contacto para facilitar la comunicación.",
        image: "/projects/sitio-negocio-local/slide-4.webp",
        alt: "Sección de contacto del sitio web",
      },
      {
        title: "Vista móvil",
        description: "Diseño responsivo optimizado para una experiencia fluida en dispositivos móviles.",
        image: "/projects/sitio-negocio-local/slide-5.webp",
        alt: "Vista móvil del sitio web",
      },
    ],
  },
  {
    id: "prototipo-validacion",
    title: "Prototipo digital para validación",
    category: "Prototipo",
    coverImage: "/projects/prototipo-validacion/cover.webp",
    coverAlt: "Vista principal del prototipo interactivo",
    need: "Convertir una idea inicial en una experiencia visual navegable para validar concepto y flujo.",
    value: "Mayor claridad para tomar decisiones antes de invertir en una plataforma completa.",
    slides: [
      {
        title: "Flujo principal",
        description: "Prototipo navegable que muestra el recorrido principal del usuario.",
        image: "/projects/prototipo-validacion/slide-1.webp",
        alt: "Flujo principal del prototipo",
      },
      {
        title: "Pantallas clave",
        description: "Diseño de las pantallas más importantes para validar la propuesta de valor.",
        image: "/projects/prototipo-validacion/slide-2.webp",
        alt: "Pantallas clave del prototipo",
      },
      {
        title: "Interacciones",
        description: "Transiciones y microinteracciones que simulan la experiencia final.",
        image: "/projects/prototipo-validacion/slide-3.webp",
        alt: "Interacciones del prototipo",
      },
    ],
  },
  {
    id: "dashboard-operativo",
    title: "Dashboard operativo para negocio",
    category: "Dashboard",
    coverImage: "/projects/dashboard-operativo/cover.webp",
    coverAlt: "Vista principal del dashboard operativo",
    need: "Centralizar métricas clave y operaciones diarias en una sola vista.",
    value: "Decisiones más rápidas basadas en datos reales y reducción de tiempo en tareas repetitivas.",
    slides: [
      {
        title: "Panel principal",
        description: "Vista centralizada con KPIs y métricas clave del negocio.",
        image: "/projects/dashboard-operativo/slide-1.webp",
        alt: "Panel principal del dashboard",
      },
      {
        title: "Gráficos y tendencias",
        description: "Visualización de datos históricos y tendencias para análisis.",
        image: "/projects/dashboard-operativo/slide-2.webp",
        alt: "Gráficos y tendencias del dashboard",
      },
      {
        title: "Gestión de tareas",
        description: "Módulo para seguimiento de tareas y operaciones pendientes.",
        image: "/projects/dashboard-operativo/slide-3.webp",
        alt: "Gestión de tareas en el dashboard",
      },
    ],
  },
  {
    id: "landing-activacion",
    title: "Landing para activación digital",
    category: "Landing Page",
    coverImage: "/projects/landing-activacion/cover.webp",
    coverAlt: "Vista de la landing page de activación",
    need: "Captar leads y comunicar una propuesta de valor de forma clara y atractiva.",
    value: "Conversiones más altas y una primera impresión profesional para el negocio.",
    slides: [
      {
        title: "Hero y propuesta",
        description: "Sección principal con propuesta de valor y llamada a la acción destacada.",
        image: "/projects/landing-activacion/slide-1.webp",
        alt: "Hero de la landing page",
      },
      {
        title: "Beneficios",
        description: "Sección de beneficios diseñada para comunicar valor rápidamente.",
        image: "/projects/landing-activacion/slide-2.webp",
        alt: "Sección de beneficios",
      },
      {
        title: "Formulario de captación",
        description: "Formulario optimizado para maximizar conversiones.",
        image: "/projects/landing-activacion/slide-3.webp",
        alt: "Formulario de captación de leads",
      },
    ],
  },
  {
    id: "automatizacion-interna",
    title: "Automatización de proceso interno",
    category: "Automatización",
    coverImage: "/projects/automatizacion-interna/cover.webp",
    coverAlt: "Diagrama del proceso automatizado",
    need: "Eliminar tareas manuales repetitivas y reducir errores humanos.",
    value: "Ahorro de tiempo, menos errores y equipo enfocado en tareas de mayor valor.",
    slides: [
      {
        title: "Flujo automatizado",
        description: "Diagrama del proceso antes y después de la automatización.",
        image: "/projects/automatizacion-interna/slide-1.webp",
        alt: "Flujo del proceso automatizado",
      },
      {
        title: "Panel de control",
        description: "Interface para monitorear y gestionar las automatizaciones activas.",
        image: "/projects/automatizacion-interna/slide-2.webp",
        alt: "Panel de control de automatizaciones",
      },
      {
        title: "Reportes",
        description: "Reportes automáticos generados por el sistema sin intervención manual.",
        image: "/projects/automatizacion-interna/slide-3.webp",
        alt: "Reportes automáticos del sistema",
      },
    ],
  },
]
