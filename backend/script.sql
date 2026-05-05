CREATE DATABASE  IF NOT EXISTS `cefcoc_dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cefcoc_dev`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 45.55.176.40    Database: cefcoc_dev
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

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
  `asgyear` year DEFAULT NULL COMMENT 'Año de la que es la asignatura.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario para saber que profesor dirige la clase.',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo para saber la asignatura a que centro educativo pertenece.',
  `cesid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_salon]: Id del salon del centro educativo, para saber en que salón se dicta la materia.',
  `edcid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_curso]: Id del curso del centro educativo para saber la asignatura a que cursop pertenece',
  PRIMARY KEY (`asgid`),
  KEY `edcid_idx` (`edcid`),
  KEY `cesid_idx` (`cesid`),
  KEY `usuid_idx` (`usuid`),
  KEY `fk_asignatura_cedid_idx` (`cedid`),
  CONSTRAINT `fk_asignatura_cedid` FOREIGN KEY (`cedid`) REFERENCES `tbl_centro_educativo` (`cedid`),
  CONSTRAINT `fk_asignatura_cesid` FOREIGN KEY (`cesid`) REFERENCES `tbl_centro_educativo_salon` (`cesid`),
  CONSTRAINT `fk_asignatura_edcid` FOREIGN KEY (`edcid`) REFERENCES `tbl_centro_educativo_curso` (`edcid`),
  CONSTRAINT `fk_asignatura_usuid` FOREIGN KEY (`usuid`) REFERENCES `tbl_usuario` (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura`
--

LOCK TABLES `tbl_asignatura` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura` DISABLE KEYS */;
INSERT INTO `tbl_asignatura` VALUES (1,'Ciencias','CIEN','XRTY09',2026,2,1,1,1),(2,'Matematicas','MATE','CRTY78',2026,2,1,2,1),(3,'Física','FISI','MJUY89',2026,2,1,2,2),(4,'Educacion Fisica','EDUC','MLOK78',2026,2,1,1,5),(5,'Tecnologia','TECN','TREY78',2026,2,1,1,5);
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
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario el cual pertenece la asistencia',
  `asgid` int DEFAULT NULL COMMENT '[tbl_asignatura]: Id de la asignatura de la cual se tomo la asitencia.',
  `cecid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_ciclo]: Id del centro educativo ciclo al cual pertenece la asistencia tomada.',
  PRIMARY KEY (`asiid`),
  KEY `usuid_idx` (`usuid`),
  KEY `fk_asignatura_asistencia_asgid_idx` (`asgid`),
  KEY `fk_asignatura_asistencia_cecid_idx` (`cecid`),
  CONSTRAINT `fk_asignatura_asistencia_asgid` FOREIGN KEY (`asgid`) REFERENCES `tbl_asignatura` (`asgid`),
  CONSTRAINT `fk_asignatura_asistencia_cecid` FOREIGN KEY (`cecid`) REFERENCES `tbl_centro_educativo_ciclo` (`cecid`),
  CONSTRAINT `fk_asignatura_asistencia_usuid` FOREIGN KEY (`usuid`) REFERENCES `tbl_usuario` (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_asistencia`
--

LOCK TABLES `tbl_asignatura_asistencia` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_asistencia` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_asistencia` VALUES (26,'P',NULL,'2026-05-02',2026,1,1,1),(27,'P',NULL,'2026-05-02',2026,4,1,1),(28,'T',NULL,'2026-05-01',2026,1,1,1),(29,'T',NULL,'2026-05-01',2026,4,1,1),(30,'E',NULL,'2026-04-30',2026,1,1,1),(31,'E',NULL,'2026-04-30',2026,4,1,1);
/*!40000 ALTER TABLE `tbl_asignatura_asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_asistencia_excusa`
--

DROP TABLE IF EXISTS `tbl_asignatura_asistencia_excusa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_asistencia_excusa` (
  `ateid` int NOT NULL AUTO_INCREMENT,
  `atenom` varchar(100) DEFAULT NULL COMMENT 'Nombre del archivo el cual se subio la excusa.',
  `asiid` int DEFAULT NULL COMMENT '[tbl_asignatura_asistencia]: Id de la asistencia para saber a que pertenece el archivo.',
  PRIMARY KEY (`ateid`),
  KEY `fk_asignatura_asistencia_excusa_asiid_idx` (`asiid`),
  CONSTRAINT `fk_asignatura_asistencia_excusa_asiid` FOREIGN KEY (`asiid`) REFERENCES `tbl_asignatura_asistencia` (`asiid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_asistencia_excusa`
--

LOCK TABLES `tbl_asignatura_asistencia_excusa` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_asistencia_excusa` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_asignatura_asistencia_excusa` ENABLE KEYS */;
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
  PRIMARY KEY (`accid`),
  KEY `fk_asignatura_calificacion_ciclo_asgid_idx` (`asgid`),
  KEY `fk_asignatura_calificacion_ciclo_cecid_idx` (`cecid`),
  KEY `fk_asignatura_calificacion_cilclo_usuid_idx` (`usuid`),
  CONSTRAINT `fk_asignatura_calificacion_ciclo_asgid` FOREIGN KEY (`asgid`) REFERENCES `tbl_asignatura` (`asgid`),
  CONSTRAINT `fk_asignatura_calificacion_ciclo_cecid` FOREIGN KEY (`cecid`) REFERENCES `tbl_centro_educativo_ciclo` (`cecid`),
  CONSTRAINT `fk_asignatura_calificacion_cilclo_usuid` FOREIGN KEY (`usuid`) REFERENCES `tbl_usuario` (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_calificacion_ciclo`
--

LOCK TABLES `tbl_asignatura_calificacion_ciclo` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_calificacion_ciclo` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_calificacion_ciclo` VALUES (1,4,'excelente','2026-03-04 04:13:03',1,1,4),(2,4,'excelente','2026-03-04 04:13:17',2,1,4),(5,5,'excelente',NULL,3,1,4),(6,5,'excelente',NULL,4,1,4),(7,5,'excelente',NULL,5,1,4);
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
  PRIMARY KEY (`ascid`),
  KEY `fk_centro_educativo_curso_edcid_idx` (`edcid`),
  KEY `fk_asignatura_curso_asgid_idx` (`asgid`),
  CONSTRAINT `fk_asignatura_curso_asgid` FOREIGN KEY (`asgid`) REFERENCES `tbl_asignatura` (`asgid`),
  CONSTRAINT `fk_asignatura_curso_edcid` FOREIGN KEY (`edcid`) REFERENCES `tbl_centro_educativo_curso` (`edcid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_curso`
--

LOCK TABLES `tbl_asignatura_curso` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_curso` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_curso` VALUES (1,'{\"color\": \"22c55e\", \"iconName\": \"person-coding\", \"backgroundName\": \"LargeTriangles\"}',1,1),(2,'{\"color\": \"14b8a6\", \"iconName\": \"sailor\", \"backgroundName\": \"WaveyFingerprint\"}',2,2),(3,'{\"color\": \"6b7280\", \"iconName\": \"rocket-launch\", \"backgroundName\": \"VanishingStripes\"}',1,3),(4,'{\"color\": \"fbbf24\", \"iconName\": \"bicycle\", \"backgroundName\": \"DragonScales\"}',1,4),(5,'{\"color\": \"7bffde\", \"iconName\": \"data-storage\", \"backgroundName\": \"BullseyeGradient\"}',1,5);
/*!40000 ALTER TABLE `tbl_asignatura_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_estudiante`
--

DROP TABLE IF EXISTS `tbl_asignatura_estudiante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_estudiante` (
  `aseid` int NOT NULL AUTO_INCREMENT,
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del estudiante al cual le pertenece la asignatura.',
  `asgid` int DEFAULT NULL COMMENT '[tbl_asignatura]: Id de la asignatura',
  PRIMARY KEY (`aseid`),
  KEY `fk_asignatura_estudiante_asgid_idx` (`asgid`),
  CONSTRAINT `fk_asignatura_estudiante_asgid` FOREIGN KEY (`asgid`) REFERENCES `tbl_asignatura` (`asgid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_estudiante`
--

LOCK TABLES `tbl_asignatura_estudiante` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_estudiante` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_estudiante` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,4,1),(7,4,2),(8,4,3),(9,4,4),(10,4,5);
/*!40000 ALTER TABLE `tbl_asignatura_estudiante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_asignatura_horario`
--

DROP TABLE IF EXISTS `tbl_asignatura_horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_asignatura_horario` (
  `ashid` int NOT NULL AUTO_INCREMENT,
  `ashdia` tinyint(1) DEFAULT NULL COMMENT 'Día que se dicta la clase en número. (1)Lunes, (2)Martes, (3)Miercoles, (4)Jueves, (5)Viernes, (6)Sabado, (7)Domingo',
  `ashhora` time DEFAULT NULL COMMENT 'Hora en la que se dicta la clase.',
  `asgid` int DEFAULT NULL COMMENT '[tbl_asignatura]: Id de la asignatura a la que pertenece el horario de la clase.',
  PRIMARY KEY (`ashid`),
  KEY `fk_asignatura_horario_asgid_idx` (`asgid`),
  CONSTRAINT `fk_asignatura_horario_asgid` FOREIGN KEY (`asgid`) REFERENCES `tbl_asignatura` (`asgid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_horario`
--

LOCK TABLES `tbl_asignatura_horario` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_horario` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_horario` VALUES (1,5,'18:00:00',1),(2,2,'11:00:00',2),(3,3,'10:00:00',3);
/*!40000 ALTER TABLE `tbl_asignatura_horario` ENABLE KEYS */;
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
  `astfecini` datetime DEFAULT NULL COMMENT 'Fecha inicial cuando inicia vigencia el trabajo.',
  `astfecfin` datetime DEFAULT NULL COMMENT 'Fecha final cuando se cierra el trabajo cuando es tipo ''TA''.',
  `astcomentario` varchar(200) DEFAULT NULL COMMENT 'Comentaro',
  `astpunt_max` int DEFAULT NULL COMMENT 'Puntaje maximo para calificar el trabajo.',
  `asttip` enum('TA','MA','EN') DEFAULT NULL COMMENT 'Tipo de trabajo: (TA)rea, (MA)terial, (EN)unciado',
  `astentardias` tinyint DEFAULT '1' COMMENT 'Permitir entregas despues de la fecha: (1) SI, (0) NO',
  `cecid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_ciclo]: Id del ciclo al que pertenece el trabajo.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario quien creo el trabajo. (Acá sería el id del profesor)',
  `asgid` int DEFAULT NULL COMMENT '[tbl_asignatura]: Id de la asignatura a la cual pertenece el trabajo.',
  PRIMARY KEY (`astid`),
  KEY `fk_asignatura_trabajo_cecid_idx` (`cecid`),
  KEY `fk_asignatura_trabajo_usuid_idx` (`usuid`),
  KEY `fk_asignatura_trabajo_asgid_idx` (`asgid`),
  CONSTRAINT `fk_asignatura_trabajo_asgid` FOREIGN KEY (`asgid`) REFERENCES `tbl_asignatura` (`asgid`),
  CONSTRAINT `fk_asignatura_trabajo_cecid` FOREIGN KEY (`cecid`) REFERENCES `tbl_centro_educativo_ciclo` (`cecid`),
  CONSTRAINT `fk_asignatura_trabajo_usuid` FOREIGN KEY (`usuid`) REFERENCES `tbl_usuario` (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo`
--

LOCK TABLES `tbl_asignatura_trabajo` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_trabajo` VALUES (1,'Resolver multiplicaciones','Resolver las multiplicaciones que se jaron en clase.','2026-02-20 00:00:00','2026-03-08 13:40:00',NULL,NULL,'TA',1,1,2,1),(2,'Test trabajo','Test de trabajo','2026-02-20 00:00:00','2026-03-10 23:59:00',NULL,NULL,'TA',1,1,2,1),(3,'Trabajo 1 Matematicas','Trabajo 1 de prueba','2026-02-20 00:00:00','2026-03-10 22:48:00',NULL,NULL,'TA',1,1,2,2),(4,'Trabajo 1 Física','Trabajo 1 de prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,NULL,'TA',1,1,2,3),(5,'Trabajo 1 Educación Física','Trabajo 1 Educación Física prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,NULL,'TA',1,1,2,4),(6,'Trabajo 1 Tecnologia','Trabajo 1 Tecnologia prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,NULL,'TA',1,1,2,5),(7,'Trabajo 2 Física','Trabajo 2 Física Prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,NULL,'TA',1,1,2,3),(8,'Trabajo 3 física','Trabajo 3 física','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,NULL,'TA',1,1,2,3),(9,'Trabajo 2 matematicas','Trabajo 2 matematicas Prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,NULL,'TA',1,1,2,3),(11,'Prueba Material Ciencias','Prueba Material Ciencias','2026-03-15 17:20:00',NULL,NULL,NULL,'MA',1,1,2,1),(12,'Prueba enunciado Ciencias','Prueba enunciado Ciencias','2026-03-15 17:20:00',NULL,NULL,NULL,'EN',1,1,2,1),(13,'Titulo de prueba desed el front','Una descripción','2026-03-26 14:28:00','2026-03-26 14:27:00',NULL,100,'TA',1,1,2,1),(14,'Traea 1 de prueba','Hacer la tarea propuesta','2026-03-28 19:55:00','2026-03-28 23:55:00',NULL,100,'TA',1,1,2,1),(15,'Traea 1 de prueba','Hacer la tarea propuesta','2026-03-28 19:55:00','2026-03-28 23:55:00',NULL,100,'TA',1,1,2,1),(16,'Dibujos plantas','Hacer los dicbujos de cada planata hablado en clase','2026-03-28 15:37:22','2026-03-31 21:43:00',NULL,99,'TA',1,1,2,1),(17,'Ejemplode manetrial creado desde el front','Prueba de material desde el front','2026-03-28 15:43:52',NULL,NULL,NULL,'MA',0,1,2,1),(18,'NO HAY CLASE','NO HAY CLASE','2026-03-28 15:44:35',NULL,NULL,NULL,'EN',0,1,2,1),(19,'Ultima prueba nav','ajdnajnd','2026-03-28 15:48:45','2026-03-12 15:50:00',NULL,100,'TA',1,1,2,1),(20,'ajndan','njandajndj','2026-03-28 15:51:02','2026-03-28 15:50:00',NULL,100,'TA',1,1,2,1),(21,'Prueba finalllllllllll','lmakmakam','2026-03-28 15:55:53','2026-03-31 20:00:00',NULL,100,'TA',1,1,2,1),(22,'klm,kmkm','kmkmkmkm','2026-03-28 15:57:49','2026-03-01 16:58:00',NULL,100,'TA',0,1,2,1),(23,'jandajkdnkajdn','klandkajldn','2026-03-28 16:02:27','2026-03-31 21:08:00',NULL,100,'TA',1,1,2,1),(24,'13761836781hjdfab fhjb','ajndbjadbhjabfhbf','2026-03-30 20:36:44','2026-03-31 22:37:00',NULL,100,'TA',1,1,2,1),(28,'evaluacion final','',NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL),(29,'evaluacion final','realizar la evaluaicon final','2026-04-14 23:54:26','2026-04-17 23:59:00',NULL,100,'TA',0,1,2,5),(36,'Test end','jajdnajdnjad','2026-04-15 11:31:26','2026-04-18 11:31:26',NULL,5,'TA',1,1,2,1),(37,'Test end','jajdnajdnjad','2026-04-15 11:31:26','2026-04-18 11:31:26',NULL,5,'TA',1,1,2,1),(38,'Test end','jajdnajdnjad','2026-04-15 11:31:26','2026-04-18 11:31:26',NULL,5,'TA',1,1,2,1),(39,'Test end','jajdnajdnjad','2026-04-15 11:31:26','2026-04-18 11:31:26',NULL,5,'TA',1,1,2,1),(40,'Test end','jajdnajdnjad','2026-04-15 11:31:26','2026-04-18 11:31:26',NULL,5,'TA',1,1,2,1),(41,'Prueba de guardado','Prueba de guardado final','2026-04-15 11:37:48','2026-04-30 11:42:00',NULL,3,'TA',1,1,2,1),(42,'parcial','parcial','2026-04-21 10:00:00','2026-04-26 23:59:00',NULL,5,'TA',0,1,2,2),(43,'Test','test','2026-05-04 10:14:00','2026-05-11 23:59:00',NULL,5,'TA',0,1,2,5);
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
  `atccalificacion` decimal(10,1) DEFAULT NULL COMMENT 'Calificación del trabajo que le hizo el profesor al estudiante.',
  `atccomentario` varchar(200) DEFAULT NULL COMMENT 'Comentario que dejo el profesor en caso de dejar comentario.',
  `atctimestamp` timestamp NULL DEFAULT NULL COMMENT 'Fecha y hora en la que el profesor dejo la calificación del trabajo.',
  `ateid` int DEFAULT NULL COMMENT '[tbl_asignatura_trabajo_entrega]: Id de la entrega del trabajo para saber a que trabajo pertenece la calificación.',
  PRIMARY KEY (`atcid`),
  KEY `fk_asignatura_trabajo_calificacion_ateid_idx` (`ateid`),
  CONSTRAINT `fk_asignatura_trabajo_calificacion_ateid` FOREIGN KEY (`ateid`) REFERENCES `tbl_asignatura_trabajo_entrega` (`ateid`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo_calificacion`
--

LOCK TABLES `tbl_asignatura_trabajo_calificacion` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_calificacion` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_trabajo_calificacion` VALUES (1,4.0,'Bien','2026-03-06 05:00:00',2),(2,2.9,'Mal','2026-03-06 05:00:00',3),(3,5.0,'Super','2026-03-06 05:00:00',4),(4,4.6,'Super','2026-03-06 05:00:00',5),(5,3.8,'Mas o menos','2026-03-06 05:00:00',6),(6,4.8,'Super','2026-03-06 05:00:00',7),(7,5.0,'Super','2026-03-06 05:00:00',8),(8,3.2,'Mmmm','2026-03-06 05:00:00',9),(12,3.5,'esfuerzate mas','2026-04-07 00:00:00',29);
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
  `astid` int DEFAULT NULL COMMENT '[tbl_asignatura_trabajo]: Id del trabajo de la asignatura para saber a que asignatura pertenece el trabajo.',
  PRIMARY KEY (`ateid`),
  KEY `fk_l_asignatura_trabajo_entrega_usuid_idx` (`usuid`),
  KEY `fk_asignatura_trabajo_entrega_astid_idx` (`astid`),
  CONSTRAINT `fk_asignatura_trabajo_entrega_astid` FOREIGN KEY (`astid`) REFERENCES `tbl_asignatura_trabajo` (`astid`),
  CONSTRAINT `fk_asignatura_trabajo_entrega_usuid` FOREIGN KEY (`usuid`) REFERENCES `tbl_usuario` (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo_entrega`
--

LOCK TABLES `tbl_asignatura_trabajo_entrega` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_entrega` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_trabajo_entrega` VALUES (1,NULL,NULL,'P',1,1),(2,'2026-03-13 00:00:00',NULL,'P',1,2),(3,'2026-03-06 00:00:00',NULL,'C',1,3),(4,'2026-03-06 00:00:00',NULL,'P',1,4),(5,'2026-03-06 00:00:00',NULL,'P',1,5),(6,'2026-03-06 00:00:00',NULL,'C',1,6),(7,'2026-03-06 00:00:00',NULL,'C',1,7),(8,'2026-03-06 00:00:00',NULL,'C',1,8),(9,'2026-03-06 00:00:00',NULL,'C',1,9),(10,NULL,NULL,'P',1,14),(11,NULL,NULL,'P',1,15),(12,NULL,NULL,'P',1,16),(13,NULL,NULL,'P',1,17),(14,NULL,NULL,'P',1,18),(15,NULL,NULL,'P',1,19),(16,NULL,NULL,'P',1,20),(17,NULL,NULL,'P',1,21),(18,NULL,NULL,'P',1,22),(19,NULL,NULL,'P',1,23),(20,NULL,NULL,'P',1,24),(21,'2026-04-27 07:25:01',NULL,'E',4,1),(22,'2026-04-27 07:25:01',NULL,'E',4,2),(23,'2026-04-26 07:25:01',NULL,'E',4,3),(24,'2026-04-28 07:28:01',NULL,'E',4,4),(25,'2026-04-22 07:25:01',NULL,'E',4,5),(26,'2026-04-20 07:25:01',NULL,'E',4,6),(27,'2026-04-27 07:25:01',NULL,'E',4,7),(28,'2026-04-07 00:00:00','mi tarea profesor','E',4,8),(29,'2026-04-07 00:00:00','mi tarea profesor','C',4,9),(31,'2026-04-27 07:25:01','mi tarea','E',4,14),(33,'2026-04-27 07:25:01','mi tarea','E',4,15),(34,'2026-04-14 23:56:18',NULL,'E',4,29),(35,NULL,NULL,'P',1,40),(36,NULL,NULL,'P',4,40),(37,NULL,NULL,'P',1,41),(38,NULL,NULL,'P',4,41),(39,'2026-04-19 00:52:51',NULL,'E',4,16),(40,NULL,NULL,'P',4,22),(41,NULL,NULL,'P',4,36);
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
  `cecid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_ciclo]: Id del centro educativo ciclo al cual pertenece el recurso.',
  PRIMARY KEY (`atrid`),
  KEY `fk_asignatura_trabajo_recurso_astid_idx` (`astid`),
  KEY `fk_asignatura_trabajo_recurso_ateid_idx` (`ateid`),
  KEY `fk_asignatura_trabajo_recurso_cecid_idx` (`cecid`),
  CONSTRAINT `fk_asignatura_trabajo_recurso_astid` FOREIGN KEY (`astid`) REFERENCES `tbl_asignatura_trabajo` (`astid`),
  CONSTRAINT `fk_asignatura_trabajo_recurso_ateid` FOREIGN KEY (`ateid`) REFERENCES `tbl_asignatura_trabajo_entrega` (`ateid`),
  CONSTRAINT `fk_asignatura_trabajo_recurso_cecid` FOREIGN KEY (`cecid`) REFERENCES `tbl_centro_educativo_ciclo` (`cecid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo_recurso`
--

LOCK TABLES `tbl_asignatura_trabajo_recurso` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_recurso` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_trabajo_recurso` VALUES (1,'\"nómina_de_personal_1014477770_04_02_2026-1774727875790-381475411\"',NULL,'A',14,NULL,NULL),(2,'\"nómina_de_personal_1014477770_03_03_2026-1774727875792-494016\"',NULL,'A',14,NULL,NULL),(3,'nómina_de_personal_1014477770_04_02_2026-1774727875790-381475411',NULL,'A',15,NULL,NULL),(4,'nómina_de_personal_1014477770_03_03_2026-1774727875792-494016',NULL,'A',15,NULL,NULL),(5,'profile-1774730242490-566012614',NULL,'A',16,NULL,NULL),(6,'test1-1774921004711-372382824',NULL,'A',24,NULL,NULL);
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
  PRIMARY KEY (`cedid`),
  KEY `fk_centro_educativo_paiid_idx` (`paiid`),
  CONSTRAINT `fk_centro_educativo_paiid` FOREIGN KEY (`paiid`) REFERENCES `tbl_pais` (`paiid`)
) ENGINE=InnoDB AUTO_INCREMENT=1862 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo`
--

LOCK TABLES `tbl_centro_educativo` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo` DISABLE KEYS */;
INSERT INTO `tbl_centro_educativo` VALUES (1,'IGE','COLEGIO AQUILEO PARRA (IED)','CP',1),(2,'SEL','COLEGIO AGUSTIN FERNANDEZ (IED)','CP',1),(3,'LNI','COLEGIO FRIEDRICH NAUMANN (IED)','CP',1),(4,'CIN','COLEGIO TOBERIN (IED)','CP',1),(5,'VHV','COLEGIO NUEVO HORIZONTE (IED)','CP',1),(6,'RIO','COLEGIO LA ESTRELLITA (IED)','CP',1),(7,'RRE','COLEGIO SALUDCOOP NORTE (IED)','CP',1),(8,'ABH','COLEGIO DE BACHILLERATO PATRIA','CP',1),(9,'SFI','FUNDACION LA ENSEÑANZA','CP',1),(10,'IIC','INSTITUTO PEDAGOGICO NACIONAL','CP',1),(11,'CIU','COLEGIO USAQUEN (IED)','CP',1),(12,'NCB','COLEGIO UNION COLOMBIA (IED)','CP',1),(13,'EER','COLEGIO DIVINO MAESTRO (IED)','CP',1),(14,'SLO','COLEGIO CRISTOBAL COLON (IED)','CP',1),(15,'ERN','COLEGIO GENERAL SANTANDER (IED)','CP',1),(16,'UIT','COLEGIO COLSUBSIDIO NORTE','CP',1),(17,'GAC','FUNDACION COLEGIO CLARA CASAS MORALES','CP',1),(18,'GTC','COLEGIO EUCARISTICO','CP',1),(19,'SCL','COLEGIO CALASANZ','CP',1),(20,'MUM','COLEGIO JOSE MANUEL MARROQUIN','CP',1),(21,'ADI','ESCUELA PEDAGOGICA EXPERIMENTAL','CP',1),(22,'EIV','CENTRO CULTURAL Y EDUCATIVO REYES CATOLICOS','CP',1),(23,'TRI','CENTRO SANTA MARIA','CP',1),(24,'AGI','COLEGIO FUNDACION LA PAZ','CP',1),(25,'FTN','JARDIN INFANTIL MI PATO CUA CUA','CP',1),(26,'CLE','LICEO ALTA BLANCA','CP',1),(27,'SLN','JARDIN INFANTIL PEQUEÑOS ENCANTOS','CP',1),(28,'TIE','JARDIN INFANTIL Y GUARDERIA COLORIN COLORAN','CP',1),(29,'CDT','LICEO PSICOPEDAGOGICO TIBABITA','CP',1),(30,'EIN','COLEGIO ANEXO SAN FRANCISCO DE ASIS','CP',1),(31,'RNC','JARDIN INFANTIL EL RINCON DEL TERCER PUENTE','CP',1),(32,'NEN','COLEGIO PENSAR ANDINO','CP',1),(33,'MEM','GIMNASIO MARROQUIN CAMPESTRE','CP',1),(34,'ECE','COLEGIO MARCO AURELIO NUMERIANO','CP',1),(35,'GRA','COLEGIO WESLEYANO DEL NORTE','CP',1),(36,'ECO','COLEGIO CIUDAD DE LOS CERROS','CP',1),(37,'COE','INSTITUTO COLOMBO SUECO','CP',1),(38,'GGI','GIMNASIO SAN ANGELO','CP',1),(39,'ALL','COLEGIO VILLA MAGDALA','CP',1),(40,'EPE','COLEGIO PIERRE DE FERMAT','CP',1),(41,'LSS','JARDIN INFANTIL CHARLY BROWN SAS','CP',1),(42,'HEN','COLEGIO RICHARD WAGNER','CP',1),(43,'MEO','GIMNASIO MONTEVERDE','CP',1),(44,'RTN','COLEGIO DE LA SANTISIMA EUCARISTIA','CP',1),(45,'GEO','COLEGIO PSICOPEDAGOGICO MARIE CURIE','CP',1),(46,'NOI','INSTITUTO AMERICANO DEL NORTE','CP',1),(47,'SAA','JARDIN INFANTIL AMIGOS PARA SIEMPRE','CP',1),(48,'EON','COLEGIO GEORGE WASHINGTON SCHOOL','CP',1),(49,'ASI','GIMNASIO LAS PALMAS','CP',1),(50,'JFC','JARDIN INFANTIL CASITA FELIZ','CP',1),(51,'APR','PREESCOLAR SANTA PAULA','CP',1),(52,'IIO','COLEGIO INFANTIL PSICOPEDAGOGICO CRECER','CP',1),(53,'AOO','GIMNASIO ALESSANDRO VOLTA','CP',1),(54,'IIR','GIMNASIO PIERRE FAURE','CP',1),(55,'GIS','COLEGIO RETOS','CP',1),(56,'JCI','JARDIN INFANTIL PACO Y TUTI','CP',1),(57,'INL','JARDIN INFANTIL STANFORD','CP',1),(58,'SRD','PREESCOLAR LOS ANDES','CP',1),(59,'OZA','TALLER DE APRENDIZAJE Y JUEGO CASITA FELIZ','CP',1),(60,'ROS','EL FARO PREESCOLAR','CP',1),(61,'NNT','TANDEM','CP',1),(62,'SOC','COLEGIO MONTERROSALES - CICLOS','CP',1),(63,'PGY','GIMNASIO PLEYADE','CP',1),(64,'SHS','INSTITUTO DANTE ALIGHIERI','CP',1),(65,'OII','INSTITUTO EL ROBLE','CP',1),(66,'RAV','QUALIA ALTERNATIVA EDUCATIVA','CP',1),(67,'WOG','COLEGIO WINDSOR','CP',1),(68,'LOA','COLEGIO ALEJANDRO MAGNO','CP',1),(69,'HGL','COLEGIO ALFRED MARSHALL','CP',1),(70,'PEN','COLEGIO HAPE HABILIDADES DEL PENSAMIENTO','CP',1),(71,'ITC','INSTITUCION EDUCATIVA W (WeDo)','CP',1),(72,'NIE','COLEGIO EN-CONEXION NORTE','CP',1),(73,'CAB','GIMNASIO PASCAL DE LA SABANA','CP',1),(74,'EOA','COLEGIO BILINGÜE KAJUYALI SCHOOL','CP',1),(75,'IIN','COLEGIO SAN BENITO DE TIBATI','CP',1),(76,'AOG','GIMNASIO DE LOS CERROS','CP',1),(77,'SME','COLEGIO CAMPESTRE SAN JOSE - CCSJ','CP',1),(78,'EIG','COLEGIO ANGLO AMERICANO','CP',1),(79,'IEC','GIMNASIO CAMPESTRE','CP',1),(80,'OEG','COLEGIO CASABLANCA','CP',1),(81,'AZA','COLEGIO PUREZA DE MARIA','CP',1),(82,'SNI','FUNDACION EDUCACIONAL ANA RESTREPO DEL CORRAL','CP',1),(83,'OIE','COLEGIO DEL SANTO ANGEL','CP',1),(84,'OIO','COLEGIO SANTO TOMAS DE AQUINO','CP',1),(85,'GCU','GIMNASIO CULTURAL LIBERTAD','CP',1),(86,'REN','COLEGIO TERESIANO','CP',1),(87,')CE','COLEGIO DE INGLATERRA (THE ENGLISH SCHOOL)','CP',1),(88,'PPP','GIMNASIO LOS PINOS','CP',1),(89,'CSE','COLEGIO DE NUESTRA SEÑORA DEL BUEN CONSEJO','CP',1),(90,'ISN','GIMNASIO FEMENINO','CP',1),(91,'INN','COLEGIO PROVINMA BILINGÜE','CP',1),(92,'LAL','COLEGIO MIGUEL ANTONIO CARO','CP',1),(93,'ONO','COLEGIO SANTA MARIA','CP',1),(94,'LCI','COLEGIO CARDENAL SANCHA','CP',1),(95,'OEO','COLEGIO ANGLO COLOMBIANO','CP',1),(96,'FEL','COLEGIO CALIFORNIA','CP',1),(97,'CCE','COLEGIO ITALIANO LEONARDO DA VINCI','CP',1),(98,'OAG','COLEGIO DE LA SALLE','CP',1),(99,'ADR','REDCOL - COLEGIO SANTA FRANCISCA ROMANA','CP',1),(100,'AEN','COLEGIO MARIA INMACULADA','CP',1),(101,'LEO','COLEGIO SAN CARLOS','CP',1),(102,'LON','COLEGIO DE LA PRESENTACION SANS FACON','CP',1),(103,'UOR','COLEGIO CLAUSTRO MODERNO','CP',1),(104,'SNS','GIMNASIO JOSE JOAQUIN CASAS - BILINGÜE NACIONAL','CP',1),(105,'ROL','LICEO DE CERVANTES','CP',1),(106,'TLM','COLEGIO MAYOR JOSE CELESTINO MUTIS','CP',1),(107,'EAA','COLEGIO CANAPRO','CP',1),(108,'UNE','JARDIN INFANTIL PERIQUITO','CP',1),(109,'AAL','COLEGIO DE LA REINA','CP',1),(110,'CLR','COLEGIO DE LAS RR ESCLAVAS DEL SAGRADO CORAZON DE JESUS','CP',1),(111,'LCS','COLEGIO COMUNAL LAS ORQUIDEAS','CP',1),(112,'LLI','JARDIN INFANTIL LAS PEQUEÑAS SEMILLAS','CP',1),(113,'IND','JARDIN INFANTIL AMERICANO','CP',1),(114,'SVA','COLEGIO GIOVANNI PASCOLI','CP',1),(115,'IID','LICEO ANDRES DIAZ VENERO DE LEIVA','CP',1),(116,'IOR','COLEGIO MARIA AUXILIADORA NORTE','CP',1),(117,'ÜEL','COLEGIO MONTERROSALES BILINGÜE','CP',1),(118,'SNM','COLEGIO SIMON RODRIGUEZ (IED)','CP',1),(119,'AMN','COLEGIO CAMPESTRE MONTE VERDE (IED)','CP',1),(120,'IRM','COLEGIO SAN MARTIN DE PORRES (IED)','CP',1),(121,'ROM','GIMNASIO MODERNO','CP',1),(122,'ROA','COLEGIO DEL ROSARIO DE SANTO DOMINGO','CP',1),(123,'IIL','COLEGIO JORDAN DE SAJONIA','CP',1),(124,'EOG','COLEGIO NUEVO GIMNASIO','CP',1),(125,'EEC','LICEO DE CERVANTES EL RETIRO','CP',1),(126,'OEI','COLEGIO DEL SAGRADO CORAZON DE JESUS BETHLEMITAS','CP',1),(127,'ONA','GIMNASIO LOS CIPRESES','CP',1),(128,'DPE','CENTRO DE ESTUDIOS PSICOPEDAGOGICOS','CP',1),(129,'UII','LICEO FRANCES LOUIS PASTEUR','CP',1),(130,'OAD','COLEGIO NUEVA GRANADA','CP',1),(131,'TIL','JARDIN INFANTIL CARRUSEL','CP',1),(132,'FAO','COLEGIO FILADELFIA','CP',1),(133,'ORO','COLEGIO INTEGRAL','CP',1),(134,'RIL','JARDIN INFANTIL TALLER DE ARTE ARCO IRIS','CP',1),(135,'AIA','POLITECNICO UNIVERSAL DE CAPACITACION UNICAP','CP',1),(136,'EFV','COLEGIO FUNDACION NUEVA GRANADA','CP',1),(137,'GIL','COLEGIO UNILATINA','CP',1),(138,'EOC','COLEGIO KUEPA','CP',1),(139,'TET','ARETE','CP',1),(140,'LAA','COLEGIO POLICARPA SALAVARRIETA (IED)','CP',1),(141,'TNE','COLEGIO EXTERNADO NACIONAL CAMILO TORRES (IED)','CP',1),(142,'LNS','COLEGIO AULAS COLOMBIANAS SAN LUIS (IED)','CP',1),(143,'COO','COLEGIO JORGE SOTO DEL CORRAL (IED)','CP',1),(144,'NAJ','COLEGIO ANTONIO JOSE URIBE (IED)','CP',1),(145,'GOO','COLEGIO MANUEL ELKIN PATARROYO (IED)','CP',1),(146,'GAG','COLEGIO LA GIRALDA (IED)','CP',1),(147,'JNV','COLEGIO EL VERJON (IED)','CP',1),(148,'DOO','COLEGIO DE MARIA AUXILIADORA','CP',1),(149,'EOM','COLEGIO RAMON B JIMENO','CP',1),(150,'IOI','COLEGIO SIGLO XXI','CP',1),(151,'STT','INSTITUTO SAN BERNARDO DE LA SALLE','CP',1),(152,'EIO','COLEGIO SAN BARTOLOME LA MERCED','CP',1),(153,'ROO','COLEGIO DE LAS MERCEDES','CP',1),(154,'OEC','LICEO MATER DEI','CP',1),(155,'GGC','COLEGIO LOS PINOS (IED)','CP',1),(156,'AGC','COLEGIO DE SALERNO','CP',1),(157,'TNO','CENTRO EDUCATIVO DE LA A.C.F. JULIA RONCANCIO','CP',1),(158,'PBO','CENTRO DE CAPACITACION BOLIVAR - CENCABO','CP',1),(159,'NRL','COLEGIO CORPORACION IBEROAMERICANA','CP',1),(160,'LBV','COLEGIO UNIVERSITARIA DE COLOMBIA','CP',1),(161,'NNH','COLEGIO BENPOSTA NACION DE MUCHACHOS','CP',1),(162,'IRO','COLEGIO SALESIANO JUAN DEL RIZZO','CP',1),(163,'(E(','COLEGIO GRAN COLOMBIA (CED)','CP',1),(164,'NLJ','COLEGIO VEINTE DE JULIO (IED)','CP',1),(165,'IEP','COLEGIO PANTALEON GAITAN PEREZ (CED)','CP',1),(166,'LEN','COLEGIO SAN JOSE SUR ORIENTAL (IED)','CP',1),(167,'BGU','COLEGIO JUANA ESCOBAR (IED)','CP',1),(168,'DAC','COLEGIO AGUAS CLARAS (CED)','CP',1),(169,'ACI','COLEGIO ALTAMIRA SUR ORIENTAL (IED)','CP',1),(170,'GLT','COLEGIO TECNICO SAN CRISTOBAL SUR (IED)','CP',1),(171,'ELO','COLEGIO JOSE ACEVEDO Y GOMEZ (IED)','CP',1),(172,'EEE','COLEGIO MONTEBELLO (IED)','CP',1),(173,'GLG','COLEGIO LOS ALPES (IED)','CP',1),(174,'IBO','COLEGIO LA BELLEZA LOS LIBERTADORES (IED)','CP',1),(175,'OIL','COLEGIO JOSE MARIA CARBONELL (IED)','CP',1),(176,'OAN','COLEGIO ATENAS (IED)','CP',1),(177,'OOE','COLEGIO JOSE JOAQUIN CASTRO MARTINEZ (IED)','CP',1),(178,'ORG','COLEGIO EL RODEO (IED)','CP',1),(179,'NNR','COLEGIO FRANCISCO JAVIER MATIZ (IED)','CP',1),(180,'AOI','COLEGIO LA VICTORIA (IED)','CP',1),(181,'NOC','COLEGIO SAN ISIDRO SUR ORIENTAL (IED)','CP',1),(182,'VAV','COLEGIO AVE MARIA','CP',1),(183,'ENE','COLEGIO ENTRE NUBES SUR ORIENTAL (IED)','CP',1),(184,'TEO','COLEGIO MORALBA SURORIENTAL (IED)','CP',1),(185,'OLE','COLEGIO FLORENTINO GONZALEZ (IED)','CP',1),(186,'TZE','COLEGIO MANUELITA SAENZ (IED)','CP',1),(187,'UFI','COLEGIO ALEMANIA UNIFICADA (IED)','CP',1),(188,'ORR','COLEGIO TECNICO TOMAS RUEDA VARGAS (IED)','CP',1),(189,'REL','COLEGIO REPUBLICA DEL ECUADOR (IED)','CP',1),(190,'JIG','COLEGIO JUAN REY (IED)','CP',1),(191,'OOC','COLEGIO TECNICO JOSE FELIX RESTREPO (IED)','CP',1),(192,'LAG','COLEGIO JUAN EVANGELISTA GOMEZ (IED)','CP',1),(193,'GVG','COLEGIO NUEVA DELHI (IED)','CP',1),(194,'CAA','COLEGIO EL MANANTIAL (CED)','CP',1),(195,'OIA','COLEGIO RAFAEL NUÑEZ (IED)','CP',1),(196,'ENU','COLEGIO NUEVA ROMA (IED)','CP',1),(197,'EAE','COLEGIO SAN VICENTE (IED)','CP',1),(198,'RCA','COLEGIO TECNICO ALDEMAR ROJAS PLAZAS (IED)','CP',1),(199,'ECR','COLEGIO GLORIA VALENCIA DE CASTAÑO (IED)','CP',1),(200,'TTR','JARDIN INFANTIL Y GUARDERIA BETANIA','CP',1),(201,'OIN','COLEGIO NUEVA GENERACION ALTAMIRA - CONGA','CP',1),(202,'LEG','COLEGIO BILINGÜE SAN JUAN DE DIOS','CP',1),(203,'OLO','COLEGIO SOLIS','CP',1),(204,'ELR','COLEGIO INTERAMERICANO','CP',1),(205,'VGR','COLEGIO PARROQUIAL ADVENIAT','CP',1),(206,'EEM','CENTRO COMERCIAL MADRE ELISA RONCALLO','CP',1),(207,'OSC','COLEGIO ISAAC NEWTON','CP',1),(208,'ULA','COLEGIO DE NUESTRA SEÑORA DEL PILAR SUR','CP',1),(209,'IES','INSTITUTO CARMENZA DE SANCHEZ','CP',1),(210,'JGE','COLEGIO SAN JUAN BOSCO','CP',1),(211,'RIR','COLEGIO SUR ORIENTAL PANAMERICANO','CP',1),(212,'HJN','COLEGIO SAN JUAN VIANETH','CP',1),(213,'ALI','COLEGIO NUEVA ALIANZA INTEGRAL','CP',1),(214,'RRN','COLEGIO SANTA CATALINA DEL SUR ORIENTE','CP',1),(215,'MER','COLEGIO MADRE PAULA MONTAL','CP',1),(216,'LIL','COLEGIO PRINCIPE DE PAZ','CP',1),(217,'JYR','JARDIN INFANTIL PATTY','CP',1),(218,'TEA','INSTITUTO ACADEMICO LA PAZ','CP',1),(219,'LIC','LICEO INFANTIL MIS PEQUEÑOS SALTARINES','CP',1),(220,'ORA','LICEO INTEGRAL SAN AGUSTIN','CP',1),(221,'DEE','LICEO SENDERO DEL SABER','CP',1),(222,'NJC','LICEO SAN JOSE ORIENTAL','CP',1),(223,'RTS','COLEGIO CARLOS CASTRO SAAVEDRA','CP',1),(224,'NSC','LICEO LAS COLUMNAS','CP',1),(225,'OOA','COLEGIO EUGENIA RAVASCO','CP',1),(226,'TLU','INSTITUTO PSICOPEDAGOGICO FLANDES','CP',1),(227,'LAS','COLEGIO INTEGRAL AVANCEMOS','CP',1),(228,'APL','COLEGIO URAPANES','CP',1),(229,'AAI','COLEGIO VILLA DE LA GAITANA','CP',1),(230,'ELL','LICEO MI VIVIR MAGICO','CP',1),(231,'GOL','LICEO PSICOPEDAGOGICO MIS PRIMEROS AÑOS','CP',1),(232,'UTL','INSTITUTO COMERCIAL EDUARDO TORRES QUINTERO','CP',1),(233,'PFL','JARDIN INFANTIL PAOLA ISABEL','CP',1),(234,'DLG','JARDIN INFANTIL EL CASTILLO MAGICO','CP',1),(235,'SGI','GIMNASIO SOSIEGO','CP',1),(236,'CCN','LICEO EL ENCANTO','CP',1),(237,'LOL','COLEGIO LORENZO DE ALCANTUZ','CP',1),(238,'LIE','COLEGIO JOSE PRUDENCIO PADILLA','CP',1),(239,'CCC','JARDIN INFANTIL SOL SOLECITO SUR ORIENTAL','CP',1),(240,'NLO','LICEO SANTILLANA','CP',1),(241,'SNA','GIMNASIO NUESTRA SEÑORA DE LA ESPERANZA','CP',1),(242,'OFR','LICEO INFANTIL NUEVOS FUNDADORES','CP',1),(243,'SPC','GIMNASIO CAMPUS PAMPURI','CP',1),(244,'NEL','LICEO INTEGRAL VALENTINA','CP',1),(245,'NNA','JARDIN INFANTIL PEQUEÑAS MARAVILLAS','CP',1),(246,'AML','LICEO INFANTIL MIS PRIMEROS LOGROS','CP',1),(247,'NIO','COLEGIO SAN MATEO SUR ORIENTAL','CP',1),(248,'OMB','LICEO LUDICO NUEVA COLOMBIA','CP',1),(249,'ANL','LICEO MODERNO PINARES','CP',1),(250,'LII','LICEO CAROLINA MONSALVE','CP',1),(251,'ANB','MARIA BELEN DE SAN JOSE','CP',1),(252,'AUO','INSTITUTO DE EDUCACION FORMAL DE ADULTOS EL PENSAMIENTO DE PITAGORAS','CP',1),(253,'DIF','FUNDACION DE EDUCACION PARA LA VIDA FUNDESCO','CP',1),(254,'ECA','GIMNASIO PEDAGOGICO PIAGET','CP',1),(255,'EAC','LICEO SANTA ANA SUR','CP',1),(256,'ILM','COLEGIO MARIO LUIS RODRIGUEZ COBOS','CP',1),(257,'RBO','COLEGIO SUPERIOR DE SAN CRISTOBAL','CP',1),(258,'IRE','JARDIN INFANTIL EL REINO DE LOS NIÑOS','CP',1),(259,'UOO','GIMNASIO PSICOPEDAGOGICO EL CLUB DE LOS NIÑOS','CP',1),(260,'CLL','LICEO DE LOS ALPES','CP',1),(261,'SLE','COLEGIO MONSEÑOR BERNARDO SANCHEZ HERMANAS DE NUESTRA SEÑORA DE LA PAZ','CP',1),(262,'LBA','COLEGIO SANTA LIBRADA (IED)','CP',1),(263,'TGO','COLEGIO SANTA MARTHA (IED)','CP',1),(264,'EOO','COLEGIO ORLANDO FALS BORDA (IED)','CP',1),(265,'ZRP','COLEGIO NUEVA ESPERANZA (IED)','CP',1),(266,'TNC','COLEGIO ESTANISLAO ZULETA (IED)','CP',1),(267,'BIL','COLEGIO PROVINCIA DE QUEBEC (IED)','CP',1),(268,'OWC','COLEGIO LOS COMUNEROS - OSWALDO GUAYASAMIN (IED)','CP',1),(269,'OOO','COLEGIO LA AURORA (IED)','CP',1),(270,'SGD','COLEGIO NUEVO SAN ANDRES DE LOS ALTOS (IED)','CP',1),(271,'OTB','COLEGIO ATABANZHA (IED)','CP',1),(272,'ONN','COLEGIO USMINIA (IED)','CP',1),(273,'OFE','COLEGIO OFELIA URIBE DE ACOSTA (IED)','CP',1),(274,'MLM','COLEGIO BRASILIA - USME (IED)','CP',1),(275,'EEO','COLEGIO EL VIRREY JOSE SOLIS (IED)','CP',1),(276,'AMA','COLEGIO MIGUEL DE CERVANTES SAAVEDRA (IED)','CP',1),(277,'NEO','COLEGIO CHUNIZA (IED)','CP',1),(278,'NOO','COLEGIO FERNANDO GONZALEZ OCHOA (IED)','CP',1),(279,'GSI','COLEGIO SAN CAYETANO (IED)','CP',1),(280,'OIU','COLEGIO SAN JOSE DE USME (IED)','CP',1),(281,'GZH','COLEGIO CHUNIZA FAMACO (IED)','CP',1),(282,'UAG','COLEGIO LUIS EDUARDO MORA OSEJO (IED)','CP',1),(283,'ELA','COLEGIO MIRAVALLE (IED)','CP',1),(284,'IIS','COLEGIO JUAN LUIS LONDOÑO (IED)','CP',1),(285,'DZO','COLEGIO EDUARDO UMAÑA MENDOZA (IED)','CP',1),(286,'OCÑ','COLEGIO DIEGO MONTAÑA CUELLAR (IED)','CP',1),(287,'ADN','COLEGIO CIUDAD DE VILLAVICENCIO (IED)','CP',1),(288,'ICF','COLEGIO PAULO FREIRE (IED)','CP',1),(289,'SOE','COLEGIO JOSE EUSTASIO RIVERA (IED)','CP',1),(290,'OEE','COLEGIO CIUDAD CHENGDU (IED)','CP',1),(291,'OTE','COLEGIO FRANCISCO ANTONIO ZEA DE USME (IED)','CP',1),(292,'LRN','COLEGIO EL CORTIJO - VIANEY (IED)','CP',1),(293,'PCC','COLEGIO ALMIRANTE PADILLA (IED)','CP',1),(294,'EIC','COLEGIO LOS TEJARES (IED)','CP',1),(295,'DCG','COLEGIO FEDERICO GARCIA LORCA (IED)','CP',1),(296,'ORQ','COLEGIO GABRIEL GARCIA MARQUEZ (IED)','CP',1),(297,'IDA','COLEGIO RURAL LA UNION USME (CED)','CP',1),(298,'AOS','COLEGIO GRAN YOMASA (IED)','CP',1),(299,'LO(','COLEGIO RURAL OLARTE (CED)','CP',1),(300,'GEE','COLEGIO RURAL LOS ANDES (CED)','CP',1),(301,')YN','COLEGIO RURAL LOS ARRAYANES (CED)','CP',1),(302,'RAN','COLEGIO RURAL LA ARGENTINA (CED)','CP',1),(303,'LIO','COLEGIO TENERIFE - GRANADA SUR (IED)','CP',1),(304,'D)E','COLEGIO RURAL CHIZACA (CED)','CP',1),(305,'TOU','COLEGIO RURAL EL CURUBITAL (CED)','CP',1),(306,'IGG','COLEGIO EL DESTINO (IED)','CP',1),(307,'U(U','COLEGIO RURAL EL HATO (CED)','CP',1),(308,'IUR','COLEGIO BRAZUELOS (IED)','CP',1),(309,'VVA','COLEGIO EL UVAL (IED)','CP',1),(310,'OI)','COLEGIO RURAL LA MAYORIA (CED)','CP',1),(311,'CDO','COLEGIO RURAL LAS MERCEDES (CED)','CP',1),(312,'AAA','COLEGIO FABIO LOZANO SIMONELLI (IED)','CP',1),(313,'ALV','LICEO NUEVA COLOMBIA','CP',1),(314,'SEA','COLEGIO SANTA LIBRADA','CP',1),(315,'UAE','LICEO SANTA ANA DEL SUR','CP',1),(316,'OLN','COLEGIO CENTRO CULTURAL','CP',1),(317,'OLI','COLEGIO CIUDAD BOLIVAR','CP',1),(318,'DSO','COLEGIO SAN ISIDRO','CP',1),(319,'ZAL','LICEO ADOLFO LEON GOMEZ','CP',1),(320,'RGR','COLEGIO SAN GREGORIO HERNANDEZ','CP',1),(321,'ONR','COLEGIO ISIDRO MOLINA','CP',1),(322,'JLN','COLEGIO JUAN RULFO','CP',1),(323,'NVJ','LICEO JUAN VERDEJO','CP',1),(324,'UOS','COLEGIO SAN JUAN DE LOS PASTOS','CP',1),(325,'ACP','LICEO MAX PLANCK','CP',1),(326,'TLA','INSTITUTO SUSANA WESLEY','CP',1),(327,'COB','COLEGIO ANDRES ESCOBAR','CP',1),(328,'SSN','INSTITUTO EL INGENIOSO HIDALGO','CP',1),(329,'CMS','COLEGIO SAN MARINO','CP',1),(330,'ALZ','COLEGIO SANTA MARIA DE LA PAZ','CP',1),(331,'OCS','LICEO INFANTIL POUSSEPIN','CP',1),(332,'ORI','COLEGIO PSICOPEDAGOGICO VILLAVERDE','CP',1),(333,'LAE','LICEO COMERCIAL NUEVO ALEJANDRINO','CP',1),(334,'TUL','COLEGIO EL TRIUNFO','CP',1),(335,'LOI','LICEO MARIA NELL','CP',1),(336,'ILA','COLEGIO ALFONSO LOPEZ PUMAREJO','CP',1),(337,'RCO','COLEGIO ARIEL DAVID','CP',1),(338,'GCE','COLEGIO CRISTIANO ELOHIM','CP',1),(339,'UAO','LICEO LATINOAMERICANO DEL SUR','CP',1),(340,'SPA','LICEO PSICOPEDAGOGICO EL PARAISO INFANTIL','CP',1),(341,'CCV','COLEGIO SANTA ISABEL DEL VIRREY','CP',1),(342,'AIS','COLEGIO PSICOPEDAGOGICO PILARES DE LA PAZ','CP',1),(343,'EOE','COLEGIO SOLEDAD SAMPER','CP',1),(344,'IEL','COLEGIO PSICOPEDAGOGICO MONSEÑOR JAIME ALBERTO BONILLA NIETO','CP',1),(345,'DST','INSTITUTO PEDAGOGICO LA REAL SOCIEDAD','CP',1),(346,'SJF','JARDIN INFANTIL CASITA DEL SOL','CP',1),(347,'IIM','GIMNASIO DE TOLEDO','CP',1),(348,'CEM','LICEO MARANATA','CP',1),(349,'RRT','COLEGIO CENTRO INTEGRAL JOSE MARIA CORDOBA (IED)','CP',1),(350,'CEC','COLEGIO VENECIA (IED)','CP',1),(351,'III','COLEGIO INSTITUTO TECNICO INDUSTRIAL PILOTO (IED)','CP',1),(352,'OUE','COLEGIO RAFAEL URIBE URIBE (IED)','CP',1),(353,'MFO','COLEGIO MARCO FIDEL SUAREZ (IED)','CP',1),(354,'OLA','COLEGIO CIUDAD DE BOGOTA (IED)','CP',1),(355,'SLS','COLEGIO RUFINO JOSE CUERVO (IED)','CP',1),(356,'CRL','COLEGIO INEM SANTIAGO PEREZ (IED)','CP',1),(357,'LOJ','COLEGIO BERNARDO JARAMILLO (IED)','CP',1),(358,'OCI','COLEGIO ISLA DEL SOL (IED)','CP',1),(359,'SAI','COLEGIO SAN CARLOS (IED)','CP',1),(360,'BEB','COLEGIO SAN BENITO ABAD (IED)','CP',1),(361,'C(E','LICEO DEL EJERCITO PATRIA SECTOR SUR C (SANTA BARBARA)','CP',1),(362,'UTR','COLEGIO NUESTRA SEÑORA DE LAS VICTORIAS','CP',1),(363,'IOG','COLEGIO DIEGO COLON','CP',1),(364,'ADO','GIMNASIO PEDAGOGICO NUESTRA SEÑORA DE FATIMA','CP',1),(365,'GSR','COLEGIO PARROQUIAL SAN CARLOS','CP',1),(366,'SUO','FUNDACION INSTITUTO TECNOLOGICO DEL SUR','CP',1),(367,'NUÑ','COLEGIO NUESTRA SEÑORA DE FATIMA POLINAL','CP',1),(368,'OGG','COLEGIO PEDRO DE HEREDIA','CP',1),(369,'REI','EXTERNADO PORFIRIO BARBA JACOB','CP',1),(370,'INA','COLEGIO SANTA CECILIA DE TUNJUELITO','CP',1),(371,'GRI','COLEGIO COOPERATIVO VENECIA','CP',1),(372,'DML','COLEGIO MENDEZ','CP',1),(373,'MAE','LICEO CAMPESTRE CAFAM','CP',1),(374,'IOV','COLEGIO COOPERATIVO NUEVO MUZU','CP',1),(375,'OPB','COLEGIO PRO COLOMBIANO','CP',1),(376,'CNA','GIMNASIO COMERCIAL LOS ANDES','CP',1),(377,'MCL','LICEO DAMFUS','CP',1),(378,'SIE','JARDIN INFANTIL MIS PRIMEROS PASOS','CP',1),(379,'JOD','JARDIN INFANTIL SOLDADITOS','CP',1),(380,'FRD','JARDIN INFANTIL LA ISLA DEL SOL','CP',1),(381,'AMC','COLEGIO INTERNACIONAL CAMINO A LA CIMA','CP',1),(382,'ODA','LICEO CAMPO DAVID','CP',1),(383,'AAF','COLEGIO SAN JOSE DE CAFASSO','CP',1),(384,'ION','COLEGIO PEDAGOGICO JUAN JOSE NEIRA','CP',1),(385,'DSG','COLEGIO PSICOPEDAGOGICO PROCESOS CREATIVOS','CP',1),(386,'BIS','LICEO SANTA BERNARDITA','CP',1),(387,'NYL','CENTRO EDUCATIVO EL ELYON','CP',1),(388,'OAA','COLEGIO PSICOPEDAGOGICO ARNOLD GESELL','CP',1),(389,'REA','LICEO PSICOPEDAGOGICO EL TEOREMA DE APRENDER','CP',1),(390,'SOS','COLEGIO PASTORCITOS DE FATIMA','CP',1),(391,'IUO','LICEO INFANTIL MI NUEVO MUNDO ENCANTADO','CP',1),(392,'JTD','JARDIN INFANTIL MIS PEQUEÑOS TIMPANITOS','CP',1),(393,'EEL','LICEO INTEGRAL SAN CARLOS','CP',1),(394,'BÜU','INSTITUTO BILINGÜE DEL SUR','CP',1),(395,'IRN','JARDIN INFANTIL CARRUSEL DE COLORES','CP',1),(396,'EIL','COLEGIO ITEC','CP',1),(397,'NLC','COLEGIO INCADE','CP',1),(398,'ECI','COLEGIO BRITANICO','CP',1),(399,'ITL','JARDIN INFANTIL CONSTRUYENDO CON GEPETTO','CP',1),(400,'IOS','CENTRO EDUCATIVO SURAMERICANO','CP',1),(401,'ETA','COLEGIO TECNISISTEMAS','CP',1),(402,'CRA','CENTRO EDUCATIVO INTEGRAL LATINOAMERICANO - CEIL','CP',1),(403,'LBN','POLITECNICA COLOMBIANA','CP',1),(404,'MNT','COLEGIO DE LA PRESENTACION DE FATIMA','CP',1),(405,'ILH','COLEGIO CARLOS ALBAN HOLGUIN (IED)','CP',1),(406,'GBE','COLEGIO CEDID SAN PABLO (IED)','CP',1),(407,'ECU','COLEGIO NUEVO CHILE (IED)','CP',1),(408,'BRA','COLEGIO BRASILIA - BOSA (IED)','CP',1),(409,'MOT','COLEGIO MOTORISTA (CED)','CP',1),(410,'LGL','COLEGIO GRANCOLOMBIANO (IED)','CP',1),(411,'GNJ','COLEGIO JOSE ANTONIO GALAN (IED)','CP',1),(412,'ARN','COLEGIO LLANO ORIENTAL (IED)','CP',1),(413,'OCG','COLEGIO LA CONCEPCION (IED)','CP',1),(414,'IZS','COLEGIO LA ESPERANZA (IED)','CP',1),(415,'CGC','COLEGIO LOS NARANJOS (IED)','CP',1),(416,'OGL','COLEGIO ARGELIA (IED)','CP',1),(417,'AAS','COLEGIO SANTIAGO DE LAS ATALAYAS (IED)','CP',1),(418,'IGA','COLEGIO SAN IGNACIO (IED)','CP',1),(419,'EZA','COLEGIO LEONARDO POSADA PEDRAZA (IED)','CP',1),(420,'NAS','COLEGIO ALFONSO REYES ECHANDIA (IED)','CP',1),(421,'ONC','COLEGIO ORLANDO HIGUITA ROJAS (IED)','CP',1),(422,'PEO','COLEGIO CARLOS PIZARRO LEON GOMEZ (IED)','CP',1),(423,'EOI','COLEGIO ALFONSO LOPEZ MICHELSEN (IED)','CP',1),(424,'ARA','COLEGIO JOSE FRANCISCO SOCARRAS (IED)','CP',1),(425,'OGE','COLEGIO GERMAN ARCINIEGAS (IED)','CP',1),(426,'ONI','COLEGIO KIMI PERNIA DOMICO (IED)','CP',1),(427,'EIE','COLEGIO CIUDADELA EDUCATIVA DE BOSA (IED)','CP',1),(428,'LZO','COLEGIO DEBORA ARANGO PEREZ (IED)','CP',1),(429,'JGO','COLEGIO JORGE ISAACS (IED)','CP',1),(430,'ADE','COLEGIO SOLEDAD ACOSTA DE SAMPER (IED)','CP',1),(431,'OID','COLEGIO BICENTENARIO DE LA INDEPENDENCIA (IED)','CP',1),(432,'OGC','COLEGIO DE LA BICI (IED)','CP',1),(433,'TGG','COLEGIO PARQUES DE BOGOTA (IED)','CP',1),(434,'OEA','COLEGIO LAUREL DE CERA (IED)','CP',1),(435,'RAI','COLEGIO ESMERALDA ARBOLEDA CADAVID (IED)','CP',1),(436,'SRO','COLEGIO CIUDADELA EL RECREO SONIA OSORIO DE SAINT-MALO (IED)','CP',1),(437,'ERR','COLEGIO LAURA HERRERA DE VARELA (IED)','CP',1),(438,'ESZ','COLEGIO LUIS LOPEZ DE MESA (IED)','CP',1),(439,'OTL','COLEGIO PABLO DE TARSO (IED)','CP',1),(440,'AFA','COLEGIO FRANCISCO DE PAULA SANTANDER (IED)','CP',1),(441,'ELE','COLEGIO FERNANDO MAZUERA VILLEGAS (IED)','CP',1),(442,'ABB','COLEGIO PORFIRIO BARBA JACOB (IED)','CP',1),(443,'EGS','COLEGIO VILLAS DEL PROGRESO (IED)','CP',1),(444,'DNE','COLEGIO SAN BERNARDINO (IED)','CP',1),(445,'EEG','COLEGIO EL PORVENIR (IED)','CP',1),(446,'OAS','COLEGIO BOSANOVA (IED)','CP',1),(447,'ONT','LICEO ANTONIO BOLAÑOS','CP',1),(448,'NVO','COLEGIO MIXTO VILLA CAROLINA EU','CP',1),(449,'ILE','LICEO CULTURAL LUIS ENRIQUE OSORIO','CP',1),(450,'DOE','COLEGIO COMUNITARIO NOCTURNO DE BACHILLERATO LA LIBERTAD','CP',1),(451,'AIL','INSTITUTO GERARDO VALENCIA CANO','CP',1),(452,'AAE','LICEO CIUDAD CAPITAL','CP',1),(453,'LOO','COLEGIO BILINGÜE REINO UNIDO','CP',1),(454,'CAI','GIMNASIO SANTA ROCIO','CP',1),(455,'DSA','COLEGIO ANDRES ROSILLO','CP',1),(456,'IAN','GIMNASIO INFANTIL YAYITA','CP',1),(457,'ERE','LICEO DE OXFORD','CP',1),(458,'IIA','INSTITUTO ALVARO MUTIS','CP',1),(459,'ICT','COLEGIO MIXTO CIUDADANOS DEL FUTURO SAS','CP',1),(460,'GUU','COLEGIO MIGUEL ANGEL ASTURIAS','CP',1),(461,'NSA','COLEGIO ESTANCIA DE BOSA','CP',1),(462,'IJS','COLEGIO JOSE ORTEGA Y GASSET','CP',1),(463,'DIL','LICEO Y JARDIN INFANTIL FANTASIAS DE PIOLIN','CP',1),(464,'IAO','LICEO SOMA','CP',1),(465,'UAL','COLEGIO PSICOPEDAGOGICO EL FUTURO DE VILLA DEL RIO','CP',1),(466,'CTA','INSTITUTO ACADEMICO LA PORTADA','CP',1),(467,'IRS','GIMNASIO CACERES','CP',1),(468,'LOR','INSTITUTO TECNICO COMERCIAL MARMATOS','CP',1),(469,'VEV','LICEO MODERNO SALVADOR ALLENDE','CP',1),(470,'RCM','LICEO MIXTO LOS CENTAUROS','CP',1),(471,'FOO','LICEO FALAN','CP',1),(472,'RSR','INSTITUTO LABERINTO DE LA CULTURA','CP',1),(473,'LID','CENTRO EDUCATIVO EXTERNADO SIMON BOLIVAR','CP',1),(474,'MRE','LICEO MODERNO GRINBEHY','CP',1),(475,'GMA','COLEGIO SURAMERICANO MARBETH','CP',1),(476,'OCO','GIMNASIO GARABATOS DE COLORES','CP',1),(477,'LOB','COLEGIO NUEVA COLOMBIA GRANDE','CP',1),(478,'NNG','LICEO INFANTIL GOOFY','CP',1),(479,'ESA','JARDIN INFANTIL MIS PRIMEROS TRAZOS','CP',1),(480,'GGO','LICEO PSICOPEDAGOGICO EL CARMELO','CP',1),(481,'TTU','LICEO CULTURAL LOPEZ OSORIO','CP',1),(482,'EIB','COLEGIO MIXTO ALEGRIA Y SABER','CP',1),(483,'DNO','LICEO ERNESTO CARDENAL','CP',1),(484,'PAR','LICEO Y PREESCOLAR ABEJA MAYA','CP',1),(485,'ONV','LICEO NUEVOS HORIZONTES','CP',1),(486,'EYE','LICEO MANUEL ELKIN PATARROYO','CP',1),(487,'OVO','LICEO OCTAVIO PAZ','CP',1),(488,'NAA','LICEO MI INFANCIA CREATIVA','CP',1),(489,'DEC','COLEGIO COLSUBSIDIO CHICALA','CP',1),(490,'ELC','COLEGIO FRANCISCO I','CP',1),(491,'ECC','COLEGIO INETEC','CP',1),(492,'COC','LICEO MODERNO BETANIA','CP',1),(493,'SAV','GIMNASIO NUEVA ANDALUCIA','CP',1),(494,'IAG','GIMNASIO REAL AMERICANO','CP',1),(495,'RGO','LICEO PEDAGOGICO FORJADORES DEL FUTURO','CP',1),(496,'ROE','LICEO PEDAGOGICO EL RECREO','CP',1),(497,'USC','CENTRO EDUCATIVO FORMAL PARA ADULTOS LOS SAUCES','CP',1),(498,'SNO','FUNDACION SANTO TOMAS DE AQUINO - FUSANTEC','CP',1),(499,'URO','FUNDACION HUMANISTA ERASMO DE ROTTERDAM','CP',1),(500,'AGS','COLEGIO HUMANISTA JALIL GIBRAN','CP',1),(501,'UIC','COLEGIO SABIDURIA DEL FUTURO','CP',1),(502,'SSA','COLEGIO TECNISISTEMAS SEDE BOSA','CP',1),(503,'AOF','COLEGIO GIMNASIO SABIDURIA DEL FUTURO','CP',1),(504,'APS','GIMNASIO PSICOPEDAGOGICO SIGLO XXI','CP',1),(505,'RSI','LICEO CENTRAL AMERICAS','CP',1),(506,'OGR','LICEO PSICOPEDAGOGICO EBENEZER','CP',1),(507,'CLP','COLEGIO SUPERIOR PALERMO','CP',1),(508,'OGI','COLEGIO INNOVAR','CP',1),(509,'IGU','LICEO BILINGÜE ROMULO GALLEGOS','CP',1),(510,'HHO','COLEGIO EN-CONEXION CHICALA','CP',1),(511,'NCE','LICEO MODERNO SAN CAYETANO','CP',1),(512,'EOR','COLEGIO CLARETIANO EL LIBERTADOR','CP',1),(513,'IRU','COLEGIO NUESTRA SEÑORA DE NAZARETH','CP',1),(514,'DCN','COLEGIO INMACULADO CORAZON DE MARIA','CP',1),(515,'REC','COLEGIO CLARETIANO','CP',1),(516,'NOS','LICEO DIVINO NIÑO JESUS','CP',1),(517,'NDD','LICEO ANTONIO DE TOLEDO','CP',1),(518,'GMS','INSTITUTO GUIMARC','CP',1),(519,'CSN','LICEO SAN PABLO','CP',1),(520,'ITN','COLEGIO GIOVANNI ANTONIO FARINA','CP',1),(521,'IIB','INSTITUTO JUAN PABLO II','CP',1),(522,'ENN','GIMNASIO MARTIN GALEANO','CP',1),(523,'SZI','COLEGIO ROSA AGAZZI','CP',1),(524,'IAC','LICEO MODERNO GRAN PARIS','CP',1),(525,'AFE','LICEO ALFREDO NOBEL','CP',1),(526,'SGN','GIMNASIO LOS SAUCES','CP',1),(527,'CER','LICEO REAL ESPAÑA','CP',1),(528,'NRT','INSTITUTO CLARA FEY','CP',1),(529,'EEA','COLEGIO CARLOS ARANGO VELEZ (IED)','CP',1),(530,'DRC','COLEGIO DARIO ECHANDIA (IED)','CP',1),(531,'CAL','COLEGIO NACIONAL NICOLAS ESGUERRA (IED)','CP',1),(532,'TEG','COLEGIO CARLOS ARTURO TORRES (IED)','CP',1),(533,'IOC','COLEGIO LA AMISTAD (IED)','CP',1),(534,'EAM','COLEGIO TOM ADAMS (IED)','CP',1),(535,'LIP','COLEGIO EL JAPON (IED)','CP',1),(536,'PSV','COLEGIO SAN PEDRO CLAVER (IED)','CP',1),(537,'SLA','COLEGIO CLASS (IED)','CP',1),(538,'UOG','COLEGIO PAULO VI (IED)','CP',1),(539,'OES','COLEGIO SAN JOSE (IED)','CP',1),(540,'ECG','COLEGIO SAN RAFAEL (IED)','CP',1),(541,'LLO','COLEGIO MARSELLA (IED)','CP',1),(542,'ACA','COLEGIO FRANCISCO DE MIRANDA (IED)','CP',1),(543,'EAI','COLEGIO LAS AMERICAS (IED)','CP',1),(544,'L.E','COLEGIO O.E.A. (IED)','CP',1),(545,'LOC','COLEGIO ISABEL II (IED)','CP',1),(546,'IGC','COLEGIO ALQUERIA DE LA FRAGUA (IED)','CP',1),(547,'PES','COLEGIO LOS PERIODISTAS (IED)','CP',1),(548,'OAL','COLEGIO LA CHUCUA (IED)','CP',1),(549,'OED','COLEGIO KENNEDY (IED)','CP',1),(550,'RLE','COLEGIO FERNANDO SOTO APARICIO (IED)','CP',1),(551,'DFC','COLEGIO INEM FRANCISCO DE PAULA SANTANDER (IED)','CP',1),(552,'OFY','COLEGIO JOHN F. KENNEDY (IED)','CP',1),(553,'NRO','COLEGIO PROSPERO PINZON (IED)','CP',1),(554,'LGV','COLEGIO MANUEL CEPEDA VARGAS (IED)','CP',1),(555,'EEI','COLEGIO JAIRO ANIBAL NIÑO (CED)','CP',1),(556,'LJO','COLEGIO JACKELINE (IED)','CP',1),(557,'IOO','COLEGIO MANUEL ZAPATA OLIVELLA (IED)','CP',1),(558,'TLO','COLEGIO LA FLORESTA SUR (IED)','CP',1),(559,'SSE','COLEGIO SAN JOSE DE CASTILLA (IED)','CP',1),(560,'AII','COLEGIO CASTILLA (IED)','CP',1),(561,'OVI','COLEGIO VILLA RICA (IED)','CP',1),(562,'NOM','COLEGIO ALFONSO LOPEZ PUMAREJO (IED)','CP',1),(563,'ENO','COLEGIO INSTITUTO TECNICO RODRIGO DE TRIANA (IED)','CP',1),(564,'ISO','COLEGIO BELLAVISTA (IED)','CP',1),(565,'AEA','COLEGIO EDUARDO UMAÑA LUNA (IED)','CP',1),(566,'AHE','COLEGIO HERNANDO DURAN DUSSAN (IED)','CP',1),(567,'CON','COLEGIO JAIME HERNANDO GARZON FORERO (IED)','CP',1),(568,'TAO','COLEGIO GABRIEL BETANCOURT MEJIA (IED)','CP',1),(569,'CEA','COLEGIO CODEMA (IED)','CP',1),(570,'ILG','COLEGIO GENERAL GUSTAVO ROJAS PINILLA (IED)','CP',1),(571,'AIO','COLEGIO SALUDCOOP SUR (IED)','CP',1),(572,'NNM','COLEGIO NELSON MANDELA (IED)','CP',1),(573,'LML','COLEGIO LAS MARGARITAS (IED)','CP',1),(574,'YEM','COLEGIO EMMA REYES (IED)','CP',1),(575,'EIS','COLEGIO FELIZA BURSZTYN (IED)','CP',1),(576,'RZE','COLEGIO TERESA MARTINEZ DE VARELA (IED)','CP',1),(577,'OBE','LICEO RODRIGO ARENAS BETANCOURT','CP',1),(578,'OOB','GIMNASIO COLOMBO ANDINO','CP',1),(579,'LNO','COLEGIO ERNESTO GUHL','CP',1),(580,'TGE','COLEGIO MONTFERRI','CP',1),(581,'COD','NUEVO LICEO PSICOPEDAGOGICO','CP',1),(582,'TIF','INSTITUTO FELIX RESTREPO','CP',1),(583,'AAO','COLEGIO JAIME QUIJANO CABALLERO','CP',1),(584,'ZVZ','COLEGIO COOPERATIVO DE TIMIZA','CP',1),(585,'TMU','INSTITUTO MARSELLA','CP',1),(586,'ETI','COLEGIO ATENIENSE','CP',1),(587,'SUL','COLEGIO SANTA LUISA','CP',1),(588,'OGM','GIMNASIO MILITAR FUERZA AEREA DE COLOMBIA','CP',1),(589,'IGI','COLEGIO SUPERIOR AMERICANO','CP',1),(590,'IVT','COLEGIO MILITAR COOPERATIVO JUSTINIANO QUIÑONEZ ANGULO','CP',1),(591,'NDR','COLEGIO PARROQUIAL SAN ANDRES APOSTOL','CP',1),(592,'OAE','COLEGIO INTEGRACION MODERNA','CP',1),(593,'COR','COLEGIO CAMPO HERMOSO','CP',1),(594,'NYA','COLEGIO MANDALAY','CP',1),(595,'GRC','COLEGIO MI PATRIA','CP',1),(596,'ANI','GIMNASIO NUEVA AMERICA','CP',1),(597,'ROU','COLEGIO PARROQUIAL SAN JUAN DE LA CRUZ','CP',1),(598,'SMO','COLEGIO MI SEGUNDO HOGAR','CP',1),(599,'ILI','COLEGIO SANTO DOMINGO BILINGÜE','CP',1),(600,'DTU','UNIDAD EDUCATIVA JEAN PIAGET','CP',1),(601,'OXE','LICEO EUCARISTICO MIXTO','CP',1),(602,'CID','LICEO NORDAM','CP',1),(603,'CEI','LICEO REYNEL','CP',1),(604,'TDE','INSTITUTO DE EDUCACION MEDIA EMAUS','CP',1),(605,'EZI','LICEO ROZFORD','CP',1),(606,'OIP','LICEO PIÑEROS CORTES','CP',1),(607,'MET','INSTITUTO EXPERIMENTAL DE ENSEÑANZA PRACTICA','CP',1),(608,'EEF','LICEO INFANTIL LOS FUNDADORES','CP',1),(609,'RNI','JARDIN INFANTIL NUESTRO HONGUITO','CP',1),(610,'OSE','COLEGIO NUESTRA SEÑORA DE LORETO','CP',1),(611,'ALC','GIMNASIO IMPERIAL IGNACIA CAMACHO DE CIFUENTES','CP',1),(612,'ATA','LICEO MARIA VICTORIA','CP',1),(613,'CIT','LICEO LUTHER KING','CP',1),(614,'CCG','COLEGIO SUPERIOR DE OCCIDENTE','CP',1),(615,'EAO','LICEO NUESTRA SEÑORA DE TORCOROMA','CP',1),(616,'LER','COLEGIO LAZARILLO DE TORMES','CP',1),(617,'OIB','COLEGIO SAN BONIFACIO','CP',1),(618,'NFT','INSTITUTO TENERIFE','CP',1),(619,'EOU','COLEGIO EL DUQUE DE RIVAS','CP',1),(620,'ENA','LICEO NUEVA BRITALIA','CP',1),(621,'ACC','LICEO LEANDRO CONCHA','CP',1),(622,'MDO','GIMNASIO MODERNO DEL PRADO','CP',1),(623,'OCC','COLEGIO CIUDAD PATIO BONITO','CP',1),(624,'RDS','JARDIN INFANTIL MI SEGUNDA ESTACION','CP',1),(625,'OIM','GIMNASIO PRINCIPES DEL CONDADO','CP',1),(626,'IFE','COLEGIO ALEXANDER FLEMING','CP',1),(627,'LAC','COLEGIO TAYRONA','CP',1),(628,'EGG','LICEO SANTA ENGRACIA','CP',1),(629,'EIU','INSTITUTO CULTURAL CIUDAD KENNEDY','CP',1),(630,'RII','COLEGIO MANUEL MURILLO TORO','CP',1),(631,'AEO','NUEVO LICEO ACADEMICO','CP',1),(632,'GCN','COLEGIO DE FORMACION INTEGRAL MUNDO NUEVO','CP',1),(633,'NDA','JARDIN INFANTIL RISITAS','CP',1),(634,'NOB','LICEO VISION DE COLOMBIA','CP',1),(635,'LMI','COLEGIO BILINGÜE MELANIE KLEIN','CP',1),(636,'MIR','LICEO SAMARIO','CP',1),(637,'RAL','LICEO NUESTRA SEÑORA DE LAS NIEVES','CP',1),(638,'OAO','COLEGIO CELCO SAN LUCAS','CP',1),(639,'TES','LICEO INFANTIL SAN CLEMENTE','CP',1),(640,'AAG','COLEGIO ANTARES','CP',1),(641,'UYI','INSTITUTO YOLKIN','CP',1),(642,'TON','INSTITUTO RENATO DESCARTES','CP',1),(643,'OTD','INSTITUTO COMERCIAL LORETO SEDE B','CP',1),(644,'POD','JARDIN INFANTIL ESOPO','CP',1),(645,'CRO','LICEO CRISTOBAL DE OLID','CP',1),(646,'GMI','COLEGIO CALIMA','CP',1),(647,'INE','JARDIN INFANTIL PSICOPEDAGOGICO EDUCACION PERSONALIZADA Y ESTIMULACION TEMPRANA','CP',1),(648,'EEN','LICEO MODERNO LEON BAEZ','CP',1),(649,'OSR','JARDIN INFANTIL JARDINERITOS','CP',1),(650,'EAS','COLEGIO LOS PEQUEÑOS INFANTES','CP',1),(651,'UAU','UNIDAD EDUCATIVA EL FUTURO DEL MAÑANA','CP',1),(652,'DRA','LICEO MAYOR ANDINO','CP',1),(653,'FVD','LICEO VIDA INFANTIL','CP',1),(654,'RIE','LICEO SANTA TERESITA DE LISIEUX','CP',1),(655,'DOC','COLEGIO CIUDAD DE CALI','CP',1),(656,'CCZ','COLEGIO JAZMIN OCCIDENTAL','CP',1),(657,'OSS','LICEO PSICOPEDAGOGICO NUEVA CASTILLA','CP',1),(658,'GSL','JARDIN PSICOPEDAGOGICO DINNY LENNY','CP',1),(659,'IRI','JARDIN INFANTIL POMPIN Y TATARIN','CP',1),(660,'DEI','JARDIN PSICOPEDAGOGICO BEBES DISNEY','CP',1),(661,'PIÑ','GIMNASIO PRESENCIA DEL DIVINO NIÑO','CP',1),(662,'DOL','INSTITUTO LEONARD EULER','CP',1),(663,'SGT','LICEO INFANTIL Y GUARDERIA LOS TATICOS','CP',1),(664,'LOT','INSTITUTO MODERNO EL LIBANO','CP',1),(665,'AOL','COLEGIO PARROQUIAL DE LOS SANTOS APOSTOLES','CP',1),(666,'ACE','COLEGIO RAFAEL GOBERNA','CP',1),(667,'OLS','COLEGIO CHAMBERS','CP',1),(668,'CLA','GIMNASIO PSICOPEDAGOGICO PERSONALIZADO E INTEGRAL','CP',1),(669,'IAR','INSTITUTO SAN RICARDO PAMPURI','CP',1),(670,'ICE','COLEGIO MUÑECOS Y FIGURAS','CP',1),(671,'GIU','LICEO PEDAGOGICO LOS JILGUEROS','CP',1),(672,'NAG','GIMNASIO RINCON DE LOS ANGELES','CP',1),(673,'DNI','JARDIN INFANTIL DE APRESTAMIENTO ESCOLAR ABC DE LA ALEGRIA','CP',1),(674,'DOU','INSTITUTO PEDAGOGICO FEDERICO BALART','CP',1),(675,'NMN','JARDIN INFANTIL MIS CARIÑOSITOS','CP',1),(676,'MOP','INSTITUTO PSICOPEDAGOGICO EMMANUEL MOUNIER','CP',1),(677,'TPP','LICEO PEDAGOGICO AUGUSTO COMTE','CP',1),(678,'OTT','INSTITUTO PSICOPEDAGOGICO COLOMBIA NUEVA','CP',1),(679,'SAQ','LICEO CULTURAL MOSQUERA','CP',1),(680,'TST','INSTITUTO SANTIAGO APOSTOL','CP',1),(681,'UAI','COLEGIO CIUDAD DE FOMEQUE','CP',1),(682,'NDN','JARDIN INFANTIL TALLERIN','CP',1),(683,'EEK','COLEGIO TRIANGULO KENNEDY','CP',1),(684,'MSI','GIMNASIO MODERNO PASOS Y HUELLAS DEL MAESTRO','CP',1),(685,'ANG','COLEGIO TRIANGULO PATIO BONITO','CP',1),(686,'SNL','INSTITUCION EDUCATIVA SAN NICOLAS LTDA','CP',1),(687,'AOC','LICEO CARMELITA','CP',1),(688,'ANE','GIMNASIO LAS ALEGRIAS DE CRECER','CP',1),(689,'NAD','COLEGIO INFANTIL DE APRENDIZAJE Y DESARROLLO','CP',1),(690,'OUA','COLEGIO NUEVO PARAISO','CP',1),(691,'RPM','LICEO PARQUE DE MORAVIA','CP',1),(692,'SST','GIMNASIO CRISTIANO LUZ Y VIDA','CP',1),(693,'USF','GIMNASIO SABIDURIA DEL FUTURO','CP',1),(694,'NSG','GIMNASIO INFANTIL CRECIENDO Y APRENDIENDO','CP',1),(695,'IAI','GIMNASIO MARONY','CP',1),(696,'LCN','JARDIN INFANTIL EL ROSAL DE MI INFANCIA','CP',1),(697,'TFE','LICEO CRISTIANO MI REFUGIO PERFECTO','CP',1),(698,'RRO','LICEO PSICOPEDAGOGICO JOSE CORDOBA','CP',1),(699,'ISG','LICEO PSICOPEDAGOGICO SAN ANGELO','CP',1),(700,'ICC','LICEO PSICOPEDAGOGICO NUEVA ERA','CP',1),(701,'ÜNN','JARDIN INFANTIL BILINGÜE EL MUNDO DE MIS FANTASIAS','CP',1),(702,'EDA','GIMNASIO PSICOPEDAGOGICO MARIA ISABEL','CP',1),(703,'CGE','COLEGIO SAGRADO CORAZON','CP',1),(704,'AAR','COLEGIO RAFAEL POMBO','CP',1),(705,'CAC','LICEO EL CASTILLO','CP',1),(706,'CTO','LICEO MODERNO SANTA CATALINA','CP',1),(707,'ERI','CENTRO EDUCATIVO INDIRA GANDHI','CP',1),(708,'OOR','COLEGIO LATINOAMERICA','CP',1),(709,'EIT','MIMOSITOS LICEO INFANTIL','CP',1),(710,'TIT','INSTITUTO ACADEMICO MORELI','CP',1),(711,'ILR','GIMNASIO MODERNO CASTILLA','CP',1),(712,'AHC','JARDIN INFANTIL LA CASITA DE CHENANO','CP',1),(713,'NLI','LICEO SANTA MATILDE','CP',1),(714,'CCO','CENTRO EDUCATIVO INTERNACIONAL OASIS','CP',1),(715,'AAC','LICEO SANTA CATALINA DE SIENA','CP',1),(716,'YLA','LICEO INFANTIL SAN JUAN GABRIEL PERBOYRE','CP',1),(717,'ICU','LICEO EMMANUELE MARLUI','CP',1),(718,'USH','JARDIN INFANTIL CHISPITAS DE LUZ','CP',1),(719,'POS','COLEGIO INSCAP','CP',1),(720,'TEE','COLEGIO CENTRO DE INSTRUCCION SISTEMATIZADA - CEIS','CP',1),(721,'NED','KINDERGARDEN AMERICANO','CP',1),(722,'ÑEE','LICEO EL MUNDO DEL MAÑANA','CP',1),(723,'SDN','LICEO EL MUNDO DE LOS NIÑOS','CP',1),(724,'GSG','COLEGIO CHARLES BABBAGGE','CP',1),(725,'OOT','INSTITUTO POLITECNICO JOSE CELESTINO MUTIS','CP',1),(726,'ANN','CENTRO DE EDUCACION ROBERT HOOKE','CP',1),(727,'LCC','LICEO JEFFERSON','CP',1),(728,'BGO','COLEGIO LA AVENTURA DEL SABER','CP',1),(729,'UIE','INSTITUTO COMERCIAL LORETO','CP',1),(730,'OAI','GIMNASIO PEDAGOGICO VIDA Y SABER','CP',1),(731,'OSF','GIMNASIO NIÑOS FELICES','CP',1),(732,'AEE','LICEO MODERNO GABRIELA MISTRAL','CP',1),(733,'ACD','COLEGIO PSICOPEDAGOGICO MENTOR','CP',1),(734,'OTI','GIMNASIO MODERNO SAN FRANCISCO EL TINTAL','CP',1),(735,'AEL','COLEGIO SAN ANGEL','CP',1),(736,'ALA','COLEGIO MILITAR ANTONIA SANTOS','CP',1),(737,'GNS','GIMNASIO MODERNO SAN MARTIN','CP',1),(738,'SAT','LICEO CONQUISTADORES DE LAS AMERICAS','CP',1),(739,'LJE','COLEGIO EMMANUEL JIREH','CP',1),(740,'NMO','LICEO INFANTIL MICHELIN','CP',1),(741,'JON','JARDIN INFANTIL BURBUJITAS DE AMOR','CP',1),(742,'CSA','LICEO MODERNO SAN MARCOS','CP',1),(743,'LAD','JARDIN INFANTIL BURBUJAS DE ALEGRIA','CP',1),(744,'NIR','GIMNASIO SUPERIOR NUEVOS ANDES','CP',1),(745,'SUT','COLEGIO AGUSTINIANO TAGASTE','CP',1),(746,'SVI','GIMNASIO INFANTIL SERGIO BENAVIDES','CP',1),(747,'ISA','LICEO INFANTIL FANTASIAS','CP',1),(748,'EDE','ACADEMIA REAL PARA NIÑOS','CP',1),(749,'OIC','COLEGIO TALENTOS','CP',1),(750,'AMM','LICEO BIRMINGHAM','CP',1),(751,'EUS','COLEGIO NUESTRA SEÑORA DE LA FELICIDAD','CP',1),(752,'DCE','BACHILLERATO INNOVAR KENNEDY','CP',1),(753,'CRS','LICEO CRISTIANO LA GRAN COMISION','CP',1),(754,'RRG','COLEGIO GIANNI RODARI','CP',1),(755,'EDL','COLEGIO INCADE KENNEDY','CP',1),(756,'RMR','LICEO MODERNO IMCREA','CP',1),(757,'RTE','CENTRO EDUCATIVO PRO-EDUCAR','CP',1),(758,'TTT','INSTITUTO GENESIS','CP',1),(759,'AON','COLEGIO RODRIGO ARENAS BETANCOURT (IED)','CP',1),(760,'NAN','COLEGIO PABLO NERUDA (IED)','CP',1),(761,'RCR','COLEGIO CARLO FEDERICI (IED)','CP',1),(762,'FIL','COLEGIO LA FELICIDAD (IED)','CP',1),(763,'GII','COLEGIO MARIA JOSEFA CANELONES (IED)','CP',1),(764,'NND','COLEGIO ANTONIO VAN UDEN (IED)','CP',1),(765,'AGM','COLEGIO VILLEMAR EL CARMEN (IED)','CP',1),(766,'NCI','COLEGIO INSTITUTO TECNICO INTERNACIONAL (IED)','CP',1),(767,'IGL','COLEGIO LUIS ANGEL ARANGO (IED)','CP',1),(768,'CIO','COLEGIO COSTA RICA (IED)','CP',1),(769,'BAO','COLEGIO INTEGRADO DE FONTIBON IBEP (IED)','CP',1),(770,'APO','COLEGIO ATAHUALPA (IED)','CP',1),(771,'LGU','COLEGIO NUEVO MONTESSORIANO','CP',1),(772,'CCR','LICEO NAVARRA','CP',1),(773,'TTA','INSTITUTO INFANTIL Y JUVENIL','CP',1),(774,'GLL','GIMNASIO FIDEL CANO','CP',1),(775,'ITU','INSTITUTO NAZARENO MODELIA','CP',1),(776,'GMM','COLEGIO MADRE MATILDE','CP',1),(777,'GYE','LICEO PSICOPEDAGOGICO ELLEN KEY','CP',1),(778,'NRN','LICEO NUESTRA SEÑORA DE ARANZAZU','CP',1),(779,'QIJ','COLEGIO JARDIN MI PEQUEÑO BOHIO','CP',1),(780,'AOT','LICEO INFANTIL SALAMANCA','CP',1),(781,'JAR','LICEO JUVENIL DE MORAVIA','CP',1),(782,'JAL','JARDIN INFANTIL ALADINO','CP',1),(783,'UOI','COLEGIO BILINGÜE NUEVA ALEJANDRIA','CP',1),(784,'FLI','COLEGIO PSICOPEDAGOGICO INFANTIL LA ALDEA','CP',1),(785,'PCI','LICEO MODERNO MIS COMPAÑERITOS','CP',1),(786,'GSC','LICEO APRENDO CON MIS AMIGOS','CP',1),(787,'ATF','JARDIN INFANTIL LOCAS CABECITAS','CP',1),(788,'NEC','COLEGIO AMANECER','CP',1),(789,'CUI','COLEGIO JESUS MAESTRO','CP',1),(790,'ACO','LICEO CRISTIANO LA VID','CP',1),(791,'AIV','UNIDAD EDUCATIVA BAHIA SOLANO','CP',1),(792,'LTG','PREESCOLAR TRIANGULO MAGICO DE LOS NIÑOS','CP',1),(793,'UOD','GIMNASIO NUEVO MODELIA','CP',1),(794,'CPL','INSTITUTO PSICOPEDAGOGICO EL CALPULLI','CP',1),(795,'JAN','LICEO JEAN DE LA FONTAINE','CP',1),(796,'LAR','JARDIN INFANTIL ABC SAUZALITO','CP',1),(797,'ACG','JARDIN PSICOPEDAGOGICO CARRUSEL DEL SABER JUGANDO','CP',1),(798,'NIN','COLEGIO AGUSTINIANO CIUDAD SALITRE','CP',1),(799,'EBA','LICEO GABRIELA MISTRAL','CP',1),(800,'ATL','GIMNASIO CULTURAL EL ARTE DEL FUTURO','CP',1),(801,'AIC','COLEGIO SAN GABRIEL','CP',1),(802,'ZLL','LICEO INFANTIL EL MUNDO DEL NIÑO FELIZ','CP',1),(803,'NIG','GIMNASIO NUEVO REINO','CP',1),(804,'TTD','GIMNASIO NUEVO DESPERTAR','CP',1),(805,'SOR','GIMNASIO SAN BARTOLOME','CP',1),(806,'NAZ','UNIDAD INFANTIL DE DESARROLLO Y APRENDIZAJE IDEAR','CP',1),(807,'OSO','COLEGIO EL CASTILLO MAGICO','CP',1),(808,'OLD','LICEO MODERNO MUNDO NET','CP',1),(809,'ULR','TALLER INFANTIL MI MUNDO','CP',1),(810,'ILJ','JARDIN INFANTIL PYLOSOS','CP',1),(811,'PSA','UNIDAD EDUCATIVA PRADOS DE ALAMEDA','CP',1),(812,'IGS','GIMNASIO CAMELOT','CP',1),(813,'IMP','POLITECNICO MAYOR ANDINO','CP',1),(814,'MAN','CENTRO DE ESTIMULACION TEMPRANA DESPERTAR','CP',1),(815,'AES','LICEO AMERICANO MI GRAN CASA AZUL','CP',1),(816,'LMA','JARDIN INFANTIL OSITO DE MIEL','CP',1),(817,'ALE','GIMNASIO MODELIA REAL','CP',1),(818,'SAN','GIMNASIO SANTO ANGEL','CP',1),(819,'JOG','JARDIN INFANTIL NIÑOS MAGICOS','CP',1),(820,'GNO','GIMNASIO CANTORIN','CP',1),(821,'RUA','CENTRO DE ESTIMULACION TEMPRANA GRANDES PERSONITAS','CP',1),(822,'PEI','GIMNASIO BILINGÜE CASA CAMPESTRE DE LOS NIÑOS','CP',1),(823,'ODI','JARDIN NEOPEDAGOGICO FABULAS Y CUENTOS','CP',1),(824,'NEP','COLEGIO PSICOPEDAGOGICO CENTENARIO','CP',1),(825,'ITA','JARDIN INFANTIL LA CASITA DE MICKEY','CP',1),(826,'GRD','NUEVO GIMNASIO INFANTIL MODERNO','CP',1),(827,'ICL','COLEGIO MARCO AURELIO','CP',1),(828,'TAL','LICEO MARIA GORETTI','CP',1),(829,'ÑIE','COLEGIO DEL DIVINO NIÑO','CP',1),(830,'ECM','CENTRO DE ENSEÑANZA MEDIA COMERCIAL NUESTRA SEÑORA DEL CARMEN','CP',1),(831,'ROC','COLEGIO PARROQUIAL SAN PEDRO CLAVER','CP',1),(832,'OTS','COLEGIO SANTA ANA','CP',1),(833,'EPI','COLEGIO DE NUESTRA SEÑORA DEL PERPETUO SOCORRO','CP',1),(834,'LEI','COLEGIO DE LOS ANDES','CP',1),(835,'ISX','COLEGIO TERESITA DE LISIEUX','CP',1),(836,'LUN','COLEGIO PARROQUIAL SAN JOSE','CP',1),(837,'NAR','COLEGIO SANTA TERESA DE JESUS','CP',1),(838,'OSG','GIMNASIO LOS ANGELES','CP',1),(839,'POP','COLEGIO PARROQUIAL NUESTRA SEÑORA DEL ROSARIO','CP',1),(840,'AOP','COLEGIO PSICOPEDAGOGICO DE FONTIBON','CP',1),(841,'NII','INSTITUTO LA ANUNCIACION','CP',1),(842,'IEA','LICEO MARIA LEONZA','CP',1),(843,'JOL','COLEGIO MILITAR JOSE ANTONIO GALAN','CP',1),(844,'ZAS','INSTITUTO INFANTIL LA ESPERANZA','CP',1),(845,'NTN','GIMNASIO INTEGRAL MODERNO','CP',1),(846,'CEE','COLEGIO INSTITUTO TECNICO LAUREANO GOMEZ (IED)','CP',1),(847,'ORN','COLEGIO MARCO TULIO FERNANDEZ (IED)','CP',1),(848,'LNG','COLEGIO NUEVA CONSTITUCION (IED)','CP',1),(849,'GOI','COLEGIO ANTONIO NARIÑO (IED)','CP',1),(850,'RDE','COLEGIO ROBERT F. KENNEDY (IED)','CP',1),(851,'ICI','COLEGIO INSTITUTO TECNICO JUAN DEL CORRAL (IED)','CP',1),(852,'IBC','COLEGIO REPUBLICA DE COLOMBIA (IED)','CP',1),(853,'TOC','COLEGIO INSTITUTO TECNICO INDUSTRIAL FRANCISCO JOSE DE CALDAS (IED)','CP',1),(854,'ILO','COLEGIO MIGUEL ANTONIO CARO (IED)','CP',1),(855,'AJS','COLEGIO JOSE ASUNCION SILVA (IED)','CP',1),(856,'GOE','COLEGIO MORISCO (IED)','CP',1),(857,'JNE','COLEGIO SAN JOSE NORTE (IED)','CP',1),(858,'IOA','COLEGIO TABORA (IED)','CP',1),(859,'EGO','COLEGIO NACIONES UNIDAS (IED)','CP',1),(860,'LNL','COLEGIO FLORIDABLANCA (IED)','CP',1),(861,'TEL','COLEGIO JORGE GAITAN CORTES (IED)','CP',1),(862,'CIA','COLEGIO REPUBLICA DE CHINA (IED)','CP',1),(863,'EIM','COLEGIO MAGDALENA ORTEGA DE NARIÑO (IED)','CP',1),(864,'GAL','COLEGIO VILLA AMALIA (IED)','CP',1),(865,'SOL','ESCUELA PEDAGOGICA INTEGRAL IDIPRON','CP',1),(866,'RSA','COLEGIO GARCES NAVAS (IED)','CP',1),(867,'EVA','COLEGIO GUILLERMO LEON VALENCIA (IED)','CP',1),(868,'OCT','COLEGIO NESTOR FORERO ALCALA (IED)','CP',1),(869,'TMC','COLEGIO INSTITUTO TECNICO DISTRITAL REPUBLICA DE GUATEMALA (IED)','CP',1),(870,'CGL','COLEGIO MANUELA AYALA DE GAITAN (IED)','CP',1),(871,'SAR','COLEGIO LAS MERCEDES (IED)','CP',1),(872,'IUG','COLEGIO TORQUIGUA (IED)','CP',1),(873,'BOC','COLEGIO BOLIVIA (IED)','CP',1),(874,'OIQ','COLEGIO TOMAS CIPRIANO DE MOSQUERA (IED)','CP',1),(875,'LHC','COLEGIO CHARRY (IED)','CP',1),(876,'DLO','COLEGIO RODOLFO LLINAS (IED)','CP',1),(877,'RID','COLEGIO ABEL RODRIGUEZ CESPEDES (IED)','CP',1),(878,'LEE','COLEGIO LUCILA RUBIO DE LAVERDE (IED)','CP',1),(879,'LNT','COLEGIO LA PALESTINA (IED)','CP',1),(880,'ICO','COLEGIO ANTONIO VILLAVICENCIO (IED)','CP',1),(881,'OMI','COLEGIO SIMON BOLIVAR (IED)','CP',1),(882,'EQA','COLEGIO NIDIA QUINTERO DE TURBAY (IED)','CP',1),(883,'EGR','LICEO EL GRAN VIRREY','CP',1),(884,'RAA','CENTRO COMERCIAL DE EDUCACION MEDIA MARGARITA BOSCO','CP',1),(885,'NCL','COLEGIO DE LA PRESENTACION DE LAS FERIAS','CP',1),(886,'CCI','COLEGIO DE LA UNIVERSIDAD LIBRE','CP',1),(887,'NAO','COLEGIO CENTRO LESTONNAC COMPAÑIA DE MARIA','CP',1),(888,'UTN','INSTITUTO NUESTRA SEÑORA DEL AMPARO','CP',1),(889,'APZ','LICEO LA ESPAÑOLA GABRIEL ANZOLA GOMEZ','CP',1),(890,'EAT','INSTITUTO HENAO Y ARRUBLA','CP',1),(891,'IOE','COLEGIO REAL ESCANDINAVO','CP',1),(892,'OCN','INSTITUTO TECNICO INDUSTRIAL CENTRO DON BOSCO','CP',1),(893,'CTI','COLEGIO EL MINUTO DE DIOS','CP',1),(894,'NCO','LICEO CARRION','CP',1),(895,'ATI','COLEGIO RR OBLATAS AL DIVINO AMOR','CP',1),(896,'OME','COLEGIO MONTERREY','CP',1),(897,'LRS','COLEGIO ELISA BORRERO DE PASTRANA','CP',1),(898,'AAM','COLEGIO CAFAM','CP',1),(899,'GAO','COLEGIO COOPERATIVO DE LOS ALAMOS','CP',1),(900,'ROI','COLEGIO COOPERATIVO MINUTO DE DIOS','CP',1),(901,'CUY','COLEGIO ELOY VALENZUELA','CP',1),(902,'UNC','COLEGIO JOSE JOAQUIN VARGAS','CP',1),(903,'SSL','COLEGIO PEDAGOGICO DEL ESPIRITU SANTO - COPES','CP',1),(904,'GOG','COLEGIO EL ESCORIAL','CP',1),(905,'ASO','COLEGIO TOMAS ALVA EDISON','CP',1),(906,'CCL','LICEO COMERCIAL LAS AMERICAS','CP',1),(907,'OCM','COLEGIO ESTRADA DE MARIA AUXILIADORA','CP',1),(908,'UNN','INSTITUTO CONTINENTAL','CP',1),(909,'MMN','ASPAEN GIMNASIO TUNDAMA','CP',1),(910,'NNJ','ATENEO JUAN EUDES','CP',1),(911,'MMI','INSTITUTO TOMAS DE IRIARTE','CP',1),(912,'SRR','GIMNASIO LOS PIRINEOS','CP',1),(913,'LDN','LICEO ALEXANDER VON HUMBOLDT','CP',1),(914,'TIN','COLEGIO BOGOTA ANDINO','CP',1),(915,'MAI','GIMNASIO LOS ALERCES','CP',1),(916,'LBE','LICEO EL RINCONCITO DEL SABER','CP',1),(917,'OOU','COLEGIO SAN JUAN DE AVILA','CP',1),(918,'MAB','GIMNASIO LOS NOGALES DE BOGOTA','CP',1),(919,'FNL','COLEGIO FERVAN','CP',1),(920,'VNU','CENTRO EDUCATIVO SCALAS','CP',1),(921,'CLI','LICEO SANTA PAULA','CP',1),(922,'SOM','COLEGIO MAYOR PRIMEROS MAESTROS','CP',1),(923,'OMJ','JARDIN INFANTIL LOS AMIGOS DE PAULITA','CP',1),(924,'HOA','COLEGIO HENRY WALLON','CP',1),(925,'TNI','JARDIN INFANTIL TIERNO AMOR','CP',1),(926,'LBL','LICEO SALOMON SABIO','CP',1),(927,'GGE','GIMNASIO LOS MONJES','CP',1),(928,'LIG','LICEO PSICOPEDAGOGICO BOLIVIA','CP',1),(929,'OUN','COLEGIO EMMANUEL','CP',1),(930,'TTN','INSTITUTO RICHARD ANTONIO','CP',1),(931,'IOL','GIMNASIO ANTONIO ARBOLEDA','CP',1),(932,'OPO','LICEO PEDAGOGICO CARLOS ANDRES','CP',1),(933,'NAL','GIMNASIO LA CLARITA','CP',1),(934,'YIA','JARDIN INFANTIL ANDY PANDA','CP',1),(935,'GGA','GIMNASIO EL LAGO','CP',1),(936,'GCA','GIMNASIO SANTA MARIA DEL ALCAZAR','CP',1),(937,'INI','JARDIN INFANTIL CUENTOS Y RONDAS','CP',1),(938,'LAM','LICEO SAN BASILIO MAGNO','CP',1),(939,'MTM','JARDIN INFANTIL MI TALLERCITO MYRIAM T','CP',1),(940,'RNG','GIMNASIO REINO DE CASTILLA','CP',1),(941,'ÑRO','COLEGIO NUESTRA SEÑORA DEL AMPARO','CP',1),(942,'CAE','COLEGIO CRISTIANO FUENTE DE VIDA','CP',1),(943,'OSI','COLEGIO PSICOPEDAGOGICO EL ARTE DEL SABER','CP',1),(944,'AIU','GIMNASIO INFANTIL SAN LUIS REY','CP',1),(945,'ABE','GIMNASIO MODERNO EL BOSQUE','CP',1),(946,'EFL','LICEO INFANTIL THOMAS DE IRIARTE','CP',1),(947,'ANC','LICEO MODERNO JACQUES IVES COUSTEAU','CP',1),(948,'OIS','COLEGIO EL MINUTO DE DIOS SIGLO XXI','CP',1),(949,'LFL','COLEGIO INFANTIL COLOMBIANO','CP',1),(950,'OOL','COLEGIO COLOMBO ESLAVO','CP',1),(951,'RAE','GIMNASIO MODERNO HERMANN MULLER','CP',1),(952,'GOA','COLEGIO ROSA MYSTICA','CP',1),(953,'PAP','COLEGIO PEDAGOGICO NASEM','CP',1),(954,'ERC','COLEGIO AMANECER DE LUCES','CP',1),(955,'ESC','JARDIN INFANTIL LOS PEQUEÑOS INTELECTUALES','CP',1),(956,'IRC','LICEO HOMBRE DEL RIO','CP',1),(957,'NÑG','JARDIN INFANTIL EL PEQUEÑO INVESTIGADOR','CP',1),(958,'AAD','LICEO SANDRA CATALINA','CP',1),(959,'AEG','COLEGIO DE FORMACION INTEGRAL VIRGEN DE LA PEÑA','CP',1),(960,'NOT','COLEGIO REMBRANDT','CP',1),(961,'SIT','GIMNASIO INFANTIL SAN CAMILO','CP',1),(962,'DNR','JARDIN INFANTIL AMANECER DE VERANO','CP',1),(963,'GAN','COLEGIO MADRE ADELA HERMANAS MARIANISTAS','CP',1),(964,'TII','COLEGIO SAN JOAQUIN NORTE','CP',1),(965,'ILB','COLEGIO COLSUBSIDIO CIUDADELA','CP',1),(966,'O-V','COLEGIO PAE -PROCESO ALTERNATIVO EDUCATIVO-','CP',1),(967,'CEO','COLEGIO NUEVO ESTILO','CP',1),(968,'TTS','INSTITUTO TECNICO ANGELI','CP',1),(969,'SIL','LICEO ESTRELLITA ESTUDIANTIL','CP',1),(970,'GLN','COLEGIO INFANTIL GENESARET','CP',1),(971,'JJC','JARDIN INFANTIL PSICOPEDAGOGICO CARACOLES DE COLORES','CP',1),(972,'JNA','JARDIN INFANTIL LOS MUÑECOS DE NANY','CP',1),(973,'MIE','GIMNASIO MODERNO SUMMERHILL','CP',1),(974,'GAI','GIMNASIO MATERNO INFANTIL CLAUDIA JESUS','CP',1),(975,'AOA','JARDIN INFANTIL PALITROQUE','CP',1),(976,'DSI','GIMNASIO MAYOR DE OCCIDENTE','CP',1),(977,'DOB','COLEGIO LLUVIA DE BENDICIONES','CP',1),(978,'OEL','LICEO LOS CENTAUROS','CP',1),(979,'NSE','COLEGIO SANTA ANGELA MERICI','CP',1),(980,'FEI','JARDIN INFANTIL PSICOPEDAGOGICO APRENDER A CREAR','CP',1),(981,'UUA','COLEGIO LUIS MARIANO','CP',1),(982,'RSN','GIMNASIO ACADEMICO CERVANTES','CP',1),(983,'OMO','COLEGIO NUEVOS CIUDADANOS DE MARANDU','CP',1),(984,'MOO','COLEGIO MAYOR DE GALES','CP',1),(985,'GAE','COLEGIO CRISTIANO PSICOPEDAGOGICO SINAI','CP',1),(986,'OEN','GIMNASIO NUEVO HORIZONTE','CP',1),(987,'VLL','PREESCOLAR TRAVESIAS INFANTILES','CP',1),(988,'NGT','COLEGIO NUMEROS Y LETRAS','CP',1),(989,'BAR','LICEO PSICOPEDAGOGICO SAN BUENAVENTURA','CP',1),(990,'LNA','LICEO SAN LEON MAGNO','CP',1),(991,'FIR','CENTRO DE DESARROLLO INFANTIL CRECER','CP',1),(992,'NLA','COLEGIO INTEGRAL EPIFANIO MEJIA','CP',1),(993,'DIA','COLEGIO MODERNO ENGATIVA','CP',1),(994,'CCA','COLEGIO CATOLICO DE LA SABANA','CP',1),(995,'SIV','GIMNASIO INFANTIL NUEVO VIVIR','CP',1),(996,'EIÜ','COLEGIO BILINGÜE REAL AMERICANO','CP',1),(997,'UDO','JARDIN INFANTIL CHIQUITOTO','CP',1),(998,'SNG','GIMNASIO ELISEO LOS ARCES','CP',1),(999,'NON','GIMNASIO PEDAGOGICO CELESTIN FREINET','CP',1),(1000,'ETO','TALLER EL GARABATEO MATERNO INFANTIL','CP',1),(1001,'SCI','LICEO EL CASTILLO DEL SABER','CP',1),(1002,'RHN','LICEO HUELLAS DE TRIUNFO','CP',1),(1003,'NIJ','JARDIN INFANTIL TIA CECY','CP',1),(1004,'VAN','COLEGIO NUEVAS VIVENCIAS','CP',1),(1005,'TTM','CENTRO DE ESTIMULACION TEMPRANA MIS PEQUEÑOS ENANITOS','CP',1),(1006,'NNI','LICEO INFANTIL SAN LORENZO','CP',1),(1007,'RNU','JARDIN INFANTIL Y GUARDERIA SAN RAFAEL','CP',1),(1008,'AIE','COLEGIO VIÑA DEL MAR','CP',1),(1009,'OER','COLEGIO REAL DE COLOMBIA','CP',1),(1010,'RUE','COLEGIO NUESTRA SEÑORA DEL CARMEN','CP',1),(1011,'MNE','LICEO ACADEMICO SHILTON','CP',1),(1012,'ESP','COLEGIO CAMPESTRE LOS PINOS','CP',1),(1013,'AGN','LICEO BONANZA SIGLO XXI','CP',1),(1014,'RMN','LICEO NORMANDIA','CP',1),(1015,'NÑS','JARDIN INFANTIL SUEÑOS E ILUSIONES','CP',1),(1016,'RCD','GIMNASIO MADRE TRINIDAD DE CALCUTA','CP',1),(1017,'GNA','GIMNASIO VILLA LORENA','CP',1),(1018,'ENP','GIMNASIO MODERNO JHON NEPER','CP',1),(1019,'TUS','INSTITUTO CONSTRUCTORES DEL FUTURO','CP',1),(1020,'LCR','JARDIN INFANTIL CARRUSEL DE IDEAS','CP',1),(1021,'OTN','CENTRO SUPERIOR DE ESTUDIOS FINANCIEROS E INFORMATICOS - CENPEFI','CP',1),(1022,'UUE','GIMNASIO LAUREL DEL BOSQUE','CP',1),(1023,'FDT','INSTITUTO IP EDUCANDO LA JUVENTUD FUTURO DE COLOMBIA','CP',1),(1024,'AHT','LICEO MI NUEVO HORIZONTE DEL TABORA','CP',1),(1025,'RVG','CENTRO EDUCATIVO JORGE TADEO LOZANO','CP',1),(1026,'OLF','LICEO MODERNO CELESTIN FREINET','CP',1),(1027,'EAR','COLEGIO PASOS FIRMES','CP',1),(1028,'TDL','JARDIN INFANTIL MANITAS FELICES','CP',1),(1029,'LEF','LICEO LOWENFELD','CP',1),(1030,'NRU','GIMNASIO MODERNO LA CUMBRE','CP',1),(1031,'GLO','COLEGIO REAL DE BOGOTA','CP',1),(1032,'OOH','BACHILLERATO DE ADULTOS COLSUBSIDIO','CP',1),(1033,'CDG','CENTRO DE ESTUDIOS GRANDES GENIOS','CP',1),(1034,'CPA','CENTRO PANAMERICANO DE CAPACITACION','CP',1),(1035,'IMO','CORPORACION TECNOLOGICA EMPRESARIAL','CP',1),(1036,'DIE','LICEO INFANTIL APRENDAMOS JUNTOS','CP',1),(1037,'GLI','JARDIN INFANTIL MI GATEITO','CP',1),(1038,'MFN','GIMNASIO INFANTIL LOS ALAMOS','CP',1),(1039,'NOA','GIMNASIO NUEVA GENERACION DE BOGOTA','CP',1),(1040,'LEL','COLEGIO PAULO FREIRE','CP',1),(1041,'OYE','COLEGIO MAYOR DE ENGATIVA','CP',1),(1042,'INC','COLEGIO EMMANUEL RUBIANO','CP',1),(1043,'BAC','CENTRO DE EDUCACION LABORAL','CP',1),(1044,'O-O','COLEGIO PADRE MANYANET - BOGOTA','CP',1),(1045,'TAF','JARDIN INFANTIL GOTICAS DE ILUSIONES','CP',1),(1046,'NEM','LICEO MODERNO LEEUWENHOEK','CP',1),(1047,'SEF','TALENTOS JARDIN INFANTIL Y CENTRO TERAPEUTICO INTEGRAL','CP',1),(1048,'LLA','LICEO SAN RAFAEL DE ALICANTE','CP',1),(1049,'GDE','COLEGIO HORIZONTE LUZ Y VIDA','CP',1),(1050,'EID','LICEO MODERNO BRITANICO','CP',1),(1051,'SGO','LICEO PSICOPEDAGOGICO DECROLY','CP',1),(1052,'IFI','LICEO INFANTIL MOVIMIENTOS MAGICOS','CP',1),(1053,'OTA','INSTITUTO TOMAS MORO','CP',1),(1054,'TRA','LICEO SANTA MARIA DE LA RIVIERA','CP',1),(1055,'ONE','GIMNASIO NUESTRO MUNDO MAGICO','CP',1),(1056,'TSN','INSTITUTO JOSE MARTINEZ RUIZ','CP',1),(1057,'SOV','COLEGIO ADVENTISTA DEL NORTE','CP',1),(1058,'CAR','LICEO INTEGRAL LA GRANJA','CP',1),(1059,'USA','COLEGIO CLAUDIA JESUS','CP',1),(1060,'YRL','COLEGIO YERMO Y PARRES','CP',1),(1061,'LLG','COLEGIO LUIGI PIRANDELLO','CP',1),(1062,'NCU','INSTITUTO MAYEUTICO','CP',1),(1063,'FMN','JARDIN INFANTIL MIS BUHITOS','CP',1),(1064,'LRE','LICEO JUAN JOSE RONDON','CP',1),(1065,'LRR','PREESCOLAR ZAPATITOS ROJOS','CP',1),(1066,'VAL','GIMNASIO PSICOPEDAGOGICO VILLA MADRIGAL','CP',1),(1067,'ROR','COLEGIO MI PRIMERA FORMACION','CP',1),(1068,'LAN','COLEGIO LA GAITANA (IED)','CP',1),(1069,'UEL','COLEGIO INSTITUTO TECNICO DISTRITAL JULIO FLOREZ (IED)','CP',1),(1070,'MAO','COLEGIO ALBERTO LLERAS CAMARGO (IED)','CP',1),(1071,'BEL','COLEGIO TIBABUYES UNIVERSAL (IED)','CP',1),(1072,'IUU','COLEGIO NUEVA COLOMBIA (IED)','CP',1),(1073,'LSG','COLEGIO GUSTAVO MORALES MORALES (IED)','CP',1),(1074,'MCB','COLEGIO RAMON DE ZUBIRIA (IED)','CP',1),(1075,'ICS','COLEGIO VISTA BELLA (IED)','CP',1),(1076,'RDZ','COLEGIO ALVARO GOMEZ HURTADO (IED)','CP',1),(1077,'AI-','COLEGIO LA TOSCANA - LISBOA (IED)','CP',1),(1078,'BLL','COLEGIO BILBAO (IED)','CP',1),(1079,'LEV','COLEGIO JOSE MARIA VELAZ (IED)','CP',1),(1080,'ZEA','COLEGIO DELIA ZAPATA OLIVELLA (IED)','CP',1),(1081,'GNZ','COLEGIO GERARDO MOLINA RAMIREZ (IED)','CP',1),(1082,'AER','COLEGIO GONZALO ARANGO (IED)','CP',1),(1083,'GGP','COLEGIO VIRGINIA GUTIERREZ DE PINEDA (IED)','CP',1),(1084,'NEE','COLEGIO VEINTIUN ANGELES (IED)','CP',1),(1085,'USE','COLEGIO NICOLAS BUENAVENTURA (IED)','CP',1),(1086,'RAM','COLEGIO FILARMONICO JORGE MARIO BERGOGLIO (IED)','CP',1),(1087,'RRI','COLEGIO COMPARTIR SUBA (IED)','CP',1),(1088,'AOE','COLEGIO JAIME NIÑO DIEZ (IED)','CP',1),(1089,'ICV','COLEGIO ELISA MUJICA VELASQUEZ (IED)','CP',1),(1090,'OVM','COLEGIO FILARMONICO SIMON BOLIVAR (IED)','CP',1),(1091,'BBA','COLEGIO EL SALITRE - SUBA (IED)','CP',1),(1092,'EOV','COLEGIO PRADO VERANIEGO (IED)','CP',1),(1093,'ZIZ','COLEGIO ANIBAL FERNANDEZ DE SOTO (IED)','CP',1),(1094,'EUC','COLEGIO NUEVA ZELANDIA (IED)','CP',1),(1095,'LAI','COLEGIO VILLA ELISA (IED)','CP',1),(1096,'CNE','COLEGIO REPUBLICA DOMINICANA (IED)','CP',1),(1097,'LAO','COLEGIO JUAN LOZANO Y LOZANO (IED)','CP',1),(1098,'ORP','COLEGIO GERARDO PAREDES (IED)','CP',1),(1099,'UCN','COLEGIO HUNZA (IED)','CP',1),(1100,'IEE','LICEO DEL EJERCITO PATRIA SECTOR NORTE B LICEO COLOMBIA','CP',1),(1101,'ALT','COLEGIO GIMNASIO LA SALETTE','CP',1),(1102,'ÑLN','LICEO LA REAL ENSEÑANZA','CP',1),(1103,'TTO','LICEO CATOLICO CAMPESTRE','CP',1),(1104,'DUO','LICEO GOLDEN RULE','CP',1),(1105,'EQO','COLEGIO DEL BOSQUE BILINGÜE','CP',1),(1106,'ILS','COLEGIO BILINGÜE LISA MEITNER','CP',1),(1107,'ASB','GIMNASIO LOS ARRAYANES BILINGÜE','CP',1),(1108,'RSV','COLEGIO FRANCISCANO DEL VIRREY SOLIS','CP',1),(1109,'BAA','LICEO LA SABANA','CP',1),(1110,'IEO','LICEO ROCELY','CP',1),(1111,'CLN','GIMNASIO CHARLES DE GAULLE','CP',1),(1112,'ENR','LICEO SHAKESPEARE DEL NORTE','CP',1),(1113,'LNU','FUNDACION COLEGIO EMILIO VALENZUELA','CP',1),(1114,'AIN','COLEGIO EL VATICANO','CP',1),(1115,'EAG','COLEGIO ALVERNIA BILINGÜE','CP',1),(1116,'OCA','COLEGIO SAN JOSE DE CALASANZ','CP',1),(1117,'MMO','LICEO MODERNO CAMPESTRE','CP',1),(1118,'RUM','INSTITUTO NUEVA AMERICA DE SUBA','CP',1),(1119,'ARU','INSTITUTO CULTURAL RAFAEL MAYA','CP',1),(1120,'EIH','LICEO HOMERICO','CP',1),(1121,'CIE','COLEGIO NUEVA INGLATERRA BILINGÜE INTERNACIONAL','CP',1),(1122,'TCN','GIMNASIO CAMPESTRE STEPHEN HAWKING','CP',1),(1123,'EÑN','COLEGIO BILINGÜE LA ENSEÑANZA','CP',1),(1124,'OBI','LICEO TECNICO BILINGÜE PAULO FREIRE','CP',1),(1125,'NLR','COLEGIO SANTIAGO MAYOR','CP',1),(1126,'IUD','JARDIN Y GUARDERIA PIQUIN Y COCOL','CP',1),(1127,'ZSE','GIMNASIO ESPECIALIZADO LA CAMPIÑA DE SUBA','CP',1),(1128,'CAS','JARDIN INFANTIL COMENCEMOS A VIVIR','CP',1),(1129,'LEC','COLEGIO INGLATERRA REAL','CP',1),(1130,'NIA','JARDIN INFANTIL Y COLEGIO HORIZONTES ABIERTOS','CP',1),(1131,'TSO','GIMNASIO FONTANA','CP',1),(1132,'AST','INSTITUTO SAN BASILIO','CP',1),(1133,'PPA','JARDIN INFANTIL POR UN MAÑANA','CP',1),(1134,'ELI','GIMNASIO LOS PORTALES COLEGIO BILINGÜE','CP',1),(1135,'SII','JARDIN INFANTIL SEMILLITAS BILINGÜE','CP',1),(1136,'NTT','JARDIN INFANTIL EL TALLER DE LOS ARTISTAS','CP',1),(1137,'IAA','LICEO INTEGRAL COLOMBIA ACTIVA','CP',1),(1138,'MRR','JARDIN INFANTIL CAMPESTRE DEL NORTE','CP',1),(1139,'TZO','GIMNASIO MIXTO MANUEL DEL SOCORRO RODRIGUEZ','CP',1),(1140,'ARO','COLEGIO INTEGRADO EDUARDO CABALLERO CALDERON','CP',1),(1141,'ELD','LICEO MALLERLAND','CP',1),(1142,'AEC','COLEGIO DE EDUCACION TECNICA Y ACADEMICA CELESTIN FREINET','CP',1),(1143,'UOT','CENTRO EDUCATIVO LOS ANDES','CP',1),(1144,'LIA','LICEO SAN ISIDRO','CP',1),(1145,'ESO','GIMNASIO CAMPESTRE ESCALEMOS','CP',1),(1146,'SAO','GIMNASIO BURBUJAS DE SABIDURIA','CP',1),(1147,'VUI','NUEVO INSTITUTO SAN MIGUEL','CP',1),(1148,'JUU','JARDIN INFANTIL LA CASITA DEL BOSQUE DE SUBA','CP',1),(1149,'FMM','GIMNASIO CAMPESTRE DE GUILFORD','CP',1),(1150,'PLI','COLEGIO COLOMBO INTERNACIONAL ACOINPREV','CP',1),(1151,'SLU','LICEO CULTURAL LAS AMERICAS','CP',1),(1152,'ELU','COLEGIO PEDAGOGICO DULCE MARIA','CP',1),(1153,'YPH','LICEO HYPATIA','CP',1),(1154,'.SD','COLEGIO MODERNO JOHN DEWEY S.A.S.','CP',1),(1155,'ÑIS','LICEO INFANTIL RETOÑITOS','CP',1),(1156,'IIE','COLEGIO INFANTIL MODERNO INGLES','CP',1),(1157,'ISB','COLEGIO COLOMBO AMERICANO CAS','CP',1),(1158,'CAN','COLEGIO NUEVA CIENCIA','CP',1),(1159,'OFS','GIMNASIO DE EDUCACION MEDIA ACADEMICA Y TECNICA FRANCISCANO DE SUBA','CP',1),(1160,'YGD','JARDIN INFANTIL SAINT GREGORY','CP',1),(1161,'BOM','GIMNASIO LA KHUMBRE','CP',1),(1162,'BOO','GIMNASIO COLOMBO BRITANICO - BILINGÜE INTERNACIONAL','CP',1),(1163,'RIS','PREESCOLAR CASA DE LOS NIÑOS MARIA MONTESSORI','CP',1),(1164,'OGO','GIMNASIO LA CIMA','CP',1),(1165,'SOA','GIMNASIO LA MONTAÑA','CP',1),(1166,'OTO','COLEGIO CRISTIANO GRACIA Y AMOR','CP',1),(1167,'TSS','INSTITUTO COPESAL','CP',1),(1168,'VEN','LICEO DE DESARROLLO INFANTIL EL NUEVO COLOMBIANITO','CP',1),(1169,'AJI','LICEO INFANTIL CRECER JUNTOS','CP',1),(1170,'OST','LICEO CHICO CAMPESTRE','CP',1),(1171,'RMM','INSTITUTO ALBERTO MERANI','CP',1),(1172,'LSR','GIMNASIO Y PREESCOLAR PSICOPEDAGOGICO CONDEMARIN','CP',1),(1173,'IDG','GIMNASIO ESPECIALIZADO DEL NORTE','CP',1),(1174,'NOL','COLEGIO SANTO TORIBIO DE MONGROVEJO','CP',1),(1175,'MSO','GIMNASIO ARTISTICO DE SUBA','CP',1),(1176,'NRI','GIMNASIO MODERNO GENERACION DEL FUTURO','CP',1),(1177,'DAO','INSTITUTO PSICOPEDAGOGICO ROSAL DE SUBA','CP',1),(1178,'BNC','CENTRO EDUCATIVO LOMBARDIA','CP',1),(1179,'LGA','COLEGIO SAN GABRIEL POSSENTI','CP',1),(1180,'EAL','COLEGIO CORAZONISTA','CP',1),(1181,'IEN','COLEGIO HOGAR DE NAZARETH','CP',1),(1182,'SOG','COLEGIO REINA DE GALES','CP',1),(1183,'IHA','LICEO INFANTIL NATHALIA','CP',1),(1184,'CIH','COLEGIO VAN LEEUWENHOEK','CP',1),(1185,'CMO','COLEGIO COLOMBO BRIGHTON','CP',1),(1186,'MAS','GIMNASIO CRISTIANO ADONAI SAS','CP',1),(1187,'CEN','LICEO FESAN','CP',1),(1188,'CVA','LICEO LA NUEVA ESTANCIA DE SUBA LTDA','CP',1),(1189,'BPI','COLEGIO BILINGÜE MAXIMINO POITIERS','CP',1),(1190,'LLL','TALLER INFANTIL PATICOS DEL MAR','CP',1),(1191,'ETM','GIMNASIO CAMPESTRE BETH-SHALOM','CP',1),(1192,'NVR','COLEGIO NUEVA VERONA','CP',1),(1193,'ASG','LICEO PEDAGOGICO CATHERBLANC S.A.S.','CP',1),(1194,'LTV','LICEO MATOVELLE','CP',1),(1195,'KEO','COLEGIO CRISTIANO KABOD','CP',1),(1196,'NMA','GIMNASIO SANTANA DEL NORTE','CP',1),(1197,'LFE','COLEGIO REUVEN FEUERSTEIN','CP',1),(1198,'LSL','LICEO LOS ANGELES SUBA','CP',1),(1199,'TOO','LICEO ANTONIO NARIÑO','CP',1),(1200,'PLR','COLEGIO PEDAGOGICO ALBORADA','CP',1),(1201,'ISE','COLEGIO SAN SIMON','CP',1),(1202,'AGD','GIMNASIO PSICOPEDAGOGICO SUBA','CP',1),(1203,'PHS','PSICOPEDAGOGICO NUEVO HORIZONTE','CP',1),(1204,'SOO','COLEGIO REAL MAJESTAD','CP',1),(1205,'AFI','JARDIN INFANTIL CAMINO DE ILUSIONES','CP',1),(1206,'REE','LICEO MODERNO MI MUNDO IDEAL','CP',1),(1207,'LCM','LICEO EMPRESARIAL DEL CAMPO','CP',1),(1208,'WIA','LICEO BRITANICO CHARLES DARWIN','CP',1),(1209,'ESS','INSTITUTO UNIVERSAL SAN PEDRO','CP',1),(1210,'MGQ','GIMNASIO BOSQUES DEL NOGAL','CP',1),(1211,'GIO','LICEO PEDAGOGICO LOS SAUCES','CP',1),(1212,'TKK','JARDIN INFANTIL PIKIKOS','CP',1),(1213,'NSM','GIMNASIO KAIPORE CENTRO DE DESARROLLO TEMPRANO','CP',1),(1214,'LEA','COLEGIO FUNDACION HOGAR SAN MAURICIO','CP',1),(1215,'ÜÜG','COLEGIO BILINGÜE RICHMOND','CP',1),(1216,'OAR','COLEGIO ARCA INTERNACIONAL BILINGÜE','CP',1),(1217,'COA','LICEO COLOMBIANO DE TELECOMUNICACIONES','CP',1),(1218,'ORU','CENTRO EDUCATIVO MARIA MONTESSORI','CP',1),(1219,'IRF','JARDIN INFANTIL MANECITAS ROSADITAS','CP',1),(1220,'RMO','GIMNASIO ROMANO MIXTO','CP',1),(1221,'TRO','LICEO DE CIENCIA Y CULTURA HARVARD','CP',1),(1222,'NRE','GIMNASIO PSICOPEDAGOGICO GUILFORD','CP',1),(1223,'IEI','COLEGIO EINSTENIANO','CP',1),(1224,'CMR','COLEGIO REAL DE CUNDINAMARCA','CP',1),(1225,'GGG','COLEGIO GRAN BRETAÑA','CP',1),(1226,'TNN','JARDIN INFANTIL EL ROSARIO','CP',1),(1227,'REO','COLEGIO NUESTRA SEÑORA DEL ROSARIO DE SAN CIPRIANO','CP',1),(1228,'MNS','GIMNASIO PINOSIERRA','CP',1),(1229,'IAM','GIMNASIO LATINOAMERICANO','CP',1),(1230,'GLA','COLEGIO PERTIGA','CP',1),(1231,'IBE','COLEGIO MONTESSORI (MONTESSORI BRITISH SCHOOL) - BILINGÜE INTERNACIONAL','CP',1),(1232,'CAD','COLEGIO EL CAMINO ACADEMY','CP',1),(1233,'AMD','GIMNASIO EDUCATIVO CUNDINAMARCA','CP',1),(1234,'IJI','JARDIN INFANTIL MIS AMIGOS Y YO','CP',1),(1235,'NGA','GIMNASIO PSICOPEDAGOGICO NICOLAS STEMBERG','CP',1),(1236,'RUT','INSTITUTO INTEGRADO DE SUBA','CP',1),(1237,'NAI','LATINOAMERICANA DE SISTEMAS Y EDUCACION LASIT','CP',1),(1238,'DNA','JARDIN INFANTIL PEQUEÑOS TALENTOS','CP',1),(1239,'AOR','COLEGIO CALATRAVA','CP',1),(1240,'AMR','JARDIN INFANTIL MI PEQUEÑO GRAN MUNDO','CP',1),(1241,'POE','COLEGIO PEDAGOGICO DANIEL FELIPE','CP',1),(1242,'AIB','JARDIN INFANTIL SAN GABRIEL ARCANGEL','CP',1),(1243,'OZN','LICEO ARANZAZU','CP',1),(1244,'GOM','GIMNASIO DEVIS','CP',1),(1245,'NFI','JARDIN INFANTIL LA MAGIA DEL AMOR','CP',1),(1246,'TTE','INSTITUTO FORMATES','CP',1),(1247,'GER','COLEGIO NUEVO REINO DE TURINGIA','CP',1),(1248,'OON','COLEGIO SAN NICOLAS DE TOLENTINO','CP',1),(1249,'PLC','LICEO THE DOLPHIN','CP',1),(1250,'RDM','GIMNASIO YACARD','CP',1),(1251,'JCG','JARDIN INFANTIL LA ALEGRIA DE CRECER','CP',1),(1252,'ÑAR','PREESCOLAR MI PEQUEÑO JARDIN','CP',1),(1253,'VCE','COLEGIO VICTORIA','CP',1),(1254,'NÜS','COLEGIO BILINGÜE SAN JUAN DE AVILA','CP',1),(1255,'EFD','CENTRO DE DESARROLLO INFANTIL UNIVERSO MAGICO','CP',1),(1256,'RSO','LICEO BRITANICO SUPERIOR','CP',1),(1257,'PRA','KINDERMUSIKAL PREESCOLAR','CP',1),(1258,'OLP','COLEGIO INSTITUTO SANTIAGO DE COMPOSTELA','CP',1),(1259,'SSC','GIMNASIO INFANTIL DA VINCI','CP',1),(1260,'AKI','LICEO INFANTIL LA CASITA DE VIKY','CP',1),(1261,'DAN','JARDIN INFANTIL EDUCANDO CON AMOR','CP',1),(1262,'RIM','GIMNASIO MONTREAL','CP',1),(1263,'OCE','LICEO CRECER EL RENACER','CP',1),(1264,'SIU','CENTRO DE ESTUDIOS SAN BASILIO','CP',1),(1265,'RTT','INSTITUTO GERWILL','CP',1),(1266,'NAF','GIMNASIO INFANTIL LOS NIÑOS DEL MAÑANA','CP',1),(1267,'DEA','COLEGIO NACIDOS PARA TRIUNFAR EN CRISTO','CP',1),(1268,'RNN','COLEGIO KNIGHTSBRIDGE SCHOOLS INTERNATIONAL','CP',1),(1269,'OGY','GIMNASIO PEDAGOGICO MARIA MONTESSORY','CP',1),(1270,'OIT','INSTITUTO CENTRAL DE ESTUDIOS','CP',1),(1271,'ESR','LICEO CAMPESTRE FREINET DEL NORTE','CP',1),(1272,'CFA','CENTRO DE FORMACION SAN FRANCISCO DE ASIS - CENFOR','CP',1),(1273,'ILT','LICEO ARTISTICO SAN JOSE','CP',1),(1274,'MMM','GIMNASIO MODERNO SAN SEBASTIAN','CP',1),(1275,'UOE','CENTRO DE ESTUDIOS PRO-PYMES','CP',1),(1276,'AID','INSTITUCION EDUCATIVA FEDERICO GARCIA LORCA','CP',1),(1277,'ONL','COLEGIO SAN ANSELMO','CP',1),(1278,'B-I','LICEO BET-EL','CP',1),(1279,'GCL','COLEGIO REAL LATINO','CP',1),(1280,'CNP','CENTRO JOHANN KEPLER','CP',1),(1281,'NGD','GIMNASIO MABEL CONDEMARIN','CP',1),(1282,'IUL','COLEGIO SUPERIOR DE PALERMO','CP',1),(1283,'BIA','COLEGIO CENCOSISTEMAS SUBA','CP',1),(1284,'AET','COLEGIO DE FORMACION INTEGRAL MONTSAND','CP',1),(1285,'TRU','INSTITUTO NORTE','CP',1),(1286,'EGI','LICEO FEDERICO GARCIA LORCA','CP',1),(1287,'IDN','COLEGIO LEONARDO DA VINCI','CP',1),(1288,'ISI','LICEO SORIA','CP',1),(1289,'CLO','GIMNASIO PSICOPEDAGOGICO INTEGRAL GIMSIPEI','CP',1),(1290,'UOA','COLEGIO AUSTRALIANO CAMPESTRE','CP',1),(1291,'LUF','INSTITUCION EDUCATIVA FRAY LUIS DE LEON','CP',1),(1292,'TOI','GIMNASIO INFANTIL LOS ANGELES','CP',1),(1293,'ESL','COLEGIO SAGRADO CORAZON DE JESUS BETHLEMITAS NORTE','CP',1),(1294,'ÜIR','COLEGIO BILINGÜE RENFORT','CP',1),(1295,'IGF','LICEO PEDAGOGICO SEMILLAS DEL FUTURO','CP',1),(1296,'MSH','COLEGIO CRISTIANO MONTE HEBRON','CP',1),(1297,'MNO','GIMNASIO PEDAGOGICO PIAGETH','CP',1),(1298,'QMB','GIMNASIO EL BOSQUE','CP',1),(1299,'TOR','COLEGIO SOCIO CULTURAL ZAFIR','CP',1),(1300,'NCV','COLEGIO INNOVA NIZA','CP',1),(1301,'IIJ','JARDIN INFANTIL BURBUJITAS DE PAPEL','CP',1),(1302,'LLE','COLEGIO PEDAGOGICO NEOGRANADINO','CP',1),(1303,'RCC','COLEGIO CULTURAL DEL NORTE','CP',1),(1304,'RCG','GIMNASIO INTERACTIVO NEOGRANADINO','CP',1),(1305,'CEB','COLEGIO CAMBRIDGE BOGOTA','CP',1),(1306,'SPN','INSTITUTO PERSONALIZADO RENFORT','CP',1),(1307,'IBM','LICEO RIOBAMBA','CP',1),(1308,'RVD','COLEGIO DIVINO SALVADOR','CP',1),(1309,'JCL','COLEGIO SAN JORGE DE INGLATERRA','CP',1),(1310,'LIN','COLEGIO LAUSANA','CP',1),(1311,'NEA','ASPAEN GIMNASIO IRAGUA','CP',1),(1312,'AL´','COLEGIO EMMANUEL D´ALZON','CP',1),(1313,'RLN','GIMNASIO EL PORTILLO','CP',1),(1314,'SOT','COLEGIO SAN PATRICIO','CP',1),(1315,'TCT','COLEGIO CRISTO REY BOGOTA','CP',1),(1316,'IGT','COLEGIO AGUSTINIANO SUBA','CP',1),(1317,'VCV','LICEO SEGOVIA','CP',1),(1318,'LET','COLEGIO STELLA MATUTINA','CP',1),(1319,'SNN','COLEGIO AGUSTINIANO NORTE','CP',1),(1320,'YUN','COLEGIO NUEVA YORK','CP',1),(1321,'LHT','LICEO GLOBERTH MIXTO','CP',1),(1322,'ELF','LICEO SAN RAFAEL','CP',1),(1323,'CNN','COLEGIO BILINGÜE HISPANOAMERICANO CONDE ANSUREZ','CP',1),(1324,'MON','FUNDACION NUEVO MARYMOUNT','CP',1),(1325,'IHL','COLEGIO HELVETIA','CP',1),(1326,'OSA','GIMNASIO SANTA CRISTINA DE TOSCANA','CP',1),(1327,'OHE','COLEGIO COLOMBO HEBREO','CP',1),(1328,'JNL','COLEGIO SAN JOSE DEL JUNCAL','CP',1),(1329,'ISL','COLEGIO SAN LUIS','CP',1),(1330,'AHN','COLEGIO BILINGÜE ABRAHAM LINCOLN','CP',1),(1331,'IST','COLEGIO SAN TARSICIO','CP',1),(1332,'ARE','GIMNASIO LOS ROBLES','CP',1),(1333,'GSO','COLEGIO GEORGE WASHINGTON CAMPESTRE','CP',1),(1334,'AYA','JARDIN INFANTIL PLATERO Y YO','CP',1),(1335,'NSI','KINDER BLANCA NIEVES','CP',1),(1336,'MAA','CENTRO EDUCATIVO SAGRADA FAMILIA DE NAZARETH','CP',1),(1337,'OEM','GIMNASIO LA ARBOLEDA','CP',1),(1338,'TFL','COLEGIO ALAFAS DEL NORTE','CP',1),(1339,'SOI','COLEGIO NEIL ARMSTRONG','CP',1),(1340,'SSM','GIMNASIO NUEVO SUBA','CP',1),(1341,'AFN','JARDIN INFANTIL EL RENACUAJO PASEADOR','CP',1),(1342,'ANA','GIMNASIO LAS VILLAS','CP',1),(1343,'IUA','COLEGIO UNIDAD PEDAGOGICA','CP',1),(1344,'ÜUG','COLEGIO INTERNACIONAL DE EDUCACION INTEGRAL - CIEDI - BILINGÜE INTERNACIONAL','CP',1),(1345,'OOG','COLEGIO TECNOLOGICO DE SUBA','CP',1),(1346,'PAA','INSTITUTO MILITAR AQUILEO PARRA','CP',1),(1347,'RAO','COLEGIO SANTA ISABEL DE HUNGRIA','CP',1),(1348,'GLF','COLEGIO JONATHAN SWIFT','CP',1),(1349,'SSS','GIMNASIO LOMAS DEL VALLE SAS','CP',1),(1350,'COL','COLEGIO LOS NOGALES','CP',1),(1351,'DOA','COLEGIO ANDINO','CP',1),(1352,'RLS','LICEO TERIOSKA','CP',1),(1353,'DNF','JARDIN INFANTIL GIRASOL','CP',1),(1354,'INF','JARDIN INFANTIL PRADITO','CP',1),(1355,'NGE','COLEGIO BILINGÜE CLERMONT','CP',1),(1356,'HGN','COLEGIO BILINGÜE BUCKINGHAM','CP',1),(1357,'TLR','INSTITUTO TECNICO COMERCIAL CERROS DE SUBA','CP',1),(1358,'DAR','GIMNASIO SANTANDER','CP',1),(1359,'EGC','LICEO SAMANIEGO','CP',1),(1360,'TNA','CENTRO DE INTEGRACION EDUCATIVA DEL NORTE - CIEN','CP',1),(1361,'IOT','COLEGIO EUCARISTICO MERCEDARIO','CP',1),(1362,'IME','GIMNASIO ACADEMICO REGIONAL','CP',1),(1363,'AVT','INSTITUTO EDUCACION Y VIDA','CP',1),(1364,'MNP','COLEGIO SAN MATEO APOSTOL BILINGÜE INTERNACIONAL','CP',1),(1365,'SLL','COLEGIO SANTIAGO ALBERIONE','CP',1),(1366,'GOÑ','GIMNASIO LA CAMPIÑA','CP',1),(1367,'RMS','GIMNASIO VERMONT','CP',1),(1368,'GCO','COLEGIO COLOMBO GALES','CP',1),(1369,'IMI','LICEO DE COLOMBIA BILINGÜE','CP',1),(1370,'SGR','GIMNASIO INGLES CAMPESTRE','CP',1),(1371,'CEU','EXTERNADO CARO Y CUERVO','CP',1),(1372,'MID','GIMNASIO LOS ANDES','CP',1),(1373,'NUS','COLEGIO SANTA MARIANA DE JESUS','CP',1),(1374,'ENS','GIMNASIO DEL NORTE','CP',1),(1375,'USS','GIMNASIO LA CUSPIDE','CP',1),(1376,'DMD','JARDIN INFANTIL MI PEQUEÑO MUNDO','CP',1),(1377,'ANO','COLEGIO JOSE JOAQUIN CASTRO MARTINEZ','CP',1),(1378,'ONB','COLEGIO SANTA HELENA BAVIERA','CP',1),(1379,'NOV','COLEGIO EVERGREEN','CP',1),(1380,'BNO','JARDIN INFANTIL EL GATO CON BOTAS','CP',1),(1381,'ZDR','COLEGIO MADRE PILAR IZQUIERDO','CP',1),(1382,'NIV','COLEGIO SAN VIATOR BILINGÜE INTERNACIONAL','CP',1),(1383,'AÑI','COLEGIO MILITAR ANTONIO NARIÑO','CP',1),(1384,'GON','COLEGIO NUEVO SAN LUIS GONZAGA','CP',1),(1385,'NIB','LICEO BOSTON','CP',1),(1386,'ORC','COLEGIO NUEVO CAMPESTRE','CP',1),(1387,'MEI','LICEO JUAN RAMON JIMENEZ','CP',1),(1388,'LNN','COLEGIO FEMENINO LORENCITA VILLEGAS DE SANTOS (IED)','CP',1),(1389,'SIS','COLEGIO TECNICO DOMINGO FAUSTINO SARMIENTO (IED)','CP',1),(1390,'ELH','COLEGIO HELADIA MEJIA (IED)','CP',1),(1391,'NEI','COLEGIO JORGE ELIECER GAITAN (IED)','CP',1),(1392,'CUO','COLEGIO REPUBLICA DE PANAMA (IED)','CP',1),(1393,'MEF','COLEGIO FRANCISCO PRIMERO S.S. (IED)','CP',1),(1394,'CZM','COLEGIO RAFAEL BERNAL JIMENEZ (IED)','CP',1),(1395,'FFB','COLEGIO JUAN FRANCISCO BERBEO (IED)','CP',1),(1396,'CAO','COLEGIO TOMAS CARRASQUILLA (IED)','CP',1),(1397,'POO','LICEO PEDAGOGICO','CP',1),(1398,'SCE','LICEO SANTA HELENA','CP',1),(1399,'ZNC','GIMNASIO DEL CORAZON DE MARIA','CP',1),(1400,'SPO','COLEGIO SAN FELIPE NERI','CP',1),(1401,'NUC','LICEO HERMANO MIGUEL LA SALLE','CP',1),(1402,'IAZ','INSTITUTO ALBERT SCHWEITZER','CP',1),(1403,'RLL','COLEGIO MARILLAC','CP',1),(1404,'PEP','COLEGIO SAN PIO X','CP',1),(1405,'ZCE','LICEO LOS ALCAZARES','CP',1),(1406,'SRI','FUNDACION DE ASISTENCIA SOCIAL MADRE RAFOLS','CP',1),(1407,'IAS','COLEGIO SANTA ROSA DE LIMA','CP',1),(1408,'DGG','COLEGIO MERCEDARIO SAN PEDRO NOLASCO','CP',1),(1409,'TLC','LICEO CATOLICO','CP',1),(1410,'RML','COLEGIO ALEXANDER HUMBOLDT','CP',1),(1411,'ITI','JARDIN INFANTIL MI CABAÑITA','CP',1),(1412,'EOT','COLEGIO MONSERRATE','CP',1),(1413,'PAN','JARDIN INFANTIL PEQUEÑAS PERSONITAS','CP',1),(1414,'ASS','JARDIN INFANTIL LOS AMIGOS DEL BOSQUE','CP',1),(1415,'MNI','JARDIN INFANTIL MI DULCE ENCUENTRO','CP',1),(1416,'PRO','CENTRO DE PROMOCION SAN JOSE','CP',1),(1417,'RL)','LICEO VAL (VIDA-AMOR-LUZ)','CP',1),(1418,'AVA','COLEGIO NAVAL SANTA FE DE BOGOTA','CP',1),(1419,'NNO','LICEO EL ENCUENTRO','CP',1),(1420,'AUC','LICEO FORMACION EDUCACION PERSONALIZADA','CP',1),(1421,'RIN','GUARDERIA Y PREESCOLAR CAMINO A LA IMAGINACION','CP',1),(1422,'NER','COLEGIO TRIANGULO CHAPINERO','CP',1),(1423,'GOC','COLEGIO CAPACITACION 2000 CHAPINERO','CP',1),(1424,'IHT','GIMNASIO CRISTIANO SHEKINAH','CP',1),(1425,'NOF','LICEO INFANTIL MAPI','CP',1),(1426,'TFS','JARDIN INFANTIL CUNITAS Y CRAYOLAS','CP',1),(1427,'SIN','JARDIN INFANTIL CONNIE´S GARDEN','CP',1),(1428,'GNI','COLEGIO GIMNASIO AMERICANO','CP',1),(1429,'AAK','JARDIN INFANTIL KANGURITOS TRAVIESOS','CP',1),(1430,'CDU','JARDIN INFANTIL JUGANDO CON YAYA','CP',1),(1431,'JFA','JARDIN INFANTIL ANGELES DEL SABER','CP',1),(1432,'SGC','PREESCOLAR MUNDO MAGICO ABC','CP',1),(1433,'ÜOI','COLEGIO MONTEHELENA BILINGÜE','CP',1),(1434,'NCH','COLEGIO MONTEHELENA CICLOS','CP',1),(1435,'NKI','GIMNASIO IKIGAI','CP',1),(1436,'NID','JARDIN INFANTIL LUKAS KINDERGARDEN','CP',1),(1437,'DUM','INSTITUTO PEDAGOGICO ARTURO RAMIREZ MONTUFAR','CP',1),(1438,'BTA','COLEGIO MANUELA BELTRAN (IED)','CP',1),(1439,')LP','COLEGIO PARA HIJOS DE LOS EMPLEADOS DE LA CONTRALORIA GENERAL DE LA REPUBLICA (COOTRANAL)','CP',1),(1440,'PGO','COLEGIO TECNICO PALERMO (IED)','CP',1),(1441,'MML','COLEGIO GEORGE WILLIAMS','CP',1),(1442,'LMD','COLEGIO GLENN DOMAN','CP',1),(1443,'SGE','COLEGIO CALASANZ LA ESMERALDA ESCOLAPIAS','CP',1),(1444,'MCA','LICEO LATINOAMERICANO','CP',1),(1445,'RRV','COLEGIO INTEGRAL ERVID','CP',1),(1446,'GCM','COLEGIO EL CARMELO','CP',1),(1447,'ANR','COLEGIO AMERICANO DE BOGOTA','CP',1),(1448,'SAC','COLEGIO SANTA CLARA','CP',1),(1449,'TTL','GIMNASIO SANTA ROSA DE LIMA','CP',1),(1450,'OÑC','COLEGIO DE NUESTRA SEÑORA DEL PILAR','CP',1),(1451,'UUQ','LICEO PARROQUIAL SARA ZAPATA','CP',1),(1452,'RMG','GIMNASIO ANTONIO NARIÑO','CP',1),(1453,'CCS','COLEGIO ANTONIO NARIÑO H.H. CORAZONISTAS','CP',1),(1454,'IMG','COLEGIO CHAMPAGNAT','CP',1),(1455,'ADS','JARDIN INFANTIL MERCEDITAS','CP',1),(1456,'XBA','COLEGIO BOGOTANO MIXTO','CP',1),(1457,'DFS','GIMNASIO NICOLAS DE FEDERMAN','CP',1),(1458,'TAD','JARDIN INFANTIL LOS ANGELES','CP',1),(1459,'JOE','JARDIN PEDAGOGICO RAFAEL POMBO','CP',1),(1460,'PON','PREESCOLAR LA RONDA DE LOS NIÑOS','CP',1),(1461,'IYG','GIMNASIO WILLIAM MACKINLEY','CP',1),(1462,'RAC','JARDIN INFANTIL CARACOLITO','CP',1),(1463,'INO','COLEGIO PRINCIPADO DE MONACO','CP',1),(1464,'VLV','LICEO DE LA UNIVERSIDAD CATOLICA','CP',1),(1465,'GTA','GIMNASIO AMIGUITOS DEL MUNDO','CP',1),(1466,'POL','LICEO PSICOPEDAGOGICO LA ESMERALDA','CP',1),(1467,'OMD','COLEGIO CASA ACADEMICA CULTURAL','CP',1),(1468,'MNN','GIMNASIO MOUNT SINAI','CP',1),(1469,'ONH','GIMNASIO MIS CHICCOS','CP',1),(1470,'LLC','COLEGIO VIRTUAL SIGLO XXI','CP',1),(1471,'FCT','CENTRO INFANTIL EDUCAR','CP',1),(1472,'NAE','JARDIN INFANTIL LERNER Y KLEIN','CP',1),(1473,'EOS','COLEGIO FILADELFIA PARA SORDOS','CP',1),(1474,'TNT','JARDIN INFANTIL DATA SESAMO','CP',1),(1475,'ADC','JARDIN INFANTIL CUIDADOS Y CARICIAS','CP',1),(1476,'SFH','JARDIN INFANTIL CHARLES PERRAULT','CP',1),(1477,'PBB','GIMNASIO SUPER BEBE','CP',1),(1478,'NUA','JARDIN INFANTIL EL OSITO PELUSIN','CP',1),(1479,'DFX','CENTRO DE EXPRESION ARTISTICA MAFALDA','CP',1),(1480,'ENC','COLEGIO LOS ANGELES DE HELVETIA','CP',1),(1481,'-PC','COLEGIO CENTRO DE APLICACION PEDAGOGICA - CEDAP','CP',1),(1482,'TBI','INSTITUTO ANDINO DE BACHILLERATO Y CAPACITACION','CP',1),(1483,'ALR','PREESCOLAR ARTISTICO AMBIENTAL SEMILLAS','CP',1),(1484,'SBO','COLEGIO BOSTON','CP',1),(1485,'RIB','GIMNASIO SERES Y SABERES','CP',1),(1486,'CMF','JARDIN INFANTIL UNIVERSO MAGICO','CP',1),(1487,'ETG','COLEGIO SAN ANGEL SALITRE','CP',1),(1488,'LOE','COLEGIO FORMARTE','CP',1),(1489,'0AO','COLEGIO CAPACITACION 2000','CP',1),(1490,'COS','LICEO TOMAS MORALES','CP',1),(1491,'OSN','COLEGIO MONTEHELENA - CICLOS','CP',1),(1492,'MO-','COLEGIO DE FORMACION DE CIUDADANOS - COGLOBAL','CP',1),(1493,'NIT','COLEGIO EDUARDO SANTOS (IED)','CP',1),(1494,'GIE','COLEGIO REPUBLICA BOLIVARIANA DE VENEZUELA (IED)','CP',1),(1495,'OCL','COLEGIO SAN FRANCISCO DE ASIS (IED)','CP',1),(1496,'TAG','COLEGIO LICEO NACIONAL ANTONIA SANTOS (IED)','CP',1),(1497,'NAC','ESCUELA TECNOLOGICA INSTITUTO TECNICO CENTRAL','CP',1),(1498,'ECL','COLEGIO LICEO NACIONAL AGUSTIN NIETO CABALLERO (IED)','CP',1),(1499,'HME','COLEGIO TECNICO MENORAH (IED)','CP',1),(1500,'MNG','COLEGIO PANAMERICANO (IED)','CP',1),(1501,'IRR','COLEGIO RICAURTE (IED)','CP',1),(1502,'SIM','COLEGIO HERMANAS MISIONERAS DE LA CONSOLATA','CP',1),(1503,'SUA','LICEO PARROQUIAL SAN GREGORIO MAGNO','CP',1),(1504,'NIL','COLEGIO UNIDAD RESIDENCIAL COLSEGUROS','CP',1),(1505,'ESE','COLEGIO NUESTRA SEÑORA DE LAS LAJAS','CP',1),(1506,'SEO','COLEGIO SAN JOSE','CP',1),(1507,'SEE','COLEGIO NUESTRA SEÑORA DE LA PAZ','CP',1),(1508,'ÑNR','COLEGIO DE NUESTRA SEÑORA DE LA PRESENTACION CENTRO','CP',1),(1509,'LUE','COLEGIO EXTERNADO CULTURAL','CP',1),(1510,'LCL','COLEGIO SANTA ELENA MIXTO','CP',1),(1511,'QRO','COLEGIO PARROQUIAL SAN ROQUE','CP',1),(1512,'NLÜ','COLEGIO BILINGÜE INTEGRAL','CP',1),(1513,'BDE','COLEGIO BILINGÜE CEDAM','CP',1),(1514,'ATH','JARDIN INFANTIL HUELLITAS MAGICAS','CP',1),(1515,'OTC','COLEGIO SANTO STEFANO','CP',1),(1516,'IFN','JARDIN INFANTIL SERVIMOS','CP',1),(1517,'OIG','COLEGIO TRIANGULO PALOQUEMAO','CP',1),(1518,'NBA','JARDIN PSICOPEDAGOGICO EL MANANTIAL DEL SABER','CP',1),(1519,'SPM','TALLER PSICOPEDAGOGICO MIS PEQUEÑOS ARTISTAS','CP',1),(1520,'IUT','JARDIN INFANTIL Y GUARDERIA RICAURTE','CP',1),(1521,'BRI','COLEGIO SUPERIOR PALERMO SANTA ISABEL','CP',1),(1522,'AIM','JARDIN INFANTIL MALU Y YO','CP',1),(1523,'ORL','COLEGIO ESCUELA NORMAL SUPERIOR DISTRITAL MARIA MONTESSORI (IED)','CP',1),(1524,'ADL','COLEGIO ATANASIO GIRARDOT (IED)','CP',1),(1525,'GIP','COLEGIO TECNICO JAIME PARDO LEAL (IED)','CP',1),(1526,'RAU','COLEGIO PARROQUIAL NUESTRA SEÑORA DE LA VALVANERA','CP',1),(1527,'UME','COLEGIO ADVENTISTA EMMANUEL','CP',1),(1528,'AAÑ','CENTRO EDUCATIVO DE NUESTRA SEÑORA DE LA PAZ','CP',1),(1529,'ATT','INSTITUTO BOGOTA','CP',1),(1530,'NOR','COLEGIO COOPERATIVO DEL MAGISTERIO DE CUNDINAMARCA','CP',1),(1531,'RNS','ESCUELA NORMAL SUPERIOR NUESTRA SEÑORA DE LA PAZ','CP',1),(1532,'TGA','COLEGIO PARROQUIAL DEL SANTO CURA DE ARS','CP',1),(1533,'AEI','INSTITUTO JULIO MARIA MATOVELLE','CP',1),(1534,'OIR','COLEGIO CRISTO REY DEL SUR','CP',1),(1535,'DEO','INSTITUTO ACADEMICO BETHEL','CP',1),(1536,'TIM','LICEO MODERNO WALT WHITMAN','CP',1),(1537,'RRF','COLEGIO EDUARDO FREI','CP',1),(1538,'ASC','JARDIN INFANTIL CARTAGENA DE INDIAS','CP',1),(1539,'NJI','JARDIN INFANTIL MI NUEVO MUNDO','CP',1),(1540,'AUL','COLEGIO GUSTAVO ROJAS PINILLA','CP',1),(1541,'DCO','LICEO PEDAGOGICO MARCEL MARCEAU','CP',1),(1542,'NTI','JARDIN INFANTIL TRINEO DE LA ALEGRIA','CP',1),(1543,'FJI','JARDIN INFANTIL DEL ARCO IRIS','CP',1),(1544,'JIJ','JARDIN INFANTIL GOMELITOS','CP',1),(1545,'LNR','COLEGIO BILINGÜE SAN GABRIEL ARCANGEL','CP',1),(1546,'ANJ','COLEGIO INTEGRAL SAN JORGE CENTRAL','CP',1),(1547,'SLI','COLEGIO CENCOSISTEMAS','CP',1),(1548,'EEV','JARDIN INFANTIL MIS PEQUEÑAS TRAVESURAS','CP',1),(1549,'AUE','BACHILLERATO A DISTANCIA PARA JOVENES Y ADULTOS DE LA UNIVERSIDAD NACIONAL ABIERTA Y A DISTANCIA UNAD-REGIONAL BOGOTA','CP',1),(1550,'INP','JARDIN INFANTIL LOS PINGUINOS','CP',1),(1551,'UIO','GIMNASIO MONSEÑOR MANUEL MARIA CAMARGO','CP',1),(1552,'IBA','LICEO INTEGRAL BOGOTA','CP',1),(1553,'SPR','PREESCOLAR RONDAS Y SABERES','CP',1),(1554,'GEG','COLEGIO CIES','CP',1),(1555,'PCU','COLEGIO DE CULTURA POPULAR (IED)','CP',1),(1556,'MLC','COLEGIO LA MERCED (IED)','CP',1),(1557,'IAE','COLEGIO SILVERIA ESPINOSA DE RENDON (IED)','CP',1),(1558,'GEI','COLEGIO ANDRES BELLO (IED)','CP',1),(1559,'MIJ','COLEGIO EL JAZMIN (IED)','CP',1),(1560,'SIC','COLEGIO ESPAÑA (IED)','CP',1),(1561,'RRA','COLEGIO TECNICO BENJAMIN HERRERA (IED)','CP',1),(1562,'ASQ','COLEGIO JOSE JOAQUIN CASAS (IED)','CP',1),(1563,'GCT','COLEGIO ANTONIO JOSE DE SUCRE (IED)','CP',1),(1564,'IÑR','COLEGIO MARCO ANTONIO CARREÑO SILVA (IED)','CP',1),(1565,'IJA','COLEGIO LUIS VARGAS TEJADA (IED)','CP',1),(1566,'VAA','COLEGIO JULIO GARAVITO ARMERO (IED)','CP',1),(1567,'GSE','COLEGIO SORRENTO (IED)','CP',1),(1568,'JER','COLEGIO JOSE MANUEL RESTREPO (IED)','CP',1),(1569,'CLT','COLEGIO LUIS CARLOS GALAN SARMIENTO (IED)','CP',1),(1570,'RAG','COLEGIO SANTA TERESITA','CP',1),(1571,'ETL','LICEO PSICOPEDAGOGICO MI ABUELITA ROSSY','CP',1),(1572,'LHA','COLEGIO PARROQUIAL BILINGÜE SANTA ISABEL DE HUNGRIA','CP',1),(1573,'ACL','LICEO DEL CARIBE','CP',1),(1574,'NRR','COLEGIO BILINGÜE NUESTRA SEÑORA DEL ROSARIO','CP',1),(1575,'TIA','LICEO INFANTIL SANTA RITA','CP',1),(1576,'UEU','COLEGIO SAN LUCAS','CP',1),(1577,'BMI','COLEGIO BILINGÜE JOSE ALLAMANO','CP',1),(1578,'ITT','INSTITUTO GALILEO','CP',1),(1579,'CND','INSTITUTO CEMODEN','CP',1),(1580,'GIC','COLEGIO LUIS CONCHA CORDOBA','CP',1),(1581,'NDI','COLEGIO PARROQUIAL CONFRATERNIDAD DE LA DOCTRINA CRISTIANA','CP',1),(1582,'BGL','COLEGIO PARROQUIAL MONSEÑOR EMILIO DE BRIGARD','CP',1),(1583,'CSM','LICEO AVENIDA LAS AMERICAS','CP',1),(1584,'ICR','COLEGIO KAPEIROT','CP',1),(1585,'EBO','LICEO SAN BERNARDO','CP',1),(1586,'ILD','COLEGIO MARIA SANTA SOLEDAD','CP',1),(1587,'SSO','COLEGIO SAN ALEJO','CP',1),(1588,'LGE','LICEO ROMULO GALLEGOS','CP',1),(1589,'CBA','LICEO BOGOTA','CP',1),(1590,'VSL','COLEGIO ROMEL VELASCO','CP',1),(1591,'RUD','INSTITUTO DE INTEGRACION CULTURAL IDIC','CP',1),(1592,'ODL','GIMNASIO INFANTIL JULIO SIMON BENAVIDES','CP',1),(1593,'AGE','LICEO DE LOS ANGELES','CP',1),(1594,'EJS','COLEGIO FRAY JUAN DE LOS ANGELES','CP',1),(1595,'VOP','COLEGIO LOPE DE VEGA','CP',1),(1596,'NAP','LICEO DIANA PAOLA','CP',1),(1597,'OSU','COLEGIO BILINGÜE CIUDAD MONTES','CP',1),(1598,'DDC','LICEO MODERNO ALELI','CP',1),(1599,'PQP','PREESCOLAR CHIQUIHOUSE','CP',1),(1600,'CVO','LICEO NUEVO CHILE','CP',1),(1601,'TAE','LICEO MANANTIAL DE VIDA ETERNA','CP',1),(1602,'RNA','COLEGIO NUESTRA SEÑORA DE LA SALETTE','CP',1),(1603,'MOI','JARDIN INFANTIL GARABATIEMOS','CP',1),(1604,'UAQ','LICEO COQUIBACOA','CP',1),(1605,'SVN','JARDIN INFANTIL UNIVERSO DEL SABER','CP',1),(1606,'OSL','GIMNASIO TALENTOS','CP',1),(1607,'LAY','GIMNASIO SAN VALERY','CP',1),(1608,'IMA','COLEGIO DEL SANTISIMO SACRAMENTO','CP',1),(1609,'AGL','COLEGIO DE INTEGRACION CULTURAL COLDIC','CP',1),(1610,'DCI','COLEGIO CRISTIANO SEMILLA DE VIDA','CP',1),(1611,'FAN','JARDIN INFANTIL LA FRESITA FELIZ','CP',1),(1612,'LTT','LICEO MATERNO INFANTIL PASITOS AL FUTURO','CP',1),(1613,'PRI','INSTITUTO PEDAGOGICO PARA EL DESARROLLO INTEGRAL CREAR','CP',1),(1614,'DFN','JARDIN INFANTIL EL MAGICO MUNDO DE LOS NIÑOS','CP',1),(1615,'ISC','JARDIN PSICOPEDAGOGICO PALOMITOS TRAVIESOS','CP',1),(1616,'LTP','LICEO INFANTIL TRENCITO DE PAPEL','CP',1),(1617,'ALS','LICEO INFANTIL SEMILLITAS DEL SABER','CP',1),(1618,'ILC','PREESCOLAR INTEGRAL','CP',1),(1619,'NNS','JARDIN INFANTIL SALACUNA RAYITOS DEL SOL','CP',1),(1620,'BII','JARDIN INFANTIL PICARDIAS Y BURBUJAS','CP',1),(1621,'IDI','GIMNASIO PSICOPEDAGOGICO APRENDILANDIA','CP',1),(1622,'NFD','JARDIN INFANTIL AVENTURAS DE ANY','CP',1),(1623,'OAF','JARDIN INFANTIL EL PORTAL DE ASTURIAS','CP',1),(1624,'OÑA','LICEO PEDAGOGICO NUESTRA SEÑORA DE LA SABIDURIA','CP',1),(1625,'DPA','JARDIN INFANTIL PERSONITAS DEL MILENIO','CP',1),(1626,'ERA','LICEO ARCO IRIS','CP',1),(1627,'LSA','COLEGIO BLAISE PASCAL','CP',1),(1628,'VRI','JARDIN INFANTIL LOS CHAVITOS CREATIVOS','CP',1),(1629,'SMN','PSICOPEDAGOGICO LUMINOSOS','CP',1),(1630,'NEU','LICEO INFANTIL EL MUNDO DE LOS NIÑOS','CP',1),(1631,'ARC','LICEO Y PREESCOLAR NUESTRA SEÑORA DE LA LUZ','CP',1),(1632,'LBO','COLEGIO BOLIVARIANO','CP',1),(1633,'ERF','JARDIN INFANTIL ANGELES TRAVIESOS','CP',1),(1634,'EDS','GIMNASIO MODERNO ALEXANDER SUTHERLAND','CP',1),(1635,'NTA','INSTITUTO CAMARGO LEON','CP',1),(1636,'OLL','COLEGIO INTEGRADA LA CANDELARIA (IED)','CP',1),(1637,'OAM','COLEGIO ESCUELA NACIONAL DE COMERCIO (IED)','CP',1),(1638,'BST','INSTITUTO BOGOTA CENTRO','CP',1),(1639,'AUR','INSTITUCION EDUCATIVA HOGAR VERACRUZ','CP',1),(1640,'IOU','LICEO JULIO CESAR GARCIA','CP',1),(1641,'ISS','COLEGIO DEL SANTISIMO ROSARIO','CP',1),(1642,'YOA','FUNDACION COLEGIO MAYOR DE SAN BARTOLOME','CP',1),(1643,'RLI','INSTITUTO DE BACHILLERATO TECNICO COMERCIAL PITAGORAS','CP',1),(1644,'LRL','COLEGIO TIRSO DE MOLINA','CP',1),(1645,'SIX','COLEGIO SALESIANO DE LEON XIII','CP',1),(1646,'NCD','LICEO NUEVO MUNDO','CP',1),(1647,'LNE','COLEGIO LOS ANGELES','CP',1),(1648,'NGC','CENTRO SAGRADO CORAZON','CP',1),(1649,'ARI','JARDIN INFANTIL TORRECITAS DEL SABER','CP',1),(1650,'ODT','CENTRO EDUCATIVO LIBERTAD','CP',1),(1651,'VOC','COLEGIO DE INTEGRACION ESCOLAR LUZ Y VIDA','CP',1),(1652,'UAN','COLEGIO HUMANISTA ALEXANDRE PETION','CP',1),(1653,'NPO','COLEGIO RESTREPO MILLAN (IED)','CP',1),(1654,'ROD','COLEGIO REINO DE HOLANDA (IED)','CP',1),(1655,'RCI','COLEGIO LICEO FEMENINO DE CUNDINAMARCA MERCEDES NARIÑO (IED)','CP',1),(1656,'RLB','COLEGIO BRAVO PAEZ (IED)','CP',1),(1657,'QGL','COLEGIO QUIROGA ALIANZA (IED)','CP',1),(1658,'UDE','COLEGIO RAFAEL DELGADO SALGUERO (IED)','CP',1),(1659,'CNO','COLEGIO SAN AGUSTIN (IED)','CP',1),(1660,'MIC','COLEGIO REPUBLICA FEDERAL DE ALEMANIA (IED)','CP',1),(1661,'URC','COLEGIO MANUEL DEL SOCORRO RODRIGUEZ (IED)','CP',1),(1662,'OLR','COLEGIO EL LIBERTADOR (IED)','CP',1),(1663,'DRL','COLEGIO CLEMENCIA HOLGUIN DE URDANETA (IED)','CP',1),(1664,'DOG','COLEGIO ALEJANDRO OBREGON (IED)','CP',1),(1665,'YOY','COLEGIO ANTONIO BARAYA (IED)','CP',1),(1666,'DEG','COLEGIO ALEXANDER FLEMING (IED)','CP',1),(1667,'RSC','COLEGIO MISAEL PASTRANA BORRERO (IED)','CP',1),(1668,'GGU','COLEGIO GUSTAVO RESTREPO (IED)','CP',1),(1669,'IAL','COLEGIO ALFREDO IRIARTE (IED)','CP',1),(1670,'IM(','COLEGIO PALERMO SUR (CED)','CP',1),(1671,'EAN','COLEGIO ENRIQUE OLAYA HERRERA (IED)','CP',1),(1672,'OUB','COLEGIO REPUBLICA EE.UU. DE AMERICA (IED)','CP',1),(1673,'IGN','COLEGIO CLEMENCIA DE CAYCEDO (IED)','CP',1),(1674,'GJO','COLEGIO JOSE MARTI (IED)','CP',1),(1675,'GAY','COLEGIO DIANA TURBAY (IED)','CP',1),(1676,'EII','COLEGIO MARRUECOS Y MOLINOS (IED)','CP',1),(1677,'LZA','COLEGIO LA PAZ (IED)','CP',1),(1678,'LTS','COLEGIO SANTA LUCIA (IED)','CP',1),(1679,'OOI','COLEGIO COLOMBIA VIVA (IED)','CP',1),(1680,'COI','COLEGIO MARIA CANO (IED)','CP',1),(1681,'OPS','LICEO PARROQUIAL SAN JOSE','CP',1),(1682,'PBP','LICEO SUPERIOR DE BOGOTA','CP',1),(1683,'SEI','COLEGIO EL CARMEN TERESIANO','CP',1),(1684,'EGD','COLEGIO DANILO CIFUENTES','CP',1),(1685,'SGB','COLEGIO HERMANOS BELTRAN','CP',1),(1686,'SOU','COLEGIO PARROQUIAL SAN JUAN BAUTISTA DE LA SALLE','CP',1),(1687,'STN','INSTITUTO SAN IGNACIO DE LOYOLA','CP',1),(1688,'LST','INSTITUTO SAN PABLO APOSTOL','CP',1),(1689,'SEU','COLEGIO NUESTRA SEÑORA DE LA SABIDURIA','CP',1),(1690,'AAP','COLEGIO PARROQUIAL SAN LUIS GONZAGA','CP',1),(1691,'OPL','COLEGIO PARROQUIAL DE NUESTRA SEÑORA','CP',1),(1692,'ONS','GIMNASIO SAN JOSE','CP',1),(1693,'RLQ','COLEGIO PARROQUIAL DEL INMACULADO CORAZON DE MARIA','CP',1),(1694,'AVI','CENTRO EDUCATIVO LAS COLINAS','CP',1),(1695,'AUS','INSTITUTO SAN ANTONIO DE PADUA','CP',1),(1696,'ALO','COLEGIO ALVARO CAMARGO DE LA TORRE','CP',1),(1697,'EOL','LICEO LORENZO GRACIAN','CP',1),(1698,'MOC','GIMNASIO INDOAMERICANO','CP',1),(1699,'USU','INSTITUTO PEDAGOGICO NUESTRA SEÑORA DE LAS LAJAS','CP',1),(1700,'LCE','LICEO JUAN MIGUEL','CP',1),(1701,'GCR','COLEGIO RAFAEL MARIA CARRASQUILLA','CP',1),(1702,'TLI','INSTITUTO VILLA DE LA FRATERNIDAD','CP',1),(1703,'UXT','EXTERNADO DEL SUR PSICOPEDAGOGICO','CP',1),(1704,'ELM','LICEO MAYOR DE PALERMO','CP',1),(1705,'CSR','LICEO INFANTIL DESPERTAR','CP',1),(1706,'OGS','COLEGIO SAN ESTEBAN','CP',1),(1707,'IPR','INSTITUTO PSICOPEDAGOGICO INTEGRAL - IPSI','CP',1),(1708,'EAP','LICEO PSICOPEDAGOGICO SAN PABLO','CP',1),(1709,'EES','COLEGIO PSICOPEDAGOGICO AMERICANO DEL SUR','CP',1),(1710,'REJ','JARDIN INFANTIL CASTILLO DE SUEÑOS Y ALEGRIAS','CP',1),(1711,'RLC','COLEGIO CRISTIANO DE COLOMBIA','CP',1),(1712,'FLL','LICEO NUEVA FANTASIA','CP',1),(1713,'AOM','GIMNASIO NUEVA VILLA MAYOR','CP',1),(1714,'CTS','INSTITUTO GUSTAVO ADOLFO BECQUER','CP',1),(1715,'INT','JARDIN INFANTIL CHAMAQUITOS','CP',1),(1716,'IIG','COLEGIO COLOMBO FLORIDA BILINGÜE','CP',1),(1717,'URI','CENTRO EDUCATIVO DEL QUIROGA','CP',1),(1718,'NOW','COLEGIO DE ADMINISTRACION ROBERT OWEN','CP',1),(1719,'END','JARDIN INFANTIL PEQUITAS','CP',1),(1720,'DIC','LICEO LORD SINCLER LOS CAMINOS DEL SABER','CP',1),(1721,'LLT','NUEVO LICEO SANTA CLARA','CP',1),(1722,'YAE','COLEGIO MARIA ADELAIDA HOY','CP',1),(1723,'OYR','COLEGIO MAYOR DEL CLARET','CP',1),(1724,'RTI','JARDIN INFANTIL EL PORTAL DEL SOSIEGO','CP',1),(1725,'KBD','CENTRO DE EDUCACION FORMAL ROBERT HOOKE','CP',1),(1726,'RUG','COLEGIO MAYOR DEL QUIROGA','CP',1),(1727,'IRY','LICEO TECNICO MICROEMPRESARIAL FEYSER GORDILLO ROJAS','CP',1),(1728,'RRS','COLEGIO CRISTIANO DIOS ES AMOR SEDE MIS CORDERITOS','CP',1),(1729,'VHO','COLEGIO DOMINGO SAVIO BILINGUAL SCHOOL','CP',1),(1730,'VII','INSTITUCION EDUCATIVA INTERAMERICANA','CP',1),(1731,'ERO','LICEO PSICOPEDAGOGICO SENDEROS DEL CONOCIMIENTO','CP',1),(1732,'LJC','LICEO JORGE ROBLEDO','CP',1),(1733,'GAR','FUNDACION COLEGIO PRINCIPIO DE SABIDURIA','CP',1),(1734,'IJE','COLEGIO INTEGRADO SANTO TORIBIO DE MOGROVEJO','CP',1),(1735,'LUO','LICEO INFANTIL LE FOUNTAIN','CP',1),(1736,'LCT','COLEGIO CENAT','CP',1),(1737,'USD','CENTRO SOCIAL DE ESTUDIOS','CP',1),(1738,'TTC','CORPORACION EDUCATIVA POLITECNICO LA SALLE','CP',1),(1739,'SIO','GIMNASIO MODERNO CARLO ACUTIS','CP',1),(1740,'MTL','INSTITUTO ANDRE MICHELIN','CP',1),(1741,'EVV','LICEO PEDAGOGICO MENDELEV','CP',1),(1742,'RNO','COLEGIO MONTESSORIANO','CP',1),(1743,'OOD','LICEO PSICOPEDAGOGICO MARCO FIDEL SUAREZ','CP',1),(1744,'OLG','COLEGIO JALIL GIBRAN','CP',1),(1745,'OVT','CENTRO EDUCATIVO SAN PABLO CESP','CP',1),(1746,'EDO','COLEGIO RENE DESCARTES','CP',1),(1747,'LTK','COLEGIO MODERNO INTEGRAL ERIKA','CP',1),(1748,'MOA','COLEGIO BOLIVARIANO MOLINOS DEL SUR','CP',1),(1749,'ODG','COLEGIO EMPRESARIAL FREDERICK TAYLOR','CP',1),(1750,'RIC','COLEGIO REPUBLICA DE MEXICO (IED)','CP',1),(1751,'MOS','COLEGIO ISMAEL PERDOMO (IED)','CP',1),(1752,'FRL','COLEGIO LEON DE GREIFF (IED)','CP',1),(1753,'AED','COLEGIO CIUDAD DE MONTREAL (IED)','CP',1),(1754,'ECT','COLEGIO SANTA BARBARA (IED)','CP',1),(1755,'NRG','COLEGIO UNION EUROPEA (IED)','CP',1),(1756,'BLR','COLEGIO ARBORIZADORA BAJA (IED)','CP',1),(1757,'ORS','COLEGIO EL TESORO DE LA CUMBRE (IED)','CP',1),(1758,'SAD','COLEGIO NICOLAS GOMEZ DAVILA (IED)','CP',1),(1759,'EME','COLEGIO COMPARTIR RECUERDO (IED)','CP',1),(1760,'GAA','COLEGIO ACACIA II (IED)','CP',1),(1761,'OJA','COLEGIO JOSE JAIME ROJAS (IED)','CP',1),(1762,'IAD','COLEGIO RODRIGO LARA BONILLA (IED)','CP',1),(1763,'MCC','COLEGIO TECNICO CEDID GUILLERMO CANO ISAZA (IED)','CP',1),(1764,'NBN','COLEGIO EL PARAISO DE MANUELA BELTRAN (IED)','CP',1),(1765,'MGM','COLEGIO VILLAMAR (IED)','CP',1),(1766,'IRA','COLEGIO LA ARABIA (IED)','CP',1),(1767,'BTC','COLEGIO ARBORIZADORA ALTA (IED)','CP',1),(1768,'SIG','COLEGIO PARAISO MIRADOR (IED)','CP',1),(1769,'NCC','COLEGIO MARIA MERCEDES CARRANZA (IED)','CP',1),(1770,'TRS','COLEGIO ESTRELLA DEL SUR (IED)','CP',1),(1771,'CEG','COLEGIO SOTAVENTO (IED)','CP',1),(1772,'GOS','COLEGIO SAN FRANCISCO (IED)','CP',1),(1773,'CBT','COLEGIO CONFEDERACION BRISAS DEL DIAMANTE (IED)','CP',1),(1774,'NNL','COLEGIO EL MINUTO DE BUENOS AIRES (IED)','CP',1),(1775,'IVD','COLEGIO CEDID CIUDAD BOLIVAR (IED)','CP',1),(1776,'LOG','COLEGIO SIERRA MORENA (IED)','CP',1),(1777,'BSR','COLEGIO LA ESTANCIA - SAN ISIDRO LABRADOR (IED)','CP',1),(1778,'VLC','COLEGIO CIUDAD BOLIVAR - ARGENTINA (IED)','CP',1),(1779,'OLC','COLEGIO LA JOYA (IED)','CP',1),(1780,'IEG','COLEGIO BUENAVISTA (IED)','CP',1),(1781,'ASM','COLEGIO GIMNASIO SABIO CALDAS (IED)','CP',1),(1782,'IGV','COLEGIO JOSE MARIA VARGAS VILA (IED)','CP',1),(1783,'NOU','COLEGIO CUNDINAMARCA (IED)','CP',1),(1784,'OGN','COLEGIO ANTONIO GARCIA (IED)','CP',1),(1785,'GKI','COLEGIO FANNY MIKEY (IED)','CP',1),(1786,'OEU','COLEGIO EL ENSUEÑO (IED)','CP',1),(1787,'ASR','COLEGIO ROGELIO SALMONA (IED)','CP',1),(1788,'NEG','COLEGIO ANGELA RESTREPO MORENO (IED)','CP',1),(1789,'CNL','COLEGIO EL NOGAL (IED)','CP',1),(1790,'OUU','COLEGIO MARIA CURREA MANRIQUE (IED)','CP',1),(1791,'SRG','COLEGIO AGUDELO RESTREPO (IED)','CP',1),(1792,'GLS','COLEGIO RURAL PASQUILLA (IED)','CP',1),(1793,'ARG','COLEGIO RURAL QUIBA ALTA (IED)','CP',1),(1794,'L(E','COLEGIO MOCHUELO ALTO (CED)','CP',1),(1795,'JRR','COLEGIO RURAL JOSE CELESTINO MUTIS (IED)','CP',1),(1796,'AOD','NUEVO COLEGIO LUSADI LTDA','CP',1),(1797,'CO-','COLEGIO FISDECO - MARGARITA MADRIGAL','CP',1),(1798,'RPE','COLEGIO COOPERATIVO MONSEÑOR ISMAEL PERDOMO','CP',1),(1799,'TIC','LICEO ATENEO COMERCIAL','CP',1),(1800,'SAS','INSTITUTO SOCIAL NOCTURNO DE ENSEÑANZA MEDIA ISNEM','CP',1),(1801,'ACR','INSTITUTO DE EDUCACION ELEMENTAL PREESCOLAR Y SECUNDARIA - INELPRES','CP',1),(1802,'OBU','INSTITUTO AURELIO BALDOR','CP',1),(1803,'GRG','LICEO GUERNIKA','CP',1),(1804,'CMA','COLEGIO ALAMEDA','CP',1),(1805,'CGI','COLEGIO DIEGO ANDRES','CP',1),(1806,'DDR','COLEGIO COFRATERNIDAD DE SAN FERNANDO','CP',1),(1807,'INS','INSTITUTO ORESTES SINDICI','CP',1),(1808,'TNS','INSTITUTO SANTA ANA LUZ DEL CARMEN','CP',1),(1809,'SSI','INSTITUTO CERROS DEL SUR - ICES','CP',1),(1810,'AUG','GIMNASIO COLOMBIANO DEL SUR','CP',1),(1811,'TSI','INSTITUTO JERUSALEN','CP',1),(1812,'AEV','COLEGIO LA NUEVA ESTANCIA LTDA','CP',1),(1813,'ICA','LICEO LA CORUÑA','CP',1),(1814,'RIA','INSTITUTO SANTA MARIA DE LA CRUZ','CP',1),(1815,'CLD','COLEGIO TALLER PSICOPEDAGOGICO DE LOS ANDES','CP',1),(1816,'LYS','LICEO Y PREESCOLAR TOMMYS','CP',1),(1817,'CSC','COLEGIO PSICOPEDAGOGICO LA ACACIA','CP',1),(1818,'NCR','LICEO CONTADORA','CP',1),(1819,'TAS','GIMNASIO MODERNO SANTA MARGARITA','CP',1),(1820,'APA','COLEGIO POPULAR BOLIVARIANO','CP',1),(1821,'ARL','COLEGIO SAN RAFAEL II SEDE','CP',1),(1822,'TAC','LICEO SAN MATEO','CP',1),(1823,'RUR','LICEO SANTA PAULA DEL SUR','CP',1),(1824,'CIC','COLEGIO CANADA (IED)','CP',1),(1825,'FTL','COLEGIO AS DEL FUTURO','CP',1),(1826,'EGL','COLEGIO DIOS ES AMOR LUCERO ALTO','CP',1),(1827,'SRS','COLEGIO COLONIA ESCOLAR DE SAN FRANCISCO','CP',1),(1828,'RLO','LICEO MAURITANIA','CP',1),(1829,'UTO','INSTITUTO PSICOPEDAGOGICO EL TESORO DE LA VERDAD','CP',1),(1830,'LSO','COLEGIO SOLES DEL SABER','CP',1),(1831,'QGA','GIMNASIO INTEGRAL GUATIQUIA','CP',1),(1832,'BMN','GIMNASIO OBREGON','CP',1),(1833,'SRE','COLEGIO CRISTIANO SHEKINAH','CP',1),(1834,'TMA','INSTITUTO MARMATOS LTDA','CP',1),(1835,'GIV','GIMNASIO JULIO GARAVITO','CP',1),(1836,'CIL','LICEO PEDAGOGICO MADRIGAL','CP',1),(1837,'ELT','GIMNASIO CULTURAL MODERNO','CP',1),(1838,'OMN','LICEO MODERNO LOS ANDES','CP',1),(1839,'CNM','CENTRO EDUCATIVO MANUEL ELKIN PATARROYO','CP',1),(1840,'IRT','INSTITUTO SAN FRANCISCO','CP',1),(1841,'GBB','COLEGIO NUEVA VIDA CIUDAD BOLIVAR','CP',1),(1842,'GPP','COLEGIO CRISTIANO EL PACTO','CP',1),(1843,'ÑSN','COLEGIO DIDASCALIO NUESTRA SEÑORA DE LA ESPERANZA','CP',1),(1844,'EEU','COLEGIO JUVENTUD DEL FUTURO','CP',1),(1845,'SBL','COLEGIO COLOMBO CIENCIAS','CP',1),(1846,'FIG','LICEO INFANTIL EL GRAN VIRREY','CP',1),(1847,'GIG','GIMNASIO BOLIVAR II','CP',1),(1848,'LVE','COLEGIO NUEVA CANDELARIA','CP',1),(1849,'ABI','GIMNASIO DE ENSEÑANZA LA SABANA','CP',1),(1850,'GNM','GIMNASIO ISRAEL','CP',1),(1851,'TAN','INSTITUTO POPULAR BOLIVARIANO','CP',1),(1852,'JJL','LICEO INFANTIL JEAN PIAGET','CP',1),(1853,'LOS','GIMNASIO SUR ATLANTA','CP',1),(1854,'VUO','COLEGIO NUEVO MILENIO','CP',1),(1855,'AGA','GIMNASIO LA FONTAINE','CP',1),(1856,'EOP','COLEGIO PALERMO','CP',1),(1857,'OPU','INNOVAR EDUCACION PARA JOVENES Y ADULTOS','CP',1),(1858,'SSD','JARDIN DE INFANTES JORGITO Y SUS AMIGOS','CP',1),(1859,'EDT','COLEGIO DE LA UNIVERSIDAD ANTONIO NARIÑO','CP',1),(1860,'PIR','COLEGIO CAMPESTRE JAIME GARZON (IED)','CP',1),(1861,'ZPO','COLEGIO GIMNASIO DEL CAMPO JUAN DE LA CRUZ VARELA (IED)','CP',1);
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
  `cecfecini` date DEFAULT NULL COMMENT 'Fecha inicial en la que empieza el ciclo.',
  `cecfecfin` date DEFAULT NULL COMMENT 'Fecha final en la que acaba el ciclo.',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo al cual pertenece el ciclo.',
  PRIMARY KEY (`cecid`),
  KEY `fk_centro_educativo_ciclo_cedid_idx` (`cedid`),
  CONSTRAINT `fk_centro_educativo_ciclo_cedid` FOREIGN KEY (`cedid`) REFERENCES `tbl_centro_educativo` (`cedid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo_ciclo`
--

LOCK TABLES `tbl_centro_educativo_ciclo` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo_ciclo` DISABLE KEYS */;
INSERT INTO `tbl_centro_educativo_ciclo` VALUES (1,'PP1','Primer Perdiodo','2026-02-01','2026-05-28',1);
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
  PRIMARY KEY (`edcid`),
  KEY `fk_centro_educativo_curso_cedid_idx` (`cedid`),
  KEY `fk_centro_educativo_curso_usuid_idx` (`usuid`),
  CONSTRAINT `fk_centro_educativo_curso_cedid` FOREIGN KEY (`cedid`) REFERENCES `tbl_centro_educativo` (`cedid`),
  CONSTRAINT `fk_centro_educativo_curso_usuid` FOREIGN KEY (`usuid`) REFERENCES `tbl_usuario` (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo_curso`
--

LOCK TABLES `tbl_centro_educativo_curso` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo_curso` DISABLE KEYS */;
INSERT INTO `tbl_centro_educativo_curso` VALUES (1,'SEX','Sexto',1,2),(2,'SEP','Septimo',1,1),(5,'OCT','Octavo',1,6);
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
  PRIMARY KEY (`ceeid`),
  KEY `fk__centro_educativo_estudiante_tidid_idx` (`tidid`),
  KEY `fk_centro_educativo_estudiante_cedid_idx` (`cedid`),
  CONSTRAINT `fk_centro_educativo_estudiante_cedid` FOREIGN KEY (`cedid`) REFERENCES `tbl_centro_educativo` (`cedid`),
  CONSTRAINT `fk_centro_educativo_estudiante_tidid` FOREIGN KEY (`tidid`) REFERENCES `tbl_tipo_documento` (`tidid`)
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
  `cesnum` varchar(10) DEFAULT NULL COMMENT 'Número del salón.',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo al que pertenece el salón.',
  PRIMARY KEY (`cesid`),
  KEY `fk_centro_educativo_salon_cedid_idx` (`cedid`),
  CONSTRAINT `fk_centro_educativo_salon_cedid` FOREIGN KEY (`cedid`) REFERENCES `tbl_centro_educativo` (`cedid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo_salon`
--

LOCK TABLES `tbl_centro_educativo_salon` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo_salon` DISABLE KEYS */;
INSERT INTO `tbl_centro_educativo_salon` VALUES (1,'Harnold Shc','102',1),(2,'Einstein','202',1);
/*!40000 ALTER TABLE `tbl_centro_educativo_salon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_estudiante_curso`
--

DROP TABLE IF EXISTS `tbl_estudiante_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_estudiante_curso` (
  `escid` int NOT NULL AUTO_INCREMENT,
  `escyear` year DEFAULT NULL COMMENT 'Año en el que el estudiante hizo el curso.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario, en ste caso el estudiante para saber en que curso esta.',
  `edcid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_curso]: Id del centro educativo curso para saber en que curso esta el estudiante.',
  PRIMARY KEY (`escid`),
  KEY `fk_estudiante_curso_edcid_idx` (`edcid`),
  KEY `fk_estudiante_curso_usuid_idx` (`usuid`),
  CONSTRAINT `fk_estudiante_curso_edcid` FOREIGN KEY (`edcid`) REFERENCES `tbl_centro_educativo_curso` (`edcid`),
  CONSTRAINT `fk_estudiante_curso_usuid` FOREIGN KEY (`usuid`) REFERENCES `tbl_usuario` (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_estudiante_curso`
--

LOCK TABLES `tbl_estudiante_curso` WRITE;
/*!40000 ALTER TABLE `tbl_estudiante_curso` DISABLE KEYS */;
INSERT INTO `tbl_estudiante_curso` VALUES (1,2026,1,1),(2,2026,4,1);
/*!40000 ALTER TABLE `tbl_estudiante_curso` ENABLE KEYS */;
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
  `rcvconfig` json DEFAULT NULL COMMENT 'JSON con la configuración que se necesite para cada rol.',
  `rolid` int DEFAULT NULL COMMENT '[tbl_rol]: Id del rol al cual pertenece la configuración.',
  PRIMARY KEY (`rcvid`),
  KEY `fk_rol_config_visual_rolid_idx` (`rolid`),
  CONSTRAINT `fk_rol_config_visual_rolid` FOREIGN KEY (`rolid`) REFERENCES `tbl_rol` (`rolid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_rol_config_visual`
--

LOCK TABLES `tbl_rol_config_visual` WRITE;
/*!40000 ALTER TABLE `tbl_rol_config_visual` DISABLE KEYS */;
INSERT INTO `tbl_rol_config_visual` VALUES (1,'{\"colorTitles\": \"#1a365d\", \"backgroundMenu\": \"#1a365d\", \"colorIconSelected\": \"#7fb3d5\", \"colorTextSelected\": \"#f2f3f5\", \"backgroundButtonsIcons\": \"#7fb3d5\"}',1),(2,'{\"colorTitles\": \"#37796a\", \"backgroundMenu\": \"#0e6251\", \"colorIconSelected\": \"#82e0aa\", \"colorTextSelected\": \"#cbdeda\", \"backgroundButtonsIcons\": \"#82e0aa\"}',2),(3,'{\"colorTitles\": \"#1f2937\", \"backgroundMenu\": \"#1f2937\", \"colorIconSelected\": \"#d4af37\", \"colorTextSelected\": \"#c9af39\", \"backgroundButtonsIcons\": \"#d4af37\"}',3);
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
  `usuestado` enum('RE','AN','PC') DEFAULT NULL COMMENT 'Representa el estado del usuario: (RE)gistrado, (AN)tiguo, (PC) Pendiente de cambio de Contraseña',
  `usupwdtoken` text COMMENT 'Token para recuperar la contraseña en caso que se halla olvidado.',
  `usupwdtoken_exp` datetime DEFAULT NULL COMMENT 'Fecha hora en la que el token expira para reestablecer la contraseña',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo al cual pertenece el usuario.',
  `ceeid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_estudiante]: Id del centro educativo al cual pertenece el usuario en caso de que este registrado el estudiante en un centro educativo.',
  `tidid` int DEFAULT NULL COMMENT '[tbl_tipo_documento]: Id del tipo de documento.',
  `rolid` int DEFAULT NULL COMMENT '[tbl_rol]: Id del rol que tiene el usuario.',
  PRIMARY KEY (`usuid`),
  KEY `fk_usuario_cedid_idx` (`cedid`),
  KEY `fk_usuario_ceeid_idx` (`ceeid`),
  KEY `fk_usuario_tidid_idx` (`tidid`),
  KEY `fk_usuario_rol_idx` (`rolid`),
  CONSTRAINT `fk_usuario_cedid` FOREIGN KEY (`cedid`) REFERENCES `tbl_centro_educativo` (`cedid`),
  CONSTRAINT `fk_usuario_rolid` FOREIGN KEY (`rolid`) REFERENCES `tbl_rol` (`rolid`),
  CONSTRAINT `fk_usuario_tidid` FOREIGN KEY (`tidid`) REFERENCES `tbl_tipo_documento` (`tidid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuario`
--

LOCK TABLES `tbl_usuario` WRITE;
/*!40000 ALTER TABLE `tbl_usuario` DISABLE KEYS */;
INSERT INTO `tbl_usuario` VALUES (1,'Pepito Perez','pepito@gmail.com','$2b$10$Fl8ZbDqgLgmx6A15KQJ5A.wj8oW4LdwCPXH1cZwiXp0TXoOo7J8i6','1014477770','3107400954','2026-02-25','AN',NULL,NULL,1,NULL,1,1),(2,'Jeisson Acosta','juanacostamillos69@gmail.com','$2b$10$DGBTdRY73Wh/s0.MQXbPQ.CymCsKvZ5NGnq0uif5Q7SxlZIixz0YK','1014477770','3107400954','2004-12-20','AN',NULL,NULL,1,NULL,1,2),(4,'Diego Garcia','123@gmail.com','$2b$10$Vp2nVbDDWfuQ.O03Umna0ebiEC0fZsaZk98Oleym5M86JGv0Qq1Pu','1104545708','3102418099','2005-10-30','AN',NULL,NULL,1,NULL,2,1),(5,'Adriana niño','AdrianaN@gmail.com','$2b$10$oBo0LVbIukj9/7D3n.7ze.tmGf/CDS9HFE2gskmCBPFOCznK.k1Iq','1104545708','3102418099','2005-10-30','AN',NULL,NULL,1,NULL,1,2),(6,'angela martinez','angieceballos2017@gmail.com','$2b$10$2Ck2h0w3WIrInuDvVAxHQ.UQotY3eXj6vPmUG491Q4/Q8..iqf1aa','1137089214','3112270245','2008-05-12','AN',NULL,NULL,1,NULL,1,2),(7,'Pepito Perez','pepito2@gmail.com','$2b$10$vG6rhxDjUvfxos/pN7IgcOMcn0AbZroFHIWBVpFTpRXsX5fhgsi5O','1137089214','4898484894','2004-12-20','AN',NULL,NULL,1,NULL,2,1),(8,'Pepito Perez','pepito3@gmail.com','$2b$10$OQFNmNMUlTrqDcrXlNmsT.QXKSQgMQsLHAR4vkIekMM.OYgVGIh3G','1137089214','4898484894','2004-12-20','AN',NULL,NULL,1,NULL,2,1),(9,'Pepito Perez','pepito3@gmail.com','$2b$10$fpqabN.ULt0XxAJxaLP7su1OQON6HQpJhzpDqyQ/eE4CNTAk5DBKO','1137089214','4898484894','2004-12-20','AN',NULL,NULL,1,NULL,2,1);
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
	DECLARE i_usuid INT;
    DECLARE i_rolcod VARCHAR(10);
    
    SET @_cedid = NULL;

    SELECT 
		usu.usuid, 
        rol.rolcod, 
        usu.cedid INTO i_usuid, i_rolcod, @_cedid
    FROM tbl_usuario usu
    INNER JOIN tbl_rol rol ON usu.rolid = rol.rolid
    WHERE usu.usuemail = i_usuemail;
    
    SET @_cecid = (
		SELECT
			cecid
		FROM tbl_centro_educativo_ciclo
        WHERE cedid = @_cedid
        AND cecfecfin > NOW()
    );
    
	-- SET @_usuemail = (SELECT usuemail FROM tbl_usuario WHERE usuemail = i_usuemail);
    
	IF i_rolcod = 'EST' THEN
		CALL sp_student_get_general_information(i_usuid,@_cedid,@_cecid);
		CALL sp_student_get_course_rank(i_usuid,@_cedid,@_cecid);
		CALL sp_student_get_last_notes (i_usuid,@_cedid,@_cecid);
		CALL sp_student_next_classes(i_usuid,@_cedid,@_cecid);
		CALL sp_student_get_task_info(i_usuid,@_cedid,@_cecid);
        CALL sp_student_get_academic_performance (i_usuid,@_cedid,@_cecid);
       SELECT
    gin.info_user,
    gin.total_materias,
    gin.promedio,
    gin.total_inasistencias,
    gin.progreso_estudiante,
    gin.porcentaje_progreso,
    gin.progreso_resumen,
    gin.proximos_eventos,
    gin.color_resumen,
    gin.color_resumen_grafico,
    gin.porcentaje_asistencias,  
    gin.mensaje_asistencia,
    gin.nuevas_materias,
    gin.mensaje_materias,
    gin.info_centro_educativo AS info_ciclo_educativo,
    gin.ciclo_actual,
    scr.posicion,
    scr.mensaje_rank,
    gin.info_centro_educativo AS centro_educativo,
    gin.ciclo_actual AS ciclo_actual,
    COALESCE(ti.tipo_trabajo, '') AS tipo_trabajo,
    COALESCE(ti.nombre_asignatura, '') AS nombre_asignatura,
    COALESCE(ti.nombre_trabajo, '') AS nombre_trabajo,
    ti.puntaje_maximo AS puntaje_maximo,
    COALESCE(ti.descripcion_trabajo, '') AS descripcion_trabajo,
    COALESCE(ti.nombre_profesor, '') AS nombre_profesor, 
    ti.trabajo_recursos AS trabajo_recursos,
    ti.fecha_fin,
    COALESCE(ti.tarea_estado, '') AS tarea_estado,
    COALESCE(ti.color_estado, '') AS color_estado,
    COALESCE(ti.color_clase, '') AS color_clase,
    COALESCE(ti.tarea_calificacion, 0) AS tarea_calificacion,
    COALESCE(ti.mensaje, '') AS mensaje,
    COALESCE(@_student_last_notes, '[]') AS ultimas_notas,
    COALESCE(@_student_next_classes, '[]') AS proximas_clases,
    COALESCE(@_student_academic_performance,'no hay ciclo a mostrar') AS promedio_ciclo
FROM tbl_usuario usu
INNER JOIN tbl_rol rol ON usu.rolid = rol.rolid
INNER JOIN tbltmp_general_information gin ON usu.usuid = gin.usuid
INNER JOIN tbltmp_student_course_rank scr ON usu.usuid = scr.usuid
LEFT JOIN tbltemp_task_info ti ON usu.usuid = ti.usuid  -- ✅ LEFT JOIN
WHERE usu.usuemail = i_usuemail;
        
        DROP TABLE IF EXISTS tbltmp_general_information;
		DROP TABLE IF EXISTS tbltmp_student_course_rank;
		DROP TABLE IF EXISTS tbltemp_task_info;
	END IF;

    IF i_rolcod = 'DOC' THEN
    
		CALL sp_docent_get_general_information(i_usuid, @_cedid, @_cecid);
        
    END IF;

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
IN i_rolcod VARCHAR (10)
)
BEGIN
  DECLARE i_rolid INT;
    DECLARE i_userId INT;
    
  
    SELECT rolid INTO i_rolid FROM tbl_rol WHERE rolcod = i_rolcod;
    
 
    IF i_rolid IS NULL THEN

        SELECT FALSE AS ok,CONCAT('El código de rol "', i_rolcod, '" no es válido') AS message;
    ELSE
 
        INSERT INTO tbl_usuario (
            usunom, usuemail, usupwd, usudocu, usucel, 
            usufch_nacimiento, ceeid, tidid, rolid
        ) VALUES (
            i_usunom, i_usuemail, i_usupwd, i_usudocu, i_usucel,
            i_usufch_nacimiento, i_ceeid, i_tidid, i_rolid
        );
        
        SET i_userId = LAST_INSERT_ID();
        

        SELECT TRUE AS ok, 'Usuario registrado exitosamente' AS message, i_userId AS data;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_auth_reset_password` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_auth_reset_password`(
IN i_usuemail VARCHAR(45),
IN i_usupwd TEXT
)
BEGIN

SET time_zone = '-05:00';

START TRANSACTION;

UPDATE tbl_usuario
SET usupwd = i_usupwd,
usuestado = 'AN',
usupwdtoken = null,
usupwdtoken_exp = null
WHERE usuemail = i_usuemail;

COMMIT;

SELECT 1 AS ok;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_auth_save_token_forgot_password` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_auth_save_token_forgot_password`(
IN i_usuemail VARCHAR(45),
IN i_usupwdtoken TEXT
)
BEGIN

SET time_zone = '-05:00';

START TRANSACTION;

UPDATE tbl_usuario
SET usupwdtoken = i_usupwdtoken,
usupwdtoken_exp = DATE_ADD(NOW(), INTERVAL 1 HOUR),
usuestado = 'PC'
WHERE usuemail = i_usuemail;

COMMIT;

SELECT 
	usupwdtoken
FROM tbl_usuario
WHERE usuemail = i_usuemail;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_config_update_info_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_config_update_info_user`(
IN i_info_user JSON
)
BEGIN

	START TRANSACTION;
		SELECT i_info_user AS ok;
    COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_docent_create_resource` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_docent_create_resource`(
IN i_cedid INT,
IN i_cecid INT,
IN i_usuid INT,
IN i_asgid INT,
IN i_astnomtrabajo varchar(150),
IN i_astdesctrabajo text,
IN i_astfecini DATETIME,
IN i_astfecfin DATETIME,
IN i_astpunt_max INT,
IN i_asttip enum('TA','MA','EN'),
IN i_astentardias tinyint(2),
IN i_info_files JSON
)
BEGIN

	DECLARE i INT DEFAULT 0;
    
    START TRANSACTION;

		-- Esta variable almacena todos los id´s de los estudiante al cual va dirigido el recurso.
		SET @_ids_all_students = CONCAT('[',
			(
				SELECT
					GROUP_CONCAT(ase.usuid)
				FROM tbl_asignatura_estudiante ase
				INNER JOIN tbl_asignatura asg ON ase.asgid = asg.asgid
				WHERE ase.asgid = i_asgid
				AND asg.cedid = i_cedid
            )
		, ']');
        
        -- SELECT @_ids_all_students; -- DEBUG
    
		INSERT INTO tbl_asignatura_trabajo(
			astnomtrabajo, 
            astdesctrabajo, 
            astfecini, 
            astfecfin, 
            astpunt_max, 
            asttip, 
            astentardias, 
            cecid, 
            usuid, 
            asgid
		) VALUES (
			i_astnomtrabajo, 
            i_astdesctrabajo, 
            i_astfecini, 
            i_astfecfin, 
            i_astpunt_max, 
            i_asttip, 
            i_astentardias, 
            i_cecid, 
            i_usuid, 
            i_asgid
		);
        
        SET @_astid_inserted = LAST_INSERT_ID();
                
        SET i = 0;
        IF JSON_LENGTH(@_ids_all_students) > 0 THEN
			
            REPEAT
            
				SET @_usuid_student_current = JSON_EXTRACT(@_ids_all_students, CONCAT('$[', i , ']'));
                -- SELECT @_usuid_student_current; -- DEBUG
            
				INSERT INTO tbl_asignatura_trabajo_entrega(
					ateestado,
					usuid,
					astid
				) VALUES(
					'P',
                    @_usuid_student_current,
                    @_astid_inserted
				);
                
                SET i = i + 1;
                UNTIL i >= JSON_LENGTH(@_ids_all_students)
                
            END REPEAT;
            
        END IF;
        
        SET i = 0;
        IF JSON_LENGTH(i_info_files) > 0 THEN
        
			REPEAT
            
				SET @_name_file_current = JSON_UNQUOTE(JSON_EXTRACT(i_info_files, CONCAT('$[', i ,'].name')));
                -- SELECT @_name_file_current; -- DEBUG

				INSERT INTO tbl_asignatura_trabajo_recurso(
					atrnomarc,
                    atrtiprec,
                    astid
                ) VALUES(
					@_name_file_current,
                    'A',
                    @_astid_inserted
                );
                
				SET i = i + 1;
				UNTIL i >= JSON_LENGTH(i_info_files)
                
			END REPEAT;
			
        END IF;
        
    COMMIT;

SELECT 1 AS ok;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_docent_get_all_classes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_docent_get_all_classes`(
IN i_usuid INT,
IN i_cedid INT,
IN i_cecid INT
)
BEGIN

-- Esta tabla temporal tendra la cantidad de nuevas entregas en la fecha actual de los estudiantes.
DROP TABLE IF EXISTS tbltmp_quantity_new_deliveries;
CREATE TEMPORARY TABLE tbltmp_quantity_new_deliveries AS (
	SELECT
		ast.asgid AS asgid,
		COUNT(*) AS quantity
	FROM tbl_asignatura_trabajo_entrega ate
    JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    WHERE ast.cecid = i_cecid
    AND DATE(atefec_entrega) = DATE(NOW())
    GROUP BY asgid
		
);

-- SELECT * FROM tbltmp_quantity_new_deliveries; -- DEBUG

SELECT
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'asgid', asg.asgid,
            'asgnom', asg.asgnom,
            'asgcod', asg.asgcod,
            'usunom', usu.usunom,
            'ascvis_config', tbl_asignatura_curso.ascvis_config,
            'cesnum', ces.cesnum,
            'quantity_new_deliveries_x_class', qnd.quantity
        )
    ) AS info_classes_docent
FROM tbl_asignatura asg
JOIN tbl_usuario usu ON asg.usuid = usu.usuid
JOIN tbl_centro_educativo_salon ces ON asg.cesid = ces.cesid
JOIN tbl_asignatura_curso ON asg.asgid = tbl_asignatura_curso.asgid
LEFT JOIN tbltmp_quantity_new_deliveries qnd ON asg.asgid = qnd.asgid
WHERE asg.usuid = i_usuid
AND asg.cedid = i_cedid;

DROP TABLE IF EXISTS tbltmp_quantity_new_deliveries;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_docent_get_attendance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_docent_get_attendance`(
IN i_cedid INT,
IN i_cecid INT,
IN i_usuid INT,
IN i_asgcod CHAR(4),
IN i_asifecha DATE
)
BEGIN

SET @_asgid = (SELECT asgid FROM tbl_asignatura WHERE cedid = i_cedid AND usuid = i_usuid AND asgcod = i_asgcod);

SELECT
	COUNT(*) AS all_quantity_students,
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'usuid', usu.usuid,
			'usunom', usu.usunom,
			'usuemail', usu.usuemail,
            'status', asi.asiestado
		)
	) AS students
FROM tbl_asignatura_asistencia asi
JOIN tbl_asignatura asg ON asi.asgid = asg.asgid
JOIN tbl_usuario usu ON asi.usuid = usu.usuid
WHERE asg.usuid = i_usuid
AND asg.cedid = i_cedid
AND asg.asgid = @_asgid
AND asi.cecid = i_cecid
AND asi.asifecha = i_asifecha;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_docent_get_general_information` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_docent_get_general_information`(
IN i_usuid INT,
IN i_cedid INT,
IN i_cecid INT
)
BEGIN

	SET @_user_info = (
		SELECT
			JSON_OBJECT(
				'usuid', usu.usuid,
                'usunom', usu.usunom,
                'usudocu', usu.usudocu,
                'usuemail', usu.usuemail,
                'usuestado', usu.usuestado,
                'rolcod', rol.rolcod,
                'rolnom', rol.rolnom
            )
		FROM tbl_usuario usu
        JOIN tbl_rol rol ON usu.rolid = rol.rolid
        WHERE usu.usuid = i_usuid
        AND usu.cedid = i_cedid
    );
    
    SET @_educative_center_info = (
		SELECT
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'cedid', cedid,
					'cedcod', cedcod,
					'cednom', cednom,
					'cedtip', cedtip
				)
			)
		FROM tbl_centro_educativo
        WHERE cedid = i_cedid
    );
    
    SET @_current_cycle_info = (
		SELECT
			JSON_OBJECT(
				'cecid', cecid,
                'cecod', cecod,
                'cecnom', cecnom,
                'cecfecini', cecfecini,
                'cecfecfin', cecfecfin
            )
		FROM tbl_centro_educativo_ciclo
        WHERE cecid = i_cecid
    );
    
    SET @_course_director_info = (
		SELECT
			JSON_OBJECT(
				'edcid', edcid,
                'edccod', edccod,
                'edcnom', edcnom
            )
		FROM tbl_centro_educativo_curso 
        WHERE cedid = i_cedid
        AND usuid = i_usuid
    );
    
    -- SELECT @_course_director_info; -- DEBUG
    
    SET @_quantity_courses_assignamed = (
		SELECT
			COUNT(*)
		FROM tbl_centro_educativo_curso
        WHERE cedid = i_cedid
        AND usuid = i_usuid
    );
    
    SET @_tasks_by_qualify = (
		SELECT
			COUNT(*)
		FROM tbl_asignatura_trabajo_entrega ate
        JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
        WHERE ast.usuid = i_usuid
        AND ast.asttip = 'TA'
        AND ast.cecid = i_cecid
        AND ate.ateestado = 'E'
    );
    
    SET @_general_performance_x_course = (
		SELECT
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'edcid', edcid,
                    'edcnom', edcnom,
					'promedio', average
				)
			) AS test
		FROM (
			SELECT
				edc.edcid,
                edc.edcnom,
				ROUND((AVG(atc.atccalificacion) / 5) * 100, 2) AS average
			FROM tbl_asignatura_trabajo_entrega ate
			JOIN tbl_asignatura_trabajo_calificacion atc ON ate.ateid = atc.ateid
			JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
			JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
			JOIN tbl_centro_educativo_curso edc ON asg.edcid = edc.edcid
			WHERE ast.cecid = i_cecid
            AND asg.cedid = i_cedid
            AND asg.usuid = i_usuid
            AND ate.ateestado = 'C'
			GROUP BY edc.edcid
            ORDER BY edc.edcid
		) AS average_x_course
    );
    
    -- Esta variable obtiene el numero actual de la semana, ya que en el horario identificamos el dia por el numero.
    SET @_current_day_number = WEEKDAY(NOW()) + 1;
    -- SELECT @_current_day_number; -- DEBUG
    
    SET @_today_classes = (
		SELECT
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'ashid', ash.ashid,
                    'ashhora', DATE_FORMAT(ash.ashhora, '%l:%i %p'),
                    'asgnom', asg.asgnom,
                    'edcnom', edc.edcnom,
                    'cesnum', ces.cesnum
                )
            )
		FROM tbl_asignatura_horario ash
		JOIN tbl_asignatura asg ON ash.asgid = asg.asgid
        JOIN tbl_centro_educativo_curso edc ON asg.edcid = edc.edcid
        JOIN tbl_centro_educativo_salon ces ON asg.cesid = ces.cesid
        WHERE ash.ashdia = @_current_day_number
        AND asg.usuid = i_usuid
        AND asg.cedid = i_cedid
        AND asg.asgyear = YEAR(NOW())	
        AND ash.ashhora >= NOW()
    );
    -- SELECT @_today_classes; -- DEBUG
    
    SET @_tasks_by_qualify_object = (
		SELECT
			JSON_ARRAYAGG(
				JSON_OBJECT(
					'ateid', ate.ateid,
                    'astnomtrabajo', ast.astnomtrabajo,
                    'atefec_entrega', CASE
						WHEN DATEDIFF(NOW(), ate.atefec_entrega) = 0 THEN 'Hoy'
                        WHEN DATEDIFF(NOW(), ate.atefec_entrega) = 1 THEN 'Ayer'
                        WHEN DATEDIFF(NOW(), ate.atefec_entrega) > 1 THEN CONCAT('Hace ', DATEDIFF(NOW(), ate.atefec_entrega), ' días')
                    END,
                    'edcnom', edc.edcnom
                )
            )
		FROM tbl_asignatura_trabajo_entrega ate
        JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
        JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
        JOIN tbl_centro_educativo_curso edc ON asg.edcid = edc.edcid
        WHERE ast.usuid = i_usuid
        AND ast.asttip = 'TA'
        AND ast.cecid = i_cecid
        AND ate.ateestado = 'E'
    );
        
    -- Esta tabla temporal tarera todos los promedios por estudiante para poder obtener el mejor y es mas bajo en promedio.
    DROP TABLE IF EXISTS tbltmp_performance_course;
    CREATE TEMPORARY TABLE tbltmp_performance_course AS (
		SELECT
			ate.usuid,
            usu.usunom,
			ROUND(AVG(atc.atccalificacion), 1) AS average_student
		FROM tbl_asignatura_trabajo_calificacion atc
		JOIN tbl_asignatura_trabajo_entrega ate ON atc.ateid = ate.ateid
        JOIN tbl_usuario usu ON ate.usuid = usu.usuid
		JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
		JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
		JOIN tbl_centro_educativo_curso edc ON asg.edcid = edc.edcid
		WHERE asg.usuid = i_usuid
		AND edc.edcid = JSON_EXTRACT(@_course_director_info, '$.edcid')
		AND ast.cecid = i_cecid
		GROUP BY ate.usuid
		ORDER BY average_student DESC
    );
    
    -- SELECT * FROM tbltmp_performance_course; -- DEBUG
    
    SET @_best_student = (
		SELECT
			JSON_OBJECT(
				'usuid', usuid,
                'usunom', usunom,
                'average', average_student
            )
		FROM tbltmp_performance_course
		ORDER BY average_student DESC
        LIMIT 1
    );
    
    -- SELECT @_best_student; -- DEBUG
    
    SET @_bad_student = (
		SELECT
			JSON_OBJECT(
				'usuid', usuid,
                'usunom', usunom,
                'average', average_student
            )
		FROM tbltmp_performance_course
        ORDER BY average_student ASC
        LIMIT 1
    );
    
   --  SELECT @_bad_student; -- DEBUG
    
    SET @_students_in_risk = (
		SELECT
			COUNT(*)
		FROM tbltmp_performance_course
        WHERE average_student < 3.0
    );
    
    -- SELECT @_students_in_risk; -- DEBUG
    
    -- Almacena las inasistencias/ausencias del curso
    SET @_absences_course = (
		SELECT
			COUNT(*)
		FROM tbl_asignatura_asistencia asi
        JOIN tbl_asignatura asg ON asi.asgid = asg.asgid
        WHERE asg.cedid = i_cedid
        AND asg.usuid = i_usuid
        AND asg.edcid = JSON_EXTRACT(@_course_director_info, '$.edcid')
        AND asi.cecid = i_cecid
        AND asi.asiestado = 'A'
    );
    
    -- SELECT @_absences_course; -- DEBUG
    
	SELECT
		@_user_info AS info_user,
        @_educative_center_info AS centro_educativo,
        @_current_cycle_info AS ciclo_actual,
        @_course_director_info AS course_director_info,
        @_quantity_courses_assignamed AS quantity_courses_assignamed,
        @_tasks_by_qualify AS tasks_by_qualify,
        @_general_performance_x_course AS general_performance_x_course,
        @_today_classes AS today_classes,
        @_tasks_by_qualify_object AS tasks_by_qualify_object,
        (
			SELECT
				JSON_OBJECT(
					'best_student', IFNULL(@_best_student, NULL),
                    'bad_student', IFNULL(@_bad_student, NULL),
                    'students_in_risk', @_students_in_risk,
                    'absences_course', @_absences_course
                )
        ) AS performance_course;
	
    DROP TABLE IF EXISTS tbltmp_performance_course;
        

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_docent_get_info_class` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_docent_get_info_class`(
IN i_cedid INT,
IN i_cecid INT,
IN i_usuid INT,
IN i_asgcod CHAR(4)
)
BEGIN

SET @_asgid = (SELECT asgid FROM tbl_asignatura WHERE asgcod = i_asgcod AND cedid = i_cedid);

SET @_info_asignatura = (
	SELECT 
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'usunom', usu.usunom,
				'asgnom', asg.asgnom,
                'asgcod', asg.asgcod,
                'asgcod_clase', asg.asgcod_clase,
                'ascvis_config', tbl_asignatura_curso.ascvis_config
            )
        )
	FROM tbl_asignatura asg 
    JOIN tbl_asignatura_curso ON asg.asgid = tbl_asignatura_curso.asgid
    JOIN tbl_usuario usu ON asg.usuid = usu.usuid
    WHERE asg.usuid = i_usuid
    AND asg.asgid = @_asgid
    AND asg.cedid = i_cedid
    -- AND tbl_asignatura_curso.cecid = i_cecid
);

-- SELECT @_info_asignatura; -- DEBUG

-- Tabla temporal para obtener la cantidad de personas que entregaron la tarea sobre las que se entregaron.
DROP TABLE IF EXISTS tbltmp_cantidad_entregas_x_tarea;
CREATE TEMPORARY TABLE tbltmp_cantidad_entregas_x_tarea AS (
	SELECT
		ast.astid AS astid,
		CONCAT(COUNT(CASE WHEN ate.ateestado <> 'P' THEN 1 END), '/', COUNT(*)) AS total_entregados
	FROM tbl_asignatura_trabajo_entrega ate
    JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    WHERE ast.usuid = i_usuid
    AND ast.asgid = @_asgid
    AND ast.cecid = i_cecid
    GROUP BY ast.astid
);

-- SELECT * FROM tbltmp_cantidad_entregas_x_tarea; -- DEBUG

SET @_lista_trabajos = (
	SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'astid', ast.astid,
                'asttip', ast.asttip,
                'astnomtrabajo', ast.astnomtrabajo,
                'astfecini', DATE_FORMAT(ast.astfecini, '%d/%m/%Y'),
                'astfecfin', DATE_FORMAT(ast.astfecfin, '%d/%m/%Y'),
                'total_entregas', cet.total_entregados
            )
        )
	FROM tbl_asignatura_trabajo ast
    LEFT JOIN tbltmp_cantidad_entregas_x_tarea cet ON ast.astid = cet.astid
    WHERE ast.usuid = i_usuid
    AND ast.asgid = @_asgid
    AND ast.cecid = i_cecid
);

-- SELECT @_lista_trabajos; -- DEBUG

SET @_progreso_asignatura = (
	SELECT
		FORMAT((COUNT(CASE WHEN ate.atefec_entrega IS NOT NULL THEN 1 END) / COUNT(*)) * 100, 0)
	FROM tbl_asignatura_trabajo ast
    JOIN tbl_asignatura_trabajo_entrega ate ON ast.astid = ate.astid
    WHERE ast.usuid = i_usuid
    AND ast.asgid = @_asgid
    AND ast.cecid = i_cecid
);

-- SELECT @_progreso_asignatura; -- DEBUG

SELECT
	@_info_asignatura AS info_asignatura,
    @_lista_trabajos AS lista_trabajos,
    @_progreso_asignatura AS progreso_asignatura;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_docent_get_info_task` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_docent_get_info_task`(
IN i_usuid INT,
IN i_cedid INT,
IN i_cecid INT,
IN i_asgcod CHAR(4),
IN i_astid INT
)
BEGIN

SET lc_time_names = 'es_ES'; -- Para que los meses con MONTHNAME salgan en español.
SET @_asgid = (SELECT asgid FROM tbl_asignatura WHERE cedid = i_cedid AND asgcod = i_asgcod);
SET @_asgnom = (SELECT asgnom FROM tbl_asignatura WHERE cedid = i_cedid AND asgcod = i_asgcod);

SET @_quantity_deliverieds = (
	SELECT
		IFNULL(COUNT(*), 0)
	FROM tbl_asignatura_trabajo_entrega ate
    INNER JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    WHERE ast.asgid = @_asgid
    AND ast.cecid = i_cecid
    AND ate.astid = i_astid
    AND ate.ateestado = 'E'
);

SET @_without_delivering = (
	SELECT 
		IFNULL(COUNT(*), 0)
	FROM tbl_asignatura_trabajo_entrega ate
    INNER JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    WHERE ast.asgid = @_asgid
    AND ast.cecid = i_cecid
    AND ate.astid = i_astid
    AND ate.ateestado = 'P'
);

SET @_progreso_asignatura = (
	SELECT
		FORMAT((COUNT(CASE WHEN ate.atefec_entrega IS NOT NULL THEN 1 END) / COUNT(*)) * 100, 0)
	FROM tbl_asignatura_trabajo ast
    JOIN tbl_asignatura_trabajo_entrega ate ON ast.astid = ate.astid
    WHERE ast.usuid = i_usuid
    AND ast.asgid = @_asgid
    AND ast.cecid = i_cecid
);

SET @_average_task = (
	SELECT 
		IFNULL(FORMAT((COUNT(CASE WHEN atc.atccalificacion IS NOT NULL THEN 1 END) / COUNT(*)) * 100, 0), 0)
        -- IFNULL(AVG(atccalificacion), 0)
	FROM tbl_asignatura_trabajo_calificacion atc
	INNER JOIN
	tbl_asignatura_trabajo_entrega ate ON atc.ateid = ate.ateid
	INNER JOIN
	tbl_asignatura_trabajo ast ON ate.astid = ast.astid
	WHERE ast.asgid = @_asgid
    AND ast.usuid = i_usuid
    AND ast.cecid = i_cecid
    AND ast.asttip = 'TA'
    AND ate.astid = i_astid
);

SET @_files_submitted = (
	SELECT
		JSON_OBJECT(
			'atrid', atrid,
            'atrnomarc', atrnomarc,
            'atrurl', atrurl,
            'atrtiprec', atrtiprec
        )
	FROM tbl_asignatura_trabajo_recurso
    WHERE astid = i_astid
    AND cecid = i_cecid
);

SET @_details_task = (
	SELECT
		JSON_OBJECT(
			'astid', astid,
            'astnomtrabajo', astnomtrabajo,
            'astdesctrabajo', astdesctrabajo,
            'astfecini', astfecini,
            'astfecfin', astfecfin,
            'astfecfin_text', CONCAT(DAY(astfecfin), ' ', MONTHNAME(astfecfin), ', ', YEAR(astfecfin)),
            'astpunt_max', astpunt_max,
            'astentardias', astentardias,
            'files', @_files_submitted,
            'asgnom', @_asgnom
        )
	FROM tbl_asignatura_trabajo
    WHERE usuid = i_usuid
    AND asgid = @_asgid
    AND cecid = i_cecid
    AND astid = i_astid
);

-- SELECT @_details_task; -- DEBUG

-- Esta variable guardara un array de objetos de todos los estudiantes que se ha puesto la tarea con su estado.
SET @_student_submissions = (
	SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'usuid', ate.usuid,
                'usunom', usu.usunom,
                'usuemail', usu.usuemail,
                'atefec_entrega_text', CONCAT(MONTHNAME(ate.atefec_entrega), ' ', DAY(ate.atefec_entrega), ' ', YEAR(ate.atefec_entrega), ' ', DATE_FORMAT(ate.atefec_entrega, '%H:%i')),
                'rating', FORMAT(atc.atccalificacion, 1),
                'ateestado', ate.ateestado
            )
        )
	FROM tbl_asignatura_trabajo_entrega ate
    LEFT JOIN tbl_asignatura_trabajo_calificacion atc ON ate.ateid = atc.atcid
    INNER JOIN tbl_usuario usu ON ate.usuid = usu.usuid
    INNER JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    WHERE ate.astid = i_astid
    AND ast.cecid = i_cecid
    AND ast.asgid = @_asgid
);

SELECT 
	@_details_task AS details_task,
    @_student_submissions AS student_submissions,
    @_average_task AS average_task,
    @_quantity_deliverieds AS quantity_deliverieds,
    @_without_delivering AS without_deliverings;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_docent_get_list_students` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_docent_get_list_students`(
IN i_usuid INT,
IN i_cedid INT,
IN i_cecid INT,
IN i_asgcod CHAR(4),
IN i_opcion CHAR(3)
)
BEGIN

-- /////////// i_opcion //////////
	-- (LSC) -> List Students Class (Lista de estudiante de la clase)
    -- (LSA) -> List Students Attendance (Lista de estudiante para la asistencia)
-- ///////////////////////////////

SET @_asgid = (SELECT asgid FROM tbl_asignatura WHERE cedid = i_cedid AND usuid = i_usuid AND asgcod = i_asgcod);

IF i_opcion = 'LSC' THEN

	DROP TABLE IF EXISTS tbltmp_average_x_student;
	CREATE TEMPORARY TABLE tbltmp_average_x_student AS (
		SELECT
			ate.usuid,
			-- Promedio solo de entregas calificadas
			ROUND(
				IFNULL(
					AVG(CASE WHEN ate.ateestado <> 'P' THEN atc.atccalificacion END),
					1.0
				),
			1) AS average_x_student
		FROM tbl_asignatura_trabajo_entrega ate
		INNER JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
		INNER JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
		LEFT JOIN tbl_asignatura_trabajo_calificacion atc ON ate.ateid = atc.ateid
		WHERE asg.asgid = @_asgid
		GROUP BY ate.usuid
	);

	-- SELECT * FROM tbltmp_average_x_student; -- DEBUG

	DROP TABLE IF EXISTS tbltmp_attendance_x_student;
	CREATE TEMPORARY TABLE tbltmp_attendance_x_student AS (
		SELECT
			asi.usuid,
			ROUND(
				(COUNT(CASE WHEN asi.asiestado IN ('P', 'T', 'E') THEN 1 END) / COUNT(*)) * 100
			) AS attendance_x_student
		FROM tbl_asignatura_asistencia asi
		INNER JOIN tbl_asignatura asg ON asi.asgid = asg.asgid
		WHERE asi.asgid = @_asgid
		AND asg.cedid = i_cedid
		AND asi.cecid = i_cecid
		GROUP BY asi.usuid
	);

	-- SELECT * FROM tbltmp_attendance_x_student; -- DEBUG

	SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'usuid', usu.usuid,
				'usunom', usu.usunom,
				'usuemail', usu.usuemail,
				'average', axs.average_x_student,
				'attendance', IFNULL(ats.attendance_x_student, 100),
				'performance', IF(axs.average_x_student > 4.5, 'EXEMPLARY', IF(axs.average_x_student >= 3.5, 'STEADY', 'AT RISK'))
			)
		) AS result
	FROM tbltmp_average_x_student axs
	INNER JOIN tbl_usuario usu ON axs.usuid = usu.usuid
	LEFT JOIN tbltmp_attendance_x_student ats ON axs.usuid = ats.usuid;

END IF;

IF i_opcion = 'LSA' THEN
	
    SELECT
		COUNT(*) AS all_quantity_students,
        JSON_ARRAYAGG(
			JSON_OBJECT(
				'usuid', usu.usuid,
                'usunom', usu.usunom,
                'usuemail', usu.usuemail
            )
        ) AS result
	FROM tbl_asignatura_estudiante ase
    JOIN tbl_asignatura asg ON ase.asgid = asg.asgid
    JOIN tbl_usuario usu ON ase.usuid = usu.usuid
    WHERE asg.usuid = i_usuid
    AND asg.cedid = i_cedid
    AND asg.asgid = @_asgid;
    
END IF;

DROP TABLE IF EXISTS tbltmp_average_x_student;
DROP TABLE IF EXISTS tbltmp_attendance_x_student;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_docent_info_to_generate_report_attendance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_docent_info_to_generate_report_attendance`(
IN i_usuid INT,
IN i_cedid INT,
IN i_cecid INT,
IN i_asgcod CHAR(4),
IN i_opcion CHAR(3)
)
BEGIN

SET time_zone = '-05:00';

SET @_info_current_cycle = (
	SELECT 
		JSON_OBJECT(
			'cecod', cecod,
            'cecnom', cecnom,
            'cecfecfini', cecfecini,
            'cecfecfin', cecfecfin
        )
	FROM tbl_centro_educativo_ciclo
    WHERE cecid = i_cecid
);

SET @_cednom = (SELECT cednom FROM tbl_centro_educativo WHERE cedid = i_cedid);
SET @_asgid = (SELECT asgid FROM tbl_asignatura WHERE cedid = i_cedid AND usuid = i_usuid AND asgcod = i_asgcod);
SET @_asgnom = (SELECT asgnom FROM tbl_asignatura WHERE asgid = @_asgid);
SET @_usunom_docent = (SELECT usunom FROM tbl_usuario WHERE usuid = i_usuid);

SET @_average_attendance = CONCAT('
	SELECT
		ROUND(
			(SUM(CASE WHEN asi.asiestado = "P" THEN 1 WHEN asi.asiestado = "T" THEN 0.5 ELSE 0 END) / COUNT(*)) * 100, 2
		) INTO @_average_attendance_result
	FROM tbl_asignatura_asistencia asi
    JOIN tbl_asignatura asg ON asi.asgid = asg.asgid
    JOIN tbl_centro_educativo_curso edc ON asg.edcid = edc.edcid
    WHERE asi.cecid = ',i_cecid,'
    AND asg.cedid = ',i_cedid,'
    AND asg.asgid = ',@_asgid,'
    AND IF(',QUOTE(i_opcion),' = "TOD", asi.asifecha = DATE(NOW()), asi.asifecha BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND DATE(NOW()))
');

-- SELECT @_average_attendance; -- DEBUG

PREPARE cmdx FROM @_average_attendance;
EXECUTE cmdx;

-- SELECT @_average_attendance_result; -- DEBUG

-- Esta tabla temporal obtiene el total de presentes, ausente, tardios y excusados
DROP TABLE IF EXISTS tbltmp_info_attendance;
SET @_cmd = CONCAT('
	CREATE TEMPORARY TABLE tbltmp_info_attendance AS (
		SELECT
			IFNULL(SUM(CASE WHEN asi.asiestado = "P" THEN 1 END), 0) AS total_presents,
			IFNULL(SUM(CASE WHEN asi.asiestado = "A" THEN 1 END), 0) AS total_absents,
			IFNULL(SUM(CASE WHEN asi.asiestado = "T" THEN 1 END), 0) AS total_lates,
			IFNULL(SUM(CASE WHEN asi.asiestado = "E" THEN 1 END),0 ) AS total_excuseds
		FROM tbl_asignatura_asistencia asi
		JOIN tbl_asignatura asg ON asi.asgid = asg.asgid
		JOIN tbl_centro_educativo_curso edc ON asg.edcid = edc.edcid
		WHERE asi.cecid = ',i_cecid,'
		AND asg.cedid = ',i_cedid,'
		AND asg.asgid = ',@_asgid,'
        AND IF(',QUOTE(i_opcion),' = "TOD", asi.asifecha = DATE(NOW()), asi.asifecha BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND DATE(NOW()))
	)
');

PREPARE cmdx FROM @_cmd;
EXECUTE cmdx;

-- SELECT * FROM tbltmp_info_attendance; -- DEBUG

SET @_total_presents = (SELECT total_presents FROM tbltmp_info_attendance);
SET @_total_absents = (SELECT total_absents FROM tbltmp_info_attendance);
SET @_total_lates = (SELECT total_lates FROM tbltmp_info_attendance);
SET @_total_excuseds = (SELECT total_excuseds FROM tbltmp_info_attendance);

DROP TABLE IF EXISTS tbltmp_attendance_x_student;
CREATE TEMPORARY TABLE tbltmp_attendance_x_student AS (
	SELECT
		asi.usuid,
		ROUND(
			(COUNT(CASE WHEN asi.asiestado IN ('P', 'T', 'E') THEN 1 END) / COUNT(*)) * 100
		) AS attendance_x_student,
        SUM(CASE WHEN asi.asiestado IN('P', 'T', 'E') THEN 1 END) AS assistences_x_student,
        SUM(CASE WHEN asi.asiestado = 'A' THEN 1 END) AS absences_x_student
	FROM tbl_asignatura_asistencia asi
	INNER JOIN tbl_asignatura asg ON asi.asgid = asg.asgid
	WHERE asi.asgid = @_asgid
	AND asg.cedid = i_cedid
	AND asi.cecid = i_cecid
	GROUP BY asi.usuid
);

-- SELECT * FROM tbltmp_attendance_x_student; -- DEBUG

SELECT
	@_info_current_cycle AS info_current_cycle,
    @_cednom AS cednom,
    @_asgnom AS asgnom,
    @_usunom_docent AS usunom_docent,
    @_average_attendance_result AS average_attendance,
    @_total_excuseds AS total_excuseds,
    @_total_lates AS total_lates,
    @_total_absents AS total_absents,
    @_total_presents AS total_presents,
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'usuid', usu.usuid,
			'usunom', usu.usunom,
			'usuemail', usu.usuemail,
            'assistences', IFNULL(ats.assistences_x_student, 0),
            'absences', IFNULL(ats.absences_x_student, 0),
			'attendance', IFNULL(ats.attendance_x_student, 100)
			-- 'performance', IF(axs.average_x_student > 4.5, 'EXEMPLARY', IF(axs.average_x_student >= 3.5, 'STEADY', 'AT RISK'))
		)
	) AS info_table_report
FROM tbltmp_attendance_x_student ats
INNER JOIN tbl_usuario usu ON ats.usuid = usu.usuid;

DROP TABLE IF EXISTS tbltmp_info_attendance;
DROP TABLE IF EXISTS tbltmp_attendance_x_student;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_docent_save_attendance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_docent_save_attendance`(
IN i_usuid INT,
IN i_cedid INT,
IN i_cecid INT,
IN i_asgcod CHAR(4),
IN i_asifecha DATE,
IN i_data JSON
)
BEGIN

DECLARE _jsonLength INT DEFAULT 0;
DECLARE _jsonIndex INT DEFAULT 0;

SET _jsonLength = JSON_LENGTH(i_data);
SET @_asgid = (SELECT asgid FROM tbl_asignatura WHERE cedid = i_cedid AND usuid = i_usuid AND asgcod = i_asgcod);

START TRANSACTION;

REPEAT

	SET @_current_usuid = JSON_UNQUOTE(JSON_EXTRACT(i_data, CONCAT('$[',_jsonIndex,'].usuid')));
    SET @_current_status = JSON_UNQUOTE(JSON_EXTRACT(i_data, CONCAT('$[',_jsonIndex,'].status')));
    
    INSERT INTO tbl_asignatura_asistencia(
		asiestado,
        asifecha,
        asiyear,
        usuid,
        asgid,
        cecid
    ) VALUES (
		@_current_status,
        i_asifecha,
        YEAR(i_asifecha),
        @_current_usuid,
        @_asgid,
        i_cecid
    );

	SET _jsonIndex = (_jsonIndex + 1);
	UNTIL _jsonIndex >= _jsonLength

END REPEAT;

COMMIT;

SELECT 1 AS ok;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_delivery_task` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_delivery_task`(
   IN i_usuid INT,
   IN i_cedid INT,
   IN i_cecid INT,
   IN i_astid INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    

    SET SQL_SAFE_UPDATES = 0;
    
    UPDATE tbl_asignatura_trabajo_entrega 
    SET 
        ateestado = 'E',
        atefec_entrega = NOW()
    WHERE usuid = i_usuid 
    AND astid = i_astid;
    
    SET SQL_SAFE_UPDATES = 1;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_academic_performance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_get_academic_performance`(
   IN i_usuid INT,
   IN i_cedid INT,
   IN i_cecid INT
)
BEGIN
    DECLARE i_info_centro_educativo JSON;
    DECLARE i_ciclo_actual JSON;
    
    SELECT
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'cedid', ced.cedid,
                'cedcod', ced.cedcod,
                'cednom', ced.cednom,
                'cedtip', ced.cedtip
            )
        ) INTO i_info_centro_educativo
    FROM tbl_centro_educativo ced
    INNER JOIN tbl_usuario usu ON ced.cedid = usu.cedid
    WHERE ced.cedid = i_cedid
    AND usu.usuid = i_usuid;
    
    SET @_current_cycle_info = (
        SELECT
            JSON_OBJECT(
                'cecid', cecid,
                'cecod', cecod,
                'cecnom', cecnom,
                'cecfecini', cecfecini,
                'cecfecfin', cecfecfin
            )
        FROM tbl_centro_educativo_ciclo
        WHERE cecid = i_cecid
    );
    
    -- Solución: Primero obtener los 3 registros en una subconsulta, luego aplicar JSON_ARRAYAGG
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'usuid', t.usuid,
            'asgid', t.asgid,
            'nombre_ciclo', t.nombre_ciclo,
            'nombre_materia', t.nombre_materia,
            'nota_ciclo', t.nota_ciclo,
            'color_materia', t.color_materia
        )
    ) INTO @_student_academic_performance
    FROM (
        SELECT 
            acc.usuid,
            a.asgid,
            c.cecnom AS nombre_ciclo,
            a.asgnom AS nombre_materia,
            acc.acccalificacion AS nota_ciclo,
            ac.ascvis_config AS color_materia
        FROM tbl_asignatura_calificacion_ciclo acc
        INNER JOIN tbl_asignatura a ON acc.asgid = a.asgid
        INNER JOIN tbl_asignatura_curso ac ON ac.asgid = a.asgid
        INNER JOIN tbl_centro_educativo_ciclo c ON acc.cecid = c.cecid
        WHERE acc.usuid = i_usuid
        AND acc.cecid = i_cecid
        ORDER BY acc.acccalificacion ASC
        LIMIT 3
    ) AS t;
    
    -- Retornar los resultados
   -- SELECT @_student_academic_performance AS student_academic_performance;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_all_classes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_get_all_classes`(
IN i_usuid INT,
IN i_cedid INT,
IN i_cecid INT
)
BEGIN

SET lc_time_names = 'es_ES'; -- Variable que permite obtener los nombres de algunas funciones de ingles a español.

SET @_curso_id = (SELECT escid FROM tbl_estudiante_curso WHERE usuid = i_usuid AND escyear = YEAR(NOW()));
-- SELECT @_curso_id; -- DEBUG

SET @_quantity_classes = (SELECT COUNT(*) FROM tbl_asignatura_estudiante WHERE usuid = i_usuid);
SET @_classes_ids = (SELECT GROUP_CONCAT(asgid) FROM tbl_asignatura_estudiante WHERE usuid = i_usuid);
-- SELECT @_classes_ids; -- DEBUG

-- Almacena el promedio de clases general del estudiante.
SET @_average_classes = (
	SELECT 
		-- SUM(atccalificacion) / @_quantity_classes
		-- SUM(atccalificacion) / @_quantity_notes
        AVG(atccalificacion)
	FROM tbl_asignatura_trabajo_calificacion atc
	INNER JOIN
	tbl_asignatura_trabajo_entrega ate ON atc.ateid = ate.ateid
	INNER JOIN
	tbl_asignatura_trabajo ast ON ate.astid = ast.astid
	WHERE FIND_IN_SET(ast.asgid, @_classes_ids)
    AND ate.usuid = i_usuid
	AND ast.cecid = i_cecid
    AND ast.asttip = 'TA'
	-- AND ast.ascid = @_curso_id
);

-- SELECT @_average_classes; -- DEBUG

-- Tabla temporal que almacena el promedio actual por cada clase.
DROP TABLE IF EXISTS tbltmp_sum_classes_notes;
CREATE TEMPORARY TABLE tbltmp_sum_classes_notes AS (
	SELECT
		ast.asgid,
        COUNT(*) AS quantity_notes_x_course,
        SUM(atc.atccalificacion) AS sum_classe,
        FORMAT(AVG(atc.atccalificacion), 1) AS average_note -- AVG() = SUMA_CALIFICACIONES / CANTIDAD_NOTAS_X_ASIGNATURA
	FROM tbl_asignatura_trabajo_calificacion atc
    JOIN tbl_asignatura_trabajo_entrega ate ON atc.ateid = ate.ateid
    JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    WHERE FIND_IN_SET(ast.asgid, @_classes_ids)
    AND ate.usuid = i_usuid
    AND ast.cecid = i_cecid
    -- AND ast.ascid = @_curso_id
    GROUP BY ast.asgid
    ORDER BY average_note DESC
    LIMIT 4
);

-- SELECT * FROM tbltmp_sum_classes_notes; -- DEBUG

SET @_best_classes = (
	SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				"asgid", scn.asgid,
				"average_note", scn.average_note,
				"asgnom", asg.asgnom,
				"color", JSON_EXTRACT(tbl_asignatura_curso.ascvis_config, "$.color")
			)
		)
	FROM tbltmp_sum_classes_notes scn
	JOIN tbl_asignatura_curso ON scn.asgid = tbl_asignatura_curso.asgid
	JOIN tbl_asignatura asg ON tbl_asignatura_curso.asgid = asg.asgid
	-- ORDER BY scn.average_note DESC
);

-- SELECT @_best_classes; -- DEBUG

-- Tabla temporal para determinar cuantos estudiantes hay por clase
DROP TABLE IF EXISTS tbltmp_quantity_students_x_class;
CREATE TEMPORARY TABLE tbltmp_quantity_students_x_class AS (
	SELECT
		ase.asgid AS asgid,
		COUNT(*) AS quantity
	FROM tbl_asignatura_estudiante ase
    JOIN tbl_asignatura asg
    WHERE asg.cedid = i_cedid
    GROUP BY asgid
);

-- SELECT * FROM tbltmp_quantity_students_x_class; -- DEBUG

-- Variable que obtendra el array de objetos para las tareas pendientes del estudiante.
SET @_pending_tasks_student = (
	SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'ateid', ate.ateid,
                'asgid', asg.asgid,
                'asgnom', asg.asgnom,
                'ateestado', ate.ateestado,
                'astnomtrabajo', ast.astnomtrabajo,
                'astfecfin', ast.astfecfin,
                'astfecfin_concat', CONCAT(SUBSTRING(DAYNAME(ast.astfecfin), 1, 3), ', ', DAY(ast.astfecfin), ' ', MONTHNAME(ast.astfecfin), ' ', YEAR(ast.astfecfin)),
                'astfecfin_time_delivery', IF(
					TIMESTAMPDIFF(DAY, NOW(), ast.astfecfin) <> 0,
                    CONCAT('En ', TIMESTAMPDIFF(DAY, NOW(), ast.astfecfin) ,' días'),
                    IF(TIMESTAMPDIFF(HOUR, NOW(), ast.astfecfin) <> 0,
						CONCAT('Faltan ', TIMESTAMPDIFF(HOUR, NOW(), ast.astfecfin), ' horas'),
                        CONCAT('Faltan ', TIMESTAMPDIFF(MINUTE, NOW(), ast.astfecfin), ' minutos')
                    )
				),
                'ascvis_config', tbl_asignatura_curso.ascvis_config
            )
        )
	FROM tbl_asignatura_trabajo_entrega ate
    INNER JOIN 
    tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    INNER JOIN
    tbl_asignatura asg ON ast.asgid = asg.asgid
    INNER JOIN
	tbl_asignatura_curso ON tbl_asignatura_curso.asgid = asg.asgid
    WHERE ate.usuid = i_usuid
    AND ate.ateestado = 'P'
    AND ast.asttip = 'TA'
    -- AND ast.ascid = @_curso_id
);

-- SELECT @_pending_tasks_student; -- DEBUG

SELECT
	FORMAT(@_average_classes, 1) AS average_classes,
    @_best_classes AS best_classes,
	@_pending_tasks_student AS upcoming_deliveries,
	JSON_ARRAYAGG(
		JSON_OBJECT(
			'asgid', asg.asgid,
            'asgcod', asg.asgcod,         
            'asgnom', asg.asgnom,
            'cesnom', ces.cesnom,
            'cesnum', ces.cesnum,
            'quantity_students', qsc.quantity,
            'usunom', usu.usunom,
            'ascvis_config', tbl_asignatura_curso.ascvis_config
        )
    ) AS classes
FROM tbl_asignatura_estudiante ase
INNER JOIN
tbl_asignatura asg ON ase.asgid = asg.asgid
INNER JOIN
tbl_asignatura_curso ON tbl_asignatura_curso.asgid = asg.asgid
INNER JOIN
tbl_usuario usu ON asg.usuid = usu.usuid
INNER JOIN
tbl_centro_educativo_salon ces ON  asg.cesid = ces.cesid
INNER JOIN 
tbltmp_quantity_students_x_class qsc ON asg.asgid = qsc.asgid
WHERE ase.usuid = i_usuid
AND asg.cedid = @_curso_id;

DROP TABLE IF EXISTS tbltmp_quantity_students_x_class;
DROP TABLE IF EXISTS tbltmp_sum_classes_notes;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_calendar_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_get_calendar_info`(
    i_usuid INT,
    i_cedid INT,
    i_cecid INT
)
BEGIN
    DECLARE color_clase_actual JSON;
    DECLARE nombre_clase VARCHAR(100);
    DECLARE salon_clase VARCHAR(20);
    DECLARE hora_inicio_actual TIME;
    DECLARE color_proxima_clase JSON;
    DECLARE nombre_proxima_clase VARCHAR(100);
    DECLARE salon_proxima_clase VARCHAR(20);
    DECLARE hora_inicio_proxima TIME;
    DECLARE i_proximos_eventos JSON;
    DECLARE i_info_centro_educativo JSON;
    DECLARE i_ciclo_actual JSON;
    DECLARE dia_actual INT;
    DECLARE duracion_clase INT DEFAULT 60;
    
    DROP TEMPORARY TABLE IF EXISTS tmp_calendar_info;
    CREATE TEMPORARY TABLE IF NOT EXISTS tmp_calendar_info (
        info_centro_educativo JSON,
        ciclo_actual JSON,
        clase_actual_nombre VARCHAR(100),
        clase_actual_color JSON,
        clase_actual_salon VARCHAR(20),
        clase_actual_hora_inicio VARCHAR(20),
        proxima_clase_nombre VARCHAR(100),
        proxima_clase_color JSON,
        proxima_clase_salon VARCHAR(20),
        proxima_clase_hora_inicio VARCHAR(20),
        proximos_eventos JSON
    );
    
    TRUNCATE TABLE tmp_calendar_info;
    
    SET dia_actual = DAYOFWEEK(CURDATE());
    
    SELECT
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'cedid', ced.cedid,
                'cedcod', ced.cedcod,
                'cednom', ced.cednom,
                'cedtip', ced.cedtip
            )
        ) INTO i_info_centro_educativo
    FROM tbl_centro_educativo ced
    INNER JOIN tbl_usuario usu ON ced.cedid = usu.cedid
    WHERE ced.cedid = i_cedid
        AND usu.usuid = i_usuid;
    
    SET i_ciclo_actual = (
        SELECT
            JSON_OBJECT(
                'cecid', cecid,
                'cecod', cecod,
                'cecnom', cecnom,
                'cecfecini', cecfecini,
                'cecfecfin', cecfecfin
            )
        FROM tbl_centro_educativo_ciclo
        WHERE cecid = i_cecid
    );
    
    SELECT
        asg.asgnom,
        COALESCE(ascu.ascvis_config, JSON_OBJECT('color', '#808080')), -- Gris por defecto
        COALESCE(ces.cesnom, 'sin salon'),
        ash.ashhora
    INTO 
        nombre_clase,
        color_clase_actual,
        salon_clase,
        hora_inicio_actual
    FROM tbl_asignatura asg
    INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = asg.asgid
    INNER JOIN tbl_asignatura_horario ash ON ash.asgid = asg.asgid
    LEFT JOIN tbl_asignatura_curso ascu ON ascu.asgid = asg.asgid
    LEFT JOIN tbl_centro_educativo_salon ces ON asg.cesid = ces.cesid
    WHERE asg.cedid = i_cedid
        AND ase.usuid = i_usuid
        AND ash.ashdia = dia_actual
        AND CURTIME() BETWEEN ash.ashhora AND ADDTIME(ash.ashhora, SEC_TO_TIME(duracion_clase * 60))
    LIMIT 1;
   
    IF nombre_clase IS NOT NULL THEN
        SELECT
            asg.asgnom,
            COALESCE(ascu.ascvis_config, JSON_OBJECT('color', '#808080')), -- Gris por defecto
            COALESCE(ces.cesnom, 'sin salon'),
            ash.ashhora
        INTO
            nombre_proxima_clase,
            color_proxima_clase,
            salon_proxima_clase,
            hora_inicio_proxima
        FROM tbl_asignatura asg
        INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = asg.asgid
        INNER JOIN tbl_asignatura_horario ash ON ash.asgid = asg.asgid
        LEFT JOIN tbl_asignatura_curso ascu ON ascu.asgid = asg.asgid
        LEFT JOIN tbl_centro_educativo_salon ces ON asg.cesid = ces.cesid
        WHERE asg.cedid = i_cedid
            AND ase.usuid = i_usuid
            AND ash.ashdia = dia_actual
            AND ash.ashhora > ADDTIME(CURTIME(), SEC_TO_TIME(duracion_clase * 60))
        ORDER BY ash.ashhora ASC
        LIMIT 1;
    END IF;
    
    IF nombre_clase IS NULL AND nombre_proxima_clase IS NULL THEN
        SELECT
            asg.asgnom,
            COALESCE(ascu.ascvis_config, JSON_OBJECT('color', '#808080')), -- Gris por defecto
            COALESCE(ces.cesnom, 'sin salon'),
            ash.ashhora
        INTO
            nombre_proxima_clase,
            color_proxima_clase,
            salon_proxima_clase,
            hora_inicio_proxima
        FROM tbl_asignatura asg
        INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = asg.asgid
        INNER JOIN tbl_asignatura_horario ash ON ash.asgid = asg.asgid
        LEFT JOIN tbl_asignatura_curso ascu ON ascu.asgid = asg.asgid
        LEFT JOIN tbl_centro_educativo_salon ces ON asg.cesid = ces.cesid
        WHERE asg.cedid = i_cedid
            AND ase.usuid = i_usuid
            AND (
                (ash.ashdia = dia_actual AND ash.ashhora > CURTIME())
                OR ash.ashdia > dia_actual
            )
        ORDER BY 
            CASE WHEN ash.ashdia = dia_actual THEN 0 ELSE 1 END,
            ash.ashdia ASC, 
            ash.ashhora ASC
        LIMIT 1;
    END IF;
    
    IF nombre_clase IS NOT NULL AND nombre_proxima_clase IS NULL THEN
        SELECT
            asg.asgnom,
            COALESCE(ascu.ascvis_config, JSON_OBJECT('color', '#808080')), -- Gris por defecto
            COALESCE(ces.cesnom, 'sin salon'),
            ash.ashhora
        INTO
            nombre_proxima_clase,
            color_proxima_clase,
            salon_proxima_clase,
            hora_inicio_proxima
        FROM tbl_asignatura asg
        INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = asg.asgid
        INNER JOIN tbl_asignatura_horario ash ON ash.asgid = asg.asgid
        LEFT JOIN tbl_asignatura_curso ascu ON ascu.asgid = asg.asgid
        LEFT JOIN tbl_centro_educativo_salon ces ON asg.cesid = ces.cesid
        WHERE asg.cedid = i_cedid
            AND ase.usuid = i_usuid
            AND ash.ashdia > dia_actual
        ORDER BY ash.ashdia ASC, ash.ashhora ASC
        LIMIT 1;
    END IF;
    
    -- Consulta para i_proximos_eventos con color por defecto gris
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'id_trabajo', ast.astid,
            'nombre_trabajo', ast.astnomtrabajo,
            'nombre-materia', asg.asgnom,
            'color_materia', COALESCE(ascu.ascvis_config, JSON_OBJECT('color', '#808080')),
            'fecha_fin', ast.astfecfin
        )
    ) INTO i_proximos_eventos
    FROM tbl_asignatura_trabajo ast
    INNER JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
    INNER JOIN tbl_asignatura_curso ascu ON ascu.asgid = asg.asgid
    INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = asg.asgid
    WHERE ast.cecid = i_cecid
        AND ase.usuid = i_usuid
        AND ast.astfecfin > CURRENT_TIMESTAMP();
    
    -- Insertar datos en la tabla temporal con valores por defecto
    INSERT INTO tmp_calendar_info (
        info_centro_educativo,
        ciclo_actual,
        clase_actual_nombre,
        clase_actual_color,
        clase_actual_salon,
        clase_actual_hora_inicio,
        proxima_clase_nombre,
        proxima_clase_color,
        proxima_clase_salon,
        proxima_clase_hora_inicio,
        proximos_eventos
    ) VALUES (
        i_info_centro_educativo,
        i_ciclo_actual,
        COALESCE(nombre_clase, 'No hay clase en curso'),
        COALESCE(color_clase_actual, JSON_OBJECT('color', '#808080')),
        COALESCE(salon_clase, 'sin salon'),
        COALESCE(TIME_FORMAT(hora_inicio_actual, '%H:%i'), 'sin hora'),
        COALESCE(nombre_proxima_clase, 'No hay más clases'),
        COALESCE(color_proxima_clase, JSON_OBJECT('color', '#808080')),
        COALESCE(salon_proxima_clase, 'sin salon'),
        COALESCE(TIME_FORMAT(hora_inicio_proxima, '%H:%i'), 'sin hora'),
        i_proximos_eventos
    );
    
    -- Seleccionar los datos de la tabla temporal
    SELECT * FROM tmp_calendar_info;

    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_course_rank` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_get_course_rank`(
      IN i_usuid INT,
    IN i_cedid INT,
    IN i_cecid INT
)
BEGIN
    DECLARE i_ciclo_id INT;
    DECLARE i_posicion INT;
    DECLARE i_total_estudiantes INT;
    DECLARE i_promedio DECIMAL(10,1);
	DECLARE i_info_centro_educativo JSON;
	DECLARE i_ciclo_actual JSON;
       SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'cedid', ced.cedid,
                'cedcod', ced.cedcod,
                'cednom', ced.cednom,
                'cedtip', ced.cedtip
            )
        ) INTO i_info_centro_educativo
	FROM tbl_centro_educativo ced
    INNER JOIN tbl_usuario usu ON ced.cedid = usu.cedid
    WHERE ced.cedid = i_cedid
    AND usu.usuid = i_usuid;
      SET @_current_cycle_info = (
		SELECT
			JSON_OBJECT(
				'cecid', cecid,
                'cecod', cecod,
                'cecnom', cecnom,
                'cecfecini', cecfecini,
                'cecfecfin', cecfecfin
            )
		FROM tbl_centro_educativo_ciclo
        WHERE cecid = i_cecid
    );
    SELECT DISTINCT ac.ascid INTO i_ciclo_id
    FROM tbl_asignatura_estudiante ase
    INNER JOIN tbl_asignatura_curso ac ON ase.asgid = ac.asgid
    WHERE ase.usuid = i_usuid
    LIMIT 1;
    
    SELECT ROUND(AVG(acc.acccalificacion), 1) INTO i_promedio
    FROM tbl_asignatura_calificacion_ciclo acc
    WHERE usuid = i_usuid
    AND acc.cecid = i_cecid;
    
    SELECT COUNT(*) + 1 INTO i_posicion
    FROM (
        SELECT 
            ase2.usuid,
            AVG(acc2.acccalificacion) AS promedio
        FROM tbl_asignatura_estudiante ase2
        INNER JOIN tbl_asignatura_curso ac2 ON ase2.asgid = ac2.asgid
        INNER JOIN tbl_asignatura_calificacion_ciclo acc2 ON ase2.usuid = acc2.usuid
        WHERE ac2.ascid = i_ciclo_id
        GROUP BY ase2.usuid
        HAVING AVG(acc2.acccalificacion) > i_promedio
    ) AS mejores;
    
    SELECT COUNT(DISTINCT ase3.usuid) INTO i_total_estudiantes
    FROM tbl_asignatura_estudiante ase3
    INNER JOIN tbl_asignatura_curso ac3 ON ase3.asgid = ac3.asgid
    WHERE ac3.ascid = i_ciclo_id;
    DROP TABLE IF EXISTS tbltmp_student_course_rank;
    CREATE TEMPORARY TABLE tbltmp_student_course_rank AS (
    SELECT 
        i_usuid AS usuid,
        i_ciclo_id AS ciclo_id,
        i_promedio AS promedio,
        i_posicion AS posicion,
        i_total_estudiantes AS total_estudiantes,
        CONCAT('Top ', i_posicion, ' En la clase ') AS mensaje_rank);
