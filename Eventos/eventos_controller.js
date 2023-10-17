const Eventos = require('./eventos_dao'); //Se importa el evento definido en eventos_dao.js
var async = require('express-async-await')
const fetch = require('node-fetch');
//const { faker } =require('@faker-js/faker');

/** @function getCurrentEventCount */
// Get the actual number of events in mongo

async function getCurrentEventCount() {
  const currentCount = await Eventos.countDocuments();
  //console.log('El número total de eventos es:', currentCount);
  return currentCount;
}

async function EventoConMayorCount (id_actividad, id_estudiante) {
    try {
        // Busca todos los eventos que tengan el mismo id_actividad e id_estudiante
        const eventos = await Eventos.find({ id_actividad, id_estudiante });

        if (!eventos || eventos.length === 0) {
            return null; // Puedes manejar esto de manera diferente
        }

        // Encuentra el evento con el valor de 'count' más alto
        let eventoConMayorCount = eventos[0];
        for (let i = 1; i < eventos.length; i++) {
            if (eventos[i].count > eventoConMayorCount.count) {
                eventoConMayorCount = eventos[i];
            }
        }

        return eventoConMayorCount;
    } catch (err) {
        console.error(err);
        return null; // O maneja el error de alguna otra manera apropiada
    }
};

/** @function createEvento */
// Create the specific elements for Eventos in mongo.

