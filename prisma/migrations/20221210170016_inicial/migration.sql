-- CreateTable
CREATE TABLE `Alumno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `primerApellido` VARCHAR(255) NOT NULL,
    `segundoApellido` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `fechaNacimiento` DATE NOT NULL,
    `semestre` INTEGER NOT NULL DEFAULT 1,
    `idUsuario` INTEGER NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Docente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `primerApellido` VARCHAR(255) NOT NULL,
    `segundoApellido` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `fechaNacimiento` DATE NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrativo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `primerApellido` VARCHAR(255) NOT NULL,
    `segundoApellido` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `fechaNacimiento` DATE NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `fechaFinal` DATETIME(3) NOT NULL,
    `idMateria` INTEGER NOT NULL,
    `idDocente` INTEGER NOT NULL,
    `idHorario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlumnosEnCursos` (
    `idAlumno` INTEGER NOT NULL,
    `idCurso` INTEGER NOT NULL,
    `calificacion` DECIMAL(4, 2) NOT NULL,

    PRIMARY KEY (`idAlumno`, `idCurso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asignacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `valor` DECIMAL(4, 2) NOT NULL,
    `idCurso` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EntregaAsignacionAlumno` (
    `idAsignacion` INTEGER NOT NULL,
    `idAlumno` INTEGER NOT NULL,
    `fechaDeEntrega` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idAsignacion`, `idAlumno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizadoEn` DATETIME(3) NOT NULL,
    `usuario` VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `ultimoInicio` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_usuario_key`(`usuario`),
    UNIQUE INDEX `Usuario_password_key`(`password`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Alumno` ADD CONSTRAINT `Alumno_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `Docente_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administrativo` ADD CONSTRAINT `Administrativo_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_idMateria_fkey` FOREIGN KEY (`idMateria`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_idDocente_fkey` FOREIGN KEY (`idDocente`) REFERENCES `Docente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_idHorario_fkey` FOREIGN KEY (`idHorario`) REFERENCES `Horario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlumnosEnCursos` ADD CONSTRAINT `AlumnosEnCursos_idAlumno_fkey` FOREIGN KEY (`idAlumno`) REFERENCES `Alumno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AlumnosEnCursos` ADD CONSTRAINT `AlumnosEnCursos_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asignacion` ADD CONSTRAINT `Asignacion_idCurso_fkey` FOREIGN KEY (`idCurso`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntregaAsignacionAlumno` ADD CONSTRAINT `EntregaAsignacionAlumno_idAsignacion_fkey` FOREIGN KEY (`idAsignacion`) REFERENCES `Asignacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EntregaAsignacionAlumno` ADD CONSTRAINT `EntregaAsignacionAlumno_idAlumno_fkey` FOREIGN KEY (`idAlumno`) REFERENCES `Alumno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
