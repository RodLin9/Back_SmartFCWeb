const School = require('./school_controller');
/** @function RoutesSchool */
// Routes for School
module.exports=(router)=> {
    //router.post('/createSchool', School.createSchool);
    router.post('/loadSchool', School.loadSchool);
    router.get('/loadAllSchools', School.allSchools);
    //router.get('/newLoadSchools', School.newLoadSchools);
    //router.post('/uploadSchool', School.uploadSchool);
    //router.post('/deleteSchool', School.deleteSchool);
}