const Becarios = require('express').Router();
const { check, body } = require('express-validator')

const { mongoIdChecker } = require('../middlewares/mongoIdChecker.middleware');
const { fetchAll, fetchById, newBecario, patchBecario } = require('../controllers/becarios.controller');
const { EmptyFields, PatchFilter } = require('../middlewares/fieldBodyValidation.middleware');

// Lista todos los becarios.
Becarios.get('/', fetchAll);

// Lista el becario con el id solicitado.
Becarios.get('/:id', [check('id', 'El identificador no es válido.').isMongoId(), mongoIdChecker], fetchById);

// Crea un nuevo becario.
Becarios.post('/', [body(['nombre', 'apellidos', 'puesto', 'horario']).notEmpty(), EmptyFields], newBecario)

// Actualización parcial de un becario.
Becarios.patch('/:id',[
    check('id', 'El identificador no es válido.').isMongoId(), mongoIdChecker,
    body(['nombre','apellidos','puesto','horario']).isEmpty(), PatchFilter
],patchBecario)

module.exports = { Becarios };