-- SELECT * from tbltmp_student_course_rank;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_general_information` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_get_general_information`(
    IN i_usuid INT,
	IN i_cedid INT,
	IN i_cecid INT
)
BEGIN
    DECLARE i_total_materias INT DEFAULT 0;
    DECLARE i_suma_notas DECIMAL(10,1) DEFAULT 0;
    DECLARE i_promedio VARCHAR(20) DEFAULT null;  
    DECLARE i_total_trabajos INT DEFAULT 0;
    DECLARE i_trabajos_realizados INT DEFAULT 0;
    DECLARE i_progreso_estudiante INT DEFAULT 0;
    DECLARE i_total_inasistencias INT DEFAULT 0;  
    DECLARE i_total_asistencias INT DEFAULT 0;
    DECLARE i_total_clases INT DEFAULT 0;
    DECLARE i_porcentaje_asistencias INT DEFAULT 0;
    DECLARE i_progreso_resumen VARCHAR(30) DEFAULT 'Desempeño Bajo';
    DECLARE i_color_resumen_grafico VARCHAR(20) DEFAULT '9E9E9E';
    DECLARE i_color_resumen VARCHAR(20) DEFAULT '#9E9E9E';
    DECLARE i_info_centro_educativo JSON;
    DECLARE i_centro_educativo_estudiante INT;
    DECLARE i_centro_educativo_cod VARCHAR(20);
    DECLARE i_centro_educativo_nom VARCHAR(20);
    DECLARE i_centro_educativo_tipo CHAR(2);
    DECLARE i_centro_educativo_pais INT;
    DECLARE i_centro_educativo_pais_nombre VARCHAR(100);
    DECLARE i_proximos_eventos JSON;
    DECLARE i_ciclo_actual JSON;
    DECLARE i_ciclo_actual_id INT;
    DECLARE i_ciclo_actual_cod VARCHAR(3);
    DECLARE i_ciclo_actual_nom VARCHAR(100);
    DECLARE i_nuevas_materias INT DEFAULT 0;
    DECLARE i_cecid_actual INT;  

    -- Total de materias
    SELECT COUNT(DISTINCT a.asgid) INTO i_total_materias
    FROM tbl_asignatura_estudiante ae
    LEFT JOIN tbl_asignatura a on ae.asgid = a.asgid
    WHERE ae.usuid = i_usuid
    AND a.cedid = i_cedid;
    
    -- Suma de notas
    SELECT IFNULL(SUM(acccalificacion), 0) INTO i_suma_notas
    FROM tbl_asignatura_calificacion_ciclo acc
    WHERE acc.usuid = i_usuid
    AND acc.cecid = i_cecid;
    
    SELECT COUNT(DISTINCT ast.astid) INTO i_total_trabajos
    FROM tbl_asignatura_estudiante ase
    INNER JOIN tbl_asignatura_trabajo ast ON ase.asgid = ast.asgid
    WHERE ast.asttip = 'TA'
    AND ase.usuid = i_usuid
    AND ast.cecid = i_cecid; 

    -- Trabajos realizados
    SELECT COUNT(DISTINCT ate.ateid) INTO i_trabajos_realizados
    FROM tbl_asignatura_trabajo_entrega ate
    INNER JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    WHERE ast.asttip = 'TA' 
    AND ate.usuid = i_usuid  
    AND ate.ateestado IN ('E', 'C')
    AND ast.cecid = i_cecid;
    
    -- Progreso del estudiante
    IF i_total_trabajos > 0 THEN 
        SET i_progreso_estudiante = ROUND((i_trabajos_realizados * 100) / i_total_trabajos);
    ELSE
        SET i_progreso_estudiante = 0;
    END IF; 
    
    -- Determinar color y mensaje según progreso
    IF i_progreso_estudiante >= 80 THEN
        SET i_progreso_resumen = 'Excelente desempeño';
        SET i_color_resumen_grafico = 'a9ffae';
        SET i_color_resumen = '#a9ffae';
    ELSEIF i_progreso_estudiante > 60 THEN 
        SET i_progreso_resumen = 'Buen desempeño';
        SET i_color_resumen_grafico = 'aefa7b';
        SET i_color_resumen = '#aefa7b';
    ELSEIF i_progreso_estudiante > 40 THEN
        SET i_progreso_resumen = 'Desempeño Regular';
        SET i_color_resumen_grafico = 'f8f289';
        SET i_color_resumen = '#f8f289';
    ELSE
        SET i_progreso_resumen = 'Desempeño Bajo';
        SET i_color_resumen_grafico = 'fb9b9b';
        SET i_color_resumen = '#fb9b9b';
    END IF;
    
    -- Promedio
    IF i_total_materias > 0 AND i_suma_notas > 0 THEN 
        SET i_promedio = ROUND(i_suma_notas / i_total_materias, 1);
    ELSE
        SET i_promedio = null;
    END IF;
    
    -- Información del centro educativo
    SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'cedid', ced.cedid,
                'cedcod', ced.cedcod,
                'cednom', ced.cednom,
                'cedtip', ced.cedtip
            )
        ) INTO i_info_centro_educativo
	FROM tbl_centro_educativo ced
    INNER JOIN tbl_usuario usu ON ced.cedid = usu.cedid
    WHERE ced.cedid = i_cedid
    AND usu.usuid = i_usuid;
      SET @_current_cycle_info = (
		SELECT
			JSON_OBJECT(
				'cecid', cecid,
                'cecod', cecod,
                'cecnom', cecnom,
                'cecfecini', cecfecini,
                'cecfecfin', cecfecfin
            )
		FROM tbl_centro_educativo_ciclo
        WHERE cecid = i_cecid
    );
  
    -- Ciclo actual - OBTENER EL ID DEL CICLO
    SELECT 
        cec.cecid INTO i_cecid_actual  
    FROM tbl_asignatura_estudiante ase
    INNER JOIN tbl_asignatura_curso ac ON ase.asgid = ac.asgid
    INNER JOIN tbl_centro_educativo_curso cur ON ac.edcid = cur.edcid
    INNER JOIN tbl_centro_educativo ced ON cur.cedid = ced.cedid
    INNER JOIN tbl_centro_educativo_ciclo cec ON cec.cedid = ced.cedid
    WHERE ase.usuid = i_usuid
        AND cec.cecfecfin > NOW()  -- Solo ciclos activos
    ORDER BY cur.edcid DESC
    LIMIT 1;
    
    -- Crear JSON del ciclo actual
    IF i_cecid_actual IS NOT NULL THEN
        SELECT JSON_OBJECT(
            'cecid', cec.cecid,
            'cecod', cec.cecod,
            'cecnom', cec.cecnom,
            'cedid', ced.cedid
        ) INTO i_ciclo_actual
        FROM tbl_centro_educativo_ciclo cec
        INNER JOIN tbl_centro_educativo ced ON cec.cedid = ced.cedid
        WHERE cec.cecid = i_cecid_actual;
    END IF;
    
    SET @_info_user = (
		SELECT
			JSON_OBJECT(
				'usuid', usu.usuid,
                'usunom', usu.usunom,
                'usudocu', usu.usudocu,
                'usuemail', usu.usuemail,
                'rolcod', rol.rolcod
            )
		FROM tbl_usuario usu
        INNER JOIN tbl_rol rol ON usu.rolid = rol.rolid
        WHERE usu.usuid = i_usuid
    );

    IF i_cecid_actual IS NOT NULL THEN
        SELECT COUNT(DISTINCT ase.asgid) INTO i_nuevas_materias
        FROM tbl_asignatura_estudiante ase
        WHERE ase.usuid = i_usuid
        AND NOT EXISTS (
            SELECT 1 
            FROM tbl_asignatura_calificacion_ciclo acc
            WHERE acc.usuid = i_usuid
            AND acc.asgid = ase.asgid
            AND acc.cecid != i_cecid_actual  
        );
    END IF;
    
    -- Inasistencias
    SELECT COUNT(DISTINCT aa.asiid) INTO i_total_inasistencias
    FROM tbl_asignatura_estudiante ae
    LEFT JOIN tbl_asignatura_asistencia aa ON ae.usuid = aa.usuid AND aa.asiestado = 'A'
    WHERE ae.usuid = i_usuid;
    
    -- Asistencias
    SELECT COUNT(DISTINCT aa.asiid) INTO i_total_asistencias
    FROM tbl_asignatura_estudiante ae
    LEFT JOIN tbl_asignatura_asistencia aa ON ae.usuid = aa.usuid AND aa.asiestado = 'P' 
	LEFT JOIN tbl_asignatura a ON aa.asgid = a.asgid
    WHERE ae.usuid = i_usuid
	AND a.cedid = i_cedid;
    
    -- Total clases
    SELECT COUNT(DISTINCT aa.asiid) INTO i_total_clases
    FROM tbl_asignatura_estudiante ae
    LEFT JOIN tbl_asignatura_asistencia aa ON ae.usuid = aa.usuid
    LEFT JOIN tbl_asignatura a ON aa.asgid = a.asgid
    WHERE ae.usuid = i_usuid
    AND a.cedid = i_cedid;
    
    -- Porcentaje de asistencias
    IF i_total_clases > 0 THEN
        SET i_porcentaje_asistencias = ROUND((i_total_asistencias * 100) / i_total_clases);
    ELSE 
        SET i_porcentaje_asistencias = 0;
    END IF;
