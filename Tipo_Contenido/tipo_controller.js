const Type = require('./tipo_dao');
/** @function createType */
// Create the specific elements for Type of Content in mongo. 

/** @function loadType*/
// Load the specific elements for Type of Content in mongo. 
exports.loadType = async (req, res, next) => {
    const typeData = {
      id_tipoContenido: req.body.id_tipoContenido
    };
  
    try {
      const type = await Type.findOne({ id_tipoContenido: typeData.id_tipoContenido });
      if (!type) {
        res.status(409).send({ message: `Something Error` });
      } else {
        res.send({ type });
      }
    } catch (err) {
      res.status(500).send(`Server Error ${err}`);
    }
  };

/** @function allTypes */
// Load all the specific elements for Type of Content in mongo. 
exports.allTypes = async (req, res, next) => {
    try {
      const types = await Type.find();
      if (!types) {
        res.status(409).send({ message: 'Something Error' });
      } else {
        res.send(types);
      }
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };
