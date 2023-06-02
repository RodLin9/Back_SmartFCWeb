const Activities = require('./activities_controller');
/** @function RoutesActivities */
// Routes for Activities
module.exports=(router)=> {
    router.post('/createActivity', Activities.createActivity);
    router.post('/loadActivity', Activities.loadActivity);
    router.get('/loadAllActivities', Activities.allActivities);
    //router.post('/loadAllActivitiesMovil', Activities.allActivitiesMovil);
    router.post('/uploadActivity', Activities.uploadActivity);
    router.post('/uploadSectionsActivity', Activities.uploadSectionsActivity);
    router.post('/deleteActivity', Activities.deleteActivity);
    router.post('/loadVideoActivity', Activities.loadURLvideo);
    router.post('/loadActivityMateriaId', Activities.loadActivityByMateriaId);

}