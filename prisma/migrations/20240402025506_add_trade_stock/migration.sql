-- CreateTable
CREATE TABLE `TradeStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `action` ENUM('BUY', 'SELL', 'SPLIT') NOT NULL DEFAULT 'BUY',
    `ticker` VARCHAR(255) NOT NULL,
    `shares` INTEGER NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
