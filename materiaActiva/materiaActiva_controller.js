const SubjectActive = require('./materiaActiva_dao');
/** @function createSubjectActive */
// Create the specific elements for Subject in mongo. 

//TODO: Quitar los comentarios, según se quiera dejar las resp en array o no

exports.createSubjectActive = async (req, res, next) => {
    try {
        const newSubjectActive = {
            id_materiaActiva: req.body.id_materiaActiva,
            count: req.body.count,
            nombre_materiaActiva: req.body.nombre_materiaActiva,
            id_materia: req.body.id_materia,
            id_grado: req.body.id_grado,
            id_docente: req.body.id_docente,
            id_colegio: req.body.id_colegio,
            url_imagen: req.body.url_imagen,
        };
        //console.log(newSubjectActive);
        const subjectActive = await SubjectActive.create(newSubjectActive);
        res.json({ Estado: "Materia Activa Creada" });
    } catch (err) {
        res.status(500).json({ Estado: "Error Crear Materia Activa" });
    }
};

/** @function loadSubjectActive */
// Load the specific elements for Subject in mongo. 

/*exports.loadSubjectActive = async (req, res, next) => {
    try {
        const subjectActiveData = {
            id_materiaActiva: req.body.id_materiaActiva,
        };

        const subjectActive = await SubjectActive.findOne({
            id_materiaActiva: subjectActiveData.id_materiaActiva,
        });

        if (!subjectActive) {
            return res.status(409).send({ message: "Something Error" });
        }

        res.send({ subjectActive });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};*/

exports.loadSubjectActive = async (req, res, next) => {
    try {
        const subjectActiveData = {
            id_materiaActiva: req.body.id_materiaActiva,
        };

        const subjectActive = await SubjectActive.findOne({
            id_materiaActiva: subjectActiveData.id_materiaActiva,
        });

        if (!subjectActive) {
            return res.status(409).send({ message: "Something Error" });
        }

        res.send({ subjectActive: [subjectActive] });
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

/** @function allSubjectActives */
// Load all the specific elements for Subject in mongo. 

exports.allSubjectActives = async (req, res, next) => {
    try {
        const subjectActives = await SubjectActive.find();

        if (!subjectActives) {
            return res.status(409).send({ message: "Something Error" });
        }

        res.send(subjectActives);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

/** @function allSubjectActivesMovil */
// Load all the specific elements for Subject in mongo. 

exports.allSubjectActivesMovil = async (req, res, next) => {
    try {
        const studentData = {
            id_grado: req.body.id_grado,
            id_colegio: req.body.id_colegio,
        };

        // Agregar lean() para obtener datos sin la serialización de Mongoose
        const subjectActives = await SubjectActive.find().lean();

        if (subjectActives.length === 0) {
            return res.status(409).send({ message: "No hay materias activas" });
        }

        const arrayColegio = [];
        const arrayFilterFinal = [];

        for (let i = 0; i < subjectActives.length; i++) {
            if (subjectActives[i].id_colegio == studentData.id_colegio) {
                arrayColegio.push(subjectActives[i]);
            }
        }

        for (let j = 0; j < arrayColegio.length; j++) {
            if (arrayColegio[j].id_grado == studentData.id_grado) {
                // Realiza la transformación del campo 'url_imagen' aquí
                const nuevaURLImagen = transformarURLImagen(arrayColegio[j].url_imagen);

                arrayFilterFinal.push({
                    ...arrayColegio[j],
                    url_imagen: nuevaURLImagen
                });
            }
        }

        if (arrayFilterFinal.length === 0) {
            return res.status(409).send({ message: "No hay materias activas" });
        }

        res.send(arrayFilterFinal);
    } catch (err) {
        res.status(500).send("Server Error");
    }
};

function transformarURLImagen(url_imagen) {
    const ipAddress = process.env.IP_ADDRESS_2;
    const urlSinPrefijo = url_imagen.replace('http://localhost:3000/public/repositorio/', '');
    return `http://${ipAddress}:3000/repositorio/${urlSinPrefijo}`;
}

/** @function newLoadSubjectActives */
// Load all the specific elements for Subject in mongo. 

/*exports.newLoadSubjectActives = async (req, res) => {
    const subjectActivesData = await SubjectActive.find();
    res.json(subjectActivesData);
}*/
/** @function deleteSubjectActive */
// Delete the specific elements for Subject in mongo. 

exports.deleteSubjectActive = async (req, res) => {
    try {
        const subjectActiveData = {
            id_materiaActiva: req.body.id_materiaActiva,
        };
        await SubjectActive.deleteOne({
            id_materiaActiva: subjectActiveData.id_materiaActiva,
        });
        res.json({ Estado: "Materia Activa Eliminada" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

/** @function SearchSubjectActive */
// Search all the specific elements for active subject according the input.
//Filtro de busqueda por materia activa

exports.searchSubjectActive = async (req, res, next) => {
    const subjectActiveData = {
        nombre_materiaActiva: req.body.nombre_materiaActiva,
    };
  
    try {
    //subjectActive: Se utiliza para almacenar el resultado de la consulta a la db
      const subjectActive = await SubjectActive.find({ 
        //Se busca en la colección SubjectActive, donde el nombre coincida con la expresión regular (Lo que ingresa el usuario)
        nombre_materiaActiva: { $regex: subjectActiveData.nombre_materiaActiva, $options: "xi" },
        //Con $options se hace que no importe si son mayúsculas y minúsculas (i) y que coincida con múltiples líneas (x).
      });
  
      if (!subjectActive || subjectActive.length === 0) {
        return res.status(409).send({ message: "Something Error" });
      }
  
      res.send({ subjectActive });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };