'use client';

import { Dialog, DialogContent } from '@mui/material';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Search } from '@mui/icons-material';

interface CommandProps {
  children: React.ReactNode;
  className?: string;
}

export function Command({ children, className }: CommandProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          className="placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Type a command or search..."
        />
      </div>
      {children}
    </div>
  );
}

export function CommandDialog({ children, ...props }: { children: React.ReactNode }) {
  return (
    <Dialog open={false} {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}
