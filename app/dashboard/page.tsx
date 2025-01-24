'use client';

import { motion } from 'framer-motion';

import { Suspense } from 'react';

import { Box, Typography } from '@mui/material';

import { MetricsGrid } from '@/components/dashboard/metrics-grid';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RecentActivityList } from '@/components/dashboard/recent-activity';

import { getRecentActivity } from '@/auth/lib/actions';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

async function RecentActivityData() {
  const activities = await getRecentActivity();
  return <RecentActivityList activities={activities} />;
}

export default function DashboardPage() {
  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial='hidden'
      animate='show'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        height: '100%',
      }}
    >
      <Box component={motion.div} variants={itemVariants}>
        <Typography variant='h4' fontWeight={700}>
          Welcome back
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Here's your property management overview
        </Typography>
      </Box>

      <Suspense fallback={<MetricSkeleton />}>
        <MetricsGrid />
      </Suspense>

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          height: '100%',
        }}
      >
        <Suspense fallback={<QuickActionsSkeleton />}>
          <QuickActions />
        </Suspense>

        <Suspense fallback={<ActivitySkeleton />}>
          <RecentActivityData />
        </Suspense>
      </Box>
    </Box>
  );
}

// Enhanced Loading Components
const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

export function DashboardLoading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className='space-y-8 p-4'
    >
      {/* Header Skeleton */}
      <div className='space-y-2'>
        <div className={`h-8 w-64 rounded-lg bg-muted ${shimmer}`} />
        <div className={`h-5 w-80 rounded-lg bg-muted ${shimmer}`} />
      </div>

      {/* Metrics Grid */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`h-32 rounded-xl bg-muted ${shimmer}`} />
        ))}
      </div>

      {/* Quick Actions & Activity */}
      <div className='grid gap-4 lg:grid-cols-2'>
        <div className={`h-96 rounded-xl bg-muted ${shimmer}`} />
        <div className={`h-96 rounded-xl bg-muted ${shimmer}`} />
      </div>
    </motion.div>
  );
}

const MetricSkeleton = () => (
  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
    {[...Array(4)].map((_, i) => (
      <div key={i} className={`h-32 rounded-xl bg-muted ${shimmer}`} />
    ))}
  </div>
);

const QuickActionsSkeleton = () => <div className={`h-96 rounded-xl bg-muted ${shimmer}`} />;

const ActivitySkeleton = () => <div className={`h-96 rounded-xl bg-muted ${shimmer}`} />;
