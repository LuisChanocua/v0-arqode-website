"use client"

import { motion } from "framer-motion"
import { Shield, Eye, Lock, Users } from "lucide-react"

const trustPoints = [
  {
    icon: Shield,
    title: "Seguridad",
    description: "Implementamos prácticas de desarrollo seguro y protección de datos.",
  },
  {
    icon: Eye,
    title: "Trazabilidad",
    description: "Cada acción queda registrada para auditoría y seguimiento.",
  },
  {
    icon: Lock,
    title: "Confidencialidad",
    description: "Mantenemos acuerdos estrictos de confidencialidad con nuestros clientes.",
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Trabajamos de la mano con equipos internos para asegurar el éxito.",
  },
]

export function TrustSection() {
  return (
    <section className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[600px] h-[600px] top-1/2 left-1/4 -translate-y-1/2"
          style={{ background: "var(--hero-gradient-2)" }}
        />
        <div 
          className="blob-gradient w-[500px] h-[500px] bottom-0 right-1/4"
          style={{ background: "var(--hero-gradient-3)" }}
        />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="card-elevated p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance text-foreground">
                Experiencia en proyectos donde la{" "}
                <span className="text-gradient">confidencialidad importa</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Hemos colaborado en soluciones digitales para marcas, equipos internos y proyectos privados 
                donde la seguridad, la trazabilidad y la confidencialidad son parte esencial del trabajo. 
                Por eso, nuestro enfoque combina análisis, ejecución técnica y cuidado en el manejo de la información.
              </p>
            </div>

            {/* Trust Points Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="text-center group cursor-default"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/25 group-hover:to-accent/15 group-hover:scale-110 transition-all duration-200">
                    <point.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
