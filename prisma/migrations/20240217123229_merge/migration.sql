/*
  Warnings:

  - Added the required column `classId` to the `UserActivities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserActivities` ADD COLUMN `classId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserActivities` ADD CONSTRAINT `UserActivities_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
