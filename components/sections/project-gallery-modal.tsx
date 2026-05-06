"use client"

import { useEffect, useCallback, useState } from "react"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  title: string
  description: string
  imagePlaceholder: string
}

interface ProjectGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  slides: Slide[]
}

export function ProjectGalleryModal({
  isOpen,
  onClose,
  projectTitle,
  slides,
}: ProjectGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1)
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, slides.length])

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      goToPrevious()
    } else if (info.offset.x < -threshold) {
      goToNext()
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, goToNext, goToPrevious])

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
      setDirection(0)
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] card-elevated overflow-hidden"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full glass hover:bg-secondary"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Project Title */}
            <div className="p-6 border-b border-border/50">
              <h3 className="text-xl font-semibold text-foreground pr-12">{projectTitle}</h3>
            </div>

            {/* Slides Container */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="cursor-grab active:cursor-grabbing"
                >
                  {/* Slide Content */}
                  <div className="p-6">
                    {/* Image Placeholder */}
                    <div className="aspect-video rounded-2xl bg-gradient-to-br from-secondary to-muted flex items-center justify-center mb-6 overflow-hidden border border-border/50">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center shadow-lg">
                          <span className="text-2xl font-bold text-primary">{currentIndex + 1}</span>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {slides[currentIndex]?.imagePlaceholder}
                        </p>
                      </div>
                    </div>

                    {/* Slide Info */}
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {slides[currentIndex]?.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {slides[currentIndex]?.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="p-6 border-t border-border/50 flex items-center justify-between">
              {/* Previous Button */}
              <Button
                variant="outline"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="gap-2 transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </Button>

              {/* Indicators */}
              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1)
                      setCurrentIndex(index)
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2.5"
                    }`}
                    aria-label={`Ir a diapositiva ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                onClick={goToNext}
                disabled={currentIndex === slides.length - 1}
                className="gap-2 transition-all duration-300"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
