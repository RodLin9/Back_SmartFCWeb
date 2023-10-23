const mongoose = require('mongoose');
require('mongoose-long')(mongoose);
const Schema = mongoose.Schema;
//mongoose.set('createIndexes', true);
//mongoose.set('useUnifiedTopology', true);

//Modelo para representar eventos de interacción de los estudiantes con archivos multimedia en la aplicación web

/** @function eventoSchema */
// Schema in events for model

const eventoSchema = new Schema({

    answers: [
        {
            type: Object,
            required: false,
        },
    ],
    id_evento:{
        type: mongoose.Schema.Types.Long, //Se esperan números muy grandes
        required: true,
        trim: true,
        unique: true, //No se pueden repetir valores en esos campos
        bsonType:"long"
    },
    count:{
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    data_start:{
        type: String,
        trim: true
    },
    hour_start:{
        type: String,
        trim: true
    },
    data_end:{
        type: String,
        trim: true
    },
    hour_end:{
        type: String,
        trim: true
    },
    id_actividad:{
        type:Number,
        required:true,
        trim: true
    },
    id_estudiante:{
        type:Number,
        required: true,
        trim: true
    },
    check_download:{ //Estos son flags: Marcadores de verificación, indican si cierta acción ha ocurrido o no
        type:Number,
        trim: true
    },
    check_inicio:{ //Flag
        type:Number,
        trim: true
    },
    check_fin:{ //Flag
        type:Number,
        trim: true
    },
    check_answer:{
        type:Number,
        trim: true
    },
    count_video:{
        type:Number,
        trim: true
    },
    check_video:{
        type:Number,
        trim: true
    },
    check_document:{
        type:Number,
        trim: true
    },
    check_a1:{
        type:Number,
        trim: true
    },
    check_a2:{
        type:Number,
        trim: true
    },
    check_a3:{
        type:Number,
        trim: true
    },
    score_a:{
        type:Number,
        trim: true
    },
    /*state_a:{
        type:Number,
        trim: true
    },*/    
    check_profile:{
        type:Number,
        trim: true
    },
    /*check_Ea1:{
        type:Number,
        trim: true
    },
    check_Ea2:{
        type:Number,
        trim: true
    },
    check_Ea3:{
        type:Number,
        trim: true
    },*/
    score_Ea:{
        type:Number,
        trim: true
    },
    check_Ea:{
        type:Number,
        trim: true
    },
    progreso:{ //Esto?
        type:Number,
        trim: true
    },
    oculto:{ //Esto?
        type:Number,
        trim: true
    },

})

module.exports = eventoSchema;