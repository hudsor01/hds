'use client';

import { Button } from '@/components/ui/buttons/button';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const buttonVariants = {
  tap: { scale: 0.98 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ children, ...props }, ref) => {
  return (
    <motion.div whileTap="tap" whileHover="hover" variants={buttonVariants}>
      <Button ref={ref} {...props}>
        {children}
      </Button>
    </motion.div>
  );
});
AnimatedButton.displayName = 'AnimatedButton';
