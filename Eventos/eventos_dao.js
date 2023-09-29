const mongoose = require('mongoose');
const eventosSchema = require('./eventos_model');

//DAO (Data Access Object)

/** @function eventosSchema */
// Dao for Schema statics in database
eventosSchema.statics={
    create: function(data, cb){
        const evento = new this(data);
        evento.save(cb);
    },
    load: function(query,cb){
        this.find(query, cb);
    }
}

const eventosModel = mongoose.model('Eventos',eventosSchema);

module.exports = eventosModel;