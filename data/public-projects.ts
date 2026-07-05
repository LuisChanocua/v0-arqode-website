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
    id: "chatbot-whatsapp",
    title: "Asistente inteligente para atención y productos",
    category: "Automatización inteligente",
    coverImage: "/projects/chatbot-whatsapp/slide-1.webp",
    coverAlt: "Asistente inteligente conectado con WhatsApp para atención y consulta de productos",
    need: "Facilitar que clientes y usuarios encuentren información sobre productos, servicios, pedidos y procesos del negocio sin depender de búsquedas manuales o largos tiempos de atención.",
    value: "Una experiencia conversacional que resuelve preguntas, recomienda productos, consulta información del negocio, captura prospectos y permite transferir la conversación a un asesor humano.",
    slides: [
      {
        title: "Asistente de bienvenida",
        description: "Menú conversacional con opciones para consultar productos, rastrear pedidos y acceder a otros servicios mediante interacciones compatibles con WhatsApp.",
        image: "/projects/chatbot-whatsapp/slide-1.webp",
        alt: "Menú inicial de un asistente inteligente integrado con WhatsApp",
      },
      {
        title: "Recomendación de productos",
        description: "El asistente interpreta las necesidades del usuario y recomienda productos con información de precio, características y acceso al catálogo.",
        image: "/projects/chatbot-whatsapp/slide-2.webp",
        alt: "Recomendaciones de productos realizadas por un asistente inteligente",
      },
      {
        title: "Información del negocio",
        description: "Respuestas automáticas sobre horarios, cobertura de envíos, métodos de pago, devoluciones y otras preguntas frecuentes.",
        image: "/projects/chatbot-whatsapp/slide-3.webp",
        alt: "Consulta de horarios, envíos y políticas mediante un chatbot",
      },
      {
        title: "Seguimiento de pedidos",
        description: "Consulta del estado de un pedido mediante información estructurada y opciones para solicitar asistencia adicional.",
        image: "/projects/chatbot-whatsapp/slide-4.webp",
        alt: "Consulta del estado de un pedido mediante WhatsApp",
      },
      {
        title: "Transferencia a un asesor",
        description: "Captura de datos de contacto y transferencia de la conversación a un asesor humano para continuar con atención personalizada.",
        image: "/projects/chatbot-whatsapp/slide-5.webp",
        alt: "Transferencia de una conversación desde un chatbot hacia un asesor humano",
      },
    ],
  },
  {
    id: "inteligencia-de-mercado",
    title: "Plataforma de inteligencia de mercado",
    category: "Dashboards y analítica",
    coverImage: "/projects/inteligencia-de-mercado/slide-1.webp",
    coverAlt: "Dashboard de inteligencia de mercado, marcas, segmentos y productos",
    need: "Centralizar información mensual de mercado, marcas, categorías, segmentos y productos para facilitar el análisis de participación, crecimiento y desempeño comercial.",
    value: "Una plataforma que transforma archivos dispersos en indicadores comparables, permitiendo identificar tendencias, cambios de participación y oportunidades de crecimiento.",
    slides: [
      {
        title: "Resumen de mercado",
        description: "Vista ejecutiva con tamaño del mercado, ventas de la compañía, participación, crecimiento, evolución mensual y principales marcas.",
        image: "/projects/inteligencia-de-mercado/slide-1.webp",
        alt: "Resumen ejecutivo de una plataforma de inteligencia de mercado",
      },
      {
        title: "Participación por marca",
        description: "Análisis de share of market, evolución mensual, variación de participación y comparativos entre marcas y fabricantes.",
        image: "/projects/inteligencia-de-mercado/slide-2.webp",
        alt: "Dashboard de participación de mercado por marca",
      },
      {
        title: "Categorías y segmentos",
        description: "Visualización del desempeño por categoría, segmento y canal para identificar áreas de crecimiento y cambios en el mercado.",
        image: "/projects/inteligencia-de-mercado/slide-3.webp",
        alt: "Análisis de categorías, segmentos y canales de venta",
      },
      {
        title: "Detalle de productos",
        description: "Consulta de productos, marcas, categorías, segmentos, ventas, participación y crecimiento mediante tablas y filtros.",
        image: "/projects/inteligencia-de-mercado/slide-4.webp",
        alt: "Detalle de productos dentro de una plataforma de inteligencia de mercado",
      },
      {
        title: "Carga y procesamiento",
        description: "Importación de archivos Excel o CSV, validación de estructura, seguimiento del procesamiento e historial de cargas.",
        image: "/projects/inteligencia-de-mercado/slide-5.webp",
        alt: "Carga y procesamiento de archivos para un dashboard de mercado",
      },
    ],
  },
  {
    id: "seguro-auto-movil",
    title: "App móvil para seguro de auto",
    category: "Aplicación Móvil",
    coverImage: "/projects/seguro-auto-movil/cover.jpg",
    coverAlt: "Pantallas de app móvil para controlar el seguro de un auto",
    need: "Diseñar una experiencia móvil que reuniera información del vehículo, vigencia del seguro y servicios relacionados en un recorrido simple.",
    value: "Una interfaz clara que convierte datos del auto en acciones útiles: asistencia, agenda, mantenimiento y consulta desde el celular.",
    slides: [
      {
        title: "Experiencia móvil",
        description: "Pantallas principales de una aplicación móvil enfocada en convertir información del auto en servicios, mantenimiento y asistencia accesible.",
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
    need: "Presentar una app logística con una muestra visual clara del producto, sus datos clave, su flujo y su experiencia de uso.",
    value: "Un recorrido más convincente para explicar valor, validar la idea y facilitar conversaciones comerciales con una experiencia tangible.",
    slides: [
      {
        title: "Vista principal",
        description: "Imagen de presentación del proyecto Logistics Pak, usada como referencia visual para comunicar producto, flujo y valor.",
        mediaType: "image",
        image: "/projects/logistics-pak/cover.png",
        alt: "Imagen principal del proyecto Logistics Pak",
      },
      {
        title: "Demostración en video",
        description: "Video demostrativo para mostrar el recorrido, la interacción y el comportamiento de la experiencia en movimiento.",
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
    need: "Centralizar datos de deportes, ligas, calendarios, partidos, resultados y clasificaciones en una plataforma pública fácil de consultar.",
    value: "Una experiencia más clara para consultar información deportiva, encontrar partidos y entender resultados sin perderse entre datos dispersos.",
    slides: [
      {
        title: "Vista general",
        description: "Página principal con acceso rápido a deportes, calendario, resultados y estadísticas clave de la plataforma.",
        image: "/projects/gestion-deportiva/slide-1.webp",
        alt: "Página principal de la plataforma de gestión deportiva",
      },
      {
        title: "Deportes y ligas activas",
        description: "Vista para explorar disciplinas deportivas, ligas activas y competencias disponibles de forma ordenada.",
        image: "/projects/gestion-deportiva/slide-2.webp",
        alt: "Sección de deportes y ligas activas",
      },
      {
        title: "Próximos partidos y resultados",
        description: "Secciones organizadas para consultar encuentros programados y resultados recientes con menos fricción.",
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
    need: "Presentar el restaurante, ordenar la información del menú y facilitar pedidos o consultas desde una experiencia digital sencilla.",
    value: "Una experiencia más atractiva para clientes: menú claro, pedido simple y acceso rápido a ubicación, contacto e información clave.",
    slides: [
      {
        title: "Vista principal",
        description: "Hero de bienvenida con propuesta gastronómica, llamadas a la acción y una composición visual enfocada en abrir el apetito y guiar al pedido.",
        image: "/projects/la-esmeralda/slide-1.webp",
        alt: "Vista principal del sitio web de La Esmeralda",
      },
      {
        title: "Menú digital",
        description: "Catálogo de platillos organizado por categorías, con imágenes, descripciones, precios y acción directa para agregar al pedido.",
        image: "/projects/la-esmeralda/slide-2.webp",
        alt: "Menú digital del restaurante La Esmeralda",
      },
      {
        title: "Ubicación",
        description: "Sección con mapa, dirección y botón para abrir la ubicación en Google Maps, facilitando la llegada al restaurante.",
        image: "/projects/la-esmeralda/slide-3.webp",
        alt: "Sección de ubicación de La Esmeralda",
      },
      {
        title: "Contacto",
        description: "Bloques de contacto con teléfono, WhatsApp, dirección y horario para que los clientes encuentren rápido lo que necesitan.",
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
    title: "Sitio web para marca artesanal",
    category: "Sitio Web",
    coverImage: "/projects/huaraches-huetamo/cover.webp",
    coverAlt: "Vista principal del sitio web de Huaraches Huetamo",
    need: "Crear una presencia digital para mostrar productos artesanales, comunicar la historia de la marca y facilitar pedidos personalizados.",
    value: "Una experiencia de marca más clara: catálogo profesional, narrativa artesanal y canal directo para convertir interés en conversación.",
    slides: [
      {
        title: "Vista principal",
        description: "Hero visual con identidad artesanal, mensaje de valor y llamada directa para convertir interés en un pedido por WhatsApp.",
        image: "/projects/huaraches-huetamo/slide-1.webp",
        alt: "Vista principal del sitio web de Huaraches Huetamo",
      },
      {
        title: "Historia de la marca",
        description: "Sección enfocada en comunicar tradición, experiencia y valor artesanal detrás de cada producto.",
        image: "/projects/huaraches-huetamo/slide-2.webp",
        alt: "Sección sobre la historia y tradición de Huaraches Huetamo",
      },
      {
        title: "Catálogo de productos",
        description: "Galería de productos con descripción, precio y opción para solicitar información sobre cada modelo.",
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
        description: "Sección de contacto con WhatsApp, correo, ubicación, redes sociales y mapa para facilitar la comunicación con personas interesadas.",
        image: "/projects/huaraches-huetamo/slide-5.webp",
        alt: "Sección de contacto y ubicación de Huaraches Huetamo",
      },
    ],
  },
]
