-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.30 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour nextluk_db
CREATE DATABASE IF NOT EXISTS `nextluk_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nextluk_db`;

-- Listage de la structure de table nextluk_db. appointment
CREATE TABLE IF NOT EXISTS `appointment` (
  `appointmentId` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `clientId` int DEFAULT NULL,
  `hairdresserId` int DEFAULT NULL,
  `salonId` int DEFAULT NULL,
  `isPaid` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`appointmentId`),
  KEY `clientId` (`clientId`),
  KEY `hairdresserId` (`hairdresserId`),
  KEY `salonId` (`salonId`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `user` (`userId`),
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`hairdresserId`) REFERENCES `hairdresser` (`userId`),
  CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`salonId`) REFERENCES `salon` (`salonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table nextluk_db.appointment : ~0 rows (environ)
DELETE FROM `appointment`;

-- Listage de la structure de table nextluk_db. client_hairstyle
CREATE TABLE IF NOT EXISTS `client_hairstyle` (
  `userId` int NOT NULL,
  `hairstyleId` int NOT NULL,
  PRIMARY KEY (`userId`,`hairstyleId`),
  KEY `hairstyleId` (`hairstyleId`),
  CONSTRAINT `client_hairstyle_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `client_hairstyle_ibfk_2` FOREIGN KEY (`hairstyleId`) REFERENCES `hairstyle` (`hairstyleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table nextluk_db.client_hairstyle : ~0 rows (environ)
DELETE FROM `client_hairstyle`;

-- Listage de la structure de table nextluk_db. hairdresser
CREATE TABLE IF NOT EXISTS `hairdresser` (
  `userId` int NOT NULL,
  `salonId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `salonId` (`salonId`),
  CONSTRAINT `hairdresser_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `hairdresser_ibfk_2` FOREIGN KEY (`salonId`) REFERENCES `salon` (`salonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table nextluk_db.hairdresser : ~0 rows (environ)
DELETE FROM `hairdresser`;

-- Listage de la structure de table nextluk_db. hairstyle
CREATE TABLE IF NOT EXISTS `hairstyle` (
  `hairstyleId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `previewImage` blob,
  PRIMARY KEY (`hairstyleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table nextluk_db.hairstyle : ~0 rows (environ)
DELETE FROM `hairstyle`;

-- Listage de la structure de table nextluk_db. payment
CREATE TABLE IF NOT EXISTS `payment` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `appointmentId` int DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `paymentMethod` varchar(50) NOT NULL,
  PRIMARY KEY (`paymentId`),
  KEY `appointmentId` (`appointmentId`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`appointmentId`) REFERENCES `appointment` (`appointmentId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table nextluk_db.payment : ~0 rows (environ)
DELETE FROM `payment`;

-- Listage de la structure de table nextluk_db. salon
CREATE TABLE IF NOT EXISTS `salon` (
  `salonId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  PRIMARY KEY (`salonId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table nextluk_db.salon : ~0 rows (environ)
DELETE FROM `salon`;

-- Listage de la structure de table nextluk_db. user
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userType` enum('Client','Hairdresser','Admin') NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table nextluk_db.user : ~0 rows (environ)
DELETE FROM `user`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
