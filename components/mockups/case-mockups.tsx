"use client"

import { Badge } from "@/components/ui/badge"
import { 
  Trophy, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Filter, 
  FileText,
  UserCheck,
  Send,
  MessageSquare,
  Sparkles
} from "lucide-react"

// Mini Dashboard Mockup - Promotional Platform
export function PromotionalDashboardMockup() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Panel de Campana</span>
        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground">Participaciones</span>
          </div>
          <span className="text-lg font-bold text-foreground">12,847</span>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] text-muted-foreground">Validados</span>
          </div>
          <span className="text-lg font-bold text-foreground">11,203</span>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] text-muted-foreground">Premios</span>
          </div>
          <span className="text-lg font-bold text-foreground">1,456</span>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-accent" />
            <span className="text-[10px] text-muted-foreground">Conversion</span>
          </div>
          <span className="text-lg font-bold text-foreground">87%</span>
        </div>
      </div>
      
      {/* Mini Table */}
      <div className="bg-secondary/30 rounded-lg overflow-hidden">
        <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider p-2 border-b border-border">
          Ultimos codigos
        </div>
        <div className="divide-y divide-border">
          {[
            { code: "PRX-8847", status: "Validado", statusColor: "bg-accent/20 text-accent" },
            { code: "PRX-8846", status: "Pendiente", statusColor: "bg-primary/20 text-primary" },
            { code: "PRX-8845", status: "Asignado", statusColor: "bg-muted text-muted-foreground" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between px-2 py-1.5">
              <span className="text-xs font-mono text-foreground">{item.code}</span>
              <Badge variant="secondary" className={`text-[9px] ${item.statusColor}`}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Commercial Dashboard Mockup
export function CommercialDashboardMockup() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4 h-full">
      {/* Header with filters */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Dashboard Comercial</span>
        <div className="flex items-center gap-1">
          <Filter className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Q4 2024</span>
        </div>
      </div>
      
      {/* KPIs Row */}
      <div className="flex gap-2">
        {[
          { label: "Ventas", value: "$2.4M", trend: "+12%" },
          { label: "Market Share", value: "34%", trend: "+3%" },
          { label: "Unidades", value: "847K", trend: "+8%" },
        ].map((kpi, i) => (
          <div key={i} className="flex-1 bg-secondary/50 rounded-lg p-2 text-center">
            <span className="text-[9px] text-muted-foreground block">{kpi.label}</span>
            <span className="text-sm font-bold text-foreground">{kpi.value}</span>
            <span className="text-[9px] text-accent">{kpi.trend}</span>
          </div>
        ))}
      </div>
      
      {/* Chart representation */}
      <div className="bg-secondary/30 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-muted-foreground">Tendencia mensual</span>
          <BarChart3 className="w-3 h-3 text-muted-foreground" />
        </div>
        <div className="flex items-end gap-1 h-16">
          {[40, 55, 35, 70, 60, 85, 75, 90, 80, 95, 88, 100].map((h, i) => (
            <div 
              key={i} 
              className="flex-1 bg-gradient-to-t from-primary/60 to-primary rounded-t"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[8px] text-muted-foreground">Ene</span>
          <span className="text-[8px] text-muted-foreground">Dic</span>
        </div>
      </div>
      
      {/* Categories */}
      <div className="flex flex-wrap gap-1">
        {["Categoria A", "Categoria B", "Premium"].map((cat, i) => (
          <Badge key={i} variant="secondary" className="text-[9px]">{cat}</Badge>
        ))}
      </div>
    </div>
  )
}

// Internal Operations Mockup
export function InternalOperationsMockup() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Panel Administrativo</span>
        <Badge variant="secondary" className="text-[9px]">Admin</Badge>
      </div>
      
      {/* Approval Flow */}
      <div className="bg-secondary/30 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-medium text-foreground">Flujo de Aprobacion</span>
        </div>
        <div className="flex items-center gap-1">
          {[
            { step: "1", label: "Solicitud", done: true },
            { step: "2", label: "Revision", done: true },
            { step: "3", label: "Aprobacion", done: false },
            { step: "4", label: "Completado", done: false },
          ].map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold
                ${item.done ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'}`}>
                {item.done ? <CheckCircle className="w-3 h-3" /> : item.step}
              </div>
              <span className="text-[8px] text-muted-foreground mt-1 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Users/Roles */}
      <div className="space-y-2">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Usuarios activos</span>
        <div className="space-y-1.5">
          {[
            { name: "Usuario A", role: "Administrador", status: "Activo" },
            { name: "Usuario B", role: "Revisor", status: "Activo" },
            { name: "Usuario C", role: "Operador", status: "Pendiente" },
          ].map((user, i) => (
            <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-lg px-2 py-1.5">
              <div className="flex items-center gap-2">
                <UserCheck className="w-3 h-3 text-muted-foreground" />
                <div>
                  <span className="text-[10px] text-foreground block">{user.name}</span>
                  <span className="text-[8px] text-muted-foreground">{user.role}</span>
                </div>
              </div>
              <Badge 
                variant="secondary" 
                className={`text-[8px] ${user.status === 'Activo' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}
              >
                {user.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      
      {/* Reports indicator */}
      <div className="flex items-center justify-between bg-secondary/30 rounded-lg px-3 py-2">
        <span className="text-[10px] text-muted-foreground">Reportes generados</span>
        <span className="text-sm font-bold text-foreground">24</span>
      </div>
    </div>
  )
}

// Mobile Experience Mockup
export function MobileExperienceMockup() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 h-full flex flex-col">
      {/* Phone frame */}
      <div className="bg-secondary/30 rounded-2xl border-4 border-secondary flex-1 flex flex-col overflow-hidden max-w-[180px] mx-auto">
        {/* Status bar */}
        <div className="bg-secondary/50 px-3 py-1 flex items-center justify-between">
          <span className="text-[8px] text-muted-foreground">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-1.5 bg-muted-foreground/50 rounded-sm" />
            <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full" />
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-3 space-y-3">
          {/* Header */}
          <div className="text-center">
            <Sparkles className="w-5 h-5 text-primary mx-auto mb-1" />
            <span className="text-[10px] font-bold text-foreground block">Participa y gana</span>
            <span className="text-[8px] text-muted-foreground">Completa tu registro</span>
          </div>
          
          {/* Form fields */}
          <div className="space-y-2">
            <div className="bg-input rounded-md px-2 py-1.5 border border-border">
              <span className="text-[8px] text-muted-foreground">Nombre completo</span>
            </div>
            <div className="bg-input rounded-md px-2 py-1.5 border border-border">
              <span className="text-[8px] text-muted-foreground">Correo electronico</span>
            </div>
          </div>
          
          {/* Question */}
          <div className="bg-secondary/50 rounded-lg p-2">
            <span className="text-[8px] text-muted-foreground block mb-1.5">Selecciona tu respuesta:</span>
            <div className="space-y-1">
              {["Opcion A", "Opcion B", "Opcion C"].map((opt, i) => (
                <div 
                  key={i} 
                  className={`flex items-center gap-1.5 px-2 py-1 rounded ${i === 0 ? 'bg-primary/20 border border-primary' : 'bg-secondary'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-muted'}`} />
                  <span className="text-[8px] text-foreground">{opt}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-lg py-2 text-center">
            <span className="text-[9px] font-medium text-primary-foreground">Enviar participacion</span>
          </div>
        </div>
        
        {/* Bottom indicator */}
        <div className="pb-2">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto" />
        </div>
      </div>
      
      {/* Caption */}
      <div className="text-center mt-3">
        <span className="text-[10px] text-muted-foreground">Experiencia mobile optimizada</span>
      </div>
    </div>
  )
}
