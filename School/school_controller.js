const School = require('./school_dao');
/** @function createSchool */
// Create the specific elements for School in mongo. 

/** @function loadSchool */
// Load the specific elements for School in mongo. 

exports.loadSchool = async (req, res, next) => {
  const schoolData = {
    id_colegio: req.body.id_colegio
  };

  try {
    const school = await School.findOne({ id_colegio: schoolData.id_colegio });
    if (!school) {
      res.status(409).send({ message: 'Something Error' });
    } else {
      res.send([school]);
      //res.send({ school: [school] });
    }
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

/** @function allSchools */
// Load all the specific elements for School in mongo. 

exports.allSchools = async (req, res, next) => {
  try {
    const schools = await School.find();
    if (!schools) {
      res.status(409).send({ message: 'Something Error' });
    } else {
      res.send(schools);
    }
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

/** @function newLoadSchools */
// Load all the specific elements for School in mongo. 

/*exports.newLoadSchools = async (req, res) => {
    const schoolsData = await School.find();
    res.json(schoolsData);
} */