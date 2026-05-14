"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { InteractiveParticlesBackground } from "@/components/interactive-particles-background"

const floatingCards = [
  { label: "Datos", delay: 0 },
  { label: "Experiencia", delay: 0.1 },
  { label: "Usuarios", delay: 0.2 },
  { label: "Conversión", delay: 0.3 },
  { label: "Crecimiento", delay: 0.4 },
]

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Layer 0: Interactive particles canvas (behind everything) */}
      <div className="absolute inset-0 z-0">
        <InteractiveParticlesBackground />
      </div>

      {/* Layer 1: Background gradient blobs (very subtle, above canvas) */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-50">
        {/* Primary blue blob */}
        <div
          className="blob-gradient w-[600px] h-[600px] -top-48 -left-48"
          style={{ background: "var(--hero-gradient-1)" }}
        />
        {/* Cyan/teal blob */}
        <div
          className="blob-gradient w-[700px] h-[700px] top-1/4 -right-64"
          style={{ background: "var(--hero-gradient-2)" }}
        />
        {/* Subtle purple accent */}
        <div
          className="blob-gradient w-[500px] h-[500px] bottom-1/4 left-1/4"
          style={{ background: "var(--hero-gradient-3)" }}
        />
        {/* Warm accent for balance */}
        <div
          className="blob-gradient w-[400px] h-[400px] bottom-0 right-1/4"
          style={{ background: "var(--hero-gradient-warm)" }}
        />
      </div>

      {/* Layer 2: Subtle grid pattern */}
      <div className="absolute inset-0 z-[6] grid-pattern opacity-[0.08] pointer-events-none" />

      {/* Layer 3: Content (above everything) */}
      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border mb-8"
          >
            <span className="font-mono text-sm font-semibold text-primary">&lt;</span>
            <span className="text-sm font-medium text-muted-foreground">
              Tecnología pensada para negocio, operación y experiencia
            </span>
            <span className="font-mono text-sm font-semibold text-primary">/&gt;</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6 text-foreground"
          >
            Experiencias digitales que convierten{" "} 
            <span className="text-gradient">d4t0s</span>
            {" "}en{" "}
            <span className="text-gradient">re$ultado$</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed"
          >
            Creamos sitios, plataformas, automatizaciones e integraciones que transforman
            datos, ideas y necesidades reales en interacciones claras, útiles y medibles.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-200 text-primary-foreground px-8 font-medium shadow-lg hover:shadow-xl"
            >
              <a href="#contacto">
                Hablemos de tu proyecto
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border bg-card/50 hover:bg-card/50 hover:text-current dark:hover:bg-card/50 hover:opacity-90 px-8 transition-all duration-200 font-medium"
            >
              <a href="#proyectos">Ver proyectos</a>
            </Button>
          </motion.div>

          {/* Floating Concept Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-16"
          >
            {floatingCards.map((card) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + card.delay }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-card/80 border border-border px-5 py-3 rounded-xl cursor-default transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="text-sm font-medium text-foreground">{card.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
