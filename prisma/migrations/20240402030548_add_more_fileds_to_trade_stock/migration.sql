/*
  Warnings:

  - Added the required column `updatedAt` to the `TradeStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TradeStock` ADD COLUMN `amount` DOUBLE NULL,
    ADD COLUMN `broker` ENUM('MooMoo', 'IBKR', 'Syfe') NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fees` DOUBLE NULL,
    ADD COLUMN `trader` ENUM('Xinfei', 'Victor', 'Justin', 'Shuya') NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `date` DATETIME(3) NULL,
    MODIFY `action` ENUM('BUY', 'SELL', 'SPLIT') NULL,
    MODIFY `shares` INTEGER NULL,
    MODIFY `price` DOUBLE NULL;
