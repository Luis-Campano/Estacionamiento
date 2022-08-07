
const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Rate } = require('../models');
const { Vehicle } = require('../models');
const { Type } = require('../models');

const { Floor } = require('../models');

//post 
exports.add = async (req, res, next) => {
  try {
    const rateData = { ...req.body };
    const rate = await Rate.create(rateData);
    res.json({
      message: "Tarifa registrado",
      rate,
    });
    console.log(rate);
  } catch (error) {
    let errores = [];
    if (error.errors) {
      errores = error.errors.map((errorItem) => ({
        error: errorItem.message,
        field: errorItem.path,
      }));
    }
    res.status(500).json({
      message: 'Error al leer las Tarifas',
      error: errores,
    });
  }
};

//get
exports.list = async (req, res, next) => {
  try {
    //console.log(Vehicle.createAt);

    const rate = await Rate.findAll({
      //include: ['vehicles'],
    });
    res.json(rate);
    console.log(rate);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al buscar Tarifa',
    });

  }
};

//get
exports.show = async (req, res, next) => {
  try {
    const rate = await Rate.findOne({
      where: { id: req.params.id }
    });
    if (!rate) {
      res.status(404).json({
        message: 'No se encontro la Tarifa',
      });
    } else {
      res.status(200).json(
        rate,
      );
    };
  } catch (error) {
    res.status(500).json({
      message: 'Error al leer Tarifa',
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const rate = await Rate.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!rate) {
      res.status(404).json({
        message: 'Tarifa no encontrada'
      });
    } else {
      res.status(200).json({
        message: 'Tarifa eliminada',
        rate,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar Tarifa',
    });
  }
};

//put
exports.update = async (req, res, next) => {
  try {
    const actualizarRate = { ...req.body };
    await Rate.update(actualizarRate, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Tarifa actualizada",
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
      message: "Error al actualizar Tarifa",
      error: errores,
    });
  }
};

//Busqueda de tarifa.
exports.search = async (req, res, next) => {
  try {
    console.log(req.query);
    const rates = await Rate.findAll({
      where: {
        [Op.or]: [
          {
            type: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            }
          },
          {
            quota: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            }
          },
          {
            tolerance: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            }
          }
        ]
      },
    });
    const busqueda = rates;
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
      message: 'Error al buscar tarifas',
    });
  }
};
