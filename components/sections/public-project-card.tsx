"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Clock, Code2, Eye, Layers, Globe, Lightbulb, LayoutDashboard, Rocket, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type PublicProject, isPlaceholderImage } from "@/data/public-projects"

// Category icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Sitio Web": <Globe className="w-5 h-5" />,
  "Plataforma Web": <Layers className="w-5 h-5" />,
  "Prototipo": <Lightbulb className="w-5 h-5" />,
  "Dashboard": <LayoutDashboard className="w-5 h-5" />,
  "Landing Page": <Rocket className="w-5 h-5" />,
  "Automatización": <Zap className="w-5 h-5" />,
  "Automatización inteligente": <Zap className="w-5 h-5" />,
  "Dashboards y analítica": <LayoutDashboard className="w-5 h-5" />,
  "Aplicación Móvil": <Layers className="w-5 h-5" />,
  "Software a medida": <Code2 className="w-5 h-5" />,
}

// Category color classes (using design tokens)
const categoryColors: Record<string, string> = {
  "Sitio Web": "bg-accent/10 text-accent",
  "Plataforma Web": "bg-primary/10 text-primary",
  "Prototipo": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Dashboard": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Landing Page": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "Automatización": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Automatización inteligente": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Dashboards y analítica": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Aplicación Móvil": "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "Software a medida": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
}

interface PublicProjectCardProps {
  project: PublicProject
  index: number
  onViewGallery: () => void
}

export function PublicProjectCard({ project, index, onViewGallery }: PublicProjectCardProps) {
  const hasRealCover = !project.coverPlaceholder && !isPlaceholderImage(project.coverImage)
  const valueLabel = project.comingSoon ? "Valor esperado" : "Valor generado"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <div className="card-elevated h-full flex flex-col overflow-hidden group">
        {/* Cover Image / Placeholder */}
        <div className="aspect-[16/10] bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
          {hasRealCover ? (
            <Image
              src={project.coverImage}
              alt={project.coverAlt || project.title}
              title={project.coverAlt || project.title}
              fill
              draggable={false}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/15 flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-primary">{index + 1}</span>
              </div>
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${categoryColors[project.category] || "bg-muted text-muted-foreground"}`}>
              {categoryIcons[project.category]}
              {project.category}
            </span>
          </div>

          {project.status && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center rounded-full border border-border/60 bg-card/85 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                {project.status}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-2">
            {project.title}
          </h3>

          <div className="space-y-3 flex-1">
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Necesidad</span>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed line-clamp-2">
                {project.need}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{valueLabel}</span>
              <p className="text-foreground text-sm mt-1 font-medium leading-relaxed line-clamp-2">
                {project.value}
              </p>
            </div>
          </div>

          <Button
            onClick={onViewGallery}
            disabled={project.comingSoon}
            className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-200 text-primary-foreground font-medium shadow-sm hover:shadow-md"
          >
            {project.comingSoon ? (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Proyecto en desarrollo
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Ver
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
