/*
  Warnings:

  - Changed the type of `km` on the `vehicles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `initialKm` on the `vehicles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Events" ALTER COLUMN "km" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "km",
ADD COLUMN     "km" DECIMAL(65,30) NOT NULL,
DROP COLUMN "initialKm",
ADD COLUMN     "initialKm" DECIMAL(65,30) NOT NULL;
