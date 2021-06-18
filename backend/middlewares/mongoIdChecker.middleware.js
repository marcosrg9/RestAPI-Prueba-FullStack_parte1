const { request, response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Middleware para comprobar que no falta ningún campo obligatorio.
 */
const mongoIdChecker = (req = request, res = response, next) => {
    const validationErr = validationResult(req);
    if (validationErr.isEmpty()) return next();
    const errors = [];
    validationErr
        .array()
        .map(err => errors.push({ [err.param]: err.msg}))
    return res.status(400).json(errors);
}

module.exports = { mongoIdChecker };