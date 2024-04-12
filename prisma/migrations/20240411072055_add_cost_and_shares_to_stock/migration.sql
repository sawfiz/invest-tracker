/*
  Warnings:

  - Added the required column `totalCost` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalShares` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Stock` ADD COLUMN `totalCost` DOUBLE NOT NULL,
    ADD COLUMN `totalShares` DOUBLE NOT NULL;
