'use client';

import {Alert} from '@/components/ui/alert';
import {Button} from '@/components/ui/buttons/button';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Separator} from '@/components/ui/separator';
import {format} from 'date-fns';
import {AnimatePresence, motion, Variants} from 'framer-motion';
import {useState} from 'react';
import {Clock, Globe, Laptop, Loader2, Shield, Smartphone, Trash2} from 'react-feather';
import {toast} from 'sonner';

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: Date;
  current: boolean;
}

// Animation variants
const containerVariants: Variants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: {opacity: 0, y: 20},
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {duration: 0.2},
  },
};

const loadingVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export function SessionManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRevoking, setIsRevoking] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/sessions');
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      setSessions(data.sessions);
    } catch (error) {
      toast.error(
        `Failed to load sessions: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    try {
      setIsRevoking(sessionId);
      const response = await fetch(`/api/auth/sessions/${sessionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to revoke session');

      setSessions(sessions.filter(session => session.id !== sessionId));
      toast.success('Session revoked successfully');
    } catch (error) {
      toast.error(
        `Failed to revoke session: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    } finally {
      setIsRevoking(null);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone className='h-4 w-4' />;
      case 'desktop':
        return <Laptop className='h-4 w-4' />;
      default:
        return <Globe className='h-4 w-4' />;
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    fetchSessions();
  };

  return (
    <>
      <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
        <Button variant='outline' onClick={handleOpen} className='flex items-center gap-2'>
          <Shield className='h-4 w-4' />
          Active Sessions
          {sessions.length > 1 && (
            <motion.span
              initial={{scale: 0}}
              animate={{scale: 1}}
              transition={{type: 'spring', stiffness: 500, damping: 25}}
              className='ml-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            >
              {sessions.length}
            </motion.span>
          )}
        </Button>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='max-w-3xl'>
          <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
          >
            <DialogHeader>
              <DialogTitle>Active Sessions</DialogTitle>
            </DialogHeader>
          </motion.div>

          <Separator />

          {isLoading ? (
            <motion.div
              className='flex flex-col items-center justify-center py-12 space-y-4'
              variants={loadingVariants}
              animate='animate'
            >
              <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
              <motion.p
                className='text-sm text-muted-foreground'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.2}}
              >
                Loading sessions...
              </motion.p>
            </motion.div>
          ) : sessions.length === 0 ? (
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{type: 'spring', stiffness: 300, damping: 25}}
              className='flex flex-col items-center justify-center py-12 text-center'
            >
              <Globe className='h-12 w-12 text-muted-foreground/50 mb-4' />
              <p className='text-muted-foreground'>No active sessions found</p>
            </motion.div>
          ) : (
            <motion.div
              className='space-y-6'
              variants={containerVariants}
              initial='hidden'
              animate='show'
            >
              <motion.div variants={itemVariants}>
                <Alert className='bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900'>
                  <div className='flex items-center gap-4'>
                    {sessions[0] && (
                      <div>
                        {getDeviceIcon(sessions[0]?.device)}
                        <div>
                          <div className='font-medium flex items-center gap-2'>
                            {sessions[0]?.browser}
                            {sessions[0]?.current && (
                              <span className='text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                                Current
                              </span>
                            )}
                          </div>
                          <div className='text-sm text-muted-foreground'>
                            {sessions[0].location}
                          </div>
                          <div className='text-xs text-muted-foreground flex items-center gap-1'>
                            <Clock className='h-3 w-3' />
                            Last active {format(new Date(sessions[0].lastActive), 'PPp')}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Alert>
              </motion.div>

              <motion.div className='grid gap-4' variants={containerVariants}>
                <AnimatePresence mode='popLayout'>
                  {sessions.map(session => (
                    <motion.div
                      key={session.id}
                      layout
                      variants={itemVariants}
                      initial='hidden'
                      animate='show'
                      exit='exit'
                      whileHover={{scale: 1.01}}
                      className={`relative rounded-lg border ${
                        session.current
                          ? 'bg-blue-50/50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900'
                          : 'bg-card hover:bg-accent/50'
                      } p-4 transition-all duration-200`}
                    >
                      <div className='flex items-center gap-4'>
                        {getDeviceIcon(session.device)}
                        <div>
                          <div className='font-medium flex items-center gap-2'>
                            {session.browser}
                            {session.current && (
                              <span className='text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'>
                                Current
                              </span>
                            )}
                          </div>
                          <div className='text-sm text-muted-foreground'>{session.location}</div>
                          <div className='text-xs text-muted-foreground flex items-center gap-1'>
                            <Clock className='h-3 w-3' />
                            Last active {format(new Date(session.lastActive), 'PPp')}
                          </div>
                        </div>
                      </div>

                      {!session.current && (
                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => revokeSession(session.id)}
                            disabled={isRevoking === session.id}
                            className='text-red-600 hover:text-red-700 hover:bg-red-50'
                          >
                            <motion.div
                              animate={
                                isRevoking === session.id ? {rotate: 360, scale: [1, 1.1, 1]} : {}
                              }
                              transition={{
                                rotate: {duration: 1, repeat: Infinity, ease: 'linear'},
                                scale: {duration: 0.5, repeat: Infinity},
                              }}
                            >
                              {isRevoking === session.id ? (
                                <Loader2 className='h-4 w-4' />
                              ) : (
                                <Trash2 className='h-4 w-4' />
                              )}
                            </motion.div>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {sessions.length > 1 && (
                <motion.div
                  variants={itemVariants}
                  className='flex items-center justify-between pt-4 border-t'
                >
                  <div className='text-xs text-muted-foreground'>
                    Revoking a session will force a sign out on that device. The current session
                    cannot be revoked.
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
