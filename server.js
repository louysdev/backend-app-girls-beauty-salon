const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey');
const passport = require('passport');
const session = require('express-session');

/*
* INICIALIZAR FIREBASE ADMIN
*/
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const upload = multer({
    storage: multer.memoryStorage()
})

/*
* RUTAS
*/
const users = require('./routes/userRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');


// const { credential } = require('firebase-admin');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());


app.use(session({ 
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


app.disable('x-powered-by');

app.set('port', port);

/*
* LLAMANDO A LAS RUTAS
*/
users(app, upload);
categories(app);
products(app, upload);
address(app);

server.listen(3000, '192.168.8.100' || 'localhost', function() {
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})

module.exports = {
    app: app,
    server: server
}

// 200 - RESPUESTA EXITOSA
// 404 - URL NO EXISTE
// 500 - ERROR INTERN0 DEL SIRVIDOR