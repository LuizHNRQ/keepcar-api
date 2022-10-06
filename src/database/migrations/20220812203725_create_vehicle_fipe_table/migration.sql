/*
  Warnings:

  - A unique constraint covering the columns `[vehicleFipeId]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vehicleFipeId` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "vehicleFipeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "VehicleFipe" (
    "id" SERIAL NOT NULL,
    "Valor" INTEGER NOT NULL,
    "Marca" TEXT NOT NULL,
    "Modelo" TEXT NOT NULL,
    "AnoModelo" INTEGER NOT NULL,
    "Combustivel" TEXT NOT NULL,
    "CodigoFipe" TEXT NOT NULL,
    "MesReferencia" TEXT NOT NULL,
    "TipoVeiculo" INTEGER NOT NULL,
    "SiglaCombustivel" TEXT NOT NULL,

    CONSTRAINT "VehicleFipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_vehicleFipeId_key" ON "vehicles"("vehicleFipeId");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicleFipeId_fkey" FOREIGN KEY ("vehicleFipeId") REFERENCES "VehicleFipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
