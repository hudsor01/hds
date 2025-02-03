'use client';

import {Box, Tab as MuiTab, Tabs as MuiTabs, SxProps, Theme} from '@mui/material';
import {styled} from '@mui/material/styles';
import {forwardRef, ReactElement, ReactNode, SyntheticEvent} from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  className?: string;
  sx?: SxProps<Theme>;
  keepMounted?: boolean;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  {children, value, index, keepMounted = false, ...props},
  ref,
) {
  return (
    <div
      ref={ref}
      role='tabpanel'
      hidden={!keepMounted && value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...props}
    >
      {(keepMounted || value === index) && <Box sx={{p: 3, ...props.sx}}>{children}</Box>}
    </div>
  );
});

const StyledTabs = styled(MuiTabs)(({theme}) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 3,
  },
  '& .MuiTabs-scrollButtons': {
    width: 48,
  },
}));

const StyledTab = styled(MuiTab)(({theme}) => ({
  textTransform: 'none',
  minWidth: 0,
  minHeight: 48,
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightRegular,
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.focus,
  },
}));

interface TabItem {
  label: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactElement;
  iconPosition?: 'start' | 'end' | 'top';
}

interface TabsProps {
  value: number;
  onChangeAction: (event: SyntheticEvent, newValue: number) => void;
  items: TabItem[];
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  centered?: boolean;
  keepMounted?: boolean;
  sx?: SxProps<Theme>;
  tabPanelSx?: SxProps<Theme>;
  className?: string;
}

export function Tabs({
  value,
  onChangeAction,
  items,
  variant = 'standard',
  centered = false,
  keepMounted = false,
  sx,
  tabPanelSx,
  className,
}: TabsProps) {
  return (
    <Box sx={{width: '100%', ...sx}} className={className}>
      <StyledTabs
        value={value}
        onChange={onChangeAction}
        variant={variant}
        centered={centered}
        scrollButtons={variant === 'scrollable' ? 'auto' : undefined}
        aria-label='tabs navigation'
      >
        {items.map((item, index) => (
          <StyledTab
            key={index}
            label={item.label}
            id={`tab-${index}`}
            aria-controls={`tabpanel-${index}`}
            disabled={item.disabled}
            icon={item.icon}
            iconPosition={item.iconPosition}
          />
        ))}
      </StyledTabs>

      {items.map((item, index) => (
        <TabPanel key={index} value={value} index={index} keepMounted={keepMounted} sx={tabPanelSx}>
          {item.content}
        </TabPanel>
      ))}
    </Box>
  );
}
