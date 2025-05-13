"use client"

import type React from "react"

import { useState } from "react"
import { useProjects } from "@/hooks/use-projects"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProjectFormModalProps {
  isOpen: boolean
  onClose: () => void
  project?: {
    id: string
    name: string
    description: string
  }
}

export function ProjectFormModal({ isOpen, onClose, project }: ProjectFormModalProps) {
  const { toast } = useToast()
  const { addProject, updateProject, isLoading } = useProjects()
  const [name, setName] = useState(project?.name || "")
  const [description, setDescription] = useState(project?.description || "")

  const isEditing = !!project

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      })
      return
    }

    try {
      if (isEditing && project) {
        await updateProject(project.id, { name, description })
        toast({
          title: "Success",
          description: "Project updated successfully",
        })
      } else {
        await addProject({ name, description })
        toast({
          title: "Success",
          description: "Project created successfully",
        })
      }
      onClose()
      setName("")
      setDescription("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Project" : "Create Project"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your project details below" : "Add a new project to your dashboard"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Project description (optional)"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : isEditing ? (
                "Update Project"
              ) : (
                "Create Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
