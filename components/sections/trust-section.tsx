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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 lg:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance">
                Experiencia en proyectos donde la{" "}
                <span className="text-gradient">confidencialidad importa</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
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
                  className="text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <point.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
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
