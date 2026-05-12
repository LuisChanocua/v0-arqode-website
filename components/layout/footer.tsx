"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Github, Mail } from "lucide-react"

const footerLinks = [
  { label: "Inicio", href: "#inicio" },
  // { label: "Problemas que resolvemos", href: "#problemas" },
  // { label: "Casos de impacto", href: "#casos" },
  { label: "Soluciones", href: "#soluciones" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
]

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "#contacto", label: "Email" },
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
            {/* Social Links */}
            {/* <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-secondary/80 hover:bg-secondary border border-border flex items-center justify-center transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </motion.a>
              ))}
            </div> */}
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
          {/* <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hola@arqode.dev"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  hola@arqode.dev
                </a>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Ciudad de México, MX
                </span>
              </li>
            </ul>
          </div> */}
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
