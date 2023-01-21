/*
  Warnings:

  - You are about to drop the column `tipoPersona` on the `Sesion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Sesion` DROP COLUMN `tipoPersona`;

-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `tipoPersona` INTEGER NOT NULL DEFAULT 0;
