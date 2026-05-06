"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectGalleryModal } from "./project-gallery-modal"

const defaultSlides = [
  {
    title: "Vista general",
    description: "Vista inicial de la solucion y navegacion principal.",
    imagePlaceholder: "Captura de la pantalla principal",
  },
  {
    title: "Problema resuelto",
    description: "Centralizacion de informacion que antes podia estar dispersa en archivos o procesos manuales.",
    imagePlaceholder: "Visualizacion del problema resuelto",
  },
  {
    title: "Flujo principal",
    description: "Flujo disenado para registrar, consultar o administrar informacion de forma sencilla.",
    imagePlaceholder: "Captura del flujo de trabajo",
  },
  {
    title: "Panel de operacion",
    description: "Herramientas internas para dar seguimiento y mantener control operativo.",
    imagePlaceholder: "Vista del panel administrativo",
  },
  {
    title: "Resultado",
    description: "Informacion mas clara, operacion mas ordenada y mejor experiencia para los usuarios.",
    imagePlaceholder: "Vista del resultado final",
  },
]

const projects = [
  {
    title: "Plataforma de gestion deportiva",
    need: "Organizar ligas, equipos, calendarios, partidos y resultados desde un solo lugar.",
    solution: "Se diseno una plataforma administrativa y publica para consultar informacion deportiva de forma ordenada.",
    value: "Mejor organizacion, consulta rapida de informacion y una experiencia mas clara para jugadores, organizadores y publico.",
    slides: defaultSlides,
  },
  {
    title: "Sitio web para negocio local",
    need: "Mejorar la presencia digital y facilitar el contacto con clientes potenciales.",
    solution: "Diseno de un sitio claro, responsivo y orientado a comunicar servicios de forma profesional.",
    value: "Mayor confianza, mejor presentacion comercial y un canal digital disponible 24/7.",
    slides: defaultSlides,
  },
  {
    title: "Prototipo digital para validacion de idea",
    need: "Convertir una idea inicial en una experiencia visual navegable para validar concepto y flujo.",
    solution: "Se construyo una interfaz funcional para presentar la propuesta y evaluar posibles mejoras antes de escalar.",
    value: "Mayor claridad para tomar decisiones antes de invertir en una plataforma completa.",
    slides: defaultSlides,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function PublicProjects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="proyectos" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[500px] h-[500px] top-0 left-1/3"
          style={{ background: "var(--hero-gradient-1)", opacity: 0.2 }}
        />
        <div 
          className="blob-gradient w-[400px] h-[400px] bottom-1/4 right-0"
          style={{ background: "var(--hero-gradient-2)", opacity: 0.15 }}
        />
        <div 
          className="blob-gradient w-[300px] h-[300px] bottom-0 left-0"
          style={{ background: "var(--hero-gradient-warm)", opacity: 0.15 }}
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
            Proyectos publicos y{" "}
            <span className="text-gradient">muestras visuales</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Algunos proyectos que podemos mostrar abiertamente. Explora cada uno para ver el recorrido visual de la solucion.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="card-elevated overflow-hidden group"
            >
              {/* Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {project.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div>
                    <span className="label-chip-challenge">Necesidad</span>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                      {project.need}
                    </p>
                  </div>
                  <div>
                    <span className="label-chip-solution">Solucion</span>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                  <div>
                    <span className="label-chip-impact">Valor</span>
                    <p className="text-foreground text-sm mt-2 font-medium leading-relaxed">
                      {project.value}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedProject(project)}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-primary-foreground shadow-lg hover:shadow-xl"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver recorrido visual
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <ProjectGalleryModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        projectTitle={selectedProject?.title || ""}
        slides={selectedProject?.slides || []}
      />
    </section>
  )
}
