'use strict'

require("dotenv").config() //Variables de entorno

const express = require("express"); 
const cors = require("cors"); 

const estudianteRoutes = require('./Estudiantes/estudiante_routes');
const materiaRoutes = require('./Materias/materia_routes');
const colegioRoutes = require('./School/school_routes');
const dudaRoutes = require('./Dudas/dudas_routes');
const gradoRoutes = require('./Grades/grades_routes');
const actividadRoutes = require('./activities/activities_routes');
const materiaActivaRoutes = require('./materiaActiva/materiaActiva_routes');
const tipoContenidoRoutes = require('./Tipo_Contenido/tipo_routes');
//const contenidoREA = require('./Contenido_REA/contenido_routes');

const dbConnect = require('./config/db')
dbConnect()


const app = express(); 
app.use(cors()); //Permite evitar el error de origen cruzado entre los navegadorees
const router = express.Router();
//require('./Estudiantes')(router);

const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');  

const multipartMiddleware = multipart({  
  uploadDir: './public/repositorio'
});

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncode = bodyParser.urlencoded({extended:true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncode);

app.post('/subir', multipartMiddleware, (req, res) => {  //Esto significa que cuando se realice una solicitud POST a esta ruta, se ejecutará la función de controlador proporcionada como tercer argumento.
  //multipartMiddleware es un middleware que se utiliza para manejar datos multipart/form-data, como el envío de archivos. Probablemente se haya configurado anteriormente en tu código para manejar las subidas de archivos.
  console.log(req.files.uploads[0].path); //Esta línea imprime la ruta del archivo subido en la consola del servidor.
  //req.files es un objeto que contiene los archivos subidos en la solicitud. En este caso, se espera que haya un campo llamado uploads, que contiene un array de archivos.
  //req.files.uploads[0].path accede a la propiedad path del primer archivo subido. Esta propiedad contiene la ruta temporal en el servidor donde se ha guardado el archivo.
  const urls = req.files.uploads[0].path; //Esta línea guarda la ruta del archivo subido en una variable llamada urls.
  //Esto se hace para facilitar el procesamiento posterior de la ruta y obtener la parte relevante de la misma.
  const numero = urls.lastIndexOf("/"); //Esta línea busca la última aparición del carácter '/' en la ruta del archivo y guarda su posición en la variable numero.
  const lasturl = urls.substring(19); //Esta línea extrae una parte de la ruta del archivo, comenzando desde el carácter en la posición 19 hasta el final de la cadena, y la guarda en la variable lasturl.
  res.json({ //Esta línea envía una respuesta JSON al cliente con la URL de la imagen subida.
      'url': `http://localhost:3000/public/repositorio/${lasturl}`
      //La URL se construye concatenando la URL base (http://localhost:3000/public/repositorio/) con la parte relevante de la ruta del archivo (lasturl).
  }); //El cliente puede utilizar esta URL para acceder a la imagen subida desde el servidor.
});

/*
app.post('/subir', multipartMiddleware, (req, res) => {  
    console.log(req.files.uploads[0].path);
    const urls = req.files.uploads[0].path;
    const numero = urls.lastIndexOf("/");
    const lasturl = urls.substring(19);
    res.json({
        'url': `http://localhost:3000/public/repositorio/${lasturl}`
    });
});
*/

//Para subir usando Async Await

app.post('/subir', multipartMiddleware, async (req, res) => {
  try {
    console.log(req.files.uploads[0].path);
    const urls = req.files.uploads[0].path;
    const numero = urls.lastIndexOf("/");
    const lasturl = urls.substring(19);

    // Simulación de una operación asincrónica utilizando setTimeout
    // Reemplaza esto con tu lógica de subida de archivos real
    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.json({
      'url': `http://localhost:3000/public/repositorio/${lasturl}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
});


/**
 * Aquí invocamos a las rutas! 8) 
 */

//app.use("/api", require("./routes"))
app.use('/api', router);

//app.use("/api", require("./routes/estudiante_routes")) se borra la última parte y ahora hace rederencia al index

//app.use(estudianteRouters); //Use las rutas que están enviandose desde ese archivo
estudianteRoutes(router);
materiaRoutes(router);
colegioRoutes(router);
dudaRoutes(router);
gradoRoutes(router);
actividadRoutes(router);
materiaActivaRoutes(router);
tipoContenidoRoutes(router);
//contenidoREA(router);

const port = process.env.PORT || 3002

app.listen(port, () =>{ 
    console.log('Tu app está lista por http://localhost:' + port + ' :D'); 
  });


router.get('/prueba',(req, res)=>{
  res.json({
      'url': `prueba`
  });
});

app.post('/tengohambre',(req,res)=>{
  console.log(req.body)
  res.status(200).send({message: 'Hola mundo, tengo hambre'})
})

router.get('/hello',(req, res)=>{
  res.json({
      'message': `Hola desde express!`
  });
});


app.use(router);
app.use(express.static('public'));
