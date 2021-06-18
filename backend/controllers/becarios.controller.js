const { request, response } = require('express');
const becarioModel = require('../models/becario.model');
const { becarioErrVal } = require('../helpers/becario.helper');
const { ErrorVal } = require('../validators/becario.validator');

/**
 * Lista el becario con el id asignado.
 */
const fetchById = (req = request, res = response) => {
    becarioModel.findOne({_id: req.params.id})
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).send(`No se ha encontrado ningún usuario con el id "${req.params.id}".`);
            } else {
                res.json(a);
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

/**
 * Lista todos los becarios de la DB.
 */
const fetchAll = (req = request, res = response) => {
    becarioModel.find({})
        .then((a) => {
            if (!a || a.length == 0) {
                res.status(404).json('La colección becarios está vacía.')
            } else {
                res.json(a);
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

/**
 * Genera un nuevo becario, lo valida y después lo inserta en la DB.
 */
const newBecario = (req = request, res = response) => {
    const becario = new becarioModel(req.body);
    becario.validate()
        .then((a) => {
            becario.save()
                .then((a) => {
                    res.json(`El becario ${becario.nombre} ha sido creado`);
                })
                .catch((err) => {
                    res.status(500).json(err);
                })
        })
        .catch((err) => {
            if (ErrorVal(err)) {
                res.status(400).json(becarioErrVal(err));
            } else {
                res.status(500).json(err);
            }
        })
}

/**
 * Realiza una actualización parcial de un becario por su id.
 */
const patchBecario = (req = request, res = response) => {
    const { id } = req.params;
    becarioModel.findOneAndUpdate({_id: id}, req.body, { runValidators: true })
        .then((a) => {
            res.json(`El becario con ${id} se ha actualizado correctamente`);
        })
        .catch((err) => {
            if (ErrorVal(err)) {
                res.status(400).json(becarioErrVal(err));
            } else {
                res.status(500).json(err);
            }
        })
}

module.exports = { fetchById, fetchAll, newBecario, patchBecario };