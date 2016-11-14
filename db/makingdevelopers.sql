--
-- Database: `makingdevelopers`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS getContent $$
CREATE PROCEDURE `getContent` (IN `_language` VARCHAR(2))  BEGIN
  SELECT name, value FROM content
    WHERE language = _language
    ORDER BY name;
END$$

DROP PROCEDURE IF EXISTS getUser $$
CREATE PROCEDURE `getUser` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40))  BEGIN
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

DROP PROCEDURE IF EXISTS getUserPrivilege $$
CREATE PROCEDURE `getUserPrivilege` (IN `_network` VARCHAR(25), IN `_networkId` VARCHAR(25), IN `_username` VARCHAR(20), IN `_password` VARCHAR(40))  BEGIN
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
  `year` varchar(4) NOT NULL,
  `language` varchar(2) NOT NULL DEFAULT 'en',
  `activeComments` tinyint(1) NOT NULL DEFAULT '1',
  `state` varchar(25) NOT NULL DEFAULT 'draft'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `slug`, `excerpt`, `content`, `codes`, `tags`, `author`, `createdAt`, `day`, `month`, `year`, `language`, `activeComments`, `state`) VALUES
(1, 'Test1', 'test1', '<p>Test1</p>\r\n', '<p>asdadad</p>\r\n\r\n<p>[Ad:336x280]</p>\r\n\r\n<p>{{script.js}}</p>\r\n', '---js:script.js\r\nalert(1);\r\n\r\n---\r\n\r\n', 'Hola2', 'codejobs', '2016-02-27 00:52:58', '27', '2', '20', 'es', 1, 'published');

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
(2, 'Site.title', 'MakingDevelopers', 'en'),
(3, 'Site.meta.abstract', 'Learn to code', 'en'),
(4, 'Site.meta.description', 'Learn to code', 'en'),
(5, 'Site.meta.keywords', 'HTML5, JavaScript, Node.js', 'en'),
(6, 'Site.language', 'es', 'es'),
(7, 'Site.title', 'MakingDevelopers', 'es'),
(8, 'Site.meta.abstract', 'Aprende a programar', 'es'),
(9, 'Site.meta.description', 'Aprende a programar', 'es'),
(10, 'Site.meta.keywords', 'HTML5, JavaScript, Node.js', 'es'),
(11, 'Dashboard.forms.fields.activeComments', 'Active Comments?', 'en'),
(12, 'Dashboard.forms.fields.author', 'Author', 'en'),
(13, 'Dashboard.forms.fields.codes', 'Codes', 'en'),
(14, 'Dashboard.forms.fields.content', 'Content', 'en'),
(15, 'Dashboard.forms.fields.excerpt', 'Excerpt', 'en'),
(16, 'Dashboard.forms.fields.language', 'Language', 'en'),
(17, 'Dashboard.forms.fields.save', 'Save', 'en'),
(18, 'Dashboard.forms.fields.selects.decision', '1:Yes|0:No', 'en'),
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
(57, 'Dashboard.forms.fields.save', 'Guardar', 'es'),
(58, 'Dashboard.forms.fields.selects.decision', '1:Si|0:No', 'es'),
(59, 'Dashboard.forms.fields.selects.languages', 'en:Inglés|es:Español', 'es'),
(60, 'Dashboard.forms.fields.selects.state', 'active:Activo|inactive:Inactivo', 'es'),
(61, 'Dashboard.forms.fields.slug', 'URL Amigable', 'es'),
(62, 'Dashboard.forms.fields.state', 'Estado', 'es'),
(63, 'Dashboard.forms.fields.tags', 'Etiquetas', 'es'),
(64, 'Dashboard.forms.fields.title', 'Título', 'es'),
(65, 'Dashboard.modules.ads.action', 'Agregar nuevo anuncio', 'es'),
(66, 'Dashboard.modules.ads.name', 'Anuncios', 'es'),
(67, 'Dashboard.modules.blog.action', 'Agregar nueva publicación', 'es'),
(68, 'Dashboard.modules.blog.name', 'Blog', 'es'),
(69, 'Dashboard.modules.config.name', 'Configuración', 'es'),
(70, 'Dashboard.modules.dashboard.name', 'Dashboard', 'es'),
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
(108, 'Users.hello', 'Hola', 'es'),
(109, 'Home.welcome', 'Welcome', 'en'),
(110, 'Home.welcome', 'Bienvenidos', 'es'),
(111, 'Site.errors.error404', 'Error 404: Página no encontrada', 'es'),
(112, 'Site.errors.error404', 'Error 404: Page Not Found', 'en'),
(113, 'Dashboard.forms.fields.error.title', 'You need to write a title', 'en'),
(114, 'Dashboard.forms.fields.error.title', 'Necesitas escribir un título', 'es'),
(115, 'Dashboard.forms.fields.error.slug', 'The friendly url is missing', 'en'),
(116, 'Dashboard.forms.fields.error.slug', 'La URL amigable es obligatoria', 'es'),
(117, 'Dashboard.forms.fields.error.excerpt', 'The excerpt is missing', 'en'),
(118, 'Dashboard.forms.fields.error.excerpt', 'El abstracto es obligatorio', 'es'),
(119, 'Dashboard.forms.fields.error.content', 'Write some content for the post', 'en'),
(120, 'Dashboard.forms.fields.error.content', 'Escribe algún contenido para la publicación', 'es'),
(121, 'Dashboard.forms.fields.error.author', 'Who is writing this post?', 'en'),
(122, 'Dashboard.forms.fields.error.author', '¿Quién está escribiendo esta publicación?', 'es'),
(123, 'Dashboard.table.action', 'Action', 'en'),
(124, 'Dashboard.table.action', 'Acción', 'es'),
(125, 'Dashboard.table.title', 'Title', 'en'),
(126, 'Dashboard.table.title', 'Título', 'es'),
(127, 'Dashboard.table.author', 'Author', 'en'),
(128, 'Dashboard.table.author', 'Autor', 'es'),
(129, 'Dashboard.table.state', 'State', 'en'),
(130, 'Dashboard.table.state', 'Estado', 'es'),
(131, 'Dashboard.table.id', 'ID', 'en'),
(132, 'Dashboard.table.id', 'ID', 'es'),
(133, 'Dashboard.table.pending', 'Pending', 'en'),
(134, 'Dashboard.table.pending', 'Pendiente', 'es'),
(135, 'Dashboard.table.deleted', 'Deleted', 'en'),
(136, 'Dashboard.table.deleted', 'Eliminado', 'es'),
(137, 'Dashboard.table.draft', 'Draft', 'en'),
(138, 'Dashboard.table.draft', 'Borrador', 'es'),
(139, 'Dashboard.table.published', 'Published', 'en'),
(140, 'Dashboard.table.published', 'Publicado', 'es'),
(141, 'Dashboard.modules.blog.list', 'List of Posts', 'en'),
(142, 'Dashboard.modules.blog.list', 'Lista de Publicaciones', 'es'),
(143, 'Dashboard.modules.blog.createNewPost', 'Create New Post', 'en'),
(144, 'Dashboard.modules.blog.createNewPost', 'Crear Nueva Publicación', 'es'),
(145, 'Dashboard.table.edit', 'Edit', 'en'),
(146, 'Dashboard.table.edit', 'Editar', 'es'),
(147, 'Dashboard.table.delete', 'Delete', 'en'),
(148, 'Dashboard.table.delete', 'Eliminar', 'es'),
(149, 'Dashboard.table.restore', 'Restore', 'en'),
(150, 'Dashboard.table.restore', 'Restaurar', 'es'),
(151, 'Dashboard.modules.blog.messages.update.fail', 'There was a problem trying to update the post', 'en'),
(152, 'Dashboard.modules.blog.messages.update.fail', 'Hubo un problema al intentar actualizar la publicación', 'es'),
(153, 'Dashboard.modules.blog.messages.update.success', 'The post was updated correctly', 'en'),
(154, 'Dashboard.modules.blog.messages.update.success', 'La publicación fue actualizada correctamente', 'es'),
(155, 'Dashboard.forms.fields.edit', 'Edit', 'en'),
(156, 'Dashboard.forms.fields.edit', 'Editar', 'es'),
(157, 'Dashboard.table.noData', 'No Data Found', 'en'),
(158, 'Dashboard.table.noData', 'No hay elementos para mostrar', 'es'),
(159, 'Dashboard.search.searching', 'Searching', 'en'),
(160, 'Dashboard.search.searching', 'Buscando', 'es'),
(161, 'Dashboard.search.label', 'Search', 'en'),
(162, 'Dashboard.search.label', 'Buscar', 'es'),
(163, 'Dashboard.search.placeholder', 'Type your search...', 'en'),
(164, 'Dashboard.search.placeholder', 'Escribe tu búsqueda...', 'es'),
(165, 'Dashboard.table.remove', 'Remove', 'en'),
(166, 'Dashboard.table.remove', 'Remover', 'es'),
(167, 'Dashboard.table.actions.delete.question', 'Do you want to send these records to the trash?', 'en'),
(168, 'Dashboard.table.actions.delete.question', '¿Deseas enviar estos registros a la papelera?', 'es'),
(169, 'Dashboard.table.actions.remove.question', 'Do you want to remove permanently these records?', 'en'),
(170, 'Dashboard.table.actions.remove.question', '¿Deseas eliminar permanentemente estos registros?', 'es'),
(171, 'Dashboard.table.actions.restore.question', 'Do you want to restore these records?', 'en'),
(172, 'Dashboard.table.actions.restore.question', '¿Deseas recuperar estos registros?', 'es');

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
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `network`, `networkId`, `username`, `password`, `email`, `avatar`, `suscribed`, `privilege`, `state`) VALUES
(1, 'twitter', '757439206155182100', 'MakDevTest', '', 'makingdevtest@gmail.com', 'https://pbs.twimg.com/profile_images/603310588190658560/6jLlKtr1.png', 0, 'god', 'active');

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
