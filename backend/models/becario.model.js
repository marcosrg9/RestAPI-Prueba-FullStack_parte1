const { Schema, model } = require('mongoose');

/**
 * Define un esquema estándar para un perfil de la colección becarios en la DB.
 */
const BecarioSchema = new Schema({
    nombre:         { type: String, required: true },
    apellidos:      { type: String, required: true },
    puesto:         { type: String, required: true, enum: { values: ['FullStack', 'FrontEnd', 'BackEnd', 'iOS', 'Android', 'DevOps'], message: '{VALUE} no es un puesto válido.' } },
    horario:        { type: String, required: true },
    fechaalta:      { type: String, required: true },
    responsables:   [{ type: String }]
}, { versionKey: false });

/**
 * Redeclara el _id por defecto de MongoDB y devuelve el mismo documento, pero sin el guión bajo.
 */
BecarioSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Becario', BecarioSchema);