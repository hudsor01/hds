'use client';

import { cn } from '@/lib/utils';

interface PublicLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function PublicLayout({ children, className }: PublicLayoutProps) {
  return (
    <div className={cn('relative min-h-screen', className)}>
      {/* Global gradient background for public pages */}
      <div className="fixed inset-0 bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f7ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f7ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
