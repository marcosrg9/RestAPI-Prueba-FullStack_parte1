const { Schema, model } = require('mongoose');

const PersonSchema = Schema({
    name:       { type: String, required: true },
    surnames:   { type: String, required: true },
    username:   { type: String, required: true },
    birthdate:  { type: String, required: true },
    email:      { type: String, required: true },
    password:   { type: String, required: true },
    status:     { type: Boolean, default: true }
});



module.exports = model('Personas', PersonSchema);