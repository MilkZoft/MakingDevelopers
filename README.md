# MakingDevelopers

<a href="https://www.codejobs.biz" target="_blank" title="Codejobs">Codejobs</a> is developing Mastodone CMS with new technologies such as: Node, React, Redux, Handlebars, Gulp, HTML5, Stylus and more... and teaching how to do it.

You can see the videos that we have done so far and get involve in the project!

* Video 1: https://www.youtube.com/watch?v=gRgD7nCDNV8
* Video 2: https://www.youtube.com/watch?v=kF4iuiD4b4E
* Video 3: https://www.youtube.com/watch?v=Wp4JbYyar58
* Video 4: https://www.youtube.com/watch?v=67i3qIbEfrc
* Video 5: https://www.youtube.com/watch?v=UwSrWeGlV0w
* Video 6: https://www.youtube.com/watch?v=qN3IxtLjdAo
* Video 7: https://www.youtube.com/watch?v=SPSzXg1RfWM
* Video 8: https://www.youtube.com/watch?v=ekW8hvwRUWc
* Video 9: https://www.youtube.com/watch?v=PlzJzciQSY0
* Video 10: https://www.youtube.com/watch?v=zxeOYn1RIo0
* Video 11: https://www.youtube.com/watch?v=d0k49CseyfA
* Video 12: https://www.youtube.com/watch?v=8WxF3CjRf5k
* Video 13: https://www.youtube.com/watch?v=0gcqCDh0Mto
* Video 14: https://www.youtube.com/watch?v=XdITZWwxkt8
* Video 15: https://www.youtube.com/watch?v=jDDT9KBKy3A

Subscribe to <a href="https://www.youtube.com/codejobs?sub_confirmation=1" target="_blank" title="Codejobs Youtube Channel!">Codejobs Youtube Channel!</a>

## Setup Instructions

### Requirements

* Gulp (`npm install -g gulp`)
* MySQL/MariaDB (https://www.mysql.com/downloads/)
* Node.js 6.0+ (https://nodejs.org)
* Webpack (`npm install -g webpack webpack-dev-server`)
* Yarn (`npm install -g yarn`)

### Installation

* Clone the repository:

```
 git clone git@github.com:MilkZoft/MakingDevelopers.git
```

* Install the dependencies with yarn.

```
yarn
```

* Import the database to your MySQL ([http://localhost/phpmyadmin](http://localhost/phpmyadmin))

* Configure your MySQL Database connection parameters on `src/config/config.yml`

* Add to your hosts:

```
127.0.0.1 local.makingdevelopers.com
```

* Includes the proxy file to our vhost file (/private/etc/apache2/extra/httpd-vhosts.conf):

```
Include /Users/<Your Mac User>/<Your Path to the Project>/MakingDevelopers/001-MakingDevelopers-proxy.conf
```

* Restart Apache

```
sudo apachectl restart
```

* Start the application server

```
gulp
```

* Run the application at [http://local.makingdevelopers.com](http://local.makingdevelopers.com)

### Tasks

- `gulp` Start server in development mode (executes `start-dev` task)
- `gulp start` Start server in production mode
- `gulp analyze` Eslint validator
- `gulp content` Retrieves all the content translations
- `gulp test` Run unit tests
- `gulp vendor` Compiles and compress vendor js files (jquery, ckeditor, etc.) into vendor.js
- `gulp all` Compiles and compress js files into all.js

### Libraries Used

- [babeljs](https://babeljs.io/)
- [bluebird](https://github.com/petkaantonov/bluebird)
- [eslint](http://eslint.org/)
- [express-js](http://expressjs.com/)
- [handlebars](handlebarsjs.com)
- [immutable-js](http://facebook.github.io/immutable-js)
- [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
- [jest](https://github.com/facebook/jest) 
- [mocha](https://mochajs.org) 
- [mysql](http://mysql.com)
- [nodemon](http://nodemon.io)
- [react-helmet](https://github.com/nfl/react-helmet)
- [react-router-redux](https://github.com/reactjs/react-router-redux)
- [react-router](https://github.com/rackt/react-router)
- [react](http://facebook.github.io/react/)
- [redux](http://rackt.github.io/redux/)
- [stylus](http://stylus-lang.com)
- [user-agent-is-browser](https://github.com/stuartpb/user-agent-is-browser)
- [useragent](https://github.com/3rd-Eden/useragent)
- [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools)
- [webpack](http://webpack.github.io/)
