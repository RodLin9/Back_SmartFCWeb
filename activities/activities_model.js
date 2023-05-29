const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/** @function activitySchema */
// Schema in activity for model

const activitySchema = new Schema({
    id_actividad:{
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
    id_colegio:{
        type: Number,
        required: true,
        trim: true
    },
    id_docente:{
        type: Number,
        required: true,
        trim: true
    },
    id_materia:{
        type: Number,
        required: true,
        trim: true
    },
    id_grado:{
        type: Number,
        required: true,
        trim: true
    },
    id_materiaActiva:{
        type:Number,
        required:true,
        trim:true
    },
    id_competencia:{
        type: Number,
        required: true,
        trim: true
    },
    titulo_actividad:{
        type: String,
        required: true,
        trim: true
    },
    descripcion_actividad:{
        type: String,
        required: true,
        trim: true
    },
    id_contenidoREA:{
        type: Number,
        required: true,
        trim: true
    },
    video:{
        type: Number,
        required: true,
        trim: true
    },
    urlvideo:{
        type: String,
        required: true,
        trim: true
    },
    documento:{
        type: Number,
        required: true,
        trim: true
    },
    urldocumento:{
        type: String,
        required: true,
        trim: true
    },
    audio:{
        type: Number,
        required: true,
        trim: true
    },
    urlaudio:{
        type: String,
        required: true,
        trim: true
    },
    html:{
        type: Number,
        required: true,
        trim: true
    },
    urlhtml:{
        type: String,
        required: true,
        trim: true
    },
    id_taller:{
        type: Number,
        required: true,
        trim: true
    },
    taller:{
        type: Number,
        required: true,
        trim: true
    },
    urltaller:{
        type: String,
        required: true,
        trim: true
    },
    descripcion_test:{
        type: String,
        required: true,
        trim: true
    },
    Q1:{
        type: String,
        required: true,
        trim: true
    },
    A11:{
        type: String,
        required: true,
        trim: true
    },
    A12:{
        type: String,
        required: true,
        trim: true
    },
    A13:{
        type: String,
        required: true,
        trim: true
    },
    A14:{
        type: String,
        required: true,
        trim: true
    },
    CA1:{
        type: Number,
        required: true,
        trim: true
    },
    Q2:{
        type: String,
        required: true,
        trim: true
    },
    A21:{
        type: String,
        required: true,
        trim: true
    },
    A22:{
        type: String,
        required: true,
        trim: true
    },
    A23:{
        type: String,
        required: true,
        trim: true
    },
    A24:{
        type: String,
        required: true,
        trim: true
    },
    CA2:{
        type: Number,
        required: true,
        trim: true
    },
    Q3:{
        type: String,
        required: true,
        trim: true
    },
    A31:{
        type: String,
        required: true,
        trim: true
    },
    A32:{
        type: String,
        required: true,
        trim: true
    },
    A33:{
        type: String,
        required: true,
        trim: true
    },
    A34:{
        type: String,
        required: true,
        trim: true
    },
    CA3:{
        type: Number,
        required: true,
        trim: true
    },
    evaluacion:{
        type: Number,
        required: true,
        trim: true
    },
    descripcion_evaluacion:{
        type: String,
        required: true,
        trim: true
    },
    EQ1:{
        type: String,
        required: true,
        trim: true
    },
    EA11:{
        type: String,
        required: true,
        trim: true
    },
    EA12:{
        type: String,
        required: true,
        trim: true
    },
    EA13:{
        type: String,
        required: true,
        trim: true
    },
    EA14:{
        type: String,
        required: true,
        trim: true
    },
    ECA1:{
        type: Number,
        required: true,
        trim: true
    },
    EQ2:{
        type: String,
        required: true,
        trim: true
    },
    EA21:{
        type: String,
        required: true,
        trim: true
    },
    EA22:{
        type: String,
        required: true,
        trim: true
    },
    EA23:{
        type: String,
        required: true,
        trim: true
    },
    EA24:{
        type: String,
        required: true,
        trim: true
    },
    ECA2:{
        type: Number,
        required: true,
        trim: true
    },
    EQ3:{
        type: String,
        required: true,
        trim: true
    },
    EA31:{
        type: String,
        required: true,
        trim: true
    },
    EA32:{
        type: String,
        required: true,
        trim: true
    },
    EA33:{
        type: String,
        required: true,
        trim: true
    },
    EA34:{
        type: String,
        required: true,
        trim: true
    },
    ECA3:{
        type: Number,
        required: true,
        trim: true
    },
    autor:{
        type: String,
        required: true,
        trim: true
    },
    id_autor:{
        type: Number,
        required: true,
        trim: true
    }
}, {timestamps: true});

module.exports = activitySchema;

//id_actividad	id_colegio	id_docente	id_materia	id_competencia	titulo_actividad	
//descripcion_materia	video	urlvideo	lectura	urllectura	test	html	urlhtml	grado
