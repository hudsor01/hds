// components/analytics/EmailMetricsTable.tsx
export function EmailMetricsTable({ data }) {
 const columns = [
   { field: 'template', headerName: 'Template' },
   { field: 'sent', headerName: 'Sent' },
   { field: 'opened', headerName: 'Opened' },
   { field: 'clicked', headerName: 'Clicked' },
   { field: 'openRate', headerName: 'Open Rate',
     valueFormatter: (params) => `${params.value}%`
   }
 ];

 return (
   <DataGrid
     rows={data}
     columns={columns}
     autoHeight
   />
 );
}
