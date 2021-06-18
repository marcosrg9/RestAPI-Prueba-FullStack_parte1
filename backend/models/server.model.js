const express = require('express');
const cors = require('cors');
require('colors');

const { dbConnect } = require('../database/config.db');
const { Routes } = require('../routes/main.routes');

class Server {

    api = express();

    /**
     * 
     * @author Marcos Rodríguez Yélamo <marcosylrg@gmail.com>
     * 
     * Genera un nuevo servidor.
     * Escucha todas las peticiones desde el puerto seleccionado (opcional).
     * 
     * @param {number} port Puerto en el que se desea ejecutar el servidor (PORT env default).
     */
    constructor(port = process.env.PORT){
        this.port = port;
        // Conecta a la base de datos y ejecuta el servidor.
        dbConnect()
            .then(() => this.load())
            .catch(() => {console.error})
    };

    /**
     * Carga el archivo de rutas.
     */
    routes() {
        this.api.use(Routes);
    }

    /**
     * Carga los middlewares globales.
     */
    middlewares() {
        this.api.use(cors());
        this.api.use(express.json());
    }

    /**
     * Ejecuta los métodos necesarios en el orden adecuado para preparar el servidor para escuchar.
     * Después ejecuta el método de arranque.
     */
    load() {
        if (this.port < 81 || this.port > 65535) throw new Error('El puerto especificado no es válido.');
        this.api = express();
        // Es importante que los middlewares se carguen antes que las rutas, si no, el servidor no se pondrá en marcha.
        this.middlewares();
        this.routes();
        try {
            this.run()
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Pone el servidor en marcha escuchando por el puerto asignado a la propiedad port.
     */
    run() {
        this.api = this.api.listen(this.port);

        // Escucha los eventos del servidor (para realizar acciones en caso de ser necesario)
        this.api
            .on('listening', () => {
                console.log(` Servidor escuchando a través del puerto ${this.port}. `.bgBlue);
            })
            .on('close', () => {
                console.log(' El servidor se ha detenido. '.bgRed);
            });
    }

    /**
     * Recarga el servidor.
     * Si el puerto es diferente del ya establecido, lo cierra y vuelve a iniciar en el puerto solicitado.
     * 
     * Este tipo de métodos no son muy útiles en estos entornos, pero es una simple muestra para
     * demostrar mis capacidades como backEnd.
     * 
     * @param {number} port Puerto en el que se va a reiniciar el servidor.
     */
    reload(port = this.port) {
        this.port = port;
        this.shutdown();
        this.load();
    }
    
    /**
     * Detiene el servidor y deja de escuchar los eventos para evitar fugas de memoria.
     */
    shutdown() {
        this.api.close();
        this.api.removeAllListeners('listening');
        this.api.removeAllListeners('close');
    }
}

module.exports = Server;