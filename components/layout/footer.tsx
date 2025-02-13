'use client'

import { containerVariants, itemVariants } from '@/lib/animation-variants'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Footer() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-background text-muted-foreground mt-auto flex w-full items-center justify-center gap-1 border-t p-6 md:justify-start"
    >
      <motion.div variants={itemVariants}>
          <span className="text-zinc-300 underline underline-offset-2 transition-all duration-200 ease-linear hover:text-yellow-200">
          </span>
        </Link>
      </motion.div>
    </motion.div>
  )
}
