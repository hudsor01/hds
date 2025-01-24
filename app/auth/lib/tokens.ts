import { prisma } from "@/auth/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function generateVerificationToken(email: string): Promise<{ token: string; expires: Date }> {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

  const existingToken = await prisma.verificationToken.findFirst({
    where: { email }
  })

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}

export async function generatePasswordResetToken(email: string): Promise<{ token: string; expires: Date }> {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour

  const existingToken = await prisma.passwordResetToken.findFirst({
    where: { email }
  })

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id }
    })
  }

  const resetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return resetToken
}
