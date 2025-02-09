import { Card, CardContent, Typography, Chip, LinearProgress } from '@mui/material'
import FeatherIcon from 'feather-icons-react'
import type { WaitlistEntry } from '@/types/waitlist'

interface StatusCardProps {
  entry: WaitlistEntry
  totalCount: number
}

export default function StatusCard({ entry, totalCount }: StatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'success'
      case 'PENDING':
        return 'warning'
      case 'BLOCKED':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'check-circle'
      case 'PENDING':
        return 'clock'
      case 'BLOCKED':
        return 'x-circle'
      default:
        return 'help-circle'
    }
  }

  const progress = ((totalCount - entry.position + 1) / totalCount) * 100

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="h2">
            Waitlist Position
          </Typography>
          <Chip
            icon={<FeatherIcon icon={getStatusIcon(entry.status)} size={16} />}
            label={entry.status}
            color={getStatusColor(entry.status)}
            variant="outlined"
          />
        </div>

        <div className="mt-4">
          <div className="mb-1 flex justify-between">
            <Typography variant="body2" color="textSecondary">
              Position {entry.position} of {totalCount}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {Math.round(progress)}%
            </Typography>
          </div>
          <LinearProgress variant="determinate" value={progress} className="h-2 rounded-full" />
        </div>

        <div className="mt-4 flex items-center text-gray-600">
          <FeatherIcon icon="mail" size={16} className="mr-2" />
          <Typography variant="body2">{entry.email}</Typography>
        </div>

        {entry.referral_code && (
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <Typography variant="subtitle2" className="mb-2">
              Your Referral Code
            </Typography>
            <div className="flex items-center justify-between rounded border bg-white p-2">
              <Typography variant="body2" className="font-mono">
                {entry.referral_code}
              </Typography>
              <button
                onClick={() => navigator.clipboard.writeText(entry.referral_code!)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FeatherIcon icon="copy" size={16} />
              </button>
            </div>
          </div>
        )}

        {entry.referrals && entry.referrals.length > 0 && (
          <div className="mt-4">
            <Typography variant="subtitle2" className="mb-2">
              Your Referrals
            </Typography>
            <div className="space-y-2">
              {entry.referrals.map((referral) => (
                <div
                  key={referral.email}
                  className="flex items-center justify-between rounded bg-gray-50 p-2"
                >
                  <Typography variant="body2">{referral.email}</Typography>
                  <Chip
                    size="small"
                    label={referral.status}
                    color={getStatusColor(referral.status)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
