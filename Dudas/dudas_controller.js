const Duda = require('./dudas_dao');
//const Secuencia = require('../secuencia_model');

/** @function createDuda */
// Create the specific elements for Duda in mongo. 

async function generarIdDuda() {
    const secuencia = await Secuencia.findOneAndUpdate(
        { nombre: 'id_duda' }, // Nombre de la secuencia para id_duda
        { $inc: { valor: 1 } },
        { upsert: true, new: true }
    );

    return secuencia.valor;
}

exports.createDuda = async (req, res, next) => {
    try {
      // Paso 1: Consulta el documento con el id_duda más alto
      const lastDuda = await Duda.findOne({}, { id_duda: 1 }).sort({ id_duda: -1 });
  
      // Paso 2: Obtiene el valor del id_duda más alto o usa 0 si no hay dudas existentes
      const lastIdDuda = lastDuda ? lastDuda.id_duda : 0;
  
      // Paso 3: Calcula el nuevo id_duda sumando 1 al último valor
      const newIdDuda = lastIdDuda + 1;
  
      const newDuda = {
        id_duda: newIdDuda,
        id_actividad: req.body.id_actividad,
        id_estudiante: req.body.id_estudiante,
        pregunta: req.body.pregunta,
        respuesta: "",
        estado_duda: 0,
      };
  
      const duda = await Duda.create(newDuda);
      res.send({ message: "Duda creada exitosamente", duda });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
/** @function loadDuda */
// Load the specific elements for Duda in mongo. 

exports.loadDuda = async (req, res, next) => {
    const dudaData = {
        id_duda: req.body.id_duda,
    }
    try {
        const duda = await Duda.findOne({ id_duda: dudaData.id_duda });
        if (!duda) {
            return res.status(409).send({ message: 'Something error' });
        }
        //res.send({ duda });
        res.send([duda]);

    } catch (err) {
        return res.status(500).send('Server Error')
    }
}


/** @function loadDudaStudent */
// Load the specific elements for Duda in mongo. 

exports.loadDudaStudent = async (req, res, next) => {
    const dudaData = {
        id_estudiante: req.body.id_estudiante
    }

    try {
        const dudas = await Duda.find({ id_estudiante: dudaData.id_estudiante }).exec();
        if (!dudas || dudas.length === 0) {
            return res.status(409).send('El estudiante no tiene dudas');
        }
        res.send(dudas);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error del servidor');
    }
}

/* find() se utiliza cuando se desea buscar varios documentos que cumplan con ciertos criterios y se espera obtener un array de resultados. Por ejemplo, si deseas obtener TODAS las dudas de un estudiante en particular, puedes utilizar find() para buscar todas las dudas que coincidan con el ID del estudiante y obtener un array con todas esas dudas.
findOne() se utiliza cuando se desea buscar un único documento que cumpla con ciertos criterios y se espera obtener un solo resultado. Por ejemplo, si deseas obtener una única duda en base a su ID, puedes utilizar findOne() para buscar la primera duda que coincida con ese ID y obtener ese único resultado. */

/** @function allDudas */
// Load all the specific elements for Duda in mongo. 

//FIXME: Esta retorna todaaaas las dudas en mongo! No creo que se use, BORRAR... 

exports.allDudas = async (req, res, next) => {
    try {
      const dudas = await Duda.find().exec();
      if (!dudas) {
        return res.status(409).send({ message: 'Something Error' });
      }
      res.send(dudas);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

/** @function uploadRespuestaDuda */
// Upload the specific elements for Duda in mongo. 

/* exports.uploadRespuestaDuda = async (req, res) => {
    const dudaData = {
        id_duda: req.body.id_duda
    }
    const dudaNewData = {
        respuesta: req.body.respuesta,
        estado_duda: req.body.estado_duda
    }
    await Duda.updateOne({id_duda: dudaData.id_duda}, {$set: dudaNewData});
    res.json({status: 'Informacion Duda Actualizado'});
} */
/** @function uploadEstadoDuda */
// Upload the specific elements for Duda in mongo. 

/*exports.uploadEstadoDuda = async (req, res) => {
    const dudaData = {
        id_duda: req.body.id_duda
    }
    const dudaNewData = {
        estado_duda: req.body.estado_duda
    }
    await Duda.updateOne({id_duda: dudaData.id_duda}, {$set: dudaNewData});
    res.json({status: 'Informacion Duda Actualizada'});
}*/
/** @function deleteDuda */
// Delete the specific elements for Duda in mongo. 

exports.deleteDuda = async (req, res) => {
    const dudaData = {
        id_duda: req.body.id_duda
    };

    try {
        await Duda.deleteOne({ id_duda: dudaData.id_duda });
        res.json({ Estado: 'Duda Eliminada' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
};
