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
    challenge: "Una marca necesitaba operar una campana digital con registro de participantes, validacion de codigos unicos, control de premios y seguimiento de participacion.",
    solution: "Se desarrollo una plataforma digital para centralizar registros, validar participaciones, administrar dinamicas promocionales y dar seguimiento operativo desde un panel privado.",
    experience: "Los consumidores podian participar de forma sencilla desde una experiencia web, mientras el equipo interno tenia visibilidad sobre registros, codigos, premios, rankings y comportamiento de la campana.",
    impact: "La marca pudo operar una campana compleja con mayor control, trazabilidad y menor dependencia de procesos manuales.",
    capabilities: ["Registro digital", "Validacion de codigos", "Logica de premios", "Panel administrativo", "Reportes", "Trazabilidad de participacion", "Reglas de negocio"],
    MockupComponent: PromotionalDashboardMockup,
  },
  {
    title: "Dashboard comercial para analisis de mercado",
    challenge: "Un equipo comercial necesitaba analizar informacion de ventas, productos y participacion de mercado desde multiples fuentes de datos.",
    solution: "Se diseno un modelo de datos y procesos de analisis para transformar informacion dispersa en indicadores claros, consultables desde dashboards ejecutivos.",
    experience: "Los equipos podian consultar metricas clave por periodo, marca, categoria o producto, facilitando el analisis de desempeno y la deteccion de variaciones relevantes.",
    impact: "La solucion permitio mejorar la visibilidad del negocio, reducir discrepancias en la interpretacion de datos y facilitar conversaciones mas claras entre equipos comerciales, analiticos y directivos.",
    capabilities: ["Modelado de datos", "Normalizacion de informacion", "Indicadores comerciales", "Dashboards", "Reporteria ejecutiva", "Analisis historico"],
    MockupComponent: CommercialDashboardMockup,
  },
  {
    title: "Automatizacion de operacion interna",
    challenge: "Un equipo gestionaba procesos internos mediante archivos, validaciones manuales y seguimiento fragmentado.",
    solution: "Se creo una plataforma administrativa para centralizar registros, automatizar validaciones, asignar roles, consultar informacion historica y generar reportes operativos.",
    experience: "Los usuarios internos podian operar desde un panel claro, con permisos diferenciados y flujos controlados para registrar, consultar y validar informacion.",
    impact: "El proceso gano orden, velocidad y trazabilidad. La operacion dejo de depender de documentos aislados y paso a gestionarse desde una herramienta centralizada.",
    capabilities: ["Panel administrativo", "Roles de usuario", "Flujos de aprobacion", "Carga de informacion", "Validaciones automaticas", "Reportes"],
    MockupComponent: InternalOperationsMockup,
  },
  {
    title: "Experiencia digital para activacion de usuarios",
    challenge: "Una empresa necesitaba captar informacion de usuarios y convertir una interaccion digital en una experiencia participativa y medible.",
    solution: "Se diseno una experiencia web con formularios, preguntas, dinamicas interactivas y conexion con procesos internos de seguimiento.",
    experience: "Los usuarios podian interactuar de manera simple y atractiva, mientras la empresa obtenia informacion util para entender mejor a su audiencia.",
    impact: "La solucion ayudo a transformar una simple captura de datos en una experiencia digital mas valiosa, medible y alineada a objetivos comerciales.",
    capabilities: ["Formularios inteligentes", "Experiencias interactivas", "Registro de usuarios", "Segmentacion", "Reporteria", "Integracion con campanas"],
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
            Problemas reales.{" "}
            <span className="text-gradient">Soluciones medibles.</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Por acuerdos de confidencialidad, algunos proyectos se presentan de forma anonimizada. 
            Conservamos lo mas importante: el contexto del reto, la solucion implementada y el impacto generado, 
            sin revelar informacion sensible del cliente.
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
            Las imagenes mostradas en casos anonimizados son representaciones conceptuales creadas para ilustrar el tipo de solucion desarrollada. No contienen informacion real de clientes ni datos sensibles.
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
                          <span className="label-chip-solution mb-2">Solucion</span>
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
