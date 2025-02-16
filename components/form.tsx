import { Button } from './buttons/button'
import { Input } from '@/components/input'
import { containerVariants, itemVariants } from '@/lib/utils/animations/animation-variants'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChangeEvent } from 'react'
import { GitHub, X } from 'react-feather'

interface FormProps {
  name: string
  email: string
  handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: () => void
  loading: boolean
}

export default function Form({ name, email, handleNameChange, handleEmailChange, handleSubmit, loading }: FormProps) {
  return (
    <motion.div
      className="mt-6 flex w-full max-w-[24rem] flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Input type="text" placeholder="Your Name" value={name} onChange={handleNameChange} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input type="email" placeholder="Your Email Address" value={email} onChange={handleEmailChange} />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Button variant="default" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Join Waitlist!'}
        </Button>
      </motion.div>
      <motion.div variants={itemVariants} className="text-muted-foreground mt-4 flex w-full items-center justify-center gap-1">
        <p>For unknown queries, reach out at </p>
        <Link href="https://x.com/dickswayze" rel="noopener noreferrer" target="_blank">
          <X className="h-4 w-4 transition-all duration-200 ease-linear hover:text-yellow-200" />
        </Link>
        or
        <Link href="https://github.com/hudsor01" rel="noopener noreferrer" target="_blank">
          <GitHub className="ml-0.5 h-5 w-5 transition-all duration-200 ease-linear hover:text-yellow-200" />
        </Link>
      </motion.div>
    </motion.div>
  )
}
