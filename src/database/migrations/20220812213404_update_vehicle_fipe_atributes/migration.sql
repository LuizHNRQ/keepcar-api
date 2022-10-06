/*
  Warnings:

  - You are about to drop the column `AnoModelo` on the `VehicleFipe` table. All the data in the column will be lost.
  - You are about to drop the column `CodigoFipe` on the `VehicleFipe` table. All the data in the column will be lost.
  - You are about to drop the column `Combustivel` on the `VehicleFipe` table. All the data in the column will be lost.
  - You are about to drop the column `Marca` on the `VehicleFipe` table. All the data in the column will be lost.
  - You are about to drop the column `MesReferencia` on the `VehicleFipe` table. All the data in the column will be lost.
  - You are about to drop the column `Modelo` on the `VehicleFipe` table. All the data in the column will be lost.
  - You are about to drop the column `SiglaCombustivel` on the `VehicleFipe` table. All the data in the column will be lost.
  - You are about to drop the column `TipoVeiculo` on the `VehicleFipe` table. All the data in the column will be lost.
  - You are about to drop the column `Valor` on the `VehicleFipe` table. All the data in the column will be lost.
  - Added the required column `brand` to the `VehicleFipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fipeCode` to the `VehicleFipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuel` to the `VehicleFipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `VehicleFipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthReference` to the `VehicleFipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `VehicleFipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleType` to the `VehicleFipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearModel` to the `VehicleFipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VehicleFipe" DROP COLUMN "AnoModelo",
DROP COLUMN "CodigoFipe",
DROP COLUMN "Combustivel",
DROP COLUMN "Marca",
DROP COLUMN "MesReferencia",
DROP COLUMN "Modelo",
DROP COLUMN "SiglaCombustivel",
DROP COLUMN "TipoVeiculo",
DROP COLUMN "Valor",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "fipeCode" TEXT NOT NULL,
ADD COLUMN     "fuel" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "monthReference" TEXT NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL,
ADD COLUMN     "vehicleType" INTEGER NOT NULL,
ADD COLUMN     "yearModel" INTEGER NOT NULL;
