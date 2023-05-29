const Duda = require('./dudas_controller');
/** @function RoutesDudas */
// Routes for Dudas
module.exports=(router)=> {
    router.post('/createDuda', Duda.createDuda);
    router.post('/loadDuda', Duda.loadDuda);
    router.get('/loadAllDudas', Duda.allDudas);
    //router.post('/uploadRespuestaDuda', Duda.uploadRespuestaDuda);
    router.post('/loadDudaStudents', Duda.loadDudaStudent);
    //router.post('/uploadEstadoDuda', Duda.uploadEstadoDuda);
    router.post('/deleteDuda', Duda.deleteDuda);
}