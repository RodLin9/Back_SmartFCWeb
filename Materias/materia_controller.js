const Subject = require('./materia_dao');
/** @function createSubject */
// Create the specific elements for Subject in mongo. 

const { promisify } = require("util");

exports.createSubject = async (req, res, next) => {
    const newSubject = {
      id_materia: req.body.id_materia,
      cont: req.body.cont,
      nombre_materia: req.body.nombre_materia,
      id_colegio: req.body.id_colegio,
      id_areaMateria: req.body.id_areaMateria,
      //url_imagen: req.body.url_imagen,
      avatar: faker.image.avatar(),
    };
  
    try {
      const subject = await Subject.create(newSubject);
      res.send({ subject });
    } catch (err) {
      res.json({ Estado: "Error Crear Materia" });
    }
  }; 
  

/** @function loadSubject */
// Load the specific elements for Subject in mongo. 

exports.loadSubject = async (req, res, next) => {
    const subjectData = {
      id_materia: req.body.id_materia,
    };
  
    try {
      const subject = await Subject.findOne({ id_materia: subjectData.id_materia });
      if (!subject) {
        res.status(409).send({ message: `Something Error` });
      } else {
        res.send({ subject });
      }
    } catch (err) {
      res.status(500).send("Server Error");
    }
  };

/** @function allSubjects */
// Load all the specific elements for Subject in mongo. 

exports.allSubjects = (req, res, next) => {
    Subject.find()
        .then
}
exports.allSubjects = (req, res, next) => {
    Subject.find()
      .then((subjects) => {
        if (!subjects) {
          res.status(409).send({ message: "Something Error" });
        } else {
          res.send(subjects);
        }
      })
      .catch((err) => {
        res.status(500).send("Server Error");
    });
};

/** @function newLoadSubjects */
// Load the specific elements for Subject in mongo. 

exports.newLoadSubjects = async (req, res) => {
    const subjectsData = await Subject.find();
    res.json(subjectsData);
}
/** @function deleteSubject */
// Delete the specific elements for Subject in mongo. 

exports.deleteSubject = async (req, res) => {
    const subjectData = {
      id_materia: req.body.id_materia
    };
    try {
      await Subject.deleteOne({ id_materia: subjectData.id_materia });
      res.json({ Estado: 'Materia Eliminada' });
    } catch (err) {
      res.status(500).send('Server Error');
    }
};