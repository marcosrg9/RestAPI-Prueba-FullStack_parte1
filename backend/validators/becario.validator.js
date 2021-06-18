/**
 * @param {becarioModel.validate Error} Error Devuelve verdadero si existe un error de validación.
 * @returns boolean
 */
const ErrorVal = ( err ) => {
    if (err.name == 'ValidationError') return true;
    return false;
}

module.exports = { ErrorVal };