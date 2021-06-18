const { request, response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Middleware para comprobar que no falta ningún campo.
 */
const EmptyFields = (req = request, res = response, next) => {
    const validationErr = validationResult(req);
    if (validationErr.isEmpty()) return next();
    const errors = [];
    validationErr
        .array()
        .map(err => errors.push({
            [err.param]: `El parámetro ${err.param} no puede quedar vacío.`}))

    return res.status(400).json(errors);
}

/**
 * Middleware de filtrado para comprobar que existe al menos un campo para actualizar.
 */
const PatchFilter = (req = request, res = response, next) => {
    const validationErr = validationResult(req);
    if (!validationErr.isEmpty()) return next();
    res.status(400).json({
        msg: 'Debe introducir algún campo válido para actualizar el perfil.',
        query: req.body
    })
}

module.exports = { EmptyFields, PatchFilter };