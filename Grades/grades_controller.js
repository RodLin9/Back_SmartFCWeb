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
      res.send({ grade });
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

// Load all the specific elements for Grade in mongo. 

/** @function allGrades */
exports.allGrades = async (req, res, next) => {
  try {
    const grades = await Grade.find();
    if (!grades) {
      res.status(409).send({ message: 'Something Error' });
    } else {
      res.send(grades);
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

/** @function newLoadGrades */
/* Load all the specific elements for Grade in mongo.
exports.newLoadGrades = async (req, res) => {
    const gradesData = await Grade.find();
    res.json(gradesData);
}
/** @function deleteGrade */
// Delete the specific elements for Grade in mongo. 