const Duda = require('./dudas_dao');

/** @function createDuda */
// Create the specific elements for Duda in mongo. 

exports.createDuda = async (req, res, next)=>{
    const newDuda = {
        id_duda: req.body.id_duda,
        id_actividad: req.body.id_actividad,
        id_estudiante: req.body.id_estudiante,
        pregunta: req.body.pregunta,
        respuesta: req.body.respuesta,
        estado_duda: req.body.estado_duda
    }
    console.log(newDuda);

    try{
        const duda = await Duda.create(newDuda);
        res.send({ duda });
    } catch {
        res.status(500).send('Server error');
    }
}

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
        res.send({ duda });
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
        Duda.find({ id_estudiante: dudaData.id_estudiante }).exec();
        if (!duda) {
            return res.status(409).send('Something error')
        }
        res.send({ duda });
    } catch {
        return res.status(500).send('Server error')
    }
}

/* find() se utiliza cuando se desea buscar varios documentos que cumplan con ciertos criterios y se espera obtener un array de resultados. Por ejemplo, si deseas obtener TODAS las dudas de un estudiante en particular, puedes utilizar find() para buscar todas las dudas que coincidan con el ID del estudiante y obtener un array con todas esas dudas.
findOne() se utiliza cuando se desea buscar un único documento que cumpla con ciertos criterios y se espera obtener un solo resultado. Por ejemplo, si deseas obtener una única duda en base a su ID, puedes utilizar findOne() para buscar la primera duda que coincida con ese ID y obtener ese único resultado. */

/** @function allDudas */
// Load all the specific elements for Duda in mongo. 

//Esta retorna todaaaas las dudas en mongo! No creo que se use, BORRAR... 

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
