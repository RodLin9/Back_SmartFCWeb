'use strict'

require("dotenv").config() //Variables de entorno

const express = require("express"); 
const cors = require("cors");
//const passport = require('passport'); //FIXME: Eliminar dependencias y todo lo relacionado
const session = require('express-session');
const ping = require('ping');

const estudianteRoutes = require('./Estudiantes/estudiante_routes');
const materiaRoutes = require('./Materias/materia_routes');
const colegioRoutes = require('./School/school_routes');
const dudaRoutes = require('./Dudas/dudas_routes');
const gradoRoutes = require('./Grades/grades_routes');
const actividadRoutes = require('./activities/activities_routes');
const materiaActivaRoutes = require('./materiaActiva/materiaActiva_routes');
const tipoContenidoRoutes = require('./Tipo_Contenido/tipo_routes');
const contenidoREA = require('./Contenido_REA/contenido_routes');
const docenteRoutes = require('./Docentes/docentes_routes');
const eventoRoutes = require('./Eventos/eventos_routes');

const dbConnect = require('./config/db')
dbConnect()

const app = express(); 
app.use(cors()); //Permite evitar el error de origen cruzado entre los navegadorees
const router = express.Router();
//require('./Estudiantes')(router);

//FIXME: Aquí implementación de sessions

app.use(session({
  secret: 'process.env.SECRET_KEY', // Reemplaza con una clave secreta segura
  resave: false,
  saveUninitialized: true, // Establece esto en true para crear una sesión incluso si el usuario no ha iniciado sesión explícitamente
  cookie: { secure: false } // Establece a true si estás utilizando HTTPS
}));

app.get('/dashboard', (req, res) => {
  const userId = req.session.userId;
  const username = req.session.username;

  if (userId && username) {
    // El usuario está autenticado, puedes mostrar el panel de control, por ejemplo
    res.send(`Bienvenido, usuario ID ${userId}, nombre de usuario: ${username}`);
  } else {
    // El usuario no está autenticado, redirige al inicio de sesión o muestra un mensaje de error
    res.redirect('/login'); // Redirige a la página de inicio de sesión si no hay una sesión activa
  }
});


//TODO: Configura middleware de sesión y autenticación
/*app.use(session({
  secret: process.env.SECRET_KEY, // Usa la clave secreta de la variable de entorno
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configura Passport para utilizar la estrategia local (puedes agregar otras estrategias si es necesario)
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Aquí debes escribir el código para verificar las credenciales del usuario
    // Normalmente, verificarías el nombre de usuario y la contraseña en tu base de datos
    // Si las credenciales son válidas, llama a done(null, usuario) donde "usuario" es el objeto del usuario
    // Si las credenciales son inválidas, llama a done(null, false)
  }
));

// Serializa y deserializa el usuario (específico para Passport)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // Aquí debes recuperar el usuario de tu base de datos usando el "id" proporcionado
  // Luego, llama a done(null, usuario)
});*/


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
contenidoREA(router);
docenteRoutes(router);
eventoRoutes(router);

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


require('dotenv').config({ path: '.env.example' });
console.log('La direccion de prueba 2 es:' + process.env.IP_ADDRESS_2);

app.post('/checkIp', (req, res) => {

  const ipToCheck = req.body.ip;

  console.log('La ip to check es ' + ipToCheck);

  const allowedIPs = [process.env.IP_ADDRESS_1, process.env.IP_ADDRESS_2];
  //console.log('Las ip son: ' + process.env.IP_ADDRESS_1 + ' y ' + process.env.IP_ADDRESS_2);
  if (!allowedIPs.includes(ipToCheck)) {
    res.json({ message: 'La dirección IP no está permitida' });
    return;
  }

  res.json({ message: 'La dirección IP es permitida' });
});

app.post('/checkIp2', (req, res) => {

  const ipToCheck = req.body.ip;

  const allowedIPs = [process.env.IP_ADDRESS_1, process.env.IP_ADDRESS_2];

  const isAllowed = allowedIPs.includes(ipToCheck);   // Verificar si la dirección IP está permitida
  const response = {
    message: isAllowed ? 'La dirección IP es permitida' : 'La dirección IP no está permitida',
    isAllowed, //Si isAllowed es true, asignamos el mensaje "La dirección IP es permitida", y si isAllowed es false, asignamos el mensaje "La dirección IP no está permitida"
  };

  // Enviar una respuesta JSON al frontend con el objeto
  res.status(isAllowed ? 200 : 403).json(response);
});

app.use(router);
app.use(express.static('public'));
