const Duda = require('./dudas_dao');
//const Secuencia = require('../secuencia_model');

/** @function createDuda */
// Create the specific elements for Duda in mongo. 

/*async function generarIdDuda() {
    const secuencia = await Secuencia.findOneAndUpdate(
        { nombre: 'id_duda' }, // Nombre de la secuencia para id_duda
        { $inc: { valor: 1 } },
        { upsert: true, new: true }
    );

    return secuencia.valor;
}*/

let dudaCounter = 0;
let id_duda = 0;

/** @function getCurrentDudaCount */
// Obtiene el número actual de dudas en mongo
async function getCurrentDudaCount() {
  const currentCount = await Duda.countDocuments();
  //console.log('El número total de dudas es:', currentCount);
  return currentCount;
}

/** @function createDuda */
// Crea los elementos específicos para las dudas en mongo.
exports.createDuda = async (req, res, next) => {
  let x = 0;
  try {
    const requiredFields = ['id_actividad', 'id_estudiante', 'pregunta'];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `El campo '${field}' no puede estar vacío.` });
      }
    }

    const id_actividad = req.body.id_actividad;
    // console.log('El id_actividad es: ' + id_actividad);

    const currentCount = await getCurrentDudaCount(); // Obtener el número actual de dudas

    dudaCounter = currentCount + 1;

    id_duda = parseInt(`${id_actividad}${dudaCounter}`);
    // console.log('El id_duda es: ' + id_duda);

    let isUnique = false;

    while (!isUnique) {
      const existingDuda = await Duda.findOne({ id_duda: id_duda }); // Consultar si ya existe una duda con el mismo id_duda
      // x = x + 1;
      // console.log('Número de veces en el while', x);

      if (existingDuda) {
        dudaCounter++; // Si el id_duda ya existe, incrementa dudaCounter y vuelve a intentar
        id_duda = parseInt(`${id_actividad}${dudaCounter}`);
      } else {
        isUnique = true;
      }
    }

    const newDuda = {
      id_duda: id_duda,
      id_actividad: req.body.id_actividad,
      id_estudiante: req.body.id_estudiante,
      pregunta: req.body.pregunta,
      respuesta: "",
      estado_duda: 0,
    };

    const duda = await Duda.create(newDuda);
    console.log('Duda creada exitosamente:', duda);
    res.status(201).json({ duda: duda });
  } catch (err) {
    console.error('Error al crear la duda:', err);
    res.status(500).json({ error: 'No se ha podido crear la duda.' });
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
