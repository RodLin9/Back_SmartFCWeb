const Estudiante = require('./estudiante_dao');
const { faker } =require('@faker-js/faker');
const jwt = require('jsonwebtoken'); //TODO: jsonwebtoken para la autenticación basada en tokens 
const bcrypt =require('bcryptjs'); //TODO: para la encriptación de contraseñas.
const SECRET_KEY = 'secretkey1234' //TODO: clave secreta SECRET_KEY para el módulo jsonwebtoken que se utiliza para firmar y verificar tokens.

/** @function createEstudiante */
// Create the specific elements for authE in mongo. 

exports.createEstudiante = async (req, res, next) => {
  try {
    // Verificar si los campos obligatorios están presentes y no son vacíos
    const requiredFields = ['nombre_estudiante', 'apellido_estudiante', 'grado_estudiante', 'id_colegio', 'contrasena', 'correo_electronico'];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `El campo '${field}' no puede estar vacío.` });
      }
    }

    // Verificar si el correo electrónico ya está registrado
    const existingStudent = await Estudiante.findOne({ correo_electronico: req.body.correo_electronico });

    if (existingStudent) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const newEstudiante = {
      id_estudiante: faker.datatype.number({ min: 1000000000, max: 9999999999 }),
      tipo_usuario: 1,
      nombre_estudiante: req.body.nombre_estudiante,
      apellido_estudiante: req.body.apellido_estudiante,
      grado_estudiante: req.body.grado_estudiante,
      curso_estudiante: 2023,
      id_colegio: req.body.id_colegio,
      nombre_usuario: req.body.correo_electronico,
      contrasena: req.body.contrasena,
      correo_electronico: req.body.correo_electronico,
    };

    const student = await Estudiante.create(newEstudiante);
    console.log('Estudiante creado exitosamente:', student);
    res.status(201).json({ student: student });
  } catch (err) {
    console.error('Error al crear el estudiante:', err);
    res.status(500).json({ error: 'No se ha podido registrar el estudiante.' });
  }
};


/** @function loginEstudiante */
// Login authEstudiante.

  exports.loginEstudiante = async (req, res, next) => {
    const estudianteData = {
      correo_electronico: req.body.correo_electronico,
      contrasena: req.body.contrasena
    };

    try {
      
      if (!estudianteData.correo_electronico || !estudianteData.contrasena) {
        return res.status(409).send({ message: 'Los campos son requeridos' });
      }
  
      const student = await Estudiante.findOne({ correo_electronico: estudianteData.correo_electronico });

      if (!student) {
        return res.status(409).send({ message: 'correo_electronico no encontrado' });
      }

      /* const passwordMatch = await bcrypt.compare(estudianteData.contrasena, student.contrasena);

    if (passwordMatch) {*/
      const resultContrasena = estudianteData.contrasena;

      if (resultContrasena === student.contrasena) {
        res.send({ student });
      } else {
        res.status(409).send(null);
        console.log('Contraseña incorrecta' + passwordMatch);
      }
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };

/** @function allStudents */
  exports.allStudents = async (req, res, next) => {
    try {
      const students = await Estudiante.find();

      if (!students) {
        return res.status(409).send({ message: 'Something Error, estudiantes no encontrados' });
      }
      res.send(students);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
/** @function loadStudents */
// Load student in platform.

  exports.loadEstudiante = async (req, res, next) => {
    try {
        const estudianteData = {
            id_estudiante: req.body.id_estudiante
        };

        const student = await Estudiante.findOne({ id_estudiante: estudianteData.id_estudiante });

        if (!student) {
            return res.status(409).send({ message: 'Something Error' });
        }

        //res.send({ student });
        res.send([student]);
    } catch (err) {
        res.status(500).send(`Server Error ${err}`);
    }
  }; 

/** @function allEstudiantes */
// Load all students in platform.

  exports.allStudents = async (req, res, next) => {
    try {
        const students = await Estudiante.find();

        if (!students) {
            return res.status(409).send({ message: 'Something Error' });
        }

        res.send(students);
    } catch (err) {
        return res.status(500).send('Server Error');
    }
  };  

/** @function uploadEstudiante */
// Update student in platform.

  exports.uploadEstudiante = async (req, res, next) => {
    const estudianteData = {
      id_estudiante: req.body.id_estudiante
    }
    const estudianteNewData = {
      nombre_estudiante: req.body.nombre_estudiante,
      apellido_estudiante: req.body.apellido_estudiante,
      grado_estudiante: req.body.grado_estudiante,
      curso_estudiante: req.body.curso_estudiante,
      nombre_usuario: req.body.nombre_usuario,
      contrasena: req.body.contrasena,
      correo_electronico: req.body.correo_electronico
    }

    const datosEstudiante = Object.values(estudianteNewData).filter(value => value !== undefined && value !== null);

    if (datosEstudiante.length === 0) {
      return res.status(400).send('No se proporcionaron campos para modificar');
    }
  
    try {
      await Estudiante.updateOne({ id_estudiante: estudianteData.id_estudiante }, { $set: estudianteNewData });
      res.json({ status: 'Información del estudiante actualizada' });
    } catch (err) {
      res.status(500).send(`Server Error ${err}`);
    }
  };

/** @function deleteEstudiante */
// Delete student in platform.

  exports.deleteEstudiante = async (req, res, next) => {
    const estudianteData = {
      id_estudiante: req.body.id_estudiante
    };

    try {
      await Estudiante.deleteOne({ id_estudiante: estudianteData.id_estudiante });
      res.json({ Estado: 'Estudiante Eliminado' });
    } catch (err) {
      res.status(500).send(`Server Error ${err}`);
    }
  };
/** @function conectionWithApp */
// Response about 1 for conect with app

exports.conectionWithApp = async (req, res) => {
    //console.log(req.body)
    res.json(1);
}

