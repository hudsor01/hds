'use client';

import { Button } from '@/components/ui/buttons/button';
import { Input } from 'components/ui/input';
import Textarea from 'components/ui/textarea';
import { motion } from 'framer-motion';

const formVariants = {
  input: {
    focus: { scale: 1.01, boxShadow: '0 0 0 2px var(--primary)' },
    error: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } },
  },
  button: {
    tap: { scale: 0.98 },
    hover: { scale: 1.02, backgroundColor: 'var(--primary-dark)' },
    loading: { opacity: 0.8, transition: { repeat: Infinity, duration: 1 } },
  },
};

interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function AnimatedInput({ error, ...props }: AnimatedInputProps) {
  return (
    <motion.div
      animate={error ? 'error' : ''}
      variants={formVariants.input}
      whileFocus="focus"
    >
      <Input {...props} />
    </motion.div>
  );
}

export function AnimatedButton({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <motion.div
      variants={formVariants.button}
      animate={isLoading ? 'loading' : ''}
      whileTap="tap"
      whileHover="hover"
    >
      <Button disabled={isLoading} className="w-full">
        {children}
      </Button>
    </motion.div>
  );
}

interface AnimatedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function AnimatedTextarea({ error, ...props }: AnimatedTextareaProps) {
  return (
    <motion.div
      animate={error ? 'error' : ''}
      variants={formVariants.input}
      whileFocus="focus"
    >
      <Textarea {...props} />
    </motion.div>
  );
}
