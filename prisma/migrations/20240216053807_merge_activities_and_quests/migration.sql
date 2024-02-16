/*
  Warnings:

  - You are about to drop the `QuestType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserQuests` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `ActivityType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxQuota` to the `ActivityType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetTime` to the `ActivityType` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `QuestType` DROP FOREIGN KEY `QuestType_titleId_fkey`;

-- DropForeignKey
ALTER TABLE `UserQuests` DROP FOREIGN KEY `UserQuests_questId_fkey`;

-- DropForeignKey
ALTER TABLE `UserQuests` DROP FOREIGN KEY `UserQuests_userId_fkey`;

-- AlterTable
ALTER TABLE `ActivityType` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `maxQuota` INTEGER NOT NULL,
    ADD COLUMN `resetTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `titleId` INTEGER NULL;

-- DropTable
DROP TABLE `QuestType`;

-- DropTable
DROP TABLE `UserQuests`;

-- CreateTable
CREATE TABLE `Class` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserClass` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `classId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActivityType` ADD CONSTRAINT `ActivityType_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `Title`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClass` ADD CONSTRAINT `UserClass_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClass` ADD CONSTRAINT `UserClass_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
