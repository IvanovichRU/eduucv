-- CreateTable
CREATE TABLE `Alumno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `primerApellido` VARCHAR(255) NOT NULL,
    `segundoApellido` VARCHAR(255) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `idCurso` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `idMateria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alumno` ADD CONSTRAINT `Alumno_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_idMateria_fkey` FOREIGN KEY (`idMateria`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
