"use client"

import { useEffect, useCallback, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type ProjectSlide, isPlaceholderImage } from "@/data/public-projects"

interface ProjectGalleryModalProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
  slides: ProjectSlide[]
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
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
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
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  const currentSlide = slides[currentIndex]
  const hasRealImage = currentSlide && !isPlaceholderImage(currentSlide.image)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-w-6xl max-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-2rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header - Fixed */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-border shrink-0">
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">
                  {projectTitle}
                </h3>
                <span className="text-xs sm:text-sm text-muted-foreground shrink-0">
                  {currentIndex + 1} / {slides.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full shrink-0 w-8 h-8 sm:w-9 sm:h-9 hover:bg-secondary"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>

            {/* Content - Scrollable with centered wrapper */}
            <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
              <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
                {/* Image Area with Controls - Centered wrapper */}
                <div className="relative mx-auto w-full max-w-4xl">
                  {/* Image Container */}
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.15}
                      onDragEnd={handleDragEnd}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-secondary to-muted relative flex items-center justify-center">
                        {hasRealImage ? (
                          <Image
                            src={currentSlide.image}
                            alt={currentSlide.alt || currentSlide.title}
                            title={currentSlide.alt || currentSlide.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 900px"
                            priority={currentIndex === 0}
                          />
                        ) : (
                          <div className="text-center p-6 sm:p-8">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 flex items-center justify-center shadow-md">
                              <span className="text-xl sm:text-2xl font-bold text-primary">
                                {currentIndex + 1}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                              {currentSlide?.image || `Slide ${currentIndex + 1}`}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Previous Button - Inside centered image wrapper */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 rounded-full w-9 h-9 sm:w-10 sm:h-10 bg-card/90 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>

                  {/* Next Button - Inside centered image wrapper */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 rounded-full w-9 h-9 sm:w-10 sm:h-10 bg-card/90 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>

                {/* Slide Info - Centered */}
                <div className="mx-auto mt-6 max-w-2xl text-center">
                  <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                    {currentSlide?.title}
                  </h4>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {currentSlide?.description}
                  </p>
                </div>

                {/* Dot Indicators - Centered */}
                <div className="mt-6 flex justify-center gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1)
                        setCurrentIndex(index)
                      }}
                      className={`h-2 sm:h-2.5 rounded-full transition-all duration-200 ${
                        index === currentIndex
                          ? "bg-primary w-5 sm:w-6"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2 sm:w-2.5"
                      }`}
                      aria-label={`Ir a diapositiva ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
