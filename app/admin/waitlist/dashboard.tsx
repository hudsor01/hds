// app/admin/waitlist/dashboard.tsx
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
import {useState} from 'react';

const columns = [
  {field: 'email', headerName: 'Email', width: 250},
  {field: 'createdAt', headerName: 'Joined', width: 200},
  {field: 'status', headerName: 'Status', width: 130},
  {field: 'lastEmailSent', headerName: 'Last Email', width: 200},
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
    renderCell: params => (
      <Button onClick={() => handleSendEmail(params.row.email)}>Send Email</Button>
    ),
  },
];

export function WaitlistDashboard() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [emailDialog, setEmailDialog] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>(EmailTemplate.WELCOME);

  const handleBulkEmail = async () => {
    await Promise.all(
      selectedUsers.map(userId =>
        sendEmail(userId, emailTemplate, {position: getWaitlistPosition(userId)}),
      ),
    );
    setEmailDialog(false);
  };

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
        rows={waitlistEntries}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={ids => setSelectedUsers(ids)}
      />

      <Dialog open={emailDialog} onClose={() => setEmailDialog(false)}>
        <Box sx={{p: 3, width: 400}}>
          <FormControl fullWidth>
            <InputLabel>Email Template</InputLabel>
            <Select value={emailTemplate} onChange={e => setEmailTemplate(e.target.value)}>
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
