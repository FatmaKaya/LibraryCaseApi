-- --------------------------------------------------------
-- Sunucu:                       localhost
-- Sunucu sürümü:                5.7.24 - MySQL Community Server (GPL)
-- Sunucu İşletim Sistemi:       Win64
-- HeidiSQL Sürüm:               10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- librarycase için veritabanı yapısı dökülüyor
CREATE DATABASE IF NOT EXISTS `librarycase` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `librarycase`;

-- tablo yapısı dökülüyor librarycase.book
CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- librarycase.book: ~5 rows (yaklaşık) tablosu için veriler indiriliyor
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` (`id`, `name`) VALUES
	(1, 'The Hitchhiker\'s Guide to the Galaxy');
INSERT INTO `book` (`id`, `name`) VALUES
	(2, 'I, Robot');
INSERT INTO `book` (`id`, `name`) VALUES
	(3, 'Dune');
INSERT INTO `book` (`id`, `name`) VALUES
	(4, '1984');
INSERT INTO `book` (`id`, `name`) VALUES
	(5, 'Brave New World');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;

-- tablo yapısı dökülüyor librarycase.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- librarycase.user: ~4 rows (yaklaşık) tablosu için veriler indiriliyor
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `name`) VALUES
	(1, 'Eray Aslan');
INSERT INTO `user` (`id`, `name`) VALUES
	(2, 'Enes Faruk Meniz');
INSERT INTO `user` (`id`, `name`) VALUES
	(3, 'Sefa Eren Şahin');
INSERT INTO `user` (`id`, `name`) VALUES
	(4, 'Kadir Mutlu');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- tablo yapısı dökülüyor librarycase.user_book
CREATE TABLE IF NOT EXISTS `user_book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  PRIMARY KEY (`id`,`userId`,`bookId`),
  KEY `FK_ab47037d446ad35a3437ad77170` (`userId`),
  KEY `FK_82b430d61bfdb4e840329b48170` (`bookId`),
  CONSTRAINT `FK_82b430d61bfdb4e840329b48170` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_ab47037d446ad35a3437ad77170` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- librarycase.user_book: ~0 rows (yaklaşık) tablosu için veriler indiriliyor
/*!40000 ALTER TABLE `user_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_book` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
