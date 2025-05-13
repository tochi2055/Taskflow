"use client"

import { useQuery } from "@tanstack/react-query"
import type { Project } from "@/lib/types"

export function useProject(id: string) {
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const storedProjects = localStorage.getItem("projects")
      if (storedProjects) {
        const projects: Project[] = JSON.parse(storedProjects)
        return projects.find((project) => project.id === id) || null
      }

      return null
    },
  })

  return {
    project,
    isLoading,
    error,
  }
}
