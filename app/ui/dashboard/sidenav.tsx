'use client'

import { signOut } from '@/auth'
import { Building2, ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { Button } from 'my-app/app/components/ui/button'
import { NAVIGATION_LINKS } from 'my-app/app/lib/constants'
import { cn } from 'my-app/app/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function SideNav() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      'flex h-screen flex-col border-r bg-background transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex h-14 items-center border-b px-4">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <span className="font-semibold">Property Manager</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'ml-auto h-8 w-8',
            isCollapsed && 'ml-2'
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {NAVIGATION_LINKS.map((link) => {
          const LinkIcon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted',
                isCollapsed && 'justify-center'
              )}
            >
              <LinkIcon className="h-4 w-4" />
              {!isCollapsed && <span>{link.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <form action={async () => {
          await signOut()
        }}>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-2',
              isCollapsed && 'justify-center'
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span>Sign Out</span>}
          </Button>
        </form>
      </div>
    </div>
  )
}
