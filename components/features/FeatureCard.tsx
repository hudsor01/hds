'use client';

import { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Collapse,
  useTheme,
  alpha,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  details?: string[];
}

export function FeatureCard({ icon, title, description, color, details }: FeatureCardProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        bgcolor: alpha(color, 0.03),
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: theme.shadows[4],
          '& .feature-icon': {
            transform: 'scale(1.1)',
            color: color,
          },
        },
      }}
    >
      <Box
        className="feature-icon"
        sx={{
          mb: 3,
          p: 2,
          borderRadius: '50%',
          bgcolor: alpha(color, 0.1),
          color: alpha(color, 0.8),
          transition: 'all 0.3s ease-in-out',
          '& > svg': {
            fontSize: 40,
          },
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 2,
          color: theme.palette.text.primary,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          lineHeight: 1.7,
          mb: details ? 2 : 0,
        }}
      >
        {description}
      </Typography>

      {details && (
        <>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            sx={{
              mt: 'auto',
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s',
              color: color,
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ pt: 2, pb: 1 }}>
              {details.map((detail, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    textAlign: 'left',
                    '&:before': {
                      content: '"•"',
                      color: color,
                      fontWeight: 'bold',
                      display: 'inline-block',
                      width: '1em',
                      marginLeft: '-1em',
                    },
                  }}
                >
                  {detail}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </>
      )}
    </Paper>
  );
}