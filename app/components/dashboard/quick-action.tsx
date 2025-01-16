'use client'

import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

export interface QuickActionProps {
  icon: LucideIcon
  label: string
  onClick: () => void
}

export function QuickAction({ icon: Icon, label, onClick }: QuickActionProps): React.ReactElement {
  return (
    <Button
      variant="outline"
      className="flex h-24 w-full flex-col items-center justify-center space-y-2 rounded-lg border-2 hover:bg-accent"
      onClick={onClick}
    >
      <Icon className="h-6 w-6" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  )
}
