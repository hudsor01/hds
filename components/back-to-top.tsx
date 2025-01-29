'use client';

import { Button } from 'components/ui/button';
import { motion, useScroll } from 'framer-motion';
import * as feather from 'react-feather';

import { useEffect, useState } from 'react';

export function BackToTop() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange(latest => {
      setShow(latest > 400);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className='fixed bottom-8 right-8'
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant='outline'
        onClick={scrollToTop}
        className='rounded-full w-10 h-10 bg-white shadow-lg dark:bg-gray-800'
      >
        <span className='sr-only'>Back to top</span>
        <span
          dangerouslySetInnerHTML={{
            __html: feather.icons['arrow-up'].toSvg({
              width: 20,
              height: 20,
              class: 'text-current',
            }),
          }}
        />
      </Button>
    </motion.div>
  );
}
