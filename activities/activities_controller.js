const Activities = require('./activities_dao');

/** @function createActivity */
// Create the specific elements for activity in mongo. 

//TODO: Borrar esto de crear actividad y comentarios

exports.createActivity = async (req, res, next) => {
    const newActivities = {
        id_actividad: req.body.id_actividad,
        cont: req.body.cont,
        id_colegio: req.body.id_colegio,
        id_docente: req.body.id_docente,
        id_materia: req.body.id_materia,
        id_grado: req.body.id_grado,
        id_materiaActiva: req.body.id_materiaActiva,
        id_competencia: req.body.id_competencia,
        titulo_actividad: req.body.titulo_actividad,
        descripcion_actividad: req.body.descripcion_actividad,
        id_contenidoREA: req.body.id_contenidoREA,
        video: req.body.video,
        urlvideo: req.body.urlvideo,
        documento: req.body.documento,
        urldocumento: req.body.urldocumento,
        audio: req.body.audio,
        urlaudio: req.body.urlaudio,
        html: req.body.html,
        urlhtml: req.body.urlhtml,
        id_taller: req.body.id_taller,
        taller: req.body.taller,
        urltaller: req.body.urltaller,
        descripcion_test: req.body.descripcion_test,
        Q1: req.body.Q1,
        A11: req.body.A11,
        A12: req.body.A12,
        A13: req.body.A13,
        A14: req.body.A14,
        CA1: req.body.CA1,
        Q2: req.body.Q2,
        A21: req.body.A21,
        A22: req.body.A22,
        A23: req.body.A23,
        A24: req.body.A24,
        CA2: req.body.CA2,
        Q3: req.body.Q3,
        A31: req.body.A31,
        A32: req.body.A32,
        A33: req.body.A33,
        A34: req.body.A34,
        CA3: req.body.CA3,
        evaluacion: req.body.evaluacion,
        descripcion_evaluacion: req.body.descripcion_evaluacion,
        EQ1: req.body.EQ1,
        EA11: req.body.EA11,
        EA12: req.body.EA12,
        EA13: req.body.EA13,
        EA14: req.body.EA14,
        ECA1: req.body.ECA1,
        EQ2: req.body.EQ2,
        EA21: req.body.EA21,
        EA22: req.body.EA22,
        EA23: req.body.EA23,
        EA24: req.body.EA24,
        ECA2: req.body.ECA2,
        EQ3: req.body.EQ3,
        EA31: req.body.EA31,
        EA32: req.body.EA32,
        EA33: req.body.EA33,
        EA34: req.body.EA34,
        ECA3: req.body.ECA3,
        autor: req.body.autor,
        id_autor: req.body.id_autor
    };

    try {
        const activity = await Activities.create(newActivities);
        res.send({ activity });
    } catch (err) {
        console.error(err); // Imprime el error en la consola para facilitar el seguimiento

        if (err.name === "ValidationError") {
            // Manejo de errores de validación de Mongoose
            return res.status(400).json({ message: "Datos de actividad no válidos" });
        }

        // Otros tipos de errores
        res.status(500).json({ message: "Error al crear la actividad" });
    }
};

    /*try {
      const activity = await Activities.create(newActivities);
      res.send({ activity });
    } catch (err) {
      res.json({ Estado: "Error Crear Actividad" });
    }
  };*/

/** @function loadActivity */
// Load the specific elements for activity in mongo. 

