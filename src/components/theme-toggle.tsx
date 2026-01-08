"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [isChanging, setIsChanging] = React.useState(false)
  const [clicks, setClicks] = React.useState(0)

  const handleThemeChange = () => {
    setIsChanging(true)
    setClicks(prev => prev + 1)
    
    // Use View Transitions API if supported
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(theme === "light" ? "dark" : "light")
      })
    } else {
      setTheme(theme === "light" ? "dark" : "light")
    }
    
    setTimeout(() => setIsChanging(false), 300)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, rotate: 180 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleThemeChange}
        aria-label="Toggle theme"
        disabled={isChanging}
        className="relative overflow-hidden"
      >
        <motion.div
          animate={{ rotate: clicks * 360 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </motion.div>
        <span className="sr-only">Toggle theme</span>
        
        {/* Ripple effect on click */}
        {isChanging && (
          <motion.span
            className="absolute inset-0 rounded-full bg-primary"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </Button>
    </motion.div>
  )
}
