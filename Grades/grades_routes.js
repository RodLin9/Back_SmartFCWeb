const Grade = require('./grades_controller');

/** @function RoutesGrades */
// Routes for Grades

module.exports = (router) => {
    router.post('/loadGrade', Grade.loadGrade);
    router.get('/loadAllGrades', Grade.allGrades);
    //router.get('/newLoadGrades', Grade.newLoadGrades);
}