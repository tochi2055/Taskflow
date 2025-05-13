"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "green" | "blue" | "purple" | "amber" | "rose" | "indigo"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  autoThemeChange: boolean
  setAutoThemeChange: (auto: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ColorThemeProvider({ children, defaultTheme = "indigo" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [autoThemeChange, setAutoThemeChange] = useState<boolean>(false)

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme") as Theme
    const savedAutoChange = localStorage.getItem("auto-theme-change")

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute("data-color-theme", savedTheme)
    } else {
      document.documentElement.setAttribute("data-color-theme", defaultTheme)
    }

    if (savedAutoChange) {
      setAutoThemeChange(savedAutoChange === "true")
    }
  }, [defaultTheme])

  // Save theme preference
  useEffect(() => {
    document.documentElement.setAttribute("data-color-theme", theme)
    localStorage.setItem("color-theme", theme)
  }, [theme])

  // Save auto change preference
  useEffect(() => {
    localStorage.setItem("auto-theme-change", String(autoThemeChange))
  }, [autoThemeChange])

  // Time-based theme change
  useEffect(() => {
    if (!autoThemeChange) return

    const setTimeBasedTheme = () => {
      const hour = new Date().getHours()

      // Morning (6am-12pm): Blue
      if (hour >= 6 && hour < 12) {
        setTheme("blue")
      }
      // Afternoon (12pm-5pm): Amber
      else if (hour >= 12 && hour < 17) {
        setTheme("amber")
      }
      // Evening (5pm-9pm): Purple
      else if (hour >= 17 && hour < 21) {
        setTheme("purple")
      }
      // Night (9pm-6am): Indigo
      else {
        setTheme("indigo")
      }
    }

    // Set initial theme based on time
    setTimeBasedTheme()

    // Check every hour for theme changes
    const interval = setInterval(setTimeBasedTheme, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [autoThemeChange])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, autoThemeChange, setAutoThemeChange }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useColorTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider")
  }
  return context
}
