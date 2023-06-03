const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/** @function typeSchema */
// Schema in type for model

const typeSchema = new Schema({
    id_tipoContenido:{
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    nombre_tipoContenido:{
        type: String,
        required: true,
        trim: true
    },
},{timestamps:true});

module.exports = typeSchema;