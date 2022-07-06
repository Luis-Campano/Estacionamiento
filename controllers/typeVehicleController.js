const e = require('cors');
const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Type } = require('../models');
const { Vehicle } = require('../models');
const { Customer } = require('../models');

//post 
exports.add = async (req, res, next) => {
    try {
        const typeData = { ...req.body };
        const type = await Type.create(typeData);
        res.json({
            message: "Tipo de vehiculo registrado",
            type,
        });
        console.log(type);
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
            message: 'Error al leer los tipos de vehiculo',
            errors: errores,
        });
        }
    };

//get
exports.list = async (req, res, next) => {
    try {
        const type = await Type.findAll({
            //include: ['vehicles'],
            include: [{
                model: Vehicle,
                as:'vehicles', 
                include: [{
                    model: Customer,
                    as:'customers',
                }]
            }]
        });
        res.json(type);
        console.log(type);
        } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al buscar  tipos de vehiculos',
        });
        
        }
    };

//get
exports.show = async (req, res, next) => {
    try {
        const type = await Type.findOne({
            where: { id: req.params.id },
            //include: ['vehicles'],
            include: [{
                model: Vehicle,
                as:'vehicles', 
                include: [{
                    model: Customer,
                    as:'customers',
                }]
            }]
        });
        if(!type) {
            res.status(404).json({message:'No se encontro el tipo de vehiculo'});
        } else {
            res.json(type);
        }
        } catch (error) {
        res.status(500).json({
            message: 'Error al leer los tipos de vehiculo',
        });
        }
    };

//delete
exports.delete = async (req, res, next) => {
    try {
        await Type.destroy({
            where: {
            id: req.params.id,
            }
        });
        res.status(500).json({
            message: 'Tipo de vehiculo eliminado',
        });
        } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el tipo de vehiculo',
        });
        }
    };

//put
exports.update = async (req, res, next) => {
    try {
        const actualizaType = { ...req.body };
        await Type.update(actualizaType, {
            where: {
            id: req.params.id,
            },
        });
        res.json({
            message: "Tipo de vehiculo actualizado",
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
            message: "Error al actualizar tipo de vehiculo",
            errors: errores,
        });
        }
    };

//Busqueda de tipo de vehículo.
exports.search =  async (req, res, next) => {
    try {
        console.log(req.query);
      const type = await Type.findAll({
        where: {
          [Op.or]: [
            {
                typeVehicle:{
                  [Op.like]:  `%${req.query.q.toLowerCase()}%`
                },
            }
          ]
        },
      }); 
      const busqueda = type;
      if(!busqueda) {
        res.status(404).json({
          message:'Sin resultados.'
        });
      } else {
        res.json({busqueda});
      }
      console.log(type);
  
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al buscar tipo de vehículo',
      });
    }
  };