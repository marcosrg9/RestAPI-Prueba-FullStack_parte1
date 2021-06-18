const { Schema, model } = require('mongoose');

/**
 * Definición del esquema estándar para un perfil de la colección Users.
 */
const UserSchema = Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true }
})

/**
 * Redeclara el campo _id, devuelve id en vez del _id por defecto de MongoDB.
 */
UserSchema.methods.toJSON = function() {
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('User', UserSchema);