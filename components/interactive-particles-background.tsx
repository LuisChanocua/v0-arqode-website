"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseX: number
  baseY: number
}

interface InteractiveParticlesBackgroundProps {
  className?: string
}

export function InteractiveParticlesBackground({
  className = "",
}: InteractiveParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationFrameRef = useRef<number>()
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const getComputedColor = useCallback((cssVar: string, fallback: string): string => {
    if (typeof window === "undefined") return fallback
    const computed = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim()
    return computed || fallback
  }, [])

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const { width, height } = canvas
    const isMobile = width < 768
    const isSmall = width < 480
    
    // Adjust particle count based on screen size
    let particleCount = Math.floor((width * height) / 15000)
    if (isMobile) particleCount = Math.floor(particleCount * 0.5)
    if (isSmall) particleCount = Math.floor(particleCount * 0.3)
    particleCount = Math.max(20, Math.min(particleCount, 120))

    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1,
        baseX: x,
        baseY: y,
      })
    }
    particlesRef.current = particles
  }, [])

  const draw = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { width, height } = canvas
    const particles = particlesRef.current
    const mouse = mouseRef.current
    const isMobile = width < 768

    // Get colors from CSS variables
    const particleColor = getComputedColor("--particle-color", "oklch(0.7 0.2 220)")
    const lineColor = getComputedColor("--particle-line", "oklch(0.7 0.2 220 / 0.2)")

    ctx.clearRect(0, 0, width, height)

    // Connection distance based on screen size
    const connectionDistance = isMobile ? 100 : 150
    const mouseInfluenceRadius = isMobile ? 100 : 180

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Mouse interaction
      const dx = mouse.x - particle.x
      const dy = mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouseInfluenceRadius && mouse.x > 0) {
        const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius
        const angle = Math.atan2(dy, dx)
        // Subtle repulsion
        particle.vx -= Math.cos(angle) * force * 0.5
        particle.vy -= Math.sin(angle) * force * 0.5
      }

      // Return to base position slowly
      const returnForce = 0.01
      particle.vx += (particle.baseX - particle.x) * returnForce
      particle.vy += (particle.baseY - particle.y) * returnForce

      // Apply velocity with damping
      particle.vx *= 0.98
      particle.vy *= 0.98
      particle.x += particle.vx
      particle.y += particle.vy

      // Keep particles within bounds
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -1
        particle.x = Math.max(0, Math.min(width, particle.x))
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -1
        particle.y = Math.max(0, Math.min(height, particle.y))
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particleColor
      ctx.globalAlpha = 0.6
      ctx.fill()

      // Draw connections to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j]
        const cdx = particle.x - other.x
        const cdy = particle.y - other.y
        const dist = Math.sqrt(cdx * cdx + cdy * cdy)

        if (dist < connectionDistance) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(other.x, other.y)
          ctx.strokeStyle = lineColor
          ctx.globalAlpha = 1 - dist / connectionDistance
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Draw connection to mouse if close
      if (distance < mouseInfluenceRadius && mouse.x > 0) {
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.strokeStyle = lineColor
        ctx.globalAlpha = (1 - distance / mouseInfluenceRadius) * 0.5
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    })

    ctx.globalAlpha = 1
  }, [getComputedColor])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    draw(ctx, canvas)
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      // Debounce resize
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(() => {
        const parent = canvas.parentElement
        if (parent) {
          canvas.width = parent.clientWidth
          canvas.height = parent.clientHeight
          initParticles(canvas)
        }
      }, 100)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    // Initial setup
    const parent = canvas.parentElement
    if (parent) {
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      initParticles(canvas)
    }

    // Event listeners
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true })
    canvas.addEventListener("touchend", handleTouchEnd)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [initParticles, animate])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
