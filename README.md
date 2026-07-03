# ArQode Website

Landing page y portfolio para ArQode, una consultora tecnológica moderna que resuelve problemas reales de negocio mediante plataformas web, automatización, datos, dashboards, campañas digitales e integraciones.

## Stack Tecnológico

- **Framework:** Next.js 16 con App Router
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Email transaccional:** Resend mediante Route Handler de Next.js

## Requisitos Previos

- Docker
- Docker Compose

> Este proyecto se trabaja con Docker. Para instalar dependencias, correr desarrollo, validar builds o reproducir producción, usa los servicios de Docker Compose en lugar de instalar librerías localmente.

## Desarrollo Local con Docker

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/arqode-website.git
cd arqode-website/v0-arqode-website
```

### 2. Configurar variables locales

El archivo `.env.development` no se versiona y es el que carga `docker-compose.dev.yml` para desarrollo.

Variables mínimas para probar la página:

```env
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PORT=3000
HOSTNAME=0.0.0.0
EMAIL_PROVIDER=resend
RESEND_API_KEY=
CONTACT_FROM_EMAIL=contacto@arqode.mx
CONTACT_TO_EMAIL=contacto@arqode.mx
```

Si quieres probar envíos reales desde local, configura `RESEND_API_KEY` con una key válida de Resend. No la subas al repositorio.

### 3. Iniciar desarrollo

```bash
docker compose -f docker-compose.dev.yml up
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

Para detener:

```bash
docker compose -f docker-compose.dev.yml down
```

### Instalar dependencias

Las dependencias se instalan dentro del contenedor. Por ejemplo, para agregar una librería:

```bash
docker compose -f docker-compose.dev.yml run --rm arqode-website-dev sh -lc "corepack enable && corepack prepare pnpm@10.24.0 --activate && pnpm add nombre-paquete"
```

No uses `npm install`, `pnpm install` ni `pnpm add` desde el host local.

## Validación con Docker

TypeScript:

```bash
docker compose -f docker-compose.dev.yml run --rm arqode-website-dev sh -lc "corepack enable && corepack prepare pnpm@10.24.0 --activate && pnpm exec tsc --noEmit"
```

Build de Next.js:

```bash
docker compose -f docker-compose.dev.yml run --rm arqode-website-dev sh -lc "corepack enable && corepack prepare pnpm@10.24.0 --activate && NODE_ENV=production pnpm build"
```

Build de imagen:

```bash
docker build -t arqode-website:test .
```

El script `pnpm lint` existe, pero actualmente el proyecto no tiene ESLint/config instalado. Si se habilita lint más adelante, debe agregarse la dependencia y configuración correspondiente.

## Producción con Docker y Portainer

El despliegue de producción usa `docker-compose.yml` desde un Repository Stack de Portainer. Las variables deben configurarse en la sección **Environment variables** del Stack; no se usa `env_file` ni se versiona un `stack.env` real.