exports.createEvento = async (req, res, next) => {
    try {
        //console.log('Se crea el evento');
        const fechaActual = new Date();
        const fecha = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;
        const hora = `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;
        const id_estudiante = req.body.id_estudiante;
        
        // Obtener el último valor de ID de evento en la base de datos
        const currentCount = await getCurrentEventCount() + 1;
        
        // Incrementar el contador
        let eventoCounter = 0;
        
        let isUniqueC = false;
        let count = currentCount + 100;
        
        while (!isUniqueC) {
            try {
                // Consultar si ya existe un evento con el mismo valor de count
                const existingCount = await Eventos.findOne({ count: count });

                if (existingCount) {
                    eventoCounter++;
                    count = currentCount + eventoCounter;
                } else {
                    isUniqueC = true;
                }
            } catch (error) {
                console.error('Error en el bucle de count:', error);
                res.status(500).json({ error: 'Error al crear el evento.' });
            }
        }

        let isUnique = false;
        let id_evento = `${id_estudiante}${count}`;

        while (!isUnique) {
            try {
                // Consultar si ya existe un evento con el mismo id_evento
                const existingEvento = await Eventos.findOne({ id_evento: id_evento });

                if (existingEvento) {
                    eventoCounter++; // Si el id_evento ya existe, incrementa eventoCounter y vuelve a intentar
                    id_evento = `${id_estudiante}${count + eventoCounter}`;
                } else {
                    id_evento = `${id_evento}${currentCount}`;
                    isUnique = true;
                }
            } catch (error) {
                console.error('Error en el bucle de id_evento:', error);
                res.status(500).json({ error: 'Error al crear el evento.' });
            }
        }
  
      console.log('El id_evento es', id_evento);
  
      const newEvento = {
        id_evento: id_evento,
        count: count,
        data_start: fecha,
        hour_start: hora,
        data_end: req.body.data_end,
        hour_end: req.body.hour_end,
        id_actividad: req.body.id_actividad,
        id_estudiante: id_estudiante,
        check_download: 0,
        check_inicio: 1,
        check_fin: null,
        check_answer: null,
        count_video: 0,
        check_video: null,
        check_document: null,
        check_a1: "",
        check_a2: "",
        check_a3: "",
        check_profile: 0,
        check_Ea1: "",
        check_Ea2: "",
        check_Ea3: "",
        progreso: 0,
        oculto: 0,
      };
  
      // Crear el nuevo evento usando async/await
      const evento = await Eventos.create(newEvento);
  
      res.send(evento);
    } catch (err) {
      console.error('Error al crear el evento:', err);
      res.status(500).json({ error: 'No se ha podido registrar el evento.' });
    }
  };

/** @function loadEvento */
// Load the specific elements for Eventos in mongo.

exports.loadEvento = async (req, res, next) => {
    try {
        const eventoData = {
            id_estudiante: req.body.id_estudiante,
        };

        const evento = await Eventos.findOne({ id_estudiante: eventoData.id_estudiante });

        if (evento){
            const idEventoNumerico = evento.id_evento;
            //console.log('El id numerico es: ' + idEventoNumerico);
            //console.log('El id de evento es: ' + evento.id_evento);
            console.log(evento);
        } else {
            return res.status(404).send({ message: 'Evento no encontrado :(' });
        }

        res.send(evento);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
exports.allEventos = async (req, res, next) => {
    try {
        const eventStudents = await Eventos.find();

        if (!eventStudents || eventStudents.length === 0) {
            return res.status(404).send({ message: 'No se encontraron eventos' });
        }

        res.send(eventStudents);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

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

        // Actualiza el evento con el id_evento especificado
        const resultado = await Eventos.updateOne({ id_evento: eventoData.id_evento }, { $set: eventoNewData });

        // Verifica si se actualizó algún documento
        if (resultado.nModified === 0) {
            return res.status(404).json({ mensaje: 'Evento no encontrado o no modificado' });
        }

        res.json({ mensaje: 'Evento Actualizado' });
    } catch (err) {
        console.error(err); 
        res.status(500).send('Error del Servidor');
    }
};
exports.uploadEstadoEvento = async (req, res) => {
    try {
        const eventoData = {
            id_evento: req.body.id_evento
        };

        const eventoNewData = {
            oculto: req.body.oculto
        };

        const resultado = await Eventos.updateOne({ id_evento: eventoData.id_evento }, { $set: eventoNewData });

        if (resultado.nModified === 0) {
            return res.status(404).json({ mensaje: 'Evento no encontrado o no modificado' });
        }

        res.json({ mensaje: 'Estado del Evento Actualizado' });
    } catch (err) {
        console.error(err); 
        res.status(500).send('Error del Servidor');
    }
};

exports.deleteEvento = async (req, res, next) => {
    try {
      const idEvento = req.params.id;
  
      const eventoEliminado = await Eventos.findOneAndDelete({ id_evento: idEvento });
  
      if (!eventoEliminado) {
        return res.status(404).send({ message: 'Evento no encontrado' });
      }
  
      res.send({ message: 'Evento eliminado exitosamente :D', evento: eventoEliminado });
    } catch (error) {
      // Maneja cualquier error que ocurra durante la eliminación.
      console.error('Error al eliminar el evento :( :', error);
      return res.status(500).send('Server Error');
    }
  };

  /** @function uploadEventoActual */
// Upload specific elements for Eventos in MongoDB.

exports.uploadEventoActual = async (req, res) => {
    try {
        const eventoData = {
            id_actividad: req.body.id_actividad,
            id_estudiante: req.body.id_estudiante,
        };

        const paso = parseInt(req.body.paso);

        const eventoNewData = {
            check_a1: req.body.check_a1,
            check_a2: req.body.check_a2,
            check_a3: req.body.check_a3,
            check_Ea1: req.body.check_Ea1,
            check_Ea2: req.body.check_Ea2,
            check_Ea3: req.body.check_Ea3
        };

        // Llama a la función getEventoConMayorCount directamente
        const eventoMayorCount = await EventoConMayorCount(eventoData.id_actividad, eventoData.id_estudiante);

        let mensajeRespuesta = '';

        const fechaActual = new Date();
        const fecha = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;
        const hora = `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

        switch (paso) {
            case 1:
                // Paso 1: Elegir una actividad, cuando decide entrar a práctica en casa
                // check_video // count_video // progreso //
                console.log('Estoy en el switch paso 1');

                eventoMayorCount.check_video = 1;
                eventoMayorCount.count_video += 1;
                if (eventoMayorCount.progreso === 0) {
                    eventoMayorCount.progreso = 0.333;
                }

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos check_video, count_video y progreso actualizados correctamente.';
                break;

            case 2:
                // Paso 2: Cuando está en la pantalla de práctica en casa, puede descargar el vídeo
                // check_download // data_end // hour_end //
                console.log('Estoy en el switch paso 2');

                eventoMayorCount.check_download = 1;
                eventoMayorCount.data_end = fecha;
                eventoMayorCount.hour_end = hora;

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos check_download, hour_end y progreso actualizados correctamente.';
                break;

            case 3:
                // Paso 3: Cuando termina de ver el vídeo y responde el test
                // check_answer // data_end // hour_end //
                console.log('Estoy en el switch paso 3');

                eventoMayorCount.check_answer = 1;
                eventoMayorCount.data_end = fecha;
                eventoMayorCount.hour_end = hora;

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos check_answer, hour_end y progreso actualizados correctamente.';
                break;

            case 4:
                // Paso 3: Cuando termina de ver el vídeo y responde el test
                // check_answer // data_end // hour_end //

                console.log('Estoy en el switch paso 4');

                eventoMayorCount.check_document = 1;
                if (eventoMayorCount.progreso === 0.333) {
                    eventoMayorCount.progreso = 0.666;
                }
                eventoMayorCount.data_end = fecha;
                eventoMayorCount.hour_end = hora;

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos check_document, progreso, hour_end y progreso actualizados correctamente.';
                break;

            case 5:
                // Paso 5: Respuestas del quiz
                // check_a1 // check_a2 // check_a3 //

                console.log('Estoy en el switch paso 5');

                eventoMayorCount.check_a1 = eventoNewData.check_a1;
                eventoMayorCount.check_a2 = eventoNewData.check_a2;
                eventoMayorCount.check_a3 = eventoNewData.check_a3;
                eventoMayorCount.data_end = fecha;
                eventoMayorCount.hour_end = hora;

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos check_a1, check_a2 y check_a3 actualizados correctamente.';
                break;

            case 6:
                // Paso 6: Actualizar campos check_Ea1, check_Ea2 y check_Ea3
                // check_Ea1 // check_Ea2 // check_Ea3 //

                console.log('Estoy en el switch paso 6');

                eventoMayorCount.check_Ea1 = req.body.check_Ea1;
                eventoMayorCount.check_Ea2 = req.body.check_Ea2;
                eventoMayorCount.check_Ea3 = req.body.check_Ea3;
                eventoMayorCount.data_end = fecha;
                eventoMayorCount.hour_end = hora;

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos check_Ea1, check_Ea2 y check_Ea3 actualizados correctamente.';
                break;

            case 7:
                // Paso 7: Revisar el perfil
                // check_profile // data_end // hour_end //
                console.log('Estoy en el switch paso 7');

                eventoMayorCount.check_profile = 1;
                eventoMayorCount.data_end = fecha;
                eventoMayorCount.hour_end = hora;

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos check_profile, hour_end y progreso actualizados correctamente.';
                break;

            case 8:
                // Paso 8: Finalizar actividad
                // check_profile // data_end // hour_end //
                console.log('Estoy en el switch paso 8');

                eventoMayorCount.check_fin = 1;
                eventoMayorCount.progreso = 1;
                eventoMayorCount.data_end = fecha;
                eventoMayorCount.hour_end = hora;

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos check_fin, progreso, hour_end y data_end actualizados correctamente.';
                break;

            default:
                mensajeRespuesta = 'Paso diferente a los registrados, no se realizó ninguna actualización :D';
                break;
        }

        res.json({ mensaje: mensajeRespuesta });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del Servidor');
    }
};

