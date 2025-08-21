-- AlterTable
ALTER TABLE `ct_companies` MODIFY `email` VARCHAR(255) NULL;

-- RenameIndex
ALTER TABLE `ct_companies` RENAME INDEX `email` TO `ct_companies_email_key`;

-- RenameIndex
ALTER TABLE `ct_companies` RENAME INDEX `phone` TO `ct_companies_phone_key`;
