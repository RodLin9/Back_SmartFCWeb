const Docente = require('./docentes_controller');
/** @function RoutesDocente */
// Routes for Docente
module.exports=(router)=> {
    router.post('/loadDocente', Docente.loadDocente);
    router.get('/loadAllDocentes', Docente.allDocente);
}