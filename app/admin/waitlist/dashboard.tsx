'use client';

import {EmailTemplate} from '@/components/emails/templates';
import {
  Box,
  Button,
  Card,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';

// Define the waitlist entry type (modify as needed to match your API response)
interface WaitlistEntry {
  id: number | string;
  email: string;
  createdAt: string;
  status: string;
  lastEmailSent?: string;
}

const columns = [
  {field: 'email', headerName: 'Email', width: 250},
  {field: 'createdAt', headerName: 'Joined', width: 200},
  {field: 'status', headerName: 'Status', width: 130},
  {field: 'lastEmailSent', headerName: 'Last Email', width: 200},
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: (params: {row: {email: any}}) => (
      <Button onClick={() => handleSendEmail(params.row.email)}>Send Email</Button>
    ),
  },
];

export function WaitlistDashboard() {
  const [selectedUsers, setSelectedUsers] = useState<(string | number)[]>([]);
  const [emailDialog, setEmailDialog] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>(EmailTemplate.WELCOME);

  // Fetch data with TanStack Query
  const {
    data: waitlistEntries,
    isLoading,
    error,
  } = useQuery<WaitlistEntry[]>({
    queryKey: ['waitlistEntries'],
    queryFn: async () => {
      const res = await fetch('/api/waitlist');
      if (!res.ok) {
        throw new Error('Failed to fetch waitlist entries');
      }
      return res.json() as Promise<WaitlistEntry[]>;
    },
  });

  const handleBulkEmail = async () => {
    await Promise.all(
      selectedUsers.map(userId =>
        sendEmail(userId, emailTemplate, {position: getWaitlistPosition(userId)}),
      ),
    );
    setEmailDialog(false);
  };

  if (isLoading) {
    return <Box sx={{p: 4}}>Loading...</Box>;
  }

  if (error) {
    return <Box sx={{p: 4}}>Error loading waitlist entries</Box>;
  }

  return (
    <Box sx={{p: 4}}>
      <Card sx={{mb: 4}}>
        <Tabs value={0}>
          <Tab label='All Users' />
          <Tab label='Early Access' />
          <Tab label='Pending' />
        </Tabs>
      </Card>

      <Box sx={{mb: 3}}>
        <Button
          variant='contained'
          disabled={!selectedUsers.length}
          onClick={() => setEmailDialog(true)}
        >
          Email Selected ({selectedUsers.length})
        </Button>
      </Box>

      <DataGrid
        rows={waitlistEntries || []}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={ids => setSelectedUsers(ids as (string | number)[])}
      />

      <Dialog open={emailDialog} onClose={() => setEmailDialog(false)}>
        <Box sx={{p: 3, width: 400}}>
          <FormControl fullWidth>
            <InputLabel>Email Template</InputLabel>
            <Select
              value={emailTemplate}
              onChange={e => setEmailTemplate(e.target.value as EmailTemplate)}
            >
              <MenuItem value={EmailTemplate.WELCOME}>Welcome</MenuItem>
              <MenuItem value={EmailTemplate.EARLY_ACCESS}>Early Access</MenuItem>
              <MenuItem value={EmailTemplate.SPOT_AVAILABLE}>Spot Available</MenuItem>
              <MenuItem value={EmailTemplate.LAUNCH_REMINDER}>Launch Reminder</MenuItem>
            </Select>
          </FormControl>

          <Button fullWidth variant='contained' onClick={handleBulkEmail} sx={{mt: 2}}>
            Send Emails
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

function handleSendEmail(email: any): void {
  throw new Error('Function not implemented.');
}

function sendEmail(
  userId: string | number,
  emailTemplate: EmailTemplate,
  arg2: {position: any},
): any {
  throw new Error('Function not implemented.');
}

function getWaitlistPosition(userId: string | number) {
  throw new Error('Function not implemented.');
}
