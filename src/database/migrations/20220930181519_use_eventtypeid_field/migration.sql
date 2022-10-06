/*
  Warnings:

  - You are about to drop the column `eventsId` on the `EventType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventType" DROP CONSTRAINT "EventType_eventsId_fkey";

-- AlterTable
ALTER TABLE "EventType" DROP COLUMN "eventsId";

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "eventTypeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES "EventType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
