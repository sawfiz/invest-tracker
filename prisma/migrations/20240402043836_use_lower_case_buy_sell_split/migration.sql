/*
  Warnings:

  - The values [BUY,SELL,SPLIT] on the enum `StockTrade_action` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `StockTrade` MODIFY `action` ENUM('Buy', 'Sell', 'Split') NOT NULL;
