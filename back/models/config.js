'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigSchema = Schema({
    categorias: [{type: Object, require: true}],
    titulo: {type: String, require: true},
    logo: {type: String, require: true},
    serie: {type: Number, require: true},
    correlativo: {type: String, require: true},
});

module.exports = mongoose.model('config',ConfigSchema);