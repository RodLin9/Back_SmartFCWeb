const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose.set('useCreateIndex',true);
//mongoose.set('useUnifiedTopology',true);
//** @function estudianteSchema */
// Schema in student for model

const estudianteSchema = new Schema({ //Declaramos el esquema
    //Se declara la estructura del objeto
    id_estudiante:{ //La propiedad
        type: Number, //Qué tipo de dato es un id?
        required: true,
        unique: true, //Los id no se pueden repetir, es un tipo de dato únicpo
        trim: true
    },
    tipo_usuario:{
        type: Number,
        required: true,
        trim: true
    },
    nombre_estudiante:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    apellido_estudiante:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    grado_estudiante:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    curso_estudiante:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    id_colegio:{
        type: Number,
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
    /*role:{ //Haciendo referencia a los permisos
        type: ["user", "admin"],
        default: "user", //Todos los registros que se creen le va a poner ese role
        required: true,
        trim: true
    },*/
    //id_admin	tipo_usuario	
    //id_colegio	
    //nombre_usuario	contraseña	

    },
    {//Además de los campos que están arriba, se creen los necesarios para manejar marcas de tiempo
        timestamps: true, //CreatedAt y updatedAt
        versionKey: false
    }
); 

//module.exports = estudianteSchema; //Quiero que exporte un modelo de moongose que 
module.exports = mongoose.model("estudiante", estudianteSchema) //Nombre de la colección, esquema a manejar 