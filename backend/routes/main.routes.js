const { static, Router } = require('express');
const Routes = Router();

const { API } = require('./api.routes');

// Carga los archivos de rutas para cada sección.
Routes.use('/api', API);

// Carpeta de archivos estáticos.

Routes.use('/', static(`${process.cwd()}/backend/public/`));
Routes.get('*', (req, res) => res.sendFile(`${process.cwd()}/backend/public/index.html`));

module.exports = { Routes };