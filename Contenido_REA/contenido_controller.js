const ContentREA = require('./contenido_dao');

/** @function loadContentREA */
// Load the specific elements for content in mongo. 

exports.loadContentREA = async (req, res, next) => {
  const contentData = {
    id_CREA: req.body.id_CREA
  };

  try {
    const content = await ContentREA.findOne({ id_CREA: contentData.id_CREA });
    if (!content) {
      res.status(409).send({ message: 'Contenido no encontrado' });
    } else {
      // Obtener la dirección IP de process.env.IP_ADDRESS_2
      const ipAddress = process.env.IP_ADDRESS_2;

      // Eliminar la parte no deseada de la URL
      const urlSinPrefijo = content.urlrepositorio.replace('http://localhost:3000/public/repositorio/', '');

      // Crear la URL modificada
      const nuevaURL = `http://${ipAddress}:3000/repositorio/${urlSinPrefijo}`;

      // Actualizar la URL en el objeto content
      content.urlrepositorio = nuevaURL;

      // Enviar el objeto content modificado como respuesta
      res.send({ content });
    }
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

/** @function allContent */
// Load all the specific elements for content in mongo. 

exports.allContent = async (req, res, next) => {
    try {
        const contents = await ContentREA.find();
        if (!contents) {
            res.status(409).send({ message: 'No hay contenidos' });
        } else {
            res.send(contents);
        }
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

/** @function allContentMovilG */
// Load all the specific elements for content in mongo. 

exports.allContentMovilG = async (req, res, next) => {
    console.log("Entra Aqui");
  
    var mandaR = 0;
  
    try {
      const contents = await ContentREA.find();
  
      if (!contents) {
        return res.status(409).send({ message: 'Something Error' });
      }
  
      mandaR = 1;
  
      var storageAllInformation = [];
      var filtroDatos = contents;
  
      for (var i = 0; i < contents.length; i++) {
        if (filtroDatos[i].tipo_CREA == 1) {
          storageAllInformation.push(filtroDatos[i]);
        }
      }
  
      console.log(storageAllInformation);
      res.send(storageAllInformation);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  };


/** @function SearchContentREA */
// Search all the specific elements for content in mongo. 

exports.SearchContentREA = async (req, res, next) => {
    const contentData = {
      nombre_CREA: req.body.nombre_CREA,
    };
  
    try {
      const content = await ContentREA.find({
        nombre_CREA: { $regex: contentData.nombre_CREA, $options: "xi" },
      });
  
      if (!content) {
        return res.status(409).send({ message: `Something Error` });
      }
  
      res.send({ content });
    } catch (err) {
      res.status(500).send(`Server Error: ${err}`);
    }
  };

/** @function allContentMovil */
// Load all the specific elements for content in mongo. 
exports.allContentMovil = async (req, res, next) => {
  try {
    const contents = await ContentREA.find();

    if (!contents) {
      return res.status(409).send({ message: 'Something Error' });
    }

    res.send({ contents });
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

exports.SearchContentREA_ByMateria = async (req, res, next) => {
  const contentData = {
      id_materia: req.body.id_materia,
  };

  try {
      const content = await ContentREA.find({ id_materia: contentData.id_materia });

      if (content.length === 0) {
          return res.status(404).send({ message: "No se encontró contenido REA para la materia especificada" });
      }

      // Formatear la respuesta como un arreglo de objetos directamente
      const contentArray = content.map((item) => {
          // Realizar la transformación de la URL en urlrepositorio
          const ipAddress = process.env.IP_ADDRESS_2;
          const urlSinPrefijo = item.urlrepositorio.replace('http://localhost:3000/public/repositorio/', '');
          item.urlrepositorio = `http://${ipAddress}:3000/repositorio/${urlSinPrefijo}`;
          return item.toObject();
      });

      res.send(contentArray); // Enviar el arreglo directamente, sin el campo "content"
  } catch (err) {
      res.status(500).send(`Error del servidor: ${err}`);
  }
};
///** @function newLoadContentREA */
// Load all the specific elements for content in mongo. 

/*exports.newLoadContentREA = async (req, res) => {
    const contentsData = await ContentREA.find();
    res.json(contentsData);
}*/
