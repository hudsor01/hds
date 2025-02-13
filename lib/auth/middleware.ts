'use server'

export async function withTeam(callback: (formData: FormData, team: unknown) => Promise<unknown>) {
  return async (formData: FormData) => {
    const team = { id: 'dummy-team' }
    return await callback(formData, team)
  }
}
