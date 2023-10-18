const Estudiante = require('./estudiante_dao');
const { faker } =require('@faker-js/faker');
const jwt = require('jsonwebtoken'); //TODO: jsonwebtoken para la autenticación basada en tokens 
const bcrypt =require('bcryptjs'); //TODO: para la encriptación de contraseñas.
const SECRET_KEY = 'secretkey1234' //TODO: clave secreta SECRET_KEY para el módulo jsonwebtoken que se utiliza para firmar y verificar tokens.

// Crear un contador global para el número de estudiantes
let studentCounter = 0;
let id_estudiante = 0;

/** @function getCurrentStudentCount */
// Get the actual number of students in mongo
async function getCurrentStudentCount() {
  const currentCount = await Estudiante.countDocuments();
  console.log('El número total de estudiantes es:', currentCount);
  return currentCount;
}

/** @function createEstudiante */
// Create the specific elements for authE in mongo. 

exports.createEstudiante = async (req, res, next) => {
  let x = 0;
  try {
    const requiredFields = ['nombre_estudiante', 'apellido_estudiante', 'grado_estudiante', 'id_colegio', 'contrasena', 'correo_electronico'];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `El campo '${field}' no puede estar vacío.` });
      }
    }

    const existingStudent = await Estudiante.findOne({ correo_electronico: req.body.correo_electronico });

    if (existingStudent) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const id_colegio = req.body.id_colegio;
    //console.log('El id_colegio es: ' + id_colegio);

    const currentCount = await getCurrentStudentCount(); // Obtener el número actual de estudiantes

    studentCounter = currentCount + 1;

    id_estudiante = parseInt(`${id_colegio}${studentCounter}`);
    //console.log('El id_estudiante es: ' + id_estudiante);

    let isUnique = false;

    while (!isUnique) {
      const existingStudent = await Estudiante.findOne({ id_estudiante: id_estudiante }); // Consultar si ya existe un estudiante con el mismo id_estudiante
      //x = x + 1 ;
      //console.log('Número de veces en el while', x);

      if (existingStudent) {
        studentCounter++; // Si el id_estudiante ya existe, incrementa studentCounter y vuelve a intentar
        id_estudiante = parseInt(`${id_colegio}${studentCounter}`);
      } else {
        isUnique = true;
      }
    }

    const newEstudiante = {
      id_estudiante: id_estudiante,
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
    console.log('Estudiante creado exitosamente');
    res.status(201).json({
      message: 'Registro exitoso',
      student: student
    });
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
      return res.status(409).send({ message: 'Correo electrónico no encontrado' });
    }

    // Verificar la contraseña
    if (estudianteData.contrasena === student.contrasena) {
      // Almacenar información en la sesión si la autenticación es exitosa
      req.session.userId = student.id_estudiante; // Almacena el ID del estudiante en la sesión
      req.session.email = student.correo_electronico; // Almacena el nombre de usuario en la sesión
      res.send({ student });
    } else {
      res.status(409).send({ message: 'Contraseña incorrecta' });
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
  };

  const estudianteNewData = {
      nombre_estudiante: req.body.nombre_estudiante,
      apellido_estudiante: req.body.apellido_estudiante,
      grado_estudiante: req.body.grado_estudiante,
      curso_estudiante: req.body.curso_estudiante,
      contrasena: req.body.contrasena,
      correo_electronico: req.body.correo_electronico,
      nombre_usuario: req.body.correo_electronico
  };

  const datosEstudiante = Object.values(estudianteNewData).filter(value => value !== undefined && value !== null);

  if (datosEstudiante.length === 0) {
      return res.status(400).send('No se proporcionaron campos para modificar');
  }

  const existingStudent = await Estudiante.findOne({ correo_electronico: estudianteNewData.correo_electronico });

  if (existingStudent && existingStudent.id_estudiante !== estudianteData.id_estudiante) {
      return res.status(400).send('Correo electrónico ya registrado');
  }

  try {
      await Estudiante.updateOne({ id_estudiante: estudianteData.id_estudiante }, { $set: estudianteNewData });
      res.json({ status: '¡Datos actualizados! Para verificar los cambios cierre sesión y vuelva a ingresar.' });
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

