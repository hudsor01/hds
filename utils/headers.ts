import { headers } from 'next/headers'

export async function getHeaders() {
    const headersList = await headers()
    return {
        get: (name: string) => headersList.get(name),
        has: (name: string) => headersList.has(name),
        entries: () => {
            const entries: [string, string][] = []
            headersList.forEach((value, key) => {
                entries.push([key, value])
            })
            return entries
        }
    }
}
