"use client"

import { motion } from "framer-motion"
import { 
  FileSpreadsheet, 
  Target, 
  BarChart3, 
  Globe, 
  Workflow 
} from "lucide-react"

const problems = [
  {
    icon: FileSpreadsheet,
    title: "Información dispersa",
    description: "Para equipos que tienen datos, archivos o registros repartidos en distintas herramientas y no logran aprovecharlos.",
    result: "Información más clara para diseñar mejores experiencias y tomar decisiones con menos fricción.",
  },
  {
    icon: Target,
    title: "Campañas digitales complejas",
    description: "Para marcas que necesitan registros, códigos únicos, premios, rankings, trivias o dinámicas participativas.",
    result: "Experiencias promocionales más claras, medibles y listas para escalar.",
  },
  {
    icon: BarChart3,
    title: "Datos que no se aprovechan",
    description: "Para proyectos que generan información, pero no la convierten todavía en indicadores, aprendizajes o acciones.",
    result: "Decisiones más inteligentes a partir de datos ordenados y consultables.",
  },
  {
    icon: Globe,
    title: "Experiencias que no convierten",
    description: "Para marcas que necesitan sitios, portales, formularios o flujos digitales más claros para sus usuarios.",
    result: "Mejor experiencia, más confianza y más oportunidades de conversión.",
  },
  {
    icon: Workflow,
    title: "Herramientas desconectadas",
    description: "Para equipos que usan distintas plataformas y necesitan que la información fluya sin trabajo manual.",
    result: "Flujos más simples, menos errores y experiencias más consistentes.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function ProblemCards() {
  return (
    <section id="problemas" className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[600px] h-[600px] top-0 left-1/4"
          style={{ background: "var(--hero-gradient-2)" }}
        />
        <div 
          className="blob-gradient w-[500px] h-[500px] bottom-0 right-1/3"
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
            Datos, fricciones e ideas que convertimos en{" "}
            <span className="text-gradient">experiencias digitales</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Detectamos dónde hay información desaprovechada, interacción confusa o tareas repetitivas para transformarlo en soluciones que generan valor.
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="card-elevated p-6 flex flex-col h-full group transition-all duration-200"
            >
              {/* Label chip */}
              <span className="label-chip-challenge mb-4 self-start">Reto</span>
              
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/25 group-hover:to-accent/15 group-hover:scale-110 transition-all duration-200">
                <problem.icon className="w-7 h-7 text-primary" />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {problem.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
                {problem.description}
              </p>
              
              {/* Result */}
              <div className="pt-4 border-t border-border">
                <span className="label-chip-impact mb-2">Impacto</span>
                <p className="text-sm font-medium text-foreground mt-2 leading-relaxed">
                  {problem.result}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
