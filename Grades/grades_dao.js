const mongoose = require('mongoose');
const gradeSchema = require('./grades_model');

/** @function gradeSchema */
// Dao for Schema statics in database

gradeSchema.statics={
    create: function(data, cb){
        const grade = new this(data);
        grade.save(cb);
    },
    load: function(query,cb){
        this.find(query, cb);
    }
}

const gradeModel = mongoose.model('Grade',gradeSchema);
module.exports = gradeModel;