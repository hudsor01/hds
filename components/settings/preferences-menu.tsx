'use client';

import {Button} from '@/components/ui/buttons/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

export function PreferencesMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant='ghost' size='icon'>
          <span className='sr-only'>Open preferences menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem>Profile Settings</DropdownMenuItem>
        <DropdownMenuItem>Notifications</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
