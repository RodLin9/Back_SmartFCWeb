const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useCreateIndex', true);
//mongoose.set('useUnifiedTopology', true);
/** @function schoolSchema */
// Schema in shool for model

const schoolSchema = new Schema({
    id_colegio:{
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    NIT:{
        type: Number,
        required: true,
        trim: true
    },
    nombre_colegio:{
        type: String,
        required: true,
        trim: true
    },
    ciudad:{
        type: String,
        required: true,
        trim: true
    },
    direccion:{
        type: String,
        required: true,
        trim: true
    },
    telefono:{
        type: Number,
        required: true,
        trim: true
    },
    tipo_colegio:{
        type: String,
        required: true,
        trim: true
    },
    calendario:{
        type: String,
        required: true,
        trim: true
    },
    rector:{
        type: String,
        required: true,
        trim: true
    },
    colegioActivo:{
        type: Number,
        required: true,
        trim: true
    },
},{timestamps:true});

module.exports = schoolSchema;