-- DropForeignKey
ALTER TABLE `UserClass` DROP FOREIGN KEY `UserClass_classId_fkey`;

-- DropForeignKey
ALTER TABLE `UserClass` DROP FOREIGN KEY `UserClass_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserClass` ADD CONSTRAINT `UserClass_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClass` ADD CONSTRAINT `UserClass_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
