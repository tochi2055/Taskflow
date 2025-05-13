"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { v4 as uuidv4 } from "uuid"
import type { Task } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

// Mock data for a specific project
const createMockTasks = (projectId: string): Task[] => [
  {
    id: uuidv4(),
    title: "Research competitors",
    description: "Analyze top competitors in the market",
    status: "todo",
    priority: "high",
    projectId,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Create wireframes",
    description: "Design initial wireframes for the main pages",
    status: "doing",
    priority: "medium",
    projectId,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Setup project repository",
    description: "Initialize Git repository and project structure",
    status: "done",
    priority: "low",
    projectId,
    createdAt: new Date().toISOString(),
  },
]

export function useTasks(projectId: string) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [tasks, setTasks] = useState<Task[]>([])

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      const allTasks: Task[] = JSON.parse(storedTasks)
      const projectTasks = allTasks.filter((task) => task.projectId === projectId)

      if (projectTasks.length > 0) {
        setTasks(projectTasks)
      } else {
        // If no tasks for this project, create mock tasks
        const mockTasks = createMockTasks(projectId)
        setTasks(mockTasks)

        // Save all tasks including the new mock tasks
        localStorage.setItem("tasks", JSON.stringify([...allTasks, ...mockTasks]))
      }
    } else {
      // If no tasks at all, create mock tasks for this project
      const mockTasks = createMockTasks(projectId)
      setTasks(mockTasks)
      localStorage.setItem("tasks", JSON.stringify(mockTasks))
    }
  }, [projectId])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      const storedTasks = localStorage.getItem("tasks")
      const allTasks: Task[] = storedTasks ? JSON.parse(storedTasks) : []

      // Remove existing tasks for this project
      const otherTasks = allTasks.filter((task) => task.projectId !== projectId)

      // Add the updated tasks for this project
      localStorage.setItem("tasks", JSON.stringify([...otherTasks, ...tasks]))

      // Update task count in the project
      const storedProjects = localStorage.getItem("projects")
      if (storedProjects) {
        const projects = JSON.parse(storedProjects)
        const updatedProjects = projects.map((project: any) =>
          project.id === projectId ? { ...project, taskCount: tasks.length } : project,
        )
        localStorage.setItem("projects", JSON.stringify(updatedProjects))
      }
    }
  }, [tasks, projectId])

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: async () => {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      return tasks
    },
    enabled: tasks.length > 0,
  })

  const addTaskMutation = useMutation({
    mutationFn: async (newTask: Omit<Task, "id" | "createdAt">) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const task: Task = {
        id: uuidv4(),
        ...newTask,
        createdAt: new Date().toISOString(),
      }

      setTasks((prev) => [...prev, task])
      return task
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      })
    },
  })

  const updateTaskMutation = useMutation({
    mutationFn: async ({
      id,
      ...updates
    }: {
      id: string
      title?: string
      description?: string
      status?: string
      priority?: string
    }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))

      return { id, ...updates }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      })
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setTasks((prev) => prev.filter((task) => task.id !== id))
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    },
  })

  const updateTaskStatus = async (id: string, status: "todo" | "doing" | "done") => {
    try {
      await updateTaskMutation.mutateAsync({ id, status })
    } catch (error) {
      console.error("Failed to update task status:", error)
    }
  }

  const reorderTasks = (newTasks: Task[]) => {
    setTasks(newTasks)
    queryClient.setQueryData(["tasks", projectId], newTasks)
  }

  return {
    tasks: data || tasks,
    isLoading,
    error,
    addTask: addTaskMutation.mutateAsync,
    updateTask: updateTaskMutation.mutateAsync,
    deleteTask: deleteTaskMutation.mutateAsync,
    updateTaskStatus,
    reorderTasks,
  }
}
