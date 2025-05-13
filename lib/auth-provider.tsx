"use client"

import type { ReactNode } from "react"
import { AuthProvider as AuthContextProvider } from "@/hooks/use-auth"

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}
