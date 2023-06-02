const mongoose = require('mongoose');
const subjectActiveSchema = require('./materiaActiva_model');
/** @function subjectActiveSchema */
// Dao for Schema statics in database
subjectActiveSchema.statics={
    create: function(data, cb){
        const subjectActive = new this(data);
        subjectActive.save(cb);
    },
    load: function(query,cb){
        this.find(query, cb);
    }
}

const subjectActiveModel = mongoose.model('SubjectActive',subjectActiveSchema);
module.exports = subjectActiveModel;