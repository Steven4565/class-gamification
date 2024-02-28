-- DropForeignKey
ALTER TABLE `UserActivities` DROP FOREIGN KEY `UserActivities_actionTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `UserActivities` DROP FOREIGN KEY `UserActivities_classId_fkey`;

-- DropForeignKey
ALTER TABLE `UserActivities` DROP FOREIGN KEY `UserActivities_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserActivities` ADD CONSTRAINT `UserActivities_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserActivities` ADD CONSTRAINT `UserActivities_actionTypeId_fkey` FOREIGN KEY (`actionTypeId`) REFERENCES `ActivityType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserActivities` ADD CONSTRAINT `UserActivities_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
