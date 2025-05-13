"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TaskCard } from "./task-card"
import { TaskFormModal } from "./task-form-modal"
import type { Task } from "@/lib/types"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

interface TaskColumnProps {
  title: string
  status: string
  tasks: Task[]
  projectId: string
}

export function TaskColumn({ title, status, tasks, projectId }: TaskColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      status,
    },
  })

  return (
    <>
      <Card className="h-full">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {title} <span className="text-muted-foreground ml-1 text-sm">({tasks.length})</span>
            </CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent ref={setNodeRef} className="p-2 overflow-y-auto max-h-[calc(100vh-220px)]">
          <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} projectId={projectId} />
              ))}
              {tasks.length === 0 && (
                <div className="flex items-center justify-center h-24 border border-dashed rounded-md text-muted-foreground">
                  No tasks
                </div>
              )}
            </div>
          </SortableContext>
        </CardContent>
      </Card>

      <TaskFormModal projectId={projectId} status={status} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
