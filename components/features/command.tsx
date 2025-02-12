'use client'

import * as React from 'react'
import {
  Command as CommandPrimitive,
  CommandInput as CommandPrimitiveInput,
  CommandList as CommandPrimitiveList,
  CommandEmpty as CommandPrimitiveEmpty,
  CommandGroup as CommandPrimitiveGroup,
  CommandItem as CommandPrimitiveItem,
  CommandSeparator as CommandPrimitiveSeparator
} from 'cmdk'
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputAdornment
} from '@mui/material'
import { Search, X } from 'react-feather'
import clsx from 'clsx'
import type { CommandMenuProps, CommandItem } from '@/types/command-menu'
import { useRouter } from 'next/navigation'

export const CommandDialog = ({
  children,
  open,
  onOpenChange
}: {
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} fullWidth>
      <Command className={clsx('rounded-lg border shadow-md')}>{children}</Command>
    </Dialog>
  )
}

export const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={clsx(
      'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden',
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitiveInput>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitiveInput>
>(({ className, ...props }, ref) => (
  <div className={clsx('flex items-center border-b px-3')} cmdk-input-wrapper="">
    <Search className={clsx('mr-2 h-4 w-4 shrink-0 opacity-50')} />
    <CommandPrimitiveInput
      ref={ref}
      className={clsx(
        'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none',
        'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitiveInput.displayName

export const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitiveList>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitiveList>
>(({ className, ...props }, ref) => (
  <CommandPrimitiveList
    ref={ref}
    className={clsx('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitiveList.displayName

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitiveEmpty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitiveEmpty>
>((props, ref) => (
  <CommandPrimitiveEmpty
    ref={ref}
    className={clsx('text-muted-foreground py-6 text-center text-sm')}
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitiveEmpty.displayName

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitiveGroup>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitiveGroup>
>(({ className, ...props }, ref) => (
  <CommandPrimitiveGroup
    ref={ref}
    className={clsx(
      'text-foreground overflow-hidden p-1',
      '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5',
      '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
      '[&_[cmdk-group-heading]]:text-muted-foreground',
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitiveGroup.displayName

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitiveSeparator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitiveSeparator>
>(({ className, ...props }, ref) => (
  <CommandPrimitiveSeparator
    ref={ref}
    className={clsx('bg-border -mx-1 h-px', className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitiveSeparator.displayName

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitiveItem>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitiveItem>
>(({ className, ...props }, ref) => (
  <CommandPrimitiveItem
    ref={ref}
    className={clsx(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'data-[selected]:bg-accent data-[selected]:text-accent-foreground',
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitiveItem.displayName

export function CommandMenu({ items, open, onClose }: CommandMenuProps) {
  const [search, setSearch] = React.useState<string>('')
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)
  const router = useRouter()

  const filteredItems: CommandItem[] = items.filter(
    item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
  )

  React.useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          if (filteredItems.length > 0) {
            setSelectedIndex(i => (i + 1) % filteredItems.length)
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (filteredItems.length > 0) {
            setSelectedIndex(i => (i - 1 + filteredItems.length) % filteredItems.length)
          }
          break
        case 'Enter':
          e.preventDefault()
          if (filteredItems[selectedIndex]) {
            filteredItems[selectedIndex].action()
            onClose()
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, filteredItems, selectedIndex, onClose])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Search commands..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={onClose}>
                    <X size={20} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
        <List sx={{ py: 0 }}>
          {filteredItems.map((item, index) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  item.action()
                  onClose()
                }}
                selected={index === selectedIndex}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  },
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    '&:hover': {
                      bgcolor: 'primary.light'
                    }
                  }
                }}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
                {item.shortcut && (
                  <Box sx={{ display: 'flex', gap: 0.5, ml: 2 }}>
                    {item.shortcut.map((key, i) => (
                      <Box
                        key={i}
                        sx={{
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          bgcolor: 'action.selected',
                          fontSize: '0.75rem'
                        }}
                      >
                        {key}
                      </Box>
                    ))}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}
