const {estudianteModel} = require("../models");

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
    const data = await estudianteModel.find({})

    res.send({data})
}

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = (req, res) => {};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = (req, res) => {};

/**module.exports = { getItems, getItem, createItem, UpdateItem, deleteItem};

 * Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const UpdateItem = (req, res) => {};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = (req, res) => {};