-- proximos eventos
SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'id_trabajo', ast.astid,
        'nombre_trabajo', ast.astnomtrabajo,
        'color_materia', ascu.ascvis_config,
        'fecha_fin', ast.astfecfin
    )
) INTO i_proximos_eventos
FROM tbl_asignatura_trabajo ast
INNER JOIN tbl_asignatura_curso ascu ON ascu.asgid = ast.asgid
INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = ast.asgid
WHERE ast.cecid = i_cecid
AND ase.usuid = i_usuid
AND ast.astfecfin > current_timestamp();
    
    DROP TEMPORARY TABLE IF EXISTS tbltmp_general_information;
    CREATE TEMPORARY TABLE tbltmp_general_information AS (
		SELECT 
			i_usuid AS usuid,
            @_info_user AS info_user,
			i_info_centro_educativo AS info_centro_educativo,
			i_ciclo_actual AS ciclo_actual,
			i_total_materias AS total_materias,
			i_promedio AS promedio,
			i_progreso_estudiante AS progreso_estudiante,
			CONCAT(i_progreso_estudiante, '%') AS porcentaje_progreso,
			i_progreso_resumen AS progreso_resumen,
			i_total_inasistencias AS total_inasistencias,
			i_color_resumen_grafico AS color_resumen_grafico,
			i_color_resumen AS color_resumen,
            i_proximos_eventos AS proximos_eventos,
			i_porcentaje_asistencias AS porcentaje_asistencias,
			CONCAT(i_porcentaje_asistencias, '% Asistencia total') AS mensaje_asistencia,
			IFNULL(i_nuevas_materias, 0) AS nuevas_materias,
			CONCAT('+', IFNULL(i_nuevas_materias, 0), ' nueva(s) materia(s) este periodo') AS mensaje_materias
        );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_info_class` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_get_info_class`(
IN i_cedid INT,
IN i_cecid INT,
IN i_usuid INT,
IN i_asgcod CHAR(4)
)
BEGIN

