const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);*/
/** @function subjectSchema */
// Schema in subject for model

const materiaSchema = new Schema({
    id_materia:{
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
    nombre_materia:{
        type: String,
        required: true,
        trim: true
    },
    id_colegio:{
        type: Number,
        required: true,
        trim: true
    },
    id_areaMateria:{
        type: Number,
        required: true,
        trim: true
    },
    url_imagen:{
        type: String,
        required: true,
        trim: true
    },
},{timestamps:true});

module.exports = materiaSchema;
//module.exports = mongoose.model('contents', contentSchema);
//id_Materia	
//nombre_Materia