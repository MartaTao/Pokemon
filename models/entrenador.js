const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrenadorSchema = new Schema({
    nombre: String,
    bio:String,
    tipo: String,
    region:String,
    ciudad: String,
    numGym: String,
    lista_Pokemon: String
})

//Creamos el modelo
const Entrenador = mongoose.model('entrenador', entrenadorSchema, "entrenador");

module.exports = Entrenador;