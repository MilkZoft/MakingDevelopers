-- phpMyAdmin SQL Dump
-- version 4.6.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 27, 2016 at 08:47 PM
-- Server version: 5.7.12
-- PHP Version: 5.5.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `makingdevelopers`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `getContent` (IN `_language` VARCHAR(2))  BEGIN
  SELECT name, value FROM content
    WHERE language = _language
    ORDER BY name;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUser` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40))  BEGIN
    IF _network = 'website' THEN
    SELECT id, username, email, avatar, privilege FROM users
    WHERE username = _username
      AND password = _password
      AND state = 'active';
  ELSE
    SELECT id, networkId, network, username, email, avatar, privilege FROM users
    WHERE username = _username
      AND networkId = _networkId
      AND network = _network
      AND state = 'active';
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserPrivilege` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40))  BEGIN
    IF _network = 'website' THEN
    SELECT privilege FROM users
    WHERE username = _username
      AND password = _password
      AND state = 'active';
  ELSE
    SELECT privilege FROM users
    WHERE username = _username
      AND networkId = _networkId
      AND network = _network
      AND state = 'active';
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `savePost` (IN `_title` VARCHAR(255), IN `_slug` VARCHAR(255), IN `_excerpt` TEXT, IN `_content` TEXT, IN `_codes` TEXT, IN `_tags` VARCHAR(255), IN `_author` VARCHAR(50), IN `_createdAt` DATETIME, IN `_day` VARCHAR(2), IN `_month` VARCHAR(2), IN `_year` VARCHAR(2), IN `_language` VARCHAR(2), IN `_activeComments` INT, IN `_state` VARCHAR(25))  BEGIN
  DECLARE error VARCHAR(255);
  DECLARE success VARCHAR(255);

  IF (_title <> 'undefined' AND _title <> '') THEN
    IF (_slug <> 'undefined' AND _slug <> '') THEN
      IF (_excerpt <> 'undefined' AND _excerpt <> '') THEN
        IF (_content <> 'undefined' AND _content <> '') THEN
          IF (SELECT EXISTS (SELECT 1 FROM blog WHERE slug = _slug AND day = _day AND month = _month AND year = _year)) THEN
            SET error = 'exists:post';
            SELECT error;
          ELSE
            INSERT INTO blog (
              title,
              slug,
              excerpt,
              content,
              codes,
              tags,
              author,
              createdAt,
              day,
              month,
              year,
              language,
              activeComments,
              state
            ) VALUES (
              _title,
              _slug,
              _excerpt,
              _content,
              _codes,
              _tags,
              _author,
              _createdAt,
              _day,
              _month,
              _year,
              _language,
              _activeComments,
              _state
            );

            SET success = 'inserted:post';
            SELECT success;
          END IF;
        ELSE
          SET error = 'undefined:content';
          SELECT error;
        END IF;
      ELSE
        SET error = 'undefined:excerpt';
        SELECT error;
      END IF;
    ELSE
      SET error = 'undefined:slug';
      SELECT error;
    END IF;
  ELSE
    SET error = 'undefined:title';
    SELECT error;
  END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `saveUser` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40), IN `_email` VARCHAR(150), IN `_avatar` VARCHAR(255), IN `_suscribed` TINYINT(1))  BEGIN
  DECLARE error VARCHAR(255);
  DECLARE success VARCHAR(255);

    IF _network = 'website' THEN
    IF (_username <> 'undefined' AND _username <> '') THEN
      IF (_password <> 'undefined' AND _password <> '') THEN
        IF (_email <> 'undefined' AND _email <> '') THEN
          IF (_suscribed >= 0) THEN
            IF (SELECT EXISTS (SELECT 1 FROM users WHERE username = _username)) THEN
              SET error = 'exists:username';
              SELECT error;
            ELSE
              IF (SELECT EXISTS (SELECT 1 FROM users WHERE email = _email)) THEN
                SET error = 'exists:email';
                SELECT error;
              ELSE
                IF (SELECT EXISTS (SELECT 1 FROM users WHERE (networkId = _networkId) AND (network = _network))) THEN
                  SET error = 'exists:social:networkId';
                  SELECT error;
                ELSE
                  INSERT INTO users (
                    network,
                    username,
                    password,
                    email,
                    avatar,
                    subscribed
                  ) VALUES (
                    _network,
                    _username,
                    _password,
                    _email,
                    '/images/users/default.png',
                    _suscribed
                  );

                  SET success = 'inserted:website:user';
                  SELECT success;
                END IF;
              END IF;
            END IF;
          ELSE
            SET error = 'invalid:number:suscribed';
            SELECT error;
          END IF;
        ELSE
          SET error = 'invalid:email';
          SELECT error;
        END IF;
      ELSE
        SET error = 'undefined:password';
        SELECT error;
      END IF;
    ELSE
      SET error = 'undefined:username';
      SELECT error;
    END IF;
  ELSE
    IF (_username <> 'undefined' AND _username <> '') THEN
      IF (_networkId <> 'undefined' AND _networkId <> '') THEN
        IF (_email <> 'undefined' AND _email <> '') THEN
          IF (_avatar <> 'undefined' AND _avatar <> '') THEN
            IF (_suscribed >= 0) THEN
              IF (SELECT EXISTS (SELECT 1 FROM users WHERE username = _username)) THEN
                SET error = 'exists:username';
                SELECT error;
              ELSE
                IF (SELECT EXISTS (SELECT 1 FROM users WHERE email = _email)) THEN
                  SET error = 'exists:email';
                  SELECT error;
                ELSE
                  IF (SELECT EXISTS (SELECT 1 FROM users WHERE (networkId = _networkId) AND (network = _network))) THEN
                    SET error = 'exists:social:networkId';
                    SELECT error;
                  ELSE
                    INSERT INTO users (
                      networkId,
                      network,
                      username,
                      email,
                      avatar,
                      subscribed
                    ) VALUES (
                      _networkId,
                      _network,
                      _username,
                      _email,
                      _avatar,
                      _suscribed
                    );

                    SET success = 'inserted:social:username';
                    SELECT success;
                  END IF;
                END IF;
              END IF;
            ELSE
              SET error = 'invalid:number:subscribed';
              SELECT error;
            END IF;
          ELSE
            SET error = 'undefined:avatar';
            SELECT error;
          END IF;
        ELSE
          SET error = 'invalid:email';
          SELECT error;
        END IF;
      ELSE
        SET error = 'undefined:networkId';
        SELECT error;
      END IF;
    ELSE
      SET error = 'undefined:username';
      SELECT error;
    END IF;
  END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) UNSIGNED NOT NULL,
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
  `year` varchar(2) NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `activeComments` tinyint(1) NOT NULL DEFAULT '1',
  `state` varchar(25) NOT NULL DEFAULT 'draft'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `slug`, `excerpt`, `content`, `codes`, `tags`, `author`, `createdAt`, `day`, `month`, `year`, `language`, `activeComments`, `state`) VALUES
