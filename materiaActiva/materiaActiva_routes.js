const SubjectActive = require('./materiaActiva_controller');
/** @function RoutesSubjectActive */
// Routes for SubjectActive
module.exports=(router)=> {
    router.post('/createSubjectActive', SubjectActive.createSubjectActive);
    router.post('/loadSubjectActive', SubjectActive.loadSubjectActive);
    router.get('/loadAllSubjectActives', SubjectActive.allSubjectActives);
    router.post('/loadAllSubjectActivesMovil', SubjectActive.allSubjectActivesMovil);
    //router.get('/newLoadSubjectActives', SubjectActive.newLoadSubjectActives);
    //router.put('/modifySubjectActive', SubjectActive.modifySubjectActive);
    router.post('/deleteSubjectActive', SubjectActive.deleteSubjectActive);
}