//exports.uploadEventoActual = async (req, res) => {

exports.progreso = async (req, res) => {
    try {
        const id_estudiante = req.body.id_estudiante; // Extrae el id_estudiante del cuerpo de la solicitud

        // Primero, busca todos los eventos con el mismo id_estudiante
        const eventosPorEstudiante = await Eventos.find({ id_estudiante }); // Usa la variable id_estudiante en la consulta

        if (!eventosPorEstudiante || eventosPorEstudiante.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron eventos para este estudiante' });
        }

        // Se crea un nuevo mapa llamado eventosAgrupados para almacenar los eventos agrupados. Un mapa es una estructura de datos que permite asociar claves (en este caso, id_actividad) con valores (eventos).
        const eventosAgrupados = new Map();

        for (const evento of eventosPorEstudiante) {
            if (!eventosAgrupados.has(evento.id_actividad)) {
                eventosAgrupados.set(evento.id_actividad, evento);
            } else {
                // Si ya hay un evento con esta id_actividad, compara el count y actualiza si es mayor
                const eventoExistente = eventosAgrupados.get(evento.id_actividad);
                if (evento.count > eventoExistente.count) {
                    eventosAgrupados.set(evento.id_actividad, evento);
                }
            }
        }

        // Convierte el mapa en un array de eventos únicos
        const eventosUnicos = Array.from(eventosAgrupados.values());

        res.json(eventosUnicos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del Servidor');
    }
};

/*exports.progreso = async (req, res) => {
    try {
        const id_actividad = req.body.id_actividad;
        const id_estudiante = req.body.id_estudiante;

        // Busca todos los eventos que tengan el mismo id_actividad e id_estudiante
        const eventos = await Eventos.find({ id_actividad, id_estudiante });

        if (!eventos || eventos.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron eventos para esta actividad y estudiante' });
        }

        // Encuentra el evento con el valor de 'count' más alto
        let eventoConMayorCount = eventos[0];
        for (let i = 1; i < eventos.length; i++) {
            if (eventos[i].count > eventoConMayorCount.count) {
                eventoConMayorCount = eventos[i];
            }
        }

        res.json({ evento: eventoConMayorCount });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del Servidor');
    }
};*/

//id_evento	fecha	id_actividad	id_estudiante
//check_download	check_inicio	check_fin
//check_answer	count_video	check_video
