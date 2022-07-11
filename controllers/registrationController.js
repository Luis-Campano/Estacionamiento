const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Registration } = require('../models');
const { Vehicle } = require('../models');
const { Customer } = require('../models');
const { Type } = require('../models');
const { Floor } = require('../models');
const { Rate } = require('../models');


//post 
exports.add = async (req, res, next) => {
    try {
        const registrationData = { ...req.body };
        const registration = await Registration.create(registrationData);
        res.json({
            message: "Nuevo registro",
            registration,
        });
        console.log(registration);
        } catch (error) {
        let errores = [];
        if (error.errors) {
            errores = error.errors.map((errorItem) => ({
            error: errorItem.message,
            field: errorItem.path,
            }));
        }
        res.status(500).json({
            message: 'Error al leer los registros',
            errors: errores,
        });
        console.log(error);
        }
    };
    //Atualizar el registro, en caso de ser necesario.
    
exports.update = async (req, res, next) => {
    try {
        const registrationData = { ...req.body };
        await Registration.update(registrationData, {
            where: { 
                id: req.params.id 
            },
        });

        res.json({
            message: "Registro actualizado."
        });
        console.log(registration);
        } catch (error) {
        let errores = [];
        if (error.errors) {
            errores = error.errors.map((errorItem) => ({
            error: errorItem.message,
            field: errorItem.path,
            }));
        }
        res.status(500).json({
            message: 'Error al leer los registros',
            errors: errores,
        });
        console.log(error);
        }
    };

    //get
exports.list = async (req, res, next) => {
    try {
        const registration = await Registration.findAll({
            include: [{
                model: Vehicle,
                as: 'vehicles',
                include: [{
                    model: Customer,
                    as: 'customers'
                }],
                include: [{
                    model: Type,
                    as:'types',
                    include: [{
                        model: Floor,
                        as:'floors',
                        include: [{
                            model: Rate,
                            as:'rates',
                            }]
                        }]
                }]
            }]
        });
        if(!registration) {
            return res.status(404).json({message:'No se encontro el registro'});
        } 
            res.json(registration);
            console.log(registration);
        } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al buscar Registros',
        });
        
        }
    };

    //get
exports.show = async (req, res, next) => {
    try {
        const registration = await Registration.findOne({
            where: { id: req.params.id },
            include: [{
                model: Vehicle,
                as: 'vehicles',
                include: [{
                    model: Customer,
                    as: 'customers'
                }],
                include: [{
                    model: Type,
                    as:'types',
                    include: [{
                        model: Floor,
                        as:'floors',
                        include: [{
                            model: Rate,
                            as:'rates',
                            }]
                        }]
                }]
            }]
           // include: ['payments']
        });
        console.log(registration);
        if(!registration) {
            return res.status(404).json({message:'No se encontro el registro'});
        }
        
        res.json(registration);
            
        console.log(registration.vehicles.model);  
        } catch (error) {
            console.log(error);
        res.status(500).json({
            message: 'Error al leer registros',
        });
        }
    };

//Funcion de busqueda.

  /*
//Busqueda de vehículo.
exports.search =  async (req, res, next) => {
    try {
        console.log(req.query);
      const registros = await Vehicle.findAll({
        include: [{}]
        where: {
          [Op.or]: [
            {
              vehicle.lincesPlate: {
                [Op.like]: `%${req.query.q.toLowerCase()}%`
              }
            }
          ]
        },
      });
      const busqueda = registros;
      if(!busqueda) {
        return res.status(404).json({
          message:'Sin resultados.'
        });
      }
        res.json({busqueda});
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al buscar información.',
      });
    }
  };*/