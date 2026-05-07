"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Avoid hydration mismatch - must wait for client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show placeholder until mounted
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 bg-secondary/50 border border-border/50"
        disabled
        aria-label="Cargando tema"
      >
        <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
      </Button>
    )
  }

  // Get the icon based on resolvedTheme (actual visual theme)
  const getIcon = () => {
    // Use resolvedTheme to know what's actually displayed
    if (resolvedTheme === "dark") {
      return <Moon className="w-4 h-4 text-foreground" />
    }
    return <Sun className="w-4 h-4 text-foreground" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9 bg-secondary/50 hover:bg-secondary border border-border/50 hover:border-border transition-all duration-200"
          aria-label="Cambiar tema"
        >
          {getIcon()}
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-36 bg-popover border-border shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Claro
          </span>
          {theme === "light" && <Check className="w-4 h-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Moon className="w-4 h-4" />
            Oscuro
          </span>
          {theme === "dark" && <Check className="w-4 h-4 text-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Sistema
          </span>
          {theme === "system" && <Check className="w-4 h-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
