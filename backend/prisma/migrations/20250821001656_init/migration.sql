-- CreateTable
CREATE TABLE `ct_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `slug` VARCHAR(50) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_accesses_points` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_cards` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `serial_number` VARCHAR(120) NOT NULL,
    `status_id` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_ct_cards_status_id`(`status_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_companies` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL,
    `company` VARCHAR(50) NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(50) NULL,
    `status_id` TINYINT UNSIGNED NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `company`(`company`),
    UNIQUE INDEX `phone`(`phone`),
    UNIQUE INDEX `email`(`email`),
    INDEX `idx_ct_companies_status`(`status_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_status` (
    `id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ct_type_visits` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(50) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `slug`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dt_checks` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `visit_id` INTEGER UNSIGNED NOT NULL,
    `access_id` INTEGER UNSIGNED NULL,
    `created_by` INTEGER UNSIGNED NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_dt_checks_access_id`(`access_id`),
    INDEX `idx_dt_checks_created_by`(`created_by`),
    INDEX `idx_dt_checks_visit_id`(`visit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `td_visit_photos` (
    `visit_id` INTEGER UNSIGNED NOT NULL,
    `photo_blob` MEDIUMBLOB NULL,
    `photo_mime` VARCHAR(50) NULL,
    `photo_size` INTEGER UNSIGNED NULL,
    `photo_sha256` BINARY(32) NULL,
    `created_by` INTEGER UNSIGNED NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_td_visit_photos_created_by`(`created_by`),
    INDEX `idx_td_visit_photos_sha256`(`photo_sha256`),
    PRIMARY KEY (`visit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `td_visits` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `company_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `note` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NULL,
    `phone` VARCHAR(20) NOT NULL,
    `type_id` INTEGER UNSIGNED NOT NULL,
    `visit_company` VARCHAR(100) NULL,
    `token` CHAR(36) NOT NULL,
    `token_hash` BINARY(32) NULL,
    `card_id` INTEGER UNSIGNED NULL,
    `date_input` DATETIME(0) NULL,
    `date_out` DATETIME(0) NULL,
    `created_by` INTEGER UNSIGNED NULL,
    `status_id` TINYINT UNSIGNED NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `uq_td_visits_token`(`token`),
    INDEX `idx_td_visits_card_id`(`card_id`),
    INDEX `idx_td_visits_company_id`(`company_id`),
    INDEX `idx_td_visits_created_by`(`created_by`),
    INDEX `idx_td_visits_status_id`(`status_id`),
    INDEX `idx_td_visits_token_hash`(`token_hash`),
    INDEX `idx_td_visits_type_id`(`type_id`),
    INDEX `idx_td_visits_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `remember_token` VARCHAR(100) NULL,
    `role_id` INTEGER NULL,
    `company_id` INTEGER UNSIGNED NULL,
    `department` VARCHAR(100) NULL,
    `phone` VARCHAR(20) NULL,
    `access_id` INTEGER UNSIGNED NULL,
    `created_by` TINYINT UNSIGNED NULL,
    `status_id` TINYINT UNSIGNED NULL DEFAULT 1,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,

    INDEX `idx_users_access_id`(`access_id`),
    INDEX `idx_users_company_id`(`company_id`),
    INDEX `idx_users_role_id`(`role_id`),
    INDEX `idx_users_status_id`(`status_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ct_cards` ADD CONSTRAINT `fk_ct_cards_status` FOREIGN KEY (`status_id`) REFERENCES `ct_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ct_companies` ADD CONSTRAINT `fk_ct_companies_status` FOREIGN KEY (`status_id`) REFERENCES `ct_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dt_checks` ADD CONSTRAINT `fk_dt_checks_access` FOREIGN KEY (`access_id`) REFERENCES `ct_accesses_points`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dt_checks` ADD CONSTRAINT `fk_dt_checks_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dt_checks` ADD CONSTRAINT `fk_dt_checks_visit` FOREIGN KEY (`visit_id`) REFERENCES `td_visits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `td_visit_photos` ADD CONSTRAINT `fk_td_visit_photos_user` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `td_visit_photos` ADD CONSTRAINT `fk_td_visit_photos_visit` FOREIGN KEY (`visit_id`) REFERENCES `td_visits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `td_visits` ADD CONSTRAINT `fk_td_visits_card` FOREIGN KEY (`card_id`) REFERENCES `ct_cards`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `td_visits` ADD CONSTRAINT `fk_td_visits_company` FOREIGN KEY (`company_id`) REFERENCES `ct_companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `td_visits` ADD CONSTRAINT `fk_td_visits_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `td_visits` ADD CONSTRAINT `fk_td_visits_status` FOREIGN KEY (`status_id`) REFERENCES `ct_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `td_visits` ADD CONSTRAINT `fk_td_visits_type` FOREIGN KEY (`type_id`) REFERENCES `ct_type_visits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `td_visits` ADD CONSTRAINT `fk_td_visits_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_users_access` FOREIGN KEY (`access_id`) REFERENCES `ct_accesses_points`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_users_company` FOREIGN KEY (`company_id`) REFERENCES `ct_companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `ct_roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `fk_users_status` FOREIGN KEY (`status_id`) REFERENCES `ct_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
