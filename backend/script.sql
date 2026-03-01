CREATE DATABASE  IF NOT EXISTS `cefcoc_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cefcoc_dev`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cefcoc_dev
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_asignatura`
--

DROP TABLE IF EXISTS `tbl_asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura` (
  `asgid` int NOT NULL AUTO_INCREMENT,
  `asgnom` varchar(100) DEFAULT NULL COMMENT 'Nombre de la asignatura.',
  `asgcod` char(4) DEFAULT NULL COMMENT 'Código de la asignatura de 4 caracteres.',
  `asgcod_clase` char(6) DEFAULT NULL COMMENT 'Código de la clase, para que los estudiantes puedan ingresar a la clase.',
  `asgdia` tinyint(1) DEFAULT NULL COMMENT 'Día que se dicta la clase en número. (1)Lunes, (2)Martes, (3)Miercoles, (4)Jueves, (5)Viernes, (6)Sabado, (7)Domingo',
  `asghora` time DEFAULT NULL COMMENT 'Hora en la que se dicta la clase.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario para saber que profesor dirige la clase.',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo para saber la asignatura a que centro educativo pertenece.',
  `cesid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_salon]: Id del salon del centro educativo, para saber en que salón se dicta la materia.',
  PRIMARY KEY (`asgid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura`
--

LOCK TABLES `tbl_asignatura` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura` DISABLE KEYS */;
INSERT INTO `tbl_asignatura` VALUES (1,'Ciencias','CIEN','XRTY09',1,'09:00:00',2,1,1),(2,'Matematicas','MATE','CRTY78',1,'12:00:00',3,1,2);
/*!40000 ALTER TABLE `tbl_asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_asistencia`
--

DROP TABLE IF EXISTS `tbl_asignatura_asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_asistencia` (
  `asiid` int NOT NULL AUTO_INCREMENT,
  `asiestado` enum('P','A','T','E') DEFAULT NULL COMMENT '(P)resente, (A)usente, (T)ardio, (E)xcusado',
  `asicomentario` varchar(100) DEFAULT NULL COMMENT 'Comentario que deja el profesor en caso de ser requerido.',
  `asifecha` date DEFAULT NULL COMMENT 'Fecha en la que se tomo la asistencia.',
  `asiyear` year DEFAULT NULL COMMENT 'Año en la que se tomo la asistencia.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario, osea el estudiante a quien le pertenece la asistencia.',
  `asgid` int DEFAULT NULL COMMENT '[tbl_asignatura]: Id de la asignatura a la cual pertenece la asistencia.',
  PRIMARY KEY (`asiid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_asistencia`
--

LOCK TABLES `tbl_asignatura_asistencia` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_asistencia` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_asistencia` VALUES (1,'P',NULL,'2026-02-22',2026,1,2);
/*!40000 ALTER TABLE `tbl_asignatura_asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_calificacion_ciclo`
--

DROP TABLE IF EXISTS `tbl_asignatura_calificacion_ciclo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_calificacion_ciclo` (
  `accid` int NOT NULL AUTO_INCREMENT,
  `acccalificacion` decimal(10,0) DEFAULT NULL COMMENT 'Almacena la calificacón final del ciclo.',
  `acccomentario` varchar(150) DEFAULT NULL COMMENT 'Comentario que deje el profesor al finalizar el ciclo por materia.',
  `acctimestamp` timestamp NULL DEFAULT NULL COMMENT 'Fecha hora en la que se determine la calificación final del ciclo.',
  `asgid` int DEFAULT NULL COMMENT '[tbl_asignatura]: Id de la asignatura a la que pertenece la calificación final del ciclo.',
  `cecid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_ciclo]: Id del ciclo a la que pertenece la calificación.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario para determinar de que estudiante es la nota final del ciclo',
  PRIMARY KEY (`accid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_calificacion_ciclo`
--

LOCK TABLES `tbl_asignatura_calificacion_ciclo` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_calificacion_ciclo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_asignatura_calificacion_ciclo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_curso`
--

DROP TABLE IF EXISTS `tbl_asignatura_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_curso` (
  `ascid` int NOT NULL AUTO_INCREMENT,
  `ascvis_config` json DEFAULT NULL COMMENT 'JSON de la configuración de la asignatura, para que cada asignatura tenga su diseño personalizado.',
  `edcid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_curso]: Id del curso del centro educativo a la que pertenece la asignatura.',
  `asgid` int DEFAULT NULL COMMENT '[tbl_asignatura]: Id de la asignatura a la que pertenece la configuración.',
  PRIMARY KEY (`ascid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_curso`
--

LOCK TABLES `tbl_asignatura_curso` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_asignatura_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_trabajo`
--

DROP TABLE IF EXISTS `tbl_asignatura_trabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_trabajo` (
  `astid` int NOT NULL AUTO_INCREMENT,
  `astnomtrabajo` varchar(150) DEFAULT NULL COMMENT 'Titulo del trabajo.',
  `astdesctrabajo` text COMMENT 'Descripción del trabajo.',
  `astfecini` date DEFAULT NULL COMMENT 'Fecha inicial cuando inicia vigencia el trabajo.',
  `astfecfin` date DEFAULT NULL COMMENT 'Fecha final cuando se cierra el trabajo cuando es tipo ''TA''.',
  `astcomentario` varchar(200) DEFAULT NULL COMMENT 'Comentaro',
  `asttip` enum('TA','MA','EN') DEFAULT NULL COMMENT 'Tipo de trabajo: (TA)rea, (MA)terial, (EN)unciado',
  `cecid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_ciclo]: Id del ciclo al que pertenece el trabajo.',
  `ascid` int DEFAULT NULL COMMENT '[tbl_asignatura_curso]: Id del curso a la que pertenece el trabajo.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario quien creo el trabajo. (Acá sería el id del profesor)',
  PRIMARY KEY (`astid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo`
--

LOCK TABLES `tbl_asignatura_trabajo` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_trabajo` VALUES (1,'Resolver multiplicaciones','Resolver las multiplicaciones que se jaron en clase.','2026-02-20','2026-03-02',NULL,'TA',1,1,3);
/*!40000 ALTER TABLE `tbl_asignatura_trabajo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_trabajo_calificacion`
--

DROP TABLE IF EXISTS `tbl_asignatura_trabajo_calificacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_trabajo_calificacion` (
  `atcid` int NOT NULL AUTO_INCREMENT,
  `atccalificacion` decimal(10,0) DEFAULT NULL COMMENT 'Calificación del trabajo que le hizo el profesor al estudiante.',
  `atccomentario` varchar(200) DEFAULT NULL COMMENT 'Comentario que dejo el profesor en caso de dejar comentario.',
  `atctimestamp` timestamp NULL DEFAULT NULL COMMENT 'Fecha y hora en la que el profesor dejo la calificación del trabajo.',
  `ateid` int DEFAULT NULL COMMENT '[tbl_asignatura_trabajo_entrega]: Id de la entrega del trabajo para saber a que trabajo pertenece la calificación.',
  PRIMARY KEY (`atcid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo_calificacion`
--

LOCK TABLES `tbl_asignatura_trabajo_calificacion` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_calificacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_calificacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_trabajo_entrega`
--

DROP TABLE IF EXISTS `tbl_asignatura_trabajo_entrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_trabajo_entrega` (
  `ateid` int NOT NULL AUTO_INCREMENT,
  `atefec_entrega` datetime DEFAULT NULL COMMENT 'Fecha hora en la que el estudiante entrego el trabajo.',
  `atecomentario` varchar(200) DEFAULT NULL COMMENT 'Comentario del estudiante cuando entrego el comentario.',
  `ateestado` char(1) DEFAULT NULL COMMENT '(P)endiente, -> Esta por defecto cuando se asigna la tarea. \n(C)alificado,  -> Cuando el profesor califica el trabajo.\n(E)ntregado, -> Cuando el estudiante entrega el trabajo.\n(D)evuelto -> Cuando el profesor devuelve el trabajo.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario, osea el estudiante al que pertenece la tarea.',
  `astid` varchar(45) DEFAULT NULL COMMENT '[tbl_asignatura_trabajo]: Id del trabajo de la asignatura para saber a que asignatura pertenece el trabajo.',
  PRIMARY KEY (`ateid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo_entrega`
--

LOCK TABLES `tbl_asignatura_trabajo_entrega` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_entrega` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_entrega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_trabajo_recurso`
--

DROP TABLE IF EXISTS `tbl_asignatura_trabajo_recurso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_trabajo_recurso` (
  `atrid` int NOT NULL AUTO_INCREMENT,
  `atrnomarc` varchar(150) DEFAULT NULL COMMENT 'Nombre del archivo subido sin la extensión. Si es un recurso tipo archivo.',
  `atrurl` text COMMENT 'URL subida si es un recurso de tipo link.',
  `atrtiprec` char(1) DEFAULT NULL COMMENT 'Determina el tipo de recurso. (A)rchivo, (L)ink',
  `astid` int DEFAULT NULL COMMENT '[tbl_asignatura_trabajo]: Id del trabajo perteneciente a la signatura para saber el recurso a que trabajo y asignatura pertenece. (SI <> NULL, el recurso lo creo el profesor).',
  `ateid` int DEFAULT NULL COMMENT '[tbl_asignatura_trabajo_entrega]: Id de la entrega del trabajo.(SI es <> null es recurso que subio el estudiante).',
  PRIMARY KEY (`atrid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo_recurso`
--

LOCK TABLES `tbl_asignatura_trabajo_recurso` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_recurso` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_recurso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_centro_educativo`
--

DROP TABLE IF EXISTS `tbl_centro_educativo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_centro_educativo` (
  `cedid` int NOT NULL AUTO_INCREMENT,
  `cedcod` varchar(20) DEFAULT NULL COMMENT 'Código del centro educativo.',
  `cednom` varchar(200) DEFAULT NULL COMMENT 'Nombre del centro educativo.',
  `cedtip` char(2) DEFAULT NULL COMMENT 'Tipo de centro educativo: CB (Colegio puBlico), CP (Colegio Privadlo), UN (UNiversidad)',
  `paiid` int DEFAULT NULL COMMENT '[tbl_pais]: Id del pais al que pertenece el centro educativo.',
  PRIMARY KEY (`cedid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo`
--

LOCK TABLES `tbl_centro_educativo` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo` DISABLE KEYS */;
INSERT INTO `tbl_centro_educativo` VALUES (1,'MANU','Manuelita Saenz','CB',1);
/*!40000 ALTER TABLE `tbl_centro_educativo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_centro_educativo_ciclo`
--

DROP TABLE IF EXISTS `tbl_centro_educativo_ciclo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_centro_educativo_ciclo` (
  `cecid` int NOT NULL AUTO_INCREMENT,
  `cecod` char(3) DEFAULT NULL COMMENT 'Código del ciclo.',
  `cecnom` varchar(100) DEFAULT NULL COMMENT 'Nombre del ciclo.',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo al cual pertenece el ciclo.',
  PRIMARY KEY (`cecid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo_ciclo`
--

LOCK TABLES `tbl_centro_educativo_ciclo` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo_ciclo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_centro_educativo_ciclo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_centro_educativo_curso`
--

DROP TABLE IF EXISTS `tbl_centro_educativo_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_centro_educativo_curso` (
  `edcid` int NOT NULL AUTO_INCREMENT,
  `edccod` char(10) DEFAULT NULL COMMENT 'Código del curso del centro educativo.',
  `edcnom` varchar(200) DEFAULT NULL COMMENT 'Nombre del curso del centro educativo.',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario para saber que profesor es el director de curso.',
  PRIMARY KEY (`edcid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo_curso`
--

LOCK TABLES `tbl_centro_educativo_curso` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_centro_educativo_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_centro_educativo_estudiante`
--

DROP TABLE IF EXISTS `tbl_centro_educativo_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_centro_educativo_estudiante` (
  `ceeid` int NOT NULL AUTO_INCREMENT,
  `ceeprimer_nombre` varchar(45) DEFAULT NULL COMMENT 'Primer nombre del estudiante.',
  `ceesegundo_nombre` varchar(45) DEFAULT NULL COMMENT 'Segundo nombre del estudiante.',
  `ceeprimer_apellido` varchar(45) DEFAULT NULL COMMENT 'Primer apellido del estudiante.',
  `ceesegundo_apellido` varchar(45) DEFAULT NULL COMMENT 'Segundo apellido del estudiante.',
  `ceedocu` varchar(20) DEFAULT NULL COMMENT 'Número de documento del estudiante.',
  `ceecel` varchar(12) DEFAULT NULL COMMENT 'Número de celular del estudiante.',
  `tidid` int DEFAULT NULL COMMENT '[tbl_tipo_documento]: Id del tipo de documento.',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo al cual pertenece el estudiante.',
  PRIMARY KEY (`ceeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo_estudiante`
--

LOCK TABLES `tbl_centro_educativo_estudiante` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo_estudiante` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_centro_educativo_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_centro_educativo_salon`
--

DROP TABLE IF EXISTS `tbl_centro_educativo_salon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_centro_educativo_salon` (
  `cesid` int NOT NULL AUTO_INCREMENT,
  `cesnom` varchar(50) DEFAULT NULL COMMENT 'Nombre del salón',
  `cesnum` varchar(45) DEFAULT NULL COMMENT 'Número del salón.',
  `cedid` varchar(45) DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo al que pertenece el salón.',
  PRIMARY KEY (`cesid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo_salon`
--

LOCK TABLES `tbl_centro_educativo_salon` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo_salon` DISABLE KEYS */;
INSERT INTO `tbl_centro_educativo_salon` VALUES (1,'Harnold Shc','102','1'),(2,'Einstein','202','1');
/*!40000 ALTER TABLE `tbl_centro_educativo_salon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pais`
--

DROP TABLE IF EXISTS `tbl_pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pais` (
  `paiid` int NOT NULL AUTO_INCREMENT,
  `paicod` varchar(20) DEFAULT NULL COMMENT 'Código del pais.',
  `painom` varchar(100) DEFAULT NULL COMMENT 'Nombre del pais.',
  PRIMARY KEY (`paiid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pais`
--

LOCK TABLES `tbl_pais` WRITE;
/*!40000 ALTER TABLE `tbl_pais` DISABLE KEYS */;
INSERT INTO `tbl_pais` VALUES (1,'CO','Colombia');
/*!40000 ALTER TABLE `tbl_pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_rol`
--

DROP TABLE IF EXISTS `tbl_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_rol` (
  `rolid` int NOT NULL AUTO_INCREMENT,
  `rolcod` char(3) DEFAULT NULL COMMENT 'Código del rol: (EST)udiante, (DOC)ente, (REC)tor',
  `rolnom` varchar(20) DEFAULT NULL COMMENT 'Nombre del rol.',
  PRIMARY KEY (`rolid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_rol`
--

LOCK TABLES `tbl_rol` WRITE;
/*!40000 ALTER TABLE `tbl_rol` DISABLE KEYS */;
INSERT INTO `tbl_rol` VALUES (1,'EST','Estudiante'),(2,'DOC','Docente'),(3,'REC','Rector');
/*!40000 ALTER TABLE `tbl_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_rol_config_visual`
--

DROP TABLE IF EXISTS `tbl_rol_config_visual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_rol_config_visual` (
  `rcvid` int NOT NULL AUTO_INCREMENT,
  `rcvconfig` json DEFAULT NULL COMMENT 'Objeto con la configuración que se necesite para cada rol.',
  `rolid` int DEFAULT NULL COMMENT '[tbl_rol]: Id del rol al cual pertenece la configuración.',
  PRIMARY KEY (`rcvid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_rol_config_visual`
--

LOCK TABLES `tbl_rol_config_visual` WRITE;
/*!40000 ALTER TABLE `tbl_rol_config_visual` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_rol_config_visual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_documento`
--

DROP TABLE IF EXISTS `tbl_tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_documento` (
  `tidid` int NOT NULL AUTO_INCREMENT,
  `tidcod` char(10) DEFAULT NULL COMMENT 'Código del tipo de documento.',
  `tidnom` varchar(45) DEFAULT NULL COMMENT 'Nombre del tipo de documento.',
  PRIMARY KEY (`tidid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_documento`
--

LOCK TABLES `tbl_tipo_documento` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_documento` DISABLE KEYS */;
INSERT INTO `tbl_tipo_documento` VALUES (1,'CC','Cecula'),(2,'TI','Tarjeta de Identidad');
/*!40000 ALTER TABLE `tbl_tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_usuario`
--

DROP TABLE IF EXISTS `tbl_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuario` (
  `usuid` int NOT NULL AUTO_INCREMENT,
  `usunom` varchar(50) DEFAULT NULL COMMENT 'Nombre completo del usuario.',
  `usuemail` varchar(45) DEFAULT NULL COMMENT 'Correo del usuario.',
  `usupwd` text COMMENT 'Contraseña encriptada del usuario.',
  `usudocu` varchar(12) DEFAULT NULL COMMENT 'Número de documento del usuario.',
  `usucel` varchar(12) DEFAULT NULL COMMENT 'Número de celular delusuario.',
  `usufch_nacimiento` date DEFAULT NULL COMMENT 'Fecha de nacimiento del usuario.',
  `ceeid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_estudiante]: Id del centro educativo al cual pertenece el usuario en caso de que este registrado el estudiante en un centro educativo.',
  `tidid` int DEFAULT NULL COMMENT '[tbl_tipo_documento]: Id del tipo de documento.',
  `rolid` int DEFAULT NULL COMMENT '[tbl_rol]: Id del rol que tiene el usuario.',
  PRIMARY KEY (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuario`
--

LOCK TABLES `tbl_usuario` WRITE;
/*!40000 ALTER TABLE `tbl_usuario` DISABLE KEYS */;
INSERT INTO `tbl_usuario` VALUES (1,'Pepito Perez','pepito@gmail.com','$2b$10$Fl8ZbDqgLgmx6A15KQJ5A.wj8oW4LdwCPXH1cZwiXp0TXoOo7J8i6','1014477770','3107400954','2026-02-25',1,1,1),(2,'Pedro Tovar','pedro@gmail.com','$2b$10$Fl8ZbDqgLgmx6A15KQJ5A.wj8oW4LdwCPXH1cZwiXp0TXoOo7J8i6','1015678990','3108797654','2026-02-25',1,1,2),(3,'Edgar Lopez','edgar@gmail.com','$2b$10$Fl8ZbDqgLgmx6A15KQJ5A.wj8oW4LdwCPXH1cZwiXp0TXoOo7J8i6','1067890176','3145687890','2026-02-25',1,1,2);
/*!40000 ALTER TABLE `tbl_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cefcoc_dev'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_auth_login_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_auth_login_user`(
IN i_usuemail VARCHAR(45)
)
BEGIN

SET @_usuemail = (SELECT usuemail FROM tbl_usuario WHERE usuemail = i_usuemail);

SELECT
	usu.usuid AS usuid,
	usu.usunom AS usunom,
    usu.usuemail AS usuemail,
    rol.rolcod AS rolcod
FROM tbl_usuario usu
INNER JOIN
tbl_rol rol ON usu.rolid = rol.rolid
WHERE usuemail = @_usuemail;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_auth_register_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_auth_register_user`(
IN i_usunom VARCHAR(50),
IN i_usuemail VARCHAR(45),
IN i_usupwd TEXT,
IN i_usudocu VARCHAR(12),
IN i_usucel VARCHAR(12), 
IN i_usufch_nacimiento DATE,
IN i_ceeid INT,
IN i_tidid INT,
IN i_rolid INT
)
BEGIN

	INSERT INTO tbl_usuario(usunom, usuemail, usupwd, usudocu, usucel, usufch_nacimiento, ceeid, tidid, rolid)
    VALUES(i_usunom, i_usuemail, i_usupwd, i_usudocu, i_usucel, i_usufch_nacimiento, i_ceeid, i_tidid, i_rolid);
    
    SET @_usuid_inserted = LAST_INSERT_ID(); -- Obtiene el ultimo id insertado en la tabla.
    SELECT @_usuid_inserted AS usuid;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-01  2:26:55
