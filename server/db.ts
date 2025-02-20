type User = { id: string; name: string }
// Imaginary database
const users: User[] = []
export const db = {
    user: {
        findMany: async () => {
            await Promise.resolve()
            return users
        },
        findById: async (id: string) => {
            await Promise.resolve()
            return users.find(user => user.id === id)
        },
        create: (data: { name: string }) => {
            const user = { id: String(users.length + 1), ...data }
            users.push(user)
            return user
        }
    }
}
