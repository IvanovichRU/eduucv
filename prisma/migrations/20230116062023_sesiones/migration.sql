-- CreateTable
CREATE TABLE `Sesion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(32) NOT NULL,
    `idUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sesion` ADD CONSTRAINT `Sesion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