SET @_asgid = (SELECT asgid FROM tbl_asignatura WHERE asgcod = i_asgcod);
-- SELECT @_asgid; -- DEBUG

SET @_info_asignatura = (
	SELECT 
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'asgnom', asg.asgnom,
                'asgcod', asg.asgcod,
                'asgcod_clase', asg.asgcod_clase,
                'ascvis_config', tbl_asignatura_curso.ascvis_config,
                'usunom', usu.usunom
            )
        )
	FROM tbl_asignatura_estudiante ase
    JOIN tbl_asignatura asg ON ase.asgid = asg.asgid
    JOIN tbl_asignatura_curso ON tbl_asignatura_curso.asgid = ase.asgid
    JOIN tbl_usuario usu ON asg.usuid=usu.usuid
    WHERE ase.asgid = @_asgid
    AND ase.usuid = i_usuid
    AND asg.cedid = i_cedid
    -- AND tbl_asignatura_curso.cecid = i_cecid
);

-- SELECT @_info_asignatura; -- DEBUG

SET @_quantity_tasks_pending = (
	SELECT 
		COUNT(*) 
    FROM tbl_asignatura_trabajo_entrega ate
    JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
    WHERE ast.cecid = i_cecid
    AND asg.cedid = i_cedid
    AND asg.asgid = @_asgid
    AND ate.ateestado = 'P' 
    AND ate.usuid = i_usuid
);

