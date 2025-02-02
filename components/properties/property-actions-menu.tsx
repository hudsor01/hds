// components/properties/property-actions-menu.tsx
import BuildIcon from '@mui/icons-material/Build'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ReceiptIcon from '@mui/icons-material/Receipt'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import { useRouter } from 'next/navigation'

export function PropertyActionsMenu() {
  const router = useRouter();

  const actions = [
    {
      icon: <HomeWorkIcon />,
      name: 'Add Property',
      action: () => router.push('/properties/new')
    },
    {
      icon: <PersonAddIcon />,
      name: 'Add Tenant',
      action: () => router.push('/tenants/new')
    },
    {
      icon: <BuildIcon />,
      name: 'Maintenance Request',
      action: () => router.push('/maintenance/new')
    },
    {
      icon: <ReceiptIcon />,
      name: 'Record Payment',
      action: () => router.push('/payments/new')
    },
  ];

  return (
    <SpeedDial
      ariaLabel="Property Management Actions"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
}
