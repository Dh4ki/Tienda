'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: {type: String, require: true},
    apellidos: {type: String, require: true},
    pais: {type: String, require: false},
    email: {type: String, require: true},
    password: {type: String, require: true},
    perfil: {type: String, default: 'perfil.png', require: true},
    telefono: {type: String, require: false},
    genero: {type: String, require: false},
    f_nacimiento: {type: String, require: false},
    dni: {type: String, require: false},
});

module.exports = mongoose.model('cliente',ClienteSchema);