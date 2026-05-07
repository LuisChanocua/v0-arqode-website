"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Send, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// WhatsApp number - placeholder configurable
const WHATSAPP_NUMBER = "52XXXXXXXXXX"

const projectTypes = [
  { value: "plataforma-web", label: "Plataforma web" },
  { value: "automatizacion", label: "Automatizacion de procesos" },
  { value: "dashboard", label: "Dashboard o analisis de datos" },
  { value: "campana", label: "Campana digital" },
  { value: "integracion", label: "Integracion de sistemas" },
  { value: "otro", label: "Otro" },
]

export function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    projectType: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const buildWhatsAppMessage = () => {
    const projectLabel = projectTypes.find(p => p.value === formData.projectType)?.label || formData.projectType
    
    let message = `Hola, soy ${formData.name}`
    if (formData.company.trim()) {
      message += ` de ${formData.company}`
    }
    message += "."
    if (formData.projectType) {
      message += ` Me interesa hablar sobre ${projectLabel}.`
    }
    message += ` ${formData.message}`
    
    return encodeURIComponent(message)
  }

  const handleWhatsAppClick = () => {
    if (!validateForm()) return
    
    const message = buildWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  const handleDirectWhatsApp = () => {
    const defaultMessage = encodeURIComponent("Hola, me gustaria hablar sobre un proyecto.")
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-[0.2]" />
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="blob-gradient w-[700px] h-[700px] top-0 left-1/4"
          style={{ background: "var(--hero-gradient-1)" }}
        />
        <div 
          className="blob-gradient w-[600px] h-[600px] bottom-0 right-1/4"
          style={{ background: "var(--hero-gradient-2)" }}
        />
        <div 
          className="blob-gradient w-[400px] h-[400px] top-1/2 right-0"
          style={{ background: "var(--hero-gradient-warm)" }}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance text-foreground">
              Tienes un proceso que podria funcionar{" "}
              <span className="text-gradient">mejor con tecnologia</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Cuentanos que estas intentando resolver. Podemos ayudarte a convertir una necesidad operativa, 
              comercial o de datos en una solucion digital clara, funcional y medible.
            </p>
          </motion.div>

          {/* Quick WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-8"
          >
            <Button
              onClick={handleDirectWhatsApp}
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-200 text-primary-foreground font-medium shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Hablemos por WhatsApp
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">o completa el formulario</span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-elevated p-8 lg:p-12"
          >
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Nombre <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                      if (errors.name) setErrors(prev => ({ ...prev, name: "" }))
                    }}
                    className={`bg-input border-border focus:border-primary transition-colors ${errors.name ? 'border-destructive' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>
                
                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground font-medium">Empresa</Label>
                  <Input
                    id="company"
                    placeholder="Nombre de tu empresa"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="bg-input border-border focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <Label htmlFor="projectType" className="text-foreground font-medium">Tipo de necesidad / proyecto</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}
                >
                  <SelectTrigger className="bg-input border-border focus:border-primary transition-colors">
                    <SelectValue placeholder="Selecciona una opcion" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground font-medium">
                  Mensaje <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Cuentanos sobre tu proyecto o necesidad..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, message: e.target.value }))
                    if (errors.message) setErrors(prev => ({ ...prev, message: "" }))
                  }}
                  className={`bg-input border-border focus:border-primary transition-colors resize-none ${errors.message ? 'border-destructive' : ''}`}
                />
                {errors.message && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="button"
                onClick={handleWhatsAppClick}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-200 text-primary-foreground font-medium shadow-lg hover:shadow-xl"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar por WhatsApp
              </Button>
            </div>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            Respuesta inicial por WhatsApp. Si el proyecto lo requiere, podemos agendar una llamada para revisar el alcance.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
