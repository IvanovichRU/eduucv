/*
  Warnings:

  - Added the required column `idDocente` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Curso` ADD COLUMN `idDocente` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Docente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `primerApellido` VARCHAR(255) NOT NULL,
    `segundoApellido` VARCHAR(255) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_idDocente_fkey` FOREIGN KEY (`idDocente`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
