"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactCTA() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[600px] h-[600px] top-0 left-1/4"
          style={{ background: "var(--hero-gradient-1)", opacity: 0.25 }}
        />
        <div 
          className="blob-gradient w-[500px] h-[500px] bottom-0 right-1/4"
          style={{ background: "var(--hero-gradient-2)", opacity: 0.2 }}
        />
        <div 
          className="blob-gradient w-[300px] h-[300px] top-1/2 right-0"
          style={{ background: "var(--hero-gradient-warm)", opacity: 0.15 }}
        />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Tienes un proceso que podria funcionar{" "}
              <span className="text-gradient">mejor con tecnologia</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Cuentanos que estas intentando resolver. Podemos ayudarte a convertir una necesidad operativa, 
              comercial o de datos en una solucion digital clara, funcional y medible.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-elevated p-8 lg:p-12"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Mensaje enviado
                </h3>
                <p className="text-muted-foreground">
                  Gracias por contactarnos. Te responderemos pronto.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      required
                      className="bg-input/50 border-border focus:border-primary transition-colors"
                    />
                  </div>
                  
                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      placeholder="Nombre de tu empresa"
                      className="bg-input/50 border-border focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electronico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    required
                    className="bg-input/50 border-border focus:border-primary transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    placeholder="Cuentanos sobre tu proyecto o necesidad..."
                    rows={5}
                    required
                    className="bg-input/50 border-border focus:border-primary transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Hablemos de tu proyecto
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
