/*
  Warnings:

  - The values [Daily,Weekly,Monthly] on the enum `habits_frequency` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `habits` MODIFY `frequency` ENUM('daily', 'weekly', 'monthly', 'quarterly') NOT NULL;
