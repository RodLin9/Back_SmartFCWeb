const Grade = require('./grades_dao');
// Create the specific elements for Grade in mongo. 

/** @function loadGrade */
// Load the specific elements for Grade in mongo. 

exports.loadGrade = async (req, res, next) => {

  const gradeData = {
    id_grado: req.body.id_grado
  }

  try {

    const grade = await Grade.findOne({ id_grado: gradeData.id_grado });
    if (!grade) {
      res.status(409).send({ message: `Something Error` });
    } else {
      res.send([grade]);
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
}


/** @function allGrades */
// Load all the specific elements for Grade in mongo. 

exports.allGrades = async (req, res, next) => {
  try {
    const grades = await Grade.find().sort({ id_grado: 1 }); //sort: Para ordenar los grados en orden ascendente según el id
    if (!grades) {
      res.status(409).send({ message: 'Something Error' });
    } else {
      res.send(grades);
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
