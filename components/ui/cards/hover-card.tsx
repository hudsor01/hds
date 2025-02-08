'use client';

import { motion } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
}

export function HoverCard({ children }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}
