"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { PublicProjectCard } from "./public-project-card"
import { ProjectGalleryModal } from "./project-gallery-modal"
import { publicProjects, type PublicProject } from "@/data/public-projects"

export function PublicProjects() {
  const [selectedProject, setSelectedProject] = useState<PublicProject | null>(null)
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Update carousel state when it changes
  const onApiChange = (api: CarouselApi) => {
    if (!api) return
    
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setCurrentIndex(api.selectedScrollSnap())

    api.on("select", () => {
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
      setCurrentIndex(api.selectedScrollSnap())
    })
  }

  // Set API and attach listeners
  const handleSetApi = (api: CarouselApi) => {
    setCarouselApi(api)
    onApiChange(api)
  }

  return (
    <section id="proyectos" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="blob-gradient w-[600px] h-[600px] top-0 left-1/3"
          style={{ background: "var(--hero-gradient-1)" }}
        />
        <div 
          className="blob-gradient w-[500px] h-[500px] bottom-1/4 right-0"
          style={{ background: "var(--hero-gradient-2)" }}
        />
        <div 
          className="blob-gradient w-[400px] h-[400px] bottom-0 left-0"
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
            Proyectos públicos y{" "}
            <span className="text-gradient">muestras visuales</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Algunos proyectos que podemos mostrar abiertamente. Explora cada uno para ver el recorrido visual de la solución.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full w-10 h-10 bg-card/80 backdrop-blur-sm border-border shadow-md hover:shadow-lg disabled:opacity-40 transition-all"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="hidden md:flex absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full w-10 h-10 bg-card/80 backdrop-blur-sm border-border shadow-md hover:shadow-lg disabled:opacity-40 transition-all"
              aria-label="Proyecto siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Carousel */}
          <Carousel
            setApi={handleSetApi}
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {publicProjects.map((project, index) => (
                <CarouselItem 
                  key={project.id} 
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <PublicProjectCard
                    project={project}
                    index={index}
                    onViewGallery={() => setSelectedProject(project)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Buttons - Mobile */}
          <div className="flex md:hidden justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full w-10 h-10 bg-card/80 backdrop-blur-sm border-border shadow-md disabled:opacity-40 transition-all"
              aria-label="Proyecto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full w-10 h-10 bg-card/80 backdrop-blur-sm border-border shadow-md disabled:opacity-40 transition-all"
              aria-label="Proyecto siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {publicProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => carouselApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                }`}
                aria-label={`Ir al proyecto ${index + 1}`}
              />
            ))}
          </div>
        </div>
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
