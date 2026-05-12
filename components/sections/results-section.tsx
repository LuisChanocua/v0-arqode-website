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
  { icon: ArrowDownToLine, text: "Convertir interacción en contactos, registros o ventas" },
  { icon: Eye, text: "Hacer más clara la experiencia con tu marca" },
  { icon: Database, text: "Ordenar información clave en un solo lugar" },
  { icon: BrainCircuit, text: "Tomar decisiones con datos accionables" },
  { icon: Smile, text: "Crear recorridos más simples para clientes y usuarios" },
  { icon: Zap, text: "Ahorrar tiempo en tareas repetitivas" },
  { icon: Megaphone, text: "Activar campañas digitales medibles" },
  { icon: PieChart, text: "Entender qué funciona, qué no y qué mejorar" },
  { icon: TrendingUp, text: "Escalar una idea con una base digital sólida" },
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
      <div className="absolute inset-0 grid-pattern opacity-[0.25]" />
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ background: "var(--hero-gradient-1)" }}
        />
        <div 
          className="blob-gradient w-[500px] h-[500px] top-0 right-0"
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
            Diseñamos experiencias que se sienten claras.{" "}
            <span className="text-gradient">Y se miden en resultados.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Cada solución busca que usuarios y clientes entiendan, participen, compren o se comuniquen con menos fricción, mientras tú obtienes información útil para seguir creciendo.
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
              className="card-elevated p-4 flex items-center gap-4 group cursor-default transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center shrink-0 group-hover:from-primary/25 group-hover:to-accent/15 group-hover:scale-110 transition-all duration-200">
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
