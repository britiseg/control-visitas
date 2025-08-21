/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ct_companies_email_key` ON `ct_companies`;

-- DropIndex
DROP INDEX `ct_companies_phone_key` ON `ct_companies`;

-- AlterTable
ALTER TABLE `users` MODIFY `email` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `users`(`email`);
