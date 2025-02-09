// Define the waitlistDB object with the necessary methods
const waitlistDB = {
  add: async (entry: { email: string; source?: string; referralCode?: string }) => {
    // Implement the logic to add an entry to the waitlist
    // This is a placeholder implementation
    return {
      id: '123',
      email: entry.email,
      position: 1,
      createdAt: new Date(),
    }
  },
}

export default waitlistDB
