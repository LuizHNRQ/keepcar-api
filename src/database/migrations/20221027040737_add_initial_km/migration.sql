/*
  Warnings:

  - Added the required column `initialKm` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "price" INTEGER;

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "initialKm" TEXT NOT NULL;
