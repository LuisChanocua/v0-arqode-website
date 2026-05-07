"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export function InteractiveParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Configuration
    const isMobile = window.innerWidth < 768
    const PARTICLE_COUNT = isMobile ? 45 : 90
    const CONNECTION_DISTANCE = isMobile ? 120 : 160
    const MOUSE_INFLUENCE_RADIUS = 200
    const PARTICLE_SPEED = 0.35
    const PARTICLE_RADIUS_MIN = 1.4
    const PARTICLE_RADIUS_MAX = 2.2
    const LINE_WIDTH = 0.7

    // Particle array
    const particles: Particle[] = []

    // Mouse state
    const mouse = { x: -9999, y: -9999, active: false }

    // Get colors from CSS variables
    function getColors() {
      const style = getComputedStyle(document.documentElement)
      const dotHSL = style.getPropertyValue("--particle-dot").trim() || "214 90% 48%"
      const lineHSL = style.getPropertyValue("--particle-line").trim() || "214 90% 48%"
      const lineActiveHSL = style.getPropertyValue("--particle-line-active").trim() || "190 95% 45%"
      return { dotHSL, lineHSL, lineActiveHSL }
    }

    let colors = getColors()

    // Set canvas size with devicePixelRatio for crisp rendering
    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1
      const parent = canvas.parentElement
      if (!parent) return

      const width = parent.clientWidth
      const height = parent.clientHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    // Initialize particles with random positions and velocities
    function initParticles() {
      particles.length = 0
      const parent = canvas.parentElement
      if (!parent) return

      const width = parent.clientWidth
      const height = parent.clientHeight

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
          radius: PARTICLE_RADIUS_MIN + Math.random() * (PARTICLE_RADIUS_MAX - PARTICLE_RADIUS_MIN),
        })
      }
    }

    // Update particle positions and handle mouse interaction
    function updateParticles() {
      const parent = canvas.parentElement
      if (!parent) return

      const width = parent.clientWidth
      const height = parent.clientHeight

      for (const p of particles) {
        // Mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MOUSE_INFLUENCE_RADIUS && dist > 0) {
            const force = (MOUSE_INFLUENCE_RADIUS - dist) / MOUSE_INFLUENCE_RADIUS
            const angle = Math.atan2(dy, dx)
            p.vx += Math.cos(angle) * force * 0.6
            p.vy += Math.sin(angle) * force * 0.6
          }
        }

        // Apply damping
        p.vx *= 0.98
        p.vy *= 0.98

        // Ensure minimum movement
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed < PARTICLE_SPEED * 0.4) {
          const angle = Math.random() * Math.PI * 2
          p.vx += Math.cos(angle) * 0.03
          p.vy += Math.sin(angle) * 0.03
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges smoothly
        if (p.x < 0) { p.x = 0; p.vx *= -0.8 }
        if (p.x > width) { p.x = width; p.vx *= -0.8 }
        if (p.y < 0) { p.y = 0; p.vy *= -0.8 }
        if (p.y > height) { p.y = height; p.vy *= -0.8 }
      }
    }

    // Draw connections between nearby particles
    function drawConnections() {
      const { lineHSL, lineActiveHSL } = colors
      ctx.lineWidth = LINE_WIDTH

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            // Opacity based on distance
            let opacity = (1 - dist / CONNECTION_DISTANCE) * 0.35

            // Check if line midpoint is near mouse
            let hsl = lineHSL
            if (mouse.active) {
              const midX = (p1.x + p2.x) / 2
              const midY = (p1.y + p2.y) / 2
              const mouseDist = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2)

              if (mouseDist < MOUSE_INFLUENCE_RADIUS) {
                hsl = lineActiveHSL
                opacity *= 1.8
              }
            }

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsl(${hsl} / ${opacity})`
            ctx.stroke()
          }
        }
      }

      // Draw lines from mouse to nearby particles
      if (mouse.active) {
        const { lineActiveHSL } = colors
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MOUSE_INFLUENCE_RADIUS * 0.6) {
            const opacity = (1 - dist / (MOUSE_INFLUENCE_RADIUS * 0.6)) * 0.3
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `hsl(${lineActiveHSL} / ${opacity})`
            ctx.stroke()
          }
        }
      }
    }

    // Draw particle nodes
    function drawParticles() {
      const { dotHSL, lineActiveHSL } = colors

      for (const p of particles) {
        let opacity = 0.55
        let hsl = dotHSL

        // Highlight particles near mouse
        if (mouse.active) {
          const dist = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2)
          if (dist < MOUSE_INFLUENCE_RADIUS) {
            opacity = 0.85
            hsl = lineActiveHSL
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${hsl} / ${opacity})`
        ctx.fill()
      }
    }

    // Main animation loop
    function animate() {
      const parent = canvas.parentElement
      if (!parent) return

      const width = parent.clientWidth
      const height = parent.clientHeight

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Update and draw
      updateParticles()
      drawConnections()
      drawParticles()

      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Mouse event handlers
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    function handleMouseLeave() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    // Touch handlers for mobile
    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouse.x = e.touches[0].clientX - rect.left
        mouse.y = e.touches[0].clientY - rect.top
        mouse.active = true
      }
    }

    function handleTouchEnd() {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    // Resize handler
    function handleResize() {
      resizeCanvas()
      initParticles()
    }

    // Watch for theme changes
    const themeObserver = new MutationObserver(() => {
      colors = getColors()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Initialize
    resizeCanvas()
    initParticles()
    animationFrameRef.current = requestAnimationFrame(animate)

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
