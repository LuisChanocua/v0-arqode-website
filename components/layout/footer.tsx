"use client"

import { siteConfig } from "@/lib/site"

const footerLinks = [
  { label: "Inicio", href: "#inicio" },
  // { label: "Problemas que resolvemos", href: "#problemas" },
  // { label: "Casos de impacto", href: "#casos" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#inicio" className="flex items-center gap-2.5 mb-4 group" aria-label="ArQode - Inicio" title="ArQode">
              <div className="w-10 h-10 rounded-xl bg-background/80 border border-border/60 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 overflow-hidden">
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
              </div>
              <span className="text-xl font-semibold text-foreground">ArQode</span>
            </a>
            <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
              Soluciones digitales que convierten información e ideas en experiencias claras, útiles y medibles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Enlaces</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Huetamo de Núñez, MX
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {currentYear} ArQode. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground text-sm">
            Hecho con tecnología moderna para experiencias que generan valor.
          </p>
        </div>
      </div>
    </footer>
  )
}
