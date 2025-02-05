'use server';

export async function withTeam(callback: (formData: FormData, team: any) => Promise<any>) {
  return async (formData: FormData) => {
    const team = {id: 'dummy-team'};
    return await callback(formData, team);
  };
}