-- SELECT @_quantity_tasks_pending; -- DEBUG

SET @_tasks_asignatura = (
	SELECT 
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'astid', ast.astid,
                'asntnomtrabajo', ast.astnomtrabajo,
                'astdesctrabajo', ast.astdesctrabajo,
                'astfecini', ast.astfecini,
                'astfecfin', ast.astfecfin,
                'asttip', ast.asttip,
                'atefec_entrega', ate.atefec_entrega,
                'ateestado', ate.ateestado,
                'ateestado_text', IF(ate.ateestado = 'P', 'Pendiente', IF(ate.ateestado = 'C', 'Calificado', IF(ate.ateestado = 'E', 'Entregado', 'Devuelto'))),
                'atccalificacion', atc.atccalificacion,
                'atctimestamp', atc.atctimestamp
            )
        )
	FROM tbl_asignatura_trabajo ast
    -- JOIN tbl_asignatura_curso ON ast.ascid = tbl_asignatura_curso.ascid
    JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
    JOIN tbl_asignatura_trabajo_entrega ate ON ast.astid = ate.astid
    LEFT JOIN tbl_asignatura_trabajo_calificacion atc ON ate.ateid = atc.ateid
    WHERE ast.cecid = i_cecid
    AND asg.asgid = @_asgid
    AND asg.cedid = i_cedid
    AND ate.usuid = i_usuid
	
);

