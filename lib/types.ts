export interface Project {
  id: string
  name: string
  description: string
  status: string
  taskCount: number
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  projectId: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
}
