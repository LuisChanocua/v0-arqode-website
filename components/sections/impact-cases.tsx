"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const cases = [
  {
    title: "Plataforma promocional para marca de consumo masivo",
    challenge: "Una marca necesitaba operar una campaña digital con registro de participantes, validación de códigos únicos, control de premios y seguimiento de participación.",
    solution: "Se desarrolló una plataforma digital para centralizar registros, validar participaciones, administrar dinámicas promocionales y dar seguimiento operativo desde un panel privado.",
    experience: "Los consumidores podían participar de forma sencilla desde una experiencia web, mientras el equipo interno tenía visibilidad sobre registros, códigos, premios, rankings y comportamiento de la campaña.",
    impact: "La marca pudo operar una campaña compleja con mayor control, trazabilidad y menor dependencia de procesos manuales.",
    capabilities: ["Registro digital", "Validación de códigos", "Lógica de premios", "Panel administrativo", "Reportes", "Trazabilidad de participación", "Reglas de negocio"],
  },
  {
    title: "Dashboard comercial para análisis de mercado",
    challenge: "Un equipo comercial necesitaba analizar información de ventas, productos y participación de mercado desde múltiples fuentes de datos.",
    solution: "Se diseñó un modelo de datos y procesos de análisis para transformar información dispersa en indicadores claros, consultables desde dashboards ejecutivos.",
    experience: "Los equipos podían consultar métricas clave por periodo, marca, categoría o producto, facilitando el análisis de desempeño y la detección de variaciones relevantes.",
    impact: "La solución permitió mejorar la visibilidad del negocio, reducir discrepancias en la interpretación de datos y facilitar conversaciones más claras entre equipos comerciales, analíticos y directivos.",
    capabilities: ["Modelado de datos", "Normalización de información", "Indicadores comerciales", "Dashboards", "Reportería ejecutiva", "Análisis histórico"],
  },
  {
    title: "Automatización de operación interna",
    challenge: "Un equipo gestionaba procesos internos mediante archivos, validaciones manuales y seguimiento fragmentado.",
    solution: "Se creó una plataforma administrativa para centralizar registros, automatizar validaciones, asignar roles, consultar información histórica y generar reportes operativos.",
    experience: "Los usuarios internos podían operar desde un panel claro, con permisos diferenciados y flujos controlados para registrar, consultar y validar información.",
    impact: "El proceso ganó orden, velocidad y trazabilidad. La operación dejó de depender de documentos aislados y pasó a gestionarse desde una herramienta centralizada.",
    capabilities: ["Panel administrativo", "Roles de usuario", "Flujos de aprobación", "Carga de información", "Validaciones automáticas", "Reportes"],
  },
  {
    title: "Experiencia digital para activación de usuarios",
    challenge: "Una empresa necesitaba captar información de usuarios y convertir una interacción digital en una experiencia participativa y medible.",
    solution: "Se diseñó una experiencia web con formularios, preguntas, dinámicas interactivas y conexión con procesos internos de seguimiento.",
    experience: "Los usuarios podían interactuar de manera simple y atractiva, mientras la empresa obtenía información útil para entender mejor a su audiencia.",
    impact: "La solución ayudó a transformar una simple captura de datos en una experiencia digital más valiosa, medible y alineada a objetivos comerciales.",
    capabilities: ["Formularios inteligentes", "Experiencias interactivas", "Registro de usuarios", "Segmentación", "Reportería", "Integración con campañas"],
  },
]

export function ImpactCases() {
  return (
    <section id="casos" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Problemas reales.{" "}
            <span className="text-gradient">Soluciones medibles.</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Por acuerdos de confidencialidad, algunos proyectos se presentan de forma anonimizada. 
            Conservamos lo más importante: el contexto del reto, la solución implementada y el impacto generado, 
            sin revelar información sensible del cliente.
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="space-y-8 mt-12">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="p-6 lg:p-8">
                {/* Case Header */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-primary">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                    {caseItem.title}
                  </h3>
                </div>

                {/* Case Content Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                        El reto
                      </h4>
                      <p className="text-muted-foreground">
                        {caseItem.challenge}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                        La solución
                      </h4>
                      <p className="text-muted-foreground">
                        {caseItem.solution}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                        La experiencia creada
                      </h4>
                      <p className="text-muted-foreground">
                        {caseItem.experience}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                        El impacto
                      </h4>
                      <p className="text-foreground font-medium">
                        {caseItem.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Capacidades aplicadas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.capabilities.map((capability) => (
                      <Badge
                        key={capability}
                        variant="secondary"
                        className="bg-secondary/80 text-secondary-foreground hover:bg-secondary"
                      >
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
