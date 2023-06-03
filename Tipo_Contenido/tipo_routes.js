const Type = require('./tipo_controller');
/** @function RoutesTypeContent */
// Routes for TypeContent
module.exports=(router)=> {
    router.post('/loadType', Type.loadType);
    router.get('/loadAllTypes', Type.allTypes);
}