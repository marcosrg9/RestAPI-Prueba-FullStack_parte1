const { request, response } = require('express');
const userModel = require('../models/user.model');
const { ErrorVal } = require('../validators/becario.validator');

/**
 * Obtiene todos los usuarios de la colección Users.
 */
const fetchAll = (req = request, res = response) => {
    userModel.find({})
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json('La colección Users está vacía.');
            } else {
                res.json(a);
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

/**
 * Obtiene una entrada de usuario por su id.
 */
const fetchById = (req = request, res = response) => {
    userModel.findOne({_id: req.params.id})
        .then((a) => {
            if (!a) {
                res.status(404).json(`No se ha encontrado ningún usuario con el id ${req.params.id}`);
            } else {
                res.json(a);
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

/**
 * Inserta un nuevo usuario en la colección Users.
 */
const insertUser = (req = request, res = response) => {
    const User = new userModel(req.body);
    User.validate()
        .then((a) => {
            User.save()
                .then((a) => {
                    res.json(`El usuario ${User.nombre} ha sido insertado en la base de datos.`);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        })
        .catch((err) => {
            if (ErrorVal(err)) {
                res.status(400).json('Hay un error de validación.\nCompruebe los campos introducidos y vuelva a intentarlo.');
            } else {
                res.status(500).json(err);
            }
        })
}

module.exports = { fetchAll, fetchById, insertUser };