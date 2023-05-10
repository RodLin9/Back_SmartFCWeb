const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology',true);*/
//mongoose.set('createIndexes', true);
/** @function estudianteSchema */
// Schema in student for model

const estudianteSchema = new Schema({
    id_estudiante:{
        type: Number,
        required: true,
        trim: true, //Quita espacios
        unique: true
    },
    tipo_usuario:{
        type: Number,
        required: true,
        trim: true
    },
    nombre_estudiante:{
        type: String,
        required: true,
        trim: true
    },
    apellido_estudiante:{
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    grado_estudiante:{
        type: Number,
        required: true,
        trim: true,
        unique: false
    },
    curso_estudiante:{
        type: Number,
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

module.exports = estudianteSchema;