/*
  Warnings:

  - You are about to drop the `Pictures` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pictures` to the `Events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pictures" DROP CONSTRAINT "Pictures_eventsId_fkey";

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "pictures" JSONB NOT NULL;

-- DropTable
DROP TABLE "Pictures";
