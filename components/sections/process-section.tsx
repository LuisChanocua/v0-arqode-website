"use client"

import { motion } from "framer-motion"
import { Search, Lightbulb, Code2, TrendingUp } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Entendemos el negocio",
    description: "Analizamos el proceso, los usuarios, las reglas y los puntos de friccion.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Disenamos la solucion",
    description: "Convertimos la necesidad en una propuesta digital clara, escalable y alineada al objetivo del negocio.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Construimos la plataforma",
    description: "Desarrollamos la solucion con enfoque en experiencia, operacion, seguridad y crecimiento.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Medimos el impacto",
    description: "Integramos datos, reportes o indicadores para que el negocio pueda evaluar resultados.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[600px] h-[600px] top-0 left-1/4"
          style={{ background: "var(--hero-gradient-1)" }}
        />
        <div 
          className="blob-gradient w-[500px] h-[500px] bottom-0 right-1/4"
          style={{ background: "var(--hero-gradient-2)" }}
        />
        <div 
          className="blob-gradient w-[400px] h-[400px] top-1/2 right-0"
          style={{ background: "var(--hero-gradient-warm)" }}
        />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            Antes de construir,{" "}
            <span className="text-gradient">entendemos el problema</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Nuestro proceso esta disenado para asegurar que cada solucion responda a una necesidad real del negocio.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative"
              >
                {/* Step Card */}
                <div className="card-elevated p-6 h-full flex flex-col items-center text-center group transition-all duration-200">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-primary-foreground">{step.number}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-4 mt-4 group-hover:from-primary/25 group-hover:to-accent/15 group-hover:scale-110 transition-all duration-200">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block card-elevated px-8 py-4">
            <p className="text-lg font-medium text-foreground">
              No construimos tecnologia aislada.{" "}
              <span className="text-gradient">Construimos herramientas conectadas al negocio.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
