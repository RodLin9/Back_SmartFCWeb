const mongoose = require('mongoose'); //Importa el módulo de Mongoose para interactuar con la base de datos MongoDB.
const estudianteSchema = require('./estudiante_model'); //Importa el esquema de estudiante desde el archivo estudiante_model.js
/** @function estudianteSchema */
// Dao for Schema statics in database
estudianteSchema.statics={ //Define un objeto llamado statics en el esquema estudianteSchema para definir métodos estáticos de Mongoose.    
    create: function(data, cb){  //Define un método estático llamado create que toma dos argumentos: data, que representa los datos de un estudiante, y cb, que representa una función de devolución de llamada para ejecutar cuando la operación de guardar en la base de datos se completa.
        const student = new this(data); //Crea una nueva instancia del modelo de estudiante con los datos proporcionados.
        student.save(cb); //Guarda la instancia de estudiante en la base de datos y ejecuta la función de devolución de llamada cb una vez que se completa la operación
    },
    login: function(query,cb){ //Define otro método estático llamado login que toma dos argumentos: query, que representa la consulta para buscar un estudiante en la base de datos, y cb, que representa una función de devolución de llamada para ejecutar cuando la operación de búsqueda se completa.
        this.find(query,cb); //Realiza una búsqueda en la base de datos de acuerdo con la consulta proporcionada y ejecuta la función de devolución de llamada cb una vez que se completa la operación.
    }
}
const estudiantesModel = mongoose.model('Estudiantes',estudianteSchema); //Crea el modelo de Mongoose estudiantesModel a partir del esquema de estudiante estudianteSchema. El primer argumento es el nombre del modelo en la base de datos, y el segundo argumento es el esquema de estudiante.

module.exports = estudiantesModel; //Exporta el modelo de Mongoose estudiantesModel para que pueda ser utilizado en otros archivos de la aplicación.