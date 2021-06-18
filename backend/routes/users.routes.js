const Users = require('express').Router();
const { check, body } = require('express-validator');

const { mongoIdChecker } = require('../middlewares/mongoIdChecker.middleware');
const { fetchAll, fetchById, insertUser } = require('../controllers/users.controller');
const { EmptyFields } = require('../middlewares/fieldBodyValidation.middleware');

// Lista todos los usuarios de la colección.
Users.get('/', fetchAll);

// Obtiene un usuario por su id.
Users.get('/:id', [check('id', 'El identificador no es válido.').isMongoId(), mongoIdChecker], fetchById);

// Inserta un nuevo usuario en la colección.
Users.post('/', [body(['nombre', 'apellidos']).notEmpty(), EmptyFields], insertUser);


module.exports = { Users };