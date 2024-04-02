/*
  Warnings:

  - Made the column `date` on table `StockTrade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `broker` on table `StockTrade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trader` on table `StockTrade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `action` on table `StockTrade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shares` on table `StockTrade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `StockTrade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fees` on table `StockTrade` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `StockTrade` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `StockTrade` MODIFY `date` DATETIME(3) NOT NULL,
    MODIFY `broker` ENUM('MooMoo', 'IBKR', 'Syfe') NOT NULL,
    MODIFY `trader` ENUM('Xinfei', 'Victor', 'Justin', 'Shuya') NOT NULL,
    MODIFY `action` ENUM('BUY', 'SELL', 'SPLIT') NOT NULL,
    MODIFY `shares` DOUBLE NOT NULL,
    MODIFY `price` DOUBLE NOT NULL,
    MODIFY `fees` DOUBLE NOT NULL,
    MODIFY `amount` DOUBLE NOT NULL;
