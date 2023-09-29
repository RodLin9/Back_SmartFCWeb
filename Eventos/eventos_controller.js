const Eventos = require('./eventos_dao'); //Se importa el evento definido en eventos_dao.js
var async  = require('express-async-await')
const fetch = require('node-fetch');
 //Estas bibliotecas permiten utilizar funcionalidades asincrónicas y realizar solicitudes HTTP a través de fetch.

async function  obtenerLast () {
    const last = await fetch('http://0.0.0.0:3001/loadAllEvento'); //realiza una solicitud HTTP GET a la URL 'http://0.0.0.0:3000/loadAllEvento' utilizando fetch.
    //Se intenta obtener eventos desde una ruta específica en tu servidor Express.
    const data = await last.json(); //Se espera la respuesta de la solicitud utilizando await last.json(). Esto permite convertir la respuesta en un objeto JavaScript (JSON) que puede ser manipulado en tu código.
    console.log("Comprobando cuantos item tiene")
    console.log(data.length); //Imprime en la consola el número de elementos en el objeto data que contiene la respuesta de la solicitud.
    return data.length; //Devuelve la longitud de data, que representa la cantidad de eventos obtenidos desde la solicitud HTTP.
}
/** @function createEventos */
// Create the specific elements for Eventos in mongo. 

exports.createEventos= async(req,res,next)=>  {

    //Obtiene el último valor. Obtiene la longitud de algún tipo de lista de eventos. 
    var last = await obtenerLast();
    console.log("El ultimo allado")
    console.log(last);

    //Obtiene el id del evento desde la solicitud HTTP
    var id_evento =req.body.id_evento; 
    console.log("ID Eventos");
    console.log(id_evento); //Id del evento desde la solicitud

    //Calcula el nuevo valor de ID, combinando el ID del evento y el valor obtrenido anteriormente
    last = last+1;
    console.log("Trayendo Last +1")
    console.log(last);
    var idCompleta = id_evento+''+last+'';
    console.log("Imprimiendo IdCompleta");
    console.log(idCompleta);
    var idConvertida = parseInt(idCompleta,10);
    console.log("ID Convertida");
    console.log(idConvertida);

    //Crea un objeto newEvento 

    const newEvento = {
        id_evento: idConvertida,
        count: last,
        data_start: req.body.data_start,
        hour_start: req.body.hour_start,
        data_end: req.body.data_end,
        hour_end: req.body.hour_end,
        id_actividad: req.body.id_actividad,
        id_estudiante: req.body.id_estudiante,
        check_download: req.body.check_download,
        check_inicio: req.body.check_inicio,
        check_fin: req.body.check_fin,
        check_answer: req.body.check_answer,
        count_video: req.body.count_video,
        check_video: req.body.check_video,
        check_document: req.body.check_document,
        check_a1: req.body.check_a1,
        check_a2: req.body.check_a2,
        check_a3: req.body.check_a3,
        check_profile: req.body.check_profile,
        check_Ea1: req.body.check_Ea1,
        check_Ea2: req.body.check_Ea2,
        check_Ea3: req.body.check_Ea3,
        oculto: 0
    }
    //id_evento	data_start	hour_start	data_hours_end	hour_end
    //	id_actividad	id_estudiante	check_download	check_inicio	
    //check_fin	check_answer	count_video	check_video	check_document
    //	check_a1	check_a2	check_a3	check_profile

    console.log(newEvento);
    Eventos.create(newEvento,(err,evento)=>{
        if(err) return res.status(500).send('Server Error');
        res.send(evento);
    })
}

/** @function loadEvento */
// Load the specific elements for Eventos in mongo.

