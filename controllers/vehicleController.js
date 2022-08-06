const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Vehicle } = require('../models');
const { Type } = require('../models');
const { Floor } = require('../models');
const { Rate } = require('../models');

//Funciones CRUD.

//CREATE
exports.add = async (req, res, next) => {
  try {
    const vehicleData = { ...req.body };
    const vehicle = await Vehicle.create(vehicleData);
    res.status(200).json({
      message: "Vehículo registrado.",
      vehicle,
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
      message: 'Error al registrar los vehículos.',
      error: errores,
    }); console.log(error);
  }
};
//READ LITS
exports.list = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findAll({
      include: ['customers', {
        model: Type,
        as: 'types',
        include: [{
          model: Floor,
          as: 'floors',
          include: [{
            model: Rate,
            as: 'rates',
          }]
        }],
      }]
    });
    console.log(vehicle.model);
    res.json(vehicle);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al mostrar los Vehiculos.',
    });
  }
};
//READ ID
exports.show = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findOne({
      where: { id: req.params.id },
      include: ['customers', {
        model: Type,
        as: 'types',
        include: [{
          model: Floor,
          as: 'floors',
        }],
      }]
    });
    if (!vehicle) {
      res.status(404).json({
        message: 'No se encontro el Vehículo.',
      });
    } else {
      res.status(200).json(
        vehicle,
      );
    };
  } catch (error) {
    res.status(404).json({
      message: 'Error al leer Vehículo',
    });
  }
};
//UPDATE
exports.update = async (req, res, next) => {
  try {
    const updateVehicle = { ...req.body };
    await Vehicle.update(updateVehicle, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Vehículo actualizado",
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
      message: "Error al actualizar Vehículo",
      error: errores,
    });
  }
};
//DELETE
exports.delete = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!vehicle) {
      res.status(404).json({
        message: 'Vehículo no encontrado'
      });
    } else {
      res.status(200).json({
        message: 'Vehículo eliminado.',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar Vehículo.',
    });
  }
};
//SEARCH
exports.search = async (req, res, next) => {
  try {
    console.log(req.query);
    const vehicles = await Vehicle.findAll({
      where: {
        [Op.or]: [
          {
            lincesPlate: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            }
          },
          {
            brand: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            }
          },
          {
            model: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            }
          },
          {
            color: {
              [Op.like]: `%${req.query.q.toLowerCase()}%`
            }
          }
        ]
      },
    });
    const busqueda = vehicles;
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
      message: 'Error al buscar información.',
    });
  }
};