"use client"

import type { ReactNode } from "react"
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import { useTasks } from "@/hooks/use-tasks"
import { useToast } from "@/hooks/use-toast"

interface DragDropContextProps {
  children: ReactNode
  projectId: string
}

export function DragDropContext({ children, projectId }: DragDropContextProps) {
  const { toast } = useToast()
  const { tasks, updateTaskStatus, reorderTasks } = useTasks(projectId)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    // Optional: Add any logic needed when drag starts
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Find the active task
    const activeTask = tasks.find((task) => task.id === activeId)

    if (!activeTask) return

    // If dragging over a column (status)
    if (typeof overId === "string" && ["todo", "doing", "done"].includes(overId)) {
      // Only update if the status is different
      if (activeTask.status !== overId) {
        updateTaskStatus(activeTask.id, overId as "todo" | "doing" | "done")
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id
    const overId = over.id

    // Find the active task
    const activeTask = tasks.find((task) => task.id === activeId)

    if (!activeTask) return

    // If dragging over a column (status)
    if (typeof overId === "string" && ["todo", "doing", "done"].includes(overId)) {
      // Only update if the status is different
      if (activeTask.status !== overId) {
        updateTaskStatus(activeTask.id, overId as "todo" | "doing" | "done")
        toast({
          title: "Task moved",
          description: `Task moved to ${overId === "todo" ? "To Do" : overId === "doing" ? "In Progress" : "Done"}`,
        })
      }
    }
    // If dragging over another task
    else if (activeId !== overId) {
      const activeIndex = tasks.findIndex((task) => task.id === activeId)
      const overIndex = tasks.findIndex((task) => task.id === overId)

      if (activeIndex !== -1 && overIndex !== -1) {
        const newTasks = arrayMove(tasks, activeIndex, overIndex)
        reorderTasks(newTasks)
      }
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  )
}
