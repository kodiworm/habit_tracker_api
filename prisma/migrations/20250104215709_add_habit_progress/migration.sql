/*
  Warnings:

  - You are about to alter the column `frequency` on the `Habit` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(0))`.

*/
-- DropForeignKey
ALTER TABLE `Habit` DROP FOREIGN KEY `Habit_userId_fkey`;

-- DropIndex
DROP INDEX `Habit_userId_fkey` ON `Habit`;

-- AlterTable
ALTER TABLE `Habit` ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `frequency` ENUM('Daily', 'Weekly', 'Monthly') NOT NULL;

-- CreateTable
CREATE TABLE `HabitProgress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `notes` VARCHAR(191) NULL,
    `habitId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Habit` ADD CONSTRAINT `Habit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HabitProgress` ADD CONSTRAINT `HabitProgress_habitId_fkey` FOREIGN KEY (`habitId`) REFERENCES `Habit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
