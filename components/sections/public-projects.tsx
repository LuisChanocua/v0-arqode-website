"use client"

import { useState, useEffect } from "react"
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [totalSlides, setTotalSlides] = useState(0)

  // Update carousel state when API is ready or selection changes
  useEffect(() => {
    if (!carouselApi) return

    const updateState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap())
      setTotalSlides(carouselApi.scrollSnapList().length)
    }

    updateState()
    carouselApi.on("select", updateState)
    carouselApi.on("reInit", updateState)

    return () => {
      carouselApi.off("select", updateState)
      carouselApi.off("reInit", updateState)
    }
  }, [carouselApi])

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
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
                Proyectos públicos y{" "}
                <span className="text-gradient">muestras visuales</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
                Algunos proyectos que podemos mostrar abiertamente. Explora cada uno para ver el recorrido visual de la solución.
              </p>
            </div>

            {/* Desktop Navigation - In Header */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollPrev()}
                className="rounded-full w-10 h-10 bg-card/80 backdrop-blur-sm border-border shadow-sm hover:shadow-md transition-all"
                aria-label="Proyecto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollNext()}
                className="rounded-full w-10 h-10 bg-card/80 backdrop-blur-sm border-border shadow-sm hover:shadow-md transition-all"
                aria-label="Proyecto siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Carousel */}
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: true,
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {publicProjects.map((project, index) => (
              <CarouselItem 
                key={project.id} 
                className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
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

        {/* Mobile Navigation - Below Carousel */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={() => carouselApi?.scrollPrev()}
            className="rounded-full w-10 h-10 bg-card/80 backdrop-blur-sm border-border shadow-sm transition-all"
            aria-label="Proyecto anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => carouselApi?.scrollNext()}
            className="rounded-full w-10 h-10 bg-card/80 backdrop-blur-sm border-border shadow-sm transition-all"
            aria-label="Proyecto siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalSlides || publicProjects.length }).map((_, index) => (
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
