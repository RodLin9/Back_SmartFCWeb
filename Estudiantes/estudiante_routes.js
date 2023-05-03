const express = require('express');
const router = express.Router();

const Estudiante = require('./estudiante_controller');
/** @function RoutesEstudiantes */
// Routes for Estudiantes
module.exports=(router)=> {
    router.get('/estudianteFake', Estudiante.createEstudianteFake);
    router.post('/createEstudiante', Estudiante.createEstudiante);
    router.post('/loginEstudiante', Estudiante.loginEstudiante);
    router.get('/loadAllStudent', Estudiante.allStudents);
    router.post('/loadEstudiante', Estudiante.loadEstudiante);
    router.get('/conectionWithApp', Estudiante.conectionWithApp);
    router.get('/loadAllEstudiantes', Estudiante.allEstudiantes);
    router.post('/uploadEstudiante', Estudiante.uploadEstudiante);
    router.post('/deleteEstudiante', Estudiante.deleteEstudiante);
}