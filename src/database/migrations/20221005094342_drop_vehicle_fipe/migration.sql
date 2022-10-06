/*
  Warnings:

  - You are about to drop the column `vehicleFipeId` on the `vehicles` table. All the data in the column will be lost.
  - You are about to drop the `VehicleFipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `photo` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_vehicleFipeId_fkey";

-- DropIndex
DROP INDEX "vehicles_vehicleFipeId_key";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "vehicleFipeId",
ADD COLUMN     "makerId" TEXT,
ADD COLUMN     "modelId" TEXT,
ADD COLUMN     "photo" TEXT NOT NULL,
ALTER COLUMN "km" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "VehicleFipe";
