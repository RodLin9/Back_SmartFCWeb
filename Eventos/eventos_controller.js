const Eventos = require('./eventos_dao');
const ActivitiesController = require('../activities/activities_controller');

var async = require('express-async-await')
const fetch = require('node-fetch');

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
        //console.log('Evento con mayor count encontrado:', eventoConMayorCount);
        return eventoConMayorCount;
    } catch (err) {
        console.error(err);
        return null; // O maneja el error de alguna otra manera apropiada
    }
};

async function createEventoFunction(id_actividad, id_estudiante) {
    try {
        // Obtén la fecha y hora actuales
        const fechaActual = new Date();
        const fecha = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;
        const hora = `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

        // Obtén el último valor de ID de evento en la base de datos
        const currentCount = await getCurrentEventCount() + 1;

        // Incrementa el contador
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
                    eventoCounter++;
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

        // Crea un nuevo evento con los valores necesarios
        const newEvento = {
            id_evento: id_evento,
            count: count,
            data_start: fecha,
            hour_start: hora,
            data_end: null,
            hour_end: null,
            id_actividad: id_actividad, // Usa el id_actividad proporcionado como argumento
            id_estudiante: id_estudiante, // Usa el id_estudiante proporcionado como argumento
            check_download: 0,
            check_inicio: 1,
            check_fin: 0,
            check_answer: null,
            count_video: 0,
            check_video: null,
            check_document: null,
            check_a1: "",
            check_a2: "",
            check_a3: "",
            score_a: 0,
            state_a : 0,
            check_profile: 0,
            check_Ea1: "",
            check_Ea2: "",
            check_Ea3: "",
            score_Ea: 0,
            state_Ea: 0,
            progreso: 0,
            oculto: 0,
        };

        const evento = await Eventos.create(newEvento);

        return evento;
    } catch (err) {
        console.error('Error al crear el evento:', err);
        throw err; // Asegúrate de manejar los errores adecuadamente en el lugar donde llames a esta función
    }
}

async function obtenerEventos(id_estudiante) {
    try {
        const eventStudents = await Eventos.find({ id_estudiante });

        return eventStudents;
    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener eventos');
    }
}

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
        check_fin: 0,
        check_answer: null,
        count_video: 0,
        check_video: null,
        check_document: null,
        check_a1: "",
        check_a2: "",
        check_a3: "",
        score_a: 0,
        state_a: 0,
        check_profile: 0,
        check_Ea1: "",
        check_Ea2: "",
        check_Ea3: "",
        score_Ea: 0,
        state_Ea: 0,
        progreso: 0,
        oculto: 0,
      };
  
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
            a_score: req.body.a_score,
            check_profile: req.body.check_profile,
            check_Ea1: req.body.check_Ea1,
            check_Ea2: req.body.check_Ea2,
            check_Ea3: req.body.check_Ea3,
            Ea_score: req.body.Ea_score,
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

        const comparar = eventoData.id_actividad;

        const paso = parseInt(req.body.paso);

        const eventoNewData = {
            check_a1: req.body.check_a1,
            check_a2: req.body.check_a2,
            check_a3: req.body.check_a3,
            score_a: req.body.score_a,
            check_Ea1: req.body.check_Ea1,
            check_Ea2: req.body.check_Ea2,
            check_Ea3: req.body.check_Ea3,
            score_Ea: req.body.score_Ea
        };

        // Llama a la función getEventoConMayorCount directamente
        let eventoMayorCount = await EventoConMayorCount(eventoData.id_actividad, eventoData.id_estudiante);

        let mensajeRespuesta = '';

        const fechaActual = new Date();
        const fecha = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;
        const hora = `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;

        /*if (!eventoMayorCount) {
            console.log('Estoy en el if de eventoMayorCount')
            eventoMayorCount = await createEventoFunction(eventoData.id_actividad, eventoData.id_estudiante);
        }*/

        switch (paso) {
            case 1:
                // Paso 1: Elegir una actividad, cuando decide entrar a práctica en casa
                // check_video // count_video // progreso //
                console.log('Estoy en el switch paso 1');

                eventoMayorCount.check_video = 1;
                eventoMayorCount.count_video += 1;
                if (eventoMayorCount.progreso === 0) {
                    eventoMayorCount.progreso = 33;
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
                if (eventoMayorCount.progreso === 33) {
                    eventoMayorCount.progreso = 66;
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

                eventoMayorCount.check_a1 = req.body.check_a1 || null;
                eventoMayorCount.check_a2 = req.body.check_a2 || null;
                eventoMayorCount.check_a3 = req.body.check_a3 || null;
                eventoMayorCount.score_a = req.body.score_a || 0;
                eventoMayorCount.data_end = fecha;
                eventoMayorCount.hour_end = hora;

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos score_a, check_a1, check_a2 y check_a3 actualizados correctamente.';
                break;

            case 6:
                // Paso 6: Actualizar campos check_Ea1, check_Ea2 y check_Ea3
                // check_Ea1 // check_Ea2 // check_Ea3 //

                console.log('Estoy en el switch paso 6');

                eventoMayorCount.check_Ea1 = req.body.check_Ea1 || null;
                eventoMayorCount.check_Ea2 = req.body.check_Ea2 || null;
                eventoMayorCount.check_Ea3 = req.body.check_Ea3 || null;
                eventoMayorCount.score_Ea = req.body.score_Ea || 0;
                eventoMayorCount.check_fin = 1;
                eventoMayorCount.progreso = 100;
                eventoMayorCount.data_end = fecha;
                eventoMayorCount.hour_end = hora;

                await eventoMayorCount.save();

                mensajeRespuesta = 'Campos check_fin, score_Ea, progreso, check_Ea1, check_Ea2 y check_Ea3 actualizados correctamente.';
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
                // Paso 8: Realizar un recorrido por todos los eventos
                // y actualizar el valor check_inicio o crear un nuevo evento

                console.log('Estoy en el switch paso 8');

                // Obtener todos los eventos del estudiante
                const eventosEstudiante = await obtenerEventos(eventoData.id_estudiante);

                //console.log('eventosEstudiante:', eventosEstudiante);

                // Inicializa eventoExistente como 0
                let eventoExistente = 0;

                for (const evento of eventosEstudiante) {
                    if (parseInt(evento.id_actividad) === parseInt(comparar)) {
                        eventoExistente = 1;
                        break;
                    }
                }

                console.log('eventoExistente: ', eventoExistente);

                if (eventoExistente === 1) {
                    // Si el evento existe, aumenta check_inicio en 1
                    eventoMayorCount.check_inicio += 1;

                    await eventoMayorCount.save();
                    console.log('check_inicio incrementado en 1');
                    mensajeRespuesta = 'check_inicio incrementado en 1 en el evento existente.';
                } else {
                    // Si el evento no existe, crea uno nuevo
                    eventoMayorCount = await createEventoFunction(eventoData.id_actividad, eventoData.id_estudiante);
                    console.log('Nuevo evento creado');
                    mensajeRespuesta = 'Se ha creado un nuevo evento con check_inicio en 1.';
                }

                break;

            case 9:
                // Paso 9: Estado para el test
                // state_a //

                console.log('Estoy en el switch paso 9');
                if (eventoMayorCount.state_a === 0) {
                    eventoMayorCount.state_a = 1;
                    await eventoMayorCount.save();
                    mensajeRespuesta = 'Recuerda que una vez ingreses al test, debes terminarlo y no podrás realizarlo nuevamente.';
                } else {
                    mensajeRespuesta = 'El test ya ha sido respondido.';
                }
                break;

            case 10:
                // Paso 10: Estado para la evaluación
                // state_Ea //

                console.log('Estoy en el switch paso 10');

                if (eventoMayorCount.state_Ea === 0) {
                    eventoMayorCount.state_Ea = 1;
                    await eventoMayorCount.save();
                    mensajeRespuesta = 'Recuerda que una vez ingreses a la evaluación, debes terminarla y no podrás realizarla nuevamente.';
                } else {
                    mensajeRespuesta = 'La evaluación ya ha sido respondida.';
                }
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

  /** @function loadUltimoEvento */
// Upload specific elements for Eventos in MongoDB.

exports.loadUltimoEvento = async (req, res) => {
    try {
        const id_actividad = req.body.id_actividad;
        const id_estudiante = req.body.id_estudiante;

        console.log('El id_actividad que llego es', id_actividad);
        console.log('El id_estudiante que llego es', id_estudiante);


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

        res.json([eventoConMayorCount]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del Servidor');
    }
};

  /** @function progreso */
// Upload specific elements for Eventos in MongoDB.

exports.progreso = async (req, res) => {
    try {
        const id_estudiante = req.body.id_estudiante;

        const eventosPorEstudiante = await Eventos.find({ id_estudiante });

        if (!eventosPorEstudiante || eventosPorEstudiante.length === 0) {
            return res.status(404).json({ mensaje: 'Debes empezar una actividad primero para poder ver tu progreso' });
        }

        const eventosAgrupados = new Map();

        for (const evento of eventosPorEstudiante) {
            if (!eventosAgrupados.has(evento.id_actividad)) {
                eventosAgrupados.set(evento.id_actividad, evento);
            } else {
                const eventoExistente = eventosAgrupados.get(evento.id_actividad);
                if (evento.count > eventoExistente.count) {
                    eventosAgrupados.set(evento.id_actividad, evento);
                }
            }
        }

        const eventosUnicos = Array.from(eventosAgrupados.values());

        // Obtén el título de la actividad para cada evento en el nuevoArray
        const nuevoArray = await Promise.all(eventosUnicos.map(async (evento) => {
            const id_actividad = evento.id_actividad;
            console.log('El id_actividad dentro de progreso es: ', id_actividad);
            const titulo_actividad = await ActivitiesController.tituloActivity(id_actividad);
            return {
                //id_evento: evento.id_evento,
                count: evento.count,
                titulo_actividad,
                score_a: evento.score_a || 0,
                score_Ea: evento.score_Ea || 0,
                score_actividad: (evento.score_a + evento.score_Ea)/2 || 0,
                progreso: evento.progreso || 0
            };
        }));

        res.json(nuevoArray);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error del Servidor');
    }
};

//const ActivitiesController = require('../activities/activities_controller');



//id_evento	fecha	id_actividad	id_estudiante
//check_download	check_inicio	check_fin
//check_answer	count_video	check_video
