'use client'

import { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material'
import { Line } from '@mui/x-charts'
import { useTheme } from '@mui/material/styles'
import { useAnimation } from '@/components/providers/animation-provider'

interface PerformanceMetric {
  timestamp: number
  frameRate: number
  droppedFrames: number
}

export function AnimationPerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const { reduceMotion } = useAnimation()
  const theme = useTheme()

  useEffect(() => {
    const metricsHistory: PerformanceMetric[] = []

    const observer = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'animation') {
          const metric = {
            timestamp: entry.startTime,
            frameRate: 1000 / entry.duration,
            droppedFrames: Math.max(0, entry.duration / 16.67 - entry.localCandidateCount)
          }
          metricsHistory.push(metric)
          setMetrics([...metricsHistory].slice(-50)) // Keep last 50 measurements
        }
      }
    })

    observer.observe({ entryTypes: ['animation'] })
    return () => observer.disconnect()
  }, [])

  const averageFrameRate = metrics.reduce((acc, m) => acc + m.frameRate, 0) / metrics.length || 0
  const totalDroppedFrames = metrics.reduce((acc, m) => acc + m.droppedFrames, 0)

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Animation Performance Metrics
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Reduced Motion: {reduceMotion ? 'Enabled' : 'Disabled'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Average Frame Rate: {averageFrameRate.toFixed(2)} fps
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Dropped Frames: {totalDroppedFrames}
          </Typography>
        </Box>

        <Box sx={{ height: 200, mb: 2 }}>
          <Line
            data={metrics}
            xKey="timestamp"
            series={[
              {
                data: metrics.map(m => m.frameRate),
                label: 'Frame Rate',
                color: theme.palette.primary.main
              }
            ]}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Performance Health
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(averageFrameRate / 60) * 100}
          color={averageFrameRate > 50 ? 'success' : averageFrameRate > 30 ? 'warning' : 'error'}
          sx={{ height: 8, borderRadius: 1 }}
        />
      </CardContent>
    </Card>
  )
}
