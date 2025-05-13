"use client"

import { Check, Clock, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { useColorTheme } from "@/lib/theme-context"

const themes = [
  {
    name: "Indigo",
    value: "indigo",
    color: "bg-indigo-500",
  },
  {
    name: "Green",
    value: "green",
    color: "bg-emerald-500",
  },
  {
    name: "Blue",
    value: "blue",
    color: "bg-blue-500",
  },
  {
    name: "Purple",
    value: "purple",
    color: "bg-purple-500",
  },
  {
    name: "Amber",
    value: "amber",
    color: "bg-amber-500",
  },
  {
    name: "Rose",
    value: "rose",
    color: "bg-rose-500",
  },
]

export function ThemeSelector() {
  const { theme, setTheme, autoThemeChange, setAutoThemeChange } = useColorTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          {autoThemeChange && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />}
          <span className="sr-only">Select a theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => {
              setTheme(t.value as any)
              if (autoThemeChange) setAutoThemeChange(false)
            }}
            className="flex items-center gap-2 cursor-pointer"
            disabled={autoThemeChange}
          >
            <div className={`h-4 w-4 rounded-full ${t.color}`} />
            <span>{t.name}</span>
            {theme === t.value && !autoThemeChange && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={autoThemeChange}
          onCheckedChange={setAutoThemeChange}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Time-based themes</span>
          </div>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
