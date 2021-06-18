const { connect } = require('mongoose');
require('colors');

/**
 * Función básica de conexión a la DB.
 * Lee la variable de entorno MONGO y esta debe almacenar un enlace a un clúster de Mongo Atlas.
 */
const dbConnect = async() => {
    try {
        await connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.info(' Conexión a base de datos establecida. '.bgGreen);
    } catch (err) {
        console.error(err);
        throw new Error(' Error al conectar a la base de datos. '.bgRed);
    }
}

module.exports = { dbConnect }