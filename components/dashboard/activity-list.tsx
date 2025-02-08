'use client';

import { VirtualizedList } from './virtualized-list.jsx';
import { Box, Chip, Divider, ListItem, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { FileText, Home, Key, Tool, User } from 'react-feather';

interface ActivityItem {
  id: string;
  type: 'property' | 'tenant' | 'maintenance' | 'lease' | 'document';
  action: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  details: string;
}

interface ActivityListProps {
  activities: ActivityItem[];
}

const statusColors = {
  completed: 'success',
  pending: 'warning',
  failed: 'error',
} as const;

const typeIcons = {
  property: Home,
  tenant: User,
  maintenance: Tool,
  lease: Key,
  document: FileText,
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ActivityList({ activities }: ActivityListProps) {
  const theme = useTheme();

  const renderActivityItem = (activity: ActivityItem, index: number) => {
    const Icon = typeIcons[activity.type];
    const statusColor = statusColors[activity.status];

    return (
      <ListItem
        component={motion.div}
        variants={itemVariants}
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          '&:last-child': {
            borderBottom: 'none',
          },
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.04),
          },
        }}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            bgcolor: alpha(theme.palette[statusColor].main, 0.1),
            color: theme.palette[statusColor].main,
          }}
        >
          <Icon size={20} />
        </Box>

        <Stack spacing={0.5} flex={1}>
          <Typography variant="subtitle2" fontWeight={600}>
            {activity.action}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {activity.details}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography variant="caption" color="text.disabled">
              {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
            </Typography>
            <Chip
              label={activity.status}
              size="small"
              color={statusColor}
              sx={{ height: 20, fontSize: '0.75rem' }}
            />
          </Stack>
        </Stack>
      </ListItem>
    );
  };

  return (
    <VirtualizedList
      items={activities}
      renderItem={renderActivityItem}
      estimateSize={120}
      overscan={3}
    />
  );
}