-- SELECT @_tasks_asignatura; -- DEBUG

SELECT 
	@_quantity_tasks_pending AS quantity_tasks_pending,
	@_info_asignatura AS info_asignatura,
    @_tasks_asignatura AS tasks_asignatura;
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_last_notes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_get_last_notes`(
    IN i_usuid INT,
    IN i_cedid INT,
    IN i_cecid INT
)
BEGIN
    DECLARE i_info_centro_educativo JSON;
	DECLARE i_ciclo_actual JSON;
    IF EXISTS (
        SELECT 1 
        FROM tbl_asignatura_trabajo_calificacion atc
        INNER JOIN tbl_asignatura_trabajo_entrega ate ON atc.ateid = ate.ateid
        WHERE ate.usuid = i_usuid AND ate.ateestado = 'C'
    ) THEN
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'usuid', ate.usuid,
                'nombre_materia', a.asgnom,
                'titulo_tarea', ast.astnomtrabajo,
                'calificacion_tarea', atc.atccalificacion,
                'fecha', DATE_FORMAT(atc.atctimestamp, '%Y/%m/%d'),
                'color', tbl_asignatura_curso.ascvis_config,
                'color_nota', 
                    CASE 
                        WHEN atc.atccalificacion >= 4 AND atc.atccalificacion <= 5 THEN '#a9ffae'
                        WHEN atc.atccalificacion >= 3 AND atc.atccalificacion < 4 THEN '#f8f289'
                        WHEN atc.atccalificacion <= 2.9 THEN '#fb9b9b'
                        ELSE '#808080'
                    END
            )
        ) INTO @_student_last_notes
        FROM (
            SELECT atc2.atcid
            FROM tbl_asignatura_trabajo_calificacion atc2
            INNER JOIN tbl_asignatura_trabajo_entrega ate2 ON atc2.ateid = ate2.ateid
            WHERE ate2.usuid = i_usuid AND ate2.ateestado = 'C'
            ORDER BY atc2.atctimestamp DESC, atc2.atcid DESC
            LIMIT 3
        ) AS latest_ids
        INNER JOIN tbl_asignatura_trabajo_calificacion atc ON latest_ids.atcid = atc.atcid
        INNER JOIN tbl_asignatura_trabajo_entrega ate ON atc.ateid = ate.ateid
        INNER JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
        INNER JOIN tbl_asignatura a ON ast.asgid = a.asgid
        INNER JOIN tbl_asignatura_curso ON a.asgid = tbl_asignatura_curso.asgid
        WHERE ast.cecid = i_cecid
        ORDER BY atc.atctimestamp DESC;
        
    ELSE
        SET @_student_last_notes = JSON_ARRAY(
            JSON_OBJECT(
                'usuid', i_usuid,
                'nombre_materia', 'No hay materias que mostrar',
                'titulo_tarea', 'No hay tareas que mostrar',
                'calificacion_tarea', 0,
                'fecha', NULL,
                'color', '#808080',
                'color_nota', '#808080'
            )
        );
    END IF;
       SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'cedid', ced.cedid,
                'cedcod', ced.cedcod,
                'cednom', ced.cednom,
                'cedtip', ced.cedtip
            )
        ) INTO i_info_centro_educativo
	FROM tbl_centro_educativo ced
    INNER JOIN tbl_usuario usu ON ced.cedid = usu.cedid
    WHERE ced.cedid = i_cedid
    AND usu.usuid = i_usuid;
      SET @_current_cycle_info = (
		SELECT
			JSON_OBJECT(
				'cecid', cecid,
                'cecod', cecod,
                'cecnom', cecnom,
                'cecfecini', cecfecini,
                'cecfecfin', cecfecfin
            )
		FROM tbl_centro_educativo_ciclo
        WHERE cecid = i_cecid
      
    );
   -- SELECT @_student_last_notes AS student_last_notes;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_notes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sp_student_get_notes`(
IN i_cedid INT,
IN i_cecid INT,
IN i_usuid INT,
IN i_opcion CHAR(3)
)
BEGIN

