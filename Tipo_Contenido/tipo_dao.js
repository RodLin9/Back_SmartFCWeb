const mongoose = require('mongoose');
const typeSchema = require('./tipo_model');
/** @function typeSchema */
// Dao for Schema statics in database
typeSchema.statics={
    create: function(data, cb){
        const type = new this(data);
        type.save(cb);
    },
    load: function(query,cb){
        this.find(query, cb);
    }
}

const typeModel = mongoose.model('Type',typeSchema);
module.exports = typeModel;