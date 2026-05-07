"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface Mouse {
  x: number
  y: number
}

export function InteractiveParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Particle array
    const particles: Particle[] = []
    
    // Mouse position
    const mouse: Mouse = { x: -9999, y: -9999 }

    // Configuration
    const PARTICLE_COUNT = 80
    const CONNECTION_DISTANCE = 150
    const MOUSE_RADIUS = 200
    const PARTICLE_SPEED = 0.5

    // Resize canvas to fill parent
    function resizeCanvas() {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    // Initialize particles
    function initParticles() {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED,
          radius: Math.random() * 2 + 1,
        })
      }
    }

    // Get colors based on theme
    function getColors() {
      const isDark = document.documentElement.classList.contains("dark")
      return {
        particle: isDark ? "rgba(100, 180, 255, 0.8)" : "rgba(59, 130, 246, 0.7)",
        line: isDark ? "rgba(100, 180, 255," : "rgba(59, 130, 246,",
        activeLine: isDark ? "rgba(56, 189, 248," : "rgba(6, 182, 212,",
      }
    }

    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const colors = getColors()

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move particle
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Mouse interaction - repel particles
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          const angle = Math.atan2(dy, dx)
          p.x += Math.cos(angle) * force * 2
          p.y += Math.sin(angle) * force * 2
        }

        // Draw particle (node)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = colors.particle
        ctx.fill()

        // Draw connections to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2)

          if (distance < CONNECTION_DISTANCE) {
            // Calculate opacity based on distance
            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.5

            // Check if mouse is near this line
            const midX = (p.x + p2.x) / 2
            const midY = (p.y + p2.y) / 2
            const mouseDist = Math.sqrt(
              (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2
            )

            // Use brighter color if mouse is near
            if (mouseDist < MOUSE_RADIUS) {
              const boost = (1 - mouseDist / MOUSE_RADIUS) * 0.5
              ctx.strokeStyle = `${colors.activeLine}${(opacity + boost).toFixed(2)})`
            } else {
              ctx.strokeStyle = `${colors.line}${opacity.toFixed(2)})`
            }

            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }

        // Draw line from mouse to nearby particles
        if (dist < MOUSE_RADIUS * 0.7) {
          const opacity = (1 - dist / (MOUSE_RADIUS * 0.7)) * 0.4
          ctx.strokeStyle = `${colors.activeLine}${opacity.toFixed(2)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(mouse.x, mouse.y)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }
      }

      requestAnimationFrame(animate)
    }

    // Mouse move handler
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    // Mouse leave handler
    function handleMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    // Touch handlers for mobile
    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouse.x = e.touches[0].clientX - rect.left
        mouse.y = e.touches[0].clientY - rect.top
      }
    }

    function handleTouchEnd() {
      mouse.x = -9999
      mouse.y = -9999
    }

    // Initialize
    resizeCanvas()
    initParticles()

    // Event listeners
    window.addEventListener("resize", () => {
      resizeCanvas()
      initParticles()
    })
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd)

    // Start animation loop
    const animationId = requestAnimationFrame(function loop() {
      animate()
    })

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  )
}
