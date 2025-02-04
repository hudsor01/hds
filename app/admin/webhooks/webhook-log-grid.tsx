'use client';

import type {WebhookEventType, WebhookLog, WebhookPayload} from '@/types/webhooks';
import {Button, Chip, Dialog, DialogContent, DialogTitle} from '@mui/material';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {useState} from 'react';

interface WebhookLogGridProps {
  logs: WebhookLog[];
}

const EVENT_TYPE_COLORS: Record<string, 'info' | 'success' | 'warning' | 'error'> = {
  'user.created': 'success',
  'user.updated': 'info',
  'user.deleted': 'error',
  'session.created': 'success',
  'session.ended': 'info',
  'organization.created': 'success',
  'organization.updated': 'info',
  'organization.deleted': 'error',
};

export function WebhookLogGrid({logs}: WebhookLogGridProps) {
  const [selectedPayload, setSelectedPayload] = useState<WebhookPayload | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <DataGrid<WebhookLog>
        rows={logs}
        columns={[
          {
            field: 'event_type',
            headerName: 'Event',
            width: 200,
            renderCell: ({value}) => (
              <Chip
                label={value}
                color={EVENT_TYPE_COLORS[value as WebhookEventType] || 'default'}
                size='small'
              />
            ),
          },
          {
            field: 'created_at',
            headerName: 'Time',
            width: 200,
            valueFormatter: ({value}) => new Date(value as string).toLocaleString(),
          },
          {
            field: 'success',
            headerName: 'Status',
            width: 100,
            renderCell: ({value}) => (
              <Chip
                label={value ? 'Success' : 'Failed'}
                color={value ? 'success' : 'error'}
                size='small'
              />
            ),
          },
          {
            field: 'payload',
            headerName: 'Data',
            width: 300,
            renderCell: ({value}) => (
              <Button
                variant='outlined'
                size='small'
                onClick={() => {
                  setSelectedPayload(JSON.parse(value as string));
                  setModalOpen(true);
                }}
              >
                View Payload
              </Button>
            ),
          },
        ]}
        autoHeight
        disableRowSelectionOnClick
        slots={{toolbar: GridToolbar}}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {pageSize: 10},
          },
          sorting: {
            sortModel: [{field: 'created_at', sort: 'desc'}],
          },
        }}
      />

      <Dialog open={isModalOpen} onClose={() => setModalOpen(false)} maxWidth='md' fullWidth>
        <DialogTitle>Webhook Payload</DialogTitle>
        <DialogContent>
          <pre className='bg-gray-50 p-4 rounded-md overflow-auto'>
            {JSON.stringify(selectedPayload, null, 2)}
          </pre>
        </DialogContent>
      </Dialog>
    </>
  );
}
