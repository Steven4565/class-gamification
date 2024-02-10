/*
  Warnings:

  - You are about to drop the `ActionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserAction` DROP FOREIGN KEY `UserAction_actionTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `UserAction` DROP FOREIGN KEY `UserAction_userId_fkey`;

-- DropTable
DROP TABLE `ActionType`;

-- DropTable
DROP TABLE `UserAction`;

-- CreateTable
CREATE TABLE `ActivityType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `experience` INTEGER NOT NULL,

    UNIQUE INDEX `ActivityType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserActivities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `actionTypeId` INTEGER NOT NULL,
    `doneAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserActivities_userId_actionTypeId_doneAt_key`(`userId`, `actionTypeId`, `doneAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `titleId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserQuests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `questId` INTEGER NOT NULL,
    `completed` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserActivities` ADD CONSTRAINT `UserActivities_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserActivities` ADD CONSTRAINT `UserActivities_actionTypeId_fkey` FOREIGN KEY (`actionTypeId`) REFERENCES `ActivityType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestType` ADD CONSTRAINT `QuestType_titleId_fkey` FOREIGN KEY (`titleId`) REFERENCES `Title`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuests` ADD CONSTRAINT `UserQuests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserQuests` ADD CONSTRAINT `UserQuests_questId_fkey` FOREIGN KEY (`questId`) REFERENCES `QuestType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
