'use client';

import {useRoleBasedAccess} from '@/hooks/use-auth';
import {usePaymentHistory} from '@/hooks/use-payment';
import type {ApiResponse} from '@/lib/api';
import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers';
import {useState} from 'react';

interface PaymentHistoryProps {
  propertyId?: string;
  tenantId?: string;
}

interface Payment {
  id: string;
  payment_date: string;
  payment_type: string;
  payment_amount: number;
  payment_status: string;
  property?: {
    name: string;
  };
  tenant?: {
    first_name: string;
    last_name: string;
  };
  late_fee?: number;
  late_days?: number;
}

const PAYMENT_TYPES = ['RENT', 'DEPOSIT', 'LATE_FEE', 'MAINTENANCE', 'UTILITIES', 'OTHER'];
const PAYMENT_STATUSES = ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED'];

export default function PaymentHistory({propertyId, tenantId}: PaymentHistoryProps) {
  const {role, permissions} = useRoleBasedAccess();
  const [filters, setFilters] = useState({
    property_id: propertyId,
    tenant_id: tenantId || (role === 'TENANT' ? 'current' : ''),
    payment_type: '',
    payment_status: '',
    start_date: '',
    end_date: '',
    page: 1,
    limit: 10,
  });

  const {data: response, isLoading} = usePaymentHistory(filters);
  const payments = (response as ApiResponse<Payment[]>)?.data || [];

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset page when filters change
    }));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setFilters(prev => ({...prev, page}));
  };

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        {role === 'TENANT' ? 'My Payment History' : 'Payment History'}
      </Typography>

      <Card sx={{mb: 3, p: 2}}>
        <Box sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
          {permissions.canViewAllProperties && (
            <FormControl size='small' sx={{minWidth: 150}}>
              <InputLabel>Payment Type</InputLabel>
              <Select
                value={filters.payment_type}
                label='Payment Type'
                onChange={e => handleFilterChange('payment_type', e.target.value)}
              >
                <MenuItem value=''>All</MenuItem>
                {PAYMENT_TYPES.map(type => (
                  <MenuItem key={type} value={type}>
                    {type.replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl size='small' sx={{minWidth: 150}}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.payment_status}
              label='Status'
              onChange={e => handleFilterChange('payment_status', e.target.value)}
            >
              <MenuItem value=''>All</MenuItem>
              {PAYMENT_STATUSES.map(status => (
                <MenuItem key={status} value={status}>
                  {status.replace('_', ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label='Start Date'
            value={filters.start_date ? new Date(filters.start_date) : null}
            onChange={date =>
              handleFilterChange('start_date', date?.toISOString().split('T')[0] || '')
            }
            slotProps={{textField: {size: 'small'}}}
          />

          <DatePicker
            label='End Date'
            value={filters.end_date ? new Date(filters.end_date) : null}
            onChange={date =>
              handleFilterChange('end_date', date?.toISOString().split('T')[0] || '')
            }
            slotProps={{textField: {size: 'small'}}}
          />
        </Box>
      </Card>

      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              {permissions.canViewAllProperties && (
                <>
                  <TableCell>Late Fee</TableCell>
                  <TableCell>Total</TableCell>
                </>
              )}
              <TableCell>Status</TableCell>
              {permissions.canViewAllProperties && (
                <>
                  <TableCell>Property</TableCell>
                  <TableCell>Tenant</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={permissions.canViewAllProperties ? 8 : 4} align='center'>
                  Loading...
                </TableCell>
              </TableRow>
            ) : payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={permissions.canViewAllProperties ? 8 : 4} align='center'>
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              payments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                  <TableCell>{payment.payment_type.replace('_', ' ')}</TableCell>
                  <TableCell>${payment.payment_amount.toFixed(2)}</TableCell>
                  {permissions.canViewAllProperties && (
                    <>
                      <TableCell>
                        {payment.late_fee ? `$${payment.late_fee.toFixed(2)}` : '-'}
                        {payment.late_days ? ` (${payment.late_days} days)` : ''}
                      </TableCell>
                      <TableCell>
                        ${((payment.payment_amount || 0) + (payment.late_fee || 0)).toFixed(2)}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{payment.payment_status.replace('_', ' ')}</TableCell>
                  {permissions.canViewAllProperties && (
                    <>
                      <TableCell>{payment.property?.name || '-'}</TableCell>
                      <TableCell>
                        {payment.tenant
                          ? `${payment.tenant.first_name} ${payment.tenant.last_name}`
                          : '-'}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {(response as any)?.metadata?.totalPages > 1 && (
        <Box sx={{mt: 2, display: 'flex', justifyContent: 'center'}}>
          <Pagination
            count={(response as any)?.metadata?.totalPages || 1}
            page={filters.page}
            onChange={handlePageChange}
            color='primary'
          />
        </Box>
      )}
    </Box>
  );
}
