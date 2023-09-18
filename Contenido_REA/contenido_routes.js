const ContentREA = require('./contenido_controller');
/** @function RoutesContent */
// Routes for Countent
module.exports=(router)=> {
    router.post('/loadContentREA', ContentREA.loadContentREA);
    router.get('/loadAllcontents', ContentREA.allContent);
    router.get('/loadAllcontentsMovil', ContentREA.allContentMovilG);
    router.post('/searchContentREA', ContentREA.SearchContentREA);
    //router.get('/newLoadContentREA', ContentREA.newLoadContentREA);
    //router.post('/uploadEstadoContentREA', ContentREA.uploadEstadoContentREA);
    //router.post('/uploadURLContentREA', ContentREA.uploadURLContentREA);
    //router.post('/deleteContentREA', ContentREA.deleteContentREA);
}