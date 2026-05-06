# Codara Website

Landing page y portfolio para Codara, una consultora tecnológica moderna que resuelve problemas reales de negocio mediante plataformas web, automatización, datos, dashboards, campañas digitales e integraciones.

## Stack Tecnológico

- **Framework:** Next.js 15 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React

## Requisitos Previos

- Node.js 22.x o superior
- pnpm (recomendado) o npm/yarn
- Docker y Docker Compose (opcional, para despliegue containerizado)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/codara-website.git
cd codara-website
```

### 2. Instalar dependencias

```bash
pnpm install
```

## Desarrollo

Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

## Build de Producción

### Build local

```bash
pnpm build
```

Para ejecutar el build de producción:

```bash
pnpm start
```

## Docker

### Build de la imagen

```bash
docker build -t codara-website .
```

### Ejecutar el contenedor

```bash
docker run -p 3000:3000 codara-website
```

### Usando Docker Compose

La forma más sencilla de ejecutar la aplicación con Docker:

```bash
# Build y ejecutar
docker compose up --build

# Ejecutar en segundo plano
docker compose up -d --build

# Detener
docker compose down
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto

```
codara-website/
├── app/                    # Next.js App Router
│   ├── globals.css         # Estilos globales y tokens de diseño
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Página de inicio
├── components/
│   ├── layout/             # Componentes de layout
│   │   ├── header.tsx      # Navegación principal
│   │   └── footer.tsx      # Pie de página
│   ├── sections/           # Secciones de la landing
│   │   ├── hero.tsx
│   │   ├── problem-cards.tsx
│   │   ├── process-section.tsx
│   │   ├── impact-cases.tsx
│   │   ├── solutions-section.tsx
│   │   ├── public-projects.tsx
│   │   ├── project-gallery-modal.tsx
│   │   ├── results-section.tsx
│   │   ├── trust-section.tsx
│   │   └── contact-cta.tsx
│   └── ui/                 # Componentes shadcn/ui
├── lib/                    # Utilidades
├── Dockerfile              # Configuración Docker para producción
├── docker-compose.yml      # Orquestación de contenedores
└── .dockerignore           # Archivos excluidos del build Docker
```

## Personalización

### Colores y Tema

Los tokens de diseño se encuentran en `app/globals.css`. El sitio usa un tema oscuro por defecto con acentos en azul eléctrico y cian.

### Contenido

- **Casos de impacto:** Editar en `components/sections/impact-cases.tsx`
- **Proyectos públicos:** Editar en `components/sections/public-projects.tsx`
- **Soluciones:** Editar en `components/sections/solutions-section.tsx`

### Formulario de Contacto

El formulario en `components/sections/contact-cta.tsx` es visual por ahora. Para conectarlo a un backend:

1. Crea un API route en `app/api/contact/route.ts`
2. Conecta el formulario al endpoint
3. Agrega validación y manejo de errores

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo |
| `pnpm build` | Genera build de producción |
| `pnpm start` | Ejecuta build de producción |
| `pnpm lint` | Ejecuta el linter |

## Licencia

MIT
