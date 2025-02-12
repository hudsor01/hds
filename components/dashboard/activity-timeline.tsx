import { Activity, ActivityType } from '@/types'
import BuildIcon from '@mui/icons-material/Build'
import HomeIcon from '@mui/icons-material/Home'
import PaymentIcon from '@mui/icons-material/Payment'
import PersonIcon from '@mui/icons-material/Person'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import { useState } from 'react'

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case 'property':
      return <HomeIcon />
    case 'payment':
      return <PaymentIcon />
    case 'maintenance':
      return <BuildIcon />
    case 'tenant':
      return <PersonIcon />
  }
}

function getTimelineDotColor(type: ActivityType) {
  switch (type) {
    case 'property':
      return 'primary'
    case 'payment':
      return 'success'
    case 'maintenance':
      return 'error'
    case 'tenant':
      return 'info'
  }
}

export function ActivityTimeline() {
  const [expanded, setExpanded] = useState(false)

  // Mock data - would come from your activity log API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Rent Payment Received',
      description: 'Tenant John Doe submitted rent payment for 123 Main St.',
      timestamp: new Date(),
      metadata: {
        amount: '$1,500',
        property: '123 Main St'
      }
    },
    {
      id: '2',
      type: 'maintenance',
      title: 'New Maintenance Request',
      description: 'HVAC repair requested for 456 Oak Ave.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      metadata: {
        priority: 'High',
        property: '456 Oak Ave'
      }
    },
    {
      id: '3',
      type: 'tenant',
      title: 'Lease Signed',
      description: 'New tenant Sarah Smith signed lease for 789 Pine St.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      metadata: {
        lease_term: '12 months',
        property: '789 Pine St'
      }
    }
  ]

  const displayedActivities = expanded ? activities : activities.slice(0, 3)

  return (
    <Card>
      <CardHeader
        title="Recent Activity"
        action={
          activities.length > 3 && (
            <Button onClick={() => setExpanded(!expanded)} size="small">
              {expanded ? 'Show Less' : 'View All'}
            </Button>
          )
        }
      />
      <CardContent>
        {displayedActivities.map(activity => (
          <div key={activity.id}>
            <Typography variant="subtitle2" component="div">
              {activity.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activity.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {format(activity.timestamp, 'MMM d, yyyy h:mm a')}
            </Typography>
            {activity.metadata && (
        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 1,
            p: 1,
            bgcolor: 'action.hover',
            borderRadius: 1,
            display: 'inline-block'
          }}
        >
          {Object.entries(activity.metadata).map(([key, value]) => (
            <span key={key} style={{ marginRight: 8 }}>
            </Typography>
          )}
          </div>
        ))}
      </CardContent>
    </Card>
        </Typography>
      )}
    </Card>
  )
}
