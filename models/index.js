//const { modelNames } = require("mongoose")

const models = {
    dudasModel: require('./nosql/dudas_model'),
    estudianteModel: require('./nosql/estudiante_model'),
    schoolModel: require('./nosql/school_model')
}

module.exports = models