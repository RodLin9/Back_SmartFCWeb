const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/** @function dudasSchema */
// Schema in doubts for model

const dudaSchema = new Schema({
    id_duda:{
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    id_actividad:{
        type: Number,
        required: true,
        trim: true
    },
    id_estudiante:{
        type: Number,
        required: true,
        trim: true
    },
    pregunta:{
        type: String,
        required: true,
        trim: true
    },
    respuesta:{
        type: String,
        trim: true
    },
    estado_duda:{
        type: Number,
        trim: true
    }
},{timestamps:true});

module.exports = dudaSchema;