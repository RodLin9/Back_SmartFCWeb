const mongoose = require('mongoose');
const docenteSchema = require('./docentes_model');
/** @function docenteSchema */
// Dao for Schema statics in database
docenteSchema.statics={
    create: function(data, cb){
        const teacher = new this(data);
        teacher.save(cb);
    },
    login: function(query,cb){
        this.find(query,cb);
    }
}
const docenteModel = mongoose.model('Docente',docenteSchema);

module.exports = docenteModel;