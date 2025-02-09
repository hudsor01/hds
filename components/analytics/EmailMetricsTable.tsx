import { type EmailMetricsProps } from '@/types/analytics'
import { DataGrid } from '@mui/x-data-grid'

export function EmailMetricsTable({ data }: EmailMetricsProps) {
  const columns = [
    { field: 'template', headerName: 'Template' },
    { field: 'sent', headerName: 'Sent' },
    { field: 'opened', headerName: 'Opened' },
    { field: 'clicked', headerName: 'Clicked' },
    {
      field: 'openRate',
      headerName: 'Open Rate',
      valueFormatter: (params: any) => `${params.value}%`,
    },
  ]

  return <DataGrid rows={data} columns={columns} autoHeight />
}
