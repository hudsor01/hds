/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Session_sessionToken_idx";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "createdAt",
DROP COLUMN "location",
DROP COLUMN "updatedAt",
ALTER COLUMN "browser" DROP NOT NULL,
ALTER COLUMN "browser" DROP DEFAULT,
ALTER COLUMN "device" DROP NOT NULL,
ALTER COLUMN "device" DROP DEFAULT,
ALTER COLUMN "ipAddress" DROP NOT NULL,
ALTER COLUMN "ipAddress" DROP DEFAULT,
ALTER COLUMN "operatingSystem" DROP NOT NULL,
ALTER COLUMN "operatingSystem" DROP DEFAULT;
