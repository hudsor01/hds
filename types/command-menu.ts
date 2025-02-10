import type React from 'react';
import { Dialog } from '@mui/material';
export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  action: () => void;
}

export interface CommandMenuProps {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
}

interface CommandDialogProps {
  children: React.ReactNode;
  open: boolean;
  _onOpenChange: () => void;
}

export const CommandDialog = ({ children, open, _onOpenChange }: CommandDialogProps) => {
  return <Dialog open={open} onClose={_onOpenChange}>{children}</Dialog>;
};
