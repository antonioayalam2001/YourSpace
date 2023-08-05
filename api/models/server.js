const express = require('express');
const cors = require('cors');
// const rateLimit = require('express-rate-limit');
const cookieparser = require('cookie-parser');
// const session = require('express-session')
const bodyparser = require('body-parser')
// const fileUpload = require('express-fileupload')
const { dbConnection, mysqlDB } = require("../database/config");
const multer = require('multer');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT || 3000;
        this.paths = {
            authPath: '/api/auth',
            postsPath: '/api/posts',
        }
        //DB connection
        this.dbConnection()
        //Middlewares
        //    Aquellos que se ejecutan siempre que se levanta el servidor
        this.middlewares()
        //Rutas de la aplicacion
        this.routes();
        //Sockets Configuration
        // this.sockets()
    }

    async dbConnection() {
        try {
            await mysqlDB.authenticate();
            console.log("Database Connected Successfully")
        } catch (e) {
            throw new Error("Error while trying to connect the database")
        }

    }

    middlewares() {

        //CORS
        this.app.use(cors({
            origin: true,
            credentials: true
        }));
        //Lecture and parsing from the body
        this.app.use(express.json())
        //Nos permite recibir los URL search params por medio de una petición fetch
        // this.app.use(bodyparser.urlencoded({ extended: true }))
        //Configurando sesiones
        // this.app.use(session(sessionConfig))
        //Permite realizar la lecutra de las cookies
        this.app.use(cookieparser())
        //PUBLIC DIRECTORY
        this.app.use(express.static('public'));
        //File Uploader
        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/tmp/',
        //     createParentPath: true
        // }));

    }

    routes() {
        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.postsPath, require('../routes/posts'));
        //						this.app.use(this.paths.categoriesPath, require('../routes/categories'));

    };

    start() {
        this.app.listen(this.PORT, () => {
            console.log('Listening from port number : ', this.PORT);
        })
    }
}

module.exports = Server;