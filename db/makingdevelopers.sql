DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS getContent $$
CREATE PROCEDURE `getContent` (IN `_language` VARCHAR(2))  BEGIN
  SELECT id, name, value, language, state FROM content
    WHERE language = _language AND state = 'Active'
    ORDER BY name;
END$$

DROP PROCEDURE IF EXISTS getAllContent $$
CREATE PROCEDURE `getAllContent` ()  BEGIN
  SELECT id, name, value, language, state FROM content
    WHERE state = 'Active'
    ORDER BY id;
END$$

DROP PROCEDURE IF EXISTS getUser $$
CREATE PROCEDURE `getUser` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40))  BEGIN
    IF _network = 'website' THEN
    SELECT id, username, email, avatar, privilege FROM users
    WHERE username = _username
      AND password = _password
      AND state = 'Active';
  ELSE
    SELECT id, networkId, network, username, email, avatar, privilege FROM users
    WHERE username = _username
      AND networkId = _networkId
      AND network = _network
      AND state = 'Active';
  END IF;
END$$

DROP PROCEDURE IF EXISTS getUserPrivilege $$
CREATE PROCEDURE `getUserPrivilege` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40))  BEGIN
    IF _network = 'website' THEN
    SELECT privilege FROM users
    WHERE username = _username
      AND password = _password
      AND state = 'Active';
  ELSE
    SELECT privilege FROM users
    WHERE username = _username
      AND networkId = _networkId
      AND network = _network
      AND state = 'Active';
  END IF;
END$$

DELIMITER ;

DROP TABLE IF EXISTS blog;
CREATE TABLE `blog` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text NOT NULL,
  `content` text NOT NULL,
  `codes` text NOT NULL,
  `tags` varchar(255) NOT NULL,
  `author` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `day` varchar(2) NOT NULL,
  `month` varchar(2) NOT NULL,
  `year` varchar(4) NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `activeComments` tinyint(1) NOT NULL DEFAULT '1',
  `state` varchar(25) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `slug`, `excerpt`, `content`, `codes`, `tags`, `author`, `createdAt`, `day`, `month`, `year`, `language`, `activeComments`, `state`) VALUES
(1, 'Test1', 'test1', '<p>sadasd</p>\r\n', '<p>asdsad</p>\r\n', '', 'php', 'MakDevTest', '2016-11-19 00:00:00', '19', '11', '2016', 'en', 1, 'Inactive'),
(2, 'Test2', 'test2', '<p>asdasd</p>\r\n', '<p>asdasd</p>\r\n', '', '', 'MakDevTest', '2016-11-22 00:00:00', '22', '11', '2016', 'en', 1, 'Inactive'),
(3, 'Test3', 'test3', '<p>asdsad</p>\r\n', '<p>asdsadasd</p>\r\n', '', '', 'MakDevTest', '2016-11-22 00:00:00', '22', '11', '2016', 'en', 1, 'Inactive'),
(4, 'Prueba1', 'prueba1', '<p>asdsad</p>\r\n', '<p>asdasd</p>\r\n', '', '', 'MakDevTest', '2016-11-22 00:00:00', '22', '11', '2016', 'es', 1, 'Active'),
(5, 'Test4', 'test4', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(6, 'Test5', 'test5', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(7, 'Test6', 'test6', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(8, 'Test7', 'test7', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(10, 'Test9', 'test9', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(11, 'Test10', 'test10', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(12, 'Test11', 'test11', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(13, 'Test12', 'test12', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(14, 'Test13', 'test13', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(15, 'Test14', 'test14', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(16, 'Test15', 'test15', '<p>Test</p>\r\n', '<p>Test</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(17, 'Test16', 'test16', '<p>Test16</p>\r\n', '<p>Test16</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(18, 'Test17', 'test17', '<p>Test17</p>\r\n', '<p>Test17</p>\r\n', '', '', 'MakDevTest', '2016-11-29 00:00:00', '29', '11', '2016', 'en', 1, 'Active'),
(19, 'Test19', 'test19', '<p>dsfdsf</p>\r\n', '<p>sdfdsf</p>\r\n', '', '', 'MakDevTest', '2017-01-01 00:00:00', '01', '01', '2017', 'en', 1, 'Inactive');

DROP TABLE IF EXISTS configuration;
CREATE TABLE `configuration` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `theme` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `application` varchar(50) NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `languages` varchar(255) NOT NULL,
  `comments` tinyint(1) NOT NULL DEFAULT '1',
  `state` varchar(25) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `configuration`
--

INSERT INTO `configuration` (`id`, `title`, `theme`, `email`, `application`, `language`, `languages`, `comments`, `state`) VALUES
(1, 'MakingDevelopers', 'MakingDevelopers', 'carlos@milkzoft.com', 'blog', 'en', 'en, es', 1, 'Active');

DROP TABLE IF EXISTS pages;
CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(25) NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `state` varchar(25) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `network` varchar(25) NOT NULL DEFAULT 'twitter',
  `networkId` varchar(25) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(60) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `suscribed` tinyint(1) NOT NULL DEFAULT '0',
  `privilege` varchar(5) NOT NULL DEFAULT 'user',
  `state` varchar(25) NOT NULL DEFAULT 'Inactive',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `network`, `networkId`, `username`, `password`, `email`, `avatar`, `suscribed`, `privilege`, `state`) VALUES
(1, 'twitter', '757439206155182100', 'MakDevTest', '', 'makingdevtest@gmail.com', 'https://pbs.twimg.com/profile_images/603310588190658560/6jLlKtr1.png', 0, 'god', 'Active');
