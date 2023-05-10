const mongoose = require('mongoose');
const materiaSchema = require('./materia_model');
/** @function materiaSchema */
// Dao for Schema statics in database
materiaSchema.statics={
    create: function(data, cb){
        const subject = new this(data);
        subject.save(cb);
    },
    load: function(query,cb){
        this.find(query, cb);
    }
}

const materiaModel = mongoose.model('Materias',materiaSchema);
module.exports = materiaModel;