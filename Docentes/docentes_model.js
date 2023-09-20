const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useCreateIndex',true);
//mongoose.set('useUnifiedTopology',true);
/** @function docenteSchema */
// Schema in teacher for model

const docenteSchema = new Schema({
    id_docente:{
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    cont:{
        type: Number,
        required: true,
        trim: true
    },
    tipo_usuario:{
        type: Number,
        required: true,
        trim: true
    },
    nombre_docente:{
        type: String,
        required: true,
        trim: true
    },
    apellido_docente:{
        type: String,
        required: true,
        trim: true
    },
    id_colegio:{
        type: Number,
        required: true,
        trim: true
    },
    nombre_usuario:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    contrasena:{
        type: String,
        required: true,
        trim: true
    },
    correo_electronico:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },

},{timestamps: true});

module.exports = docenteSchema;
