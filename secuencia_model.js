const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secuenciaSchema = new Schema({
    nombre: {
        type: String,
        unique: true
    },
    valor: {
        type: Number,
        default: 0
    }
});

const Secuencia = mongoose.model('Secuencia', secuenciaSchema);

module.exports = Secuencia;