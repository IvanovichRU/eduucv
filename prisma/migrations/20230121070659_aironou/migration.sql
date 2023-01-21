-- DropForeignKey
ALTER TABLE `Curso` DROP FOREIGN KEY `Curso_idDocente_fkey`;

-- DropForeignKey
ALTER TABLE `Curso` DROP FOREIGN KEY `Curso_idMateria_fkey`;

-- AlterTable
ALTER TABLE `Curso` MODIFY `idMateria` INTEGER NULL,
    MODIFY `idDocente` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_idMateria_fkey` FOREIGN KEY (`idMateria`) REFERENCES `Materia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_idDocente_fkey` FOREIGN KEY (`idDocente`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
