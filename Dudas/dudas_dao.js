const mongoose = require('mongoose');
const dudaSchema = require('./dudas_model');
/** @function dudaSchema */
// Dao for Schema statics in database
dudaSchema.statics={
    create: function(data, cb){
        const duda = new this(data);
        duda.save(cb);
    },
    load: function(query,cb){
        this.find(query, cb);
    }
}

const dudaModel = mongoose.model('Duda',dudaSchema);
module.exports = dudaModel;