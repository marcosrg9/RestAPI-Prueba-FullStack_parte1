const Server = require('../models/server.model');

let server;

/**
 * Detiene el servidor y después destruye la instancia.
 */
const destroyServer = () => {
    server.shutdown();
    server = null;
}

/**
 * Crea una nueva instancia del servidor.
 */
const initServer = () => {
    server = new Server();
}

module.exports = { initServer, destroyServer };