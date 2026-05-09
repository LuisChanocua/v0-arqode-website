export interface ProjectSlide {
  title: string
  description: string
  mediaType?: "image" | "video"
  image?: string
  video?: string
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
    id: "seguro-auto-movil",
    title: "App móvil para seguro de auto",
    category: "Aplicación Móvil",
    coverImage: "/projects/seguro-auto-movil/cover.jpg",
    coverAlt: "Pantallas de app móvil para controlar el seguro de un auto",
    need: "Diseñar una experiencia móvil para que el usuario pueda consultar su vehículo, controlar la vigencia del seguro y acceder rápido a servicios relacionados con su auto.",
    value: "Una interfaz clara y visual que centraliza seguro, agenda, mantenimiento y asistencia, facilitando la gestión del vehículo desde el celular.",
    slides: [
      {
        title: "Experiencia móvil",
        description: "Pantallas principales de una aplicación móvil enfocada en el control del seguro del auto, servicios, mantenimiento y reporte de siniestros.",
        mediaType: "image",
        image: "/projects/seguro-auto-movil/cover.jpg",
        alt: "Diseño de app móvil para seguro y servicios de auto",
      },
    ],
  },
  {
    id: "logistics-pak",
    title: "Logistics Pak",
    category: "Aplicación Móvil",
    coverImage: "/projects/logistics-pak/cover.png",
    coverAlt: "Vista principal del proyecto Logistics Pak",
    need: "Presentar una solución digital para operación logística con una muestra visual clara del producto y su experiencia de uso.",
    value: "Mayor claridad comercial para mostrar la plataforma, comunicar sus capacidades y facilitar la validación visual del proyecto con clientes potenciales.",
    slides: [
      {
        title: "Vista principal",
        description: "Imagen de presentación del proyecto Logistics Pak, usada como primera referencia visual dentro del portafolio.",
        mediaType: "image",
        image: "/projects/logistics-pak/cover.png",
        alt: "Imagen principal del proyecto Logistics Pak",
      },
      {
        title: "Demostración en video",
        description: "Video demostrativo del proyecto para mostrar su flujo visual y comportamiento en movimiento.",
        mediaType: "video",
        video: "/projects/logistics-pak/demo.mov",
        alt: "Video demostrativo del proyecto Logistics Pak",
      },
    ],
  },
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
]
