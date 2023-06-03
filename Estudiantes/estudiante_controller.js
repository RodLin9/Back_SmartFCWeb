//El código que se muestra es un archivo de Node.js que exporta diferentes funciones que 
//interactúan con una base de datos MongoDB a través de un modelo llamado Estudiante.

const Estudiante = require('./estudiante_dao');
const { faker } =require('@faker-js/faker');
const jwt = require('jsonwebtoken'); //jsonwebtoken para la autenticación basada en tokens 
const bcrypt =require('bcryptjs'); //para la encriptación de contraseñas.
const SECRET_KEY = 'secretkey1234' //clave secreta SECRET_KEY para el módulo jsonwebtoken que se utiliza para firmar y verificar tokens.

/** @function createEstudiante */
// Create the specific elements for authE in mongo. 

/*exports.createEstudianteFake = (req, res) => {
  const student = [];
  const { size } = req.query;
  const limit = size || 15;
  for (let index =0; index <limit; index++){
    student.push({
      id_estudiante: "1",
      tipo_usuario: "1",
      nombre_estudiante: faker.name.firstName(),
      apellido_estudiante: faker.name.lastName(),
      /*grado_estudiante: faker.date.birthdate(),
      curso_estudiante: faker.internet.email(),
      id_colegio: req.body.id_colegio,
      nombre_usuario: req.body.nombre_usuario,
      contrasena: req.body.contrasena,
      correo_electronico: req.body.correo_electronico
    });
  }
  res.json(student);
} */

//FIXME: Cambiar nombre_usuario a estudiante#@fc.com
//FIXME: id_estudiante ser como los demás en la db
//FIXME: ¿El curso del estudiante cómo se crea?

  exports.createEstudiante = async (req, res, next) => {
    const newEstudiante = {
      id_estudiante: faker.datatype.number({ min: 1000000000, max: 9999999999 }),
      tipo_usuario: 1,
      nombre_estudiante: req.body.nombre_estudiante,
      apellido_estudiante: req.body.apellido_estudiante,
      grado_estudiante: req.body.grado_estudiante,  
      //curso_estudiante: req.body.curso_estudiante,
      curso_estudiante: faker.datatype.number({ min: 100000, max: 999999 }),
      id_colegio: req.body.id_colegio,
      nombre_usuario: faker.internet.userName(), 
      contrasena: req.body.contrasena,
      correo_electronico: req.body.correo_electronico,
    };

    try {
      const student = await Estudiante.create(newEstudiante);
      console.log('Estudiante creado exitosamente:', student, ':)');
      res.send({ student: student });
    } catch (err) {
      console.error('Error al crear el estudiante:', err);
      res.status(500).send('No se ha podido registrar el estudiante :(');
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
      const student = await Estudiante.findOne({ correo_electronico: estudianteData.correo_electronico });

      if (!student) {
        return res.status(409).send({ message: 'correo_electronico no encontrado' });
      }

      const resultContrasena = estudianteData.contrasena;

      if (resultContrasena === student.contrasena) {
        res.send({ student });
      } else {
        res.status(409).send(null);
      }
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };

/*exports.loginEstudiante = async (req, res, next)=>{
    const estudianteData = {
        correo_electronico: req.body.correo_electronico,
        contrasena: req.body.contrasena
    }
    try {
        const student = await Estudiante.findOne({correo_electronico: estudianteData.correo_electronico});
        if(!student){
            res.status(409).send({message:'Something Error'});
        }else{
            const resultContrasena= estudianteData.contrasena;
            if(resultContrasena==student.contrasena){
                res.send({student});
            }else{
                res.status(409).send(null);
            }
        }
    } catch (err) {
        res.status(500).send(`Server Error`);
    }
} */
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

    try {
      await Estudiante.updateOne({ id_estudiante: estudianteData.id_estudiante }, { $set: estudianteNewData });
      res.json({ status: 'Informacion Estudiante Actualizada' });
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

