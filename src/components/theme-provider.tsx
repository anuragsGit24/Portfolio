"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
    
    // Remove no-transitions class after mount to enable smooth transitions
    const timer = setTimeout(() => {
      document.documentElement.classList.remove('no-transitions')
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
