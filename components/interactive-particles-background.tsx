"use client"

import { useEffect, useRef } from "react"

class Particle {
  x: number
  y: number
  directionX: number
  directionY: number
  size: number
  color: string

  constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
    this.x = x
    this.y = y
    this.directionX = directionX
    this.directionY = directionY
    this.size = size
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D, particleColor: string) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = particleColor
    ctx.fill()
  }

  update(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    mouse: { x: number | null; y: number | null; radius: number },
    particleColor: string
  ) {
    // Bounce off edges
    if (this.x > canvasWidth || this.x < 0) {
      this.directionX = -this.directionX
    }
    if (this.y > canvasHeight || this.y < 0) {
      this.directionY = -this.directionY
    }

    // Check collision with mouse
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvasWidth - this.size * 10) {
          this.x += 10
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 10
        }
        if (mouse.y < this.y && this.y < canvasHeight - this.size * 10) {
          this.y += 10
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 10
        }
      }
    }

    // Move particle
    this.x += this.directionX
    this.y += this.directionY

    // Draw particle
    this.draw(ctx, particleColor)
  }
}

export function InteractiveParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particlesArray: Particle[] = []
    let animationFrameId: number

    // Mouse interaction
    const mouse: { x: number | null; y: number | null; radius: number } = {
      x: null,
      y: null,
      radius: 170,
    }

    // Get theme colors
    function getColors() {
      const isDark = document.documentElement.classList.contains("dark")
      return {
        particleColor: isDark ? "#00d4ff" : "#0077cc",
        lineColor: isDark ? "0, 212, 255" : "0, 119, 204",
      }
    }

    let colors = getColors()

    // Handle mouse move
    function handleMouseMove(event: MouseEvent) {
      mouse.x = event.x
      mouse.y = event.y
    }

    // Handle mouse out
    function handleMouseOut() {
      mouse.x = null
      mouse.y = null
    }

    // Handle resize
    function handleResize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    // Initialize particles
    function init() {
      particlesArray = []
      const numberOfParticles = (canvas.height * canvas.width) / 9000

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1
        const x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2
        const y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2
        const directionX = Math.random() * 2 - 1
        const directionY = Math.random() * 2 - 1
        const color = colors.particleColor

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
      }
    }

    // Connect particles with lines
    function connect() {
      const { lineColor } = colors

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = dx * dx + dy * dy

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            const opacityValue = 1 - distance / 20000
            ctx.strokeStyle = `rgba(${lineColor}, ${opacityValue})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      animationFrameId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, innerWidth, innerHeight)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(ctx, canvas.width, canvas.height, mouse, colors.particleColor)
      }
      connect()
    }

    // Watch for theme changes
    const themeObserver = new MutationObserver(() => {
      colors = getColors()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseout", handleMouseOut)
    window.addEventListener("resize", handleResize)

    // Start animation
    init()
    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("resize", handleResize)
      themeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  )
}