-- ///////// i_opcion ////////
	-- (STK) See TasKs (Ver tareas)
    -- (SDN) See Definitive Notes (Ver notas definitivas)
-- ///////////////////////////

SET lc_time_names = 'es_ES'; -- Para que los meses con MONTHNAME salgan en español.
SET time_zone = '-05:00';

-- Esta tabla temporal tarera el total de tareas entregadas, sin entregar y sin calificar.
DROP TABLE IF EXISTS tbltmp_info_tasks;
CREATE TEMPORARY TABLE tbltmp_info_tasks AS (
	SELECT
		IFNULL(SUM(CASE WHEN ate.ateestado IN('C', 'E') THEN 1 END), 0) AS total_tasks_deliveries,
        IFNULL(SUM(CASE WHEN ate.ateestado = 'P' THEN 1 END), 0) AS total_tasks_without_deliveried,
        IFNULL(SUM(CASE WHEN ate.ateestado = 'E' THEN 1 END), 0) AS total_tasks_without_qualified
	FROM tbl_asignatura_trabajo_entrega ate
    JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
    WHERE ast.cecid = i_cecid
    AND asg.cedid = i_cedid
    AND ate.usuid = i_usuid
);

-- SELECT * FROM tbltmp_info_tasks; -- DEBUG

SET @_quantity_low_notes = (
	SELECT
		COUNT(*)
	FROM tbl_asignatura_trabajo_entrega ate
    JOIN tbl_asignatura_trabajo_calificacion atc ON ate.ateid = atc.ateid
    JOIN tbl_asignatura_trabajo ast ON ate.astid = ast.astid
    JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
    WHERE asg.cedid = i_cedid
    AND ast.cecid = i_cecid
    AND ate.usuid = i_usuid
    AND atc.atccalificacion < 3.0
);

