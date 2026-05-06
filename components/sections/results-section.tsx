"use client"

import { motion } from "framer-motion"
import { 
  ArrowDownToLine, 
  Eye, 
  Database, 
  BrainCircuit, 
  Smile, 
  Zap, 
  Megaphone, 
  PieChart, 
  TrendingUp 
} from "lucide-react"

const results = [
  { icon: ArrowDownToLine, text: "Reducir procesos manuales" },
  { icon: Eye, text: "Mejorar la trazabilidad de la operacion" },
  { icon: Database, text: "Centralizar informacion" },
  { icon: BrainCircuit, text: "Facilitar la toma de decisiones" },
  { icon: Smile, text: "Mejorar la experiencia del usuario" },
  { icon: Zap, text: "Aumentar la eficiencia de equipos internos" },
  { icon: Megaphone, text: "Activar campanas digitales medibles" },
  { icon: PieChart, text: "Convertir datos dispersos en informacion util" },
  { icon: TrendingUp, text: "Escalar procesos que antes dependian de Excel, correos o seguimiento manual" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

export function ResultsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: "var(--hero-gradient-1)", opacity: 0.25 }}
        />
        <div 
          className="blob-gradient w-[400px] h-[400px] top-0 right-0"
          style={{ background: "var(--hero-gradient-warm)", opacity: 0.2 }}
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            No construimos por construir.{" "}
            <span className="text-gradient">Disenamos para generar resultados.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Cada solucion esta orientada a generar un impacto tangible en la operacion, la experiencia o los resultados del negocio.
          </p>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {results.map((result) => (
            <motion.div
              key={result.text}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.2 } }}
              className="card-elevated p-4 flex items-center gap-4 group cursor-default hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 group-hover:scale-110 transition-all duration-300">
                <result.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-foreground font-medium leading-relaxed">
                {result.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
