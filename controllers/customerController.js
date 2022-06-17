const { Op } = require("sequelize");
const res = require('express/lib/response');
const { Customer } = require('../models');

//post 
exports.add = async (req, res, next) => {
  try {
    const customerData = { ...req.body };
    const customer = await Customer.create(customerData);
    res.json({
      message: "Cliente registrado",
      customer,
    });
  } catch (error) {
    let errores = [];
    if (error.errors) {
      errores = error.errors.map((errorItem) => ({
        error: errorItem.message,
        field: errorItem.path,
      }));
    }
    res.status(500).json({
      message: 'Error al leer las Cliente',
      errors: errores,
    });
  }
};

//get
exports.list = async (req, res, next) => {
  try {
    const customer = await Customer.findAll({});
    res.json(customer);
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscar Clientes',
    });
    console.log(error);
  }
};

//get
exports.show = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      where: { id: req.params.id },
    });
    res.json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al leer Cliente',
    });
  }
};

//delete
exports.delete = async (req, res, next) => {
  try {
    await Customer.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(500).json({
      message: 'Cliente eliminado',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar Cliente',
    });
  }
};

//put
exports.update = async (req, res, next) => {
  try {
    const actualizacustomer = { ...req.body };
    await Customer.update(actualizacustomer, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Cliente actualizado",
    });

  } catch (error) {
    let errores = [];
    if (error.errors) {
      errores = error.errors.map((errorItem) => ({
        error: errorItem.message,
        field: errorItem.path,
      }));
    }
    res.status(500).json({
      message: "Error al actualizar Cliente",
      errors: errores,
    });
  }
};

//Busqueda de usuarios.
exports.search =  async (req, res, next) => {
  try {
    const customers = await Customer.findAll({
      where: {
        [Op.or]: [
          {
              name:{
                [Op.like]: `%${req.query.q.toLowerCase()}%`
              },
          },
          {
              lastName:{
                [Op.like]: `%${req.query.q.toLowerCase()}%`
              },
          },
          {
              email:{
                [Op.like]: `%${req.query.q.toLowerCase()}%`
              },
          },
          {
              phone:{
                [Op.like]: `%${req.query.toLowerCase()}%`
              },
          }
        ]
      },
    });
    res.json({results: customers});
  } catch (error) {
    res.status(500).json({
      message: 'Error al buscas clientes',
    });
  }
};