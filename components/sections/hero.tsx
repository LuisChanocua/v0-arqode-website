"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { InteractiveParticlesBackground } from "@/components/interactive-particles-background"

const floatingCards = [
  { label: "Procesos", delay: 0 },
  { label: "Datos", delay: 0.1 },
  { label: "Experiencia", delay: 0.2 },
  { label: "Resultados", delay: 0.3 },
  { label: "Automatizacion", delay: 0.4 },
]

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient blobs - warmer and more premium */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary blue blob */}
        <div 
          className="blob-gradient w-[500px] h-[500px] -top-32 -left-32"
          style={{ background: "var(--hero-gradient-1)" }}
        />
        {/* Cyan/teal blob */}
        <div 
          className="blob-gradient w-[600px] h-[600px] top-1/4 -right-48"
          style={{ background: "var(--hero-gradient-2)" }}
        />
        {/* Subtle purple accent */}
        <div 
          className="blob-gradient w-[400px] h-[400px] bottom-1/4 left-1/4"
          style={{ background: "var(--hero-gradient-3)" }}
        />
        {/* Warm accent for balance */}
        <div 
          className="blob-gradient w-[350px] h-[350px] bottom-0 right-1/4"
          style={{ background: "var(--hero-gradient-warm)" }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Interactive particles canvas */}
      <InteractiveParticlesBackground className="opacity-60" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Tecnologia pensada para negocio, operacion y experiencia
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6"
          >
            Soluciones digitales que convierten procesos en{" "}
            <span className="text-gradient">resultados</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          >
            Disenamos plataformas, automatizaciones y experiencias digitales para ayudarte 
            a operar mejor, entender tus datos y crear interacciones mas valiosas con tus clientes.
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
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-primary-foreground px-8 shadow-lg hover:shadow-xl hover:scale-[1.02] glow-subtle"
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
              className="border-border hover:bg-secondary/50 px-8 transition-all duration-300 hover:scale-[1.02]"
            >
              <a href="#casos">Ver casos de impacto</a>
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
                className="glass px-5 py-3 rounded-xl cursor-default transition-all duration-300 hover:shadow-lg"
              >
                <span className="text-sm font-medium text-foreground">{card.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
