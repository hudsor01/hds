'use client';

import { signOut } from 'next-auth/react';
import { Bell, LogOut, Settings, User } from 'react-feather';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
    lastLogin?: Date;
  };
  notifications?: number;
}

export function UserProfile({ user, notifications = 0 }: UserProfileProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.push('/login' as any); // Type assertion to resolve route type mismatch
    } catch (error) {
      console.error('Sign out failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className='relative'>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-12 w-12'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className='text-xl font-semibold'>{user.name}</CardTitle>
                <CardDescription className='text-sm text-muted-foreground'>
                  {user.role}
                </CardDescription>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuItem>
                <Button variant='default' className='relative'>
                  <Bell className='h-5 w-5' />
                  {notifications > 0 && (
                    <span className='absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center'>
                      {notifications}
                    </span>
                  )}
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem className='w-56'>
                <DropdownMenu>Notifications</DropdownMenu>
                <DropdownMenuSeparator />
                {notifications === 0 ? (
                  <div className='px-2 py-4 text-sm text-center text-muted-foreground'>
                    No new notifications
                  </div>
                ) : (
                  <DropdownMenuItem>New login from Chrome on Windows</DropdownMenuItem>
                )}
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <div className='space-y-4'>
            <div className='flex items-center justify-between py-2 border-b'>
              <span className='text-sm text-muted-foreground'>Email</span>
              <span className='text-sm font-medium'>{user.email}</span>
            </div>

            {user.lastLogin && (
              <div className='flex items-center justify-between py-2 border-b'>
                <span className='text-sm text-muted-foreground'>Last login</span>
                <span className='text-sm font-medium'>
                  {new Date(user.lastLogin).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </span>
              </div>
            )}

            <div className='flex flex-col gap-3 mt-6'>
              <Link href={{ pathname: '/dashboard/settings' }}>
                <Button variant='outline' className='w-full justify-start'>
                  <Settings className='mr-2 h-4 w-4' />
                  Account Settings
                </Button>
              </Link>

              <Link href={{ pathname: '/dashboard/profile' }}>
                <Button variant='outline' className='w-full justify-start'>
                  <User className='mr-2 h-4 w-4' />
                  Edit Profile
                </Button>
              </Link>

              <Button
                variant='outline'
                className='w-full justify-start mt-2 bg-red-500 hover:bg-red-600 text-white border-red-600'
                onClick={handleSignOut}
                disabled={isLoading}
              >
                <LogOut className='mr-2 h-4 w-4' />
                {isLoading ? 'Signing out...' : 'Sign out'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
