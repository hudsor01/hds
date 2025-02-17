'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className="text-muted-foreground flex space-x-2 text-sm">
      <Link href="/" className="hover:text-foreground">
        Home
      </Link>
      {segments.map((segment, index) => (
        <div key={segment} className="flex items-center space-x-2">
          <KeyboardArrowRightIcon className="h-4 w-4" />
          <Link href={`/${segments.slice(0, index + 1).join('/')}`} className="hover:text-foreground capitalize">
            {segment}
          </Link>
        </div>
      ))}
    </nav>
  )
}
