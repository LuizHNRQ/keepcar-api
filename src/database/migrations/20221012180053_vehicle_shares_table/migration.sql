-- CreateTable
CREATE TABLE "VehicleShares" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VehicleShares_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VehicleShares" ADD CONSTRAINT "VehicleShares_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
