"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { 
  PromotionalDashboardMockup, 
  CommercialDashboardMockup, 
  InternalOperationsMockup,
  MobileExperienceMockup 
} from "@/components/mockups/case-mockups"

const cases = [
  {
    title: "Plataforma promocional para marca de consumo masivo",
    challenge: "Una marca necesitaba activar una campaña digital con registro de participantes, validación de códigos únicos, premios y seguimiento de interacción.",
    solution: "Se desarrolló una plataforma para convertir la dinámica promocional en una experiencia web medible, con datos centralizados y administración privada.",
    experience: "Los consumidores podían participar de forma sencilla, mientras el equipo tenía visibilidad sobre registros, códigos, premios, rankings y comportamiento de la campaña.",
    impact: "La marca obtuvo una experiencia promocional más controlada, datos accionables y mayor claridad para evaluar resultados.",
    capabilities: ["Registro digital", "Validación de códigos", "Lógica de premios", "Panel administrativo", "Reportes", "Datos de participación", "Reglas de campaña"],
    MockupComponent: PromotionalDashboardMockup,
  },
  {
    title: "Dashboard comercial para análisis de mercado",
    challenge: "Un equipo comercial necesitaba analizar información de ventas, productos y participación de mercado desde múltiples fuentes de datos.",
    solution: "Se diseñó un modelo de datos para transformar información dispersa en indicadores claros, consultables desde dashboards ejecutivos.",
    experience: "Los equipos podían explorar métricas clave por periodo, marca, categoría o producto, facilitando análisis y conversaciones mejor enfocadas.",
    impact: "La solución convirtió datos complejos en una experiencia de consulta clara para detectar oportunidades y tomar mejores decisiones.",
    capabilities: ["Modelado de datos", "Normalización de información", "Indicadores comerciales", "Dashboards", "Reportería ejecutiva", "Análisis histórico"],
    MockupComponent: CommercialDashboardMockup,
  },
  {
    title: "Plataforma para gestión de información",
    challenge: "Un equipo gestionaba registros, validaciones y seguimiento mediante archivos, correos y consultas fragmentadas.",
    solution: "Se creó una plataforma administrativa para centralizar datos, automatizar validaciones, asignar roles, consultar historial y generar reportes.",
    experience: "Los usuarios internos podían trabajar desde un panel claro, con permisos diferenciados y flujos controlados para registrar, consultar y validar información.",
    impact: "La información ganó orden, velocidad y trazabilidad, facilitando mejores respuestas y reduciendo dependencia de trabajo manual.",
    capabilities: ["Panel administrativo", "Roles de usuario", "Flujos de aprobación", "Carga de datos", "Validaciones automáticas", "Reportes"],
    MockupComponent: InternalOperationsMockup,
  },
  {
    title: "Experiencia digital para activación de usuarios",
    challenge: "Una empresa necesitaba captar información de usuarios y convertir una interacción breve en una experiencia participativa y medible.",
    solution: "Se diseñó una experiencia web con formularios, preguntas, dinámicas interactivas y conexión con indicadores de seguimiento.",
    experience: "Los usuarios podían interactuar de manera simple y atractiva, mientras la empresa obtenía información útil sobre su audiencia.",
    impact: "La solución transformó una captura de datos en una experiencia digital con mayor valor, mejor medición y objetivos comerciales más claros.",
    capabilities: ["Formularios inteligentes", "Experiencias interactivas", "Registro de usuarios", "Segmentación", "Reportería", "Integración con campañas"],
    MockupComponent: MobileExperienceMockup,
  },
]

export function ImpactCases() {
  return (
    <section id="casos" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[700px] h-[700px] top-1/4 -left-64"
          style={{ background: "var(--hero-gradient-1)" }}
        />
        <div 
          className="blob-gradient w-[600px] h-[600px] bottom-0 right-0"
          style={{ background: "var(--hero-gradient-3)" }}
        />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            Datos reales.{" "}
            <span className="text-gradient">Experiencias medibles.</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Por acuerdos de confidencialidad, algunos proyectos se presentan de forma anonimizada. 
            Conservamos lo más importante: el contexto, la experiencia creada y el impacto generado, 
            sin revelar información sensible del cliente.
          </p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <p className="text-xs text-muted-foreground bg-secondary/50 inline-block px-4 py-2 rounded-full border border-border">
            Las imágenes mostradas en casos anonimizados son representaciones conceptuales creadas para ilustrar el tipo de solución desarrollada. No contienen información real de clientes ni datos sensibles.
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
              className="card-elevated overflow-hidden transition-all duration-200"
            >
              <div className="p-6 lg:p-8">
                {/* Case Header */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-primary">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-foreground">
                    {caseItem.title}
                  </h3>
                </div>

                {/* Two Column Layout: Content + Mockup */}
                <div className="grid lg:grid-cols-5 gap-8">
                  {/* Left Column - Content (3/5) */}
                  <div className="lg:col-span-3 space-y-6">
                    {/* Case Content Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Challenge & Solution */}
                      <div className="space-y-6">
                        <div>
                          <span className="label-chip-challenge mb-2">Reto</span>
                          <p className="text-muted-foreground mt-2 leading-relaxed">
                            {caseItem.challenge}
                          </p>
                        </div>
                        <div>
                          <span className="label-chip-solution mb-2">Solución</span>
                          <p className="text-muted-foreground mt-2 leading-relaxed">
                            {caseItem.solution}
                          </p>
                        </div>
                      </div>

                      {/* Experience & Impact */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            La experiencia creada
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {caseItem.experience}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                          <span className="label-chip-impact mb-2">Impacto</span>
                          <p className="text-foreground font-medium mt-2 leading-relaxed">
                            {caseItem.impact}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Capacidades aplicadas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {caseItem.capabilities.map((capability) => (
                          <Badge
                            key={capability}
                            variant="secondary"
                            className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                          >
                            {capability}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Mockup (2/5) */}
                  <div className="lg:col-span-2">
                    <div className="sticky top-8">
                      <caseItem.MockupComponent />
                    </div>
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
