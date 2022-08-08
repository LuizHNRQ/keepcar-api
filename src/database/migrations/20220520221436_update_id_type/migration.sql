/*
  Warnings:

  - The primary key for the `vehicles` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id");