exports.loadEvento = async (req, res, next) => {
    try {
        const eventoData = {
            id_estudiante: req.body.id_estudiante,
        };

        const evento = await Eventos.findOne({ id_estudiante: eventoData.id_estudiante });

        if (!evento) {
            return res.status(409).send({ message: 'Something Error' });
        }

        res.send(evento);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
/** @function allEventos */
// Load all the specific elements for Eventos in MongoDB.

exports.allEventos = async (req, res, next) => {
    try {
        const eventStudents = await Eventos.find();

        if (!eventStudents || eventStudents.length === 0) {
            return res.status(409).send({ message: 'Something Error' });
        }

        res.send(eventStudents);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

/** @function allEventsForAngular */
// Load all the specific elements for Eventos in mongo. 

exports.allEventsForAngular = async (req, res, next) => {
    try {
        // Espera a que se complete la búsqueda de todos los eventos
        const allEventos = await Eventos.find();

        // Verifica si la búsqueda no encontró eventos o si la lista está vacía
        if (!allEventos || allEventos.length === 0) {
            return res.status(409).send({ message: 'No se encontraron eventos :(' });
        } else {
            var storageAllInformation = [];
            var storageAllInformationWithStudents = [];
            var storageActividad = allEventos.reverse(); //Se invierte el orden de todos los eventos

            // Itera a través de los eventos para obtener información única de estudiantes
            for (var i = 0; i < allEventos.length; i++) {
                // Encuentra estudiantes únicos
                resultadoEstudiantes = Array.from(new Set(storageActividad.map(s => s.id_estudiante))) //Para obtener estudiantes únicos
                    .map(id_estudiante => {
                        return {
                            id_estudiante: id_estudiante,
                        };
                    });
            }

            console.log(resultadoEstudiantes.length);

            // Itera a través de los estudiantes únicos para obtener información relacionada con las actividades
            for (var i = 0; i < resultadoEstudiantes.length; i++) {
                elementos = i;

                // Filtra eventos por estudiante
                storageActividad.filter(function (element) {
                    if (element.id_estudiante == resultadoEstudiantes[elementos].id_estudiante) {
                        storageAllInformation.push(element) //En storageAllInformation se almacenan los eventos de los estudiantes filtrados
                    }
                });

                // Encuentra actividades únicas por estudiante
                resultadoEstudiantesRep = Array.from(new Set(storageAllInformation.map(s => s.id_actividad)))
                    .map(id_actividad => {
                        return {
                            id_actividad: id_actividad,
                            // Otras propiedades relacionadas con la actividad
                        };
                    });

                storageAllInformation = [];

                // Agrega la información de actividades únicas al resultado final
                resultadoEstudiantesRep.filter(function (element) {
                    storageAllInformationWithStudents.push(element);
                });
            }

            res.send(storageAllInformationWithStudents); //Se envía la respuesta con la información de actividades por estudiante
            console.log(resultadoEstudiantes); //Se imprime la longitud de resultadoEstudiantes.
        }
    } catch (err) {
        // Maneja errores y envía una respuesta de error del servidor
        res.status(500).send('Server Error');
    }
}

/** @function generateMetrics */
// Generate metrics for specific elements of Eventos in MongoDB.

exports.generateMetrics = async (req, res, next) => {
    try {
        const contentData = {
            id_estudiante: req.body.id_estudiante,
        };

        const eventsMetrics = await Eventos.find({ id_estudiante: contentData.id_estudiante });

        if (!eventsMetrics || eventsMetrics.length === 0) {
            return res.status(409).send({ message: 'Something Error' });
        } else {
            var dataEvents = eventsMetrics;
            console.log(dataEvents);
            res.send(dataEvents);
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

/** @function uploadEvento */
// Upload specific elements for Eventos in MongoDB.

exports.uploadEvento = async (req, res) => {
    try {
        const eventoData = {
            id_evento: req.body.id_evento
        };

        const eventoNewData = {
            data_start: req.body.data_start,
            hour_start: req.body.hour_start,
            data_end: req.body.data_end,
            hour_end: req.body.hour_end,
            id_actividad: req.body.id_actividad,
            id_estudiante: req.body.id_estudiante,
            check_download: req.body.check_download,
            check_inicio: req.body.check_inicio,
            check_fin: req.body.check_fin,
            check_answer: req.body.check_answer,
            count_video: req.body.count_video,
            check_video: req.body.check_video,
            check_document: req.body.check_document,
            check_a1: req.body.check_a1,
            check_a2: req.body.check_a2,
            check_a3: req.body.check_a3,
            check_profile: req.body.check_profile,
            check_Ea1: req.body.check_Ea1,
            check_Ea2: req.body.check_Ea2,
            check_Ea3: req.body.check_Ea3,
            oculto: req.body.oculto
        };

        await Eventos.updateOne({ id_evento: eventoData.id_evento }, { $set: eventoNewData });

        res.json({ status: 'Evento Actualizado' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
/** @function uploadEstadoEvento */
// Upload specific elements for Eventos in MongoDB.

exports.uploadEstadoEvento = async (req, res) => {
    try {
        const eventoData = {
            id_evento: req.body.id_evento
        };

        const eventoNewData = {
            oculto: req.body.oculto
        };

        await Eventos.updateOne({ id_evento: eventoData.id_evento }, { $set: eventoNewData });

        res.json({ status: 'Estado Evento Actualizado' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
}
//id_evento	fecha	id_actividad	id_estudiante	
//check_download	check_inicio	check_fin	
//check_answer	count_video	check_video
