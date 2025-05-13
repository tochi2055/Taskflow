"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { useProject } from "@/hooks/use-project"
import { useTasks } from "@/hooks/use-tasks"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { TaskColumn } from "./components/task-column"
import { TaskFormModal } from "./components/task-form-modal"
import { DragDropContext } from "./components/drag-drop-context"
import { Plus, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { ProjectMenu } from "./components/project-menu"
import { EmptyState } from "@/components/empty-state"

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const { project, isLoading: isProjectLoading } = useProject(projectId)
  const { tasks, isLoading: isTasksLoading } = useTasks(projectId)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isLoading = isProjectLoading || isTasksLoading

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto p-4 md:p-6">
          <EmptyState
            title="Project not found"
            description="The project you're looking for doesn't exist or you don't have access to it."
            action={
              <Button asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            }
          />
        </div>
      </div>
    )
  }

  const todoTasks = tasks.filter((task) => task.status === "todo")
  const doingTasks = tasks.filter((task) => task.status === "doing")
  const doneTasks = tasks.filter((task) => task.status === "done")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{project.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
            <ProjectMenu project={project} />
          </div>
        </div>

        {project.description && <p className="text-muted-foreground mb-6">{project.description}</p>}

        <DragDropContext projectId={projectId}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TaskColumn title="To Do" status="todo" tasks={todoTasks} projectId={projectId} />
            <TaskColumn title="In Progress" status="doing" tasks={doingTasks} projectId={projectId} />
            <TaskColumn title="Done" status="done" tasks={doneTasks} projectId={projectId} />
          </div>
        </DragDropContext>

        <TaskFormModal projectId={projectId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
    </div>
  )
}