Variables esperadas en Portainer:

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NEXT_PUBLIC_SITE_URL=https://arqode.mx
PORT=3000
HOSTNAME=0.0.0.0
EMAIL_PROVIDER=resend
RESEND_API_KEY=<valor real configurado manualmente>
CONTACT_FROM_EMAIL=contacto@arqode.mx
CONTACT_TO_EMAIL=contacto@arqode.mx
```

`CONTACT_FROM_EMAIL` es necesario porque Resend requiere que el remitente (`From`) pertenezca a un dominio verificado. El correo del visitante no debe usarse como `From`; se envía como `Reply-To` para poder responderle directamente.

Comando equivalente para levantar producción fuera de Portainer:

```bash
docker compose up -d --build
```

Para detener:

```bash
docker compose down
```

El contenedor final corre como usuario Linux sin privilegios `nextjs` y expone el puerto `3000`. El healthcheck usa:

```bash
wget -q --spider http://127.0.0.1:3000
```

## Formulario de Contacto

El formulario vive en:

```txt
components/sections/contact-cta.tsx
```

Campos enviados:

- `name` requerido
- `email` requerido
- `phone` opcional, mostrado como Celular
- `company` opcional
- `projectType` opcional
- `message` requerido
- `website` como honeypot antispam invisible

El formulario envía datos a:

```txt
POST /api/contact
```

El endpoint está en:

```txt
app/api/contact/route.ts
```

Flujo de email:

- Provider actual: Resend.
- `From`: `ArQode Website <CONTACT_FROM_EMAIL>`.
- `To`: `CONTACT_TO_EMAIL`.
- `Reply-To`: correo capturado en el formulario.
- Subject: `Nuevo contacto desde ArQode - {nombre}`.

El formulario no ofrece envío por WhatsApp. La solicitud se recibe por correo y ArQode da seguimiento después con los datos capturados.
La interfaz muestra una notificación de éxito cuando el envío se completa y una notificación de error cuando falla la API, la red, el rate limit o el servicio de Resend. Los errores de validación del formulario se muestran inline junto a cada campo, sin toast.

Protecciones del endpoint:

- Límite de payload.
- Honeypot antispam.
- Validación server-side.
- Límite en memoria de 5 solicitudes por IP cada 10 minutos.
- Deduplicación temporal de 10 minutos para evitar reenviar el mismo payload ya procesado.

El rate limit y la deduplicación en memoria funcionan por proceso/contenedor. Si el sitio corre con varias réplicas o se necesita una protección más estricta, usa un límite externo en Nginx Proxy Manager, Cloudflare, Redis o el gateway que esté delante de la app.

La API key solo debe existir como variable privada `RESEND_API_KEY`. No uses variables `NEXT_PUBLIC_` para secretos.

La lógica está separada para poder cambiar de proveedor en el futuro:

```txt
lib/contact/application/send-contact-message.ts
lib/contact/domain/
lib/contact/validation/contact-schema.ts
lib/contact/infrastructure/email/
lib/config/server-env.ts
```

Para agregar otro proveedor como SES, SendGrid, Postmark o SMTP, crea otro adapter que implemente `EmailProvider` y cambia la selección en `email-provider-factory.ts`. El formulario y el Route Handler no deberían cambiar.

El footer muestra `contacto@arqode.mx` como enlace `mailto:`.

## Estructura del Proyecto

```
arqode-website/
├── app/                    # Next.js App Router
│   ├── api/contact/        # Route Handler del formulario de contacto
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
├── lib/
│   ├── config/             # Configuración privada de servidor
│   ├── contact/            # Dominio, validación, caso de uso y email provider
│   └── site.ts             # Configuración pública del sitio
├── Dockerfile              # Configuración Docker para producción
├── docker-compose.yml      # Orquestación de contenedores
├── docker-compose.dev.yml  # Entorno de desarrollo con Docker
└── .dockerignore           # Archivos excluidos del build Docker
```

## Agregar imágenes de proyectos públicos

Para agregar imágenes reales a un proyecto público:

1. **Crear carpeta del proyecto:**
   ```
   public/projects/[project-id]/
   ```

2. **Agregar imágenes:**
   - `cover.webp` - Imagen de portada para la card
   - `slide-1.webp`, `slide-2.webp`, etc. - Imágenes para la galería

3. **Actualizar datos:**
   Editar `data/public-projects.ts` con las rutas correctas:
   ```ts
   {
     id: "mi-proyecto",
     coverImage: "/projects/mi-proyecto/cover.webp",
     slides: [
       {
         title: "Vista general",
         description: "Descripción del slide",
         image: "/projects/mi-proyecto/slide-1.webp",
         alt: "Texto alternativo"
       },
       // más slides...
     ]
   }
   ```

**Estructura esperada:**
```
public/
  projects/
    gestion-deportiva/
      cover.webp
      slide-1.webp
      slide-2.webp
      ...
    sitio-negocio-local/
      cover.webp
      slide-1.webp
      ...
```

Si las imágenes no existen, se mostrará un placeholder automáticamente.

## Personalización

### Colores y Tema

Los tokens de diseño se encuentran en `app/globals.css`. El sitio usa un tema oscuro por defecto con acentos en azul eléctrico y cian.

### Contenido

- **Casos de impacto:** Editar en `components/sections/impact-cases.tsx`
- **Proyectos públicos:** Editar en `components/sections/public-projects.tsx`
- **Soluciones:** Editar en `components/sections/solutions-section.tsx`

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo dentro del contenedor |
| `pnpm build` | Genera build de producción dentro del contenedor |
| `pnpm start` | Ejecuta build de producción dentro del contenedor |
| `pnpm lint` | Actualmente requiere agregar ESLint/config al proyecto |

## Licencia

MIT
