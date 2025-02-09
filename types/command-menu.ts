export interface CommandItem {
  id: string
  title: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string[]
  action: () => void
}

export interface CommandMenuProps {
  items: CommandItem[]
  open: boolean
  onClose: () => void
}
