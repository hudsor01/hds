'use server';

import { useOrganizationList, useUser } from '@clerk/nextjs';

export async function createOrganization(name: string) {
  const { user } = useUser();

  return useOrganizationList();
}
