const express = require("express");
const fs = require("fs") // file system de node
const router = express.Router();

const PATH_ROUTES = __dirname;

//RUTAS DINÁMICAS
const removeExtension = (fileName) => {
    //TODO tracks.js [tracks, js]
    return fileName.split('.').shift() //Una cadena de texto basado en un punto
}

fs.readdirSync(PATH_ROUTES).filter((file) => { //Leer el directorio path e forma asíncrona, retorna un array
    const name = removeExtension(file) //TODO users, storage, tracks
    if(name !== 'index'){
        console.log('Cargando ruta ' + name)
        router.use('/' + name, require('./' + file)) //TODO http://localhost:3000/api/tracks 
    }
})

/*const a = fs.readdirSync(PATH_ROUTES)
console.log({a}) Esto devuelve los archivos que se encuentran dentro de rutas */
//Extraemos el nombre del archivo sin la extensión


module.exports = router