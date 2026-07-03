"use client"

import { type FormEvent, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, Loader2, Mail } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { contactProjectTypes } from "@/lib/contact/domain/contact-message"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SubmitStatus = "idle" | "loading" | "success" | "error"
type ContactSubmitError = Error & { status?: number }

const REQUEST_TIMEOUT_MS = 12_000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+\-().\s]*$/

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  message: "",
  website: "",
}

export function ContactCTA() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const clearSubmitFeedback = () => {
    if (submitStatus !== "idle") setSubmitStatus("idle")
    if (statusMessage) setStatusMessage("")
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }
    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido"
    } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
      newErrors.email = "Ingresa un correo válido"
    }
    if (formData.phone.trim() && !PHONE_PATTERN.test(formData.phone.trim())) {
      newErrors.phone = "Ingresa un celular válido"
    }
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitStatus === "loading") return
    if (!validateForm()) return

    setSubmitStatus("loading")
    setStatusMessage("Enviando mensaje...")

    const controller = new AbortController()
    abortControllerRef.current = controller
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })

      let responseBody: unknown = null
      try {
        responseBody = await response.json()
      } catch {
        responseBody = null
      }

      if (!response.ok) {
        const message =
          responseBody &&
          typeof responseBody === "object" &&
          "message" in responseBody &&
          typeof responseBody.message === "string"
            ? responseBody.message
            : "No pudimos enviar el mensaje. Inténtalo de nuevo."

        const submitError = new Error(message) as ContactSubmitError
        submitError.status = response.status
        throw submitError
      }

      setFormData(initialFormData)
      setErrors({})
      setSubmitStatus("success")
      setStatusMessage("Solicitud enviada. Te contactaremos pronto para darle seguimiento.")
      toast.success("Solicitud enviada", {
        description: "Recibimos tu mensaje y te contactaremos pronto.",
      })
    } catch (error) {
      const status = error instanceof Error ? (error as ContactSubmitError).status : undefined
      const message =
        error instanceof DOMException && error.name === "AbortError"
          ? "El envío tardó demasiado. Inténtalo nuevamente."
          : error instanceof Error
            ? error.message
            : "No pudimos enviar el mensaje. Inténtalo de nuevo."

      setSubmitStatus("error")
      setStatusMessage(message)
      if (!status || status === 429 || status >= 500) {
        toast.error("No se pudo enviar", {
          description: message,
        })
      }
    } finally {
      window.clearTimeout(timeoutId)
      abortControllerRef.current = null
    }
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
              ¿Tienes una idea que podría convertirse en una{" "}
              <span className="text-gradient">experiencia digital</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Cuéntanos qué quieres crear, mejorar o resolver. Podemos ayudarte a convertir datos, objetivos o necesidades en una solución clara, atractiva y orientada a resultados.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-elevated p-8 lg:p-12"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
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
                      clearSubmitFeedback()
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
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Correo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }))
                      if (errors.email) setErrors(prev => ({ ...prev, email: "" }))
                      clearSubmitFeedback()
                    }}
                    className={`bg-input border-border focus:border-primary transition-colors ${errors.email ? 'border-destructive' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground font-medium">Empresa</Label>
                  <Input
                    id="company"
                    placeholder="Nombre de tu empresa"
                    value={formData.company}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, company: e.target.value }))
                      clearSubmitFeedback()
                    }}
                    className="bg-input border-border focus:border-primary transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">Celular</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Tu celular"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, phone: e.target.value }))
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }))
                      clearSubmitFeedback()
                    }}
                    className={`bg-input border-border focus:border-primary transition-colors ${errors.phone ? 'border-destructive' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <Label htmlFor="projectType" className="text-foreground font-medium">Tipo de necesidad / proyecto</Label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, projectType: value }))
                    clearSubmitFeedback()
                  }}
                >
                  <SelectTrigger className="bg-input border-border focus:border-primary transition-colors">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {contactProjectTypes.map((type) => (
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
                  placeholder="Cuéntanos qué quieres crear, mejorar o resolver..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, message: e.target.value }))
                    if (errors.message) setErrors(prev => ({ ...prev, message: "" }))
                    clearSubmitFeedback()
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

              {/* Honeypot */}
              <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <Label htmlFor="website">Sitio web</Label>
                <Input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                />
              </div>

              {statusMessage && (
                <p
                  className={`text-sm ${submitStatus === "error" ? "text-destructive" : "text-muted-foreground"}`}
                  aria-live="polite"
                >
                  {statusMessage}
                </p>
              )}

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitStatus === "loading"}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-200 text-primary-foreground font-medium shadow-lg hover:shadow-xl"
                >
                  {submitStatus === "loading" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4 mr-2" />
                  )}
                  {submitStatus === "loading" ? "Enviando..." : "Enviar solicitud"}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            Recibiremos tu solicitud por correo y te contactaremos para darle seguimiento.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
