"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  radius: number
}

interface InteractiveParticlesBackgroundProps {
  className?: string
}

export function InteractiveParticlesBackground({
  className = "",
}: InteractiveParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999, isInside: false })
  const animationFrameRef = useRef<number | null>(null)
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Configuration
  const config = {
    // Desktop settings
    connectionDistance: 150,
    mouseInfluenceRadius: 180,
    particleSpeed: { min: 0.15, max: 0.4 },
    particleRadius: { min: 1.3, max: 2.2 },
    lineWidth: 0.6,
    baseLineOpacity: 0.15,
    activeLineOpacity: 0.45,
    particleOpacity: 0.6,
    mouseRepelStrength: 0.02,
    returnStrength: 0.01,
    damping: 0.97,
    // Mobile adjustments
    mobile: {
      connectionDistance: 100,
      mouseInfluenceRadius: 120,
      particleCountMultiplier: 0.35,
    }
  }

  const getParticleCount = useCallback((width: number, height: number) => {
    const area = width * height
    const isMobile = width < 768
    const isSmall = width < 480
    
    let count = Math.floor(area / 12000)
    if (isMobile) count = Math.floor(count * config.mobile.particleCountMultiplier)
    if (isSmall) count = Math.floor(count * 0.6)
    
    return Math.max(20, Math.min(count, 100))
  }, [])

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const { width, height } = canvas
    const count = getParticleCount(width, height)
    const particles: Particle[] = []

    for (let i = 0; i < count; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const speed = config.particleSpeed.min + Math.random() * (config.particleSpeed.max - config.particleSpeed.min)
      const angle = Math.random() * Math.PI * 2
      
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: config.particleRadius.min + Math.random() * (config.particleRadius.max - config.particleRadius.min),
      })
    }
    
    particlesRef.current = particles
  }, [getParticleCount])

  const draw = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { width, height } = canvas
    const particles = particlesRef.current
    const mouse = mouseRef.current
    const isMobile = width < 768

    // Get theme colors
    const isDark = document.documentElement.classList.contains('dark')
    
    // Colors based on theme - using HSL for easy opacity manipulation
    const dotColor = isDark 
      ? 'hsl(215, 80%, 70%)'   // Bright blue for dark mode
      : 'hsl(215, 80%, 50%)'   // Blue for light mode
    
    const lineColorBase = isDark
      ? 'hsla(215, 80%, 70%,'  // Blue-ish for dark
      : 'hsla(215, 80%, 50%,'  // Blue for light
    
    const lineColorActive = isDark
      ? 'hsla(190, 90%, 65%,'  // Cyan for dark
      : 'hsla(190, 80%, 45%,'  // Teal for light

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Adjust distances for mobile
    const connDist = isMobile ? config.mobile.connectionDistance : config.connectionDistance
    const mouseRadius = isMobile ? config.mobile.mouseInfluenceRadius : config.mouseInfluenceRadius

    // Update particles
    particles.forEach((particle) => {
      // Calculate mouse influence
      if (mouse.isInside) {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius && distance > 0) {
          // Repel from mouse
          const force = (mouseRadius - distance) / mouseRadius
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force * config.mouseRepelStrength
          particle.vy += Math.sin(angle) * force * config.mouseRepelStrength
        }
      }

      // Gentle return to base position
      particle.vx += (particle.baseX - particle.x) * config.returnStrength
      particle.vy += (particle.baseY - particle.y) * config.returnStrength

      // Apply damping
      particle.vx *= config.damping
      particle.vy *= config.damping

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Soft boundary bounce
      const margin = 10
      if (particle.x < margin) {
        particle.x = margin
        particle.vx *= -0.5
      } else if (particle.x > width - margin) {
        particle.x = width - margin
        particle.vx *= -0.5
      }
      if (particle.y < margin) {
        particle.y = margin
        particle.vy *= -0.5
      } else if (particle.y > height - margin) {
        particle.y = height - margin
        particle.vy *= -0.5
      }
    })

    // Draw connections between particles
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i]
      
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connDist) {
          // Calculate line opacity based on distance
          let opacity = (1 - distance / connDist) * config.baseLineOpacity

          // Check if mouse is near this connection (midpoint)
          if (mouse.isInside) {
            const midX = (p1.x + p2.x) / 2
            const midY = (p1.y + p2.y) / 2
            const mouseDist = Math.sqrt(
              Math.pow(mouse.x - midX, 2) + Math.pow(mouse.y - midY, 2)
            )
            
            if (mouseDist < mouseRadius) {
              const influence = 1 - mouseDist / mouseRadius
              opacity = Math.max(opacity, influence * config.activeLineOpacity)
              
              // Use active color for mouse-influenced lines
              ctx.strokeStyle = `${lineColorActive}${opacity.toFixed(3)})`
            } else {
              ctx.strokeStyle = `${lineColorBase}${opacity.toFixed(3)})`
            }
          } else {
            ctx.strokeStyle = `${lineColorBase}${opacity.toFixed(3)})`
          }

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.lineWidth = config.lineWidth
          ctx.stroke()
        }
      }
    }

    // Draw particles (dots)
    particles.forEach((particle) => {
      let opacity = config.particleOpacity

      // Increase opacity near mouse
      if (mouse.isInside) {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < mouseRadius) {
          const influence = 1 - distance / mouseRadius
          opacity = Math.min(1, opacity + influence * 0.4)
        }
      }

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = dotColor.replace(')', ` / ${opacity})`)
      ctx.fill()
    })

    // Draw connections from mouse to nearby particles
    if (mouse.isInside) {
      particles.forEach((particle) => {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius * 0.8) {
          const opacity = (1 - distance / (mouseRadius * 0.8)) * 0.25
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(particle.x, particle.y)
          ctx.strokeStyle = `${lineColorActive}${opacity.toFixed(3)})`
          ctx.lineWidth = 0.4
          ctx.stroke()
        }
      })
    }
  }, [])

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

    // Resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(() => {
        const parent = canvas.parentElement
        if (parent) {
          const rect = parent.getBoundingClientRect()
          canvas.width = rect.width
          canvas.height = rect.height
          initParticles(canvas)
        }
      }, 150)
    }

    // Mouse handlers - attached to window for proper tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Check if mouse is inside canvas bounds
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
      
      mouseRef.current = { x, y, isInside }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, isInside: false }
    }

    // Touch handlers
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        const x = e.touches[0].clientX - rect.left
        const y = e.touches[0].clientY - rect.top
        const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
        
        mouseRef.current = { x, y, isInside }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999, isInside: false }
    }

    // Initial setup
    const parent = canvas.parentElement
    if (parent) {
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      initParticles(canvas)
    }

    // Event listeners - mouse events on window for better tracking
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      
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
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 5 }}
      aria-hidden="true"
    />
  )
}
