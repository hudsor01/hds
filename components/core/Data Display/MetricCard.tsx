import { Card, CardContent, Typography, Box, CircularProgress, type Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { TrendingUp, TrendingDown } from '@mui/icons-material'

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  trend?: number
  loading?: boolean
  icon?: React.ReactNode
}

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    backgroundColor: theme.palette.primary.main,
    opacity: 0.5
  }
}))

const TrendIndicator = styled(Box)(({ theme, trend }: { theme: Theme; trend?: number }) => ({
  display: 'flex',
  alignItems: 'center',
  color: trend && trend > 0 ? theme.palette.success.main : theme.palette.error.main
}))

export function MetricCard({ title, value, description, trend, loading = false, icon }: MetricCardProps) {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
          {icon && <Box color="primary.main">{icon}</Box>}
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={60}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <>
            <Typography variant="h4" component="div" gutterBottom>
              {value}
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="space-between">
              {description && (
                <Typography variant="body2" color="textSecondary">
                  {description}
                </Typography>
              )}

              {trend !== undefined && (
                <TrendIndicator trend={trend}>
                  {trend > 0 ? <TrendingUp /> : <TrendingDown />}
                  <Typography variant="body2" component="span" ml={0.5}>
                    {Math.abs(trend)}%
                  </Typography>
                </TrendIndicator>
              )}
            </Box>
          </>
        )}
      </CardContent>
    </StyledCard>
  )
}
