const { ErrorVal } = require('../validators/becario.validator')

/**
 * @param {becarioModel.validate Error} Error Error devuelto por el controlador de excepción del método validate.
 * @returns Field: Message[].
 */
const becarioErrVal = ( err ) => {
    if (ErrorVal(err)) {
        const { errors } = err;
        validationErr = {};
        for (const key in errors) {
            if (Object.hasOwnProperty.call(errors, key)) {
                validationErr[key] = errors[key].message;
            }
        }
        return validationErr;
    }
}

module.exports = { becarioErrVal };