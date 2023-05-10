const Subject = require('./materia_controller');
/** @function RoutesSubject */
// Routes for Subject
module.exports=(router)=> {
    router.post('/createSubject', Subject.createSubject);
    router.post('/loadSubject', Subject.loadSubject);
    router.get('/loadAllSubjects', Subject.allSubjects);
    router.get('/newLoadSubjects', Subject.newLoadSubjects);
    //router.put('/modifySubject', Subject.modifySubject);
    router.post('/deleteSubject', Subject.deleteSubject);
}