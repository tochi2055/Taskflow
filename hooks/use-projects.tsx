"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { v4 as uuidv4 } from "uuid"
import type { Project } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

// Mock data
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Redesign the company website with a modern look and feel",
    status: "active",
    taskCount: 8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Develop a new mobile app for iOS and Android",
    status: "active",
    taskCount: 12,
    createdAt: new Date().toISOString(),
  },
]

export function useProjects() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [projects, setProjects] = useState<Project[]>([])

  // Load projects from localStorage on initial render
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    } else {
      // Use mock data if no projects in localStorage
      setProjects(MOCK_PROJECTS)
      localStorage.setItem("projects", JSON.stringify(MOCK_PROJECTS))
    }
  }, [])

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects))
    }
  }, [projects])

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return projects
    },
    enabled: projects.length > 0,
  })

  const addProjectMutation = useMutation({
    mutationFn: async (newProject: Omit<Project, "id" | "createdAt" | "taskCount" | "status">) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const project: Project = {
        id: uuidv4(),
        ...newProject,
        status: "active",
        taskCount: 0,
        createdAt: new Date().toISOString(),
      }

      setProjects((prev) => [...prev, project])
      return project
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      })
    },
  })

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string
      name?: string
      description?: string
      status?: string
    }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setProjects((prev) => prev.map((project) => (project.id === id ? { ...project, ...updates } : project)))

      return { id, ...updates }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      })
    },
  })

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setProjects((prev) => prev.filter((project) => project.id !== id))

      // Also delete related tasks
      const storedTasks = localStorage.getItem("tasks")
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks)
        const updatedTasks = tasks.filter((task: any) => task.projectId !== id)
        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
      }

      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    },
  })

  return {
    projects: data || projects,
    isLoading,
    error,
    addProject: addProjectMutation.mutateAsync,
    updateProject: updateProjectMutation.mutateAsync,
    deleteProject: deleteProjectMutation.mutateAsync,
  }
}
