const res = require('express/lib/response');
const { Op } = require('express/lib/response');
const { Vehicle } = require('../models');

//Funciones CRUD.

//CREATE
exports.add = async (req, res, next) => {
    try {
      const vehicleData = { ...req.body };
      const vehicle = await Vehicle.create(vehicleData);
      res.json({
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
        message: 'Error al leer los vehículos.',
        errors: errores,
      });
    }
  };
//READ LITS
exports.list = async (req, res, next) => {
    try {
      const vehicle = await Vehicle.findAll({});
      res.json(vehicle);
    } catch (error) {
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
      });
      if(!vehicle) {
        res.status(404).json({
            message:'No se encontro el Vehículo.'
        });
    } else {
        res.json(vehicle);
    }
    } catch (error) {
      res.status(500).json({
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
      res.json({
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
        errors: errores,
      });
    }
  };
//DELETE
exports.delete = async (req, res, next) => {
    try {
      await Vehicle.destroy({
        where: {
          id: req.params.id,
        }
      });
      res.status(500).json({
        message: 'Vehículo eliminado.',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error al eliminar Vehículo.',
      });
    }
  };
  
//Busqueda de usuarios.
exports.search =  async (req, res, next) => {
  try {
            console.log(req.query);
    const vehicle = await Vehicle.findAll({
      where: {
        [Op.or]: [
          {
              plateNumber:{
                [Op.like]:  `%${req.query.q.toLowerCase()}%`
              },
          },
          {
              model:{
                [Op.like]: `%${req.query.q.toLowerCase()}%`
              },
          }
        ]
      },
    });
    res.json({resultados: vehicle});
    console.log(vehicle);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al buscar vehículo',
    });
  }
};