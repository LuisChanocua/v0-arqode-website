import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Compass, Home, Mail, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/lib/site"

const pageTitle = "404 | Página no encontrada | ArQode"
const pageDescription =
  "La página que buscas no está disponible. Vuelve al inicio de ArQode para explorar soluciones digitales, experiencias medibles y proyectos destacados."

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: "/404",
    languages: {
      "es-MX": "/404",
    },
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/404",
    siteName: siteConfig.name,
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ArQode - Página no encontrada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/twitter-image"],
  },
}

const notFoundJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: pageTitle,
  description: pageDescription,
  url: `${siteConfig.url}/404`,
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
}

const quickLinks = [
  {
    icon: Home,
    label: "Volver al inicio",
    href: "/",
  },
  {
    icon: Compass,
    label: "Ver soluciones",
    href: "/#soluciones",
  },
  {
    icon: Mail,
    label: "Contactar por correo",
    href: `mailto:${siteConfig.email}`,
  },
]

export default function NotFound() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background text-foreground">
      <JsonLd data={notFoundJsonLd} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="blob-gradient w-[640px] h-[640px] -top-44 -left-44"
          style={{ background: "var(--hero-gradient-1)" }}
        />
        <div
          className="blob-gradient w-[620px] h-[620px] top-1/4 -right-48"
          style={{ background: "var(--hero-gradient-2)" }}
        />
        <div
          className="blob-gradient w-[420px] h-[420px] bottom-0 left-1/4"
          style={{ background: "var(--hero-gradient-warm)" }}
        />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-[0.08] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 min-h-screen flex flex-col">
        <header className="py-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="ArQode - Inicio">
            <span className="w-10 h-10 rounded-xl bg-background/80 border border-border/60 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 overflow-hidden">
              <img
                src="/brand/arqode-logo.png"
                alt="Isotipo de ArQode"
                className="h-8 w-8 object-contain dark:hidden"
              />
              <img
                src="/brand/arqode-logo-dark.png"
                alt="Isotipo de ArQode"
                className="hidden h-8 w-8 object-contain dark:block"
              />
            </span>
            <span className="text-xl font-semibold text-foreground">ArQode</span>
          </Link>
        </header>

        <section className="flex-1 flex items-center justify-center py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border mb-8">
              <SearchX className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Error 404
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance mb-6">
              Esta ruta no encontró una{" "}
              <span className="text-gradient">experiencia disponible</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed">
              Puede que el enlace haya cambiado o que la página ya no exista.
              Volvamos a un punto con más señal: datos, experiencias digitales y resultados medibles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-200 text-primary-foreground px-8 font-medium shadow-lg hover:shadow-xl"
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Ir al inicio
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border bg-card/50 hover:bg-card/50 hover:text-current dark:hover:bg-card/50 hover:opacity-90 px-8 transition-all duration-200 font-medium"
              >
                <Link href="/#contacto">Hablemos de tu proyecto</Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="card-elevated p-4 flex items-center justify-center gap-3 text-sm font-medium text-foreground hover:-translate-y-1 transition-all duration-200"
                >
                  <link.icon className="w-4 h-4 text-primary" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
