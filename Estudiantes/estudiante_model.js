const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology',true);*/
/** @function estudianteSchema */
// Schema in student for model

const estudianteSchema = new Schema({
    id_estudiante:{
        type: Number,
        required: false,
        trim: true,
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
        trim: true
    },
},{timestamps: true});

module.exports = estudianteSchema;