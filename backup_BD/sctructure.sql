-- MySQL Workbench Synchronization
-- Generated: 2024-09-13 20:39
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Patricia Bustos

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `coffeecode` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `coffeecode`.`carrito` (
  `id_carrito` INT(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(11) NULL DEFAULT NULL,
  `id_estado` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `total` DECIMAL(10,2) NULL DEFAULT NULL,
  `id_medio_pago` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_carrito`),
  INDEX `fk_carrito_usuarios1_idx` USING BTREE (`id_usuario`) VISIBLE,
  INDEX `fk_carrito_estado1_idx` USING BTREE (`id_estado`) VISIBLE,
  INDEX `fk_carrito_medio_pagos1_idx` USING BTREE (`id_medio_pago`) VISIBLE,
  CONSTRAINT `fk_carrito_estado1`
    FOREIGN KEY (`id_estado`)
    REFERENCES `coffeecode`.`estado` (`id_estado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_medio_pagos1`
    FOREIGN KEY (`id_medio_pago`)
    REFERENCES `coffeecode`.`medio_pagos` (`id_medio_pago`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `coffeecode`.`usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`departamentos` (
  `id_departamento` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_dpto` VARCHAR(45) NULL DEFAULT NULL,
  `id_provincia` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_departamento`),
  INDEX `fk_departamentos_provincias1_idx` USING BTREE (`id_provincia`) VISIBLE,
  CONSTRAINT `fk_departamentos_provincias1`
    FOREIGN KEY (`id_provincia`)
    REFERENCES `coffeecode`.`provincias` (`id_provincia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`estado` (
  `id_estado` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_estado` VARCHAR(45) NULL DEFAULT NULL,
  `descripcion` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_estado`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`facturas` (
  `id_factura` INT(11) NOT NULL AUTO_INCREMENT,
  `id_carrito` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `titular_tarjeta` VARCHAR(45) NULL DEFAULT NULL,
  `dni_titular` INT(11) NULL DEFAULT NULL,
  `numero_tarjeta` INT(11) NULL DEFAULT NULL,
  `vencimiento_tarjeta` DATE NULL DEFAULT NULL,
  `codigo_tarjeta` VARCHAR(45) NULL DEFAULT NULL,
  `codigo_rapipago` VARCHAR(255) NULL DEFAULT NULL,
  `codigo_pago_facil` VARCHAR(255) NULL DEFAULT NULL,
  `cbu` VARCHAR(255) NULL DEFAULT NULL,
  `cvu` VARCHAR(255) NULL DEFAULT NULL,
  `alias` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_factura`),
  INDEX `fk_facturas_carrito1_idx` USING BTREE (`id_carrito`) VISIBLE,
  CONSTRAINT `fk_facturas_carrito1`
    FOREIGN KEY (`id_carrito`)
    REFERENCES `coffeecode`.`carrito` (`id_carrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`localidades` (
  `id_localidad` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_loc` VARCHAR(45) NULL DEFAULT NULL,
  `codigo_postal` VARCHAR(45) NULL DEFAULT NULL,
  `id_departamento` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_localidad`),
  INDEX `fk_localidades_departamentos1_idx` USING BTREE (`id_departamento`) VISIBLE,
  CONSTRAINT `fk_localidades_departamentos1`
    FOREIGN KEY (`id_departamento`)
    REFERENCES `coffeecode`.`departamentos` (`id_departamento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`medio_pagos` (
  `id_medio_pago` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_pago` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_medio_pago`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`paises` (
  `id_pais` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_pais` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_pais`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`productores` (
  `id_productor` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_productor` VARCHAR(45) NULL DEFAULT NULL,
  `id_usuario` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_productor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`productos` (
  `id_producto` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_producto` VARCHAR(45) NULL DEFAULT NULL,
  `descripcion_corta` VARCHAR(100) NULL DEFAULT NULL,
  `descripcion_larga` VARCHAR(255) NULL DEFAULT NULL,
  `precio` DECIMAL(10,2) NULL DEFAULT NULL,
  `cantidad` INT(11) NULL DEFAULT NULL,
  `id_tipo_cafe` INT(11) NULL DEFAULT NULL,
  `id_imagen` INT(11) NULL DEFAULT NULL,
  `idunidad_medida` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `id_pais` INT(11) NULL DEFAULT NULL,
  `idproductor` INT(11) NULL DEFAULT NULL,
  `region` VARCHAR(45) NULL DEFAULT NULL,
  `procesamiento_natural` VARCHAR(45) NULL DEFAULT NULL,
  `procesamiento_lavado` VARCHAR(45) NULL DEFAULT NULL,
  `imagen_principal` VARCHAR(255) NULL DEFAULT NULL,
  `imagen_secundaria` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_producto`),
  INDEX `fk_productos_paises1_idx` USING BTREE (`id_pais`) VISIBLE,
  INDEX `fk_productos_productores1_idx` USING BTREE (`idproductor`) VISIBLE,
  INDEX `fk_productos_tipos_cafe1_idx` USING BTREE (`id_tipo_cafe`) VISIBLE,
  INDEX `fk_productos_unidad_medida1_idx` USING BTREE (`idunidad_medida`) VISIBLE,
  CONSTRAINT `fk_productos_paises1`
    FOREIGN KEY (`id_pais`)
    REFERENCES `coffeecode`.`paises` (`id_pais`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_productores1`
    FOREIGN KEY (`idproductor`)
    REFERENCES `coffeecode`.`productores` (`id_productor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_tipos_cafe1`
    FOREIGN KEY (`id_tipo_cafe`)
    REFERENCES `coffeecode`.`tipos_cafe` (`id_tipo_cafe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_unidad_medida1`
    FOREIGN KEY (`idunidad_medida`)
    REFERENCES `coffeecode`.`unidad_medida` (`id_unidad_medida`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`provincias` (
  `id_provincia` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_provincia` VARCHAR(45) NULL DEFAULT NULL,
  `id_pais` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_provincia`),
  INDEX `fk_provincias_paises1_idx` USING BTREE (`id_pais`) VISIBLE,
  CONSTRAINT `fk_provincias_paises1`
    FOREIGN KEY (`id_pais`)
    REFERENCES `coffeecode`.`paises` (`id_pais`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`rel_carrito_productos` (
  `id_rel_carrito_producto` INT(11) NOT NULL AUTO_INCREMENT,
  `id_carrito` INT(11) NULL DEFAULT NULL,
  `id_producto` INT(11) NULL DEFAULT NULL,
  `cantidad` INT(11) NULL DEFAULT NULL,
  `precio` DECIMAL(10,2) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_rel_carrito_producto`),
  INDEX `fk_rel_carrito_productos_productos1_idx` USING BTREE (`id_producto`) VISIBLE,
  INDEX `fk_rel_carrito_productos_carrito1_idx` USING BTREE (`id_carrito`) VISIBLE,
  CONSTRAINT `fk_rel_carrito_productos_carrito1`
    FOREIGN KEY (`id_carrito`)
    REFERENCES `coffeecode`.`carrito` (`id_carrito`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rel_carrito_productos_productos1`
    FOREIGN KEY (`id_producto`)
    REFERENCES `coffeecode`.`productos` (`id_producto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`roles` (
  `id_rol` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`tipos_cafe` (
  `id_tipo_cafe` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_cafe` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_tipo_cafe`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`unidad_medida` (
  `id_unidad_medida` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre_medida` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_unidad_medida`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
ROW_FORMAT = DYNAMIC;

CREATE TABLE IF NOT EXISTS `coffeecode`.`usuarios` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL DEFAULT NULL,
  `apellido` VARCHAR(45) NULL DEFAULT NULL,
  `telefono` VARCHAR(45) NULL DEFAULT NULL,
  `dni` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `imagen_perfil` VARCHAR(45) NULL DEFAULT NULL,
  `barrio` VARCHAR(65) NULL DEFAULT NULL,
  `calle` VARCHAR(75) NULL DEFAULT NULL,
  `numero` INT(11) NULL DEFAULT NULL,
  `piso` VARCHAR(45) NULL DEFAULT NULL,
  `departamento` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `id_localidad` INT(11) NULL DEFAULT NULL,
  `id_estado` INT(11) NULL DEFAULT NULL,
  `id_rol` INT(11) NULL DEFAULT NULL,
  `cuil_t` VARCHAR(45) NULL DEFAULT NULL,
  `clave` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY USING BTREE (`id_usuario`),
  INDEX `fk_usuarios_roles_idx` USING BTREE (`id_rol`) VISIBLE,
  INDEX `fk_usuarios_localidades1_idx` USING BTREE (`id_localidad`) VISIBLE,
  CONSTRAINT `fk_usuarios_localidades1`
    FOREIGN KEY (`id_localidad`)
    REFERENCES `coffeecode`.`localidades` (`id_localidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_roles`
    FOREIGN KEY (`id_rol`)
    REFERENCES `coffeecode`.`roles` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '					'
ROW_FORMAT = DYNAMIC;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
