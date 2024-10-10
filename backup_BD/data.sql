/*
 Navicat Premium Data Transfer

 Source Server         : mipc
 Source Server Type    : MySQL
 Source Server Version : 100432
 Source Host           : localhost:3306
 Source Schema         : coffeecode

 Target Server Type    : MySQL
 Target Server Version : 100432
 File Encoding         : 65001

 Date: 09/10/2024 23:37:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for carrito
-- ----------------------------
DROP TABLE IF EXISTS `carrito`;
CREATE TABLE `carrito`  (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NULL DEFAULT NULL,
  `id_estado` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `total` decimal(10, 2) NULL DEFAULT NULL,
  `id_medio_pago` int NULL DEFAULT NULL,
  `id_forma_envio` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_carrito`) USING BTREE,
  INDEX `fk_carrito_usuarios1_idx`(`id_usuario`) USING BTREE,
  INDEX `fk_carrito_estado1_idx`(`id_estado`) USING BTREE,
  INDEX `fk_carrito_medio_pagos1_idx`(`id_medio_pago`) USING BTREE,
  INDEX `fk_carrito_formas_envios1_idx`(`id_forma_envio`) USING BTREE,
  CONSTRAINT `fk_carrito_estado1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_formas_envios1` FOREIGN KEY (`id_forma_envio`) REFERENCES `formas_envios` (`id_forma_envio`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_medio_pagos1` FOREIGN KEY (`id_medio_pago`) REFERENCES `medio_pagos` (`id_medio_pago`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_usuarios1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of carrito
-- ----------------------------
INSERT INTO `carrito` VALUES (1, 2, 4, '2024-09-14 00:14:06', '2024-09-14 00:14:11', 59000.00, 1, NULL);

-- ----------------------------
-- Table structure for departamentos
-- ----------------------------
DROP TABLE IF EXISTS `departamentos`;
CREATE TABLE `departamentos`  (
  `id_departamento` int NOT NULL AUTO_INCREMENT,
  `nombre_dpto` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_provincia` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_departamento`) USING BTREE,
  INDEX `fk_departamentos_provincias1_idx`(`id_provincia`) USING BTREE,
  CONSTRAINT `fk_departamentos_provincias1` FOREIGN KEY (`id_provincia`) REFERENCES `provincias` (`id_provincia`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of departamentos
-- ----------------------------
INSERT INTO `departamentos` VALUES (1, 'CAPITAL', 11);
INSERT INTO `departamentos` VALUES (2, 'ARAUCO', 11);
INSERT INTO `departamentos` VALUES (3, 'SANAGASTA', 11);
INSERT INTO `departamentos` VALUES (4, 'CHAMICAL', 11);
INSERT INTO `departamentos` VALUES (5, 'FAMATINA', 11);
INSERT INTO `departamentos` VALUES (6, 'CHILECITO', 11);
INSERT INTO `departamentos` VALUES (7, 'CASTRO BARROS', 11);
INSERT INTO `departamentos` VALUES (8, 'SAN MARTIN', 11);
INSERT INTO `departamentos` VALUES (9, 'GRAL. OCAMPO', 11);
INSERT INTO `departamentos` VALUES (10, 'INDEPENDENCIA', 11);
INSERT INTO `departamentos` VALUES (11, 'GRAL. BELGRANO', 11);
INSERT INTO `departamentos` VALUES (12, 'FELIPE VARELA', 11);
INSERT INTO `departamentos` VALUES (13, 'GRAL. LAMADRID', 11);
INSERT INTO `departamentos` VALUES (14, 'S. B. DE LOS SAUCES', 11);
INSERT INTO `departamentos` VALUES (15, 'GRAL J.F.QUIROGA', 11);
INSERT INTO `departamentos` VALUES (16, 'VINCHINA', 11);
INSERT INTO `departamentos` VALUES (17, 'GRAL ANGEL V. PEÑALOZA', 11);
INSERT INTO `departamentos` VALUES (18, 'ROSARIO V. PEÑALOZA', 11);

-- ----------------------------
-- Table structure for estado
-- ----------------------------
DROP TABLE IF EXISTS `estado`;
CREATE TABLE `estado`  (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_estado`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of estado
-- ----------------------------
INSERT INTO `estado` VALUES (1, 'ACTIVO', 'USUARIO ACTIVO', '2024-09-13 22:43:45', '2024-09-13 22:44:24');
INSERT INTO `estado` VALUES (2, 'INACTIVO', 'USUARIO INACTIVO', '2024-09-13 22:43:54', '2024-09-13 22:44:27');
INSERT INTO `estado` VALUES (3, 'SUSPENDIDO', 'USUARIO', '2024-09-13 22:43:59', '2024-09-13 22:44:31');
INSERT INTO `estado` VALUES (4, 'ABIERTO', 'CARRITO', '2024-09-13 22:44:03', '2024-09-13 22:44:35');
INSERT INTO `estado` VALUES (5, 'EN PROCESO', 'CARRITO', '2024-09-13 22:44:07', '2024-09-13 22:44:39');
INSERT INTO `estado` VALUES (6, 'FINALIZADO', 'CARRITO', '2024-09-13 22:44:11', '2024-09-13 22:44:43');
INSERT INTO `estado` VALUES (7, 'FACTURADO', 'CARRITO', '2024-09-13 22:44:15', '2024-09-13 22:44:47');
INSERT INTO `estado` VALUES (8, 'ENVIADO', 'CARRITO', '2024-09-13 22:44:19', '2024-09-13 22:44:50');

-- ----------------------------
-- Table structure for facturas
-- ----------------------------
DROP TABLE IF EXISTS `facturas`;
CREATE TABLE `facturas`  (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `id_carrito` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `titular_tarjeta` varchar(65) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dni_titular` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `numero_tarjeta` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `vencimiento_tarjeta` date NULL DEFAULT NULL,
  `codigo_tarjeta` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `codigo_rapipago` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `codigo_pago_facil` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cbu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cvu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `alias` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_factura`) USING BTREE,
  INDEX `fk_facturas_carrito1_idx`(`id_carrito`) USING BTREE,
  CONSTRAINT `fk_facturas_carrito1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of facturas
-- ----------------------------
INSERT INTO `facturas` VALUES (1, 1, '2024-09-14 00:23:35', '2024-09-14 00:23:39', 'AGUIRRE JUAN', '23233233', '2147483647', '2027-08-14', '321', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for formas_envios
-- ----------------------------
DROP TABLE IF EXISTS `formas_envios`;
CREATE TABLE `formas_envios`  (
  `id_forma_envio` int NOT NULL AUTO_INCREMENT,
  `nombre_envio` varchar(65) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `monto_envio` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id_forma_envio`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of formas_envios
-- ----------------------------
INSERT INTO `formas_envios` VALUES (1, 'CORREO ARGENTINO', 6000.00);
INSERT INTO `formas_envios` VALUES (2, 'OCA', 7000.00);
INSERT INTO `formas_envios` VALUES (3, 'ANDREANI', 10000.00);
INSERT INTO `formas_envios` VALUES (4, 'RETIRO EN TIENDA', 0.00);

-- ----------------------------
-- Table structure for localidades
-- ----------------------------
DROP TABLE IF EXISTS `localidades`;
CREATE TABLE `localidades`  (
  `id_localidad` int NOT NULL AUTO_INCREMENT,
  `nombre_loc` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `codigo_postal` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_departamento` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_localidad`) USING BTREE,
  INDEX `fk_localidades_departamentos1_idx`(`id_departamento`) USING BTREE,
  CONSTRAINT `fk_localidades_departamentos1` FOREIGN KEY (`id_departamento`) REFERENCES `departamentos` (`id_departamento`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 390 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of localidades
-- ----------------------------
INSERT INTO `localidades` VALUES (1, 'ARAUCO', '5315', 2);
INSERT INTO `localidades` VALUES (2, 'AIMOGASTA', '5310', 2);
INSERT INTO `localidades` VALUES (3, 'UDPINANGO', '5387', 2);
INSERT INTO `localidades` VALUES (4, 'LA CAUCHITA', '5361', 2);
INSERT INTO `localidades` VALUES (5, 'TINOCAN', '5363', 2);
INSERT INTO `localidades` VALUES (6, 'LA CIMBRITA', '5365', 2);
INSERT INTO `localidades` VALUES (7, 'TERMAS DE SANTA TERESITA', '5311', 2);
INSERT INTO `localidades` VALUES (8, 'SAN ANTONIO', '5370', 2);
INSERT INTO `localidades` VALUES (9, 'ESTACION MAZAN', '5317', 2);
INSERT INTO `localidades` VALUES (10, 'VILLA MAZAN', '5317', 2);
INSERT INTO `localidades` VALUES (11, 'BAÑADO DE LOS PANTANOS', '5381', 2);
INSERT INTO `localidades` VALUES (12, 'MACHIGASTA', '5370', 2);
INSERT INTO `localidades` VALUES (13, 'LA CANCHITA', '5370', 2);
INSERT INTO `localidades` VALUES (14, 'BAZAN', '5381', 1);
INSERT INTO `localidades` VALUES (15, 'SALADILLO', '5365', 1);
INSERT INTO `localidades` VALUES (16, 'LAS CATAS', '5363', 1);
INSERT INTO `localidades` VALUES (17, 'ANCHICO', '5361', 1);
INSERT INTO `localidades` VALUES (18, 'SAN JOSE', '5313', 1);
INSERT INTO `localidades` VALUES (19, 'EL CANTADERO', '5361', 1);
INSERT INTO `localidades` VALUES (20, 'LA LANCHA', '5370', 1);
INSERT INTO `localidades` VALUES (21, 'SAN LORENZO', '5317', 1);
INSERT INTO `localidades` VALUES (22, 'SIERRA BRAVA', '5385', 1);
INSERT INTO `localidades` VALUES (23, 'TRAMPA DEL TIGRE', '5365', 1);
INSERT INTO `localidades` VALUES (24, 'EL ROSARIO', '5365', 1);
INSERT INTO `localidades` VALUES (25, 'ESTANCIA SAN JOSE', '5370', 1);
INSERT INTO `localidades` VALUES (26, 'AMPATA', '5311', 1);
INSERT INTO `localidades` VALUES (27, 'LA CAÑADA', '5361', 1);
INSERT INTO `localidades` VALUES (28, 'POZO DE LA YEGUA', '5363', 1);
INSERT INTO `localidades` VALUES (29, 'EL TALA', '5311', 1);
INSERT INTO `localidades` VALUES (30, 'BAJO HONDO', '5313', 1);
INSERT INTO `localidades` VALUES (31, 'PUERTO ALEGRE', '5374', 1);
INSERT INTO `localidades` VALUES (32, 'EL SUNCHAL', '5385', 1);
INSERT INTO `localidades` VALUES (33, 'EL QUEBRACHO', '5365', 1);
INSERT INTO `localidades` VALUES (34, 'SAN NICOLAS DEL RECREO', '5381', 1);
INSERT INTO `localidades` VALUES (35, 'SAN PEDRO', '5315', 1);
INSERT INTO `localidades` VALUES (36, 'SAN NICOLAS', '5387', 1);
INSERT INTO `localidades` VALUES (37, 'SANTO DOMINGO', '5374', 1);
INSERT INTO `localidades` VALUES (38, 'LA RIOJA', '5300', 1);
INSERT INTO `localidades` VALUES (39, 'LA RAMADITA', '5374', 1);
INSERT INTO `localidades` VALUES (40, 'SAN BERNARDO', '5361', 1);
INSERT INTO `localidades` VALUES (41, 'LA ANTIGUA', '5311', 1);
INSERT INTO `localidades` VALUES (42, 'COLONIA FRUTIHORTICOLA', '5374', 1);
INSERT INTO `localidades` VALUES (43, 'LA LATA', '5361', 1);
INSERT INTO `localidades` VALUES (44, 'TALAMUYUNA', '5381', 1);
INSERT INTO `localidades` VALUES (45, 'SAN RAFAEL', '5315', 1);
INSERT INTO `localidades` VALUES (46, 'SAN JUAN', '5363', 1);
INSERT INTO `localidades` VALUES (47, 'CARRIZAL', '5313', 1);
INSERT INTO `localidades` VALUES (48, 'SAN ANTONIO', '5361', 1);
INSERT INTO `localidades` VALUES (49, 'SAN MIGUEL', '5387', 1);
INSERT INTO `localidades` VALUES (50, 'CEBOLLAR', '5313', 1);
INSERT INTO `localidades` VALUES (51, 'LAS HIGUERILLAS', '5385', 1);
INSERT INTO `localidades` VALUES (52, 'EL DURAZNILLO', '5374', 1);
INSERT INTO `localidades` VALUES (53, 'EL BARREAL', '5365', 1);
INSERT INTO `localidades` VALUES (54, 'SANTA VERA CRUZ', '5370', 7);
INSERT INTO `localidades` VALUES (55, 'PINCHAS', '5381', 7);
INSERT INTO `localidades` VALUES (56, 'ISMIANGO', '5381', 7);
INSERT INTO `localidades` VALUES (57, 'ANJULLON', '5387', 7);
INSERT INTO `localidades` VALUES (58, 'AGUA BLANCA', '5370', 7);
INSERT INTO `localidades` VALUES (59, 'LOS MOLINOS', '5313', 7);
INSERT INTO `localidades` VALUES (60, 'SANTA CRUZ', '5381', 7);
INSERT INTO `localidades` VALUES (61, 'AMINGA', '5385', 7);
INSERT INTO `localidades` VALUES (62, 'CHUQUIS', '5363', 7);
INSERT INTO `localidades` VALUES (63, 'SAN PEDRO', '5361', 7);
INSERT INTO `localidades` VALUES (64, 'ANILLACO', '5313', 7);
INSERT INTO `localidades` VALUES (65, 'LAS FLORES', '5387', 4);
INSERT INTO `localidades` VALUES (66, 'POLCO', '5370', 4);
INSERT INTO `localidades` VALUES (67, 'EL GARABATO', '5311', 4);
INSERT INTO `localidades` VALUES (68, 'SANTA RITA DE LA ZANJA', '5301', 4);
INSERT INTO `localidades` VALUES (69, 'VILLA CARMELA', '5301', 4);
INSERT INTO `localidades` VALUES (70, 'SANTA LUCIA', '5367', 4);
INSERT INTO `localidades` VALUES (71, 'BASE CHAMICAL', '5367', 4);
INSERT INTO `localidades` VALUES (72, 'ESQUINA DEL NORTE', '5360', 4);
INSERT INTO `localidades` VALUES (73, 'CHAMICAL', '5367', 4);
INSERT INTO `localidades` VALUES (74, 'LA RESISTENCIA', '5367', 4);
INSERT INTO `localidades` VALUES (75, 'EL RETAMO', '5367', 4);
INSERT INTO `localidades` VALUES (76, 'POZO REDONDO', '5367', 4);
INSERT INTO `localidades` VALUES (77, 'POZO DE LA VACA', '5367', 4);
INSERT INTO `localidades` VALUES (78, 'LA AGUADITA', '5367', 4);
INSERT INTO `localidades` VALUES (79, 'ROSILLO MUERTO', '5367', 4);
INSERT INTO `localidades` VALUES (80, 'CHULO', '5367', 4);
INSERT INTO `localidades` VALUES (81, 'EL QUEBRACHAL', '5367', 4);
INSERT INTO `localidades` VALUES (82, 'EL CARMEN', '5367', 4);
INSERT INTO `localidades` VALUES (83, 'BELLA VISTA', '5367', 4);
INSERT INTO `localidades` VALUES (84, 'LAS TALAS', '5367', 4);
INSERT INTO `localidades` VALUES (85, 'LOS BALDES', '5367', 4);
INSERT INTO `localidades` VALUES (86, 'LOS BORDOS', '5367', 4);
INSERT INTO `localidades` VALUES (87, 'EL MOLLAR', '5367', 4);
INSERT INTO `localidades` VALUES (88, 'LAS AMOLADERAS', '5367', 4);
INSERT INTO `localidades` VALUES (89, 'BAJO DE LUCAS', '5367', 4);
INSERT INTO `localidades` VALUES (90, 'SANTA BARBARA', '5367', 4);
INSERT INTO `localidades` VALUES (91, 'LA CORTADA', '5367', 4);
INSERT INTO `localidades` VALUES (92, 'LA SERENA', '5367', 4);
INSERT INTO `localidades` VALUES (93, 'SAN RAFAEL', '5367', 4);
INSERT INTO `localidades` VALUES (94, 'MALLIGASTA', '5367', 6);
INSERT INTO `localidades` VALUES (95, 'LAS HIGUERITAS', '5367', 6);
INSERT INTO `localidades` VALUES (96, 'SAN MIGUEL', '5367', 6);
INSERT INTO `localidades` VALUES (97, 'SANTA FLORENTINA', '5367', 6);
INSERT INTO `localidades` VALUES (98, 'GUANCHIN', '5367', 6);
INSERT INTO `localidades` VALUES (99, 'MIRANDA', '5367', 6);
INSERT INTO `localidades` VALUES (100, 'SAÑOGASTA', '5367', 6);
INSERT INTO `localidades` VALUES (101, 'COLONIA VICHIGASTA', '5367', 6);
INSERT INTO `localidades` VALUES (102, 'COLONIA MALLIGASTA', '5367', 6);
INSERT INTO `localidades` VALUES (103, 'ANGUINAN', '5367', 6);
INSERT INTO `localidades` VALUES (104, 'VICHIGASTA', '5367', 6);
INSERT INTO `localidades` VALUES (105, 'NONOGASTA', '5360', 6);
INSERT INTO `localidades` VALUES (106, 'CHILECITO', '5367', 6);
INSERT INTO `localidades` VALUES (107, 'COLONIA ANGUINAN', '5367', 6);
INSERT INTO `localidades` VALUES (108, 'TILIMUQUI', '5360', 6);
INSERT INTO `localidades` VALUES (109, 'LOS SARMIENTOS', '5367', 6);
INSERT INTO `localidades` VALUES (110, 'SAN NICOLAS', '5367', 6);
INSERT INTO `localidades` VALUES (111, 'COLONIA CATINZACO', '5367', 6);
INSERT INTO `localidades` VALUES (112, 'LA PUNTILLA', '5367', 6);
INSERT INTO `localidades` VALUES (113, 'VILLA UNION', '5367', 12);
INSERT INTO `localidades` VALUES (114, 'ANCHUMBIL', '5367', 12);
INSERT INTO `localidades` VALUES (115, 'LA MARAVILLA', '5367', 12);
INSERT INTO `localidades` VALUES (116, 'EL CARDON', '5367', 12);
INSERT INTO `localidades` VALUES (117, 'EL CHUSCHIN', '5367', 12);
INSERT INTO `localidades` VALUES (118, 'PIEDRA PINTADA', '5367', 12);
INSERT INTO `localidades` VALUES (119, 'LA BREA', '5367', 12);
INSERT INTO `localidades` VALUES (120, 'LA CIENAGA', '5367', 12);
INSERT INTO `localidades` VALUES (121, 'MINA DELINA', '5367', 12);
INSERT INTO `localidades` VALUES (122, 'SAN JOSE', '5367', 12);
INSERT INTO `localidades` VALUES (123, 'LOS TAMBILLOS', '5367', 12);
INSERT INTO `localidades` VALUES (124, 'EL MOLLE', '5367', 12);
INSERT INTO `localidades` VALUES (125, 'VILLA ESTHER', '5367', 12);
INSERT INTO `localidades` VALUES (126, 'LAS CUEVAS', '5367', 12);
INSERT INTO `localidades` VALUES (127, 'GUANDACOL', '5367', 12);
INSERT INTO `localidades` VALUES (128, 'SANTA CLARA', '5367', 12);
INSERT INTO `localidades` VALUES (129, 'LOS PATILLOS', '5367', 12);
INSERT INTO `localidades` VALUES (130, 'PASO SAN ISIDRO', '5367', 12);
INSERT INTO `localidades` VALUES (131, 'AICUÑA', '5367', 12);
INSERT INTO `localidades` VALUES (132, 'EL FUERTE', '5367', 12);
INSERT INTO `localidades` VALUES (133, 'EL ZAPALLAR', '5367', 12);
INSERT INTO `localidades` VALUES (134, 'LOS NACIMIENTOS', '5367', 12);
INSERT INTO `localidades` VALUES (135, 'LOS PALACIOS', '5367', 12);
INSERT INTO `localidades` VALUES (136, 'PUERTO ALEGRE', '5367', 12);
INSERT INTO `localidades` VALUES (137, 'PAGANCILLO', '5367', 12);
INSERT INTO `localidades` VALUES (138, 'BANDA FLORIDA', '5367', 12);
INSERT INTO `localidades` VALUES (139, 'ANGULOS', '5367', 5);
INSERT INTO `localidades` VALUES (140, 'SANTA CRUZ', '5367', 5);
INSERT INTO `localidades` VALUES (141, 'PLAZA VIEJA', '5367', 5);
INSERT INTO `localidades` VALUES (142, 'CAMPANAS', '5367', 5);
INSERT INTO `localidades` VALUES (143, 'SANTO DOMINGO', '5367', 5);
INSERT INTO `localidades` VALUES (144, 'FAMATINA', '5367', 5);
INSERT INTO `localidades` VALUES (145, 'BAJO CARRIZAL', '5367', 5);
INSERT INTO `localidades` VALUES (146, 'ALTO CARRIZAL', '5367', 5);
INSERT INTO `localidades` VALUES (147, 'EL POTRERILLO', '5367', 5);
INSERT INTO `localidades` VALUES (148, 'PITUIL', '5367', 5);
INSERT INTO `localidades` VALUES (149, 'LA CUADRA', '5367', 5);
INSERT INTO `localidades` VALUES (150, 'ANTINACO', '5367', 5);
INSERT INTO `localidades` VALUES (151, 'EL JUMEAL', '5367', 5);
INSERT INTO `localidades` VALUES (152, 'BARRIO DE GALLI', '5367', 5);
INSERT INTO `localidades` VALUES (153, 'CHAÑARMUYO', '5367', 5);
INSERT INTO `localidades` VALUES (154, 'LAS LOMITAS', '5367', 17);
INSERT INTO `localidades` VALUES (155, 'PUNTA DE LOS LLANOS', '5367', 17);
INSERT INTO `localidades` VALUES (156, 'LAS AGUADITAS', '5367', 17);
INSERT INTO `localidades` VALUES (157, 'LA REPRESITA', '5367', 17);
INSERT INTO `localidades` VALUES (158, 'AGUADITA DE LOS VALDECES', '5367', 17);
INSERT INTO `localidades` VALUES (159, 'ALCAZAR', '5367', 17);
INSERT INTO `localidades` VALUES (160, 'TAMA', '5367', 17);
INSERT INTO `localidades` VALUES (161, 'BAJO VERDE', '5367', 17);
INSERT INTO `localidades` VALUES (162, 'TASQUIN', '5367', 17);
INSERT INTO `localidades` VALUES (163, 'SAN NICOLAS', '5367', 17);
INSERT INTO `localidades` VALUES (164, 'CHILA', '5367', 17);
INSERT INTO `localidades` VALUES (165, 'COLOZOCAN', '5367', 17);
INSERT INTO `localidades` VALUES (166, 'EL MONTE', '5367', 17);
INSERT INTO `localidades` VALUES (167, 'TUIZON', '5367', 17);
INSERT INTO `localidades` VALUES (168, 'SANTA TERESA', '5367', 17);
INSERT INTO `localidades` VALUES (169, 'PACATALA', '5367', 17);
INSERT INTO `localidades` VALUES (170, 'LA HUERTA', '5367', 11);
INSERT INTO `localidades` VALUES (171, 'SANTA CRUZ', '5367', 11);
INSERT INTO `localidades` VALUES (172, 'EL VIRQUE', '5367', 11);
INSERT INTO `localidades` VALUES (173, 'CORTADERAS', '5367', 11);
INSERT INTO `localidades` VALUES (174, 'EL SIMBOLAR', '5367', 11);
INSERT INTO `localidades` VALUES (175, 'CASTRO BARROS', '5367', 11);
INSERT INTO `localidades` VALUES (176, 'EL BORDO', '5367', 11);
INSERT INTO `localidades` VALUES (177, 'BAJO HONDO', '5367', 11);
INSERT INTO `localidades` VALUES (178, 'LA AGUADA', '5367', 11);
INSERT INTO `localidades` VALUES (179, 'MONTE GRANDE', '5367', 11);
INSERT INTO `localidades` VALUES (180, 'MONTE NEGRO', '5367', 11);
INSERT INTO `localidades` VALUES (181, 'SAN ISIDRO', '5367', 11);
INSERT INTO `localidades` VALUES (182, 'EL CONSUELO', '5367', 11);
INSERT INTO `localidades` VALUES (183, 'TALA VERDE', '5367', 11);
INSERT INTO `localidades` VALUES (184, 'NEPES', '5367', 11);
INSERT INTO `localidades` VALUES (185, 'COLONIA EL CISCO', '5367', 11);
INSERT INTO `localidades` VALUES (186, 'TALVA', '5367', 11);
INSERT INTO `localidades` VALUES (187, 'LOMA BLANCA', '5367', 11);
INSERT INTO `localidades` VALUES (188, 'AGUA COLORADA', '5367', 11);
INSERT INTO `localidades` VALUES (189, 'OLTA', '5367', 11);
INSERT INTO `localidades` VALUES (190, 'ESQUINA DEL SUD', '5367', 11);
INSERT INTO `localidades` VALUES (191, 'S.DE LAS HIGUERAS', '5367', 11);
INSERT INTO `localidades` VALUES (192, 'CHAÑAR', '5367', 11);
INSERT INTO `localidades` VALUES (193, 'MIRAFLORES', '5367', 11);
INSERT INTO `localidades` VALUES (194, 'LOMA ALTA', '5367', 11);
INSERT INTO `localidades` VALUES (195, 'CORRAL DEL NEGRO', '5367', 11);
INSERT INTO `localidades` VALUES (196, 'SIERRA DE LOS QUINTEROS', '5367', 11);
INSERT INTO `localidades` VALUES (197, 'LA FLORIDA', '5367', 11);
INSERT INTO `localidades` VALUES (198, 'SAN PEDRO', '5367', 11);
INSERT INTO `localidades` VALUES (199, 'SANTA MARIA', '5367', 15);
INSERT INTO `localidades` VALUES (200, 'EL PORONGO', '5367', 15);
INSERT INTO `localidades` VALUES (201, 'NACATE', '5367', 15);
INSERT INTO `localidades` VALUES (202, 'UNQUILLAL', '5367', 15);
INSERT INTO `localidades` VALUES (203, 'LA CHIMENEA', '5367', 15);
INSERT INTO `localidades` VALUES (204, 'EL RETAMAL', '5367', 15);
INSERT INTO `localidades` VALUES (205, 'CASANGATE', '5367', 15);
INSERT INTO `localidades` VALUES (206, 'LOMA LARGA', '5367', 15);
INSERT INTO `localidades` VALUES (207, 'TOSQUEA', '5367', 15);
INSERT INTO `localidades` VALUES (208, 'PORTEZUELO', '5367', 15);
INSERT INTO `localidades` VALUES (209, 'SAN RAMON', '5367', 15);
INSERT INTO `localidades` VALUES (210, 'SOLCA', '5367', 15);
INSERT INTO `localidades` VALUES (211, 'SAN ANTONIO', '5367', 15);
INSERT INTO `localidades` VALUES (212, 'EL CHORRO', '5367', 15);
INSERT INTO `localidades` VALUES (213, 'QUEBRADA DEL VALLECITO', '5367', 15);
INSERT INTO `localidades` VALUES (214, 'LOS BARREALES', '5367', 15);
INSERT INTO `localidades` VALUES (215, 'SALANA', '5367', 15);
INSERT INTO `localidades` VALUES (216, 'LOS ALGARROBOS', '5367', 15);
INSERT INTO `localidades` VALUES (217, 'LAS BARRANCAS', '5367', 15);
INSERT INTO `localidades` VALUES (218, 'PULUCHAN', '5367', 15);
INSERT INTO `localidades` VALUES (219, 'MALANZAN', '5367', 15);
INSERT INTO `localidades` VALUES (220, 'TUANI', '5367', 15);
INSERT INTO `localidades` VALUES (221, 'SAN RAMON', '5367', 15);
INSERT INTO `localidades` VALUES (222, 'TRES CRUCES', '5367', 15);
INSERT INTO `localidades` VALUES (223, 'BALDE DE AMAYA', '5367', 15);
INSERT INTO `localidades` VALUES (224, 'SAN PEDRO', '5367', 15);
INSERT INTO `localidades` VALUES (225, 'ATILES', '5367', 15);
INSERT INTO `localidades` VALUES (226, 'SAN ROQUE', '5367', 15);
INSERT INTO `localidades` VALUES (227, 'EL POTRERO', '5367', 15);
INSERT INTO `localidades` VALUES (228, 'VILLA CASTELLI', '5367', 13);
INSERT INTO `localidades` VALUES (229, 'RIVADAVIA', '5367', 13);
INSERT INTO `localidades` VALUES (230, 'EL CONDADO', '5367', 13);
INSERT INTO `localidades` VALUES (231, 'PARECITAS', '5367', 13);
INSERT INTO `localidades` VALUES (232, 'LOS AGUIRRES', '5367', 9);
INSERT INTO `localidades` VALUES (233, 'POZO DEL MEDIO', '5367', 9);
INSERT INTO `localidades` VALUES (234, 'LA COLONIA', '5367', 9);
INSERT INTO `localidades` VALUES (235, 'MOLLACO', '5367', 9);
INSERT INTO `localidades` VALUES (236, 'MILAGRO', '5367', 9);
INSERT INTO `localidades` VALUES (237, 'EL QUEMADO', '5367', 9);
INSERT INTO `localidades` VALUES (238, 'MOLLACO', '5367', 9);
INSERT INTO `localidades` VALUES (239, 'SAN RAMON', '5367', 9);
INSERT INTO `localidades` VALUES (240, 'LAS CORTADERAS', '5367', 9);
INSERT INTO `localidades` VALUES (241, 'SAN JOSE', '5367', 9);
INSERT INTO `localidades` VALUES (242, 'SAN ROQUE', '5367', 9);
INSERT INTO `localidades` VALUES (243, 'LA MARAVILLA', '5367', 9);
INSERT INTO `localidades` VALUES (244, 'AGUADITA DE LOS PERALTA', '5367', 9);
INSERT INTO `localidades` VALUES (245, 'LA REPRESA', '5367', 9);
INSERT INTO `localidades` VALUES (246, 'OLPAS', '5367', 9);
INSERT INTO `localidades` VALUES (247, 'RIO GRANDE', '5367', 9);
INSERT INTO `localidades` VALUES (248, 'SAN CRISTOBAL', '5367', 9);
INSERT INTO `localidades` VALUES (249, 'LA BARRERA', '5367', 9);
INSERT INTO `localidades` VALUES (250, 'AGUA COLORADA', '5367', 9);
INSERT INTO `localidades` VALUES (251, 'EL CERCO', '5367', 9);
INSERT INTO `localidades` VALUES (252, 'LA BANDERITA', '5367', 9);
INSERT INTO `localidades` VALUES (253, 'LA DORADA', '5367', 9);
INSERT INTO `localidades` VALUES (254, 'SANTA RITA DE CATUNA', '5367', 9);
INSERT INTO `localidades` VALUES (255, 'LA RIPIEDRA', '5367', 9);
INSERT INTO `localidades` VALUES (256, 'LA MARUJA', '5367', 9);
INSERT INTO `localidades` VALUES (257, 'EL FRAILE', '5367', 9);
INSERT INTO `localidades` VALUES (258, 'LOS TELLOS', '5367', 9);
INSERT INTO `localidades` VALUES (259, 'AMBIL', '5367', 9);
INSERT INTO `localidades` VALUES (260, 'COLONIA ORTIZ DE OCAMPO', '5367', 9);
INSERT INTO `localidades` VALUES (261, 'EL BARRANCO', '5367', 9);
INSERT INTO `localidades` VALUES (262, 'LOS BARRIALITOS', '5367', 9);
INSERT INTO `localidades` VALUES (263, 'TORRECITAS', '5367', 9);
INSERT INTO `localidades` VALUES (264, 'LA ISLA', '5367', 9);
INSERT INTO `localidades` VALUES (265, 'LA PLAYA', '5367', 9);
INSERT INTO `localidades` VALUES (266, 'LOS MISTOLES', '5367', 9);
INSERT INTO `localidades` VALUES (267, 'ESQUINA GRANDE', '5367', 9);
INSERT INTO `localidades` VALUES (268, 'BALDE SALADO', '5367', 9);
INSERT INTO `localidades` VALUES (269, 'LA AGUADITA', '5367', 9);
INSERT INTO `localidades` VALUES (270, 'SAN PEDRO', '5367', 9);
INSERT INTO `localidades` VALUES (271, 'LA SUSPENSION', '5367', 8);
INSERT INTO `localidades` VALUES (272, 'TRES DE MAYO', '5367', 8);
INSERT INTO `localidades` VALUES (273, 'LA PORFIA', '5367', 8);
INSERT INTO `localidades` VALUES (274, 'ISLA DEL TIGRE', '5367', 8);
INSERT INTO `localidades` VALUES (275, 'SIEMPRE VERDE', '5367', 8);
INSERT INTO `localidades` VALUES (276, 'EL BALDE DE LA VIUDA', '5367', 8);
INSERT INTO `localidades` VALUES (277, 'LA LOMITA', '5367', 8);
INSERT INTO `localidades` VALUES (278, 'LAS MALVINAS', '5367', 8);
INSERT INTO `localidades` VALUES (279, 'VILLA NIDIA', '5367', 8);
INSERT INTO `localidades` VALUES (280, 'SAN LORENZO', '5367', 8);
INSERT INTO `localidades` VALUES (281, 'EL ABRA', '5367', 8);
INSERT INTO `localidades` VALUES (282, 'EL CADILLO', '5367', 8);
INSERT INTO `localidades` VALUES (283, 'KILOMETRO 14', '5367', 8);
INSERT INTO `localidades` VALUES (284, 'VILLA LUISA', '5367', 8);
INSERT INTO `localidades` VALUES (285, 'LA INDUSTRIA', '5367', 8);
INSERT INTO `localidades` VALUES (286, 'LA ISLA', '5367', 8);
INSERT INTO `localidades` VALUES (287, 'BAJO HONDO', '5367', 8);
INSERT INTO `localidades` VALUES (288, 'EL MOSQUITO', '5367', 8);
INSERT INTO `localidades` VALUES (289, 'EL CALDEN', '5367', 8);
INSERT INTO `localidades` VALUES (290, 'LA CHILCA', '5367', 8);
INSERT INTO `localidades` VALUES (291, 'PUESTO LOS CORNEJOS', '5367', 8);
INSERT INTO `localidades` VALUES (292, 'LA REPRESA', '5367', 8);
INSERT INTO `localidades` VALUES (293, 'LA REPRESITA', '5367', 8);
INSERT INTO `localidades` VALUES (294, 'LAS VENTANITAS', '5367', 8);
INSERT INTO `localidades` VALUES (295, 'ULAPES', '5367', 8);
INSERT INTO `localidades` VALUES (296, 'AGUAYO', '5367', 8);
INSERT INTO `localidades` VALUES (297, 'EL MEDANITO', '5367', 8);
INSERT INTO `localidades` VALUES (298, 'SAN RAFAEL', '5367', 8);
INSERT INTO `localidades` VALUES (299, 'ALGARROBO GRANDE', '5367', 8);
INSERT INTO `localidades` VALUES (300, 'CORRAL DE ISAAC', '5367', 8);
INSERT INTO `localidades` VALUES (301, 'CUATRO ESQUINAS', '5367', 8);
INSERT INTO `localidades` VALUES (302, 'LA RESERVA', '5367', 8);
INSERT INTO `localidades` VALUES (303, 'PUESTO DICHOSO', '5367', 8);
INSERT INTO `localidades` VALUES (304, 'ENTRE RIOS', '5367', 8);
INSERT INTO `localidades` VALUES (305, 'SANTA ELENA', '5367', 8);
INSERT INTO `localidades` VALUES (306, 'LA LILIA', '5367', 8);
INSERT INTO `localidades` VALUES (307, 'EL BUEN RETIRO', '5367', 8);
INSERT INTO `localidades` VALUES (308, 'SAN SOLANO', '5367', 8);
INSERT INTO `localidades` VALUES (309, 'VIRGEN DEL VALLE', '5367', 8);
INSERT INTO `localidades` VALUES (310, 'NUEVA ESPERANZA', '5367', 8);
INSERT INTO `localidades` VALUES (311, 'PATQUIA VIEJO', '5367', 10);
INSERT INTO `localidades` VALUES (312, 'LA MESADA', '5367', 10);
INSERT INTO `localidades` VALUES (313, 'AMANA', '5367', 10);
INSERT INTO `localidades` VALUES (314, 'LA TORRE', '5367', 10);
INSERT INTO `localidades` VALUES (315, 'PATQUIA', '5367', 10);
INSERT INTO `localidades` VALUES (316, 'LOS COLORADOS', '5367', 10);
INSERT INTO `localidades` VALUES (317, 'PAGANZO', '5367', 10);
INSERT INTO `localidades` VALUES (318, 'AGUANGO', '5367', 10);
INSERT INTO `localidades` VALUES (319, 'REPRESA DE LA PUNTA', '5367', 10);
INSERT INTO `localidades` VALUES (320, 'LOS BALDECITOS', '5367', 10);
INSERT INTO `localidades` VALUES (321, 'BALDE SAN ISIDRO', '5367', 10);
INSERT INTO `localidades` VALUES (322, 'EL CHIFLON', '5367', 10);
INSERT INTO `localidades` VALUES (323, 'MASCASIN', '5367', 18);
INSERT INTO `localidades` VALUES (324, 'LA JARILLA', '5367', 18);
INSERT INTO `localidades` VALUES (325, 'LA LAGUNA', '5367', 18);
INSERT INTO `localidades` VALUES (326, 'LA AGUADA', '5367', 18);
INSERT INTO `localidades` VALUES (327, 'EL TOTORAL', '5367', 18);
INSERT INTO `localidades` VALUES (328, 'EL TALA', '5367', 18);
INSERT INTO `localidades` VALUES (329, 'ABRA VERDE', '5367', 18);
INSERT INTO `localidades` VALUES (330, 'MASCASIN', '5367', 18);
INSERT INTO `localidades` VALUES (331, 'EL RODEO', '5367', 18);
INSERT INTO `localidades` VALUES (332, 'CASAS VIEJAS', '5367', 18);
INSERT INTO `localidades` VALUES (333, 'EL POTRERILLO', '5367', 18);
INSERT INTO `localidades` VALUES (334, 'EL DIVISADERO', '5367', 18);
INSERT INTO `localidades` VALUES (335, 'LAS TOSCAS', '5367', 18);
INSERT INTO `localidades` VALUES (336, 'VALLE HERMOSO', '5367', 18);
INSERT INTO `localidades` VALUES (337, 'SANTA CRUZ', '5367', 18);
INSERT INTO `localidades` VALUES (338, 'EL ROSARIO', '5367', 18);
INSERT INTO `localidades` VALUES (339, 'VILLA CASANA', '5367', 18);
INSERT INTO `localidades` VALUES (340, 'REAL DEL CADILLO', '5367', 18);
INSERT INTO `localidades` VALUES (341, 'LOS LAGARCITOS', '5367', 18);
INSERT INTO `localidades` VALUES (342, 'LA CALERA', '5367', 18);
INSERT INTO `localidades` VALUES (343, 'RODEO GRANDE', '5367', 18);
INSERT INTO `localidades` VALUES (344, 'LA CONSULTA', '5367', 18);
INSERT INTO `localidades` VALUES (345, 'SANTA RITA', '5367', 18);
INSERT INTO `localidades` VALUES (346, 'EL BARRIAL', '5367', 18);
INSERT INTO `localidades` VALUES (347, 'CHELCOS', '5367', 18);
INSERT INTO `localidades` VALUES (348, 'AGUA DE AGUIRRE', '5367', 18);
INSERT INTO `localidades` VALUES (349, 'SAN ISIDRO', '5367', 18);
INSERT INTO `localidades` VALUES (350, 'LA CALLANA', '5367', 18);
INSERT INTO `localidades` VALUES (351, 'LOS OROS', '5367', 18);
INSERT INTO `localidades` VALUES (352, 'AGUA BLANCA', '5367', 18);
INSERT INTO `localidades` VALUES (353, 'EL CARDON', '5367', 18);
INSERT INTO `localidades` VALUES (354, 'SAN JOSE', '5367', 18);
INSERT INTO `localidades` VALUES (355, 'CHEPES', '5367', 18);
INSERT INTO `localidades` VALUES (356, 'SAN PEDRO', '5367', 18);
INSERT INTO `localidades` VALUES (357, 'ALTO BAYO', '5367', 18);
INSERT INTO `localidades` VALUES (358, 'AGUA DE LA PIEDRA', '5367', 18);
INSERT INTO `localidades` VALUES (359, 'DESIDERIO TELLO (ZONA VII-SUPERIOR)', '5367', 18);
INSERT INTO `localidades` VALUES (360, 'SAN ANTONIO', '5367', 18);
INSERT INTO `localidades` VALUES (361, 'EL ZAMPAL', '5367', 18);
INSERT INTO `localidades` VALUES (362, 'LOS ROBLES', '5367', 14);
INSERT INTO `localidades` VALUES (363, 'ANDOLUCAS', '5367', 14);
INSERT INTO `localidades` VALUES (364, 'SHAQUI', '5367', 14);
INSERT INTO `localidades` VALUES (365, 'LAS TALAS', '5367', 14);
INSERT INTO `localidades` VALUES (366, 'ALPASINCHE', '5367', 14);
INSERT INTO `localidades` VALUES (367, 'CUIPAN', '5367', 14);
INSERT INTO `localidades` VALUES (368, 'TUYUBIL', '5367', 14);
INSERT INTO `localidades` VALUES (369, 'EL RETIRO', '5367', 14);
INSERT INTO `localidades` VALUES (370, 'CHAUPIHUASI', '5367', 14);
INSERT INTO `localidades` VALUES (371, 'SALICAS', '5367', 14);
INSERT INTO `localidades` VALUES (372, 'SAN BLAS', '5367', 14);
INSERT INTO `localidades` VALUES (373, 'AMUSCHINA', '5367', 14);
INSERT INTO `localidades` VALUES (374, 'SURIYACO', '5367', 14);
INSERT INTO `localidades` VALUES (375, 'LA ESCALERA', '5367', 3);
INSERT INTO `localidades` VALUES (376, 'LA TORRECITA', '5367', 3);
INSERT INTO `localidades` VALUES (377, 'HUACO', '5367', 3);
INSERT INTO `localidades` VALUES (378, 'VILLA SANAGASTA', '5367', 3);
INSERT INTO `localidades` VALUES (379, 'LA CIENAGA', '5367', 16);
INSERT INTO `localidades` VALUES (380, 'BOCA DE LA QUEBRADA', '5367', 16);
INSERT INTO `localidades` VALUES (381, 'VALLE HERMOSO', '5367', 16);
INSERT INTO `localidades` VALUES (382, 'EL HORNO', '5367', 16);
INSERT INTO `localidades` VALUES (383, 'POTRERO GRANDE', '5367', 16);
INSERT INTO `localidades` VALUES (384, 'LA ARMONIA', '5367', 16);
INSERT INTO `localidades` VALUES (385, 'CASA PINTADA', '5367', 16);
INSERT INTO `localidades` VALUES (386, 'DISTRITO PUEBLO', '5367', 16);
INSERT INTO `localidades` VALUES (387, 'LA BANDA', '5367', 16);
INSERT INTO `localidades` VALUES (388, 'VILLA SAN JOSE DE VINCHINA', '5367', 16);
INSERT INTO `localidades` VALUES (389, 'JAGUE', '5367', 16);

-- ----------------------------
-- Table structure for medio_pagos
-- ----------------------------
DROP TABLE IF EXISTS `medio_pagos`;
CREATE TABLE `medio_pagos`  (
  `id_medio_pago` int NOT NULL AUTO_INCREMENT,
  `nombre_pago` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_medio_pago`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of medio_pagos
-- ----------------------------
INSERT INTO `medio_pagos` VALUES (1, 'TARJETA DE CREDITO');
INSERT INTO `medio_pagos` VALUES (2, 'TARJETA DE DEBITO');
INSERT INTO `medio_pagos` VALUES (3, 'RAPIPAGO');
INSERT INTO `medio_pagos` VALUES (4, 'PAGO FACIL');
INSERT INTO `medio_pagos` VALUES (5, 'TRANSFERENCIA');
INSERT INTO `medio_pagos` VALUES (6, 'EFECTIVO');

-- ----------------------------
-- Table structure for paises
-- ----------------------------
DROP TABLE IF EXISTS `paises`;
CREATE TABLE `paises`  (
  `id_pais` int NOT NULL AUTO_INCREMENT,
  `nombre_pais` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_pais`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 202 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of paises
-- ----------------------------
INSERT INTO `paises` VALUES (1, 'AFGANISTÁN');
INSERT INTO `paises` VALUES (2, 'ALBANIA');
INSERT INTO `paises` VALUES (3, 'ALEMANIA');
INSERT INTO `paises` VALUES (4, 'ANDORRA');
INSERT INTO `paises` VALUES (5, 'ANGOLA');
INSERT INTO `paises` VALUES (6, 'ANTIGUAYBARBUDA');
INSERT INTO `paises` VALUES (7, 'ARABIASAUDITA');
INSERT INTO `paises` VALUES (8, 'ARGELIA');
INSERT INTO `paises` VALUES (9, 'ARGENTINA');
INSERT INTO `paises` VALUES (10, 'ARMENIA');
INSERT INTO `paises` VALUES (11, 'ARUBA');
INSERT INTO `paises` VALUES (12, 'AUSTRALIA');
INSERT INTO `paises` VALUES (13, 'AUSTRIA');
INSERT INTO `paises` VALUES (14, 'AZERBAIYÁN');
INSERT INTO `paises` VALUES (15, 'BAHAMAS');
INSERT INTO `paises` VALUES (16, 'BANGLADÉS');
INSERT INTO `paises` VALUES (17, 'BARBADOS');
INSERT INTO `paises` VALUES (18, 'BARÉIN');
INSERT INTO `paises` VALUES (19, 'BÉLGICA');
INSERT INTO `paises` VALUES (20, 'BELICE');
INSERT INTO `paises` VALUES (21, 'BENÍN');
INSERT INTO `paises` VALUES (22, 'BIELORRUSIA');
INSERT INTO `paises` VALUES (23, 'BIRMANIA');
INSERT INTO `paises` VALUES (24, 'BOLIVIA');
INSERT INTO `paises` VALUES (25, 'BOSNIAYHERZEGOVINA');
INSERT INTO `paises` VALUES (26, 'BOTSUANA');
INSERT INTO `paises` VALUES (27, 'BRASIL');
INSERT INTO `paises` VALUES (28, 'BRUNÉI');
INSERT INTO `paises` VALUES (29, 'BULGARIA');
INSERT INTO `paises` VALUES (30, 'BURKINAFASO');
INSERT INTO `paises` VALUES (31, 'BURUNDI');
INSERT INTO `paises` VALUES (32, 'BUTÁN');
INSERT INTO `paises` VALUES (33, 'CABOVERDE');
INSERT INTO `paises` VALUES (34, 'CAMBOYA');
INSERT INTO `paises` VALUES (35, 'CAMERÚN');
INSERT INTO `paises` VALUES (36, 'CANADÁ');
INSERT INTO `paises` VALUES (37, 'CATAR');
INSERT INTO `paises` VALUES (38, 'CHAD');
INSERT INTO `paises` VALUES (39, 'CHILE');
INSERT INTO `paises` VALUES (40, 'CHINA');
INSERT INTO `paises` VALUES (41, 'CHIPRE');
INSERT INTO `paises` VALUES (42, 'CIUDADDELVATICANO');
INSERT INTO `paises` VALUES (43, 'COLOMBIA');
INSERT INTO `paises` VALUES (44, 'COMORAS');
INSERT INTO `paises` VALUES (45, 'COREADELNORTE');
INSERT INTO `paises` VALUES (46, 'COREADELSUR');
INSERT INTO `paises` VALUES (47, 'COSTADEMARFIL');
INSERT INTO `paises` VALUES (48, 'COSTARICA');
INSERT INTO `paises` VALUES (49, 'CROACIA');
INSERT INTO `paises` VALUES (50, 'CUBA');
INSERT INTO `paises` VALUES (51, 'DINAMARCA');
INSERT INTO `paises` VALUES (52, 'DOMINICA');
INSERT INTO `paises` VALUES (53, 'ECUADOR');
INSERT INTO `paises` VALUES (54, 'EGIPTO');
INSERT INTO `paises` VALUES (55, 'ELSALVADOR');
INSERT INTO `paises` VALUES (56, 'EMIRATOSÁRABESUNIDOS');
INSERT INTO `paises` VALUES (57, 'ERITREA');
INSERT INTO `paises` VALUES (58, 'ESLOVAQUIA');
INSERT INTO `paises` VALUES (59, 'ESLOVENIA');
INSERT INTO `paises` VALUES (60, 'ESPAÑA');
INSERT INTO `paises` VALUES (61, 'ESTADOSUNIDOS');
INSERT INTO `paises` VALUES (62, 'ESTONIA');
INSERT INTO `paises` VALUES (63, 'ETIOPÍA');
INSERT INTO `paises` VALUES (64, 'FILIPINAS');
INSERT INTO `paises` VALUES (65, 'FINLANDIA');
INSERT INTO `paises` VALUES (66, 'FIYI');
INSERT INTO `paises` VALUES (67, 'FRANCIA');
INSERT INTO `paises` VALUES (68, 'GABÓN');
INSERT INTO `paises` VALUES (69, 'GAMBIA');
INSERT INTO `paises` VALUES (70, 'GEORGIA');
INSERT INTO `paises` VALUES (71, 'GIBRALTAR');
INSERT INTO `paises` VALUES (72, 'GHANA');
INSERT INTO `paises` VALUES (73, 'GRANADA');
INSERT INTO `paises` VALUES (74, 'GRECIA');
INSERT INTO `paises` VALUES (75, 'GROENLANDIA');
INSERT INTO `paises` VALUES (76, 'GUATEMALA');
INSERT INTO `paises` VALUES (77, 'GUINEAECUATORIAL');
INSERT INTO `paises` VALUES (78, 'GUINEA');
INSERT INTO `paises` VALUES (79, 'GUINEA-BISÁU');
INSERT INTO `paises` VALUES (80, 'GUYANA');
INSERT INTO `paises` VALUES (81, 'HAITÍ');
INSERT INTO `paises` VALUES (82, 'HONDURAS');
INSERT INTO `paises` VALUES (83, 'HUNGRÍA');
INSERT INTO `paises` VALUES (84, 'INDIA');
INSERT INTO `paises` VALUES (85, 'INDONESIA');
INSERT INTO `paises` VALUES (86, 'IRAK');
INSERT INTO `paises` VALUES (87, 'IRÁN');
INSERT INTO `paises` VALUES (88, 'IRLANDA');
INSERT INTO `paises` VALUES (89, 'ISLANDIA');
INSERT INTO `paises` VALUES (90, 'ISLASCOOK');
INSERT INTO `paises` VALUES (91, 'ISLASMARSHALL');
INSERT INTO `paises` VALUES (92, 'ISLASSALOMÓN');
INSERT INTO `paises` VALUES (93, 'ISRAEL');
INSERT INTO `paises` VALUES (94, 'ITALIA');
INSERT INTO `paises` VALUES (95, 'JAMAICA');
INSERT INTO `paises` VALUES (96, 'JAPÓN');
INSERT INTO `paises` VALUES (97, 'JORDANIA');
INSERT INTO `paises` VALUES (98, 'KAZAJISTÁN');
INSERT INTO `paises` VALUES (99, 'KENIA');
INSERT INTO `paises` VALUES (100, 'KIRGUISTÁN');
INSERT INTO `paises` VALUES (101, 'KIRIBATI');
INSERT INTO `paises` VALUES (102, 'KUWAIT');
INSERT INTO `paises` VALUES (103, 'LAOS');
INSERT INTO `paises` VALUES (104, 'LESOTO');
INSERT INTO `paises` VALUES (105, 'LETONIA');
INSERT INTO `paises` VALUES (106, 'LÍBANO');
INSERT INTO `paises` VALUES (107, 'LIBERIA');
INSERT INTO `paises` VALUES (108, 'LIBIA');
INSERT INTO `paises` VALUES (109, 'LIECHTENSTEIN');
INSERT INTO `paises` VALUES (110, 'LITUANIA');
INSERT INTO `paises` VALUES (111, 'LUXEMBURGO');
INSERT INTO `paises` VALUES (112, 'MADAGASCAR');
INSERT INTO `paises` VALUES (113, 'MALASIA');
INSERT INTO `paises` VALUES (114, 'MALAUI');
INSERT INTO `paises` VALUES (115, 'MALDIVAS');
INSERT INTO `paises` VALUES (116, 'MALÍ');
INSERT INTO `paises` VALUES (117, 'MALTA');
INSERT INTO `paises` VALUES (118, 'MARRUECOS');
INSERT INTO `paises` VALUES (119, 'MARTINICA');
INSERT INTO `paises` VALUES (120, 'MAURICIO');
INSERT INTO `paises` VALUES (121, 'MAURITANIA');
INSERT INTO `paises` VALUES (122, 'MÉXICO');
INSERT INTO `paises` VALUES (123, 'MICRONESIA');
INSERT INTO `paises` VALUES (124, 'MOLDAVIA');
INSERT INTO `paises` VALUES (125, 'MÓNACO');
INSERT INTO `paises` VALUES (126, 'MONGOLIA');
INSERT INTO `paises` VALUES (127, 'MONTENEGRO');
INSERT INTO `paises` VALUES (128, 'MOZAMBIQUE');
INSERT INTO `paises` VALUES (129, 'NAMIBIA');
INSERT INTO `paises` VALUES (130, 'NAURU');
INSERT INTO `paises` VALUES (131, 'NEPAL');
INSERT INTO `paises` VALUES (132, 'NICARAGUA');
INSERT INTO `paises` VALUES (133, 'NÍGER');
INSERT INTO `paises` VALUES (134, 'NIGERIA');
INSERT INTO `paises` VALUES (135, 'NORUEGA');
INSERT INTO `paises` VALUES (136, 'NUEVAZELANDA');
INSERT INTO `paises` VALUES (137, 'OMÁN');
INSERT INTO `paises` VALUES (138, 'PAÍSESBAJOS');
INSERT INTO `paises` VALUES (139, 'PAKISTÁN');
INSERT INTO `paises` VALUES (140, 'PALAOS');
INSERT INTO `paises` VALUES (141, 'PALESTINA');
INSERT INTO `paises` VALUES (142, 'PANAMÁ');
INSERT INTO `paises` VALUES (143, 'PAPÚANUEVAGUINEA');
INSERT INTO `paises` VALUES (144, 'PARAGUAY');
INSERT INTO `paises` VALUES (145, 'PERÚ');
INSERT INTO `paises` VALUES (146, 'POLONIA');
INSERT INTO `paises` VALUES (147, 'PORTUGAL');
INSERT INTO `paises` VALUES (148, 'PUERTORICO');
INSERT INTO `paises` VALUES (149, 'REINOUNIDO');
INSERT INTO `paises` VALUES (150, 'REPÚBLICACENTROAFRICANA');
INSERT INTO `paises` VALUES (151, 'REPÚBLICACHECA');
INSERT INTO `paises` VALUES (152, 'REPÚBLICADEMACEDONIA');
INSERT INTO `paises` VALUES (153, 'REPÚBLICADELCONGO');
INSERT INTO `paises` VALUES (154, 'REPÚBLICADEMOCRÁTICADELCONGO');
INSERT INTO `paises` VALUES (155, 'REPÚBLICADOMINICANA');
INSERT INTO `paises` VALUES (156, 'REPÚBLICASUDAFRICANA');
INSERT INTO `paises` VALUES (157, 'RUANDA');
INSERT INTO `paises` VALUES (158, 'RUMANÍA');
INSERT INTO `paises` VALUES (159, 'RUSIA');
INSERT INTO `paises` VALUES (160, 'SAMOA');
INSERT INTO `paises` VALUES (161, 'SANCRISTÓBALYNIEVES');
INSERT INTO `paises` VALUES (162, 'SANMARINO');
INSERT INTO `paises` VALUES (163, 'SANVICENTEYLASGRANADINAS');
INSERT INTO `paises` VALUES (164, 'SANTALUCÍA');
INSERT INTO `paises` VALUES (165, 'SANTOTOMÉYPRÍNCIPE');
INSERT INTO `paises` VALUES (166, 'SENEGAL');
INSERT INTO `paises` VALUES (167, 'SERBIA');
INSERT INTO `paises` VALUES (168, 'SEYCHELLES');
INSERT INTO `paises` VALUES (169, 'SIERRALEONA');
INSERT INTO `paises` VALUES (170, 'SINGAPUR');
INSERT INTO `paises` VALUES (171, 'SIRIA');
INSERT INTO `paises` VALUES (172, 'SOMALIA');
INSERT INTO `paises` VALUES (173, 'SRILANKA');
INSERT INTO `paises` VALUES (174, 'SUAZILANDIA');
INSERT INTO `paises` VALUES (175, 'SUDÁNDELSUR');
INSERT INTO `paises` VALUES (176, 'SUDÁN');
INSERT INTO `paises` VALUES (177, 'SUECIA');
INSERT INTO `paises` VALUES (178, 'SUIZA');
INSERT INTO `paises` VALUES (179, 'SURINAM');
INSERT INTO `paises` VALUES (180, 'TAILANDIA');
INSERT INTO `paises` VALUES (181, 'TANZANIA');
INSERT INTO `paises` VALUES (182, 'TAYIKISTÁN');
INSERT INTO `paises` VALUES (183, 'TIMORORIENTAL');
INSERT INTO `paises` VALUES (184, 'TOGO');
INSERT INTO `paises` VALUES (185, 'TONGA');
INSERT INTO `paises` VALUES (186, 'TRINIDADYTOBAGO');
INSERT INTO `paises` VALUES (187, 'TÚNEZ');
INSERT INTO `paises` VALUES (188, 'TURKMENISTÁN');
INSERT INTO `paises` VALUES (189, 'TURQUÍA');
INSERT INTO `paises` VALUES (190, 'TUVALU');
INSERT INTO `paises` VALUES (191, 'UCRANIA');
INSERT INTO `paises` VALUES (192, 'UGANDA');
INSERT INTO `paises` VALUES (193, 'URUGUAY');
INSERT INTO `paises` VALUES (194, 'UZBEKISTÁN');
INSERT INTO `paises` VALUES (195, 'VANUATU');
INSERT INTO `paises` VALUES (196, 'VENEZUELA');
INSERT INTO `paises` VALUES (197, 'VIETNAM');
INSERT INTO `paises` VALUES (198, 'YEMEN');
INSERT INTO `paises` VALUES (199, 'YIBUTI');
INSERT INTO `paises` VALUES (200, 'ZAMBIA');
INSERT INTO `paises` VALUES (201, 'ZIMBABUE');

-- ----------------------------
-- Table structure for productores
-- ----------------------------
DROP TABLE IF EXISTS `productores`;
CREATE TABLE `productores`  (
  `id_productor` int NOT NULL AUTO_INCREMENT,
  `nombre_productor` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_usuario` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_productor`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of productores
-- ----------------------------
INSERT INTO `productores` VALUES (1, 'FINCA LAS BREAS', 2);
INSERT INTO `productores` VALUES (2, 'FAZENDA SERTAO', 11);
INSERT INTO `productores` VALUES (3, 'FINCA EL PEÑÓN', 4);
INSERT INTO `productores` VALUES (4, 'FINCA VISTA HERMOSA', 6);
INSERT INTO `productores` VALUES (5, 'MARCO MEJÍA', 8);

-- ----------------------------
-- Table structure for productos
-- ----------------------------
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos`  (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `descripcion_corta` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `descripcion_larga` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `precio` decimal(10, 2) NULL DEFAULT NULL,
  `cantidad` int NULL DEFAULT NULL,
  `id_tipo_cafe` int NULL DEFAULT NULL,
  `idunidad_medida` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `id_pais` int NULL DEFAULT NULL,
  `idproductor` int NULL DEFAULT NULL,
  `region` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `procesamiento_natural` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `procesamiento_lavado` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `imagen_principal` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `imagen_secundaria` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `altitud` varchar(65) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_producto`) USING BTREE,
  INDEX `fk_productos_tipos_cafe1_idx`(`id_tipo_cafe`) USING BTREE,
  INDEX `fk_productos_unidad_medida1_idx`(`idunidad_medida`) USING BTREE,
  INDEX `fk_productos_productores1_idx`(`idproductor`) USING BTREE,
  INDEX `fk_productos_paises1_idx`(`id_pais`) USING BTREE,
  CONSTRAINT `fk_productos_paises1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_productores1` FOREIGN KEY (`idproductor`) REFERENCES `productores` (`id_productor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_tipos_cafe1` FOREIGN KEY (`id_tipo_cafe`) REFERENCES `tipos_cafe` (`id_tipo_cafe`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_unidad_medida1` FOREIGN KEY (`idunidad_medida`) REFERENCES `unidad_medida` (`id_unidad_medida`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of productos
-- ----------------------------
INSERT INTO `productos` VALUES (1, 'API AROMA', 'Fabricado en Argentina', ' Café de alta calidad de Argentina con notas de sabor únicas que resaltan su origen. Este café ha sido cuidadosamente cultivado y procesado para ofrecer una experiencia sensorial excepcional. La combinación de altitudes y métodos de procesamiento confiere un perfil complejo y balanceado, ideal para los amantes del café de especialidad.', 59000.00, 100, 1, 1, '2024-09-14 00:08:45', '2024-09-22 00:24:30', 9, 1, 'Cuyo', '50 %', '50 %', 'apiAroma.png', 'apiAroma.png', '800 y 1650');
INSERT INTO `productos` VALUES (2, 'ORACLE', 'Fabricado en Brasil', 'Café de alta calidad de Brasil con un perfil de sabor robusto y vibrante. Cultivado en las tierras fértiles de Brasil, este café ofrece una combinación de notas frutales y achocolatadas que deleitan el paladar. La cuidadosa selección y los métodos tradicionales de procesamiento aseguran una experiencia rica y aromática, ideal para los amantes del café de especialidad.', 40000.00, 100, 1, 1, '2024-09-22 04:10:06', '2024-09-22 13:39:28', 27, 2, 'Minas Gerais', '100%', '0', 'oracle.png', 'oracle.png', '1100 - 1450');
INSERT INTO `productos` VALUES (3, 'SCRIPT', 'Fabricado en Guatemala', 'Café de alta calidad de Guatemala, conocido por su perfil de sabor brillante y afrutado. Este café es cultivado en las altitudes de Guatemala, lo que le proporciona un carácter único con notas de cacao y cítricos. El proceso de recolección y secado artesanal asegura una experiencia de taza excepcional, perfecta para aquellos que buscan un café de especialidad con una historia y sabor distintivos.', 75500.00, 100, 1, 1, '2024-09-23 04:00:01', '2024-09-22 13:39:28', 76, 3, 'Huehuetenango', '100%', '0', 'script.png', 'script.png', '1600');
INSERT INTO `productos` VALUES (4, 'STACK LATTE', 'Fabricado en Colombia', 'Café de alta calidad de Colombia, apreciado por su perfil de sabor suave y balanceado. Cultivado en las montañas colombianas, este café destaca por sus notas de caramelo y frutos secos. El cuidadoso proceso de selección y procesamiento garantiza una taza rica y compleja, ideal para quienes buscan disfrutar de un café de especialidad con una experiencia sensorial inigualable.', 55000.00, 100, 1, 1, '2024-09-23 04:00:01', '2024-09-22 13:39:28', 43, 4, 'Salado Blanco, Huila', '100%', '0', 'stackLatte.png', 'stackLatte.png', '1680');
INSERT INTO `productos` VALUES (5, 'SYNTAX LATTE', 'Fabricado en Bolivia', 'Café de alta calidad de Bolivia con un perfil de sabor único que destaca su origen. Este café ha sido cuidadosamente cultivado y procesado en las montañas bolivianas para ofrecer una experiencia sensorial excepcional. La combinación de altitudes y métodos de procesamiento confiere a este café un carácter complejo y equilibrado, perfecto para los amantes del café de especialidad que buscan descubrir nuevos sabores.', 53000.00, 100, 1, 1, '2024-09-23 04:00:01', '2024-09-22 13:39:28', 24, 5, 'Finca El Porvenir', '0', '100%', 'syntaxLatte.png', 'syntaxLatte.png', '1700 - 2000');
INSERT INTO `productos` VALUES (6, 'LOGIC', 'Fabricado en Ecuador', 'Café de alta calidad de Ecuador, conocido por su perfil de sabor excepcional que resalta su origen. Cultivado en las montañas ecuatorianas, este café se distingue por sus notas florales y frutales. El meticuloso proceso de cultivo y procesamiento garantiza una taza aromática y equilibrada, ideal para quienes aprecian los cafés especiales con carácter.', 48000.00, 100, 1, 1, '2024-09-23 04:00:01', '2024-09-22 13:39:28', 53, 4, 'Galápagos', '50 %', '50 %', 'logic.png', 'logic.png', '800 y 1650');
INSERT INTO `productos` VALUES (7, 'FULL STACK', 'Fabricado en Argentina', 'Café de alta calidad fabricado en Argentina, reconocido por su perfil de sabor robusto y profundo que refleja la pasión y tradición del café argentino. Este café es cultivado en las regiones cafetaleras argentinas y se caracteriza por sus notas intensas y equilibradas. El proceso de cultivo y tostado meticuloso asegura una taza rica y satisfactoria, ideal para los conocedores del café.', 60000.00, 100, 1, 1, '2024-09-23 04:00:01', '2024-09-22 13:39:28', 9, 4, 'Noa', '50 %', '50 %', 'fullStack.png', 'fullStack.png', '800 y 1650');
INSERT INTO `productos` VALUES (8, 'EXPRESS', 'Fabricado en Brasil', 'Café de alta calidad de Brasil, conocido por su perfil de sabor vibrante y dulce que captura la esencia única de las tierras brasileñas. Este café es cultivado en las ricas tierras cafetaleras de Brasil y se distingue por sus notas frutales y chocolateadas. El proceso de cultivo cuidadoso y el tostado artesanal garantizan una taza indulgente y deliciosa, ideal para disfrutar en cualquier momento del día.', 42000.00, 100, 1, 1, '2024-09-23 04:00:01', '2024-09-22 13:39:28', 27, 4, 'Nordeste', '50 %', '50 %', 'express.png', 'express.png', '800 y 1650');

-- ----------------------------
-- Table structure for provincias
-- ----------------------------
DROP TABLE IF EXISTS `provincias`;
CREATE TABLE `provincias`  (
  `id_provincia` int NOT NULL AUTO_INCREMENT,
  `nombre_provincia` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id_pais` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_provincia`) USING BTREE,
  INDEX `fk_provincias_paises1_idx`(`id_pais`) USING BTREE,
  CONSTRAINT `fk_provincias_paises1` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id_pais`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of provincias
-- ----------------------------
INSERT INTO `provincias` VALUES (1, 'BUENOS AIRES', 9);
INSERT INTO `provincias` VALUES (2, 'CATAMARCA', 9);
INSERT INTO `provincias` VALUES (3, 'CHACO', 9);
INSERT INTO `provincias` VALUES (4, 'CHUBUT', 9);
INSERT INTO `provincias` VALUES (5, 'CÓRDOBA', 9);
INSERT INTO `provincias` VALUES (6, 'CORRIENTES', 9);
INSERT INTO `provincias` VALUES (7, 'ENTRE RÍOS', 9);
INSERT INTO `provincias` VALUES (8, 'FORMOSA', 9);
INSERT INTO `provincias` VALUES (9, 'JUJUY', 9);
INSERT INTO `provincias` VALUES (10, 'LA PAMPA', 9);
INSERT INTO `provincias` VALUES (11, 'LA RIOJA', 9);
INSERT INTO `provincias` VALUES (12, 'MENDOZA', 9);
INSERT INTO `provincias` VALUES (13, 'MISIONES', 9);
INSERT INTO `provincias` VALUES (14, 'NEUQUÉN', 9);
INSERT INTO `provincias` VALUES (15, 'RÍO NEGRO', 9);
INSERT INTO `provincias` VALUES (16, 'SALTA', 9);
INSERT INTO `provincias` VALUES (17, 'SAN JUAN', 9);
INSERT INTO `provincias` VALUES (18, 'SAN LUIS', 9);
INSERT INTO `provincias` VALUES (19, 'SANTA CRUZ', 9);
INSERT INTO `provincias` VALUES (20, 'SANTA FE', 9);
INSERT INTO `provincias` VALUES (21, 'SANTIAGO DEL ESTERO', 9);
INSERT INTO `provincias` VALUES (22, 'TIERRA DEL FUEGO', 9);
INSERT INTO `provincias` VALUES (23, 'TUCUMÁN', 9);

-- ----------------------------
-- Table structure for rel_carrito_productos
-- ----------------------------
DROP TABLE IF EXISTS `rel_carrito_productos`;
CREATE TABLE `rel_carrito_productos`  (
  `id_rel_carrito_producto` int NOT NULL AUTO_INCREMENT,
  `id_carrito` int NULL DEFAULT NULL,
  `id_producto` int NULL DEFAULT NULL,
  `cantidad` int NULL DEFAULT NULL,
  `precio` decimal(10, 2) NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `id_tipo_cafe` int NULL DEFAULT NULL,
  `idunidad_medida` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_rel_carrito_producto`) USING BTREE,
  INDEX `fk_rel_carrito_productos_productos1_idx`(`id_producto`) USING BTREE,
  INDEX `fk_rel_carrito_productos_carrito1_idx`(`id_carrito`) USING BTREE,
  CONSTRAINT `fk_rel_carrito_productos_carrito1` FOREIGN KEY (`id_carrito`) REFERENCES `carrito` (`id_carrito`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_rel_carrito_productos_productos1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of rel_carrito_productos
-- ----------------------------
INSERT INTO `rel_carrito_productos` VALUES (1, 1, 1, 1, 59000.00, '2024-09-14 00:17:41', '2024-09-14 00:17:46', 1, 1);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_rol`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'ADMINISTRADOR');
INSERT INTO `roles` VALUES (2, 'USUARIO');
INSERT INTO `roles` VALUES (3, 'PRODUCTOR');

-- ----------------------------
-- Table structure for tipos_cafe
-- ----------------------------
DROP TABLE IF EXISTS `tipos_cafe`;
CREATE TABLE `tipos_cafe`  (
  `id_tipo_cafe` int NOT NULL AUTO_INCREMENT,
  `nombre_cafe` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_tipo_cafe`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of tipos_cafe
-- ----------------------------
INSERT INTO `tipos_cafe` VALUES (1, 'EN GRANO');
INSERT INTO `tipos_cafe` VALUES (2, 'MOLIDO AEROPRESS');
INSERT INTO `tipos_cafe` VALUES (3, 'MOLIDO FILTRO');
INSERT INTO `tipos_cafe` VALUES (4, 'MOLIDO PRENSA FRANCESA');
INSERT INTO `tipos_cafe` VALUES (5, 'MODO VOLTURNO');

-- ----------------------------
-- Table structure for unidad_medida
-- ----------------------------
DROP TABLE IF EXISTS `unidad_medida`;
CREATE TABLE `unidad_medida`  (
  `id_unidad_medida` int NOT NULL AUTO_INCREMENT,
  `nombre_medida` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_unidad_medida`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of unidad_medida
-- ----------------------------
INSERT INTO `unidad_medida` VALUES (1, '1 KILO');
INSERT INTO `unidad_medida` VALUES (2, '250 GRAMOS');

-- ----------------------------
-- Table structure for usuarios
-- ----------------------------
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios`  (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `apellido` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telefono` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dni` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `imagen_perfil` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `barrio` varchar(65) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `calle` varchar(75) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `numero` int NULL DEFAULT NULL,
  `piso` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `departamento` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  `id_localidad` int NULL DEFAULT NULL,
  `id_estado` int NULL DEFAULT NULL,
  `id_rol` int NULL DEFAULT NULL,
  `cuil_t` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `clave` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`) USING BTREE,
  INDEX `fk_usuarios_roles_idx`(`id_rol`) USING BTREE,
  INDEX `fk_usuarios_estado1_idx`(`id_estado`) USING BTREE,
  INDEX `fk_usuarios_localidades1_idx`(`id_localidad`) USING BTREE,
  CONSTRAINT `fk_usuarios_estado1` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_localidades1` FOREIGN KEY (`id_localidad`) REFERENCES `localidades` (`id_localidad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '					' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of usuarios
-- ----------------------------
INSERT INTO `usuarios` VALUES (1, 'admin', 'admin', '3804565456', '2323232', 'admin@admin.com', 'avatar1.jpg', 'admin', 'admin', 10, '0', '0', '2024-09-13 22:58:45', '2024-09-13 22:58:57', 38, 1, 1, '0', '$2y$10$mloK1rqTbjRMuCS5j8bjyuMDH3r9AjwZnIopxl');
INSERT INTO `usuarios` VALUES (2, 'Juan', 'Aguirre', '5491159598698', '36789987', 'FINCALASBREAS@gmail.com', 'avatarempresa.jpg', 'CENTRO', 'BELGRANO', 1589, '0', '0', '2024-09-13 23:52:10', '2024-09-13 23:52:13', 73, 1, 3, '20367899876', '$10$mloK1rqTbjRMuCS5j8bjyuMDH3r9AjwZnIopxl');
INSERT INTO `usuarios` VALUES (3, 'Maria Elena', 'Fuseneco', '3804565656', '30321123', 'mariaelena@gmail.com', 'avatar-mini2.jpg', 'PARQUE SUR', 'LAS HERAS', 569, '0', '0', '2024-09-14 00:02:48', '2024-09-14 00:02:55', 355, 1, 2, '27303211236', '$10$mloK1rqTbjRMuCS5j8bjyuMDH3r9AjwZnIopxl');
INSERT INTO `usuarios` VALUES (4, 'Facundo', 'Díaz Bordón', '3804447187', '28654896', 'fdiazbordon@gmail.com', 'avatarempresa.jpg', '4 DE JUNIO', 'JOAQUÍN V GONZÁLEZ', 633, '0', '0', '2024-09-20 03:52:44', '2024-09-20 03:52:44', 38, 1, 3, '23286548965', '$2b$10$PZoXNsRQOSJDgfOmq47sbuM9mT/nPfUIPI.v26RdAC74QtLd6U/Iu');
INSERT INTO `usuarios` VALUES (5, 'Angeles', 'Quevedo', '3804667825', '45633223', 'angelesquevedo@gmail.com', 'avatar-mini2.jpg', '25 DE MAYO', 'BAZÁN Y BUSTOS', 223, '0', '0', '2024-09-20 03:54:25', '2024-09-20 03:54:25', 38, 1, 2, '15456332232', '$2b$10$.ARtqvj7Gq1SdtOJU9/AZ.6vXYgybYwmGz6TVVUitLrMZWoUy91tm');
INSERT INTO `usuarios` VALUES (6, 'Dario', 'Pérez', '3804447187', '30569756', 'darioperez@gmail.com', 'avatarempresa.jpg', 'SAN VICENTE', '9 DE JULIO', 156, '0', '0', '2024-09-20 03:56:22', '2024-09-20 03:56:22', 38, 1, 3, '25305697563', '$2b$10$lWCLU9ZqVzNFPhTR51jX6.aRXotYhjjwyHWTyhlG4EVEcG5GnHQmW');
INSERT INTO `usuarios` VALUES (7, 'Camila', 'Díaz ', '3804235689', '39700670', 'camiladiaz@gmail.com', 'avatar-mini2.jpg', 'VARGAS', 'BUENOS AIRES', 80, '0', '0', '2024-09-20 06:16:37', '2024-09-20 08:01:30', 38, 1, 2, '20397006701', '$2b$10$v8inFDpMIcIxzhzaIySYoO36Jxb9cQqZP20Nn9D99wN1MipS0SObe');
INSERT INTO `usuarios` VALUES (8, 'Javier', 'Bustos', '3804568978', '40265896', 'javibustos@gmail.com', 'avatarempresa.jpg', 'FALDEO', 'CORRIENTE', 433, '0', '0', '2024-09-20 07:13:27', '2024-09-20 07:13:27', 38, 1, 3, '65402658966', '$2b$10$JNujGjML3KuAn8m4mN7tHuQUc9bJAWW/OnVSI0XiiPmJL.gIz8Wwq');
INSERT INTO `usuarios` VALUES (9, 'Alejandro', 'Fernández', '3804444223', '32156965', 'alefernandez@gmail.com', 'avatar-mini2.jpg', 'PAIMÁN', 'SANTA FÉ', 655, '0', '0', '2024-09-20 07:22:05', '2024-09-20 07:22:05', 38, 1, 2, '53321569654', '$2b$10$HFJXP7PH89qB5XHyfexWyu7xy1gIdCLKfGDtnz8GRoV1t9jfoRY86');
INSERT INTO `usuarios` VALUES (10, 'Cecilia', 'Bordón', '3804385507', '25638956', 'ceciliabordon@gmail.com', 'avatar-mini2.jpg', 'ALBERDI', 'URQUIZA', 229, '0', '0', '2024-09-20 07:28:11', '2024-09-20 07:28:11', 38, 1, 2, '52563895623', '$2b$10$X3SEPwcC3qBxCrCSDvqVieOLh9WdbzLRXOJyZu7Sp2UtR.GLd5XnC');
INSERT INTO `usuarios` VALUES (11, 'Matías', 'Álvarez', '3825535033', '37492767', 'matiasalvarez@gmail.com', 'avatarempresa.jpg', 'MACROCENTROCENTRO', '8 DE DICIEMBRE', 515, '0', '0', '2024-09-13 23:52:10', '2024-09-13 23:52:13', 38, 1, 3, '20374927672', '$10$mloK1rqTbjRMuCS5j8bjyuMDH3r9AjwZnIopxl');
INSERT INTO `usuarios` VALUES (12, 'Mario', 'Alonso', '03804565656', '27161335', 'admin3@admin.com', 'avatar1.jpg', 'Parque sud', 'Las Heras', 1586, '0', '1', '2024-09-24 00:02:48', '2024-10-10 02:26:48', 1, 1, 1, '27271613356', '$2b$10$abhttYlebWjDBqKzoclOXuNcpWfpYBNx0cGFc7OcAUtBoRN3JyBn2');
INSERT INTO `usuarios` VALUES (13, 'Mario', 'Alan', '03804565656', NULL, 'admin33@admin.com', 'avatar-mini2.jpg', NULL, NULL, NULL, NULL, NULL, '2024-09-25 00:14:44', '2024-09-25 00:14:44', NULL, 1, 2, NULL, '$2b$10$43xAD.eSueSaAtI7851Yi.FRGmbb/QepAk1e.4ylrT/zKjZ/EAsLa');
INSERT INTO `usuarios` VALUES (14, 'Amalia', 'Mercado', '2365656565', NULL, 'amaliamercado@gmail.com', 'avatar-mini2.jpg', NULL, NULL, NULL, NULL, NULL, '2024-10-10 02:22:12', '2024-10-10 02:22:12', NULL, 1, 2, NULL, '$2b$10$mV1pfLS24gaD33r8.EhKwu5OpI4qUIH9alWkbbQdjbPu517iZhLgC');

SET FOREIGN_KEY_CHECKS = 1;
