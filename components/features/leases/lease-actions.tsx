'use client'

import { useLeaseActions } from '@/hooks/use-leases'
import { LEASE_STATUS } from '@/types'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { MoreVertical } from 'react-feather'

interface LeaseActionsProps {
  leaseId: string
  leaseStatus: keyof typeof LEASE_STATUS
}

export function LeaseActions({ leaseId, leaseStatus }: LeaseActionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { terminate, renew } = useLeaseActions(leaseId)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleTerminate = async () => {
    await terminate.mutateAsync()
    handleClose()
  }

  const handleRenew = async () => {
    await renew.mutateAsync({
      newEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
    })
    handleClose()
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertical size={20} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {leaseStatus === 'active' && (
          <MenuItem onClick={handleTerminate} disabled={terminate.isPending}>
            Terminate Lease
          </MenuItem>
        )}
        {leaseStatus === 'expired' && (
          <MenuItem onClick={handleRenew} disabled={renew.isPending}>
            Renew Lease
          </MenuItem>
        )}
      </Menu>
    </>
  )
}
