"use client"

import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  Trophy, 
  PieChart, 
  Cog, 
  Users, 
  Link2 
} from "lucide-react"

const solutions = [
  {
    icon: LayoutDashboard,
    title: "Plataformas web a la medida",
    description: "Para operar procesos, registrar informacion, administrar usuarios o centralizar operaciones.",
  },
  {
    icon: Trophy,
    title: "Sistemas promocionales",
    description: "Para campanas con codigos, premios, rankings, trivias, registros, formularios y validaciones.",
  },
  {
    icon: PieChart,
    title: "Dashboards y analitica",
    description: "Para transformar datos en indicadores, reportes y tableros que faciliten decisiones.",
  },
  {
    icon: Cog,
    title: "Automatizacion de procesos",
    description: "Para reducir tareas manuales, validar informacion y conectar herramientas internas.",
  },
  {
    icon: Users,
    title: "Portales y experiencias digitales",
    description: "Para mejorar la interaccion con clientes, usuarios, colaboradores o comunidades.",
  },
  {
    icon: Link2,
    title: "Integraciones",
    description: "Para conectar sistemas, APIs, formularios, CRMs, WhatsApp, bases de datos o herramientas externas.",
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

export function SolutionsSection() {
  return (
    <section id="soluciones" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[600px] h-[600px] top-0 right-0"
          style={{ background: "var(--hero-gradient-1)" }}
        />
        <div 
          className="blob-gradient w-[500px] h-[500px] bottom-0 left-0"
          style={{ background: "var(--hero-gradient-2)" }}
        />
        <div 
          className="blob-gradient w-[400px] h-[400px] top-1/2 left-1/3"
          style={{ background: "var(--hero-gradient-warm)" }}
        />
      </div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
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
            Soluciones digitales para{" "}
            <span className="text-gradient">necesidades reales</span> de negocio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            No vendemos tecnologia por tecnologia. Ofrecemos soluciones conectadas a problemas especificos de operacion, comercio y experiencia.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {solutions.map((solution) => (
            <motion.div
              key={solution.title}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="card-elevated p-6 group cursor-default transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center shrink-0 group-hover:from-primary/25 group-hover:to-accent/15 group-hover:scale-110 transition-all duration-200">
                  <solution.icon className="w-7 h-7 text-primary" />
                </div>
                
                <div>
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {solution.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
