export async function getRecentActivity() {
  // Placeholder implementation
  return [
    {
      id: '1',
      type: 'payment',
      title: 'Rent Payment Received',
      description: 'Payment received for Unit 101',
      timestamp: new Date(),
      amount: 1500
    },
    {
      id: '2',
      type: 'maintenance',
      title: 'Maintenance Request',
      description: 'New maintenance request for Unit 203',
      timestamp: new Date(),
      status: 'pending'
    }
    // Add more mock data as needed
  ]
}
