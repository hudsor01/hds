import Button from '@mui/material/Button'
import { containerVariants, itemVariants } from '@/lib/animation-variants'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  return (
    <motion.header
      className="bg-background-app py-4 shadow-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          HDS Platform
        </Link>
        <nav className="flex items-center space-x-4">
          <motion.div variants={itemVariants}>
            <Link href="/properties">Properties</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/tenants">Tenants</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/payments">Payments</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="/work-orders">Work Orders</Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button variant="contained" color="primary">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  )
}
