'use client'

import { usePaymentMethods, useRemovePaymentMethod } from '@/hooks/use-payment'
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Skeleton,
  Typography
} from '@mui/material'
import type { PaymentMethod } from '@stripe/stripe-js'
import { CreditCard, Trash2 } from 'react-feather'
import { toast } from 'sonner'

interface PaymentMethodListProps {
  onAddNew?: () => void
  onSelect?: (paymentMethodId: string) => void
  selectedId?: string
}

export default function PaymentMethodList({ onAddNew, onSelect, selectedId }: PaymentMethodListProps) {
  const { data: response, isLoading } = usePaymentMethods()
  const removePaymentMethod = useRemovePaymentMethod()
  const paymentMethods = response?.data as PaymentMethod[] | undefined

  const handleRemove = async (paymentMethodId: string) => {
    if (!confirm('Are you sure you want to remove this payment method?')) return

    try {
      await removePaymentMethod.mutateAsync(paymentMethodId)
    } catch (error) {
      console.error('Error removing payment method:', error)
      toast.error('Failed to remove payment method')
    }
  }

  if (isLoading) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Payment Methods
        </Typography>
        <List>
          {[1, 2].map(i => (
            <ListItem key={i}>
              <ListItemIcon>
                <CreditCard />
              </ListItemIcon>
              <ListItemText primary={<Skeleton width="60%" />} secondary={<Skeleton width="40%" />} />
            </ListItem>
          ))}
        </List>
      </Box>
    )
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography variant="h6">Payment Methods</Typography>
        {onAddNew && (
          <Button
            variant="contained"
            onClick={onAddNew}
            sx={{
              background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
              }
            }}
          >
            Add New
          </Button>
        )}
      </Box>

      {!paymentMethods?.length ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No payment methods added yet
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <List>
          {paymentMethods.map(method => (
            <ListItem
              key={method.id}
              onClick={() => onSelect?.(method.id)}
              sx={{
                cursor: onSelect ? 'pointer' : 'default',
                bgcolor: selectedId === method.id ? 'action.selected' : undefined,
                '&:hover': {
                  bgcolor: onSelect ? 'action.hover' : undefined
                }
              }}
            >
              <ListItemIcon>
                <CreditCard />
              </ListItemIcon>
              <ListItemText
                primary={`${(method.card?.brand || '').toUpperCase()} •••• ${method.card?.last4}`}
                secondary={`Expires ${method.card?.exp_month}/${method.card?.exp_year}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={e => {
                    e.stopPropagation()
                    handleRemove(method.id)
                  }}
                  disabled={removePaymentMethod.isPending}
                >
                  <Trash2 size={20} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}
