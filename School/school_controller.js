const School = require('./school_dao');
/** @function createSchool */
// Create the specific elements for School in mongo. 

/** @function loadSchool */
// Load the specific elements for School in mongo. 

exports.loadSchool = (req, res, next) => {
  const schoolData = {
    id_colegio: req.body.id_colegio
  };

  School.findOne({ id_colegio: schoolData.id_colegio })
    .then((school) => {
      if (!school) {
        res.status(409).send({ message: 'Something Error' });
      } else {
        res.send({ school });
      }
    })
    .catch((err) => {
      res.status(500).send(`Server Error: ${err}`);
    });
};
/** @function allSchools */
// Load all the specific elements for School in mongo. 

exports.allSchools = (req, res, next) => {
  School.find()
    .then((schools) => {
      if (!schools) {
        res.status(409).send({ message: 'Something Error' });
      } else {
        res.send(schools);
      }
    })
    .catch((err) => {
      res.status(500).send(`Server Error: ${err}`);
    });
};

/** @function newLoadSchools */
// Load all the specific elements for School in mongo. 

/*exports.newLoadSchools = async (req, res) => {
    const schoolsData = await School.find();
    res.json(schoolsData);
} */