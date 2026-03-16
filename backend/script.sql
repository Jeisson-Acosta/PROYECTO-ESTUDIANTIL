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
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario para saber que profesor dirige la clase.',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo para saber la asignatura a que centro educativo pertenece.',
  `cesid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_salon]: Id del salon del centro educativo, para saber en que salón se dicta la materia.',
  PRIMARY KEY (`asgid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura`
--

LOCK TABLES `tbl_asignatura` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura` DISABLE KEYS */;
INSERT INTO `tbl_asignatura` VALUES (1,'Ciencias','CIEN','XRTY09',2,1,1),(2,'Matematicas','MATE','CRTY78',3,1,2),(3,'Física','FISI','MJUY89',3,1,2),(4,'Educacion Fisica','EDUC','MLOK78',2,1,1),(5,'Tecnologia','TECN','TREY78',3,1,1);
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
  PRIMARY KEY (`asiid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_asistencia`
--

LOCK TABLES `tbl_asignatura_asistencia` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_asistencia` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_asistencia` VALUES (1,'P',NULL,'2026-02-22',2026,1,1),(2,'A','No vino','2026-02-22',2026,1,2);
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
  PRIMARY KEY (`ateid`)
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
  PRIMARY KEY (`accid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_calificacion_ciclo`
--

LOCK TABLES `tbl_asignatura_calificacion_ciclo` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_calificacion_ciclo` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_calificacion_ciclo` VALUES (1,4,'excelente','2026-03-04 04:13:03',1,1,12),(2,4,'excelente','2026-03-04 04:13:17',2,1,12);
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
  `cecid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_curso]: Id del curso del centro educativo a la que pertenece la asignatura.',
  `asgid` int DEFAULT NULL COMMENT '[tbl_asignatura]: Id de la asignatura a la que pertenece la configuración.',
  PRIMARY KEY (`ascid`)
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
  PRIMARY KEY (`aseid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_estudiante`
--

LOCK TABLES `tbl_asignatura_estudiante` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_estudiante` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_estudiante` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5);
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
  PRIMARY KEY (`ashid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_horario`
--

LOCK TABLES `tbl_asignatura_horario` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_horario` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_horario` VALUES (1,1,'10:00:00',1),(2,1,'11:00:00',2);
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
  `asttip` enum('TA','MA','EN') DEFAULT NULL COMMENT 'Tipo de trabajo: (TA)rea, (MA)terial, (EN)unciado',
  `cecid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_ciclo]: Id del ciclo al que pertenece el trabajo.',
  `ascid` int DEFAULT NULL COMMENT '[tbl_asignatura_curso]: Id del curso a la que pertenece el trabajo.',
  `usuid` int DEFAULT NULL COMMENT '[tbl_usuario]: Id del usuario quien creo el trabajo. (Acá sería el id del profesor)',
  `asgid` int DEFAULT NULL COMMENT '[tbl_asignatura]: Id de la asignatura a la cual pertenece el trabajo.',
  PRIMARY KEY (`astid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo`
--

LOCK TABLES `tbl_asignatura_trabajo` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_trabajo` VALUES (1,'Resolver multiplicaciones','Resolver las multiplicaciones que se jaron en clase.','2026-02-20 00:00:00','2026-03-08 13:40:00',NULL,'TA',1,1,2,1),(2,'Test trabajo','Test de trabajo','2026-02-20 00:00:00','2026-03-10 23:59:00',NULL,'TA',1,1,2,1),(3,'Trabajo 1 Matematicas','Trabajo 1 de prueba','2026-02-20 00:00:00','2026-03-10 22:48:00',NULL,'TA',1,1,2,2),(4,'Trabajo 1 Física','Trabajo 1 de prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,'TA',1,1,2,3),(5,'Trabajo 1 Educación Física','Trabajo 1 Educación Física prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,'TA',1,1,2,4),(6,'Trabajo 1 Tecnologia','Trabajo 1 Tecnologia prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,'TA',1,1,2,5),(7,'Trabajo 2 Física','Trabajo 2 Física Prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,'TA',1,1,2,3),(8,'Trabajo 3 física','Trabajo 3 física','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,'TA',1,1,2,3),(9,'Trabajo 2 matematicas','Trabajo 2 matematicas Prueba','2026-02-20 00:00:00','2026-03-14 12:40:00',NULL,'TA',1,1,2,3);
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
  PRIMARY KEY (`atcid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo_calificacion`
--

LOCK TABLES `tbl_asignatura_trabajo_calificacion` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_calificacion` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_trabajo_calificacion` VALUES (1,4.0,'Bien','2026-03-06 05:00:00',2),(2,2.9,'Mal','2026-03-06 05:00:00',3),(3,5.0,'Super','2026-03-06 05:00:00',4),(4,4.6,'Super','2026-03-06 05:00:00',5),(5,3.8,'Mas o menos','2026-03-06 05:00:00',6),(6,4.8,'Super','2026-03-06 05:00:00',7),(7,5.0,'Super','2026-03-06 05:00:00',8),(8,3.2,'Mmmm','2026-03-06 05:00:00',9);
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
  PRIMARY KEY (`ateid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_asignatura_trabajo_entrega`
--

LOCK TABLES `tbl_asignatura_trabajo_entrega` WRITE;
/*!40000 ALTER TABLE `tbl_asignatura_trabajo_entrega` DISABLE KEYS */;
INSERT INTO `tbl_asignatura_trabajo_entrega` VALUES (1,NULL,NULL,'P',1,1),(2,'2026-03-13 00:00:00',NULL,'P',1,2),(3,'2026-03-06 00:00:00',NULL,'C',1,3),(4,'2026-03-06 00:00:00',NULL,'P',1,4),(5,'2026-03-06 00:00:00',NULL,'P',1,5),(6,'2026-03-06 00:00:00',NULL,'C',1,6),(7,'2026-03-06 00:00:00',NULL,'C',1,7),(8,'2026-03-06 00:00:00',NULL,'C',1,8),(9,'2026-03-06 00:00:00',NULL,'C',1,9);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo_ciclo`
--

LOCK TABLES `tbl_centro_educativo_ciclo` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo_ciclo` DISABLE KEYS */;
INSERT INTO `tbl_centro_educativo_ciclo` VALUES (1,'PP1','Primer Perdiodo',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_centro_educativo_curso`
--

LOCK TABLES `tbl_centro_educativo_curso` WRITE;
/*!40000 ALTER TABLE `tbl_centro_educativo_curso` DISABLE KEYS */;
INSERT INTO `tbl_centro_educativo_curso` VALUES (1,'SEX','Sexto',1,2),(2,'SEP','Septimo',1,3);
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
  `cesnum` varchar(10) DEFAULT NULL COMMENT 'Número del salón.',
  `cedid` int DEFAULT NULL COMMENT '[tbl_centro_educativo]: Id del centro educativo al que pertenece el salón.',
  PRIMARY KEY (`cesid`)
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
  PRIMARY KEY (`escid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_estudiante_curso`
--

LOCK TABLES `tbl_estudiante_curso` WRITE;
/*!40000 ALTER TABLE `tbl_estudiante_curso` DISABLE KEYS */;
INSERT INTO `tbl_estudiante_curso` VALUES (1,2026,1,1);
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
  PRIMARY KEY (`rcvid`)
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
  `ceeid` int DEFAULT NULL COMMENT '[tbl_centro_educativo_estudiante]: Id del centro educativo al cual pertenece el usuario en caso de que este registrado el estudiante en un centro educativo.',
  `tidid` int DEFAULT NULL COMMENT '[tbl_tipo_documento]: Id del tipo de documento.',
  `rolid` int DEFAULT NULL COMMENT '[tbl_rol]: Id del rol que tiene el usuario.',
  PRIMARY KEY (`usuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuario`
--

LOCK TABLES `tbl_usuario` WRITE;
/*!40000 ALTER TABLE `tbl_usuario` DISABLE KEYS */;
INSERT INTO `tbl_usuario` VALUES (1,'Pepito Perez','pepito@gmail.com','$2b$10$Fl8ZbDqgLgmx6A15KQJ5A.wj8oW4LdwCPXH1cZwiXp0TXoOo7J8i6','1014477770','3107400954','2026-02-25',1,1,1),(2,'Jeisson Acosta','jeisson@gmail.com','$2b$10$Fl8ZbDqgLgmx6A15KQJ5A.wj8oW4LdwCPXH1cZwiXp0TXoOo7J8i6','1014477770','3107400954','2004-12-20',1,1,2);
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
    AND tbl_asignatura_curso.cecid = i_cecid
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
	AND ast.ascid = @_curso_id
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
    AND ast.ascid = @_curso_id
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
    AND ast.ascid = @_curso_id
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
    IN i_usuid INT
)
BEGIN
    DECLARE i_curso_id INT;
    DECLARE i_posicion INT;
    DECLARE i_total_estudiantes INT;
    DECLARE i_promedio DECIMAL(10,1);
    
    SELECT DISTINCT ac.edcid INTO i_curso_id
    FROM tbl_asignatura_estudiante ase
    INNER JOIN tbl_asignatura_curso ac ON ase.asgid = ac.asgid
    WHERE ase.usuid = i_usuid
    LIMIT 1;
    
    SELECT ROUND(AVG(acccalificacion), 1) INTO i_promedio
    FROM tbl_asignatura_calificacion_ciclo 
    WHERE usuid = i_usuid;
    
    SELECT COUNT(*) + 1 INTO i_posicion
    FROM (
        SELECT 
            ase2.usuid,
            AVG(acc2.acccalificacion) AS promedio
        FROM tbl_asignatura_estudiante ase2
        INNER JOIN tbl_asignatura_curso ac2 ON ase2.asgid = ac2.asgid
        INNER JOIN tbl_asignatura_calificacion_ciclo acc2 ON ase2.usuid = acc2.usuid
        WHERE ac2.edcid = i_curso_id
        GROUP BY ase2.usuid
        HAVING AVG(acc2.acccalificacion) > i_promedio
    ) AS mejores;
    
    SELECT COUNT(DISTINCT ase3.usuid) INTO i_total_estudiantes
    FROM tbl_asignatura_estudiante ase3
    INNER JOIN tbl_asignatura_curso ac3 ON ase3.asgid = ac3.asgid
    WHERE ac3.edcid = i_curso_id;
    DROP TABLE IF EXISTS tbltmp_student_course_rank;
    CREATE TEMPORARY TABLE tbltmp_student_course_rank AS (
    SELECT 
        i_usuid AS usuid,
        i_curso_id AS curso_id,
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
    IN i_usuid INT
)
BEGIN
    DECLARE i_total_materias INT;
    DECLARE i_suma_notas DECIMAL(10,2);
    DECLARE i_promedio VARCHAR(20);  
    DECLARE i_total_trabajos INT;
    DECLARE i_trabajos_realizados INT;
    DECLARE i_progreso_estudiante INT;
    DECLARE i_total_inasistencias INT;  

    SELECT COUNT(DISTINCT asgid) INTO i_total_materias
    FROM tbl_asignatura_estudiante
    WHERE usuid = i_usuid;
    
    SELECT SUM(acccalificacion) INTO i_suma_notas
    FROM tbl_asignatura_calificacion_ciclo 
    WHERE usuid = i_usuid;
    
    SELECT COUNT(DISTINCT ast.astid) INTO i_total_trabajos
    FROM tbl_asignatura_estudiante ase
INNER JOIN tbl_asignatura_curso ac ON ase.asgid = ac.asgid  
INNER JOIN tbl_asignatura_trabajo ast ON ac.ascid = ast.ascid  
WHERE ase.usuid = i_usuid;
    
    SELECT COUNT(DISTINCT ate.ateid) INTO i_trabajos_realizados
    FROM tbl_asignatura_trabajo_entrega ate
    INNER JOIN tbl_usuario usu ON ate.usuid =usu.usuid
    WHERE  ate.ateestado = 'E' AND ate.usuid =i_usuid; 
    
    IF i_total_trabajos > 0 THEN 
        SET i_progreso_estudiante = ROUND((i_trabajos_realizados * 100) / i_total_trabajos);
    ELSE
        SET i_progreso_estudiante = 0;
    END IF; 
    
    IF i_total_materias > 0 AND i_suma_notas IS NOT NULL THEN 
        SET i_promedio = ROUND(i_suma_notas / i_total_materias, 2);
    ELSE
        SET i_promedio = 'Sin Promedio';
    END IF;
    
    SELECT COUNT(DISTINCT aa.asiid) INTO i_total_inasistencias
    FROM tbl_asignatura_estudiante ae
    LEFT JOIN tbl_asignatura_asistencia aa ON ae.usuid = aa.usuid AND aa.asiestado = 'A'
    WHERE ae.usuid = i_usuid;
    
    DROP TABLE IF EXISTS tbltmp_general_information;
    CREATE TEMPORARY TABLE tbltmp_general_information AS (
		SELECT 
			i_usuid AS usuid,
			i_total_materias AS total_materias,
			i_promedio AS promedio,
			i_progreso_estudiante AS progreso_estudiante,
			i_total_inasistencias AS total_inasistencias
	); 
    
	-- SELECT * FROM tbltmp_general_information;
    
    -- DROP TABLE IF EXISTS tbltmp_general_information;
    
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
    AND tbl_asignatura_curso.cecid = i_cecid
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
    JOIN tbl_asignatura_curso ON ast.ascid = tbl_asignatura_curso.ascid
    JOIN tbl_asignatura asg ON ast.asgid = asg.asgid
    JOIN tbl_asignatura_trabajo_entrega ate ON ast.astid = ate.astid
    LEFT JOIN tbl_asignatura_trabajo_calificacion atc ON ate.ateid = atc.ateid
    WHERE ast.cecid = i_cecid
    AND tbl_asignatura_curso.asgid = @_asgid
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-15  1:54:12
