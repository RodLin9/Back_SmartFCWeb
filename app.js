'use strict'

require("dotenv").config() //Variables de entorno

const express = require("express"); 
const cors = require("cors"); 

const estudianteRoutes = require('./Estudiantes/estudiante_routes');
const materiaRoutes = require('./Materias/materia_routes');

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

app.post('/subir', multipartMiddleware, (req, res) => {  
  console.log(req.files.uploads[0].path);
  const urls = req.files.uploads[0].path;
  const numero = urls.lastIndexOf("/");
  const lasturl = urls.substring(19);
  res.json({
      'url': `http://localhost:3000/public/repositorio/${lasturl}`
  });
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
