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
    description: "Para operar procesos, registrar información, administrar usuarios o centralizar operaciones.",
  },
  {
    icon: Trophy,
    title: "Sistemas promocionales",
    description: "Para campañas con códigos, premios, rankings, trivias, registros, formularios y validaciones.",
  },
  {
    icon: PieChart,
    title: "Dashboards y analítica",
    description: "Para transformar datos en indicadores, reportes y tableros que faciliten decisiones.",
  },
  {
    icon: Cog,
    title: "Automatización de procesos",
    description: "Para reducir tareas manuales, validar información y conectar herramientas internas.",
  },
  {
    icon: Users,
    title: "Portales y experiencias digitales",
    description: "Para mejorar la interacción con clientes, usuarios, colaboradores o comunidades.",
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
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      
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
            Soluciones digitales para{" "}
            <span className="text-gradient">necesidades reales</span> de negocio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            No vendemos tecnología por tecnología. Ofrecemos soluciones conectadas a problemas específicos de operación, comercio y experiencia.
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
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass glass-hover rounded-2xl p-6 group cursor-default"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div>
                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {solution.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground text-sm">
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
