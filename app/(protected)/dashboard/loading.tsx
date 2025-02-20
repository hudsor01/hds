'use client'

import { Box, Skeleton, Card, CardContent } from '@mui/material'
import Grid from '@mui/material/Grid2'

export default function DashboardLoading() {
    return (
        <>
            {/* Stats Cards */}
            <Grid container spacing={3}>
                {[1, 2, 3, 4].map(item => (
                    <Grid xs={12} sm={6} md={3} key={item}>
                        <Card>
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2
                                    }}
                                >
                                    <Skeleton
                                        variant="circular"
                                        width={40}
                                        height={40}
                                    />
                                    <Box sx={{ ml: 2, flex: 1 }}>
                                        <Skeleton
                                            variant="text"
                                            width="60%"
                                        />
                                    </Box>
                                </Box>
                                <Skeleton
                                    variant="rectangular"
                                    height={40}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Charts */}
            <Grid xs={12} md={8}>
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Skeleton
                            variant="text"
                            width="30%"
                            sx={{ mb: 2 }}
                        />
                        <Skeleton
                            variant="rectangular"
                            height={300}
                        />
                    </CardContent>
                </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid xs={12} md={4}>
                <Card sx={{ mt: 3 }}>
                    <CardContent>
                        <Skeleton
                            variant="text"
                            width="50%"
                            sx={{ mb: 2 }}
                        />
                        {[1, 2, 3, 4].map(item => (
                            <Box
                                key={item}
                                sx={{ display: 'flex', mb: 2 }}
                            >
                                <Skeleton
                                    variant="circular"
                                    width={32}
                                    height={32}
                                />
                                <Box sx={{ ml: 2, flex: 1 }}>
                                    <Skeleton
                                        variant="text"
                                        width="80%"
                                    />
                                    <Skeleton
                                        variant="text"
                                        width="40%"
                                    />
                                </Box>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}
