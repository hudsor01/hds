import '@clerk/nextjs/server';

declare module '@clerk/nextjs/server' {
  export interface User {
    privateMetadata: {
      role?: UserRole;
      permissions?: string[];
    };
  }
}

export type UserRole =
  | 'ADMIN'
  | 'PROPERTY_OWNER'
  | 'PROPERTY_MANAGER'
  | 'LANDLORD'
  | 'TENANT'
  | 'USER';
