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
    title: "Procesos manuales y operación dispersa",
    description: "Para empresas que todavía dependen de Excel, validaciones manuales, correos o archivos sueltos.",
    result: "Mayor control, trazabilidad y reducción de errores.",
  },
  {
    icon: Target,
    title: "Campañas digitales complejas",
    description: "Para marcas que necesitan registros, códigos únicos, premios, rankings, trivias o dinámicas promocionales.",
    result: "Campañas más controladas, medibles y escalables.",
  },
  {
    icon: BarChart3,
    title: "Datos que no se aprovechan",
    description: "Para equipos que tienen información, pero no cuentan con indicadores claros o dashboards accionables.",
    result: "Mejores decisiones a partir de información centralizada.",
  },
  {
    icon: Globe,
    title: "Experiencias digitales para clientes",
    description: "Para negocios que necesitan sitios, portales, formularios o flujos digitales que conecten mejor con sus usuarios.",
    result: "Mejor experiencia, más confianza y mayor conversión.",
  },
  {
    icon: Workflow,
    title: "Integraciones y automatización",
    description: "Para empresas que usan distintas herramientas y necesitan que sus sistemas se comuniquen entre sí.",
    result: "Menos tareas repetitivas, menos errores y más velocidad operativa.",
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
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
            Problemas que convertimos en{" "}
            <span className="text-gradient">soluciones digitales</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Identificamos los retos operativos y comerciales de tu negocio para transformarlos en herramientas que generan resultados.
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
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass glass-hover rounded-2xl p-6 flex flex-col h-full group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {problem.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 flex-grow">
                {problem.description}
              </p>
              
              {/* Result */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm">
                  <span className="text-primary font-medium">Resultado: </span>
                  <span className="text-muted-foreground">{problem.result}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
