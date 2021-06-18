const API = require('express').Router();

const { Becarios } = require('./becarios.routes');
const { Users } = require('./users.routes');

API.use('/becarios', Becarios);
API.use('/users', Users);

module.exports = { API };