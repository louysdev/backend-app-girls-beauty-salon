const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {

    // OBTENER DATOS
    app.get('/api/users/getAll', UsersController.getAll);

    // GUARDAR DATOS
    app.post('/api/users/create', upload.array('image', 1), UsersController.registerWithImage);

    // LOGIN
    app.post('/api/users/login', UsersController.login);

    // ACTUALIZAR DATOS
    app.put('/api/users/update', upload.array('image', 1), UsersController.update);
}