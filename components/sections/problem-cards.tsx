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
    title: "Procesos manuales y operacion dispersa",
    description: "Para empresas que todavia dependen de Excel, validaciones manuales, correos o archivos sueltos.",
    result: "Mayor control, trazabilidad y reduccion de errores.",
  },
  {
    icon: Target,
    title: "Campanas digitales complejas",
    description: "Para marcas que necesitan registros, codigos unicos, premios, rankings, trivias o dinamicas promocionales.",
    result: "Campanas mas controladas, medibles y escalables.",
  },
  {
    icon: BarChart3,
    title: "Datos que no se aprovechan",
    description: "Para equipos que tienen informacion, pero no cuentan con indicadores claros o dashboards accionables.",
    result: "Mejores decisiones a partir de informacion centralizada.",
  },
  {
    icon: Globe,
    title: "Experiencias digitales para clientes",
    description: "Para negocios que necesitan sitios, portales, formularios o flujos digitales que conecten mejor con sus usuarios.",
    result: "Mejor experiencia, mas confianza y mayor conversion.",
  },
  {
    icon: Workflow,
    title: "Integraciones y automatizacion",
    description: "Para empresas que usan distintas herramientas y necesitan que sus sistemas se comuniquen entre si.",
    result: "Menos tareas repetitivas, menos errores y mas velocidad operativa.",
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
            Problemas que convertimos en{" "}
            <span className="text-gradient">soluciones digitales</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
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