exports.loadActivity = async (req, res, next) => {
    const activityData = {
        id_actividad: req.body.id_actividad,
    };

    try {
        const activity = await Activities.findOne({
            id_actividad: activityData.id_actividad,
        });

        if (!activity) {
            return res.status(409).send({ message: "Actividad no encontrada" });
        }
        //res.send({ activity });
        res.send([activity]); // Envía el objeto activity dentro de un array
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

/** @function allActivities */
// Load all activities of mongo. 

exports.allActivities = async (req, res, next) => {
    try {
        const activities = await Activities.find();

        if (!activities) {
            return res.status(409).send({ message: "Actividades no encontradas" });
        }

        res.send(activities);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

/** @function uploadActivity */
// Update activity of mongo for app web. 
exports.uploadActivity = async (req, res) => {
    const activityData = {
      id_actividad: req.body.id_actividad,
    };
  
    const activityNewData = {
      id_colegio: req.body.id_colegio,
      id_docente: req.body.id_docente,
      id_materia: req.body.id_materia,
      id_competencia: req.body.id_competencia,
      titulo_actividad: req.body.titulo_actividad,
      descripcion_actividad: req.body.descripcion_actividad,
      id_grado: req.body.id_grado,
      id_materiaActiva: req.body.id_materiaActiva,
      id_contenidoREA: req.body.id_contenidoREA,
      video: req.body.video,
      urlvideo: req.body.urlvideo,
      documento: req.body.documento,
      urldocumento: req.body.urldocumento,
      audio: req.body.audio,
      urlaudio: req.body.urlaudio,
      html: req.body.html,
      urlhtml: req.body.urlhtml,
      id_taller: req.body.id_taller,
      taller: req.body.taller,
      urltaller: req.body.urltaller,
      descripcion_test: req.body.descripcion_test,
      Q1: req.body.Q1,
      A11: req.body.A11,
      A12: req.body.A12,
      A13: req.body.A13,
      A14: req.body.A14,
      CA1: req.body.CA1,
      Q2: req.body.Q2,
      A21: req.body.A21,
      A22: req.body.A22,
      A23: req.body.A23,
      A24: req.body.A24,
      CA2: req.body.CA2,
      Q3: req.body.Q3,
      A31: req.body.A31,
      A32: req.body.A32,
      A33: req.body.A33,
      A34: req.body.A34,
      CA3: req.body.CA3,
      evaluacion: req.body.evaluacion,
      descripcion_evaluacion: req.body.descripcion_evaluacion,
      EQ1: req.body.EQ1,
      EA11: req.body.EA11,
      EA12: req.body.EA12,
      EA13: req.body.EA13,
      EA14: req.body.EA14,
      ECA1: req.body.ECA1,
      EQ2: req.body.EQ2,
      EA21: req.body.EA21,
      EA22: req.body.EA22,
      EA23: req.body.EA23,
      EA24: req.body.EA24,
      ECA2: req.body.ECA2,
      EQ3: req.body.EQ3,
      EA31: req.body.EA31,
      EA32: req.body.EA32,
      EA33: req.body.EA33,
      EA34: req.body.EA34,
      ECA3: req.body.ECA3,
    };
  
    try {
      await Activities.updateOne(
        { id_actividad: activityData.id_actividad }, //se utiliza para identificar el documento específico que se actualizará.
        { $set: activityNewData }, //para especificar los nuevos valores de los campos que se desean actualizar en un documento de la colección Activities.
        { new: true } //especifica que se debe devolver el documento actualizado.
      );
  
      res.json({ status: "Actividad Actualizada" });
    } catch (err) {
      res.status(500).json({ error: "Server Error" });
    }
  };

/** @function updloadSectionsActivity */
// Update activity of mongo for app web. 

exports.uploadSectionsActivity = async (req, res) => {
    const activityData = {
        id_actividad: req.body.id_actividad, //Id de la actividad que se va a actualizar
    }
    const activityNewData = { 
        taller: req.body.taller, //los nuevos valores de las secciones de la actividad: Taller y evaluación
        evaluacion: req.body.evaluacion //Estos valores se obtienen del cuerpo de la solicitud, pasar por POSTMAN
    }
    try {
        await Activities.updateOne( //Actualizar el documento de la actividad en la colección Activities
            { id_actividad: activityData.id_actividad }, //Qué documento se debe actualizar
            { $set: activityNewData }, //$set para especificar los nuevos valores de taller y evaluación
            { new: true } //Se debe devolver el documento actualizado
        );
        return res.json({ status: 'Seccion de la Actividad Actualizada' });
    } catch (err) {
        return res.status(500).send('Server Error');
    }
}

exports.deleteActivity = async (req, res) => {
    const activityData = {
        id_actividad: req.body.id_actividad
    }
    try {
        await Activities.deleteOne({ id_actividad: activityData.id_actividad });
        return res.json({ Estado: 'Actividad Eliminada' });
    } catch (err) {
        return res.status(500).send('Server Error');
    }
}

/** @function loadURLvideo */
// Load the URLvideo from activity of mongo for app web. 

exports.loadURLvideo = async (req, res, next) => {
    const activityData = {
      id_actividad: req.body.id_actividad,
    };
  
    try {
      const activity = await Activities.findOne({
        id_actividad: activityData.id_actividad,
      });
  
      if (!activity) {
        return res.status(409).send({ message: "Actividad no encontrada" });
      }
  
      const ipAddress = process.env.IP_ADDRESS_2; // Obtener la dirección IP
  
      // Extraer la parte deseada de la URL eliminando la duplicación
      const urlvideoSinDuplicacion = activity.urlvideo.replace('http://localhost:3000/public/repositorio/', '');
  
      // Construir la nueva URL completa con la dirección IP y la parte extraída
      const nuevaURLvideo = `http://${ipAddress}:3000/repositorio/${urlvideoSinDuplicacion}`;
  
      // Actualizar la URL en el objeto activity
      activity.urlvideo = nuevaURLvideo;
  
      // Enviar el objeto activity modificado como respuesta
      res.send(activity);
  
    } catch (err) {
      res.status(500).send("Server Error");
    }
  };

/** @function loadActivityByMateriaId */
// Load activity of mongo for app web by Materia activa Id. 

exports.loadActivityByMateriaId = async (req, res, next) => {
    const activityData = {
        id_materiaActiva: req.body.id_materiaActiva,
    };

    try {
        const activity = await Activities.findOne({
            id_materiaActiva: activityData.id_materiaActiva,
        });

        if (!activity) {
            return res.status(409).send({ message: "No se encontró la actividad por id_materiaActiva" });
        }

        //res.send({ activity });
        res.send([activity]); // Actividad dentro de un array

    } catch (err) {
        res.status(500).send("Server Error");
    }
};
