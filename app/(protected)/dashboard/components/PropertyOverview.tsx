'use client'

import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    LinearProgress,
    Chip,
    IconButton,
    useTheme,
    alpha
} from '@mui/material'
import {
    Apartment as ApartmentIcon,
    People as PeopleIcon,
    AttachMoney as MoneyIcon,
    Warning as WarningIcon,
    MoreVert as MoreVertIcon
} from '@mui/icons-material'

const stats = [
    {
        title: 'Total Properties',
        value: '12',
        icon: <ApartmentIcon />,
        color: '#2563EB',
        change: '+2',
        occupancy: 85
    },
    {
        title: 'Active Tenants',
        value: '48',
        icon: <PeopleIcon />,
        color: '#059669',
        change: '+5',
        satisfaction: 92
    },
    {
        title: 'Monthly Revenue',
        value: '$52,450',
        icon: <MoneyIcon />,
        color: '#7C3AED',
        change: '+12%',
        collected: 95
    },
    {
        title: 'Maintenance',
        value: '8',
        icon: <WarningIcon />,
        color: '#DC2626',
        change: '-3',
        urgent: 2
    }
]

export function PropertyOverview() {
    const theme = useTheme()

    return (
        <Card
            sx={{
                height: '100%',
                background: theme.palette.background.paper,
                boxShadow: theme.shadows[1]
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3
                    }}
                >
                    <Typography variant="h6" fontWeight="bold">
                        Property Overview
                    </Typography>
                    <IconButton size="small">
                        <MoreVertIcon />
                    </IconButton>
                </Box>

                <Grid container spacing={3}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: alpha(stat.color, 0.1),
                                    borderRadius: 2,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: theme.shadows[4]
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2
                                    }}
                                >
                                    <Box
                                        sx={{
                                            p: 1,
                                            borderRadius: 1,
                                            bgcolor: alpha(
                                                stat.color,
                                                0.2
                                            ),
                                            color: stat.color,
                                            mr: 2
                                        }}
                                    >
                                        {stat.icon}
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {stat.title}
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                        >
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 1
                                    }}
                                >
                                    <Chip
                                        size="small"
                                        label={stat.change}
                                        color={
                                            stat.change.startsWith(
                                                '+'
                                            )
                                                ? 'success'
                                                : 'error'
                                        }
                                        sx={{ mr: 1 }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        vs last month
                                    </Typography>
                                </Box>

                                {/* Show relevant progress bar based on stat type */}
                                {stat.occupancy && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Occupancy Rate
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={stat.occupancy}
                                            sx={{
                                                mt: 1,
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: alpha(
                                                    stat.color,
                                                    0.2
                                                ),
                                                '& .MuiLinearProgress-bar':
                                                    {
                                                        bgcolor:
                                                            stat.color
                                                    }
                                            }}
                                        />
                                    </Box>
                                )}

                                {stat.satisfaction && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Tenant Satisfaction
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={stat.satisfaction}
                                            sx={{
                                                mt: 1,
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: alpha(
                                                    stat.color,
                                                    0.2
                                                ),
                                                '& .MuiLinearProgress-bar':
                                                    {
                                                        bgcolor:
                                                            stat.color
                                                    }
                                            }}
                                        />
                                    </Box>
                                )}

                                {stat.collected && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Rent Collected
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={stat.collected}
                                            sx={{
                                                mt: 1,
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: alpha(
                                                    stat.color,
                                                    0.2
                                                ),
                                                '& .MuiLinearProgress-bar':
                                                    {
                                                        bgcolor:
                                                            stat.color
                                                    }
                                            }}
                                        />
                                    </Box>
                                )}

                                {stat.urgent && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Urgent Issues:{' '}
                                            {stat.urgent}
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={
                                                (stat.urgent / 8) *
                                                100
                                            }
                                            sx={{
                                                mt: 1,
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: alpha(
                                                    stat.color,
                                                    0.2
                                                ),
                                                '& .MuiLinearProgress-bar':
                                                    {
                                                        bgcolor:
                                                            stat.color
                                                    }
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}
