"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/lib/types"
import { TaskMenu } from "./task-menu"
import { TaskFormModal } from "./task-form-modal"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface TaskCardProps {
  task: Task
  projectId: string
}

export function TaskCard({ task, projectId }: TaskCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    data: {
      task,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const priorityColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const priorityColor = priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.medium

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base line-clamp-1">{task.title}</CardTitle>
            <TaskMenu task={task} projectId={projectId} onEdit={() => setIsEditModalOpen(true)} />
          </div>
          {task.description && <CardDescription className="line-clamp-2 mt-1">{task.description}</CardDescription>}
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-2">{/* Task content can go here */}</CardContent>
        <CardFooter className="p-4 pt-2 flex justify-between">
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(task.createdAt), {
              addSuffix: true,
            })}
          </div>
          <Badge className={priorityColor} variant="outline">
            {task.priority || "medium"}
          </Badge>
        </CardFooter>
      </Card>

      <TaskFormModal
        projectId={projectId}
        task={task}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  )
}
