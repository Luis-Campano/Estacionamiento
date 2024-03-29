const { id } = require('date-fns/locale');
const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Customer } = require('../models');
const { Vehicle } = require('../models');
const { Type } = require('../models');
const { Floor } = require('../models');
const { Rate } = require('../models');
const { Registration } = require('../models');
const { notificationEmail } = require('../utils/notificationEmail');



//post 
exports.add = async (req, res, next) => {
  try {
    const customerData = { ...req.body };
    const customer = await Customer.create(customerData);
    res.json({
      message: "Cliente registrado",
      customer,
    });
    notificationEmail(
      customer.name,
      customer.email
    );
  } catch (error) {
    console.log(error);
    let errores = [];
    if (error.errors) {
      errores = error.errors.map((errorItem) => ({
        error: errorItem.message,
        field: errorItem.path,
      }));
    }
    res.status(500).json({
      message: 'Error al leer las Cliente',
      error: errores,
    });
  }
};

//get
exports.list = async (req, res, next) => {
  try {
    const customer = await Customer.findAll({
      include: [{
        model: Vehicle,
        as: 'vehicles',
        include: [{
          model: Type,
          as: 'types',
          include: [{
            model: Floor,
            as: 'floors',
            include: [{
              model: Rate,
              as: 'rates',
              /* include: [{
                 model: Registration,
                 as: 'registrations'
               }]*/
            }]
          }]
        }],
      }]
    });
    res.json(customer);
    console.log(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al buscar Clientes',
    });

  }
};
//get
exports.show = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      where: { id: req.params.id },
      include: [{
        model: Vehicle,
        as: 'vehicles',
        include: [{
          model: Type,
          as: 'types',
          include: [{
            model: Floor,
            as: 'floors',
          }]
        }],
      }]
    });
    if (!customer) {
      res.status(404).json({
        message: 'No se encontro al cliente',
      });
    } else {
      res.status(200).json(
        customer
      );
    }
  } catch (error) {
    res.status(404).json({
      message: 'Error al leer Cliente',
    });
  }
};
//delete
exports.delete = async (req, res, next) => {
  try {
    const customer = await Customer.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!customer) {
      res.status(404).json({
        message: 'Cliente no encontrado'
      });
    } else {
      res.status(200).json({
        message: 'Cliente eliminado',
      });
    }
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
    res.status(200).json({
      message: "Cliente actualizado",
    });

  } catch (error) {
    console.log(error);
    let errores = [];
    if (error.errors) {
      errores = error.errors.map((errorItem) => ({
        error: errorItem.message,
        field: errorItem.path,
      }));
    }
    res.status(500).json({
      message: 'Error al leer las Cliente',
      error: errores,
    });
  }
};
//Busqueda de usuarios.
exports.search = async (req, res, next) => {
  try {
    console.log(req.query);
    const customers = await Customer.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            },
          },
          {
            lastName: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            },
          },
          {
            email: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            },
          },
          {
            phone: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            },
          }
        ]
      },
    });
    const busqueda = customers;
    if (busqueda == '') {
      res.status(404).json({
        message: 'Sin resultados.'
      });
    } else {
      res.status(200).json({
        busqueda
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al buscar clientes',
    });
  }
};