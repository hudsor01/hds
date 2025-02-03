import {Prisma} from '@prisma/client';

declare global {
  namespace PrismaJson {
    type PropertyJson = {
      id: string;
      name: string;
      address: string;
      // Add other property fields as needed
    };

    type TenancyJson = {
      id: string;
      unitId: string;
      // Add other tenancy fields as needed
    };
  }
}

export {};
