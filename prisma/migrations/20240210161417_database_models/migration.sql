-- CreateTable
CREATE TABLE `ActionType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `experience` INTEGER NOT NULL,

    UNIQUE INDEX `ActionType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `actionTypeId` INTEGER NOT NULL,
    `doneAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserAction_userId_actionTypeId_doneAt_key`(`userId`, `actionTypeId`, `doneAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Title` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titleName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Title_titleName_key`(`titleName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAction` ADD CONSTRAINT `UserAction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAction` ADD CONSTRAINT `UserAction_actionTypeId_fkey` FOREIGN KEY (`actionTypeId`) REFERENCES `ActionType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
