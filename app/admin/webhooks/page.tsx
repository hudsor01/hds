export default async function WebhookLogsPage() {
  const {rows} = await sql`
   SELECT * FROM webhook_logs
   ORDER BY created_at DESC
   LIMIT 100
 `;

  return (
    <DataGrid
      rows={rows}
      columns={[
        {field: 'event_type', headerName: 'Event', width: 200},
        {
          field: 'created_at',
          headerName: 'Time',
          width: 200,
          valueFormatter: params => new Date(params.value).toLocaleString(),
        },
        {
          field: 'success',
          headerName: 'Success',
          width: 100,
          renderCell: params => (
            <Chip
              label={params.value ? 'Success' : 'Failed'}
              color={params.value ? 'success' : 'error'}
            />
          ),
        },
        {
          field: 'payload',
          headerName: 'Data',
          width: 300,
          renderCell: params => (
            <Button
              onClick={() => {
                // Show payload in modal
                setSelectedPayload(JSON.parse(params.value));
                setModalOpen(true);
              }}
            >
              View Payload
            </Button>
          ),
        },
      ]}
    />
  );
}
