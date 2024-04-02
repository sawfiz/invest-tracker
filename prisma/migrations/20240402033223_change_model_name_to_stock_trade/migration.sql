/*
  Warnings:

  - You are about to drop the `TradeStock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `TradeStock`;

-- CreateTable
CREATE TABLE `StockTrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NULL,
    `broker` ENUM('MooMoo', 'IBKR', 'Syfe') NULL,
    `trader` ENUM('Xinfei', 'Victor', 'Justin', 'Shuya') NULL,
    `action` ENUM('BUY', 'SELL', 'SPLIT') NULL,
    `ticker` VARCHAR(255) NOT NULL,
    `shares` INTEGER NULL,
    `price` DOUBLE NULL,
    `fees` DOUBLE NULL,
    `amount` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
