import { Prisma, PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
  errorFormat: 'pretty' as const,
};

export const prisma =
  globalThis.prisma || new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Utility function to handle Prisma errors
export const handlePrismaError = (error: unknown) => {
  console.error('Database Error:', error);
  if (error instanceof Error) {
    return {
      error: error.message,
      code: error.name === 'PrismaClientKnownRequestError' ? 400 : 500,
    };
  }
  return { error: 'An unexpected error occurred', code: 500 };
};

// Utility function to safely execute Prisma operations
export async function prismaExecute<T>(operation: () => Promise<T>) {
  try {
    return await operation();
  } catch (error) {
    const { error: message, code } = handlePrismaError(error);
    throw { message, code };
  }
}

// Transaction helper
export const transaction = prisma.$transaction.bind(prisma);

// Disconnect helper for cleanup
export const disconnect = async () => {
  await prisma.$disconnect();
};

// Connect helper for initialization
export const connect = async () => {
  await prisma.$connect();
};
