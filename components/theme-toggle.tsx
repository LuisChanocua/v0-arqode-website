"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 glass border-border/50 hover:border-border"
        disabled
        aria-label="Cargando tema"
      >
        <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 glass border-border/50 hover:border-border hover:bg-secondary/50 transition-all duration-300"
          aria-label="Cambiar tema"
        >
          {theme === "light" && <Sun className="w-4 h-4 text-foreground" />}
          {theme === "dark" && <Moon className="w-4 h-4 text-foreground" />}
          {theme === "system" && <Monitor className="w-4 h-4 text-foreground" />}
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass border-border/50">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`cursor-pointer ${theme === "light" ? "bg-secondary/50" : ""}`}
        >
          <Sun className="w-4 h-4 mr-2" />
          <span>Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`cursor-pointer ${theme === "dark" ? "bg-secondary/50" : ""}`}
        >
          <Moon className="w-4 h-4 mr-2" />
          <span>Oscuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`cursor-pointer ${theme === "system" ? "bg-secondary/50" : ""}`}
        >
          <Monitor className="w-4 h-4 mr-2" />
          <span>Sistema</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
