const Docente = require('./docentes_dao');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');
const SECRET_KEY = 'secretkey1234'



/** @function allDocente */
// Load all teachers in platform.

exports.allDocente = async (req, res, next) => {
    try {
        const docentes = await Docente.find();

        if (!docentes) {
            return res.status(409).send({message: 'Something Error'})
        }
        res.send(docentes);
    } catch (error) {
        return res.status(500).send('Server Error');
    }
}

/** @function loadDocente */
// Load authDocente.

exports.loadDocente = async (req, res, next) => {
    const docenteData = {
        id_docente: req.body.id_docente
    }
    try {
        const docente = await Docente.find({ id_docente: docenteData.id_docente }).exec();
        if (!docente || docente.length === 0) {
            return res.status(409).send('El docente solicitado no existe');
        }
        res.send(docente);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error del servidor');
    }
}