(1, 'Tet', 'tet', '<p>sdadad</p>\r\n', '<p>asdadad</p>\r\n', '', 'Hola', 'codejobs', '2016-02-27 00:52:58', '27', '2', '20', 'en', 0, 'draft');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `value` text NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `name`, `value`, `language`) VALUES
(1, 'Site.language', 'en', 'en'),
(2, 'Site.title', 'Coding1st - English', 'en'),
(3, 'Site.meta.abstract', 'Learn to code', 'en'),
(4, 'Site.meta.description', 'Learn to code', 'en'),
(5, 'Site.meta.keywords', 'HTML5, JavaScript, Node.js', 'en'),
(6, 'Site.language', 'es', 'es'),
(7, 'Site.title', 'Coding1st - Español', 'es'),
(8, 'Site.meta.abstract', 'Aprende a programar', 'es'),
(9, 'Site.meta.description', 'Aprende a programar', 'es'),
(10, 'Site.meta.keywords', 'HTML5, JavaScript, Node.js', 'es'),
(11, 'Dashboard.forms.fields.activeComments', 'Active Comments?', 'en'),
(12, 'Dashboard.forms.fields.author', 'Author', 'en'),
(13, 'Dashboard.forms.fields.codes', 'Codes', 'en'),
(14, 'Dashboard.forms.fields.content', 'Content', 'en'),
(15, 'Dashboard.forms.fields.excerpt', 'Excerpt', 'en'),
(16, 'Dashboard.forms.fields.language', 'Language', 'en'),
(17, 'Dashboard.forms.fields.publish', 'Publish', 'en'),
(18, 'Dashboard.forms.fields.selects.decision', 'yes:Yes|no:No', 'en'),
(19, 'Dashboard.forms.fields.selects.languages', 'en:English|es:Spanish', 'en'),
(20, 'Dashboard.forms.fields.selects.state', 'draft:Draft|published:Published', 'en'),
(21, 'Dashboard.forms.fields.slug', 'Friendly URL', 'en'),
(22, 'Dashboard.forms.fields.state', 'State', 'en'),
(23, 'Dashboard.forms.fields.tags', 'Tags', 'en'),
(24, 'Dashboard.forms.fields.title', 'Title', 'en'),
(25, 'Dashboard.modules.dashboard.name', 'Dashboard', 'en'),
(26, 'Dashboard.modules.ads.name', 'Ads', 'en'),
(27, 'Dashboard.modules.ads.action', 'Add new ad', 'en'),
(28, 'Dashboard.modules.blog.name', 'Blog', 'en'),
(29, 'Dashboard.modules.blog.action', 'Add new post', 'en'),
(30, 'Dashboard.modules.config.name', 'Configuration', 'en'),
(31, 'Dashboard.modules.feedback.name', 'Feedback', 'en'),
(32, 'Dashboard.modules.pages.name', 'Pages', 'en'),
(33, 'Dashboard.modules.pages.action', 'Add new Page', 'en'),
(34, 'Dashboard.modules.polls.name', 'Polls', 'en'),
(35, 'Dashboard.modules.polls.action', 'Add new Poll', 'en'),
(36, 'Dashboard.modules.users.name', 'Users', 'en'),
(37, 'Dashboard.modules.polls.action', 'Add new User', 'en'),
(38, 'Dashboard.modules.logout.name', 'Logout', 'en'),
(39, 'Users.register.success', 'Your account have been created correctly, enjoy our site!', 'en'),
(40, 'Users.register.fail', 'There was a problem trying to create your account, please try again.', 'en'),
(41, 'Db.errors.exists:username', 'The username already exists', 'en'),
(42, 'Db.errors.exists:email', 'The email is already registered', 'en'),
(43, 'Db.errors.exists:social:networkId', 'This social user already exists', 'en'),
(44, 'Db.errors.invalid:email', 'Invalid Email', 'en'),
(45, 'Db.errors.invalid:number:subscribed', 'Subscribed should be 1 or 0', 'en'),
(46, 'Db.errors.undefined:avatar', 'Avatar is undefined', 'en'),
(47, 'Db.errors.undefined:networkId', 'NetworkId is undefined', 'en'),
(48, 'Db.errors.undefined:username', 'Username is undefined', 'en'),
(49, 'Db.success.inserted:website:username', 'User created successfuly', 'en'),
(50, 'Db.success.inserted:social:username', 'Social User created successfuly', 'en'),
(51, 'Dashboard.forms.fields.activeComments', '¿Activar Comentarios?', 'es'),
(52, 'Dashboard.forms.fields.author', 'Autor', 'es'),
(53, 'Dashboard.forms.fields.codes', 'Códigos', 'es'),
(54, 'Dashboard.forms.fields.content', 'Contenido', 'es'),
(55, 'Dashboard.forms.fields.excerpt', 'Extracto', 'es'),
(56, 'Dashboard.forms.fields.language', 'Idioma', 'es'),
(57, 'Dashboard.forms.fields.publish', 'Publicar', 'es'),
(58, 'Dashboard.forms.fields.selects.decision', 'yes:Si|no:No', 'es'),
(59, 'Dashboard.forms.fields.selects.languages', 'en:Inglés|es:Español', 'es'),
(60, 'Dashboard.forms.fields.selects.state', 'draft:Borrador|published:Publicado', 'es'),
(61, 'Dashboard.forms.fields.slug', 'URL Amigable', 'es'),
(62, 'Dashboard.forms.fields.state', 'Estado', 'es'),
(63, 'Dashboard.forms.fields.tags', 'Etiquetas', 'es'),
(64, 'Dashboard.forms.fields.title', 'Título', 'es'),
(65, 'Dashboard.modules.ads.action', 'Agregar nuevo anuncio', 'es'),
(66, 'Dashboard.modules.ads.name', 'Anuncios', 'es'),
(67, 'Dashboard.modules.blog.action', 'Agregar nueva publicación', 'es'),
(68, 'Dashboard.modules.blog.name', 'Blog', 'es'),
(69, 'Dashboard.modules.config.name', 'Configuración', 'es'),
(70, 'Dashboard.modules.Dashboard.name', 'Dashboard', 'es'),
(71, 'Dashboard.modules.feedback.name', 'Contacto', 'es'),
(72, 'Dashboard.modules.logout.name', 'Desconectar', 'es'),
(73, 'Dashboard.modules.pages.action', 'Agregar nueva Página', 'es'),
(74, 'Dashboard.modules.pages.name', 'Páginas', 'es'),
(75, 'Dashboard.modules.polls.action', 'Agregar nueva Encuesta', 'es'),
(76, 'Dashboard.modules.polls.name', 'Encuestas', 'es'),
(77, 'Dashboard.modules.users.name', 'Usuarios', 'es'),
(78, 'Db.errors.exists:email', 'El correo electrónico ya está registrado', 'es'),
(79, 'Db.errors.exists:social:networkId', 'Este usuario social ya existe', 'es'),
(80, 'Db.errors.exists:username', 'El usuario ya existe', 'es'),
(81, 'Db.errors.invalid:email', 'Email Inválido', 'es'),
(82, 'Db.errors.invalid:number:subscribed', 'El campo Subscribed debe ser 1 o 0', 'es'),
(83, 'Db.errors.undefined:avatar', 'El avatar no esta definido', 'es'),
(84, 'Db.errors.undefined:networkId', 'El NetworkId no está definido', 'es'),
(85, 'Db.errors.undefined:username', 'El Usuario no está definido', 'es'),
(86, 'Db.success.inserted:social:username', 'Usuario social creado exitosamente', 'es'),
(87, 'Db.success.inserted:website:username', 'Usuario creado exitosamente', 'es'),
(88, 'Users.register.fail', 'Hubo un error al intentar crear tu cuenta, por favor intenta más tarde.', 'es'),
(89, 'Users.register.success', '¡Tu cuenta ha sido creada exitosamente, disfruta nuestro sitio!', 'es'),
(90, 'Dashboard.modules.blog.messages.success', 'The post was saved correctly', 'en'),
(91, 'Dashboard.modules.blog.messages.add.success', 'The post was created correctly', 'en'),
(92, 'Dashboard.modules.blog.messages.add.fail', 'There was a problem trying to create the post', 'en'),
(93, 'Dashboard.modules.blog.messages.add.success', 'La publicación fue creada exitosamente', 'es'),
(94, 'Dashboard.modules.blog.messages.add.fail', 'Hubo un problema al intentar crear la publicación', 'es'),
(95, 'Dashboard.modules.blog.messages.add.exists', 'The post already exists', 'en'),
(96, 'Dashboard.modules.blog.messages.add.exists', 'La publicación ya existe', 'es'),
(97, 'Dashboard.modules.blog.messages.add.empty', 'The field ${input} cannot be empty', 'en'),
(98, 'Dashboard.modules.blog.messages.add.empty', 'El campo ${input} no puede estar vacío', 'es'),
(99, 'Users.email.label', 'Email', 'en'),
(100, 'Users.email.label', 'Correo electrónico', 'es'),
(101, 'Users.subscribe', 'Subscribe', 'en'),
(102, 'Users.subscribe', 'Suscribirme', 'es'),
(103, 'Users.register.label', 'Register', 'en'),
(104, 'Users.register.label', 'Registrar', 'es'),
(105, 'Users.email.placeholder', 'email@example.com', 'en'),
(106, 'Users.email.placeholder', 'email@dominio.com', 'es'),
(107, 'Users.hello', 'Hello', 'en'),
(108, 'Users.hello', 'Hola', 'es');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `network` varchar(25) NOT NULL DEFAULT 'twitter',
  `networkId` varchar(25) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(40) NOT NULL,
  `email` varchar(60) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `suscribed` tinyint(1) NOT NULL DEFAULT '0',
  `privilege` varchar(5) NOT NULL DEFAULT 'user',
  `state` varchar(25) NOT NULL DEFAULT 'inactive'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;