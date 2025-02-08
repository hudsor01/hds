import { Button } from './ui/button';
import { containerVariants, itemVariants } from '@/lib/animation-variants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';
import { SiNotion } from 'react-icons/si';

export default function Header() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 right-0 top-0 z-[50] m-4 flex justify-between"
    >
      <motion.div variants={itemVariants}>
        <Link
          href="https://lakshaybhushan.notion.site/15e45b25609e80408f83ebb97b45882b?v=c949c24dff4a42b3baa31bfb3e8a3354"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button
            size="sm"
            variant="secondary"
            className="text-yellow-50 transition-all duration-150 ease-linear md:hover:text-yellow-200"
          >
            <SiNotion className="md:mr-1.5" />
            <span className="hidden md:inline">Notion DB sample</span>
          </Button>
        </Link>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Link
          href="https://github.com/lakshaybhushan/nextjs-notion-waitlist-template/fork"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button
            size="sm"
            variant="secondary"
            className="text-yellow-50 transition-all duration-150 ease-linear md:hover:text-yellow-200"
          >
            <FaGithub className="md:mr-1.5" />
            <span className="hidden md:inline">Use this template</span>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
