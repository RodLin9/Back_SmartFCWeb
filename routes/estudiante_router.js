//Tracks
const express = require("express");
const router = express.Router();
const {getItems, getItem} =require("../controlers/estudiante_controller")

//Todo http://localhost/ tracks GET, POST, DELETE, PUT

router.get("/", getItems);

router.get("/:id", getItem);

module.exports = router
/*const Estudiante = require('./authE_controller');
/** @function RoutesEstudiantes 
// Routes for Estudiantes
module.exports=(router)=> {
    router.post('/createEstudiante', Estudiante.createEstudiante);
    router.post('/loginEstudiante', Estudiante.loginEstudiante);
    router.get('/loadAllStudent', Estudiante.allStudents);
    router.post('/loadEstudiante', Estudiante.loadEstudiante);
    router.get('/conectionWithApp', Estudiante.conectionWithApp);
    router.get('/loadAllEstudiantes', Estudiante.allEstudiantes);
    router.post('/uploadEstudiante', Estudiante.uploadEstudiante);
    router.post('/deleteEstudiante', Estudiante.deleteEstudiante);
}*/