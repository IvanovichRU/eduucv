-- DropForeignKey
ALTER TABLE `Curso` DROP FOREIGN KEY `Curso_idHorario_fkey`;

-- AlterTable
ALTER TABLE `Curso` MODIFY `idHorario` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_idHorario_fkey` FOREIGN KEY (`idHorario`) REFERENCES `Horario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
