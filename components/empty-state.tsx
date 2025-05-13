import type { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
}

export function EmptyState({
  title,
  description,
  action,
  icon = <ClipboardList className="h-12 w-12 text-muted-foreground" />,
}: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="mt-2 text-center max-w-sm">{description}</CardDescription>
        {action && <CardFooter className="mt-6 p-0">{action}</CardFooter>}
      </CardContent>
    </Card>
  )
}
