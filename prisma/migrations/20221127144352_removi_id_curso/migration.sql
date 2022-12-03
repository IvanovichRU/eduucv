/*
  Warnings:

  - You are about to drop the column `idCurso` on the `Alumno` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Alumno_idCurso_fkey` ON `Alumno`;

-- AlterTable
ALTER TABLE `Alumno` DROP COLUMN `idCurso`;