-- SELECT @_quantity_low_notes; -- DEBUG

IF i_opcion = 'STK' THEN

	SELECT
		(
			SELECT
				JSON_OBJECT(
					'total_tasks_deliveries', total_tasks_deliveries,
                    'total_tasks_without_deliveried', total_tasks_without_deliveried,
                    'total_tasks_without_qualified', total_tasks_without_qualified,
                    'quantity_low_notes', @_quantity_low_notes
                )
			FROM tbltmp_info_tasks
        ) AS info_cards,
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'astid', ast.astid,
                'cecnom', cec.cecnom,
                'asgnom', asg.asgnom,
                'astnomtrabajo', ast.astnomtrabajo,
                'astfecfin', CONCAT(DAY(ast.astfecfin),' ', MONTHNAME(ast.astfecfin), ' ', YEAR(ast.astfecfin)),
                'atefec_entrega', CONCAT(DAY(ate.atefec_entrega), ' ', MONTHNAME(ate.atefec_entrega), ' ', YEAR(ate.atefec_entrega)),
                'atccalificacion', atc.atccalificacion
			)
		) AS list_tasks
	FROM tbl_asignatura_trabajo ast
    LEFT JOIN tbl_asignatura_trabajo_entrega ate ON ast.astid = ate.astid
    LEFT JOIN tbl_asignatura_trabajo_calificacion atc ON ate.ateid = atc.ateid
    JOIN tbl_centro_educativo_ciclo cec ON ast.cecid = cec.cecid
    JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
    WHERE asg.cedid = i_cedid
    AND ast.cecid = i_cecid
    AND ate.usuid = i_usuid;
        
END IF;

DROP TABLE IF EXISTS tbltmp_info_tasks;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_schedule_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_get_schedule_info`(
    IN i_usuid INT,
    IN i_cedid INT,
    IN i_cecid INT
)
BEGIN
    DECLARE dia_actual INT;
    DECLARE duracion_clase INT DEFAULT 60;
    DECLARE i_nombre_proxima_clase VARCHAR(100);
    DECLARE i_salon_proxima_clase VARCHAR(20);
    DECLARE i_hora_inicio_proxima TIME;
    DECLARE i_tiempo_restante INT;
    DECLARE i_color_clase VARCHAR(20);
    DECLARE i_eventos_horario JSON;
    DECLARE i_entregas_pendientes JSON;
    DECLARE i_info_centro_educativo JSON;
    DECLARE i_ciclo_actual JSON;
    

    DROP TEMPORARY TABLE IF EXISTS tmp_dashboard_info;
    CREATE TEMPORARY TABLE tmp_dashboard_info (
        info_centro_educativo JSON,
        ciclo_actual JSON,
        proxima_clase_nombre VARCHAR(100),
        proxima_clase_tiempo VARCHAR(50),
        proxima_clase_salon VARCHAR(20),
        proxima_clase_color VARCHAR(20),
        entregas_pendientes JSON,
        eventos_horario JSON
    );
    
    SET dia_actual = DAYOFWEEK(CURDATE());
    
    SELECT
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'cedid', ced.cedid,
                'cedcod', ced.cedcod,
                'cednom', ced.cednom,
                'cedtip', ced.cedtip
            )
        ) INTO i_info_centro_educativo
    FROM tbl_centro_educativo ced
    INNER JOIN tbl_usuario usu ON ced.cedid = usu.cedid
    WHERE ced.cedid = i_cedid
        AND usu.usuid = i_usuid;
    
    SET i_ciclo_actual = (
        SELECT
            JSON_OBJECT(
                'cecid', cecid,
                'cecod', cecod,
                'cecnom', cecnom,
                'cecfecini', cecfecini,
                'cecfecfin', cecfecfin
            )
        FROM tbl_centro_educativo_ciclo
        WHERE cecid = i_cecid
    );
    

    SELECT
        asg.asgnom,
        COALESCE(ces.cesnom, 'sin salon'),
        ash.ashhora,
        COALESCE(
            JSON_UNQUOTE(JSON_EXTRACT(ascu.ascvis_config, '$.color')), 
            '#808080'
        ) AS color_clase
    INTO
        i_nombre_proxima_clase,
        i_salon_proxima_clase,
        i_hora_inicio_proxima,
        i_color_clase
    FROM tbl_asignatura asg
    INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = asg.asgid
    INNER JOIN tbl_asignatura_horario ash ON ash.asgid = asg.asgid
    LEFT JOIN tbl_asignatura_curso ascu ON ascu.asgid = asg.asgid
    LEFT JOIN tbl_centro_educativo_salon ces ON asg.cesid = ces.cesid
    WHERE asg.cedid = i_cedid
        AND ase.usuid = i_usuid
        AND (
            (ash.ashdia = dia_actual AND ash.ashhora > CURTIME())
            OR ash.ashdia > dia_actual
        )
    ORDER BY 
        CASE WHEN ash.ashdia = dia_actual THEN 0 ELSE 1 END,
        ash.ashdia ASC, 
        ash.ashhora ASC
    LIMIT 1;
    
    IF i_nombre_proxima_clase IS NOT NULL THEN
        IF EXISTS (SELECT 1 FROM tbl_asignatura_horario ash 
                   WHERE ash.ashdia = dia_actual 
                   AND ash.ashhora = i_hora_inicio_proxima) THEN
            SET i_tiempo_restante = TIMESTAMPDIFF(MINUTE, CURTIME(), i_hora_inicio_proxima);
            IF i_tiempo_restante < 0 THEN
                SET i_tiempo_restante = 0;
            END IF;
        ELSE
            SET i_tiempo_restante = NULL;
        END IF;
    END IF;
    
SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
        'id_trabajo', entregas.astid,
        'nombre_trabajo', entregas.astnomtrabajo,
        'nombre_materia', entregas.asgnom,
        'fecha_limite', DATE_FORMAT(entregas.astfecfin, '%d/%m/%Y %H:%i'),
        'fecha_limite_raw', entregas.astfecfin,
        'estado', CASE 
            WHEN entregas.ateestado IS NULL AND entregas.astfecfin < CURRENT_TIMESTAMP() THEN 'ATRASADO'
            WHEN entregas.ateestado = 'P' AND entregas.astfecfin < CURRENT_TIMESTAMP() THEN 'ATRASADO'
            WHEN entregas.ateestado IS NULL THEN 'PENDIENTE'
            WHEN entregas.ateestado = 'P' THEN 'PENDIENTE'
            WHEN entregas.ateestado = 'E' THEN 'ENTREGADO'
            WHEN entregas.ateestado = 'C' THEN 'CALIFICADO'
            ELSE 'DESCONOCIDO'
        END,
        'color_materia', COALESCE(
            JSON_UNQUOTE(JSON_EXTRACT(entregas.ascvis_config, '$.color')),
            '#808080'
        )
    )
) INTO i_entregas_pendientes
FROM (
    SELECT 
        ast.astid, 
        ast.astnomtrabajo, 
        ast.astfecfin, 
        asg.asgnom, 
        ascu.ascvis_config, 
        ate.ateestado
    FROM tbl_asignatura_trabajo ast
    INNER JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
    INNER JOIN tbl_asignatura_curso ascu ON ascu.asgid = asg.asgid
    INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = asg.asgid
    LEFT JOIN tbl_asignatura_trabajo_entrega ate 
        ON ate.astid = ast.astid 
        AND ate.usuid = i_usuid
    WHERE ast.cecid = i_cecid
        AND ase.usuid = i_usuid
        AND ast.astfecfin > DATE_SUB(CURRENT_TIMESTAMP(), INTERVAL 7 DAY)
        AND (ate.ateestado IS NULL OR ate.ateestado = 'P')
    ORDER BY ast.astfecfin ASC
    LIMIT 2
) AS entregas;
    
    IF i_entregas_pendientes IS NULL THEN
        SET i_entregas_pendientes = JSON_ARRAY(
            JSON_OBJECT(
                'mensaje', 'No hay entregas pendientes',
                'estado', 'TODO_OK'
            )
        );
    END IF;

    DROP TEMPORARY TABLE IF EXISTS tmp_eventos_materia;
    CREATE TEMPORARY TABLE tmp_eventos_materia AS
    SELECT 
        asg.asgid,
        asg.asgnom AS nombre_asignatura,
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(ascu.ascvis_config, '$.color')), '#808080') AS color,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'dia', ash.ashdia,
                'dia_nombre', CASE 
                    WHEN ash.ashdia = 1 THEN 'Domingo'
                    WHEN ash.ashdia = 2 THEN 'Lunes'
                    WHEN ash.ashdia = 3 THEN 'Martes'
                    WHEN ash.ashdia = 4 THEN 'Miércoles'
                    WHEN ash.ashdia = 5 THEN 'Jueves'
                    WHEN ash.ashdia = 6 THEN 'Viernes'
                    WHEN ash.ashdia = 7 THEN 'Sábado'
                END,
                'hora_inicio', TIME_FORMAT(ash.ashhora, '%H:%i'),
                'hora_fin', TIME_FORMAT(ADDTIME(ash.ashhora, SEC_TO_TIME(duracion_clase * 60)), '%H:%i'),
                'salon', COALESCE(ces.cesnom, 'sin salon'),
                'duracion_minutos', duracion_clase
            )
        ) AS eventos
    FROM tbl_asignatura asg
    INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = asg.asgid
    INNER JOIN tbl_asignatura_horario ash ON ash.asgid = asg.asgid
    LEFT JOIN tbl_asignatura_curso ascu ON ascu.asgid = asg.asgid
    LEFT JOIN tbl_centro_educativo_salon ces ON asg.cesid = ces.cesid
    WHERE asg.cedid = i_cedid
        AND ase.usuid = i_usuid
    GROUP BY asg.asgid, asg.asgnom, ascu.ascvis_config;
    
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'id_asignatura', asgid,
            'nombre', nombre_asignatura,
            'color', color,
            'eventos', eventos
        )
    ) INTO i_eventos_horario
    FROM tmp_eventos_materia;
    
    DROP TEMPORARY TABLE IF EXISTS tmp_eventos_materia;
    

    
    INSERT INTO tmp_dashboard_info (
        info_centro_educativo,
        ciclo_actual,
        proxima_clase_nombre,
        proxima_clase_tiempo,
        proxima_clase_salon,
        proxima_clase_color,
        entregas_pendientes,
        eventos_horario
    ) VALUES (
        i_info_centro_educativo,
        i_ciclo_actual,
        COALESCE(i_nombre_proxima_clase, 'No hay más clases programadas'),
        CASE 
            WHEN i_nombre_proxima_clase IS NULL THEN ''
            WHEN i_tiempo_restante IS NULL THEN 'Próximos días'
            WHEN i_tiempo_restante <= 0 THEN 'En curso o por empezar'
            ELSE CONCAT(i_tiempo_restante, ' minutos')
        END,
        COALESCE(i_salon_proxima_clase, ''),
        COALESCE(i_color_clase, '#808080'),
        i_entregas_pendientes,
        i_eventos_horario
    );
    

    
    SELECT * FROM tmp_dashboard_info;
    
    
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_get_task_info` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_get_task_info`(
    IN i_usuid INT,
    IN i_cedid INT,
    IN i_cecid INT
)
BEGIN
    DECLARE i_asttip ENUM('TA', 'MA', 'EN');
    DECLARE i_astid INT;
    DECLARE i_tiene_acceso INT DEFAULT 0;
    DECLARE i_info_centro_educativo JSON;
    DECLARE i_ciclo_actual JSON;
    
    SET i_astid = 16;
    
   
    SELECT
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'cedid', ced.cedid,
                'cedcod', ced.cedcod,
                'cednom', ced.cednom,
                'cedtip', ced.cedtip
            )
        ) INTO i_info_centro_educativo
    FROM tbl_centro_educativo ced
    INNER JOIN tbl_usuario usu ON ced.cedid = usu.cedid
    WHERE ced.cedid = i_cedid
        AND usu.usuid = i_usuid;
    

    SET @_current_cycle_info = (
        SELECT
            JSON_OBJECT(
                'cecid', cecid,
                'cecod', cecod,
                'cecnom', cecnom,
                'cecfecini', cecfecini,
                'cecfecfin', cecfecfin
            )
        FROM tbl_centro_educativo_ciclo
        WHERE cecid = i_cecid
    );
    

    DROP TEMPORARY TABLE IF EXISTS tbltemp_task_info;
    CREATE TEMPORARY TABLE tbltemp_task_info (
        usuid INT,
        tipo_trabajo VARCHAR(2),
        nombre_asignatura VARCHAR(150),
        nombre_trabajo VARCHAR(150),
        descripcion_trabajo TEXT,
        puntaje_maximo int,
        nombre_profesor VARCHAR(50),
        trabajo_recursos JSON,
        fecha_fin VARCHAR(20),
        tarea_estado VARCHAR(50),
        color_estado VARCHAR(20),
        color_clase VARCHAR(20),
        tarea_calificacion DECIMAL(10,1),
        mensaje VARCHAR(200)
    );
    
  
    SELECT asttip INTO i_asttip
    FROM tbl_asignatura_trabajo
    WHERE astid = i_astid;
    

    SELECT COUNT(*) INTO i_tiene_acceso
    FROM tbl_asignatura_trabajo ast
    INNER JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
    INNER JOIN tbl_asignatura_estudiante ae ON ae.asgid = asg.asgid
    WHERE ast.astid = i_astid 
        AND ae.usuid = i_usuid;
    
    
    IF i_astid IS NOT NULL AND i_asttip IS NOT NULL THEN
        IF i_tiene_acceso > 0 THEN
            -- Trabajo tipo TA (Tarea)
            IF i_asttip = 'TA' THEN 
                INSERT INTO tbltemp_task_info (
                    usuid, 
                    tipo_trabajo, 
                    nombre_asignatura, 
                    nombre_trabajo, 
                    descripcion_trabajo, 
                    puntaje_maximo,
                    trabajo_recursos,
                    fecha_fin, 
                    tarea_estado, 
                    color_estado,
                    color_clase,
                    tarea_calificacion
                )
                SELECT 
                    i_usuid,
                    'TA' AS tipo_trabajo,
                    asg.asgnom,
                    ast.astnomtrabajo, 
                    ast.astdesctrabajo, 
                    ast.astpunt_max as puntaje_maximo,
                    
                    (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'nombre_recurso', atr.atrnomarc,
                                'url_recurso', atr.atrurl,
                                'tipo_recurso', atr.atrtiprec
                            )
                        )
                        FROM tbl_asignatura_trabajo_recurso atr
                        WHERE atr.astid = ast.astid
                    ) AS trabajo_recursos,
                    DATE_FORMAT(ast.astfecfin, '%d/%m/%Y %H:%i') AS fecha_fin,    
                    CASE 
                        WHEN ate.ateestado IS NULL AND ast.astfecfin < CURRENT_TIMESTAMP() AND ast.astentardias = 0 THEN 'No entregado'
                        WHEN ate.ateestado IS NULL THEN 'Entrega pendiente'
                        WHEN ate.ateestado = 'P' AND ast.astfecfin < CURRENT_TIMESTAMP() AND ast.astentardias = 0 THEN 'No entregado'
                        WHEN ate.ateestado = 'P' THEN 'Entrega pendiente'
                        WHEN ate.ateestado = 'E' THEN 'Trabajo entregado'
                        WHEN ate.ateestado = 'C' THEN 'Trabajo calificado'
                        ELSE 'Estado desconocido'
                    END AS tarea_estado,
                    CASE 
                        WHEN ate.ateestado IS NULL AND ast.astfecfin < CURRENT_TIMESTAMP() AND ast.astentardias = 0 THEN '#ff6b6b'
                        WHEN ate.ateestado IS NULL THEN '#f8f289'
                        WHEN ate.ateestado = 'P' AND ast.astfecfin < CURRENT_TIMESTAMP() AND ast.astentardias = 0 THEN '#ff6b6b'
                        WHEN ate.ateestado = 'P' THEN '#f8f289'
                        WHEN ate.ateestado = 'E' THEN '#a9ffae'
                        WHEN ate.ateestado = 'C' THEN '#a9ffae'
                        ELSE '#ffffff'
                    END AS color_estado,
                    -- CAMBIO AQUÍ: Ahora devuelve solo el string del color
                    JSON_UNQUOTE(JSON_EXTRACT(ac.ascvis_config, '$.color')) AS color_clase,
                    COALESCE(atc.atccalificacion, 0) AS tarea_calificacion
                FROM tbl_asignatura_trabajo ast
                INNER JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
                INNER JOIN tbl_asignatura_estudiante ae ON ae.asgid = asg.asgid  
                INNER JOIN tbl_asignatura_curso ac ON asg.asgid = ac.asgid
                LEFT JOIN tbl_asignatura_trabajo_entrega ate ON ate.astid = ast.astid AND ate.usuid = i_usuid
                LEFT JOIN tbl_asignatura_trabajo_calificacion atc ON atc.ateid = ate.ateid
                WHERE ast.astid = i_astid 
                    AND ae.usuid = i_usuid
                    AND ast.cecid = i_cecid;
                
          
            ELSEIF i_asttip = 'MA' OR i_asttip = 'EN' THEN
                INSERT INTO tbltemp_task_info (
                    usuid, 
                    tipo_trabajo, 
                    nombre_asignatura, 
                    nombre_trabajo, 
                    descripcion_trabajo,
                    nombre_profesor,
                    trabajo_recursos,
                    color_clase,
                    fecha_fin
                )
                SELECT 
                    i_usuid,
                    i_asttip,
                    asg.asgnom,
                    ast.astnomtrabajo, 
                    ast.astdesctrabajo,
                    COALESCE(usu.usunom, 'Profesor no asignado') AS nombre_profesor,
                    (
                        SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'nombre_recurso', atr.atrnomarc,
                                'url_recurso', atr.atrurl,
                                'tipo_recurso', atr.atrtiprec
                            )
                        )
                        FROM tbl_asignatura_trabajo_recurso atr
                        WHERE atr.astid = ast.astid
                    ) AS trabajo_recursos,
                    -- CAMBIO AQUÍ: Ahora devuelve solo el string del color
                    JSON_UNQUOTE(JSON_EXTRACT(ac.ascvis_config, '$.color')) AS color_clase,
                    DATE_FORMAT(ast.astfecfin, '%d/%m/%Y %H:%i') AS fecha_fin
                FROM tbl_asignatura_trabajo ast
                INNER JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
                INNER JOIN tbl_asignatura_curso ac ON asg.asgid = ac.asgid
                INNER JOIN tbl_asignatura_estudiante ae ON ae.asgid = asg.asgid
                LEFT JOIN tbl_usuario usu ON ast.usuid = usu.usuid  
                WHERE ast.astid = i_astid 
                    AND ae.usuid = i_usuid
                    AND ast.cecid = i_cecid;
            END IF;
        ELSE
            
            INSERT INTO tbltemp_task_info (usuid, mensaje)
            VALUES (i_usuid, CONCAT('No tienes acceso a la asignatura de este trabajo. ID de trabajo: ', i_astid));
        END IF;
    ELSE
    
        INSERT INTO tbltemp_task_info (usuid, mensaje)
        VALUES (i_usuid, CONCAT('ID de asignatura no válido o trabajo no encontrado: ', i_astid));
    END IF;
    
   -- SELECT * FROM tbltemp_task_info;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_student_next_classes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_student_next_classes`(
	IN i_usuid INT,
    IN i_cedid INT,
    IN i_cecid INT
)
BEGIN
    DECLARE i_hora_actual TIME;
    DECLARE i_dia_actual INT;
    DECLARE i_info_centro_educativo JSON;
	DECLARE i_ciclo_actual JSON;
    
    SET i_hora_actual = CURTIME();
    SET i_dia_actual = DAYOFWEEK(CURDATE());
    
    -- Limpiar variable
    SET @_student_next_classes = NULL;
       SELECT
		JSON_ARRAYAGG(
			JSON_OBJECT(
				'cedid', ced.cedid,
                'cedcod', ced.cedcod,
                'cednom', ced.cednom,
                'cedtip', ced.cedtip
            )
        ) INTO i_info_centro_educativo
	FROM tbl_centro_educativo ced
    INNER JOIN tbl_usuario usu ON ced.cedid = usu.cedid
    WHERE ced.cedid = i_cedid
    AND usu.usuid = i_usuid;
      SET @_current_cycle_info = (
		SELECT
			JSON_OBJECT(
				'cecid', cecid,
                'cecod', cecod,
                'cecnom', cecnom,
                'cecfecini', cecfecini,
                'cecfecfin', cecfecfin
            )
		FROM tbl_centro_educativo_ciclo
        WHERE cecid = i_cecid
    );
    -- 1. Buscar clases de hoy que NO han pasado (hora > hora actual)
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'usuid', ase.usuid,
            'nombre_materia', a.asgnom,
            'hora_materia', DATE_FORMAT(ash.ashhora, '%H:%i'),
            'profesor_materia', COALESCE(usu.usunom, 'Profesor no asignado'),
            'aula_materia', COALESCE(ces.cesnom, 'Aula no asignada'),
            'color', COALESCE(ac.ascvis_config, '#FFFFFF'),
            'dia_semana', 
                CASE ash.ashdia
                    WHEN 1 THEN 'Domingo'
                    WHEN 2 THEN 'Lunes'
                    WHEN 3 THEN 'Martes'
                    WHEN 4 THEN 'Miércoles'
                    WHEN 5 THEN 'Jueves'
                    WHEN 6 THEN 'Viernes'
                    WHEN 7 THEN 'Sábado'
                END,
            'estado', 'próxima_clase',
            'fecha', 'hoy'
        )
    ) INTO @_student_next_classes
    FROM tbl_asignatura_horario ash
    INNER JOIN tbl_asignatura a ON ash.asgid = a.asgid
    INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = a.asgid
    LEFT JOIN tbl_asignatura_curso ac ON ac.asgid = a.asgid
    LEFT JOIN tbl_centro_educativo_salon ces ON a.cesid = ces.cesid
    LEFT JOIN tbl_usuario usu ON a.usuid = usu.usuid
    WHERE ase.usuid = i_usuid
        AND ash.ashdia = i_dia_actual
        AND ash.ashhora > i_hora_actual  -- Solo clases que NO han pasado
        AND a.cedid = i_cedid
    ORDER BY ash.ashhora ASC;
    
    -- 2. Si no hay más clases hoy, buscar días futuros
    IF @_student_next_classes IS NULL OR JSON_LENGTH(@_student_next_classes) = 0 THEN
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'usuid', ase.usuid,
                'nombre_materia', a.asgnom,
                'hora_materia', DATE_FORMAT(ash.ashhora, '%H:%i'),
                'profesor_materia', COALESCE(usu.usunom, 'Profesor no asignado'),
                'aula_materia', COALESCE(ces.cesnom, 'Aula no asignada'),
                'color', COALESCE(ac.ascvis_config, '#FFFFFF'),
                'dia_semana', 
                    CASE ash.ashdia
                        WHEN 1 THEN 'Domingo'
                        WHEN 2 THEN 'Lunes'
                        WHEN 3 THEN 'Martes'
                        WHEN 4 THEN 'Miércoles'
                        WHEN 5 THEN 'Jueves'
                        WHEN 6 THEN 'Viernes'
                        WHEN 7 THEN 'Sábado'
                    END,
                'estado', 'próximo_día',
                'fecha', 
                    CASE 
                        WHEN ash.ashdia = i_dia_actual + 1 OR (i_dia_actual = 7 AND ash.ashdia = 1) THEN 'mañana'
                        ELSE CONCAT('en ', (ash.ashdia - i_dia_actual + 7) % 7, ' días')
                    END
            )
        ) INTO @_student_next_classes
        FROM tbl_asignatura_horario ash
        INNER JOIN tbl_asignatura a ON ash.asgid = a.asgid
        INNER JOIN tbl_asignatura_estudiante ase ON ase.asgid = a.asgid
        LEFT JOIN tbl_asignatura_curso ac ON ac.asgid = a.asgid
        LEFT JOIN tbl_centro_educativo_salon ces ON a.cesid = ces.cesid
        LEFT JOIN tbl_usuario usu ON a.usuid = usu.usuid
        WHERE ase.usuid = i_usuid
            AND ash.ashdia > i_dia_actual
            AND a.cedid = i_cedid
        ORDER BY 
            CASE 
                WHEN ash.ashdia > i_dia_actual THEN ash.ashdia
                ELSE ash.ashdia + 7
            END ASC,
            ash.ashhora ASC
        LIMIT 5;
    END IF;
    
    -- 3. Si no hay clases hoy (futuras) ni en días futuros, retornar array vacío
    IF @_student_next_classes IS NULL OR JSON_LENGTH(@_student_next_classes) = 0 THEN
        SET @_student_next_classes = JSON_ARRAY();
    END IF;

 -- SELECT @_student_next_classes AS student_next_classes;
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

-- Dump completed on 2026-05-04 12:27:14
